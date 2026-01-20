// Lifestyle image imports for product cards - organized by category

// Spirit alternatives - cocktails and bar scenes
import spiritBarCraft from "@/assets/lifestyle/spirit-bar-craft.jpg";
import spiritCoupeElegant from "@/assets/lifestyle/spirit-coupe-elegant.jpg";
import lifestyleSpirit from "@/assets/lifestyle/na-spirit-cocktail.jpg";
import botanicalBar2 from "@/assets/lifestyle/botanical-bar-2.jpg";

// Wine alternatives - wine glasses and dinner settings
import wineDinnerToast from "@/assets/lifestyle/wine-dinner-toast.jpg";
import wineVineyardPour from "@/assets/lifestyle/wine-vineyard-pour.jpg";
import lifestyleWine from "@/assets/lifestyle/na-wine-cheers.jpg";
import dinnerParty3 from "@/assets/lifestyle/dinner-party-3.jpg";
import vineyard9 from "@/assets/lifestyle/vineyard-9.jpg";

// Beer - casual outdoor scenes
import beerPatioFriends from "@/assets/lifestyle/beer-patio-friends.jpg";
import beerBeachBonfire from "@/assets/lifestyle/beer-beach-bonfire.jpg";
import lifestyleBeer from "@/assets/lifestyle/na-beer-beach.jpg";
import patioBeer6 from "@/assets/lifestyle/patio-beer-6.jpg";

// Functional elixirs - wellness and morning scenes
import functionalWellnessMorning from "@/assets/lifestyle/functional-wellness-morning.jpg";
import functionalZenTonic from "@/assets/lifestyle/functional-zen-tonic.jpg";
import lifestyleFunctional from "@/assets/lifestyle/na-functional-elixir.jpg";
import wellness12 from "@/assets/lifestyle/wellness-12.jpg";

// Sparkling - celebration scenes
import sparklingCelebration from "@/assets/lifestyle/sparkling-celebration.jpg";
import celebration5 from "@/assets/lifestyle/celebration-5.jpg";

// Aperitifs - golden hour social scenes
import aperitifGoldenHour from "@/assets/lifestyle/aperitif-golden-hour.jpg";
import rooftop11 from "@/assets/lifestyle/rooftop-11.jpg";
import beachSunset1 from "@/assets/lifestyle/beach-sunset-1.jpg";

// Ready to drink - casual beach/poolside
import rtdBeachPicnic from "@/assets/lifestyle/rtd-beach-picnic.jpg";
import tropicalPoolside from "@/assets/lifestyle/tropical-poolside.jpg";
import lifestyleTropical from "@/assets/lifestyle/na-tropical-mocktails.jpg";
import poolside4 from "@/assets/lifestyle/poolside-4.jpg";

// Botanical - dark moody scenes
import lifestyleBotanical from "@/assets/lifestyle/na-botanical-dark.jpg";
import library8 from "@/assets/lifestyle/library-8.jpg";
import tikiBar7 from "@/assets/lifestyle/tiki-bar-7.jpg";

// Additional lifestyle images
import yacht10 from "@/assets/lifestyle/yacht-10.jpg";

