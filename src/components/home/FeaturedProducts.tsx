import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { products as fallbackProducts, getLifestyleImage } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import { useRef } from "react";
import textureCream from "@/assets/texture-cream.webp";
import stampGold from "@/assets/stamp-gold.svg";
import { useShopifyProducts, shopifyToLocalProduct, isActiveProduct } from "@/hooks/useShopifyProducts";

const FeaturedProducts = () => {
  // Fetch best selling products, sorted by sales
  const { data: shopifyProducts, isLoading, error } = useShopifyProducts(100, {
    sortKey: "BEST_SELLING",
    includeSoldOut: false,
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  // Convert Shopify products to local format, keeping vendor info for diversity check
  const allProducts = (shopifyProducts
    ?.filter(isActiveProduct)
    .map(p => ({ ...shopifyToLocalProduct(p), vendor: p.vendor })) || fallbackProducts) as (ReturnType<typeof shopifyToLocalProduct> & { vendor?: string })[];
  
  // Filter out memberships, gift cards, non-beverage items, and sold out products
  const beverageProducts = allProducts.filter(p => 
    !p.category?.toLowerCase().includes('membership') &&
    !p.name?.toLowerCase().includes('gift card') &&
    !p.name?.toLowerCase().includes('subscription')
  );
  
  // Category helper so the grid stays varied (one product per category).
  const CATEGORY_KEYWORDS: { label: string; kw: string[] }[] = [
    { label: 'beer', kw: ['beer', 'lager', 'ale', 'ipa', 'stout', 'pilsner'] },
    { label: 'wine', kw: ['wine', 'sparkling', 'champagne', 'prosecco', 'rosé', 'rose'] },
    { label: 'cocktail', kw: ['cocktail', 'rtd', 'margarita', 'negroni', 'spritz', 'mule', 'paloma', 'martini'] },
    { label: 'spirit', kw: ['spirit', 'whiskey', 'gin', 'rum', 'vodka', 'aperitif', 'vermouth', 'amaro', 'tequila'] },
    { label: 'functional', kw: ['functional', 'adaptogen', 'nootropic', 'wellness', 'elixir', 'kava', 'tonic'] },
  ];
  const categoryOf = (p?: { category?: string; name?: string }) => {
    if (!p) return 'other';
    const s = `${p.category || ''} ${p.name || ''}`.toLowerCase();
    for (const c of CATEGORY_KEYWORDS) if (c.kw.some(kw => s.includes(kw))) return c.label;
    return 'other';
  };
  const brandOf = (p?: { vendor?: string; name?: string }) =>
    (p?.vendor || p?.name?.split(' ')[0] || '').toLowerCase();

  // "Try something new" = discovery picks. Spotlight lesser-known makers (Curious
  // Elixir first, per owner). The #1 best seller stays the featured hero for sales.
  const DISCOVERY_BRANDS = ['curious elixir', 'three spirit', 'ceybon', 'bolle', 'below brew', 'aplos', 'amethyst', 'abstinence', 'de soi'];
  // Headline brands kept OUT of the discovery grid (too well-known), plus brands
  // whose product photos still have dark/black backgrounds (Goodvines) so the
  // curated grid stays clean until those images are reshot.
  const EXCLUDE_BRANDS = ['leilo', 'goodvines'];

  const featuredProduct = beverageProducts[0];

  // Build a 4-item discovery grid: one per brand AND one per category for variety.
  const gridProducts: typeof beverageProducts = [];
  const usedBrands = new Set<string>([brandOf(featuredProduct)]);
  const usedCats = new Set<string>([categoryOf(featuredProduct)]);
  const usedIds = new Set<string>([featuredProduct?.id]);

  const tryAdd = (p?: (typeof beverageProducts)[number]) => {
    if (!p || gridProducts.length >= 4 || usedIds.has(p.id)) return;
    const brand = brandOf(p);
    if (EXCLUDE_BRANDS.some(b => brand.includes(b))) return;
    if (usedBrands.has(brand)) return;
    const cat = categoryOf(p);
    if (cat !== 'other' && usedCats.has(cat)) return;
    gridProducts.push(p);
    usedIds.add(p.id);
    usedBrands.add(brand);
    usedCats.add(cat);
  };

  // Rotate which SKU per brand shows based on the calendar month, so the picks
  // refresh ~once a month (keeps it fresh without feeling busy).
  const monthSeed = (() => { const d = new Date(); return d.getFullYear() * 12 + d.getMonth(); })();

  // Pass 1: curated discovery brands, in priority order (SKU rotates monthly).
  for (const brand of DISCOVERY_BRANDS) {
    if (gridProducts.length >= 4) break;
    const matches = beverageProducts.filter(p => brandOf(p).includes(brand));
    if (!matches.length) continue;
    const start = monthSeed % matches.length;
    for (let i = 0; i < matches.length; i++) {
      tryAdd(matches[(start + i) % matches.length]);
      if (gridProducts.length >= 4) break;
    }
  }
  // Pass 2: fill any remaining slots from the mid-tier (skip top sellers), staying diverse.
  if (gridProducts.length < 4) {
    for (const p of beverageProducts.slice(8)) {
      if (gridProducts.length >= 4) break;
      tryAdd(p);
    }
  }

  return (
    <section id="shop" className="py-10 lg:py-16 bg-cream relative overflow-hidden">
      {/* Organic texture background */}
      <div 
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Background stamp watermark */}
      <div className="absolute top-1/4 right-0 w-[20rem] lg:w-[40rem] opacity-[0.02] pointer-events-none select-none translate-x-1/4">
        <img src={stampGold} alt="" className="w-full h-full" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="container mx-auto px-4 lg:px-8 mb-6 lg:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-6">
            <div>
              <span className="font-sans text-[10px] lg:text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-2 lg:mb-4 block">
                ( 500+ to choose from )
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl xl:text-6xl leading-[1]">
                Try something <span className="font-script text-gold text-[1.2em] leading-none">new</span>
              </h2>
            </div>
            <p className="font-sans text-sm lg:text-base text-muted-foreground max-w-sm hidden lg:block">
              Don't guess, taste. Every bottle here has been handpicked because it's actually good.
            </p>
            <Link to="/collections/best-sellers" onClick={() => window.scrollTo(0, 0)}>
              <Button 
                variant="ghost" 
                className="hidden lg:flex font-sans text-sm font-semibold uppercase tracking-wider group self-start lg:self-auto border-2 border-transparent hover:border-forest text-forest px-6 py-3"
              >
                View all 500+
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-gold" />
            <span className="ml-3 text-muted-foreground">Loading products...</span>
          </div>
        )}

        {/* Error state - show fallback products */}
        {error && !isLoading && (
          <div className="container mx-auto px-4 mb-4">
            <p className="text-sm text-muted-foreground text-center">
              Showing sample products. Connect to Shopify to see your real inventory.
            </p>
          </div>
        )}

        {/* MOBILE: Horizontal scroll cards with peek */}
        {!isLoading && (
          <div className="lg:hidden mb-12">
            <div 
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Featured product as first card */}
              <Link 
                to={featuredProduct.handle ? `/product/${featuredProduct.handle}` : `/product/${featuredProduct.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex-shrink-0 w-[85vw] snap-center block"
              >
                <div className="relative bg-sand border-2 border-forest overflow-hidden">
                  <div className="aspect-[3/4]">
                    <img
                      src={featuredProduct.image}
                      alt={featuredProduct.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-8"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">Bestseller</span>
                    <h3 className="font-serif text-2xl font-bold mt-1">{featuredProduct.name}</h3>
                    <p className="font-sans text-sm text-cream/70 mt-2 line-clamp-2">{featuredProduct.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-sans text-xl font-bold">${featuredProduct.price}</span>
                      <Button size="sm" className="bg-gold text-forest font-sans text-xs uppercase tracking-wider">
                        View Product
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Other products */}
              {gridProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[70vw] snap-center">
                  <ProductCard product={product} showProductOnly />
                </div>
              ))}
            </div>

            {/* Scroll indicator dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[featuredProduct, ...gridProducts].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-6 bg-gold' : 'w-1.5 bg-forest/20'}`} 
                />
              ))}
            </div>

            {/* View all button - mobile */}
            <div className="px-4 mt-8">
              <Link to="/collections/best-sellers" onClick={() => window.scrollTo(0, 0)}>
                <Button 
                  variant="outline"
                  className="w-full font-sans text-sm font-bold uppercase tracking-widest py-5 border-2 border-forest text-forest hover:bg-forest hover:text-cream"
                >
                  Browse All 500+ Flavors
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* DESKTOP: Editorial Layout */}
        {!isLoading && (
          <div className="hidden lg:block container mx-auto px-4 lg:px-8">
            {/* Featured Product */}
            <Link 
              to={featuredProduct.handle ? `/product/${featuredProduct.handle}` : `/product/${featuredProduct.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="block mb-8 lg:mb-12 group"
            >
              <div className="grid lg:grid-cols-12 gap-8 items-center">
                {/* Image - Takes 7 columns */}
                <div className="lg:col-span-7 relative">
                  <div className="aspect-[4/3] lg:aspect-auto lg:h-[380px] overflow-hidden border-2 border-forest bg-sand">
                    <img
                      src={featuredProduct.image}
                      alt={featuredProduct.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-10 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  {/* Offset accent - Gold */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 lg:w-48 lg:h-48 bg-gold z-[-1]" />
                </div>

                {/* Content - Takes 5 columns */}
                <div className="lg:col-span-5 lg:pl-8">
                  <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
                    Bestseller
                  </span>
                  <h3 className="font-serif text-3xl lg:text-5xl font-bold mb-4 text-forest group-hover:text-forest-light transition-colors">
                    {featuredProduct.name}
                  </h3>
                  <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                    {featuredProduct.description}
                  </p>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-sans text-2xl lg:text-3xl font-bold text-forest">
                      ${featuredProduct.price}
                    </span>
                    <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground border border-forest/30 px-3 py-1">
                      {featuredProduct.category}
                    </span>
                  </div>
                  <Button 
                    size="lg"
                    className="font-sans text-sm font-semibold uppercase tracking-wider w-full lg:w-auto px-10 py-6 bg-forest text-cream hover:bg-forest-light hover-brutal"
                  >
                    View Product
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>

            {/* Product Grid - even rows */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 gap-y-10 lg:gap-8 items-stretch">
              {gridProducts.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product} showProductOnly />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
