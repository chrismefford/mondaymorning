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
  /** How to build the drink, step by step. */
  steps?: string[];
  /** True when `image` is a product bottle cutout (contained on cream) rather than a cocktail photo. */
  imageContain?: boolean;
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

// Bottle shots from our own Shopify CDN, used where the makers' recipe photos show
// products we don't carry (or aren't hotlinkable). These are contained on cream.
const DROMME_AWAKE = "https://cdn.shopify.com/s/files/1/0902/1377/7708/files/AwakeFoundersEdition-NonAlcoholicSpirit.png";
const DROMME_CALM = "https://cdn.shopify.com/s/files/1/0902/1377/7708/files/CalmFoundersEdition-NonAlcoholicSpirit.png";
const ALMAVE_AMBAR = "https://cdn.shopify.com/s/files/1/0902/1377/7708/files/Ambar-NonAlcoholicSpirit.png";
const KAVA_HAVEN = "https://cdn.shopify.com/s/files/1/0902/1377/7708/files/KavaHaven-NonAlcoholicSpirit.png";
const ATB_NEW_ORLEANS = "https://cdn.shopify.com/s/files/1/0902/1377/7708/files/NewOrleansBitters-NonAlcoholicBitters.png";
const CDN = "https://cdn.shopify.com/s/files/1/0902/1377/7708/files";

// The single "hero" bottle shown for each recipe, used on the Behind the Bar page
// and the home recipe section so they stay consistent.
export const RECIPE_BOTTLE: Record<string, string> = {
  "sunny-bear": DROMME_CALM,
  "freckled-soda": DROMME_AWAKE,
  "awake-blackberry-basil-press": DROMME_AWAKE,
  "na-negroni": `${CDN}/Rosso-NonAlcoholicAperitif.png`,
  "ginger-old-fashioned": `${CDN}/Tennyson-NonAlcoholicSpirit.png`,
  "black-manhattan": `${CDN}/Kentucky74-NonAlcoholicSpirit.png`,
  "agave-margarita": ALMAVE_AMBAR,
  "maple-whiskey-sour": `${CDN}/Nightcap-NonAlcoholicSpirit.png`,
  "city-that-sleeps": `${CDN}/Nightcap-NonAlcoholicSpirit.png`,
  "lavender-gin-tonic": `${CDN}/Gin-NonAlcoholicSpirit.png`,
  "earl-grey-martini": `${CDN}/Gin-NonAlcoholicSpirit.png`,
  "cool-cucumber": DROMME_AWAKE,
  "garden-collins": `${CDN}/Aplos-Ease.webp`,
  "easy-does-it": `${CDN}/Aplos-Ease.webp`,
  "kava-mule": KAVA_HAVEN,
  "golden-hour-margarita": ALMAVE_AMBAR,
  "aspen-summer": DROMME_CALM,
  "hibiscus-sour": ATB_NEW_ORLEANS,
  "yuzu-lemon-drop": KAVA_HAVEN,
  "afternoon-delight": `${CDN}/Livener-NonAlcoholicSpirit.png`,
};

