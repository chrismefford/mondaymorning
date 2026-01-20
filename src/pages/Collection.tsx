import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { collections } from "@/data/products";
import { useShopifyProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import textureCream from "@/assets/texture-cream.svg";
import stampGold from "@/assets/stamp-gold.svg";

// Map collection slugs to Shopify product types for filtering
const collectionFilters: Record<string, { types: string[]; title: string; description: string }> = {
  "na-beer": {
    types: ["NA Beer", "Beer", "Craft Beer", "Lager", "IPA", "Pilsner", "Ale"],
    title: "NA Beer",
    description: "Craft taste, zero proof. The best non-alcoholic beers from around the world."
  },
  "wine-alternatives": {
    types: ["Wine Alternative", "Wine", "Red Wine", "White Wine", "Rosé", "Sparkling Wine"],
    title: "Wine Alternatives",
    description: "All the ritual, reimagined. Dealcoholized wines that don't compromise on flavor."
  },
  "best-sellers": {
    types: [], // Empty means show bestsellers tag instead
    title: "Best Sellers",
    description: "Our community favorites. The drinks that keep people coming back."
  },
  "functional": {
    types: ["Functional Elixir", "Functional", "Adaptogens", "Wellness"],
    title: "Functional Drinks",
    description: "Beverages with benefits. Adaptogens, nootropics, and feel-good ingredients."
  },
  "beach-bonfire": {
    types: ["Ready to Drink", "RTD", "Beverages", "Mixers"],
    title: "Beach Bonfire Vibes",
    description: "Sip under the stars. Easy-drinking options for outdoor moments."
  },
  "weddings": {
    types: ["Sparkling", "Champagne Alternative", "Wine Alternative"],
    title: "Weddings & Events",
    description: "Toast-worthy moments. Elegant options for celebrations."
  },
  "spirit-alternatives": {
    types: ["Spirit Alternative", "Spirit", "Spirits", "Botanical"],
    title: "Spirit Alternatives",
    description: "Complex and bold. Alcohol-free spirits for craft cocktails."
  },
  "aperitifs": {
    types: ["Aperitif", "Aperitivo"],
    title: "Aperitifs",
    description: "Golden hour essentials. Light, bitter, and perfect for pre-dinner sipping."
  }
};

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: shopifyProducts, isLoading, error } = useShopifyProducts(100);
  
  // Get collection info
  const collectionInfo = slug ? collectionFilters[slug] : null;
  const collectionMeta = collections.find(c => c.id === slug);
  
  // Convert and filter products
  const allProducts = shopifyProducts?.map(shopifyToLocalProduct) || [];
  
  const filteredProducts = allProducts.filter(product => {
    if (!collectionInfo) return false;
    
    // For best sellers, check for bestseller tag/badge
    if (slug === "best-sellers") {
      return product.badge?.toLowerCase().includes("best") || 
             product.badge?.toLowerCase().includes("seller") ||
             product.badge?.toLowerCase().includes("popular");
    }
    
    // Filter by product type/category
    return collectionInfo.types.some(type => 
      product.category?.toLowerCase().includes(type.toLowerCase()) ||
      type.toLowerCase().includes(product.category?.toLowerCase() || "")
    );
  });

  // If no specific filter matches, show products that match the collection name
  const displayProducts = filteredProducts.length > 0 
    ? filteredProducts 
    : allProducts.filter(p => 
        p.name?.toLowerCase().includes(slug?.replace("-", " ") || "") ||
        p.category?.toLowerCase().includes(slug?.replace("-", " ") || "")
      );

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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {displayProducts.map((product, index) => (
                  <div 
                    key={product.id}
                    className={`${index % 3 === 1 ? 'lg:translate-y-8' : ''}`}
                  >
                    <ProductCard product={product} />
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