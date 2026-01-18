export interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  badge?: string;
  flavor?: string;
  mood?: string;
  benefits?: string[];
  collection?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Golden Hour Spritz",
    category: "Aperitif",
    tagline: "Sunset in a glass",
    description: "A vibrant blend of citrus and botanicals, crafted for those magic hour moments when the day softens into evening.",
    price: 28,
    compareAtPrice: 32,
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=600&q=80",
    badge: "Best Seller",
    flavor: "Citrus • Bitter Orange • Herbs",
    mood: "Social & Uplifting",
    benefits: ["Adaptogens for calm focus", "No hangover", "5 calories per serving"],
    collection: ["Best Sellers", "Aperitifs"]
  },
  {
    id: "2",
    name: "Midnight Botanical",
    category: "Spirit Alternative",
    tagline: "Complex. Bold. Alcohol-free.",
    description: "A sophisticated dark spirit alternative with notes of juniper, cardamom, and a whisper of smoke.",
    price: 34,
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
    flavor: "Juniper • Cardamom • Smoke",
    mood: "Contemplative",
    benefits: ["Functional mushrooms", "Zero sugar", "Mixology ready"],
    collection: ["Spirit Alternatives"]
  },
  {
    id: "3",
    name: "Morning Clarity",
    category: "Functional Elixir",
    tagline: "Start intentionally",
    description: "A gentle awakening blend of adaptogens and bright botanicals designed for mindful mornings.",
    price: 24,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
    badge: "New",
    flavor: "Ginger • Lemon • Turmeric",
    mood: "Energizing & Clear",
    benefits: ["Lion's mane for focus", "Anti-inflammatory", "Caffeine-free energy"],
    collection: ["Functional", "Morning Ritual"]
  },
  {
    id: "4",
    name: "Velvet Rouge",
    category: "Wine Alternative",
    tagline: "All the ritual, none of the regret",
    description: "A full-bodied dealcoholized red with notes of dark cherry, oak, and a silky finish.",
    price: 22,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80",
    flavor: "Dark Cherry • Oak • Vanilla",
    mood: "Romantic & Relaxed",
    benefits: ["Dealcoholized wine", "Rich in polyphenols", "Under 30 calories"],
    collection: ["Wine Alternatives", "Date Night"]
  },
  {
    id: "5",
    name: "Sparkling Elderflower",
    category: "Sparkling",
    tagline: "Effervescent elegance",
    description: "Delicate elderflower meets fine bubbles in this celebration-worthy pour.",
    price: 18,
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&q=80",
    badge: "Staff Pick",
    flavor: "Elderflower • Pear • Bubbles",
    mood: "Celebratory",
    benefits: ["Naturally sparkling", "Organic ingredients", "Perfect for toasts"],
    collection: ["Sparkling", "Celebrations"]
  },
  {
    id: "6",
    name: "Copper Mule",
    category: "Ready to Drink",
    tagline: "Classic, reimagined",
    description: "Spicy ginger meets lime in this ready-to-pour take on the beloved Moscow Mule.",
    price: 16,
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&q=80",
    flavor: "Ginger • Lime • Copper warmth",
    mood: "Refreshing & Social",
    benefits: ["Real ginger root", "No artificial anything", "4-pack convenience"],
    collection: ["Ready to Drink", "Best Sellers"]
  },
  {
    id: "7",
    name: "Blanc de Blancs",
    category: "Wine Alternative",
    tagline: "Crisp sophistication",
    description: "A refined dealcoholized white with notes of green apple, minerality, and citrus zest.",
    price: 22,
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=600&q=80",
    flavor: "Green Apple • Mineral • Citrus",
    mood: "Light & Bright",
    benefits: ["Dealcoholized wine", "Food-friendly", "Dry finish"],
    collection: ["Wine Alternatives"]
  },
  {
    id: "8",
    name: "Herbal Calm",
    category: "Functional Elixir",
    tagline: "Unwind without unwinding",
    description: "A soothing evening blend of chamomile, passionflower, and gentle adaptogens.",
    price: 26,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    flavor: "Chamomile • Lavender • Honey",
    mood: "Calm & Centered",
    benefits: ["Ashwagandha for stress", "Sleep-supportive", "Naturally sweet"],
    collection: ["Functional", "Evening Wind Down"]
  }
];

export const collections = [
  {
    id: "best-sellers",
    name: "Best Sellers",
    description: "Our community favorites",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80"
  },
  {
    id: "beach-bonfire",
    name: "Beach Bonfire Vibes",
    description: "Sip under the stars",
    image: "/images/beach-bonfire.jpg"
  },
  {
    id: "functional",
    name: "Functional Drinks",
    description: "Beverages with benefits",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80"
  },
  {
    id: "wine-alternatives",
    name: "Wine Alternatives",
    description: "All the ritual, reimagined",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80"
  }
];