// Real recipes, straight from the makers we carry (All The Bitter + Drømme).
// Photos are hotlinked from the brands. Kept rich for SEO, but these are drinks
// we'd actually pour, each built on a bottle you can buy here.
export const recipes: Recipe[] = [
  // ---------- BREAKFAST ----------
  {
    id: "sunny-bear",
    title: "Sunny Bear",
    occasion: "breakfast",
    tagline: "Bright, honeyed, calm",
    description:
      "Drømme Calm shaken with lemon, honey and fresh mint, then lengthened with soda. A gentle, golden way to start the day, zero-proof.",
    image: DROMME_CALM,
    imageContain: true,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "2 oz Drømme Calm",
      "¾ oz lemon juice",
      "¾ oz honey syrup",
      "Pinch of fresh mint",
      "Soda water, to top",
    ],
    steps: [
      "Add Drømme Calm, lemon juice, honey syrup and mint to a shaker with ice.",
      "Shake until well chilled.",
      "Strain over fresh ice in a Collins glass.",
      "Top with soda water and garnish with mint.",
    ],
    productKeywords: ["drømme", "dromme", "calm", "functional"],
    featuredProductHandle: "dromme-calm-founder-edition",
  },
  {
    id: "freckled-soda",
    title: "Freckled Soda",
    occasion: "breakfast",
    tagline: "Strawberry, mint & sparkle",
    description:
      "Muddled strawberry and mint meet Drømme Awake over soda, an energizing berry refresher with a little adaptogenic lift.",
    image: DROMME_AWAKE,
    imageContain: true,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "2 oz Drømme Awake",
      "2 strawberries",
      "4 mint leaves",
      "¾ oz lemon juice",
      "¾ oz simple syrup",
      "Soda water, to top",
    ],
    steps: [
      "Muddle strawberries and mint with lemon juice and simple syrup.",
      "Add Drømme Awake and ice, then shake.",
      "Double strain over ice in a rocks glass.",
      "Top with soda water and garnish with strawberry slices and mint.",
    ],
    productKeywords: ["drømme", "dromme", "awake", "functional"],
    featuredProductHandle: "dromme-awake-founder-edition",
  },
  {
    id: "awake-blackberry-basil-press",
    title: "Blackberry Basil Press",
    occasion: "breakfast",
    tagline: "Berry-basil energy",
    description:
      "Drømme Awake pressed with blackberry, basil and soda. A bright, herbaceous wake-up that earns its place at brunch.",
    image: DROMME_AWAKE,
    imageContain: true,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "1½ oz Drømme Awake",
      "4 blackberries",
      "5 basil leaves",
      "½ oz simple syrup",
      "Soda water, to top",
    ],
    steps: [
      "Muddle blackberries and basil in a highball glass.",
      "Add Drømme Awake and simple syrup, then shake with ice and strain back.",
      "Top with soda water and ice.",
      "Garnish with a basil leaf.",
    ],
    productKeywords: ["drømme", "dromme", "awake", "functional"],
    featuredProductHandle: "dromme-awake-founder-edition",
  },

  // ---------- DINNER ----------
  {
    id: "na-negroni",
    title: "The Negroni",
    occasion: "dinner",
    tagline: "The bittersweet classic, zero-proof",
    description:
      "All The Bitter's take on the icon, built on Monday Zero Gin, Roots Divino and a double hit of ATB bitters. Stirred, balanced, no compromise.",
    image:
      "https://allthebitter.com/cdn/shop/articles/20251203055008-non-20alcoholic-20negroni-20mocktail_7314dd59-9c5d-4bc5-92db-0bd4f1505dfb.jpg",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    featured: true,
    ingredients: [
      "1½ oz Monday Zero Alcohol Gin",
      "1¼ oz Giffard Aperitif Syrup",
      "½ oz Roots Divino Sweet Vermouth",
      "5 dashes ATB Aromatic Bitters",
      "3 dashes ATB Orange Bitters",
      "Orange peel, to garnish",
    ],
    steps: [
      "Add all ingredients to a mixing glass with ice.",
      "Stir until well chilled, about 20 seconds.",
      "Strain over a large cube in a rocks glass.",
      "Express an orange peel over the top and drop it in.",
    ],
    productKeywords: ["monday", "gin", "negroni", "aperitif", "bitter"],
    featuredProductHandle: "monday-gin",
  },
  {
    id: "ginger-old-fashioned",
    title: "Ginger Old Fashioned",
    occasion: "dinner",
    tagline: "Spiced & spirit-forward",
    description:
      "Spiritless Kentucky 74 and Tennyson Black Ginger over a big cube, with ginger syrup and ATB Aromatic Bitters. A whiskey ritual without the booze.",
    image:
      "https://images.getrecipekit.com/20251201203537-non-20alcoholic-20ginger-20old-20fashioned-20mocktail.jpg?aspect_ratio=16:9&quality=90",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "1½ oz Spiritless Kentucky 74",
      "1 oz Tennyson Black Ginger",
      "¼ oz ginger syrup",
      "5 dashes ATB Aromatic Bitters",
      "Lemon twist, to garnish",
    ],
    steps: [
      "Add chilled spirits, syrup and bitters to a rocks glass.",
      "Add ice, preferably one large cube.",
      "Stir for 10 to 15 seconds.",
      "Express a lemon twist over the drink and garnish.",
    ],
    productKeywords: ["tenneyson", "ginger", "kentucky", "whiskey", "old fashioned"],
    featuredProductHandle: "tenneyson",
  },
  {
    id: "black-manhattan",
    title: "Black Manhattan",
    occasion: "dinner",
    tagline: "Dark, herbal, stirred",
    description:
      "Spiritless Kentucky 74 and The Pathfinder amaro with ATB Coffee Bitters, strained ice-cold into a coupe. Deep and a little brooding.",
    image:
      "https://allthebitter.com/cdn/shop/articles/20251202070243-non-20alcoholic-20black-20manhattan-20mocktail_e75abbc1-a673-4791-9bc3-1c4477b365cb.jpg",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    featured: true,
    ingredients: [
      "2 oz Spiritless Kentucky 74",
      "1 oz The Pathfinder",
      "5 dashes ATB Coffee Bitters",
      "Cocktail cherry, to garnish",
    ],
    steps: [
      "Keep spirits refrigerated to limit dilution.",
      "Combine pre-chilled spirits and bitters in a mixing glass.",
      "Stir to blend, then strain into a frozen coupe.",
      "Garnish with a cocktail cherry.",
    ],
    productKeywords: ["pathfinder", "amaro", "manhattan", "kentucky", "whiskey"],
    featuredProductHandle: "the-pathfinder-hemp-and-root",
  },
  {
    id: "agave-margarita",
    title: "Agave Margarita",
    occasion: "dinner",
    tagline: "The shaken classic",
    description:
      "Almave Ámbar shaken with lime, agave and ATB Orange Cardamom Bitters. Salt rim optional, hangover never.",
    image: ALMAVE_AMBAR,
    imageContain: true,
    prepTime: "4 min",
    servings: 1,
    difficulty: "Easy",
    featured: true,
    ingredients: [
      "2 oz Almave Ámbar",
      "¾ oz lime juice",
      "½ oz agave nectar",
      "7 dashes ATB Orange Cardamom Bitters",
      "Pinch of salt (optional)",
    ],
    steps: [
      "Add all ingredients to a shaker with ice.",
      "Shake for 6 to 8 seconds.",
      "Strain into a rocks glass over fresh ice.",
      "Garnish with a lime wedge and an optional salt rim.",
    ],
    productKeywords: ["almave", "tequila", "agave", "margarita", "blanco"],
    featuredProductHandle: "almave-ambar",
  },

  // ---------- RELAXING ----------
  {
    id: "maple-whiskey-sour",
    title: "Maple Whiskey Sour",
    occasion: "relaxing",
    tagline: "Silky & unwinding",
    description:
      "Three Spirit Nightcap and Spiritless Kentucky 74 with lemon, maple and ATB Fig & Walnut Bitters, foamed to a velvet finish.",
    image:
      "https://images.getrecipekit.com/20251202061544-non-20alcoholic-20whiskey-20sour-20mocktail.jpg?aspect_ratio=16:9&quality=90",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Medium",
    featured: true,
    ingredients: [
      "1½ oz Spiritless Kentucky 74",
      "1 oz Three Spirit Nightcap",
      "¾ oz lemon juice",
      "½ oz maple syrup",
      "7 dashes ATB Fig & Walnut Bitters",
      "1 egg white (optional)",
    ],
    steps: [
      "Add all ingredients to a shaker.",
      "Dry shake without ice for 20 seconds if using egg white.",
      "Add ice and shake again until chilled.",
      "Fine strain into a coupe.",
    ],
    productKeywords: ["three spirit", "nightcap", "whiskey", "sour", "kentucky"],
    featuredProductHandle: "three-spirit-nightcap",
  },
  {
    id: "city-that-sleeps",
    title: "The City That Sleeps",
    occasion: "relaxing",
    tagline: "A Manhattan that winds down",
    description:
      "Three Spirit Nightcap, Kentucky 74 and Roots Divino, stirred cold with ATB bitters. Built for the quiet end of the night.",
    image:
      "https://images.getrecipekit.com/20251202064308-non-20alcoholic-20sleepy-20mocktail-20manhattan.jpg?aspect_ratio=16:9&quality=90",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "1½ oz Three Spirit Nightcap",
      "1 oz Spiritless Kentucky 74",
      "½ oz Roots Divino Sweet Vermouth",
      "2 dashes ATB Aromatic Bitters",
      "2 dashes ATB Orange Bitters",
    ],
    steps: [
      "Keep spirits chilled to prevent dilution.",
      "Combine pre-chilled spirits and bitters in a mixing glass.",
      "Stir to blend, then pour into a frozen coupe.",
      "Garnish with a cocktail cherry and orange twist.",
    ],
    productKeywords: ["three spirit", "nightcap", "manhattan", "vermouth"],
    featuredProductHandle: "three-spirit-nightcap",
  },
  {
    id: "lavender-gin-tonic",
    title: "Lavender Gin & Tonic",
    occasion: "relaxing",
    tagline: "Floral & easy",
    description:
      "Monday Zero Gin with lavender syrup, lemon, tonic and ATB Lavender Chamomile Bitters. The most relaxing highball on the shelf.",
    image:
      "https://images.getrecipekit.com/20260509011754-non-20alcoholic-20lavender-20gin-20and-20tonic-20mocktail-20recipe.jpg?aspect_ratio=16:9&quality=90",
    prepTime: "3 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "2 oz Monday Zero Alcohol Gin",
      "½ oz lemon juice",
      "½ oz lavender syrup",
      "5 dashes ATB Lavender Chamomile Bitters",
      "4 oz tonic water",
    ],
    steps: [
      "Build gin, lavender syrup, lemon and bitters in a highball glass over ice.",
      "Top with tonic water.",
      "Stir gently.",
      "Garnish with a lemon wedge.",
    ],
    productKeywords: ["monday", "gin", "tonic", "lavender"],
    featuredProductHandle: "monday-gin",
  },
  {
    id: "earl-grey-martini",
    title: "Earl Grey Martini",
    occasion: "relaxing",
    tagline: "Tea-time, dressed up",
    description:
      "Monday Zero Gin shaken with chilled Earl Grey, lavender syrup, lemon and ATB Lavender Chamomile Bitters. Elegant, fragrant, calm.",
    image:
      "https://images.getrecipekit.com/20260522203300-non-20alcoholic-20earl-20grey-20martini-20mocktail-20recipe.jpg?aspect_ratio=16:9&quality=90",
    prepTime: "5 min",
    servings: 1,
    difficulty: "Medium",
    ingredients: [
      "1¾ oz Monday Zero Alcohol Gin",
      "1½ oz strong Earl Grey tea, chilled",
      "¾ oz lavender syrup",
      "¾ oz lemon juice",
      "7 dashes ATB Lavender Chamomile Bitters",
    ],
    steps: [
      "Brew Earl Grey strong, steeping 10 to 15 minutes, then chill.",
      "Combine all ingredients in a shaker with ice.",
      "Shake for 6 seconds.",
      "Strain into a cocktail glass and garnish with expressed lemon peel.",
    ],
    productKeywords: ["monday", "gin", "martini", "earl grey", "tea"],
    featuredProductHandle: "monday-gin",
  },
  {
    id: "cool-cucumber",
    title: "Cool Cucumber",
    occasion: "relaxing",
    tagline: "Crisp & calming",
    description:
      "Drømme Awake muddled with cucumber and lime over soda. Cooling, energizing and zero-proof, courtesy of Drømme.",
    image: DROMME_AWAKE,
    imageContain: true,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "2 oz Drømme Awake",
      "3 cucumber slices",
      "¾ oz lime juice",
      "¾ oz agave nectar",
      "Soda water, to top",
    ],
    steps: [
      "Muddle cucumber with lime juice and agave.",
      "Add Drømme Awake and ice, then shake.",
      "Strain over ice in a highball glass.",
      "Top with soda water and garnish with a cucumber slice.",
    ],
    productKeywords: ["drømme", "dromme", "awake", "functional"],
    featuredProductHandle: "dromme-awake-founder-edition",
  },

  // ---------- BEACH ----------
  {
    id: "garden-collins",
    title: "Garden Collins",
    occasion: "beach",
    tagline: "Herb garden in a glass",
    description:
      "Aplós Ease lengthened with lemon, ATB Herb Garden Bitters and club soda. Long, fresh and made for a hot afternoon.",
    image:
      "https://images.getrecipekit.com/20260413013313-non-20alcoholic-20garden-20collins-20mocktail-20recipe.jpg?aspect_ratio=16:9&quality=90",
    prepTime: "4 min",
    servings: 1,
    difficulty: "Easy",
    featured: true,
    ingredients: [
      "2 oz Aplós Ease",
      "1 oz lemon juice",
      "½ oz simple syrup",
      "7 dashes ATB Herb Garden Bitters",
      "4 oz club soda",
      "Mint & lemon, to garnish",
    ],
    steps: [
      "Add Aplós, lemon, simple syrup and bitters to a Collins glass.",
      "Fill with ice and stir.",
      "Top with club soda.",
      "Garnish with mint and a lemon wheel.",
    ],
    productKeywords: ["aplós", "aplos", "ease", "collins"],
    featuredProductHandle: "aplos-ease",
  },
  {
    id: "easy-does-it",
    title: "Easy Does It",
    occasion: "beach",
    tagline: "Mojito, the calm version",
    description:
      "Muddled lime and mint with Aplós Ease, ATB Herb Garden Bitters and a splash of soda. Breezy, herbal and dangerously easy.",
    image:
      "https://images.getrecipekit.com/20260413030232-non-20alcoholic-20caipirinha-20mocktail-20recipe.jpg",
    prepTime: "4 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "2 oz Aplós Ease",
      "4 lime wedges",
      "¼ oz simple syrup",
      "6 mint leaves",
      "5 dashes ATB Herb Garden Bitters",
      "1 oz club soda",
    ],
    steps: [
      "Muddle lime wedges with simple syrup in a shaker tin.",
      "Add Aplós, bitters, mint and ice, then shake for 6 to 8 seconds.",
      "Pour into a rocks glass and top with club soda.",
      "Garnish with mint and a lime wheel.",
    ],
    productKeywords: ["aplós", "aplos", "ease", "mojito", "mint"],
    featuredProductHandle: "aplos-ease",
  },
  {
    id: "kava-mule",
    title: "Kava Mule",
    occasion: "beach",
    tagline: "Ginger kick, kava calm",
    description:
      "Kava Haven with lime, pineapple, ATB Aromatic Bitters and ginger beer in a frosty mule mug. Spicy, tropical, mellow.",
    image: KAVA_HAVEN,
    imageContain: true,
    prepTime: "4 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "1½ oz Kava Haven",
      "½ oz lime juice",
      "½ oz pineapple syrup",
      "7 dashes ATB Aromatic Bitters",
      "4-5 oz ginger beer",
    ],
    steps: [
      "Shake everything except ginger beer with ice for 6 to 8 seconds.",
      "Strain into a mule mug filled with ice.",
      "Top with ginger beer and stir gently.",
      "Garnish with a lime wheel and mint.",
    ],
    productKeywords: ["kava", "haven", "mule", "ginger", "functional"],
    featuredProductHandle: "kava-haven-kava-infused-spirit",
  },
  {
    id: "golden-hour-margarita",
    title: "Golden Hour Margarita",
    occasion: "beach",
    tagline: "Pineapple sunset",
    description:
      "A pineapple margarita built on Almave Ámbar with lime and ATB Aromatic Bitters. Sweet, sour and tuned for the end of the day.",
    image: ALMAVE_AMBAR,
    imageContain: true,
    prepTime: "4 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "2 oz Almave Ámbar",
      "1 oz lime juice",
      "¾ oz pineapple syrup",
      "3 dashes ATB Aromatic Bitters",
    ],
    steps: [
      "Add all ingredients to a shaker with ice.",
      "Shake until chilled.",
      "Strain into a rocks glass over fresh ice.",
      "Garnish with a lime wedge.",
    ],
    productKeywords: ["almave", "tequila", "margarita", "pineapple"],
    featuredProductHandle: "almave-ambar",
  },
  {
    id: "aspen-summer",
    title: "Aspen Summer",
    occasion: "beach",
    tagline: "Pineapple & lime, unwound",
    description:
      "Drømme Calm shaken with pineapple, lime and simple syrup. Easy, breezy and zero-proof, a poolside staple from Drømme.",
    image: DROMME_CALM,
    imageContain: true,
    prepTime: "5 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "2 oz Drømme Calm",
      "¾ oz lime juice",
      "¾ oz simple syrup",
      "2 oz pineapple juice",
      "Pineapple leaf (optional)",
    ],
    steps: [
      "Add all ingredients to a tin with ice.",
      "Shake until chilled.",
      "Pour into a Collins glass.",
      "Garnish with a pineapple leaf.",
    ],
    productKeywords: ["drømme", "dromme", "calm", "functional"],
    featuredProductHandle: "dromme-calm-founder-edition",
  },

  // ---------- CELEBRATION ----------
  {
    id: "hibiscus-sour",
    title: "Hibiscus Sour",
    occasion: "celebration",
    tagline: "Ruby & frothy",
    description:
      "Chilled hibiscus tea with grapefruit, lime, agave and ATB New Orleans Bitters, shaken to a blush foam. A showpiece in a coupe.",
    image: ATB_NEW_ORLEANS,
    imageContain: true,
    prepTime: "6 min",
    servings: 1,
    difficulty: "Medium",
    featured: true,
    ingredients: [
      "2½ oz hibiscus tea, chilled",
      "¾ oz grapefruit juice",
      "¾ oz lime juice",
      "½ oz agave nectar",
      "5 dashes ATB New Orleans Bitters",
      "1 egg white (optional)",
    ],
    steps: [
      "Brew and chill the hibiscus tea.",
      "Combine all ingredients in a shaker. Dry shake 20 seconds if using egg white.",
      "Add ice and shake until chilled.",
      "Fine strain into a coupe.",
    ],
    productKeywords: ["all the bitter", "bitters", "hibiscus", "sour", "new orleans"],
    featuredProductHandle: "all-the-bitter-new-orleans-bitters",
  },
  {
    id: "yuzu-lemon-drop",
    title: "Yuzu Meyer Lemon Drop",
    occasion: "celebration",
    tagline: "Bright, sugared, festive",
    description:
      "Kava Haven shaken with yuzu, Meyer lemon and ATB Orange Cardamom Bitters in a sugar-rimmed coupe. A celebration in citrus.",
    image:
      "https://images.getrecipekit.com/20251204023457-non-20alcoholic-20lemon-20drop-20kava-20mocktail.jpg?aspect_ratio=16:9&quality=90",
    prepTime: "4 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "1½ oz Kava Haven",
      "¾ oz yuzu juice (or lemon)",
      "¾ oz Meyer lemon syrup (or simple)",
      "7 dashes ATB Orange Cardamom Bitters",
    ],
    steps: [
      "Add all ingredients to a shaker with ice.",
      "Shake hard for 6 to 8 seconds.",
      "Strain into a sugar-rimmed coupe.",
      "Garnish with a lemon twist.",
    ],
    productKeywords: ["kava", "haven", "lemon drop", "yuzu", "functional"],
    featuredProductHandle: "kava-haven-kava-infused-spirit",
  },
  {
    id: "afternoon-delight",
    title: "Afternoon Delight",
    occasion: "celebration",
    tagline: "Sparkling pick-me-up",
    description:
      "Three Spirit Livener and Kava Haven with yuzu, Meyer lemon and ATB Orange Bitters, topped with sparkle. Bright, buzzy, alcohol-free.",
    image:
      "https://images.getrecipekit.com/20251204065944-non-20alcoholic-20kava-20caffeine-20mocktail.jpg?aspect_ratio=16:9&quality=90",
    prepTime: "4 min",
    servings: 1,
    difficulty: "Easy",
    ingredients: [
      "1½ oz Three Spirit Livener",
      "1 oz Kava Haven",
      "½ oz yuzu juice",
      "½ oz Meyer lemon syrup",
      "5 dashes ATB Orange Bitters",
      "3-4 oz sparkling water",
    ],
    steps: [
      "Shake spirits, juice, syrup and bitters with ice briefly.",
      "Strain into a Collins glass over fresh ice.",
      "Top with sparkling water and stir gently.",
      "Garnish with a lemon wheel.",
    ],
    productKeywords: ["three spirit", "livener", "kava", "functional"],
    featuredProductHandle: "three-spirit-livener",
  },
];
