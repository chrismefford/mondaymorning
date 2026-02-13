import { Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ExternalLink } from "lucide-react";

interface BlogProductCardProps {
  handle: string;
}

const BlogProductCard = ({ handle }: BlogProductCardProps) => {
  const { data: product, isLoading, error } = useShopifyProduct(handle);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="my-10 animate-pulse rounded-2xl border-2 border-ocean/10 bg-white p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="w-36 h-36 rounded-xl bg-muted shrink-0" />
          <div className="flex-1 space-y-3 w-full">
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
    <div className="my-10 not-prose">
      <Link
        to={`/product/${handle}`}
        className="flex flex-col sm:flex-row gap-6 items-center rounded-2xl border-2 border-ocean/15 bg-white p-5 sm:p-6 hover:shadow-xl hover:border-ocean/30 transition-all duration-300 group no-underline"
      >
        {imageUrl && (
          <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl overflow-hidden bg-cream shrink-0 shadow-md">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <p className="text-xs font-sans uppercase tracking-widest text-ocean/50 mb-1">Shop This Product</p>
          <h4 className="font-serif text-xl sm:text-2xl text-ocean group-hover:text-brand-green transition-colors leading-tight mb-2">
            {product.name}
          </h4>
          <p className="text-ocean/70 text-lg font-semibold mb-3">{price}</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              size="default"
              onClick={handleAddToCart}
              disabled={!available}
              className="bg-brand-green hover:bg-brand-green/90 text-white font-sans"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {available ? "Add to Cart" : "Sold Out"}
            </Button>
            <Button
              size="default"
              variant="outline"
              className="border-ocean/20 text-ocean hover:bg-ocean/5 font-sans"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogProductCard;
