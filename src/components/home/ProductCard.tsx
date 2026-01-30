import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/data/products";

interface ExtendedProduct extends Product {
  handle?: string;
  variants?: Array<{ id: string; title: string; availableForSale: boolean }>;
  soldOut?: boolean;
}

interface ProductCardProps {
  product: ExtendedProduct;
  variant?: "default" | "featured";
  useLifestyleImage?: boolean;
  showProductOnly?: boolean;
}

const ProductCard = ({ product, variant = "default", useLifestyleImage = true, showProductOnly = false }: ProductCardProps) => {
  const isFeatured = variant === "featured";
  const { addToCart, isLoading } = useCart();
  
  // Use lifestyle image for homepage display, fall back to product image
  const lifestyleImage = useLifestyleImage && product.lifestyleImage 
    ? product.lifestyleImage 
    : product.image;
  
  // Use original product image directly (no AI processing)
  const productImage = product.image;

  // Generate product link using handle if available, fallback to slugified name
  const productLink = product.handle 
    ? `/product/${product.handle}` 
    : `/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`;

  // Get first available variant ID for adding to cart
  const availableVariant = product.variants?.find(v => v.availableForSale);
  const firstVariantId = availableVariant?.id;
  
  // Check if product is sold out
  const isSoldOut = product.soldOut || !firstVariantId;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (firstVariantId && !isSoldOut) {
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
          className={`relative overflow-hidden rounded-2xl bg-sand border-2 border-forest/20 ${
            isFeatured ? "lg:w-1/2 aspect-[4/5]" : "aspect-[3/4]"
          } shadow-card group-hover:shadow-elevated transition-shadow duration-300`}
        >
          {showProductOnly ? (
            /* Product Only Mode - no hover effect */
            <img
              src={productImage}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-contain p-4 pb-8 z-10"
            />
          ) : (
            <>
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
                className="absolute inset-0 w-full h-full object-contain p-6 bg-transparent transition-opacity duration-500 ease-out opacity-0 group-hover:opacity-100"
              />
            </>
          )}
          
          {/* Badge */}
          {product.badge && (
            <Badge 
              className={`absolute top-4 left-4 z-20 font-sans text-xs font-bold border-0 shadow-md ${
                isSoldOut
                  ? "bg-muted text-muted-foreground"
                  : product.badge.toLowerCase().includes("staff") 
                    ? "bg-forest text-cream" 
                    : "bg-gold text-forest-deep"
              }`}
            >
              {product.badge}
            </Badge>
          )}

          {/* Price Tag - positioned on image */}
          <div className="absolute top-4 right-4 z-20 bg-cream/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
            <span className="font-sans text-sm font-bold text-forest">${product.price}</span>
            {product.compareAtPrice && (
              <span className="font-sans text-xs text-muted-foreground line-through ml-1.5">
                ${product.compareAtPrice}
              </span>
            )}
          </div>

          {/* Quick Add Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 bg-gradient-to-t from-forest-deep/90 via-forest-deep/60 to-transparent z-10">
            <Button 
              onClick={handleAddToCart}
              disabled={isLoading || isSoldOut}
              className={`w-full font-sans text-sm font-medium gap-2 ${
                isSoldOut 
                  ? "bg-muted text-muted-foreground cursor-not-allowed" 
                  : "bg-forest text-cream hover:bg-forest-light"
              }`}
              size="lg"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : isSoldOut ? (
                "Sold Out"
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart — ${product.price}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className={`${isFeatured ? "lg:w-1/2 lg:py-8" : "mt-4 text-center px-2 pb-3"}`}>
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-ocean">
            {product.category}
          </span>
          
          <h3 className={`font-serif font-semibold mt-1 leading-tight ${isFeatured ? "text-3xl lg:text-4xl" : "text-base lg:text-lg"}`}>
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
                  disabled={isLoading || isSoldOut}
                  size="lg" 
                  className={`font-sans text-sm font-medium px-8 gap-2 ${
                    isSoldOut 
                      ? "bg-muted text-muted-foreground cursor-not-allowed" 
                      : "bg-primary hover:bg-coral-dark"
                  }`}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isSoldOut ? (
                    "Sold Out"
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart — ${product.price}
                    </>
                  )}
                </Button>
                {product.compareAtPrice && !isSoldOut && (
                  <span className="font-sans text-sm text-muted-foreground line-through">
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>
            </>
          )}

        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
