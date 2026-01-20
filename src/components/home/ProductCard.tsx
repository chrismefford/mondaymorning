import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/data/products";

interface ExtendedProduct extends Product {
  handle?: string;
  variants?: Array<{ id: string; title: string; availableForSale: boolean }>;
}

interface ProductCardProps {
  product: ExtendedProduct;
  variant?: "default" | "featured";
  useLifestyleImage?: boolean;
}

const ProductCard = ({ product, variant = "default", useLifestyleImage = true }: ProductCardProps) => {
  const isFeatured = variant === "featured";
  const { addToCart, isLoading } = useCart();
  
  // Use lifestyle image for homepage display, fall back to product image
  const lifestyleImage = useLifestyleImage && product.lifestyleImage 
    ? product.lifestyleImage 
    : product.image;
  
  // Always have the actual product image available for hover reveal
  const productImage = product.image;

  // Generate product link using handle if available, fallback to slugified name
  const productLink = product.handle 
    ? `/product/${product.handle}` 
    : `/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`;

  // Get first variant ID for adding to cart
  const firstVariantId = product.variants?.[0]?.id;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (firstVariantId) {
      await addToCart(firstVariantId);
    }
  };

  return (
    <Link to={productLink} className="block">
      <article 
        className={`group relative ${isFeatured ? "lg:flex lg:items-center lg:gap-12" : ""}`}
      >
        {/* Image Container with Hover Reveal */}
        <div 
          className={`relative overflow-hidden rounded-2xl bg-sand ${
            isFeatured ? "lg:w-1/2 aspect-[4/5]" : "aspect-[3/4]"
          } shadow-card group-hover:shadow-elevated transition-shadow duration-300`}
        >
          {/* Lifestyle Image (default) */}
          <img
            src={lifestyleImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
          />
          
          {/* Product Image (revealed on hover) */}
          <img
            src={productImage}
            alt={`${product.name} bottle`}
            className="absolute inset-0 w-full h-full object-contain p-6 bg-cream transition-opacity duration-500 ease-out opacity-0 group-hover:opacity-100"
          />
          
          {/* Badge */}
          {product.badge && (
            <Badge 
              className="absolute top-4 left-4 z-20 bg-gold text-forest-deep font-sans text-xs font-bold border-0 shadow-md"
            >
              {product.badge}
            </Badge>
          )}

          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 bg-gradient-to-t from-forest-deep/90 via-forest-deep/60 to-transparent z-10">
            <Button 
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariantId}
              className="w-full font-sans text-sm font-medium bg-forest text-cream hover:bg-forest-light gap-2 disabled:opacity-50"
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ShoppingBag className="h-4 w-4" />
              )}
              Add to Cart — ${product.price}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className={`${isFeatured ? "lg:w-1/2 lg:py-8" : "mt-4"}`}>
          <span className="font-sans text-xs font-medium uppercase tracking-wider text-ocean">
            {product.category}
          </span>
          
          <h3 className={`font-serif font-medium mt-1 ${isFeatured ? "text-3xl lg:text-4xl" : "text-xl"}`}>
            {product.name}
          </h3>
          
          {isFeatured && (
            <>
              <p className="font-serif text-lg italic text-primary mt-2">
                "{product.tagline}"
              </p>
              <p className="font-sans text-base text-muted-foreground leading-relaxed mt-4">
                {product.description}
              </p>
              
              {/* Flavor & Mood */}
              <div className="mt-6 space-y-3">
                {product.flavor && (
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-ocean-light flex items-center justify-center text-ocean text-xs font-medium">
                      🍊
                    </span>
                    <span className="font-sans text-sm text-foreground">{product.flavor}</span>
                  </div>
                )}
                {product.mood && (
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-sunset/20 flex items-center justify-center text-sunset text-xs font-medium">
                      ✨
                    </span>
                    <span className="font-sans text-sm text-foreground">{product.mood}</span>
                  </div>
                )}
              </div>

              {/* Benefits */}
              {product.benefits && (
                <ul className="mt-6 space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="font-sans text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-seafoam shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex items-center gap-4">
                <Button 
                  onClick={handleAddToCart}
                  disabled={isLoading || !firstVariantId}
                  size="lg" 
                  className="font-sans text-sm font-medium px-8 gap-2 bg-primary hover:bg-coral-dark disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShoppingBag className="h-4 w-4" />
                  )}
                  Add to Cart — ${product.price}
                </Button>
                {product.compareAtPrice && (
                  <span className="font-sans text-sm text-muted-foreground line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>
            </>
          )}

          {!isFeatured && (
            <div className="flex items-center gap-2 mt-2">
              <span className="font-sans text-base font-medium">${product.price}</span>
              {product.compareAtPrice && (
                <span className="font-sans text-sm text-muted-foreground line-through">
                  ${product.compareAtPrice}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