// Category-specific image pools
export const categoryImagePools: Record<string, string[]> = {
  // Spirits get cocktail/bar scenes
  "Spirit Alternative": [spiritBarCraft, spiritCoupeElegant, lifestyleSpirit, botanicalBar2],
  "Spirit": [spiritBarCraft, spiritCoupeElegant, lifestyleSpirit, botanicalBar2],
  "Spirits": [spiritBarCraft, spiritCoupeElegant, lifestyleSpirit, botanicalBar2],
  
  // Wine gets wine glasses and dinner settings
  "Wine Alternative": [wineDinnerToast, wineVineyardPour, lifestyleWine, dinnerParty3, vineyard9],
  "Wine": [wineDinnerToast, wineVineyardPour, lifestyleWine, dinnerParty3, vineyard9],
  "Red Wine": [wineDinnerToast, lifestyleWine, dinnerParty3],
  "White Wine": [wineVineyardPour, lifestyleWine, vineyard9],
  
  // Beer gets casual outdoor scenes
  "NA Beer": [beerPatioFriends, beerBeachBonfire, lifestyleBeer, patioBeer6],
  "Beer": [beerPatioFriends, beerBeachBonfire, lifestyleBeer, patioBeer6],
  
  // Functional gets wellness/morning scenes
  "Functional Elixir": [functionalWellnessMorning, functionalZenTonic, lifestyleFunctional, wellness12],
  "Functional": [functionalWellnessMorning, functionalZenTonic, lifestyleFunctional, wellness12],
  "Adaptogens": [functionalWellnessMorning, functionalZenTonic, wellness12],
  
  // Sparkling gets celebration scenes
  "Sparkling": [sparklingCelebration, celebration5, lifestyleWine],
  "Champagne Alternative": [sparklingCelebration, celebration5],
  
  // Aperitifs get golden hour social scenes
  "Aperitif": [aperitifGoldenHour, rooftop11, beachSunset1, lifestyleTropical],
  "Aperitivo": [aperitifGoldenHour, rooftop11, beachSunset1],
  
  // Ready to drink gets casual beach/poolside
  "Ready to Drink": [rtdBeachPicnic, tropicalPoolside, lifestyleTropical, poolside4],
  "RTD": [rtdBeachPicnic, tropicalPoolside, lifestyleTropical, poolside4],
  "Beverages": [rtdBeachPicnic, tropicalPoolside, lifestyleTropical, poolside4],
  "Mixers": [tropicalPoolside, lifestyleTropical, poolside4],
  
  // Botanical gets dark moody scenes
  "Botanical": [lifestyleBotanical, library8, tikiBar7, spiritCoupeElegant],
  
  // Tiki/tropical
  "Tiki": [tikiBar7, tropicalPoolside, lifestyleTropical],
  
  // Default fallback pool
  "default": [
    beachSunset1, poolside4, rooftop11, yacht10,
    aperitifGoldenHour, tropicalPoolside, lifestyleTropical
  ],
};

// Simple hash function to get consistent but varied image for each product
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Get a category-appropriate lifestyle image for a product
export function getCategoryLifestyleImage(
  productId: string, 
  productName: string = "", 
  category: string = ""
): string {
  // Find the appropriate pool for this category
  const pool = categoryImagePools[category] || categoryImagePools["default"];
  
  // Use hash to get consistent but varied image within the category pool
  const identifier = productId || productName;
  const hash = hashString(identifier);
  const index = hash % pool.length;
  
  return pool[index];
}

// Legacy function for backward compatibility
export function getUniqueLifestyleImage(productId: string, productName: string = ""): string {
  return getCategoryLifestyleImage(productId, productName, "default");
}

// Get lifestyle image by index (for when you have a product index)
export function getLifestyleImageByIndex(index: number, category: string = "default"): string {
  const pool = categoryImagePools[category] || categoryImagePools["default"];
  const adjustedIndex = index % pool.length;
  return pool[adjustedIndex];
}

// All lifestyle images in a flat pool (for general use)
export const lifestyleImagePool: string[] = [
  spiritBarCraft, spiritCoupeElegant, lifestyleSpirit, botanicalBar2,
  wineDinnerToast, wineVineyardPour, lifestyleWine, dinnerParty3, vineyard9,
  beerPatioFriends, beerBeachBonfire, lifestyleBeer, patioBeer6,
  functionalWellnessMorning, functionalZenTonic, lifestyleFunctional, wellness12,
  sparklingCelebration, celebration5,
  aperitifGoldenHour, rooftop11, beachSunset1,
  rtdBeachPicnic, tropicalPoolside, lifestyleTropical, poolside4,
  lifestyleBotanical, library8, tikiBar7, yacht10,
];
