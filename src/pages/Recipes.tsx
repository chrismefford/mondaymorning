import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { recipes, occasionLabels, Occasion, Recipe } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Users, ChefHat, ShoppingBag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import stampGold from "@/assets/stamp-gold.svg";
import textureCream from "@/assets/texture-cream.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useShopifyProducts, ShopifyProduct, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";

/**
 * Find the best matching product for a recipe based on its productKeywords
 */
function findMatchingProduct(recipe: Recipe, products: ShopifyProduct[]): ReturnType<typeof shopifyToLocalProduct> | null {
  const keywords = recipe.productKeywords || [];
  if (keywords.length === 0 || products.length === 0) return null;

  // Filter out gift cards and memberships
  const beverageProducts = products.filter(p => {
    const type = p.productType?.toLowerCase() || "";
    const title = p.title?.toLowerCase() || "";
    return !type.includes("gift") && !type.includes("membership") && 
           !title.includes("gift card") && !title.includes("membership");
  });

  if (beverageProducts.length === 0) return null;

  // Score products by keyword match
  const scoredProducts = beverageProducts.map(product => {
    const productNameLower = product.title.toLowerCase();
    const productCategoryLower = (product.productType || "").toLowerCase();
    const combinedText = `${productNameLower} ${productCategoryLower}`;

    let score = 0;
    for (const keyword of keywords) {
      const keywordLower = keyword.toLowerCase();
      if (productNameLower.includes(keywordLower)) {
        score += 3;
      } else if (productCategoryLower.includes(keywordLower)) {
        score += 2;
      } else if (combinedText.includes(keywordLower)) {
        score += 1;
      }
    }
    return { product, score };
  });

  // Sort by score descending
  scoredProducts.sort((a, b) => b.score - a.score);

  // Get products with score > 0
  const matches = scoredProducts.filter(p => p.score > 0);

  if (matches.length > 0) {
    // Use recipe id hash to pick from top matches for variety
    let hash = 0;
    for (let i = 0; i < recipe.id.length; i++) {
      hash = ((hash << 5) - hash) + recipe.id.charCodeAt(i);
      hash |= 0;
    }
    const topN = Math.min(3, matches.length);
    const index = Math.abs(hash) % topN;
    return shopifyToLocalProduct(matches[index].product);
  }

  return null;
}

const occasions: Occasion[] = ["breakfast", "dinner", "relaxing", "beach", "celebration"];

