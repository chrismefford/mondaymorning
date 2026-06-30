// Fetches the shop's live Google rating + top reviews (Places API New) and
// writes src/data/google-reviews.json. The home Testimonials section reads that
// file, so the rating + quotes are real and refreshable.
//
//   GOOGLE_PLACES_API_KEY=... node scripts/fetch-google-reviews.mjs
//
// The API key is NEVER committed, only the resulting JSON is. Re-run this
// (manually or on a schedule) to refresh; commit + publish to push it live.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = "ChIJG-eShv4B3IARyUdY1QTXgi4"; // Monday Morning Bottle Shop, 1854 Garnet Ave, PB

if (!KEY) {
  console.error("GOOGLE_PLACES_API_KEY not set, skipping Google reviews refresh (keeping existing JSON).");
  process.exit(0);
}

const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
  headers: {
    "X-Goog-Api-Key": KEY,
    "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
  },
});
if (!res.ok) {
  console.error("Places API error", res.status, await res.text(), ", keeping existing JSON.");
  process.exit(0); // never fail the build; just keep the last good JSON
}
const d = await res.json();

const clean = (t) => (t || "").replace(/\s+/g, " ").trim();
const shortName = (name) => {
  const p = clean(name).split(/\s+/);
  return p.length > 1 ? `${p[0]} ${p[p.length - 1][0]}.` : p[0] || "Google user";
};
const initials = (name) =>
  clean(name).split(/\s+/).map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "MM";

const reviews = (d.reviews || [])
  .map((r) => ({
    rating: r.rating,
    raw: clean((r.text && r.text.text) || (r.originalText && r.originalText.text) || ""),
    author: shortName((r.authorAttribution && r.authorAttribution.displayName) || ""),
    initials: initials((r.authorAttribution && r.authorAttribution.displayName) || ""),
    when: r.relativePublishTimeDescription || "",
  }))
  // Only clean 5★ prose; drop accidental AI-paste artifacts and one-liners.
  .filter(
    (r) =>
      r.rating >= 5 &&
      r.raw.length >= 40 &&
      r.raw.length <= 800 &&
      !/here'?s the (updated|corrected)|updated version/i.test(r.raw)
  )
  .slice(0, 5)
  .map(({ raw, ...r }) => ({
    ...r,
    text: raw.length > 300 ? raw.slice(0, 297).replace(/\s+\S*$/, "") + "…" : raw,
  }));

const out = {
  rating: d.rating,
  count: d.userRatingCount,
  mapsUri: d.googleMapsUri || "",
  updatedAt: new Date().toISOString().slice(0, 10),
  reviews,
};

const target = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "google-reviews.json");
writeFileSync(target, JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${reviews.length} reviews · ${d.rating}★ / ${d.userRatingCount} → src/data/google-reviews.json`);
