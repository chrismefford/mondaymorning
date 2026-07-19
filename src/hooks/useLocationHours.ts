import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Live opening hours per store, pulled from Google (Places API) and cached a
// week server-side by the location-hours edge function. Keyed by location slug.
// If this fails or returns nothing for a slug, callers fall back to the
// built-in hours in src/data/locations.ts.

export interface LocationHoursLive {
  weekdayText: string[]; // e.g. ["Monday: Closed", "Tuesday: 11:00 AM - 8:00 PM", ...]
  mapsUri: string;
  fetchedAt: string;
}

export function useLocationHours() {
  return useQuery({
    queryKey: ["location-hours"],
    staleTime: 60 * 60 * 1000, // 1 hour; the weekly refresh logic lives server-side
    queryFn: async (): Promise<Record<string, LocationHoursLive>> => {
      const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
      const { data: authData } = await supabase.auth.getSession();
      const accessToken = authData.session?.access_token;

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/location-hours`,
        {
          headers: {
            apikey: publishableKey,
            Authorization: `Bearer ${accessToken ?? publishableKey}`,
          },
        }
      );

      if (!response.ok) throw new Error(`Failed to fetch location hours: ${response.status}`);

      const json = (await response.json()) as { locations?: Record<string, LocationHoursLive> };
      return json.locations ?? {};
    },
    // Never surface an error to the UI; callers just use the static fallback.
    retry: 1,
  });
}
