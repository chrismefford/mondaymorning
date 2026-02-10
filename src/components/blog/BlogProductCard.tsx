import { Link } from "react-router-dom";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface BlogProductCardProps {
  handle: string;
}

const BlogProductCard = ({ handle }: BlogProductCardProps) => {
  const { data: product, isLoading, error } = useShopifyProduct(handle);
  const { addToCart } = useCart();

  if (isLoading) {
    return (
      <div className="my-8 animate-pulse rounded-xl border border-border bg-card p-4">
        <div className="flex gap-4 items-center">
          <div className="w-24 h-24 rounded-lg bg-muted shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-muted rounded w-2/3" />
            <div className="h-4 bg-muted rounded w-1/4" />
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
    <div className="my-8 not-prose">
      <Link
        to={`/product/${handle}`}
        className="flex flex-col sm:flex-row gap-4 items-center rounded-xl border border-border bg-card p-4 hover:shadow-md transition-shadow group no-underline"
      >
        {imageUrl && (
          <div className="w-28 h-28 rounded-lg overflow-hidden bg-muted shrink-0">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h4 className="font-serif text-lg text-foreground group-hover:text-brand-green transition-colors leading-tight">
            {product.name}
          </h4>
          <p className="text-muted-foreground text-sm mt-1">{price}</p>
        </div>
        <Button
          size="sm"
          onClick={handleAddToCart}
          disabled={!available}
          className="shrink-0 bg-brand-green hover:bg-brand-green/90 text-white"
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          {available ? "Add to Cart" : "Sold Out"}
        </Button>
      </Link>
    </div>
  );
};

export default BlogProductCard;
