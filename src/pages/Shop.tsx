import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowRight, Sun, Moon, Users, Palmtree, Sparkles, Wine, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { useShopifyAllProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import textureCream from "@/assets/texture-cream.svg";
import stampGold from "@/assets/stamp-gold.svg";

// Lifestyle images for vibe sections
import friendsBeachToast from "@/assets/lifestyle/friends-beach-toast.jpg";
import rooftopCheers from "@/assets/lifestyle/rooftop-cheers.jpg";
import dinnerPartyToast from "@/assets/lifestyle/dinner-party-toast.jpg";
import poolsideFriendsDrinks from "@/assets/lifestyle/poolside-friends-drinks.jpg";
import beachSunset1 from "@/assets/lifestyle/beach-sunset-1.jpg";
import sparklingCelebration from "@/assets/lifestyle/sparkling-celebration.jpg";
import functionalWellnessMorning from "@/assets/lifestyle/functional-wellness-morning.jpg";
import patioCoupleBeers from "@/assets/lifestyle/patio-couple-beers.jpg";

// Vibe sections configuration
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
    accentColor: "text-cream",
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
    bgColor: "bg-ocean",
    textColor: "text-cream",
    accentColor: "text-gold",
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
    bgColor: "bg-forest",
    textColor: "text-cream",
    accentColor: "text-gold",
    categories: ["Functional Elixir", "Functional", "Adaptogens"],
    keywords: ["morning", "energy", "focus", "clarity", "wellness", "ginger", "turmeric", "lemon"],
    maxProducts: 4,
  },
];

// Lookbook card component
const LookbookCard = ({ 
  product, 
  variant = "default" 
}: { 
  product: any; 
  variant?: "default" | "large" | "vertical" 
}) => {
  return (
    <div className={`
      relative group
      ${variant === "large" ? "col-span-2 row-span-2" : ""}
      ${variant === "vertical" ? "row-span-2" : ""}
    `}>
      <ProductCard 
        product={product} 
        showProductOnly 
        variant={variant === "large" ? "featured" : "default"}
      />
    </div>
  );
};

// Vibe section component with lookbook layout
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
  const isReversed = index % 2 === 1;
  
  if (products.length === 0) return null;
  
  return (
    <section className={`relative py-12 lg:py-20 ${index === 0 ? 'pt-8 lg:pt-12' : ''}`}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className={`flex flex-col lg:flex-row items-start lg:items-end gap-6 lg:gap-12 mb-8 lg:mb-12 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          {/* Lifestyle Image with Title Overlay */}
          <div className="relative w-full lg:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden group">
            <img 
              src={vibe.image} 
              alt={vibe.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
            <div className="grain absolute inset-0 pointer-events-none opacity-20" />
            
            {/* Title overlay on image */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-gold/90 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-forest" />
                </div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  The Vibe
                </span>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream mb-2">
                {vibe.title}
              </h2>
              <p className="font-sans text-base lg:text-lg text-cream/80 max-w-md">
                {vibe.subtitle}
              </p>
            </div>
          </div>
          
          {/* Products Grid - Lookbook Style */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {products.slice(0, 4).map((product, idx) => (
                <LookbookCard 
                  key={product.id} 
                  product={product}
                  variant={idx === 0 && products.length >= 4 ? "default" : "default"}
                />
              ))}
            </div>
            
            {/* View more link */}
            <Link 
              to={`/collections/${vibe.id}`}
              className="inline-flex items-center gap-2 mt-6 font-sans text-sm font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors group"
            >
              Shop this vibe
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative divider */}
      {index < vibeSections.length - 1 && (
        <div className="container mx-auto px-4 lg:px-8 mt-12 lg:mt-16">
          <div className="h-px bg-forest/10 w-full" />
        </div>
      )}
    </section>
  );
};

// Full-width lookbook banner
const LookbookBanner = ({ 
  image, 
  title, 
  subtitle, 
  products, 
  bgColor = "bg-forest" 
}: { 
  image: string; 
  title: string; 
  subtitle: string; 
  products: any[];
  bgColor?: string;
}) => {
  return (
    <section className={`relative py-16 lg:py-24 ${bgColor} overflow-hidden`}>
      <div className="grain absolute inset-0 pointer-events-none opacity-20" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
              Staff Favorites
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-cream mb-4">
              {title}
            </h2>
            <p className="font-sans text-lg text-cream/80 mb-8 max-w-md mx-auto lg:mx-0">
              {subtitle}
            </p>
            <Button 
              asChild
              className="font-sans text-sm font-bold uppercase tracking-widest bg-gold text-forest hover:bg-gold/90"
            >
              <Link to="/collections/best-sellers">
                Shop Best Sellers
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {/* Products showcase */}
          <div className="grid grid-cols-2 gap-4 lg:gap-6">
            {products.slice(0, 4).map((product) => (
              <div key={product.id} className="bg-cream rounded-xl overflow-hidden">
                <ProductCard product={product} showProductOnly />
              </div>
            ))}
          </div>
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
                Find Your <span className="italic">Moment</span>
              </h1>
              <p className="font-sans text-lg lg:text-xl text-cream/80 max-w-2xl mx-auto">
                Whether it's golden hour on the rooftop or a cozy night in—we've got 
                the perfect pour for every vibe.
              </p>
            </div>
          </div>
        </section>

        {/* Loading state */}
        {isLoading && (
          <section className="py-32">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-gold mb-4" />
              <span className="font-sans text-muted-foreground">Curating the vibes...</span>
            </div>
          </section>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <section className="py-20">
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
          <div className="relative">
            {/* Background texture */}
            <div 
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
            />
            
            {vibeSections.map((vibe, index) => (
              <VibeSection 
                key={vibe.id}
                vibe={vibe}
                products={vibeProducts[vibe.id] || []}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Best Sellers Banner */}
        {!isLoading && !error && bestSellers.length > 0 && (
          <LookbookBanner 
            image={rooftopCheers}
            title="The Essentials"
            subtitle="The drinks everyone's talking about. Start here."
            products={bestSellers}
            bgColor="bg-forest"
          />
        )}

        {/* All Products Link */}
        <section className="py-16 lg:py-24 bg-sand relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-10" />
          
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <h2 className="font-serif text-3xl lg:text-5xl text-forest mb-4">
              Want to see <span className="italic">everything</span>?
            </h2>
            <p className="font-sans text-forest/70 max-w-md mx-auto mb-8">
              Browse our full collection of 425+ non-alcoholic drinks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6"
              >
                <Link to="/collections/all">Browse All Products</Link>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="font-sans text-sm font-bold uppercase tracking-widest border-forest text-forest hover:bg-forest hover:text-cream px-10 py-6"
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
