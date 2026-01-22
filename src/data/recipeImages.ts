// Recipe card images - 30 unique NA beverage photos
// Import these in Recipe components to display varied drink imagery

// Wine & Sparkling
import naRedWineGlass from "@/assets/recipes/na-red-wine-glass.jpg";
import naSparklingWhite from "@/assets/recipes/na-sparkling-white.jpg";
import roseSpritzer from "@/assets/recipes/rose-spritzer.jpg";
import naChardonnay from "@/assets/recipes/na-chardonnay.jpg";
import berrySangria from "@/assets/recipes/berry-sangria.jpg";
import peachBellini from "@/assets/recipes/peach-bellini.jpg";

// Beer & Cider
import naIpaBeer from "@/assets/recipes/na-ipa-beer.jpg";
import naStoutBeer from "@/assets/recipes/na-stout-beer.jpg";
import naWheatBeer from "@/assets/recipes/na-wheat-beer.jpg";
import naPilsner from "@/assets/recipes/na-pilsner.jpg";
import naPaleAle from "@/assets/recipes/na-pale-ale.jpg";
import naPorter from "@/assets/recipes/na-porter.jpg";
import naCider from "@/assets/recipes/na-cider.jpg";

// Spirits & Cocktails
import naOldFashioned from "@/assets/recipes/na-old-fashioned-cocktail.jpg";
import naWhiskeySour from "@/assets/recipes/na-whiskey-sour.jpg";
import naNegroni from "@/assets/recipes/na-negroni.jpg";
import bittersSoda from "@/assets/recipes/bitters-soda.jpg";
import botanicalMocktail from "@/assets/recipes/botanical-mocktail.jpg";
import virginMojito from "@/assets/recipes/virgin-mojito.jpg";
import virginMargarita from "@/assets/recipes/virgin-margarita.jpg";
import virginJulep from "@/assets/recipes/virgin-julep.jpg";
import virginPaloma from "@/assets/recipes/virgin-paloma.jpg";
import gingerBeerMule from "@/assets/recipes/ginger-beer-mule.jpg";
import aperitifSpritz from "@/assets/recipes/aperitif-spritz.jpg";

// Tropical & Fruity
import tropicalMocktail from "@/assets/recipes/tropical-mocktail.jpg";
import strawberryDaiquiri from "@/assets/recipes/strawberry-daiquiri.jpg";
import watermelonFresca from "@/assets/recipes/watermelon-fresca.jpg";
import blueLagoon from "@/assets/recipes/blue-lagoon.jpg";
import passionFruit from "@/assets/recipes/passion-fruit.jpg";
import bloodOrange from "@/assets/recipes/blood-orange.jpg";
import hibiscusTea from "@/assets/recipes/hibiscus-tea.jpg";
import mangoLassi from "@/assets/recipes/mango-lassi.jpg";
import coconutDrink from "@/assets/recipes/coconut-drink.jpg";
import cranberrySpritzer from "@/assets/recipes/cranberry-spritzer.jpg";

// Relaxing & Wellness
import lavenderLemonade from "@/assets/recipes/lavender-lemonade.jpg";
import honeyChamomile from "@/assets/recipes/honey-chamomile.jpg";
import cucumberCooler from "@/assets/recipes/cucumber-cooler.jpg";
import kombuchaGlass from "@/assets/recipes/kombucha-glass.jpg";
import matchaDrink from "@/assets/recipes/matcha-drink.jpg";
import spicedPear from "@/assets/recipes/spiced-pear.jpg";
import darkStormy from "@/assets/recipes/dark-stormy.jpg";
import espressoMocktail from "@/assets/recipes/espresso-mocktail.jpg";

// Organized by vibe for easy selection
export const recipeImages = {
  // Wine-based
  wine: {
    red: naRedWineGlass,
    sparklingWhite: naSparklingWhite,
    rose: roseSpritzer,
    chardonnay: naChardonnay,
    sangria: berrySangria,
    bellini: peachBellini,
  },
  
  // Beer-based
  beer: {
    ipa: naIpaBeer,
    stout: naStoutBeer,
    wheat: naWheatBeer,
    pilsner: naPilsner,
    paleAle: naPaleAle,
    porter: naPorter,
    cider: naCider,
  },
  
  // Spirit cocktails
  spirits: {
    oldFashioned: naOldFashioned,
    whiskeySour: naWhiskeySour,
    negroni: naNegroni,
    bitters: bittersSoda,
    botanical: botanicalMocktail,
    mojito: virginMojito,
    margarita: virginMargarita,
    julep: virginJulep,
    paloma: virginPaloma,
    mule: gingerBeerMule,
    spritz: aperitifSpritz,
    espresso: espressoMocktail,
    darkStormy: darkStormy,
  },
  
  // Tropical & fruity
  tropical: {
    pinaColada: tropicalMocktail,
    strawberry: strawberryDaiquiri,
    watermelon: watermelonFresca,
    blueLagoon: blueLagoon,
    passionFruit: passionFruit,
    bloodOrange: bloodOrange,
    hibiscus: hibiscusTea,
    mango: mangoLassi,
    coconut: coconutDrink,
    cranberry: cranberrySpritzer,
  },
  
  // Relaxing & wellness
  relaxing: {
    lavender: lavenderLemonade,
    chamomile: honeyChamomile,
    cucumber: cucumberCooler,
    kombucha: kombuchaGlass,
    matcha: matchaDrink,
    pear: spicedPear,
  },
};

