import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowRight, ArrowUpRight, Sun, Moon, Users, Palmtree, Sparkles, Wine, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { useShopifyAllProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import textureCream from "@/assets/texture-cream.svg";
import textureGreen from "@/assets/texture-green.svg";
import textureBlue from "@/assets/texture-blue.svg";
import stampGold from "@/assets/stamp-gold.svg";
import stampBlue from "@/assets/stamp-blue.svg";

// Lifestyle images for vibe sections
import friendsBeachToast from "@/assets/lifestyle/friends-beach-toast.jpg";
import rooftopCheers from "@/assets/lifestyle/rooftop-cheers.jpg";
import dinnerPartyToast from "@/assets/lifestyle/dinner-party-toast.jpg";
import poolsideFriendsDrinks from "@/assets/lifestyle/poolside-friends-drinks.jpg";
import beachSunset1 from "@/assets/lifestyle/beach-sunset-1.jpg";
import sparklingCelebration from "@/assets/lifestyle/sparkling-celebration.jpg";
import functionalWellnessMorning from "@/assets/lifestyle/functional-wellness-morning.jpg";
import patioCoupleBeers from "@/assets/lifestyle/patio-couple-beers.jpg";

// Vibe sections configuration with colors
const vibeSections = [
  {
    id: "beach-day",
    title: "Beach Day",
    subtitle: "Sun, sand, and good sips",
    icon: Palmtree,
    image: friendsBeachToast,
    bgColor: "bg-ocean",
    textColor: "text-cream",
    accentColor: "text-gold",
    texture: textureBlue,
    categories: ["Ready to Drink", "RTD", "Beverages", "NA Beer", "Beer"],
    keywords: ["tropical", "coconut", "citrus", "lime", "mango", "pineapple", "watermelon", "beach"],
    maxProducts: 4,
  },
  {
    id: "date-night",
    title: "Date Night",
    subtitle: "Intimate moments, elevated",
    icon: Heart,
    image: dinnerPartyToast,
    bgColor: "bg-forest",
    textColor: "text-cream",
    accentColor: "text-gold",
    texture: textureGreen,
    categories: ["Wine Alternative", "Wine", "Sparkling", "Spirit Alternative"],
    keywords: ["red", "pinot", "cabernet", "rose", "champagne", "elegant", "romantic"],
    maxProducts: 4,
  },
  {
    id: "golden-hour",
    title: "Golden Hour",
    subtitle: "When the light hits just right",
    icon: Sun,
    image: rooftopCheers,
    bgColor: "bg-gold",
    textColor: "text-forest",
    accentColor: "text-forest",
    texture: textureCream,
    categories: ["Aperitif", "Aperitivo", "Spirit Alternative", "Sparkling"],
    keywords: ["aperitif", "spritz", "bitter", "orange", "botanical", "herb"],
    maxProducts: 4,
  },
  {
    id: "cozy-evening",
    title: "Cozy Evening",
    subtitle: "Unwind in your own way",
    icon: Moon,
    image: patioCoupleBeers,
    bgColor: "bg-coral",
    textColor: "text-cream",
    accentColor: "text-gold",
    texture: textureCream,
    categories: ["Functional Elixir", "Functional", "Spirit Alternative", "Botanical"],
    keywords: ["calm", "relax", "lavender", "chamomile", "warm", "spice", "vanilla", "whiskey", "bourbon"],
    maxProducts: 4,
  },
  {
    id: "party-mode",
    title: "Party Mode",
    subtitle: "Toast without the hangover",
    icon: Sparkles,
    image: sparklingCelebration,
    bgColor: "bg-forest",
    textColor: "text-cream",
    accentColor: "text-gold",
    texture: textureGreen,
    categories: ["Sparkling", "Champagne Alternative", "Ready to Drink"],
    keywords: ["celebration", "toast", "bubbly", "sparkling", "party", "prosecco"],
    maxProducts: 4,
  },
  {
    id: "morning-ritual",
    title: "Morning Ritual",
    subtitle: "Start with intention",
    icon: Sun,
    image: functionalWellnessMorning,
    bgColor: "bg-ocean",
    textColor: "text-cream",
    accentColor: "text-gold",
    texture: textureBlue,
    categories: ["Functional Elixir", "Functional", "Adaptogens"],
    keywords: ["morning", "energy", "focus", "clarity", "wellness", "ginger", "turmeric", "lemon"],
    maxProducts: 4,
  },
];

// Vibe section component with image on top and colorful background
const VibeSection = ({ 
  vibe, 
  products, 
  index 
}: { 
  vibe: typeof vibeSections[0]; 
  products: any[];
  index: number;
}) => {
  const Icon = vibe.icon;
  
  if (products.length === 0) return null;
  
  return (
    <section className={`relative py-12 lg:py-20 ${vibe.bgColor} overflow-hidden`}>
      {/* Texture background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url(${vibe.texture})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none" />
      
      {/* Decorative stamp */}
      {index % 2 === 0 ? (
        <div className="absolute -top-16 -right-16 w-48 lg:w-72 opacity-10 pointer-events-none">
          <img src={stampGold} alt="" className="w-full h-full" />
        </div>
      ) : (
        <div className="absolute -bottom-16 -left-16 w-48 lg:w-72 opacity-[0.08] pointer-events-none">
          <img src={stampBlue} alt="" className="w-full h-full" />
        </div>
      )}
      
      {/* Decorative blur */}
      <div className={`absolute top-1/4 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-64 h-64 ${vibe.bgColor === 'bg-gold' ? 'bg-forest/10' : 'bg-gold/10'} blur-3xl pointer-events-none`} />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header with Number */}
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full ${vibe.bgColor === 'bg-gold' ? 'bg-forest' : 'bg-gold/90'} flex items-center justify-center`}>
              <Icon className={`h-5 w-5 lg:h-6 lg:w-6 ${vibe.bgColor === 'bg-gold' ? 'text-gold' : 'text-forest'}`} />
            </div>
            <span className={`font-sans text-xs font-bold uppercase tracking-[0.2em] ${vibe.accentColor}`}>
              The Vibe
            </span>
          </div>
          <span className={`font-serif text-5xl lg:text-7xl font-bold ${vibe.bgColor === 'bg-gold' ? 'text-forest/10' : 'text-cream/10'}`}>
            0{index + 1}
          </span>
        </div>
        
        {/* Lifestyle Image - Full Width on Top */}
        <Link 
          to={`/collections/${vibe.id}`}
          className="block relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl overflow-hidden group mb-8 lg:mb-12 border-2 border-cream/20 hover:border-gold transition-colors duration-300"
        >
          <img 
            src={vibe.image} 
            alt={vibe.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          
          {/* Title overlay on image */}
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-serif text-4xl lg:text-5xl xl:text-7xl text-cream mb-2">
                  {vibe.title}
                </h2>
                <p className="font-sans text-base lg:text-lg text-cream/80 max-w-md">
                  {vibe.subtitle}
                </p>
              </div>
              <div className="hidden lg:flex w-14 h-14 border-2 border-cream items-center justify-center shrink-0 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                <ArrowUpRight className="h-6 w-6 text-cream group-hover:text-forest transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </Link>
        
        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-cream rounded-xl overflow-hidden">
              <ProductCard 
                product={product} 
                showProductOnly 
              />
            </div>
          ))}
        </div>
        
        {/* View more link */}
        <div className="flex justify-center mt-8 lg:mt-10">
          <Link 
            to={`/collections/${vibe.id}`}
            className={`inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-wider ${vibe.accentColor} hover:opacity-80 transition-colors group border-b-2 border-current pb-1`}
          >
            Shop {vibe.title}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const ShopPage = () => {
  // Fetch all products
  const { data: products, isLoading, error } = useShopifyAllProducts({
    sortKey: "BEST_SELLING",
  });

  // Convert products
  const allProducts = useMemo(() => {
    if (!products) return [];
    
    return products
      .map(shopifyToLocalProduct)
      .filter(p => 
        !p.name.toLowerCase().includes("gift card") &&
        !p.name.toLowerCase().includes("membership") &&
        !p.name.toLowerCase().includes("subscription")
      );
  }, [products]);

  // Match products to vibe sections
  const vibeProducts = useMemo(() => {
    const productsByVibe: Record<string, any[]> = {};
    const usedProductIds = new Set<string>();
    
    vibeSections.forEach((vibe) => {
      const matches = allProducts.filter((product) => {
        // Don't reuse products
        if (usedProductIds.has(product.id)) return false;
        
        // Check category match
        const categoryMatch = vibe.categories.some(cat => 
          product.category?.toLowerCase().includes(cat.toLowerCase()) ||
          cat.toLowerCase().includes(product.category?.toLowerCase() || "")
        );
        
        // Check keyword match in name
        const keywordMatch = vibe.keywords.some(keyword =>
          product.name.toLowerCase().includes(keyword.toLowerCase())
        );
        
        return categoryMatch || keywordMatch;
      });
      
      // Take up to maxProducts
      const selected = matches.slice(0, vibe.maxProducts);
      selected.forEach(p => usedProductIds.add(p.id));
      
      productsByVibe[vibe.id] = selected;
    });
    
    return productsByVibe;
  }, [allProducts]);

  // Get best sellers for the banner
  const bestSellers = useMemo(() => {
    return allProducts.slice(0, 4);
  }, [allProducts]);

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-forest text-cream overflow-hidden">
          {/* Texture */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url(${textureGreen})`, backgroundSize: 'cover' }}
          />
          {/* Decorative stamp */}
          <div className="absolute -top-20 -right-20 w-64 lg:w-[28rem] opacity-[0.05] pointer-events-none">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
                Shop by Vibe
              </span>
              <h1 className="font-serif text-5xl lg:text-7xl xl:text-8xl mb-6">
                Find Your <span className="italic text-gold">Moment</span>
              </h1>
              <p className="font-sans text-lg lg:text-xl text-cream/80 max-w-2xl mx-auto">
                Whether it's golden hour on the rooftop or a cozy night in—we've got 
                the perfect pour for every vibe.
              </p>
              
              {/* Fun stats */}
              <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mt-12">
                <div className="text-center">
                  <span className="block font-serif text-4xl lg:text-5xl text-gold">425+</span>
                  <span className="font-sans text-xs uppercase tracking-wider text-cream/60">Flavors</span>
                </div>
                <div className="text-center">
                  <span className="block font-serif text-4xl lg:text-5xl text-gold">6</span>
                  <span className="font-sans text-xs uppercase tracking-wider text-cream/60">Vibes</span>
                </div>
                <div className="text-center">
                  <span className="block font-serif text-4xl lg:text-5xl text-gold">∞</span>
                  <span className="font-sans text-xs uppercase tracking-wider text-cream/60">Good Times</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loading state */}
        {isLoading && (
          <section className="py-32 bg-sand">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-gold mb-4" />
              <span className="font-sans text-muted-foreground">Curating the vibes...</span>
            </div>
          </section>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <section className="py-20 bg-sand">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Unable to load products. Please try again.
              </p>
              <Button onClick={() => window.location.reload()}>
                Refresh Page
              </Button>
            </div>
          </section>
        )}

        {/* Vibe Sections */}
        {!isLoading && !error && (
          <>
            {vibeSections.map((vibe, index) => (
              <VibeSection 
                key={vibe.id}
                vibe={vibe}
                products={vibeProducts[vibe.id] || []}
                index={index}
              />
            ))}
          </>
        )}

        {/* Best Sellers Banner */}
        {!isLoading && !error && bestSellers.length > 0 && (
          <section className="relative py-16 lg:py-24 bg-sand overflow-hidden">
            <div 
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
            />
            <div className="grain absolute inset-0 pointer-events-none opacity-10" />
            
            <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
              <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
                Community Favorites
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl text-forest mb-4">
                The <span className="italic">Essentials</span>
              </h2>
              <p className="font-sans text-forest/70 max-w-md mx-auto mb-10">
                The drinks everyone's talking about. Start here.
              </p>
              
              {/* Products showcase */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto mb-10">
                {bestSellers.map((product) => (
                  <div key={product.id} className="bg-cream rounded-xl overflow-hidden shadow-sm">
                    <ProductCard product={product} showProductOnly />
                  </div>
                ))}
              </div>
              
              <Button 
                asChild
                size="lg"
                className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6"
              >
                <Link to="/collections/best-sellers">
                  Shop Best Sellers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        )}

        {/* All Products Link */}
        <section className="py-16 lg:py-24 bg-forest relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url(${textureGreen})`, backgroundSize: 'cover' }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <h2 className="font-serif text-3xl lg:text-5xl text-cream mb-4">
              Want to see <span className="italic text-gold">everything</span>?
            </h2>
            <p className="font-sans text-cream/70 max-w-md mx-auto mb-8">
              Browse our full collection of 425+ non-alcoholic drinks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="font-sans text-sm font-bold uppercase tracking-widest bg-gold text-forest hover:bg-gold/90 px-10 py-6"
              >
                <Link to="/shop">Browse All Products</Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-gold text-gold hover:bg-gold hover:text-forest px-10 py-6"
              >
                <Link to="/locations">Visit a Shop</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShopPage;
