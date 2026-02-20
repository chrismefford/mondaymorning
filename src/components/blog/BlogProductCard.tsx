import { Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowRight } from "lucide-react";

interface BlogProductCardProps {
  handle: string;
}

const BlogProductCard = ({ handle }: BlogProductCardProps) => {
  const { data: product, isLoading, error } = useShopifyProduct(handle);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="my-10 animate-pulse rounded-none border-l-4 border-gold bg-sand/50 p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-36 h-36 bg-muted shrink-0" />
          <div className="flex-1 space-y-3 w-full">
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-6 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-1/3" />
            <div className="h-10 bg-muted rounded w-40" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) return null;

  const imageUrl = product.raw?.featuredImage?.url || product.image;
  const price = product.raw?.priceRange?.minVariantPrice?.amount
    ? `$${parseFloat(product.raw.priceRange.minVariantPrice.amount).toFixed(2)}`
    : product.price;
  const variantId = product.raw?.variants?.edges?.[0]?.node?.id;
  const available = product.raw?.variants?.edges?.some(e => e.node.availableForSale) !== false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (variantId && available) {
      addToCart(variantId, 1);
    }
  };

  return (
    <div className="my-12 not-prose">
      <div className="relative overflow-hidden bg-forest group">
        {/* Gold top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-gold via-gold-light to-gold-warm absolute top-0 left-0 z-10" />

        <Link
          to={`/product/${handle}`}
          className="flex flex-col sm:flex-row gap-0 items-stretch no-underline"
        >
          {/* Image panel */}
          {imageUrl && (
            <div className="sm:w-52 sm:h-auto h-48 bg-forest-deep shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent z-10 pointer-events-none" />
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          )}

          {/* Content panel */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center gap-3 pt-6">
            <p className="text-gold text-[10px] font-sans uppercase tracking-[0.35em] font-semibold">
              ✦ Featured at Monday Morning
            </p>
            <h4 className="font-serif text-2xl sm:text-3xl text-cream leading-tight group-hover:text-gold transition-colors duration-300">
              {product.name}
            </h4>
            <p className="text-gold-light text-xl font-semibold font-sans">{price}</p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button
                onClick={handleAddToCart}
                disabled={!available}
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-warm text-forest-deep font-sans font-semibold text-sm px-5 py-3 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" />
                {available ? "Add to Cart" : "Sold Out"}
              </button>
              <span className="inline-flex items-center justify-center gap-2 border border-cream/20 text-cream/70 hover:text-cream hover:border-cream/50 font-sans text-sm px-5 py-3 transition-colors duration-200 cursor-pointer">
                View Details
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogProductCard;
