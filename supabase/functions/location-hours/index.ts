import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Serves each store's opening hours, pulled live from Google (Places API New)
// and cached for a week in public.location_hours. Google is the source of
// truth, so staff only ever update hours in Google Business Profile; this
// re-checks at most once every 7 days. Never hard-fails: if Google or the DB
// is unavailable, it returns whatever is cached (and the site falls back to its
// built-in hours). Times are de-dashed to honor the site's no-dash rule.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// PB has a known Place ID (same one the reviews use). OB + The Lab are resolved
// by address text search, so no Place ID is needed up front; add placeId later
// for precision if desired.
const LOCATIONS: Array<{ slug: string; placeId?: string; textQuery?: string }> = [
  { slug: "pacific-beach", placeId: "ChIJG-eShv4B3IARyUdY1QTXgi4" },
  { slug: "ocean-beach", textQuery: "Monday Morning Non-Alcoholic Bottle Shop, 4967 Newport Ave, San Diego, CA 92107" },
  { slug: "the-lab", textQuery: "Monday Morning The Lab, 1784 La Costa Meadows Dr, San Marcos, CA 92078" },
];

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function jsonResponse(body: unknown, status = 200, cacheSeconds = 3600) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${cacheSeconds}`,
    },
  });
}

// Google returns times joined by an en dash (e.g. "Tuesday: 11:00 AM to 8:00
// PM" but dashed); normalize any figure/en/em dash to a hyphen and collapse
// whitespace, per the site's no-dash rule.
// Figure / en / em / horizontal-bar / minus dashes -> plain hyphen. Built from
// escapes so no wide dash ever appears in this source file.
const DASH_RE = new RegExp("[\\u2012-\\u2015\\u2212]", "g");
function normalize(descriptions: unknown, mapsUri: unknown) {
  const weekdayText = (Array.isArray(descriptions) ? descriptions : [])
    .map((s) => String(s).replace(DASH_RE, "-").replace(/\s+/g, " ").trim())
    .filter(Boolean);
  return { weekdayText, mapsUri: typeof mapsUri === "string" ? mapsUri : "" };
}

async function fetchGoogleHours(
  loc: { slug: string; placeId?: string; textQuery?: string },
  key: string,
): Promise<{ weekdayText: string[]; mapsUri: string }> {
  if (loc.placeId) {
    const res = await fetch(`https://places.googleapis.com/v1/places/${loc.placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "regularOpeningHours.weekdayDescriptions,googleMapsUri",
      },
    });
    if (!res.ok) throw new Error(`Place Details ${res.status}: ${await res.text()}`);
    const d = await res.json();
    return normalize(d?.regularOpeningHours?.weekdayDescriptions, d?.googleMapsUri);
  }

  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.regularOpeningHours.weekdayDescriptions,places.googleMapsUri",
    },
    body: JSON.stringify({ textQuery: loc.textQuery ?? "" }),
  });
  if (!res.ok) throw new Error(`Text Search ${res.status}: ${await res.text()}`);
  const d = await res.json();
  const place = d?.places?.[0];
  return normalize(place?.regularOpeningHours?.weekdayDescriptions, place?.googleMapsUri);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const googleKey = Deno.env.get("GOOGLE_PLACES_API_KEY");

    // Load whatever we have cached (tolerate the table not existing yet).
    const cached: Record<string, { weekday_text: string[]; maps_uri: string | null; fetched_at: string }> = {};
    try {
      const { data } = await supabase.from("location_hours").select("slug, weekday_text, maps_uri, fetched_at");
      for (const row of data ?? []) cached[row.slug] = row as any;
    } catch (e) {
      console.error("location_hours read failed (table may not exist yet):", e);
    }

    const now = Date.now();
    const isStale = LOCATIONS.some((l) => {
      const row = cached[l.slug];
      return !row || now - new Date(row.fetched_at).getTime() > WEEK_MS;
    });

    const out: Record<string, { weekdayText: string[]; mapsUri: string; fetchedAt: string }> = {};
    const fromCache = (slug: string) => {
      const row = cached[slug];
      if (row) out[slug] = { weekdayText: row.weekday_text ?? [], mapsUri: row.maps_uri ?? "", fetchedAt: row.fetched_at };
    };

    if (isStale && googleKey) {
      const nowIso = new Date().toISOString();
      for (const loc of LOCATIONS) {
        try {
          const hours = await fetchGoogleHours(loc, googleKey);
          if (hours.weekdayText.length) {
            out[loc.slug] = { ...hours, fetchedAt: nowIso };
            try {
              await supabase.from("location_hours").upsert({
                slug: loc.slug,
                weekday_text: hours.weekdayText,
                maps_uri: hours.mapsUri,
                fetched_at: nowIso,
              });
            } catch (e) {
              console.error("location_hours upsert failed:", loc.slug, e);
            }
          } else {
            fromCache(loc.slug);
          }
        } catch (e) {
          console.error("Google hours fetch failed:", loc.slug, e);
          fromCache(loc.slug);
        }
      }
    } else {
      for (const loc of LOCATIONS) fromCache(loc.slug);
    }

    return jsonResponse({ locations: out, refreshed: isStale && !!googleKey });
  } catch (e) {
    console.error("location-hours error:", e);
    // Soft-fail: the site falls back to its built-in hours.
    return jsonResponse({ locations: {} }, 200);
  }
});
