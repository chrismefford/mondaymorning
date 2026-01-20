import { useParams, Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { getSuggestedRecipe } from "@/lib/recipeMatch";
import { occasionLabels } from "@/data/recipes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingBag, Clock, Users, Loader2 } from "lucide-react";
import textureCream from "@/assets/texture-cream.svg";
import stampGold from "@/assets/stamp-gold.svg";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useShopifyProduct(handle || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-cream">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-serif text-3xl text-forest mb-4">Product not found</h1>
          <Link to="/" className="text-gold hover:underline">
            ← Back to shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Get a suggested recipe based on the product category
  const suggestedRecipe = getSuggestedRecipe(product.name, product.category);
  const occasion = occasionLabels[suggestedRecipe.occasion];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="relative overflow-hidden">
        {/* Background texture */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
        />
        
        {/* Watermark stamp */}
        <div className="absolute top-20 right-0 w-[30rem] opacity-[0.03] pointer-events-none translate-x-1/3">
          <img src={stampGold} alt="" className="w-full" />
        </div>

        <div className="container mx-auto px-4 py-8 lg:py-16 relative z-10">
          {/* Breadcrumb */}
          <Link 
            to="/#shop" 
            className="inline-flex items-center gap-2 text-forest/70 hover:text-forest transition-colors mb-8 font-sans text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-white border-2 border-forest overflow-hidden shadow-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
              </div>
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-gold text-forest-deep font-sans text-xs font-bold border-0 shadow-md">
                  {product.badge}
                </Badge>
              )}
              {/* Decorative offset */}
              <div className="absolute -bottom-4 -right-4 w-full h-full bg-gold/20 -z-10" />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-2">
                {product.category}
              </span>
              
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl font-bold text-forest mb-4">
                {product.name}
              </h1>
              
              {product.tagline && (
                <p className="font-serif text-xl italic text-forest/70 mb-6">
                  "{product.tagline}"
                </p>
              )}
              
              <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
                {product.description}
              </p>

              {/* Price & CTA */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-sans text-3xl font-bold text-forest">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <span className="font-sans text-lg text-muted-foreground line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <Button 
                size="lg" 
                className="w-full lg:w-auto font-sans text-sm font-semibold uppercase tracking-wider px-12 py-6 bg-forest text-cream hover:bg-forest-light gap-2"
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Suggested Recipe Section */}
          <section className="border-t-2 border-forest/10 pt-12 lg:pt-20">
            <div className="text-center mb-8 lg:mb-12">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-2 block">
                Try it in a mocktail
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl text-forest">
                Suggested Recipe
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
              {/* Recipe Image */}
              <div className="relative group">
                <div className="aspect-[4/3] overflow-hidden border-2 border-forest">
                  <img
                    src={suggestedRecipe.image}
                    alt={suggestedRecipe.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Occasion badge */}
                <div className="absolute top-4 left-4 bg-forest text-cream px-3 py-1.5 font-sans text-xs uppercase tracking-wider flex items-center gap-2">
                  <span>{occasion.emoji}</span>
                  <span>{occasion.label}</span>
                </div>
              </div>

              {/* Recipe Info */}
              <div>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-forest mb-2">
                  {suggestedRecipe.title}
                </h3>
                <p className="font-serif text-lg italic text-gold mb-4">
                  "{suggestedRecipe.tagline}"
                </p>
                <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                  {suggestedRecipe.description}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-6 mb-6 font-sans text-sm text-forest/70">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{suggestedRecipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{suggestedRecipe.servings} serving{suggestedRecipe.servings > 1 ? 's' : ''}</span>
                  </div>
                  <Badge variant="outline" className="border-forest/30 text-forest text-xs">
                    {suggestedRecipe.difficulty}
                  </Badge>
                </div>

                {/* Ingredients */}
                <div className="border-t-2 border-forest/10 pt-6">
                  <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4 font-semibold">
                    Ingredients
                  </h4>
                  <ul className="space-y-2">
                    {suggestedRecipe.ingredients.map((ingredient, index) => (
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

                <Link to="/recipes">
                  <Button 
                    variant="outline" 
                    className="mt-8 font-sans text-sm uppercase tracking-wider border-2 border-forest text-forest hover:bg-forest hover:text-cream"
                  >
                    View All Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
