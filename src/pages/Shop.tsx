import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader2, Sparkles, Wine, Beer, Leaf, Martini, Heart, Filter, Quote, Star, Zap, Sun, PartyPopper } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useShopifyAllProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import textureCream from "@/assets/texture-cream.svg";
import textureBlue from "@/assets/texture-blue.svg";
import stampGold from "@/assets/stamp-gold.svg";

// Category filters with icons
const categories = [
  { id: "all", name: "All Vibes", icon: Sparkles, color: "bg-gold" },
  { id: "Spirit Alternative", name: "Spirits", icon: Martini, color: "bg-ocean" },
  { id: "Wine Alternative", name: "Wine", icon: Wine, color: "bg-coral" },
  { id: "NA Beer", name: "Beer", icon: Beer, color: "bg-gold" },
  { id: "Functional", name: "Functional", icon: Leaf, color: "bg-forest" },
  { id: "Ready to Drink", name: "RTD", icon: Heart, color: "bg-sunset" },
];

// Fun divider modules that will be inserted throughout the grid
const funDividers = [
  {
    id: "quote-1",
    type: "quote",
    bg: "bg-ocean",
    text: '"Drink like you give a damn about tomorrow."',
    author: "— The sober curious",
    icon: Quote,
  },
  {
    id: "callout-1", 
    type: "callout",
    bg: "bg-gold",
    emoji: "🔥",
    headline: "Staff Obsession",
    text: "We've tried everything. These are the ones we actually take home.",
    icon: Star,
  },
  {
    id: "stat-1",
    type: "stat",
    bg: "bg-forest",
    stat: "425+",
    label: "Ways to not drink",
    subtext: "Zero excuses left",
    icon: Zap,
  },
  {
    id: "quote-2",
    type: "quote", 
    bg: "bg-coral",
    text: '"Alcohol-free hits different when it actually hits."',
    author: "— A convert",
    icon: Quote,
  },
  {
    id: "callout-2",
    type: "callout",
    bg: "bg-ocean",
    emoji: "💀",
    headline: "RIP Hangovers",
    text: "Remember those? Yeah, we don't either.",
    icon: Sun,
  },
  {
    id: "stat-2",
    type: "stat",
    bg: "bg-gold",
    stat: "0%",
    label: "Regrets",
    subtext: "Finally, a flex",
    icon: PartyPopper,
  },
];

