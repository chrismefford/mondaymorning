import { recipes, type Recipe, type Occasion } from "@/data/recipes";

// Map product categories to recipe occasions
const categoryToOccasion: Record<string, Occasion[]> = {
  "Spirit Alternative": ["dinner", "celebration", "relaxing"],
  "Wine Alternative": ["dinner", "celebration", "relaxing"],
  "Sparkling": ["celebration", "breakfast", "dinner"],
  "Functional Elixir": ["breakfast", "relaxing"],
  "Aperitif": ["dinner", "celebration", "beach"],
  "Ready to Drink": ["beach", "celebration", "relaxing"],
  "NA Beer": ["beach", "dinner", "relaxing"],
  "Beer": ["beach", "dinner", "relaxing"],
  "Beverages": ["beach", "relaxing", "breakfast"],
  "Botanical": ["relaxing", "dinner"],
};

/**
 * Find a suggested recipe for a product based on its category
 * Uses a hash of the product name to consistently pick the same recipe
 */
export function getSuggestedRecipe(productName: string, category: string): Recipe {
  // Get relevant occasions for this category
  const occasions = categoryToOccasion[category] || ["celebration", "beach"];
  
  // Filter recipes by relevant occasions
  const relevantRecipes = recipes.filter(r => occasions.includes(r.occasion));
  
  // If no matches, fall back to all recipes
  const pool = relevantRecipes.length > 0 ? relevantRecipes : recipes;
  
  // Use a simple hash of product name to consistently pick a recipe
  let hash = 0;
  for (let i = 0; i < productName.length; i++) {
    hash = ((hash << 5) - hash) + productName.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  
  const index = Math.abs(hash) % pool.length;
  return pool[index];
}
