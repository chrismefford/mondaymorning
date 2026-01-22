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

// Get a consistent image for a recipe based on its ID
export function getRecipeImage(recipeId: string): string {
  const hash = recipeId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return allRecipeImages[hash % allRecipeImages.length];
}

// Get image by occasion and index for variety
export function getImageByOccasion(occasion: string, index: number): string {
  const occasionImages: Record<string, string[]> = {
    breakfast: [peachBellini, naSparklingWhite, tropicalMocktail, mangoLassi, passionFruit, honeyChamomile],
    dinner: [naRedWineGlass, naOldFashioned, naNegroni, botanicalMocktail, bittersSoda, berrySangria],
    relaxing: [lavenderLemonade, honeyChamomile, cucumberCooler, matchaDrink, spicedPear, kombuchaGlass],
    beach: [tropicalMocktail, watermelonFresca, coconutDrink, blueLagoon, strawberryDaiquiri, virginMargarita],
    celebration: [naSparklingWhite, roseSpritzer, aperitifSpritz, peachBellini, cranberrySpritzer, bloodOrange],
  };
  
  const images = occasionImages[occasion] || allRecipeImages;
  return images[index % images.length];
}

export default recipeImages;
