import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  useShopifyCatalogProducts,
  formatShopifyPrice,
  type ShopifyProduct,
} from "@/hooks/useShopifyProducts";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import {
  Loader2,
  Building2,
  Search,
  Package,
  LogOut,
  Phone,
  Mail,
  ShoppingBag,
} from "lucide-react";
import { SITE_NAME, getCanonicalUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface WholesaleCustomer {
  id: string;
  company_name: string;
  discount_tier: string;
  payment_terms: string;
}

export default function WholesaleCatalog() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<WholesaleCustomer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Fetch products with F&B catalog pricing from Shopify Admin API
  const { data: products, isLoading: productsLoading } = useShopifyCatalogProducts({
    enabled: !!customer,
  });

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        navigate("/wholesale-login");
        return;
      }

      const { data: wholesaleData, error } = await supabase
        .from("wholesale_customers")
        .select("id, company_name, discount_tier, payment_terms")
        .eq("user_id", session.user.id)
        .eq("is_active", true)
        .maybeSingle();

      if (error || !wholesaleData) {
        toast.error("You don't have access to the wholesale catalog.");
        navigate("/wholesale-login");
        return;
      }

      setCustomer(wholesaleData);
      setIsLoading(false);
    };

    checkAccess();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        navigate("/wholesale-login");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/wholesale-login");
  };

  // Filter products - ONLY show products with F&B catalog pricing
  const filteredProducts = products?.filter((product) => {
    // Must have F&B catalog pricing to be shown
    if (!product.hasCatalogPricing) return false;
    
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" ||
      product.productType.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = Array.from(
    new Set(products?.map((p) => p.productType).filter(Boolean) || [])
  ).sort();

  // Get prices from catalog pricing (comes from Shopify Admin API with contextualPricing)
  const getProductPricing = (product: ShopifyProduct & { hasCatalogPricing?: boolean }) => {
    const catalogPrice = parseFloat(product.priceRange.minVariantPrice.amount);
    const retailPrice = parseFloat(product.compareAtPriceRange.minVariantPrice.amount);
    
    // Show discount when catalog price is lower than retail
    const hasDiscount = retailPrice > catalogPrice && catalogPrice > 0;
    const discountPercent = hasDiscount
      ? Math.round(((retailPrice - catalogPrice) / retailPrice) * 100)
      : 0;
      
    return { 
      wholesalePrice: catalogPrice, 
      retailPrice: hasDiscount ? retailPrice : 0, // Only show retail if there's a discount
      discountPercent,
      hasFBPricing: product.hasCatalogPricing ?? false
    };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-forest" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Helmet>
        <title>Wholesale Catalog | {SITE_NAME}</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={getCanonicalUrl("/wholesale-catalog")} />
      </Helmet>

      <Header />

      <main className="flex-1 pt-20">
        {/* Header Banner */}
        <div className="bg-forest text-cream py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h1 className="font-serif text-2xl">{customer?.company_name}</h1>
                  <div className="flex items-center gap-3 text-sm text-cream/70">
                    <Badge variant="outline" className="border-gold/50 text-gold">
                      {customer?.discount_tier?.toUpperCase()} Tier
                    </Badge>
                    <span>•</span>
                    <span>{customer?.payment_terms?.toUpperCase()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
              <Button
                  variant="outline"
                  size="sm"
                  className="border-gold text-gold hover:bg-gold hover:text-forest-deep"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-cream border-b border-forest/10 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <a
                  href="tel:8584123253"
                  className="flex items-center gap-2 text-sm text-forest hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (858) 412-3253
                </a>
                <a
                  href="mailto:sales@mondaymorning-af.com"
                  className="flex items-center gap-2 text-sm text-forest hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  sales@mondaymorning-af.com
                </a>
              </div>
              <p className="text-sm text-forest/70">
                <span className="font-medium text-gold">Wholesale pricing</span>{" "}
                vs retail
              </p>
            </div>
          </div>
        </div>

        {/* Catalog Section */}
        <div className="container mx-auto px-4 py-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
              <Input
                placeholder="Search products or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-forest/20 focus:border-gold"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48 border-forest/20">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Count */}
          <p className="text-sm text-forest/60 mb-6">
            Showing {filteredProducts?.length || 0} products
          </p>

          {/* Products Grid */}
          {productsLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-forest" />
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
              {filteredProducts.map((product) => {
                const pricing = getProductPricing(product);
                return (
                  <WholesaleProductCard
                    key={product.id}
                    product={product}
                    wholesalePrice={pricing.wholesalePrice}
                    retailPrice={pricing.retailPrice}
                    discountPercent={pricing.discountPercent}
                    hasFBPricing={pricing.hasFBPricing}
                  />
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Package className="w-12 h-12 text-forest/30 mx-auto mb-4" />
              <p className="text-forest/60">No products found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="bg-forest/5 py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-2xl text-forest mb-4">
              Need to place an order?
            </h2>
            <p className="text-forest/70 mb-6 max-w-xl mx-auto">
              Contact our wholesale team to place orders, request custom pricing, or inquire
              about special products not listed here.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:sales@mondaymorning-af.com">
                <Button className="bg-gold hover:bg-gold/90 text-forest-deep">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Sales Team
                </Button>
              </a>
              <a href="tel:8584123253">
                <Button variant="outline" className="border-forest text-forest hover:bg-forest hover:text-cream">
                  <Phone className="w-4 h-4 mr-2" />
                  Call (858) 412-3253
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Product Card Component
function WholesaleProductCard({
  product,
  wholesalePrice,
  retailPrice,
  discountPercent,
  hasFBPricing,
}: {
  product: ShopifyProduct;
  wholesalePrice: number;
  retailPrice: number;
  discountPercent: number;
  hasFBPricing: boolean;
}) {
  const hasDiscount = discountPercent > 0;
  const { addToCart, isLoading: isAddingToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  // Get the first variant ID for adding to cart
  const firstVariantId = product.variants.edges[0]?.node.id;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariantId || isAdding) return;
    
    setIsAdding(true);
    try {
      await addToCart(firstVariantId);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-forest/10 overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      {/* Image */}
      <div className="aspect-square bg-cream/50 relative">
        {product.featuredImage?.url ? (
          <div className="absolute inset-0 p-8">
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-forest/20" />
          </div>
        )}
      </div>

      {/* Info - flex-grow to fill remaining space, flex-col to push button down */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title block: reserve height so titles/prices align across cards */}
        <div className="min-h-[120px]">
          <p className="text-xs text-forest/50 uppercase tracking-wide mb-1">
            {product.vendor}
          </p>
          <h3 className="font-serif text-lg text-forest mb-1 line-clamp-2 leading-snug">
            {product.title}
          </h3>
          <p className="text-xs text-forest/60">{product.productType}</p>
        </div>

        {/* Pricing block: always reserve the same vertical space */}
        <div className="mt-3 space-y-1 min-h-[72px]">
          {/* Retail line placeholder keeps wholesale price aligned */}
          <p
            className={cn(
              "text-sm text-forest/50 line-through h-5",
              hasDiscount && retailPrice > 0 ? "opacity-100" : "opacity-0 select-none"
            )}
            aria-hidden={!(hasDiscount && retailPrice > 0)}
          >
            ${retailPrice.toFixed(2)}
          </p>
          <p className="text-xl font-bold text-forest">
            ${wholesalePrice.toFixed(2)}
          </p>
          {(hasFBPricing || hasDiscount) && (
            <p className="text-xs text-gold font-medium">F&B Pricing</p>
          )}
        </div>

        {/* Variants info (reserve height so button lines up) */}
        <p
          className={cn(
            "text-xs text-forest/50 mt-2 min-h-[16px]",
            product.variants.edges.length > 1 ? "opacity-100" : "opacity-0 select-none"
          )}
          aria-hidden={!(product.variants.edges.length > 1)}
        >
          {product.variants.edges.length} variants available
        </p>

        {/* Spacer to push button to bottom */}
        <div className="flex-grow" />

        {/* Buttons - always at bottom */}
        <div className="mt-4 flex flex-col gap-2">
          <Button
            size="sm"
            className="w-full bg-forest text-cream hover:bg-forest-light gap-2"
            onClick={handleAddToCart}
            disabled={isAdding || isAddingToCart || !firstVariantId}
          >
            {isAdding ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
            Add to Cart
          </Button>
          <Link to={`/product/${product.handle}`}>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-forest/20 text-forest hover:bg-forest hover:text-cream"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
