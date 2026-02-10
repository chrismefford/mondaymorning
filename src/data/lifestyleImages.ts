// Lifestyle image imports for product cards - organized by category

// NEW: People having fun drinking - social lifestyle shots
import friendsBeachToast from "@/assets/lifestyle/friends-beach-toast.jpg";
import rooftopCheers from "@/assets/lifestyle/rooftop-cheers.jpg";
import patioCoupleBeers from "@/assets/lifestyle/patio-couple-beers.jpg";
import poolsideFriendsDrinks from "@/assets/lifestyle/poolside-friends-drinks.jpg";
import dinnerPartyToast from "@/assets/lifestyle/dinner-party-toast.jpg";

// NEW: Additional diverse lifestyle images
import dinnerCheersIntimate from "@/assets/lifestyle/dinner-cheers-intimate.jpg";
import rooftopSunsetFriends from "@/assets/lifestyle/rooftop-sunset-friends.jpg";
import vineyardCoupleWine from "@/assets/lifestyle/vineyard-couple-wine.jpg";
import beachBonfireBeers from "@/assets/lifestyle/beach-bonfire-beers.jpg";
import upscaleBarToast from "@/assets/lifestyle/upscale-bar-toast.jpg";
import poolsideCabanaFriends from "@/assets/lifestyle/poolside-cabana-friends.jpg";
import morningPatioCouple from "@/assets/lifestyle/morning-patio-couple.jpg";
import gardenPartyToast from "@/assets/lifestyle/garden-party-toast.jpg";
import breweryPatioFriends from "@/assets/lifestyle/brewery-patio-friends.jpg";
import trattoriaWineCouple from "@/assets/lifestyle/trattoria-wine-couple.jpg";
import beachSunsetCocktails from "@/assets/lifestyle/beach-sunset-cocktails.jpg";
import brunchMimosasElegant from "@/assets/lifestyle/brunch-mimosas-elegant.jpg";
import yachtPartyDrinks from "@/assets/lifestyle/yacht-party-drinks.jpg";
import fireplaceCozyDrinks from "@/assets/lifestyle/fireplace-cozy-drinks.jpg";
import tikiBarTropical from "@/assets/lifestyle/tiki-bar-tropical.jpg";
import wellnessRetreatDrinks from "@/assets/lifestyle/wellness-retreat-drinks.jpg";

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
import rtdBeachPicnic from "@/assets/lifestyle/kaviva-cans.webp";
import tropicalPoolside from "@/assets/lifestyle/tropical-poolside.jpg";
import lifestyleTropical from "@/assets/lifestyle/na-tropical-mocktails.jpg";
import poolside4 from "@/assets/lifestyle/poolside-4.jpg";

// Botanical - dark moody scenes
import lifestyleBotanical from "@/assets/lifestyle/na-botanical-dark.jpg";
import library8 from "@/assets/lifestyle/library-8.jpg";
import tikiBar7 from "@/assets/lifestyle/tiki-bar-7.jpg";

// Additional lifestyle images
import yacht10 from "@/assets/lifestyle/yacht-10.jpg";

