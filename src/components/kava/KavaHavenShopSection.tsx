import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Loader2, ArrowRight } from "lucide-react";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { useCart } from "@/hooks/useCart";
import textureCream from "@/assets/texture-cream.svg";

const KAVA_HANDLE = "kava-haven";

const KavaHavenShopSection = () => {
  const { data: product, isLoading: productLoading } = useShopifyProduct(KAVA_HANDLE);
  const { addToCart, isLoading: cartLoading } = useCart();

  const availableVariant = product?.raw?.variants?.edges?.[0]?.node;
  const variantId = availableVariant?.id;
  const isSoldOut = availableVariant ? !availableVariant.availableForSale : false;
  const productImage = product?.image || product?.raw?.featuredImage?.url;
  const price = product?.price || product?.raw?.priceRange?.minVariantPrice?.amount;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (variantId && !isSoldOut) {
      await addToCart(variantId);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-cream relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `url(${textureCream})`, backgroundSize: "cover" }}
      />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
              Shop Kava Haven
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              Get Yours <span className="italic">Today</span>
            </h2>
            <p className="font-sans text-forest/70 max-w-lg mx-auto">
              Plant-based relaxation in a can. No alcohol, no hangover — just smooth, social calm.
            </p>
          </div>

          {productLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : product ? (
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
              {/* Product Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  {productImage && (
                    <img
                      src={productImage}
                      alt={product.name || "Kava Haven"}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2 text-center md:text-left">
                <h3 className="font-serif text-2xl md:text-3xl text-forest mb-2">
                  {product.name || "Kava Haven"}
                </h3>
                {product.tagline && (
                  <p className="font-serif text-base italic text-gold mb-4">
                    "{product.tagline}"
                  </p>
                )}
                <p className="font-sans text-forest/70 leading-relaxed mb-6">
                  {product.description || "A ready-to-drink kava beverage crafted for smooth relaxation. Made from noble kava root with natural flavors."}
                </p>

                {price && (
                  <p className="font-sans text-2xl font-bold text-forest mb-6">
                    ${parseFloat(String(price)).toFixed(2)}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button
                    onClick={handleAddToCart}
                    disabled={cartLoading || isSoldOut}
                    size="lg"
                    className={`font-sans text-sm font-bold uppercase tracking-widest gap-2 px-8 py-6 ${
                      isSoldOut
                        ? "bg-muted text-muted-foreground cursor-not-allowed"
                        : "bg-forest text-cream hover:bg-forest-deep"
                    }`}
                  >
                    {cartLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isSoldOut ? (
                      "Sold Out"
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                  <Link to={`/product/${KAVA_HANDLE}`}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="font-sans text-sm font-bold uppercase tracking-widest border-forest/30 text-forest hover:bg-forest/10 px-8 py-6"
                    >
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* Fallback if product not found */
            <div className="text-center py-8">
              <p className="font-sans text-forest/60 mb-4">
                Browse our full Kava Haven collection online.
              </p>
              <Link to="/collections/all">
                <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6">
                  Shop All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default KavaHavenShopSection;
