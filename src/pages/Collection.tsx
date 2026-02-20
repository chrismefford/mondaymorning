import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "@/lib/helmet-compat";
import { ArrowLeft, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { collections } from "@/data/products";
import { useShopifyCollectionProducts, useShopifyProducts, useShopifyAllProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import textureCream from "@/assets/texture-cream.svg";
import stampGold from "@/assets/stamp-gold.svg";
import { 
  SITE_NAME, 
  SITE_URL, 
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  truncateForSEO,
  getCanonicalUrl,
  generateCollectionSchema,
  generateBreadcrumbSchema
} from "@/lib/seo";

// Map our collection slugs to Shopify collection handles
const collectionMapping: Record<string, { shopifyHandle: string; title: string; description: string }> = {
  "na-beer": {
    shopifyHandle: "non-alcoholic-beer",
    title: "NA Beer",
    description: "Craft taste, zero proof. The best non-alcoholic beers from around the world."
  },
  "wine-alternatives": {
    shopifyHandle: "non-alcoholic-wine",
    title: "Wine Alternatives",
    description: "All the ritual, reimagined. Dealcoholized wines that don't compromise on flavor."
  },
  "spirit-alternatives": {
    shopifyHandle: "non-alcoholic-spirits",
    title: "Spirit Alternatives",
    description: "Complex and bold. Alcohol-free spirits for craft cocktails."
  },
  "functional": {
    shopifyHandle: "non-alcoholic-functional-spirits",
    title: "Functional Drinks",
    description: "Beverages with benefits. Adaptogens, nootropics, and feel-good ingredients."
  },
  "beach-bonfire": {
    shopifyHandle: "non-alcoholic-ready-to-drinks",
    title: "Beach Bonfire Vibes",
    description: "Sip under the stars. Easy-drinking options for outdoor moments."
  },
  "weddings": {
    shopifyHandle: "non-alcoholic-wine",
    title: "Weddings & Events",
    description: "Toast-worthy moments. Elegant options for celebrations."
  },
  "best-sellers": {
    shopifyHandle: "frontpage",
    title: "Best Sellers",
    description: "Our community favorites. The drinks that keep people coming back."
  },
  "aperitifs": {
    shopifyHandle: "non-alcoholic-aperitifs-digestifs-liqueurs",
    title: "Aperitifs & Digestifs",
    description: "Golden hour essentials. Light, bitter, and perfect for pre-dinner sipping."
  }
};

// Vibe-based collections that filter by keywords and categories
const vibeCollections: Record<string, { 
  title: string; 
  description: string; 
  categories: string[]; 
  keywords: string[];
  excludeKeywords?: string[];
  showAll?: boolean;
}> = {
  "all": {
    title: "All Products",
    description: "Browse our complete collection of 500+ non-alcoholic drinks.",
    categories: [],
    keywords: [],
    showAll: true,
  },
  "beach-day": {
    title: "Beach Day",
    description: "Sun, sand, and good sips. Refreshing drinks perfect for a day by the water.",
    categories: ["Ready to Drink", "RTD", "Beverages", "NA Beer", "Beer", "Sparkling"],
    keywords: ["tropical", "coconut", "citrus", "lime", "mango", "pineapple", "watermelon", "beach", "summer", "refreshing", "light", "crisp", "lager", "pilsner", "radler", "shandy", "seltzer", "agua fresca"],
  },
  "date-night": {
    title: "Date Night",
    description: "Intimate moments, elevated. Sophisticated sips for romantic evenings.",
    categories: ["Wine Alternative", "Wine", "Sparkling", "Spirit Alternative", "Aperitif", "Gummies"],
    keywords: ["red", "pinot", "cabernet", "rose", "champagne", "elegant", "romantic", "noir", "merlot", "shiraz", "chardonnay", "prosecco", "brut", "negroni", "manhattan", "old fashioned", "gummy", "gummies", "edible"],
  },
  "golden-hour": {
    title: "Golden Hour",
    description: "When the light hits just right. Aperitifs and spritzes for sunset sipping.",
    categories: ["Aperitif", "Aperitivo", "Spirit Alternative", "Sparkling", "Bitters"],
    keywords: ["aperitif", "aperitivo", "spritz", "bitter", "orange", "botanical", "herb", "vermouth", "amaro", "campari", "aperol", "blood orange", "citrus", "tonic", "g&t"],
  },
  "cozy-evening": {
    title: "Cozy Evening",
    description: "Unwind in your own way. Warming sips for nights in.",
    categories: ["Functional Elixir", "Functional", "Spirit Alternative", "Botanical"],
    keywords: ["calm", "relax", "lavender", "chamomile", "warm", "spice", "vanilla", "whiskey", "bourbon", "scotch", "rum", "brandy", "cognac", "cinnamon", "honey", "ginger", "cozy", "fireside"],
  },
  "party-mode": {
    title: "Party Mode",
    description: "Toast without the hangover. Celebratory drinks that keep the energy going.",
    categories: ["Sparkling", "Champagne Alternative", "Ready to Drink", "Wine Alternative"],
    keywords: ["celebration", "toast", "bubbly", "sparkling", "party", "prosecco", "champagne", "brut", "cava", "fizz", "bubbles", "festive", "cheers"],
  },
  "morning-ritual": {
    title: "Morning Ritual",
    description: "Start with intention. Energizing drinks and wellness elixirs for a mindful morning.",
    categories: ["Functional Elixir", "Functional", "Adaptogens", "Wellness", "Coffee"],
    keywords: ["morning", "energy", "focus", "clarity", "wellness", "ginger", "turmeric", "lemon", "coffee", "espresso", "matcha", "green tea", "immunity", "boost", "adaptogen", "nootropic", "mushroom", "lion's mane", "reishi"],
  },
};

const CollectionPage = () => {
  const { slug, brand } = useParams<{ slug?: string; brand?: string }>();
  
  // Determine the effective slug - use slug or decode brand
  const effectiveSlug = slug || "";
  const isBrandFilter = !!brand;
  const brandName = brand ? decodeURIComponent(brand).replace(/-/g, ' ') : "";

  const isBestSellers = effectiveSlug === "best-sellers";
  const isVibeCollection = effectiveSlug ? vibeCollections[effectiveSlug] !== undefined : false;
  
  // Get Shopify collection handle from our slug
  const collectionInfo = effectiveSlug ? collectionMapping[effectiveSlug] : null;
  const vibeInfo = effectiveSlug ? vibeCollections[effectiveSlug] : null;
  const shopifyHandle = collectionInfo?.shopifyHandle || effectiveSlug || "";
  
  // Fetch products directly from Shopify
  // Best Sellers: fetch more (50) to account for filtered non-tracked items, then limit to top 20
  const bestSellersQuery = useShopifyProducts(50, { sortKey: "BEST_SELLING" });
  const collectionQuery = useShopifyCollectionProducts(shopifyHandle, 100);
  const allProductsQuery = useShopifyAllProducts({ sortKey: "BEST_SELLING" });

  // Determine which data source to use - brand filter and vibe collections need all products
  const needsAllProducts = isBrandFilter || isVibeCollection;
  
  // For Best Sellers, limit to top 20 after fetching (since some may be filtered out as non-tracked)
  const bestSellersProducts = useMemo(() => {
    return (bestSellersQuery.data || []).slice(0, 20);
  }, [bestSellersQuery.data]);
  
  const data = isBestSellers
    ? { products: bestSellersProducts }
    : needsAllProducts
    ? { products: allProductsQuery.data || [] }
    : collectionQuery.data;

  const isLoading = isBestSellers 
    ? bestSellersQuery.isLoading 
    : needsAllProducts 
    ? allProductsQuery.isLoading 
    : collectionQuery.isLoading;
  const error = isBestSellers 
    ? bestSellersQuery.error 
    : needsAllProducts 
    ? allProductsQuery.error 
    : collectionQuery.error;
  
  // Get local collection meta for fallback
  const collectionMeta = collections.find(c => c.id === slug);
  
  // Convert and filter Shopify products
  const displayProducts = useMemo(() => {
    let products = (data as any)?.products?.map(shopifyToLocalProduct) || [];
    
    // Filter out non-beverage items
    products = products.filter((p: any) => 
      !p.name.toLowerCase().includes("gift card") &&
      !p.name.toLowerCase().includes("membership") &&
      !p.name.toLowerCase().includes("subscription")
    );
    
    // If this is a brand filter, filter by brand/vendor name
    if (isBrandFilter && brandName) {
      const brandLC = brandName.toLowerCase();
      products = products.filter((product: any) => {
        const nameLC = product.name.toLowerCase();
        const vendorLC = (product.vendor || "").toLowerCase();
        
        // Check if product name or vendor contains brand name
        return nameLC.includes(brandLC) || vendorLC.includes(brandLC);
      });
    }
    
    // If this is a vibe collection, filter by keywords and categories (unless showAll)
    if (isVibeCollection && vibeInfo && !vibeInfo.showAll) {
      products = products.filter((product: any) => {
        const nameLC = product.name.toLowerCase();
        const categoryLC = (product.category || "").toLowerCase();
        const descLC = (product.description || "").toLowerCase();
        
        // Check category match
        const categoryMatch = vibeInfo.categories.some(cat => 
          categoryLC.includes(cat.toLowerCase()) ||
          cat.toLowerCase().includes(categoryLC)
        );
        
        // Check keyword match in name or description
        const keywordMatch = vibeInfo.keywords.some(keyword =>
          nameLC.includes(keyword.toLowerCase()) ||
          descLC.includes(keyword.toLowerCase())
        );
        
        // Check exclude keywords
        const isExcluded = vibeInfo.excludeKeywords?.some(keyword =>
          nameLC.includes(keyword.toLowerCase())
        ) || false;
        
        return (categoryMatch || keywordMatch) && !isExcluded;
      });
    }
    
    // Staff Picks: only from curated brand list
    const staffPickBrands = [
      "glen dochus", "sentia", "kava haven", "dromme", "drømme", "ceybon", 
      "bolle", "sovi", "beaglepuss", "below brew", "trip", "curious elixirs", "higher ground"
    ];
    
    const staffPickIndices = new Set<number>();
    const bestSellerIndices = new Set<number>();
    const numStaffPicks = Math.max(1, Math.floor(products.length * 0.15));
    const numBestSellers = Math.max(1, Math.floor(products.length * 0.1));
    
    // Use product IDs to create deterministic "random" picks
    products.forEach((product: any, index: number) => {
      const hash = product.id.split('').reduce((a: number, b: string) => ((a << 5) - a) + b.charCodeAt(0), 0);
      const mod = Math.abs(hash) % 10;
      
      // Check if product is from a staff pick brand
      const nameLC = product.name.toLowerCase();
      const vendorLC = (product.vendor || "").toLowerCase();
      const isFromStaffPickBrand = staffPickBrands.some(brand => 
        nameLC.includes(brand) || vendorLC.includes(brand)
      );
      
      if (mod === 0 && bestSellerIndices.size < numBestSellers) {
        bestSellerIndices.add(index);
      } else if (mod <= 2 && staffPickIndices.size < numStaffPicks && !bestSellerIndices.has(index) && isFromStaffPickBrand) {
        staffPickIndices.add(index);
      }
    });
    
    return products.map((product: any, index: number) => ({
      ...product,
      badge: bestSellerIndices.has(index) 
        ? "Best Seller" 
        : staffPickIndices.has(index) 
          ? "Staff Pick" 
          : product.badge
    }));
  }, [data, isVibeCollection, vibeInfo, isBrandFilter, brandName]);

  // SEO data
  const collectionTitle = isBrandFilter 
    ? brandName 
    : vibeInfo?.title || collectionInfo?.title || collectionMeta?.name || "Collection";
  const collectionDescription = isBrandFilter
    ? `Explore all ${brandName} products at ${SITE_NAME}. Premium non-alcoholic beverages shipped nationwide.`
    : vibeInfo?.description || collectionInfo?.description || collectionMeta?.description || "Explore our curated selection of non-alcoholic beverages.";
  
  const pageTitle = `${truncateForSEO(collectionTitle, 50)} | ${SITE_NAME}`;
  const pageDescription = truncateForSEO(collectionDescription, 155);
  const canonicalUrl = getCanonicalUrl(isBrandFilter ? `/collections/brand/${brand}` : `/collections/${slug}`);
  
  const collectionSchema = generateCollectionSchema({
    name: collectionTitle,
    description: collectionDescription,
    url: canonicalUrl,
    products: displayProducts.slice(0, 10).map(p => ({
      name: p.name,
      url: `${SITE_URL}/product/${p.handle}`,
      image: p.image
    }))
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: isBrandFilter ? "Brands" : "Collections", url: `${SITE_URL}/shop` },
    { name: collectionTitle, url: canonicalUrl }
  ]);

  return (
    <div className="min-h-screen bg-cream">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:site_name" content={SITE_NAME} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(collectionSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-gold-warm text-forest-deep overflow-hidden">
          {/* Background texture - subtle */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          {/* Decorative stamp */}
          <div className="absolute -top-20 -right-20 w-64 lg:w-96 opacity-10 pointer-events-none">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Back link */}
            <Link 
              to={isBrandFilter ? "/about" : isVibeCollection ? "/shop" : "/#collections"} 
              className="inline-flex items-center gap-2 font-sans text-sm text-forest/80 hover:text-forest-deep transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {isBrandFilter ? "Back to About" : isVibeCollection ? "Back to Shop" : "Back to Collections"}
            </Link>
            
            <div className="max-w-3xl">
              <span className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-forest/60 mb-4 block">
                {isBrandFilter ? "Brand" : isVibeCollection ? "The Vibe" : "Collection"}
              </span>
              <h1 className="font-serif text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 capitalize text-forest-deep">
                {isBrandFilter ? brandName : vibeInfo?.title || collectionInfo?.title || collectionMeta?.name || "Collection"}
              </h1>
              <p className="font-sans text-lg lg:text-xl text-forest/90 max-w-2xl">
                {isBrandFilter 
                  ? `Explore all products from ${brandName}.`
                  : vibeInfo?.description || collectionInfo?.description || collectionMeta?.description || "Explore our curated selection."}
              </p>
              
              {!isLoading && displayProducts.length > 0 && (
                <p className="font-sans text-sm text-forest/70 mt-4">
                  {displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12 lg:py-20 relative">
          {/* Background texture */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Loading state */}
            {isLoading && (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
                <span className="ml-3 text-muted-foreground">Loading products...</span>
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
                <h3 className="font-serif text-2xl mb-4">No products found</h3>
                <p className="text-muted-foreground mb-6">
                  We're still curating this collection. Check back soon!
                </p>
                <Button asChild>
                  <Link to="/#shop">Browse All Products</Link>
                </Button>
              </div>
            )}

            {/* Products grid */}
            {!isLoading && displayProducts.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 items-start">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showProductOnly />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Related Collections */}
        <section className="py-12 lg:py-16 bg-sand/50">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-serif text-2xl lg:text-3xl mb-8">Explore More Collections</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {collections
                .filter(c => c.id !== slug)
                .slice(0, 4)
                .map(collection => (
                  <Link
                    key={collection.id}
                    to={`/collections/${collection.id}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-lg"
                  >
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-serif text-lg text-cream font-bold">
                        {collection.name}
                      </h3>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionPage;