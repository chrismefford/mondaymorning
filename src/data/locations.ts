import { SITE_URL } from "@/lib/seo";

// The three Monday Morning locations you can visit. One source of truth for the
// Find Us hub, the per-location pages (/locations/:slug), and each location's
// own LocalBusiness / Brewery JSON-LD (so each ranks for its own local search).

export interface LocationHours {
  days: string;
  time: string;
  special?: boolean;
}

export interface LocationSchemaHours {
  days: string[];
  opens: string;
  closes: string;
}

export interface OwnedLocation {
  slug: string;
  name: string; // "Pacific Beach" / "Ocean Beach" / "The Lab"
  area: string; // neighborhood / city label
  kind: "bottleshop" | "brewery";
  tagline: string;
  intro: string[]; // hero + opening paragraphs
  highlights: string[]; // what they carry / what's on offer
  amenities: string[]; // the vibe + features
  comingSoon: string[];
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  phone: string;
  mapUrl: string;
  hours: LocationHours[] | null; // display list; null = hours TBD
  hoursNote?: string;
  schemaHours: LocationSchemaHours[] | null;
  schemaType: "Store" | "Brewery";
  image: string;
  metaTitle: string;
  metaDescription: string;
}

export const OWNED_LOCATIONS: OwnedLocation[] = [
  {
    slug: "pacific-beach",
    name: "Pacific Beach",
    area: "Pacific Beach, San Diego",
    kind: "bottleshop",
    tagline: "Our flagship bottle shop and non-alcoholic lounge",
    intro: [
      "Pacific Beach is where Monday Morning started, and it is still the full experience: San Diego's original dedicated non-alcoholic bottle shop, with a proper lounge to hang out in and a tasting bar so you can try before you buy.",
      "Two minutes from the boardwalk on Garnet Ave, with a rare thing in PB, easy parking. Come browse 500+ alcohol-free drinks, post up in the lounge, or catch live music and an event.",
    ],
    highlights: [
      "500+ non-alcoholic beers, wines, spirits, and functional drinks",
      "Tasting bar, sample anything before you buy",
      "Vibations, our craft alcohol-free cocktails",
    ],
    amenities: [
      "200+ parking spaces",
      "Free wifi",
      "NA lounge with seating for 25",
      "Live music",
      "Events and private bookings",
      "Mixology classes",
      "In-store sampling",
    ],
    comingSoon: ["Draft beer"],
    streetAddress: "1854 Garnet Ave",
    locality: "San Diego",
    region: "CA",
    postalCode: "92109",
    phone: "(858) 412-3253",
    mapUrl: "https://maps.google.com/?q=1854+Garnet+Ave+San+Diego+CA+92109",
    hours: [
      { days: "Tue - Sat", time: "11 AM - 8 PM" },
      { days: "Sun", time: "11 AM - 6 PM" },
      { days: "Monday", time: "Closed (open by appointment for industry)", special: true },
    ],
    schemaHours: [
      { days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "11:00", closes: "20:00" },
      { days: ["Sunday"], opens: "11:00", closes: "18:00" },
    ],
    schemaType: "Store",
    image: "/images/pacific-beach-location.jpg",
    metaTitle: "Non-Alcoholic Bottle Shop in Pacific Beach | Monday Morning",
    metaDescription:
      "Monday Morning's flagship non-alcoholic bottle shop and lounge in Pacific Beach. 500+ NA beers, wines, spirits and functional drinks, a tasting bar, free wifi, seating for 25, and easy parking. 1854 Garnet Ave.",
  },
  {
    slug: "ocean-beach",
    name: "Ocean Beach",
    area: "Ocean Beach, San Diego",
    kind: "bottleshop",
    tagline: "Beachside bottle shop, one block from the sand",
    intro: [
      "Ocean Beach is our beach shop, one block from the water on Newport Ave. This one leans all the way into the OB energy: chill, barefoot, alcohol-free.",
      "Grab a sunset kava slushie, sample your way through the wall, and take a few NA cans down to the sand. Drinking differently on the beach, no hangover required.",
    ],
    highlights: [
      "Curated non-alcoholic beer, wine, spirits, and functional drinks",
      "Tasting bar, sample before you buy",
      "Sunset kava slushies",
    ],
    amenities: [
      "One block from the beach",
      "Sunset kava slushies",
      "In-store sampling",
      "Beach-day cans to go",
    ],
    comingSoon: ["Draft beer"],
    streetAddress: "4967 Newport Ave",
    locality: "San Diego",
    region: "CA",
    postalCode: "92107",
    phone: "(858) 412-3253",
    mapUrl: "https://maps.google.com/?q=4967+Newport+Ave+San+Diego+CA+92107",
    hours: [
      { days: "Tue & Thu", time: "11 AM - 8 PM" },
      { days: "Wed", time: "3 PM - 8 PM" },
      { days: "Fri - Sun", time: "11 AM - 6 PM" },
      { days: "Monday", time: "Closed", special: true },
    ],
    schemaHours: [
      { days: ["Tuesday", "Thursday"], opens: "11:00", closes: "20:00" },
      { days: ["Wednesday"], opens: "15:00", closes: "20:00" },
      { days: ["Friday", "Saturday", "Sunday"], opens: "11:00", closes: "18:00" },
    ],
    schemaType: "Store",
    image: "/images/ocean-beach-location.jpg",
    metaTitle: "Non-Alcoholic Bottle Shop in Ocean Beach | Monday Morning",
    metaDescription:
      "Monday Morning's beachside non-alcoholic bottle shop in Ocean Beach, one block from the sand. NA beer, wine, spirits, sunset kava slushies, and a tasting bar. 4967 Newport Ave.",
  },
  {
    slug: "the-lab",
    name: "The Lab",
    area: "San Marcos",
    kind: "brewery",
    tagline: "San Diego County's first non-alcoholic brewery and taproom",
    intro: [
      "We didn't want to call it just a brewery, because it is more than that. The Lab is our non-alcoholic brewery, taproom, and bottle shop in San Marcos, San Diego County's first NA brewery you can actually walk into.",
      "It is a working non-alcoholic brewery (home of Haymaker NA IPA) with a taproom out front: rotational NA beers on tap, crowlers to take home, a pool table, weekend events, and a bottle shop. Real brewery, real taproom, zero alcohol.",
    ],
    highlights: [
      "Rotational non-alcoholic beers on draft",
      "Haymaker NA IPA, our house West Coast IPA",
      "Crowlers to go",
      "Bottle shop with alcohol-free beer, wine, and spirits",
    ],
    amenities: [
      "Taproom and brewery",
      "Pool table",
      "Weekend events (check the schedule)",
      "See the production floor",
      "Crowler fills to go",
    ],
    comingSoon: ["Flights"],
    streetAddress: "1784 La Costa Meadows Dr, Ste 103",
    locality: "San Marcos",
    region: "CA",
    postalCode: "92078",
    phone: "(858) 412-3253",
    mapUrl: "https://maps.google.com/?q=1784+La+Costa+Meadows+Dr+San+Marcos+CA+92078",
    hours: null,
    hoursNote: "Regular taproom hours are being finalized, so check ahead for current days and times before you visit.",
    schemaHours: null,
    schemaType: "Brewery",
    image: "/og-the-lab-opening-san-marcos.jpg",
    metaTitle: "The Lab: Non-Alcoholic Brewery & Taproom in San Marcos | Monday Morning",
    metaDescription:
      "The Lab is San Diego County's first non-alcoholic brewery and taproom, in San Marcos. NA beer on tap (home of Haymaker NA IPA), crowlers, a bottle shop, pool table, and weekend events. By Monday Morning.",
  },
];

export const getLocation = (slug?: string): OwnedLocation | undefined =>
  OWNED_LOCATIONS.find((l) => l.slug === slug);

export function locationSchema(loc: OwnedLocation) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": loc.schemaType,
    name: loc.name === "The Lab" ? "The Lab by Monday Morning" : `Monday Morning Bottle Shop, ${loc.name}`,
    description: loc.metaDescription,
    url: `${SITE_URL}/locations/${loc.slug}`,
    image: loc.image.startsWith("http") ? loc.image : `${SITE_URL}${loc.image}`,
    telephone: loc.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.streetAddress,
      addressLocality: loc.locality,
      addressRegion: loc.region,
      postalCode: loc.postalCode,
      addressCountry: "US",
    },
    parentOrganization: { "@type": "Organization", name: "Monday Morning Bottle Shop", url: SITE_URL },
  };
  if (loc.schemaHours) {
    schema.openingHoursSpecification = loc.schemaHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  return schema;
}