const RecipesPage = () => {
  const [activeOccasion, setActiveOccasion] = useState<Occasion | "all">("all");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Fetch all products to match with recipes
  const { data: shopifyProducts = [] } = useShopifyProducts(100);

  // Find matching product for selected recipe
  const matchingProduct = useMemo(() => {
    if (!selectedRecipe || shopifyProducts.length === 0) return null;
    return findMatchingProduct(selectedRecipe, shopifyProducts);
  }, [selectedRecipe, shopifyProducts]);

  const filteredRecipes = activeOccasion === "all" 
    ? recipes 
    : recipes.filter((r) => r.occasion === activeOccasion);

  const featuredRecipes = recipes.filter((r) => r.featured);

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          {/* Decorative stamp */}
          <div className="absolute top-20 right-0 w-48 lg:w-72 opacity-[0.04] pointer-events-none translate-x-1/4">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 lg:mb-6 block">
                Mocktail Recipes
              </span>
              <h1 className="font-serif text-4xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6 lg:mb-8">
                Drinks for every <span className="italic text-gold">moment</span>
              </h1>
              <p className="font-sans text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                From sunrise sips to celebration toasts—discover the perfect mocktail for any occasion. All recipes crafted with love using our favorite NA spirits.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURED RECIPES */}
        <section className="py-12 lg:py-20 bg-forest text-cream relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-50" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="mb-8 lg:mb-12">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 block">
                Staff Picks
              </span>
              <h2 className="font-serif text-2xl lg:text-4xl">
                Featured <span className="italic text-gold">recipes</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {featuredRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe)}
                  className="group text-left"
                >
                  <div className="aspect-[4/5] overflow-hidden border-2 border-cream/20 mb-4 relative">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-forest-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-sans text-xs uppercase tracking-wider text-cream bg-gold/90 px-4 py-2">
                        View Recipe
                      </span>
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="text-xl">{occasionLabels[recipe.occasion].emoji}</span>
                    </div>
                  </div>
                  <h3 className="font-serif text-lg text-cream group-hover:text-gold transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="font-sans text-xs text-cream/60 mt-1 uppercase tracking-wider">
                    {occasionLabels[recipe.occasion].label}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ALL RECIPES */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="mb-8 lg:mb-12">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 block">
                Browse All
              </span>
              <h2 className="font-serif text-2xl lg:text-4xl mb-8">
                All <span className="italic text-gold">recipes</span>
              </h2>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 lg:gap-3">
                <button
                  onClick={() => setActiveOccasion("all")}
                  className={`px-4 lg:px-6 py-2 lg:py-3 font-sans text-xs lg:text-sm font-semibold uppercase tracking-wider transition-all border-2 ${
                    activeOccasion === "all"
                      ? "bg-forest text-cream border-forest"
                      : "bg-transparent text-forest border-forest/30 hover:border-forest hover:bg-forest/5"
                  }`}
                >
                  All ({recipes.length})
                </button>
                {occasions.map((occasion) => {
                  const count = recipes.filter(r => r.occasion === occasion).length;
                  return (
                    <button
                      key={occasion}
                      onClick={() => setActiveOccasion(occasion)}
                      className={`flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 font-sans text-xs lg:text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-all border-2 ${
                        activeOccasion === occasion
                          ? "bg-forest text-cream border-forest"
                          : "bg-transparent text-forest border-forest/30 hover:border-forest hover:bg-forest/5"
                      }`}
                    >
                      <span>{occasionLabels[occasion].emoji}</span>
                      {occasionLabels[occasion].label} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipe Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredRecipes.map((recipe) => (
                <RecipeCard 
                  key={recipe.id} 
                  recipe={recipe} 
                  onClick={() => setSelectedRecipe(recipe)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 lg:py-24 bg-gold relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] text-forest mb-6">
                Need the <span className="italic">ingredients</span>?
              </h2>
              <p className="font-sans text-lg text-forest/80 mb-8">
                Visit our shops in Ocean Beach or Pacific Beach to pick up everything you need. We'll even help you find the perfect bottles.
              </p>
              <Button 
                size="lg"
                className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6 group"
              >
                Shop NA Spirits
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Recipe Detail Modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-cream border-2 border-forest p-0">
          {selectedRecipe && (
            <>
              <div className="relative aspect-video">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.3em] text-gold mb-2">
                    <ChefHat className="h-4 w-4" />
                    {occasionLabels[selectedRecipe.occasion].emoji} {occasionLabels[selectedRecipe.occasion].label} Mocktail
                  </span>
                  <DialogHeader>
                    <DialogTitle className="font-serif text-3xl lg:text-4xl text-cream">
                      {selectedRecipe.title}
                    </DialogTitle>
                  </DialogHeader>
                </div>
              </div>
              
              <div className="p-6 lg:p-8">
                <p className="font-serif text-lg italic text-gold mb-4">
                  "{selectedRecipe.tagline}"
                </p>
                
                <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                  <span className="flex items-center gap-2 font-sans text-sm">
                    <Clock className="h-4 w-4" />
                    {selectedRecipe.prepTime}
                  </span>
                  <span className="flex items-center gap-2 font-sans text-sm">
                    <Users className="h-4 w-4" />
                    Serves {selectedRecipe.servings}
                  </span>
                  <span className="font-sans text-sm px-3 py-1 bg-forest/10 rounded">
                    {selectedRecipe.difficulty}
                  </span>
                </div>

                <p className="font-sans text-muted-foreground leading-relaxed mb-8">
                  {selectedRecipe.description}
                </p>

                <div className="border-t-2 border-forest/20 pt-6">
                  <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4 font-semibold">
                    Ingredients
                  </h3>
                  <ul className="space-y-3">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="font-sans text-base text-forest flex items-center gap-3"
                      >
                        <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Featured Product Section */}
                {matchingProduct && (
                  <div className="mt-8 border-t-2 border-forest/20 pt-6">
                    <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4 font-semibold flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Make it with
                    </h3>
                    <Link 
                      to={`/products/${matchingProduct.handle}`}
                      className="flex items-center gap-4 p-3 bg-forest/5 border-2 border-forest/10 hover:border-gold hover:bg-gold/5 transition-all group"
                      onClick={() => setSelectedRecipe(null)}
                    >
                      <div className="w-20 h-20 bg-cream border border-forest/10 shrink-0 overflow-hidden">
                        <img 
                          src={matchingProduct.image} 
                          alt={matchingProduct.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-serif text-lg text-forest group-hover:text-gold transition-colors truncate">
                          {matchingProduct.name}
                        </p>
                        <p className="font-sans text-sm text-muted-foreground truncate">
                          {matchingProduct.category}
                        </p>
                        <p className="font-sans text-sm font-semibold text-gold mt-1">
                          {matchingProduct.price}
                        </p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-forest/40 group-hover:text-gold transition-colors shrink-0" />
                    </Link>
                  </div>
                )}

                <div className="mt-8 p-4 bg-forest/5 border-2 border-forest/10">
                  <p className="font-sans text-sm text-muted-foreground">
                    <strong className="text-forest">Pro tip:</strong> Visit our tasting room to try this drink before making it at home. We'll help you find the perfect NA spirits.
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
  return (
    <button onClick={onClick} className="group text-left w-full">
      <div className="relative aspect-[4/3] overflow-hidden border-2 border-forest mb-4">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Occasion badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 font-sans text-[10px] uppercase tracking-wider bg-cream/90 text-forest px-2 py-1 border border-forest/20">
            {occasionLabels[recipe.occasion].emoji} {occasionLabels[recipe.occasion].label}
          </span>
        </div>
        {/* Featured badge */}
        {recipe.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="font-sans text-[10px] uppercase tracking-wider bg-gold text-forest px-2 py-1">
              Featured
            </span>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-forest-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="font-sans text-sm uppercase tracking-wider text-cream bg-gold px-4 py-2">
            View Recipe
          </span>
        </div>
      </div>
      <div>
        <h3 className="font-serif text-xl font-bold text-forest group-hover:text-gold transition-colors">
          {recipe.title}
        </h3>
        <p className="font-serif text-sm italic text-muted-foreground mt-1">
          {recipe.tagline}
        </p>
        <div className="flex items-center gap-3 mt-3 text-muted-foreground">
          <span className="flex items-center gap-1 font-sans text-xs">
            <Clock className="h-3 w-3" />
            {recipe.prepTime}
          </span>
          <span className="flex items-center gap-1 font-sans text-xs">
            <Users className="h-3 w-3" />
            {recipe.servings}
          </span>
          <span className="font-sans text-xs px-2 py-0.5 bg-forest/10 rounded">
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </button>
  );
};

export default RecipesPage;