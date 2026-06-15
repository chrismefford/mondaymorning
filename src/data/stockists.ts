// Where to find the non-alcoholic brands Monday Morning distributes — by venue.
// One entry per real location (multi-venue groups are split out). `brands` is
// what that venue carries, from its wholesale order history. An empty `brands`
// array means the venue is an account but orders through its group, so we show
// "ask in store" instead of a list. Refresh as accounts/orders change.

export interface Stockist {
  name: string;
  area: string;     // neighborhood / city
  address: string;  // used for the map link
  brands: string[]; // carried brands (empty = "ask in store")
}

export const STOCKISTS: Stockist[] = [
  // ── Venues with their own assortment ──────────────────────────────
  {
    name: "Good News Bar",
    area: "University Heights, San Diego",
    address: "3821 Park Blvd, San Diego, CA 92103",
    brands: ["Amethyst", "Curious Elixir", "Drømme", "Kava Haven", "Pentire", "To Be Honest", "Tweedle"],
  },
  {
    name: "Boney's Bayside Market",
    area: "Coronado",
    address: "155 Orange Ave, Coronado, CA 92118",
    brands: ["Ceybon AF", "Drømme", "Go Brewing", "Kava Haven"],
  },
  {
    name: "Catch Brewing",
    area: "Kearny Mesa, San Diego",
    address: "7889 Ostrow St, San Diego, CA 92111",
    brands: ["Beaglepuss", "Below Brew"],
  },
  {
    name: "Collins & Coupe",
    area: "North Park, San Diego",
    address: "2876 El Cajon Blvd #100, San Diego, CA 92104",
    brands: ["Drømme", "Kava Haven", "St. Agrestis"],
  },
  {
    name: "Miss B's Coconut Club",
    area: "Mission Beach, San Diego",
    address: "3704 Mission Blvd, San Diego, CA 92109",
    brands: ["Amethyst", "Below Brew", "Bolle", "Ceybon AF", "Drømme", "Kava Haven", "Spiritless", "The Pathfinder", "To Be Honest", "Tomonotomo"],
  },
  {
    name: "Maya Moon",
    area: "Normal Heights, San Diego",
    address: "3349 Adams Ave, San Diego, CA 92116",
    brands: ["Kava Haven", "Portland Syrups"],
  },
  {
    name: "Paradisaea",
    area: "Bird Rock, La Jolla",
    address: "5680 La Jolla Blvd, La Jolla, CA 92037",
    brands: ["Amethyst", "Bolle", "Ghia", "Tilden"],
  },
  {
    name: "Polished Pigeon",
    area: "East Village, San Diego",
    address: "1450 Market St, San Diego, CA 92101",
    brands: ["Kava Haven", "Sentia", "Soul Hum"],
  },
  {
    name: "Queenstown Public House",
    area: "Little Italy, San Diego",
    address: "1557 Columbia St, San Diego, CA 92101",
    brands: ["All The Bitter", "Ceybon AF", "Drømme", "Kava Haven", "Spirit of Virtue"],
  },
  {
    name: "Queenstown Village",
    area: "La Jolla",
    address: "1044 Wall St, La Jolla, CA 92037",
    brands: ["All The Bitter", "Amethyst", "Atmos Brewing", "Bolle", "Capacity", "Ceybon AF", "Drømme", "Go Brewing", "Goodvines", "Kava Haven", "Kolonne Null", "Spirit of Virtue", "To Be Honest"],
  },
  {
    name: "Raglan House",
    area: "Ocean Beach, San Diego",
    address: "1851 Bacon St, San Diego, CA 92107",
    brands: ["Amethyst", "Ceybon AF", "Kava Haven"],
  },
  {
    name: "The Lodge at Torrey Pines",
    area: "La Jolla",
    address: "11480 N Torrey Pines Rd, La Jolla, CA 92037",
    brands: ["Beaglepuss", "Below Brew", "Bolle", "Ceybon AF", "Drømme", "Go Brewing", "Goodvines", "Kavaly", "NA Beverage Co", "Sentia", "Tomonotomo", "Tomorrow Cellars"],
  },
  {
    name: "Heights Market",
    area: "Normal Heights, San Diego",
    address: "3355 Adams Ave, San Diego, CA 92116",
    brands: ["Kava Haven"],
  },

  // ── Venues set up, but stock is ordered through their group ───────
  // (No per-venue order history yet → "ask in store".)
  {
    name: "Bare Back Grill",
    area: "Mission Beach, San Diego",
    address: "4640 Mission Blvd, San Diego, CA 92109",
    brands: [],
  },
  {
    name: "Queenstown in Del Mar",
    area: "Del Mar",
    address: "1435 Camino Del Mar, Del Mar, CA 92014",
    brands: ["Amethyst", "Below Brew", "Drømme", "Go Brewing", "To Be Honest"],
  },
  {
    name: "PRK101",
    area: "Carlsbad",
    address: "3040 Carlsbad Blvd, Carlsbad, CA 92008",
    brands: [],
  },
  {
    name: "Louisiana Purchase",
    area: "North Park, San Diego",
    address: "2305 University Ave, San Diego, CA 92104",
    brands: [],
  },
  {
    name: "Coco Maya by Miss B's",
    area: "Little Italy, San Diego",
    address: "1660 India St, San Diego, CA 92101",
    brands: [],
  },
  {
    name: "The Lobby Tiki",
    area: "Oceanside",
    address: "408 Pier View Way, Oceanside, CA 92054",
    brands: [],
  },
  {
    name: "Cocoacabana",
    area: "Oceanside",
    address: "408 Pier View Way Suite 401, Oceanside, CA 92054",
    brands: [],
  },
];
