// Lifestyle image imports for product cards
import beachSunset1 from "@/assets/lifestyle/beach-sunset-1.jpg";
import botanicalBar2 from "@/assets/lifestyle/botanical-bar-2.jpg";
import dinnerParty3 from "@/assets/lifestyle/dinner-party-3.jpg";
import poolside4 from "@/assets/lifestyle/poolside-4.jpg";
import celebration5 from "@/assets/lifestyle/celebration-5.jpg";
import patioBeer6 from "@/assets/lifestyle/patio-beer-6.jpg";
import tikiBar7 from "@/assets/lifestyle/tiki-bar-7.jpg";
import library8 from "@/assets/lifestyle/library-8.jpg";
import vineyard9 from "@/assets/lifestyle/vineyard-9.jpg";
import yacht10 from "@/assets/lifestyle/yacht-10.jpg";
import rooftop11 from "@/assets/lifestyle/rooftop-11.jpg";
import wellness12 from "@/assets/lifestyle/wellness-12.jpg";

// Original category-based images
import lifestyleSpirit from "@/assets/lifestyle/na-spirit-cocktail.jpg";
import lifestyleWine from "@/assets/lifestyle/na-wine-cheers.jpg";
import lifestyleBeer from "@/assets/lifestyle/na-beer-beach.jpg";
import lifestyleFunctional from "@/assets/lifestyle/na-functional-elixir.jpg";
import lifestyleTropical from "@/assets/lifestyle/na-tropical-mocktails.jpg";
import lifestyleBotanical from "@/assets/lifestyle/na-botanical-dark.jpg";

// All lifestyle images in a rotation pool
export const lifestyleImagePool: string[] = [
  beachSunset1,
  botanicalBar2,
  dinnerParty3,
  poolside4,
  celebration5,
  patioBeer6,
  tikiBar7,
  library8,
  vineyard9,
  yacht10,
  rooftop11,
  wellness12,
  lifestyleSpirit,
  lifestyleWine,
  lifestyleBeer,
  lifestyleFunctional,
  lifestyleTropical,
  lifestyleBotanical,
];

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

// Get a unique lifestyle image for a product based on its ID or name
export function getUniqueLifestyleImage(productId: string, productName: string = ""): string {
  const identifier = productId || productName;
  const hash = hashString(identifier);
  const index = hash % lifestyleImagePool.length;
  return lifestyleImagePool[index];
}

// Get lifestyle image by index (for when you have a product index)
export function getLifestyleImageByIndex(index: number): string {
  const adjustedIndex = index % lifestyleImagePool.length;
  return lifestyleImagePool[adjustedIndex];
}
