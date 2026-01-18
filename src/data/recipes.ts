export type Occasion = "breakfast" | "dinner" | "relaxing" | "beach" | "celebration";

export interface Recipe {
  id: string;
  title: string;
  occasion: Occasion;
  tagline: string;
  description: string;
  image: string;
  prepTime: string;
  servings: number;
  difficulty: "Easy" | "Medium" | "Advanced";
  ingredients: string[];
  featured?: boolean;
}

export const occasionLabels: Record<Occasion, { label: string; emoji: string }> = {
  breakfast: { label: "Breakfast", emoji: "🌅" },
  dinner: { label: "Dinner", emoji: "🍽️" },
  relaxing: { label: "Relaxing", emoji: "🧘" },
  beach: { label: "Beach", emoji: "🏖️" },
  celebration: { label: "Celebration", emoji: "🎉" },
};

export const recipes: Recipe[] = [
  // BREAKFAST
  {
    id: "1",
    title: "Sunrise Mimosa",
    occasion: "breakfast",
    tagline: "Golden hour in a glass",
    description: "A bright, bubbly mocktail combining fresh-pressed orange juice with our Sparkling Elderflower for the perfect Sunday brunch companion.",
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["3 oz fresh orange juice", "3 oz Sparkling Elderflower", "Orange twist", "Fresh mint sprig"],
    featured: true
  },
  {
    id: "2",
    title: "Morning Clarity Fizz",
    occasion: "breakfast",
    tagline: "Start your day intentionally",
    description: "A refreshing blend of ginger, lemon, and our Morning Clarity elixir topped with sparkling water.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz Morning Clarity", "1 oz fresh lemon juice", "Sparkling water", "Candied ginger"]
  },
  {
    id: "3",
    title: "Blueberry Lavender Lemonade",
    occasion: "breakfast",
    tagline: "Calm meets bright",
    description: "Fresh blueberries muddled with lavender syrup and lemon for a soothing yet vibrant morning drink.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
    prepTime: "7 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh blueberries", "Lavender simple syrup", "Fresh lemon juice", "Sparkling water", "Lavender sprig"]
  },

  // DINNER
  {
    id: "4",
    title: "Velvet Rouge Sangria",
    occasion: "dinner",
    tagline: "Elegant & complex",
    description: "Our Velvet Rouge NA wine shines in this sophisticated sangria with fresh citrus and seasonal fruits.",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&q=80",
    prepTime: "10 min",
    servings: 4,
    difficulty: "Easy",
    ingredients: ["1 bottle Velvet Rouge", "Sliced oranges", "Fresh berries", "Cinnamon stick", "Sparkling water"]
  },
  {
    id: "5",
    title: "Rosemary Citrus Spritz",
    occasion: "dinner",
    tagline: "Herbaceous & refreshing",
    description: "A sophisticated dinner companion featuring our Golden Hour Spritz with fresh rosemary and grapefruit.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz Golden Hour Spritz", "Fresh rosemary sprig", "Grapefruit wedge", "Sparkling water"]
  },
  {
    id: "6",
    title: "Midnight Botanical Tonic",
    occasion: "dinner",
    tagline: "Dark and mysterious",
    description: "Our Midnight Botanical paired with premium tonic and a twist of orange for an elegant aperitif.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz Midnight Botanical", "4 oz premium tonic", "Orange peel", "Fresh thyme"]
  },

  // RELAXING
  {
    id: "7",
    title: "Chamomile Honey Soother",
    occasion: "relaxing",
    tagline: "Unwind naturally",
    description: "Warm chamomile tea meets honey and lemon in this calming evening mocktail perfect for winding down.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    prepTime: "8 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Chamomile tea", "Local honey", "Fresh lemon juice", "Cinnamon stick", "Star anise"]
  },
  {
    id: "8",
    title: "Lavender Dreams",
    occasion: "relaxing",
    tagline: "Serenity in a glass",
    description: "A soothing blend of lavender, vanilla, and our Calm botanical waters for the ultimate relaxation ritual.",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz Calm botanical water", "Lavender syrup", "Vanilla extract", "Dried lavender buds"]
  },
  {
    id: "9",
    title: "Cucumber Mint Cooler",
    occasion: "relaxing",
    tagline: "Cool & composed",
    description: "Fresh cucumber and mint create a refreshingly zen experience, perfect for quiet evenings on the patio.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh cucumber slices", "Fresh mint leaves", "Lime juice", "Simple syrup", "Sparkling water"]
  },

  // BEACH
  {
    id: "10",
    title: "Tropical Sunset",
    occasion: "beach",
    tagline: "Paradise found",
    description: "Pineapple, coconut, and a splash of grenadine create the ultimate beach day sipper—no umbrella required.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz pineapple juice", "2 oz coconut cream", "Splash of grenadine", "Pineapple wedge", "Maraschino cherry"]
  },
  {
    id: "11",
    title: "Watermelon Wave",
    occasion: "beach",
    tagline: "Summer in a cup",
    description: "Fresh watermelon juice meets lime and mint for the most refreshing beach companion imaginable.",
    image: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=800&q=80",
    prepTime: "7 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh watermelon juice", "Lime juice", "Fresh mint", "Tajín rim", "Watermelon wedge"]
  },
  {
    id: "12",
    title: "Coconut Lime Refresher",
    occasion: "beach",
    tagline: "Coastal vibes only",
    description: "Creamy coconut water, zesty lime, and a hint of vanilla transport you straight to the shoreline.",
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["6 oz coconut water", "Fresh lime juice", "Vanilla syrup", "Lime wheel", "Toasted coconut flakes"]
  },

  // CELEBRATION
  {
    id: "13",
    title: "Sparkling Elderflower Royale",
    occasion: "celebration",
    tagline: "Effervescent & elegant",
    description: "Our Sparkling Elderflower takes center stage in this sophisticated celebration-worthy mocktail.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["5 oz Sparkling Elderflower", "Dash of elderflower cordial", "Lemon twist", "Edible flowers"]
  },
  {
    id: "14",
    title: "Midnight Toast",
    occasion: "celebration",
    tagline: "Ring in the moment",
    description: "Dark berries, sparkling water, and our Midnight Botanical create a dramatic celebration sipper.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz Midnight Botanical", "Muddled blackberries", "Sparkling water", "Lemon peel", "Fresh blackberries"]
  },
  {
    id: "15",
    title: "Golden Hour Celebration",
    occasion: "celebration",
    tagline: "Cheers to clarity",
    description: "Our signature Golden Hour Spritz elevated with fresh peach and basil for those special moments.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz Golden Hour Spritz", "Fresh peach slices", "Basil leaves", "Honey", "Sparkling water"]
  }
];
