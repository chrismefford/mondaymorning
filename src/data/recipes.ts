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
  {
    id: "b4",
    title: "Grapefruit Rosemary Spritz",
    occasion: "breakfast",
    tagline: "Bright & herbaceous",
    description: "Fresh grapefruit juice meets aromatic rosemary for a sophisticated breakfast sipper.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz fresh grapefruit juice", "Rosemary simple syrup", "Sparkling water", "Rosemary sprig", "Grapefruit slice"]
  },
  {
    id: "b5",
    title: "Peach Bellini",
    occasion: "breakfast",
    tagline: "Classic brunch elegance",
    description: "Velvety peach purée meets our sparkling elderflower for a timeless brunch favorite.",
    image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh peach purée", "4 oz Sparkling Elderflower", "Peach slice", "Fresh mint"]
  },
  {
    id: "b6",
    title: "Tropical Acai Refresher",
    occasion: "breakfast",
    tagline: "Superfood sunrise",
    description: "Antioxidant-rich acai blended with tropical fruits for an energizing morning boost.",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&q=80",
    prepTime: "8 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Acai purée", "Pineapple juice", "Coconut water", "Fresh berries", "Chia seeds"]
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
    ingredients: ["1 bottle Velvet Rouge", "Sliced oranges", "Fresh berries", "Cinnamon stick", "Sparkling water"],
    featured: true
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
  {
    id: "d4",
    title: "Smoked Maple Old Fashioned",
    occasion: "dinner",
    tagline: "Bold & refined",
    description: "A sophisticated NA twist on the classic, with smoked maple syrup and aromatic bitters.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Medium",
    ingredients: ["3 oz Midnight Botanical", "Smoked maple syrup", "Aromatic bitters", "Orange peel", "Luxardo cherry"]
  },
  {
    id: "d5",
    title: "Herb Garden Gimlet",
    occasion: "dinner",
    tagline: "Fresh from the garden",
    description: "A vibrant blend of fresh herbs, lime, and our botanical waters for a crisp dinner starter.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh basil", "Fresh mint", "Lime juice", "Simple syrup", "Sparkling water", "Cucumber slice"]
  },
  {
    id: "d6",
    title: "Spiced Pear Fizz",
    occasion: "dinner",
    tagline: "Autumn in a glass",
    description: "Ripe pear nectar meets warming spices for a cozy dinner companion.",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    prepTime: "7 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh pear juice", "Cinnamon stick", "Star anise", "Ginger syrup", "Sparkling water"]
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
    ingredients: ["Chamomile tea", "Local honey", "Fresh lemon juice", "Cinnamon stick", "Star anise"],
    featured: true
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
  {
    id: "r4",
    title: "Rose & Cardamom Elixir",
    occasion: "relaxing",
    tagline: "Exotic tranquility",
    description: "Delicate rose water meets warming cardamom for a Middle Eastern-inspired evening drink.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    prepTime: "6 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Rose water", "Cardamom pods", "Honey", "Lemon juice", "Sparkling water", "Dried rose petals"]
  },
  {
    id: "r5",
    title: "Sleepy Time Toddy",
    occasion: "relaxing",
    tagline: "Drift off peacefully",
    description: "A warming blend of apple cider, cinnamon, and chamomile to help you wind down.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
    prepTime: "10 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Warm apple cider", "Chamomile tea", "Cinnamon stick", "Cloves", "Local honey"]
  },
  {
    id: "r6",
    title: "Vanilla Almond Nightcap",
    occasion: "relaxing",
    tagline: "Sweet serenity",
    description: "Creamy almond milk with vanilla and a hint of nutmeg for a comforting evening ritual.",
    image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Almond milk", "Vanilla bean", "Maple syrup", "Ground nutmeg", "Cinnamon"]
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
    ingredients: ["4 oz pineapple juice", "2 oz coconut cream", "Splash of grenadine", "Pineapple wedge", "Maraschino cherry"],
    featured: true
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
  {
    id: "be4",
    title: "Mango Tango",
    occasion: "beach",
    tagline: "Tropical bliss",
    description: "Ripe mango blended with passion fruit and lime for an instant vacation in a glass.",
    image: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh mango", "Passion fruit juice", "Lime juice", "Agave nectar", "Chili-lime rim"]
  },
  {
    id: "be5",
    title: "Piña Colada Dream",
    occasion: "beach",
    tagline: "Classic island escape",
    description: "Creamy coconut and sweet pineapple blended to perfection—the beach essential.",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["4 oz pineapple juice", "2 oz coconut cream", "Crushed ice", "Pineapple wedge", "Maraschino cherry"]
  },
  {
    id: "be6",
    title: "Sea Breeze Cooler",
    occasion: "beach",
    tagline: "Ocean-fresh vibes",
    description: "Cranberry and grapefruit combine for a tart, refreshing beach day essential.",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["3 oz cranberry juice", "3 oz grapefruit juice", "Lime wedge", "Sparkling water", "Fresh mint"]
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
    ingredients: ["5 oz Sparkling Elderflower", "Dash of elderflower cordial", "Lemon twist", "Edible flowers"],
    featured: true
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
  },
  {
    id: "c4",
    title: "Rose Gold Fizz",
    occasion: "celebration",
    tagline: "Blushing elegance",
    description: "A stunning pink mocktail with rose, raspberry, and sparkling bubbles for special toasts.",
    image: "https://images.unsplash.com/photo-1587223962930-cb7f31384c19?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Rose water", "Fresh raspberry purée", "Sparkling water", "Edible rose petals", "Gold sugar rim"]
  },
  {
    id: "c5",
    title: "Champagne Dreams",
    occasion: "celebration",
    tagline: "Pop the bubbles",
    description: "Our finest sparkling base with white grape and elderflower—as luxurious as the real thing.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["White grape juice", "Sparkling Elderflower", "Lemon twist", "Fresh thyme sprig"]
  },
  {
    id: "c6",
    title: "Berry Jubilee",
    occasion: "celebration",
    tagline: "Festive & fruity",
    description: "A vibrant mix of seasonal berries with sparkling bubbles and a hint of vanilla.",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=800&q=80",
    prepTime: "7 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Mixed berry purée", "Vanilla syrup", "Sparkling water", "Fresh berries", "Mint sprig"]
  },
  {
    id: "c7",
    title: "Ginger Spice Sparkler",
    occasion: "celebration",
    tagline: "Warm & festive",
    description: "Spicy ginger meets honey and citrus for a warming celebration drink perfect for any season.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: ["Fresh ginger juice", "Local honey", "Lemon juice", "Sparkling water", "Candied ginger"]
  }
];