// Flat array for random selection / hashing
export const allRecipeImages = [
  naRedWineGlass,
  naSparklingWhite,
  roseSpritzer,
  naChardonnay,
  berrySangria,
  peachBellini,
  naIpaBeer,
  naStoutBeer,
  naWheatBeer,
  naPilsner,
  naPaleAle,
  naPorter,
  naCider,
  naOldFashioned,
  naWhiskeySour,
  naNegroni,
  bittersSoda,
  botanicalMocktail,
  virginMojito,
  virginMargarita,
  virginJulep,
  virginPaloma,
  gingerBeerMule,
  aperitifSpritz,
  tropicalMocktail,
  strawberryDaiquiri,
  watermelonFresca,
  blueLagoon,
  passionFruit,
  bloodOrange,
  hibiscusTea,
  mangoLassi,
  coconutDrink,
  cranberrySpritzer,
  lavenderLemonade,
  honeyChamomile,
  cucumberCooler,
  kombuchaGlass,
  matchaDrink,
  spicedPear,
  darkStormy,
  espressoMocktail,
];

// Direct mapping of recipe IDs to contextually appropriate images - ALL UNIQUE
export const recipeImageMap: Record<string, string> = {
  // BREAKFAST (6 recipes - 6 unique images)
  "1": naSparklingWhite,        // Sunrise Mimosa - sparkling wine
  "2": matchaDrink,              // Morning Clarity Fizz - wellness drink
  "3": lavenderLemonade,         // Blueberry Lavender Lemonade
  "b4": bloodOrange,             // Grapefruit Rosemary Spritz
  "b5": peachBellini,            // Peach Bellini
  "b6": passionFruit,            // Tropical Acai Refresher
  
  // DINNER (6 recipes - 6 unique images)
  "4": berrySangria,             // NA Red Wine Sangria
  "5": aperitifSpritz,           // Rosemary Citrus Spritz
  "6": botanicalMocktail,        // Botanical Gin & Tonic
  "d4": naOldFashioned,          // Smoked Maple Old Fashioned
  "d5": virginMojito,            // Herb Garden Gimlet
  "d6": spicedPear,              // Spiced Pear Fizz
  
  // RELAXING (6 recipes - 6 unique images)
  "7": honeyChamomile,           // Chamomile Honey Soother
  "8": hibiscusTea,              // Lavender Dreams
  "9": cucumberCooler,           // Cucumber Mint Cooler
  "r4": roseSpritzer,            // Rose & Cardamom Elixir
  "r5": darkStormy,              // Sleepy Time Toddy
  "r6": espressoMocktail,        // Vanilla Almond Nightcap
  
  // BEACH (6 recipes - 6 unique images)
  "10": tropicalMocktail,        // Tropical Sunset
  "11": watermelonFresca,        // Watermelon Wave
  "12": coconutDrink,            // Coconut Lime Refresher
  "be4": mangoLassi,             // Mango Tango Margarita
  "be5": blueLagoon,             // Piña Colada Dream
  "be6": cranberrySpritzer,      // Sea Breeze Cooler
  
  // CELEBRATION (7 recipes - 7 unique images)
  "13": naChardonnay,            // Sparkling Elderflower Royale
  "14": naRedWineGlass,          // Midnight Toast
  "15": bittersSoda,             // Aperitif Spritz Celebration
  "c4": strawberryDaiquiri,      // Rose Gold Fizz
  "c5": virginJulep,             // Champagne Dreams
  "c6": virginPaloma,            // Berry Jubilee
  "c7": gingerBeerMule,          // Ginger Spice Sparkler
};

// Get the mapped image for a recipe, with fallback
export function getRecipeImage(recipeId: string): string {
  return recipeImageMap[recipeId] || allRecipeImages[0];
}

// Get image by occasion and index for variety (fallback for unmapped recipes)
export function getImageByOccasion(occasion: string, index: number): string {
  const occasionImages: Record<string, string[]> = {
    breakfast: [naSparklingWhite, matchaDrink, lavenderLemonade, bloodOrange, peachBellini, passionFruit],
    dinner: [berrySangria, aperitifSpritz, botanicalMocktail, naOldFashioned, virginMojito, spicedPear],
    relaxing: [honeyChamomile, hibiscusTea, cucumberCooler, roseSpritzer, darkStormy, espressoMocktail],
    beach: [tropicalMocktail, watermelonFresca, coconutDrink, mangoLassi, blueLagoon, cranberrySpritzer],
    celebration: [naChardonnay, naRedWineGlass, bittersSoda, strawberryDaiquiri, virginJulep, virginPaloma, gingerBeerMule],
  };
  
  const images = occasionImages[occasion] || allRecipeImages;
  return images[index % images.length];
}

export default recipeImages;
