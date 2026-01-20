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
 * Calculate how well a recipe matches a product based on keywords
 */
function calculateMatchScore(
  productName: string,
  productCategory: string,
  recipe: Recipe
): number {
  const keywords = recipe.productKeywords || [];
  if (keywords.length === 0) return 0;

  const productNameLower = productName.toLowerCase();
  const productCategoryLower = productCategory.toLowerCase();
  const combinedText = `${productNameLower} ${productCategoryLower}`;

  let score = 0;
  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase();
    // Higher score for name matches
    if (productNameLower.includes(keywordLower)) {
      score += 3;
    }
    // Lower score for category matches
    else if (productCategoryLower.includes(keywordLower)) {
      score += 2;
    }
    // Check for partial matches in combined text
    else if (combinedText.includes(keywordLower)) {
      score += 1;
    }
  }

  return score;
}

/**
 * Find a suggested recipe for a product based on its name and category.
 * Prioritizes recipes with matching keywords, falls back to occasion-based matching.
 */
export function getSuggestedRecipe(productName: string, category: string): Recipe {
  // Score all recipes by keyword match
  const scoredRecipes = recipes.map(recipe => ({
    recipe,
    score: calculateMatchScore(productName, category, recipe),
  }));

  // Sort by score descending
  scoredRecipes.sort((a, b) => b.score - a.score);

  // If we have a good match (score > 0), use the best one
  // Use product name hash to pick from top matches for variety
  const topMatches = scoredRecipes.filter(r => r.score > 0);
  
  if (topMatches.length > 0) {
    // Use a hash to consistently pick from top 3 matches
    let hash = 0;
    for (let i = 0; i < productName.length; i++) {
      hash = ((hash << 5) - hash) + productName.charCodeAt(i);
      hash |= 0;
    }
    const topN = Math.min(3, topMatches.length);
    const index = Math.abs(hash) % topN;
    return topMatches[index].recipe;
  }

  // Fall back to occasion-based matching
  const occasions = categoryToOccasion[category] || ["celebration", "beach"];
  const relevantRecipes = recipes.filter(r => occasions.includes(r.occasion));
  const pool = relevantRecipes.length > 0 ? relevantRecipes : recipes;

  // Use product name hash for consistent selection
  let hash = 0;
  for (let i = 0; i < productName.length; i++) {
    hash = ((hash << 5) - hash) + productName.charCodeAt(i);
    hash |= 0;
  }

  const index = Math.abs(hash) % pool.length;
  return pool[index];
}
