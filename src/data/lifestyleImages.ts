// Lifestyle image imports for product cards - organized by category

// NEW: People having fun drinking - social lifestyle shots
import friendsBeachToast from "@/assets/lifestyle/friends-beach-toast.jpg";
import rooftopCheers from "@/assets/lifestyle/rooftop-cheers.jpg";
import patioCoupleBeers from "@/assets/lifestyle/patio-couple-beers.jpg";
import poolsideFriendsDrinks from "@/assets/lifestyle/poolside-friends-drinks.jpg";
import dinnerPartyToast from "@/assets/lifestyle/dinner-party-toast.jpg";

// Spirit alternatives - cocktails and bar scenes
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
  // Spirits get cocktail/bar scenes with people
  "Spirit Alternative": [friendsBeachToast, rooftopCheers, dinnerPartyToast, aperitifGoldenHour],
  "Spirit": [friendsBeachToast, rooftopCheers, dinnerPartyToast, aperitifGoldenHour],
  "Spirits": [friendsBeachToast, rooftopCheers, dinnerPartyToast, aperitifGoldenHour],
  
  // Wine gets dinner party and celebration scenes with people
  "Wine Alternative": [dinnerPartyToast, rooftopCheers, wineDinnerToast, dinnerParty3],
  "Wine": [dinnerPartyToast, rooftopCheers, wineDinnerToast, dinnerParty3],
  "Red Wine": [dinnerPartyToast, wineDinnerToast, dinnerParty3],
  "White Wine": [dinnerPartyToast, rooftopCheers, wineVineyardPour],
  
  // Beer gets casual outdoor scenes with people
  "NA Beer": [patioCoupleBeers, friendsBeachToast, beerPatioFriends, beerBeachBonfire],
  "Beer": [patioCoupleBeers, friendsBeachToast, beerPatioFriends, beerBeachBonfire],
  
  // Functional gets wellness/social scenes
  "Functional Elixir": [poolsideFriendsDrinks, patioCoupleBeers, functionalWellnessMorning, wellness12],
  "Functional": [poolsideFriendsDrinks, patioCoupleBeers, functionalWellnessMorning, wellness12],
  "Adaptogens": [poolsideFriendsDrinks, patioCoupleBeers, wellness12],
  
  // Sparkling gets celebration scenes with people
  "Sparkling": [rooftopCheers, dinnerPartyToast, sparklingCelebration, celebration5],
  "Champagne Alternative": [rooftopCheers, dinnerPartyToast, sparklingCelebration],
  
  // Aperitifs get golden hour social scenes with people
  "Aperitif": [friendsBeachToast, rooftopCheers, aperitifGoldenHour, beachSunset1],
  "Aperitivo": [friendsBeachToast, rooftopCheers, aperitifGoldenHour],
  
  // Ready to drink gets casual beach/poolside with people
  "Ready to Drink": [poolsideFriendsDrinks, friendsBeachToast, rtdBeachPicnic, tropicalPoolside],
  "RTD": [poolsideFriendsDrinks, friendsBeachToast, rtdBeachPicnic, tropicalPoolside],
  "Beverages": [poolsideFriendsDrinks, friendsBeachToast, patioCoupleBeers, tropicalPoolside],
  "Mixers": [poolsideFriendsDrinks, friendsBeachToast, tropicalPoolside],
  
  // Botanical gets moody scenes
  "Botanical": [rooftopCheers, dinnerPartyToast, lifestyleBotanical, library8],
  
  // Tiki/tropical with people
  "Tiki": [poolsideFriendsDrinks, friendsBeachToast, tikiBar7, tropicalPoolside],
  
  // Default fallback pool - prioritize people shots
  "default": [
    friendsBeachToast, poolsideFriendsDrinks, rooftopCheers, patioCoupleBeers,
    dinnerPartyToast, beachSunset1, aperitifGoldenHour
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
  rooftopCheers, dinnerPartyToast, friendsBeachToast, aperitifGoldenHour,
  poolsideFriendsDrinks, botanicalBar2,
  wineDinnerToast, wineVineyardPour, lifestyleWine, dinnerParty3, vineyard9,
  beerPatioFriends, beerBeachBonfire, lifestyleBeer, patioBeer6,
  functionalWellnessMorning, functionalZenTonic, lifestyleFunctional, wellness12,
  sparklingCelebration, celebration5,
  aperitifGoldenHour, rooftop11, beachSunset1,
  rtdBeachPicnic, tropicalPoolside, lifestyleTropical, poolside4,
  lifestyleBotanical, library8, tikiBar7, yacht10,
];
