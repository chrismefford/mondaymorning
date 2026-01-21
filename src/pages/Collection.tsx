import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { collections } from "@/data/products";
import { useShopifyCollectionProducts, useShopifyProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import textureCream from "@/assets/texture-cream.svg";
import stampGold from "@/assets/stamp-gold.svg";

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

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();

  const isBestSellers = slug === "best-sellers";
  
  // Get Shopify collection handle from our slug
  const collectionInfo = slug ? collectionMapping[slug] : null;
  const shopifyHandle = collectionInfo?.shopifyHandle || slug || "";
  
  // Fetch products directly from Shopify
  // Best Sellers: use Shopify's BEST_SELLING sort (not a collection handle)
  const bestSellersQuery = useShopifyProducts(100, { sortKey: "BEST_SELLING" });
  const collectionQuery = useShopifyCollectionProducts(shopifyHandle, 100);

  const data = isBestSellers
    ? { products: bestSellersQuery.data || [] }
    : collectionQuery.data;

  const isLoading = isBestSellers ? bestSellersQuery.isLoading : collectionQuery.isLoading;
  const error = isBestSellers ? bestSellersQuery.error : collectionQuery.error;
  
  // Get local collection meta for fallback
  const collectionMeta = collections.find(c => c.id === slug);
  
  // Convert Shopify products to local format and randomly assign staff picks/best sellers
  const displayProducts = React.useMemo(() => {
    const products = (data as any)?.products?.map(shopifyToLocalProduct) || [];
    
    // Randomly pick ~20% of products to be staff picks and ~10% to be best sellers
    const staffPickIndices = new Set<number>();
    const bestSellerIndices = new Set<number>();
    const numStaffPicks = Math.max(1, Math.floor(products.length * 0.15));
    const numBestSellers = Math.max(1, Math.floor(products.length * 0.1));
    
    // Use product IDs to create deterministic "random" picks
    products.forEach((product, index) => {
      const hash = product.id.split('').reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
      const mod = Math.abs(hash) % 10;
      
      if (mod === 0 && bestSellerIndices.size < numBestSellers) {
        bestSellerIndices.add(index);
      } else if (mod <= 2 && staffPickIndices.size < numStaffPicks && !bestSellerIndices.has(index)) {
        staffPickIndices.add(index);
      }
    });
    
    return products.map((product, index) => ({
      ...product,
      badge: bestSellerIndices.has(index) 
        ? "Best Seller" 
        : staffPickIndices.has(index) 
          ? "Staff Pick" 
          : product.badge
    }));
  }, [data?.products]);

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-16 lg:py-24 bg-forest text-cream overflow-hidden">
          {/* Background texture */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          {/* Decorative stamp */}
          <div className="absolute -top-20 -right-20 w-64 lg:w-96 opacity-10 pointer-events-none">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Back link */}
            <Link 
              to="/#collections" 
              className="inline-flex items-center gap-2 font-sans text-sm text-cream/70 hover:text-gold transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Collections
            </Link>
            
            <div className="max-w-3xl">
              <span className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 block">
                Collection
              </span>
              <h1 className="font-serif text-4xl lg:text-6xl xl:text-7xl font-bold mb-6">
                {collectionInfo?.title || collectionMeta?.name || "Collection"}
              </h1>
              <p className="font-sans text-lg lg:text-xl text-cream/80 max-w-2xl">
                {collectionInfo?.description || collectionMeta?.description || "Explore our curated selection."}
              </p>
              
              {!isLoading && displayProducts.length > 0 && (
                <p className="font-sans text-sm text-cream/60 mt-4">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-16 lg:gap-8 lg:gap-y-24">
                {displayProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className={`${index % 3 === 1 ? 'lg:translate-y-8' : ''}`}
                  >
                    <ProductCard product={product} showProductOnly />
                  </div>
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