import { useState } from "react";
import { useRecipesForProduct, GeneratedRecipe } from "@/hooks/useGeneratedRecipes";
import { occasionLabels } from "@/data/recipes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductRecipesProps {
  productHandle: string;
  productName: string;
  productImage: string;
  productPrice: number;
}

const ProductRecipes = ({ productHandle, productName, productImage, productPrice }: ProductRecipesProps) => {
  const { data: recipes, isLoading } = useRecipesForProduct(productHandle);
  const [selectedRecipe, setSelectedRecipe] = useState<GeneratedRecipe | null>(null);

  if (isLoading || !recipes || recipes.length === 0) {
    return null;
  }

  const occasion = selectedRecipe ? occasionLabels[selectedRecipe.occasion] : null;

  return (
    <section className="border-t-2 border-forest/10 pt-12 lg:pt-20">
      <div className="text-center mb-8 lg:mb-12">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-2 block">
          Try it in a mocktail
        </span>
        <h2 className="font-serif text-3xl lg:text-4xl text-forest">
          Recipes with {productName}
        </h2>
      </div>

      {/* Recipe Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.slice(0, 3).map((recipe) => {
          const recipeOccasion = occasionLabels[recipe.occasion];
          return (
            <button
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="group bg-white border-2 border-forest/10 hover:border-gold transition-all text-left overflow-hidden"
            >
              <div className="p-6">
                {/* Occasion Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{recipeOccasion.emoji}</span>
                  <span className="font-sans text-xs uppercase tracking-wider text-gold font-semibold">
                    {recipeOccasion.label}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-forest mb-2 group-hover:text-gold transition-colors">
                  {recipe.title}
                </h3>
                
                {recipe.tagline && (
                  <p className="font-serif text-sm italic text-forest/60 mb-4">
                    "{recipe.tagline}"
                  </p>
                )}

                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{recipe.prep_time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>{recipe.servings}</span>
                  </div>
                  <Badge variant="outline" className="text-xs border-forest/20">
                    {recipe.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 mt-4 text-gold text-sm font-semibold group-hover:gap-2 transition-all">
                  <span>View Recipe</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* More recipes link */}
      {recipes.length > 3 && (
        <div className="text-center mt-8">
          <Link to="/recipes">
            <Button 
              variant="outline" 
              className="font-sans text-sm uppercase tracking-wider border-2 border-forest text-forest hover:bg-forest hover:text-cream"
            >
              View All Recipes
            </Button>
          </Link>
        </div>
      )}

      {/* Recipe Detail Modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && occasion && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{occasion.emoji}</span>
                  <span className="font-sans text-xs uppercase tracking-wider text-gold font-semibold">
                    {occasion.label}
                  </span>
                </div>
                <DialogTitle className="font-serif text-2xl lg:text-3xl text-forest">
                  {selectedRecipe.title}
                </DialogTitle>
                {selectedRecipe.tagline && (
                  <p className="font-serif text-lg italic text-gold">
                    "{selectedRecipe.tagline}"
                  </p>
                )}
              </DialogHeader>

              <div className="space-y-6 mt-4">
                <p className="text-muted-foreground">{selectedRecipe.description}</p>

                {/* Meta */}
                <div className="flex items-center gap-6 text-sm text-forest/70">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{selectedRecipe.prep_time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{selectedRecipe.servings} serving{selectedRecipe.servings > 1 ? 's' : ''}</span>
                  </div>
                  <Badge variant="outline" className="border-forest/30 text-forest">
                    {selectedRecipe.difficulty}
                  </Badge>
                </div>

                {/* Featured Product Callout */}
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                  <p className="font-sans text-xs uppercase tracking-wider text-gold mb-2 font-semibold">
                    Featured Product
                  </p>
                  <Link 
                    to={`/product/${productHandle}`}
                    onClick={() => setSelectedRecipe(null)}
                    className="flex items-center gap-3 group/product"
                  >
                    <div className="w-12 h-12 bg-white border border-forest/20 rounded overflow-hidden shrink-0">
                      <img 
                        src={productImage} 
                        alt={productName}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-forest font-semibold group-hover/product:text-gold transition-colors">
                        {productName}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground">
                        Use in this recipe • ${productPrice.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4 font-semibold">
                    Ingredients
                  </h4>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li 
                        key={index} 
                        className="font-sans text-sm text-forest flex items-center gap-3"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4 font-semibold">
                    Instructions
                  </h4>
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((step, index) => (
                      <li 
                        key={index} 
                        className="font-sans text-sm text-forest flex gap-3"
                      >
                        <span className="font-bold text-gold shrink-0">{index + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProductRecipes;
