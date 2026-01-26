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
  useShopifyAllProducts,
  formatShopifyPrice,
  type ShopifyProduct,
} from "@/hooks/useShopifyProducts";
import { toast } from "sonner";
import {
  Loader2,
  Building2,
  Search,
  Package,
  LogOut,
  Phone,
  Mail,
  Download,
  ShoppingCart,
} from "lucide-react";
import logoSecondaryGold from "@/assets/logo-secondary-gold.svg";
import { SITE_NAME, getCanonicalUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

interface WholesaleCustomer {
  id: string;
  company_name: string;
  discount_tier: string;
  payment_terms: string;
}

// Discount tiers (configured in Shopify Plus, simulated here for display)
const discountTiers: Record<string, number> = {
  standard: 0.20, // 20% off
  premium: 0.30, // 30% off
  vip: 0.40, // 40% off
};

export default function WholesaleCatalog() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<WholesaleCustomer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: products, isLoading: productsLoading } = useShopifyAllProducts({
    sortKey: "BEST_SELLING",
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

  // Filter products
  const filteredProducts = products?.filter((product) => {
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

  // Calculate wholesale price
  const getWholesalePrice = (retailPrice: string) => {
    const retail = parseFloat(retailPrice);
    const discount = discountTiers[customer?.discount_tier || "standard"] || 0.20;
    return retail * (1 - discount);
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

      <main className="flex-1">
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
                  className="border-cream/30 text-cream hover:bg-cream hover:text-forest"
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
                <span className="font-medium text-gold">
                  {(discountTiers[customer?.discount_tier || "standard"] * 100).toFixed(0)}% off
                </span>{" "}
                retail prices
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <WholesaleProductCard
                  key={product.id}
                  product={product}
                  wholesalePrice={getWholesalePrice(
                    product.priceRange.minVariantPrice.amount
                  )}
                  discountPercent={
                    discountTiers[customer?.discount_tier || "standard"] * 100
                  }
                />
              ))}
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
  discountPercent,
}: {
  product: ShopifyProduct;
  wholesalePrice: number;
  discountPercent: number;
}) {
  const retailPrice = parseFloat(product.priceRange.minVariantPrice.amount);
  const savings = retailPrice - wholesalePrice;

  return (
    <div className="bg-white rounded-xl border border-forest/10 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="aspect-square bg-cream/50 relative">
        {product.featuredImage?.url ? (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-12 h-12 text-forest/20" />
          </div>
        )}
        {/* Discount Badge */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-gold text-forest-deep font-semibold">
            {discountPercent.toFixed(0)}% OFF
          </Badge>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-forest/50 uppercase tracking-wide mb-1">
          {product.vendor}
        </p>
        <h3 className="font-serif text-lg text-forest mb-1 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-xs text-forest/60 mb-3">{product.productType}</p>

        {/* Pricing */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-forest/50 line-through">
              Retail: {formatShopifyPrice(retailPrice.toString())}
            </p>
            <p className="text-lg font-semibold text-forest">
              {formatShopifyPrice(wholesalePrice.toFixed(2))}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-green-600 font-medium">
              Save {formatShopifyPrice(savings.toFixed(2))}
            </p>
          </div>
        </div>

        {/* Variants info */}
        {product.variants.edges.length > 1 && (
          <p className="text-xs text-forest/50 mt-2">
            {product.variants.edges.length} variants available
          </p>
        )}

        {/* View Product Button */}
        <Link to={`/product/${product.handle}`}>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4 border-forest/20 text-forest hover:bg-forest hover:text-cream"
          >
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
