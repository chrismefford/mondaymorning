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
  /** Keywords to match against product names/categories from the store */
  productKeywords?: string[];
  /** Shopify handle for the featured product in this recipe */
  featuredProductHandle?: string;
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
    description: "A bright, bubbly mocktail combining fresh-pressed orange juice with Bolle Sparkling White for the perfect Sunday brunch companion.",
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["3 oz fresh orange juice", "3 oz Bolle Sparkling White", "Orange twist", "Fresh mint sprig"],
    featured: true,
    productKeywords: ["sparkling", "wine", "bubbly", "prosecco", "champagne"],
    featuredProductHandle: "bolle-sparkling-white"
  },
  {
    id: "2",
    title: "Morning Clarity Fizz",
    occasion: "breakfast",
    tagline: "Start your day intentionally",
    description: "A refreshing blend of ginger, lemon, and Amethyst Ginger Lemon topped with sparkling water.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz Amethyst Ginger Lemon", "1 oz fresh lemon juice", "Sparkling water", "Candied ginger"],
    productKeywords: ["functional", "elixir", "wellness", "tonic", "adaptogen", "ginger"],
    featuredProductHandle: "amethyst-na-spirits-ginger-lemon"
  },
  {
    id: "3",
    title: "Blueberry Lavender Lemonade",
    occasion: "breakfast",
    tagline: "Calm meets bright",
    description: "Fresh blueberries muddled with lavender syrup and Amethyst Blueberry Ginger Mint for a soothing yet vibrant morning drink.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    prepTime: "7 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz Amethyst Blueberry Ginger Mint", "Lavender simple syrup", "Fresh lemon juice", "Sparkling water", "Lavender sprig"],
    productKeywords: ["botanical", "floral", "lavender", "berry"],
    featuredProductHandle: "amethyst-na-spirits-blueberry-ginger-mint"
  },
  {
    id: "b4",
    title: "Grapefruit Rosemary Spritz",
    occasion: "breakfast",
    tagline: "Bright & herbaceous",
    description: "Fresh grapefruit juice meets Amethyst Grapefruit Basil for a sophisticated breakfast sipper.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz Amethyst Grapefruit Basil", "2 oz fresh grapefruit juice", "Rosemary simple syrup", "Sparkling water", "Rosemary sprig"],
    productKeywords: ["citrus", "grapefruit", "spritz", "aperitif"],
    featuredProductHandle: "amethyst-na-spirits-grapefruit-basil"
  },
  {
    id: "b5",
    title: "Peach Bellini",
    occasion: "breakfast",
    tagline: "Classic brunch elegance",
    description: "Velvety peach purée meets Bolle Sparkling Rosé for a timeless brunch favorite.",
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh peach purée", "4 oz Bolle Sparkling Rosé", "Peach slice", "Fresh mint"],
    productKeywords: ["sparkling", "wine", "prosecco", "bubbly"],
    featuredProductHandle: "bolle-sparkling-rose"
  },
  {
    id: "b6",
    title: "Tropical Acai Refresher",
    occasion: "breakfast",
    tagline: "Superfood sunrise",
    description: "Antioxidant-rich acai blended with Amethyst Tropical Punch for an energizing morning boost.",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
    prepTime: "8 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Acai purée", "2 oz Amethyst Tropical Punch", "Pineapple juice", "Coconut water", "Fresh berries"],
    productKeywords: ["tropical", "fruit", "wellness", "functional"],
    featuredProductHandle: "amethyst-na-spirits-tropical-punch"
  },

  // DINNER
  {
    id: "4",
    title: "NA Red Wine Sangria",
    occasion: "dinner",
    tagline: "Elegant & complex",
    description: "Lautus Savvy Red shines in this sophisticated sangria with fresh citrus and seasonal fruits.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
    prepTime: "10 min",
    servings: 4,
    difficulty: "Easy",
    ingredients: ["1 bottle Lautus Savvy Red", "Sliced oranges", "Fresh berries", "Cinnamon stick", "Sparkling water"],
    featured: true,
    productKeywords: ["wine", "red", "cabernet", "merlot", "pinot"],
    featuredProductHandle: "lautus-savvy-red"
  },
  {
    id: "5",
    title: "Rosemary Citrus Spritz",
    occasion: "dinner",
    tagline: "Herbaceous & refreshing",
    description: "A sophisticated dinner companion featuring Abstinence Blood Orange Aperitif with fresh rosemary and grapefruit.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz Abstinence Blood Orange Aperitif", "Fresh rosemary sprig", "Grapefruit wedge", "Sparkling water"],
    productKeywords: ["aperitif", "spritz", "bitter", "orange", "citrus"],
    featuredProductHandle: "abstinence-spirits-blood-orange-aperitif"
  },
  {
    id: "6",
    title: "Botanical Gin & Tonic",
    occasion: "dinner",
    tagline: "Dark and mysterious",
    description: "Abstinence Cape Floral paired with premium tonic and a twist of orange for an elegant aperitif.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz Abstinence Cape Floral", "4 oz premium tonic", "Orange peel", "Fresh thyme"],
    productKeywords: ["gin", "botanical", "spirit", "juniper"],
    featuredProductHandle: "abstinence-spirits-cape-floral"
  },
  {
    id: "d4",
    title: "Smoked Maple Old Fashioned",
    occasion: "dinner",
    tagline: "Bold & refined",
    description: "A sophisticated twist on the classic featuring Abstinence Epilogue X with smoked maple syrup and aromatic bitters.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Medium",
    ingredients: ["3 oz Abstinence Epilogue X", "Smoked maple syrup", "All The Bitter Aromatic Bitters", "Orange peel", "Luxardo cherry"],
    productKeywords: ["whiskey", "bourbon", "spirit", "dark", "oak"],
    featuredProductHandle: "abstinence-spirits-epilogue-x"
  },
  {
    id: "d5",
    title: "Herb Garden Gimlet",
    occasion: "dinner",
    tagline: "Fresh from the garden",
    description: "A vibrant blend of fresh herbs, lime, and Amethyst Lemon Cucumber Serrano for a crisp dinner starter.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh basil", "Fresh mint", "Lime juice", "Simple syrup", "2 oz Amethyst Lemon Cucumber Serrano", "Cucumber slice"],
    productKeywords: ["gin", "botanical", "herb", "cucumber"],
    featuredProductHandle: "amethyst-na-spirits-lemon-cucumber-serrano"
  },
  {
    id: "d6",
    title: "Spiced Pear Fizz",
    occasion: "dinner",
    tagline: "Autumn in a glass",
    description: "Ripe pear nectar meets Bolle Sparkling White and warming spices for a cozy dinner companion.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    prepTime: "7 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh pear juice", "Cinnamon stick", "Star anise", "Ginger syrup", "4 oz Bolle Sparkling White"],
    productKeywords: ["sparkling", "cider", "pear", "fruit"],
    featuredProductHandle: "bolle-sparkling-white"
  },

  // RELAXING
  {
    id: "7",
    title: "Chamomile Honey Soother",
    occasion: "relaxing",
    tagline: "Unwind naturally",
    description: "Warm chamomile tea meets All The Bitter Lavender Bitters for a calming evening mocktail perfect for winding down.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    prepTime: "8 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Chamomile tea", "3 dashes All The Bitter Lavender Bitters", "Local honey", "Fresh lemon juice", "Cinnamon stick"],
    featured: true,
    productKeywords: ["tea", "herbal", "wellness", "functional", "bitters"],
    featuredProductHandle: "all-the-bitter-lavender-bitters"
  },
  {
    id: "8",
    title: "Lavender Dreams",
    occasion: "relaxing",
    tagline: "Serenity in a glass",
    description: "A soothing blend of All The Bitter Lavender Bitters, vanilla, and sparkling water for the ultimate relaxation ritual.",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Sparkling water", "Lavender syrup", "3 dashes All The Bitter Lavender Bitters", "Vanilla extract", "Dried lavender buds"],
    productKeywords: ["botanical", "floral", "lavender", "calm", "wellness"],
    featuredProductHandle: "all-the-bitter-lavender-bitters"
  },
  {
    id: "9",
    title: "Cucumber Mint Cooler",
    occasion: "relaxing",
    tagline: "Cool & composed",
    description: "Fresh cucumber and mint create a refreshingly zen experience with Amethyst Lemon Cucumber Serrano.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh cucumber slices", "Fresh mint leaves", "Lime juice", "2 oz Amethyst Lemon Cucumber Serrano", "Sparkling water"],
    productKeywords: ["gin", "cucumber", "botanical", "herb"],
    featuredProductHandle: "amethyst-na-spirits-lemon-cucumber-serrano"
  },
  {
    id: "r4",
    title: "Rose & Cardamom Elixir",
    occasion: "relaxing",
    tagline: "Exotic tranquility",
    description: "Delicate rose water meets Abstinence Cape Spice and warming cardamom for a Middle Eastern-inspired evening drink.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    prepTime: "6 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Rose water", "2 oz Abstinence Cape Spice", "Cardamom pods", "Honey", "Sparkling water", "Dried rose petals"],
    productKeywords: ["rose", "floral", "botanical", "exotic"],
    featuredProductHandle: "abstinence-spirits-cape-spice"
  },
  {
    id: "r5",
    title: "Sleepy Time Toddy",
    occasion: "relaxing",
    tagline: "Drift off peacefully",
    description: "A warming blend of apple cider, cinnamon, and Abstinence Epilogue X for a cozy nightcap.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    prepTime: "10 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Warm apple cider", "2 oz Abstinence Epilogue X", "Cinnamon stick", "Cloves", "Local honey"],
    productKeywords: ["whiskey", "bourbon", "cider", "warm", "spirit"],
    featuredProductHandle: "abstinence-spirits-epilogue-x"
  },
  {
    id: "r6",
    title: "Vanilla Almond Nightcap",
    occasion: "relaxing",
    tagline: "Sweet serenity",
    description: "Creamy almond milk with Abstinence Epilogue X and a hint of nutmeg for a comforting evening drink.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Almond milk", "2 oz Abstinence Epilogue X", "Vanilla bean", "Maple syrup", "Ground nutmeg"],
    productKeywords: ["cream", "vanilla", "dessert", "sweet", "whiskey"],
    featuredProductHandle: "abstinence-spirits-epilogue-x"
  },

  // BEACH
  {
    id: "10",
    title: "Tropical Sunset",
    occasion: "beach",
    tagline: "Paradise found",
    description: "Pineapple, coconut, and Amethyst Tropical Punch create the ultimate beach day sipper—no umbrella required.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz pineapple juice", "2 oz Amethyst Tropical Punch", "Coconut cream", "Pineapple wedge", "Maraschino cherry"],
    featured: true,
    productKeywords: ["rum", "tropical", "coconut", "pineapple", "caribbean"],
    featuredProductHandle: "amethyst-na-spirits-tropical-punch"
  },
  {
    id: "11",
    title: "Watermelon Wave",
    occasion: "beach",
    tagline: "Summer in a cup",
    description: "Fresh watermelon juice meets Amethyst Watermelon Lime and fresh mint for the most refreshing beach companion.",
    image: "https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?w=800&q=80",
    prepTime: "7 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh watermelon juice", "2 oz Amethyst Watermelon Lime", "Lime juice", "Fresh mint", "Tajín rim"],
    productKeywords: ["tequila", "agave", "margarita", "lime", "mexican"],
    featuredProductHandle: "amethyst-na-spirits-watermelon-lime"
  },
  {
    id: "12",
    title: "Coconut Lime Refresher",
    occasion: "beach",
    tagline: "Coastal vibes only",
    description: "Creamy coconut water, zesty lime, and Amethyst Lime Basil transport you straight to the shoreline.",
    image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["6 oz coconut water", "2 oz Amethyst Lime Basil", "Fresh lime juice", "Lime wheel", "Toasted coconut flakes"],
    productKeywords: ["rum", "coconut", "tropical", "caribbean", "lime"],
    featuredProductHandle: "amethyst-na-spirits-lime-basil"
  },
  {
    id: "be4",
    title: "Mango Tango Margarita",
    occasion: "beach",
    tagline: "Tropical bliss",
    description: "Ripe mango blended with Amethyst Watermelon Lime and lime for an instant vacation in a glass.",
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh mango", "2 oz Amethyst Watermelon Lime", "Lime juice", "Agave nectar", "Chili-lime rim"],
    productKeywords: ["tequila", "agave", "margarita", "mango", "mexican"],
    featuredProductHandle: "amethyst-na-spirits-watermelon-lime"
  },
  {
    id: "be5",
    title: "Piña Colada Dream",
    occasion: "beach",
    tagline: "Classic island escape",
    description: "Creamy coconut, sweet pineapple, and Amethyst Tropical Punch blended to perfection—the beach essential.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz pineapple juice", "2 oz Amethyst Tropical Punch", "Coconut cream", "Pineapple wedge", "Maraschino cherry"],
    productKeywords: ["rum", "coconut", "pineapple", "tropical"],
    featuredProductHandle: "amethyst-na-spirits-tropical-punch"
  },
  {
    id: "be6",
    title: "Sea Breeze Cooler",
    occasion: "beach",
    tagline: "Ocean-fresh vibes",
    description: "Cranberry and grapefruit combine with Abstinence Cape Citrus for a tart, refreshing beach day essential.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz Abstinence Cape Citrus", "3 oz cranberry juice", "3 oz grapefruit juice", "Lime wedge", "Fresh mint"],
    productKeywords: ["vodka", "cranberry", "citrus", "clean"],
    featuredProductHandle: "abstinence-spirits-cape-citrus"
  },

  // CELEBRATION
  {
    id: "13",
    title: "Sparkling Elderflower Royale",
    occasion: "celebration",
    tagline: "Effervescent & elegant",
    description: "Bolle Sparkling White takes center stage in this sophisticated celebration-worthy mocktail.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["5 oz Bolle Sparkling White", "Dash of elderflower cordial", "Lemon twist", "Edible flowers"],
    featured: true,
    productKeywords: ["sparkling", "champagne", "prosecco", "bubbly", "wine"],
    featuredProductHandle: "bolle-sparkling-white"
  },
  {
    id: "14",
    title: "Midnight Toast",
    occasion: "celebration",
    tagline: "Ring in the moment",
    description: "Dark berries, sparkling water, and Abstinence Cape Floral create a dramatic celebration sipper.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["2 oz Abstinence Cape Floral", "Muddled blackberries", "Sparkling water", "Lemon peel", "Fresh blackberries"],
    productKeywords: ["gin", "botanical", "berry", "dark"],
    featuredProductHandle: "abstinence-spirits-cape-floral"
  },
  {
    id: "15",
    title: "Aperitif Spritz Celebration",
    occasion: "celebration",
    tagline: "Cheers to clarity",
    description: "Abstinence Blood Orange Aperitif elevated with fresh peach and basil for those special moments.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz Abstinence Blood Orange Aperitif", "Fresh peach slices", "Basil leaves", "Honey", "Sparkling water"],
    productKeywords: ["aperitif", "spritz", "bitter", "orange", "italian"],
    featuredProductHandle: "abstinence-spirits-blood-orange-aperitif"
  },
  {
    id: "c4",
    title: "Rose Gold Fizz",
    occasion: "celebration",
    tagline: "Blushing elegance",
    description: "A stunning pink mocktail with Bolle Sparkling Rosé and raspberry for special toasts.",
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz Bolle Sparkling Rosé", "Fresh raspberry purée", "Sparkling water", "Edible rose petals", "Gold sugar rim"],
    productKeywords: ["rose", "rosé", "pink", "wine", "floral"],
    featuredProductHandle: "bolle-sparkling-rose"
  },
  {
    id: "c5",
    title: "Champagne Dreams",
    occasion: "celebration",
    tagline: "Pop the bubbles",
    description: "Bolle Sparkling White with white grape and elderflower—as luxurious as the real thing.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["White grape juice", "5 oz Bolle Sparkling White", "Lemon twist", "Fresh thyme sprig"],
    productKeywords: ["sparkling", "champagne", "prosecco", "bubbly", "white"],
    featuredProductHandle: "bolle-sparkling-white"
  },
  {
    id: "c6",
    title: "Berry Jubilee",
    occasion: "celebration",
    tagline: "Festive & fruity",
    description: "A vibrant mix of seasonal berries with Amethyst Blueberry Ginger Mint and sparkling bubbles.",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&q=80",
    prepTime: "7 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Mixed berry purée", "2 oz Amethyst Blueberry Ginger Mint", "Vanilla syrup", "Sparkling water", "Fresh berries"],
    productKeywords: ["vodka", "berry", "fruit", "clean"],
    featuredProductHandle: "amethyst-na-spirits-blueberry-ginger-mint"
  },
  {
    id: "c7",
    title: "Ginger Spice Sparkler",
    occasion: "celebration",
    tagline: "Warm & festive",
    description: "Spicy ginger meets Abstinence Epilogue X and citrus for a warming celebration drink.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh ginger juice", "2 oz Abstinence Epilogue X", "Local honey", "Lemon juice", "Sparkling water"],
    productKeywords: ["whiskey", "bourbon", "ginger", "spice", "warm"],
    featuredProductHandle: "abstinence-spirits-epilogue-x"
  }
];