// Divider component
const FunDivider = ({ divider }: { divider: typeof funDividers[0] }) => {
  const Icon = divider.icon;
  
  if (divider.type === "quote") {
    return (
      <div className={`${divider.bg} rounded-2xl p-10 lg:p-14 flex flex-col justify-center h-full min-h-[280px] lg:min-h-[320px] relative overflow-hidden`}>
        <div className="grain absolute inset-0 pointer-events-none opacity-20" />
        <Icon className={`h-12 w-12 lg:h-16 lg:w-16 mb-6 ${divider.bg === 'bg-forest' ? 'text-gold' : 'text-cream/80'}`} />
        <p className={`font-serif text-3xl lg:text-5xl xl:text-6xl italic font-bold leading-[1.1] ${divider.bg === 'bg-gold' ? 'text-forest' : 'text-cream'}`}>
          {divider.text}
        </p>
        <span className={`font-sans text-base lg:text-lg font-bold uppercase tracking-wider mt-6 ${divider.bg === 'bg-gold' ? 'text-forest/70' : 'text-cream/70'}`}>
          {divider.author}
        </span>
      </div>
    );
  }
  
  if (divider.type === "callout") {
    return (
      <div className={`${divider.bg} rounded-2xl p-10 lg:p-14 flex flex-col justify-center h-full min-h-[280px] lg:min-h-[320px] relative overflow-hidden`}>
        <div className="grain absolute inset-0 pointer-events-none opacity-20" />
        <span className="text-6xl lg:text-7xl mb-6">{divider.emoji}</span>
        <div className="flex items-center gap-3 mb-4">
          <Icon className={`h-6 w-6 lg:h-8 lg:w-8 ${divider.bg === 'bg-gold' ? 'text-forest' : 'text-gold'}`} />
          <span className={`font-sans text-base lg:text-xl font-black uppercase tracking-wider ${divider.bg === 'bg-gold' ? 'text-forest' : 'text-gold'}`}>
            {divider.headline}
          </span>
        </div>
        <p className={`font-serif text-2xl lg:text-4xl xl:text-5xl font-bold leading-[1.1] ${divider.bg === 'bg-gold' ? 'text-forest' : 'text-cream'}`}>
          {divider.text}
        </p>
      </div>
    );
  }
  
  if (divider.type === "stat") {
    return (
      <div className={`${divider.bg} rounded-2xl p-10 lg:p-14 flex flex-col justify-center items-center text-center h-full min-h-[280px] lg:min-h-[320px] relative overflow-hidden`}>
        <div className="grain absolute inset-0 pointer-events-none opacity-20" />
        <Icon className={`h-10 w-10 lg:h-12 lg:w-12 mb-4 ${divider.bg === 'bg-gold' ? 'text-forest' : 'text-gold'}`} />
        <span className={`font-serif text-7xl lg:text-8xl xl:text-9xl font-black ${divider.bg === 'bg-gold' ? 'text-forest' : 'text-cream'}`}>
          {divider.stat}
        </span>
        <span className={`font-sans text-xl lg:text-2xl font-black uppercase tracking-wider mt-3 ${divider.bg === 'bg-gold' ? 'text-forest' : 'text-cream'}`}>
          {divider.label}
        </span>
        <span className={`font-sans text-base lg:text-lg font-medium mt-2 ${divider.bg === 'bg-gold' ? 'text-forest/60' : 'text-cream/60'}`}>
          {divider.subtext}
        </span>
      </div>
    );
  }
  
  return null;
};

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  // Fetch all products
  const { data: products, isLoading, error } = useShopifyAllProducts({
    sortKey: "BEST_SELLING",
  });

  // Convert and filter products
  const displayProducts = useMemo(() => {
    if (!products) return [];
    
    const converted = products
      .map(shopifyToLocalProduct)
      // Filter out non-beverage items
      .filter(p => 
        !p.name.toLowerCase().includes("gift card") &&
        !p.name.toLowerCase().includes("membership") &&
        !p.name.toLowerCase().includes("subscription")
      );
    
    // Apply category filter
    if (activeCategory === "all") return converted;
    
    return converted.filter(p => 
      p.category?.toLowerCase().includes(activeCategory.toLowerCase()) ||
      activeCategory.toLowerCase().includes(p.category?.toLowerCase() || "")
    );
  }, [products, activeCategory]);

  // Build grid items with dividers interspersed
  const gridItems = useMemo(() => {
    const items: Array<{ type: 'product' | 'divider'; data: any; index: number }> = [];
    let dividerIndex = 0;
    
    displayProducts.forEach((product, index) => {
      // Insert a divider every 8 products (after positions 7, 15, 23, etc.)
      if (index > 0 && index % 8 === 0 && dividerIndex < funDividers.length) {
        items.push({
          type: 'divider',
          data: funDividers[dividerIndex],
          index: items.length,
        });
        dividerIndex++;
      }
      
      items.push({
        type: 'product',
        data: product,
        index: items.length,
      });
    });
    
    return items;
  }, [displayProducts]);

  // Randomly assign visual emphasis to some products (deterministic based on index)
  const getCardSize = (index: number, productId: string) => {
    const hash = productId.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
    const mod = Math.abs(hash) % 16;
    
    // Fewer large cards when dividers are present
    if (mod === 0 && index < displayProducts.length - 2) return "large";
    return "normal";
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-forest text-cream overflow-hidden">
          {/* Background texture */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${textureBlue})`, backgroundSize: 'cover' }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          
          {/* Decorative stamp */}
          <div className="absolute -top-20 -right-20 w-64 lg:w-[28rem] opacity-[0.05] pointer-events-none">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
                425+ Flavors
              </span>
              <h1 className="font-serif text-5xl lg:text-7xl xl:text-8xl mb-6">
                The <span className="italic">Good Stuff</span>
              </h1>
              <p className="font-sans text-lg lg:text-xl text-cream/80 max-w-2xl mx-auto mb-8">
                Premium non-alcoholic drinks for every mood, moment, and vibe. 
                Find your new favorite.
              </p>
              
              {/* Fun stats */}
              <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mt-12">
                <div className="text-center">
                  <span className="block font-serif text-4xl lg:text-5xl text-gold">425+</span>
                  <span className="font-sans text-xs uppercase tracking-wider text-cream/60">Flavors</span>
                </div>
                <div className="text-center">
                  <span className="block font-serif text-4xl lg:text-5xl text-gold">0%</span>
                  <span className="font-sans text-xs uppercase tracking-wider text-cream/60">Alcohol</span>
                </div>
                <div className="text-center">
                  <span className="block font-serif text-4xl lg:text-5xl text-gold">100%</span>
                  <span className="font-sans text-xs uppercase tracking-wider text-cream/60">Good Vibes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Pills */}
        <section className="sticky top-16 lg:top-20 z-40 bg-cream/95 backdrop-blur-md border-b border-forest/10 py-4">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {/* Mobile filter button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden shrink-0 border-forest/30"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              
              {/* Category pills */}
              <div className="hidden lg:flex items-center gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-full font-sans text-sm font-medium
                        transition-all duration-300 shrink-0
                        ${isActive 
                          ? "bg-forest text-cream shadow-lg scale-105" 
                          : "bg-cream border-2 border-forest/20 text-forest hover:border-forest/40 hover:bg-sand"
                        }
                      `}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? "text-gold" : ""}`} />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
              
              {/* Product count */}
              <div className="ml-auto shrink-0">
                <Badge variant="secondary" className="font-sans text-xs bg-sand text-forest border-0">
                  {displayProducts.length} drinks
                </Badge>
              </div>
            </div>
            
            {/* Mobile filters drawer */}
            {showFilters && (
              <div className="lg:hidden mt-4 pb-2 animate-fade-in">
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          setShowFilters(false);
                        }}
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-full font-sans text-sm font-medium
                          transition-all duration-300
                          ${isActive 
                            ? "bg-forest text-cream" 
                            : "bg-sand/50 text-forest border border-forest/20"
                          }
                        `}
                      >
                        <Icon className="h-4 w-4" />
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Products Grid with Fun Dividers */}
        <section className="py-12 lg:py-20 relative">
          {/* Background texture */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Loading state */}
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="h-12 w-12 animate-spin text-gold mb-4" />
                <span className="font-sans text-muted-foreground">Loading the good stuff...</span>
              </div>
            )}

            {/* Error state */}
            {error && !isLoading && (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">
                  Unable to load products. Please try again.
                </p>
                <Button onClick={() => window.location.reload()}>
                  Refresh Page
                </Button>
              </div>
            )}

            {/* No products state */}
            {!isLoading && !error && displayProducts.length === 0 && (
              <div className="text-center py-20">
                <h3 className="font-serif text-2xl mb-4">No drinks found</h3>
                <p className="text-muted-foreground mb-6">
                  Try a different category or browse all products.
                </p>
                <Button onClick={() => setActiveCategory("all")}>
                  View All Drinks
                </Button>
              </div>
            )}

            {/* Products with dividers */}
            {!isLoading && gridItems.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 gap-y-10 lg:gap-y-16">
                {gridItems.map((item, idx) => {
                  if (item.type === 'divider') {
                    return (
                      <div 
                        key={item.data.id}
                        className="col-span-2 lg:col-span-2"
                      >
                        <FunDivider divider={item.data} />
                      </div>
                    );
                  }
                  
                  const product = item.data;
                  const productIndex = displayProducts.indexOf(product);
                  const size = getCardSize(productIndex, product.id);
                  const isLarge = size === "large";
                  const shouldOffset = productIndex % 7 === 3;
                  
                  return (
                    <div 
                      key={product.id}
                      className={`
                        ${isLarge ? "col-span-2" : ""}
                        ${shouldOffset && !isLarge ? "lg:translate-y-6" : ""}
                        transition-all duration-300
                      `}
                    >
                      <ProductCard 
                        product={product} 
                        showProductOnly 
                        variant={isLarge ? "featured" : "default"}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 lg:py-24 bg-gold relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <h2 className="font-serif text-3xl lg:text-5xl text-forest mb-4">
              Can't decide?
            </h2>
            <p className="font-sans text-forest/70 max-w-md mx-auto mb-8">
              Visit one of our shops to taste before you buy. Our team will help you find your perfect match.
            </p>
            <Button 
              asChild
              size="lg"
              className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6"
            >
              <Link to="/locations">Find a Shop</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;