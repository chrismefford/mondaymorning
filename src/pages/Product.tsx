import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { useShopifyProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import { useCart } from "@/hooks/useCart";
import { getSuggestedRecipe } from "@/lib/recipeMatch";
import { occasionLabels } from "@/data/recipes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingBag, Clock, Users, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import textureCream from "@/assets/texture-cream.svg";
import stampGold from "@/assets/stamp-gold.svg";
import logoSecondaryGold from "@/assets/logo-secondary-gold.svg";

const ProductPage = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading, error } = useShopifyProduct(handle || "");
  const { addToCart, isLoading: isAddingToCart } = useCart();
  const [currentPage, setCurrentPage] = useState(0);
  const PRODUCTS_PER_PAGE = 8;
  const TOTAL_PAGES = 3;

  // Fetch more products for "More to Explore" section
  const { data: allProducts } = useShopifyProducts(PRODUCTS_PER_PAGE * TOTAL_PAGES);

  // Filter out current product and convert to local format
  const moreProducts = useMemo(() => {
    if (!allProducts) return [];
    return allProducts
      .map(shopifyToLocalProduct)
      .filter((p) => p.handle !== handle)
      .filter((p) => 
        !p.category?.toLowerCase().includes('membership') &&
        !p.name?.toLowerCase().includes('gift card') &&
        !p.name?.toLowerCase().includes('subscription')
      );
  }, [allProducts, handle]);

  // Get current page of products
  const currentProducts = useMemo(() => {
    const start = currentPage * PRODUCTS_PER_PAGE;
    return moreProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [moreProducts, currentPage]);

  const hasNextPage = (currentPage + 1) * PRODUCTS_PER_PAGE < moreProducts.length;
  const hasPrevPage = currentPage > 0;

  // Get the first variant ID for adding to cart
  const firstVariantId = product?.variants?.[0]?.id;

  const handleAddToCart = async () => {
    if (firstVariantId) {
      await addToCart(firstVariantId);
    }
  };

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

        <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-8 lg:py-16 relative z-10">
          {/* Breadcrumb */}
          <Link 
            to="/#shop" 
            className="inline-flex items-center gap-2 text-forest/70 hover:text-forest transition-colors mb-12 lg:mb-16 font-sans text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          {/* Product Section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-32 mb-20 lg:mb-32">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-white border-2 border-forest overflow-hidden shadow-card relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8"
                />
                {/* Logo watermark on product image */}
                <div className="absolute bottom-4 right-4 opacity-75 pointer-events-none">
                  <img 
                    src={logoSecondaryGold} 
                    alt="" 
                    className="w-20 h-auto"
                  />
                </div>
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
            <div className="flex flex-col justify-center lg:pl-4 xl:pl-8">
              <span className="font-sans text-sm uppercase tracking-[0.3em] text-gold mb-4">
                {product.category}
              </span>
              
              <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold text-forest mb-8 leading-[1.02]">
                {product.name}
              </h1>
              
              {product.tagline && (
                <p className="font-serif text-2xl lg:text-3xl italic text-forest/60 mb-10 leading-snug max-w-2xl">
                  "{product.tagline}"
                </p>
              )}
              
              <p className="font-sans text-lg lg:text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">
                {product.description}
              </p>

              {/* Price & CTA */}
              <div className="flex items-center gap-6 mb-10">
                <span className="font-sans text-4xl font-bold text-forest">
                  ${product.price.toFixed(2)}
                </span>
                {product.compareAtPrice && (
                  <span className="font-sans text-xl text-muted-foreground line-through">
                    ${product.compareAtPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <Button 
                size="lg" 
                onClick={handleAddToCart}
                disabled={isAddingToCart || !firstVariantId}
                className="w-full lg:w-auto font-sans text-sm font-semibold uppercase tracking-wider px-12 py-6 bg-forest text-cream hover:bg-forest-light gap-2 disabled:opacity-50"
              >
                {isAddingToCart ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <ShoppingBag className="h-5 w-5" />
                )}
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

                {/* Featured Product Callout */}
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-6">
                  <p className="font-sans text-xs uppercase tracking-wider text-gold mb-2 font-semibold">
                    Featured Product
                  </p>
                  <Link 
                    to={`/product/${handle}`}
                    className="flex items-center gap-3 group/product"
                  >
                    <div className="w-12 h-12 bg-white border border-forest/20 rounded overflow-hidden shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>
                    <div>
                      <p className="font-serif text-forest font-semibold group-hover/product:text-gold transition-colors">
                        {product.name}
                      </p>
                      <p className="font-sans text-xs text-muted-foreground">
                        Use in this recipe • ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
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

          {/* More to Explore Section */}
          {currentProducts.length > 0 && (
            <section className="border-t-2 border-forest/10 pt-12 lg:pt-20">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8 lg:mb-12">
                <div>
                  <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-2 block">
                    Keep Exploring
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-forest">
                    More to Discover
                  </h2>
                </div>

                {/* Pagination controls */}
                <div className="flex items-center gap-4">
                  <span className="font-sans text-sm text-muted-foreground">
                    Page {currentPage + 1} of {Math.min(TOTAL_PAGES, Math.ceil(moreProducts.length / PRODUCTS_PER_PAGE))}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={!hasPrevPage}
                      className="border-2 border-forest text-forest hover:bg-forest hover:text-cream disabled:opacity-30"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={!hasNextPage}
                      className="border-2 border-forest text-forest hover:bg-forest hover:text-cream disabled:opacity-30"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {currentProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* Page indicator dots */}
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: Math.min(TOTAL_PAGES, Math.ceil(moreProducts.length / PRODUCTS_PER_PAGE)) }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === currentPage ? "w-6 bg-gold" : "w-2 bg-forest/20 hover:bg-forest/40"
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