// Category-specific image pools - EXPANDED for more variety
export const categoryImagePools: Record<string, string[]> = {
  // Spirits get cocktail/bar scenes with people - 8 unique images
  "Spirit Alternative": [
    friendsBeachToast, rooftopCheers, dinnerPartyToast, aperitifGoldenHour,
    upscaleBarToast, rooftopSunsetFriends, dinnerCheersIntimate, beachSunsetCocktails
  ],
  "Spirit": [
    friendsBeachToast, rooftopCheers, dinnerPartyToast, aperitifGoldenHour,
    upscaleBarToast, rooftopSunsetFriends, dinnerCheersIntimate, beachSunsetCocktails
  ],
  "Spirits": [
    friendsBeachToast, rooftopCheers, dinnerPartyToast, aperitifGoldenHour,
    upscaleBarToast, rooftopSunsetFriends, dinnerCheersIntimate, beachSunsetCocktails
  ],
  
  // Wine gets dinner party and celebration scenes - 8 unique images
  "Wine Alternative": [
    dinnerPartyToast, rooftopCheers, wineDinnerToast, dinnerParty3,
    vineyardCoupleWine, trattoriaWineCouple, dinnerCheersIntimate, gardenPartyToast
  ],
  "Wine": [
    dinnerPartyToast, rooftopCheers, wineDinnerToast, dinnerParty3,
    vineyardCoupleWine, trattoriaWineCouple, dinnerCheersIntimate, gardenPartyToast
  ],
  "Red Wine": [
    dinnerPartyToast, wineDinnerToast, dinnerParty3,
    trattoriaWineCouple, dinnerCheersIntimate, fireplaceCozyDrinks
  ],
  "White Wine": [
    dinnerPartyToast, rooftopCheers, wineVineyardPour,
    vineyardCoupleWine, gardenPartyToast, brunchMimosasElegant
  ],
  
  // Beer gets casual outdoor scenes - 8 unique images
  "NA Beer": [
    patioCoupleBeers, friendsBeachToast, beerPatioFriends, beerBeachBonfire,
    beachBonfireBeers, breweryPatioFriends, patioBeer6, rooftopSunsetFriends
  ],
  "Beer": [
    patioCoupleBeers, friendsBeachToast, beerPatioFriends, beerBeachBonfire,
    beachBonfireBeers, breweryPatioFriends, patioBeer6, rooftopSunsetFriends
  ],
  
  // Bitters get moody bar scenes - 6 unique images
  "Bitters": [
    upscaleBarToast, dinnerCheersIntimate, rooftopCheers, 
    botanicalBar2, library8, fireplaceCozyDrinks
  ],
  
  // Functional gets wellness/social scenes - 8 unique images
  "Functional Elixir": [
    poolsideFriendsDrinks, patioCoupleBeers, functionalWellnessMorning, wellness12,
    wellnessRetreatDrinks, morningPatioCouple, brunchMimosasElegant, gardenPartyToast
  ],
  "Functional": [
    poolsideFriendsDrinks, patioCoupleBeers, functionalWellnessMorning, wellness12,
    wellnessRetreatDrinks, morningPatioCouple, brunchMimosasElegant, gardenPartyToast
  ],
  "Adaptogens": [
    poolsideFriendsDrinks, patioCoupleBeers, wellness12,
    wellnessRetreatDrinks, morningPatioCouple, functionalWellnessMorning
  ],
  
  // Sparkling gets celebration scenes - 8 unique images
  "Sparkling": [
    rooftopCheers, dinnerPartyToast, sparklingCelebration, celebration5,
    gardenPartyToast, brunchMimosasElegant, yachtPartyDrinks, rooftopSunsetFriends
  ],
  "Champagne Alternative": [
    rooftopCheers, dinnerPartyToast, sparklingCelebration,
    gardenPartyToast, brunchMimosasElegant, yachtPartyDrinks
  ],
  
  // Aperitifs get golden hour social scenes - 8 unique images
  "Aperitif": [
    friendsBeachToast, rooftopCheers, aperitifGoldenHour, beachSunset1,
    rooftopSunsetFriends, beachSunsetCocktails, gardenPartyToast, upscaleBarToast
  ],
  "Aperitivo": [
    friendsBeachToast, rooftopCheers, aperitifGoldenHour,
    rooftopSunsetFriends, beachSunsetCocktails, upscaleBarToast
  ],
  
  // Ready to drink gets casual beach/poolside - 8 unique images
  "Ready to Drink": [
    poolsideFriendsDrinks, friendsBeachToast, rtdBeachPicnic, tropicalPoolside,
    poolsideCabanaFriends, beachSunsetCocktails, yachtPartyDrinks, tikiBarTropical
  ],
  "RTD": [
    poolsideFriendsDrinks, friendsBeachToast, rtdBeachPicnic, tropicalPoolside,
    poolsideCabanaFriends, beachSunsetCocktails, yachtPartyDrinks, tikiBarTropical
  ],
  "Beverages": [
    poolsideFriendsDrinks, friendsBeachToast, patioCoupleBeers, tropicalPoolside,
    poolsideCabanaFriends, morningPatioCouple, brunchMimosasElegant, beachSunsetCocktails
  ],
  "Mixers": [
    poolsideFriendsDrinks, friendsBeachToast, tropicalPoolside,
    tikiBarTropical, beachSunsetCocktails, rooftopSunsetFriends
  ],
  
  // Botanical gets moody scenes - 6 unique images
  "Botanical": [
    rooftopCheers, dinnerPartyToast, lifestyleBotanical, library8,
    upscaleBarToast, fireplaceCozyDrinks
  ],
  
  // Tiki/tropical with people - 8 unique images
  "Tiki": [
    poolsideFriendsDrinks, friendsBeachToast, tikiBar7, tropicalPoolside,
    tikiBarTropical, poolsideCabanaFriends, beachSunsetCocktails, yachtPartyDrinks
  ],
  
  // Default fallback pool - 16 unique images for maximum variety
  "default": [
    friendsBeachToast, poolsideFriendsDrinks, rooftopCheers, patioCoupleBeers,
    dinnerPartyToast, beachSunset1, aperitifGoldenHour, rooftopSunsetFriends,
    dinnerCheersIntimate, beachBonfireBeers, gardenPartyToast, beachSunsetCocktails,
    brunchMimosasElegant, yachtPartyDrinks, poolsideCabanaFriends, upscaleBarToast
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

// All lifestyle images in a flat pool (for general use) - 40+ unique images
export const lifestyleImagePool: string[] = [
  // New social lifestyle images
  dinnerCheersIntimate, rooftopSunsetFriends, vineyardCoupleWine, beachBonfireBeers,
  upscaleBarToast, poolsideCabanaFriends, morningPatioCouple, gardenPartyToast,
  breweryPatioFriends, trattoriaWineCouple, beachSunsetCocktails, brunchMimosasElegant,
  yachtPartyDrinks, fireplaceCozyDrinks, tikiBarTropical, wellnessRetreatDrinks,
  // Original images
  rooftopCheers, dinnerPartyToast, friendsBeachToast, aperitifGoldenHour,
  poolsideFriendsDrinks, botanicalBar2, patioCoupleBeers,
  wineDinnerToast, wineVineyardPour, lifestyleWine, dinnerParty3, vineyard9,
  beerPatioFriends, beerBeachBonfire, lifestyleBeer, patioBeer6,
  functionalWellnessMorning, functionalZenTonic, lifestyleFunctional, wellness12,
  sparklingCelebration, celebration5,
  rooftop11, beachSunset1,
  rtdBeachPicnic, tropicalPoolside, lifestyleTropical, poolside4,
  lifestyleBotanical, library8, tikiBar7, yacht10,
];