export interface Recipe {
  id: string;
  title: string;
  type: "drink" | "food";
  tagline: string;
  description: string;
  image: string;
  prepTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Advanced";
  ingredients: string[];
  featured?: boolean;
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Sunset Spritz",
    type: "drink",
    tagline: "Golden hour in a glass",
    description: "A refreshing NA twist on the classic Aperol Spritz, featuring our Golden Hour Spritz with fresh citrus and sparkling water.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["3 oz Golden Hour Spritz", "2 oz sparkling water", "Orange slice", "Fresh rosemary sprig"],
    featured: true
  },
  {
    id: "2",
    title: "Midnight Mule",
    type: "drink",
    tagline: "Dark and stormy, zero proof",
    description: "Our Midnight Botanical meets spicy ginger beer and fresh lime for a sophisticated NA cocktail.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz Midnight Botanical", "4 oz ginger beer", "Lime wedge", "Candied ginger"]
  },
  {
    id: "3",
    title: "Citrus Cured Salmon",
    type: "food",
    tagline: "Perfect with our wine alternatives",
    description: "A delicate citrus-cured salmon that pairs beautifully with our Blanc de Blancs.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
    prepTime: "24 hrs",
    servings: 6,
    difficulty: "Medium",
    ingredients: ["1 lb fresh salmon", "Lemon zest", "Fresh dill", "Sea salt", "Pink peppercorns"]
  },
  {
    id: "4",
    title: "Elderflower Collins",
    type: "drink",
    tagline: "Effervescent & elegant",
    description: "Our Sparkling Elderflower shines in this refreshing, herb-forward Collins variation.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz Sparkling Elderflower", "1 oz fresh lemon juice", "Basil leaves", "Cucumber ribbon"]
  },
  {
    id: "5",
    title: "Velvet Braised Short Ribs",
    type: "food",
    tagline: "Cooked low & slow with NA wine",
    description: "Tender short ribs braised in our Velvet Rouge for a rich, complex flavor without the alcohol.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    prepTime: "3 hrs",
    servings: 4,
    difficulty: "Advanced",
    ingredients: ["3 lbs short ribs", "1 bottle Velvet Rouge", "Fresh thyme", "Shallots", "Beef stock"]
  },
  {
    id: "6",
    title: "Morning Clarity Smoothie Bowl",
    type: "food",
    tagline: "Start your day intentionally",
    description: "A vibrant smoothie bowl featuring our Morning Clarity elixir with fresh fruits and superfoods.",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
    prepTime: "10 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz Morning Clarity", "Frozen banana", "Fresh berries", "Granola", "Chia seeds"]
  }
];
