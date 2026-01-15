import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "featured";
}

const ProductCard = ({ product, variant = "default" }: ProductCardProps) => {
  const isFeatured = variant === "featured";

  return (
    <article 
      className={`group relative ${isFeatured ? "lg:flex lg:items-center lg:gap-12" : ""}`}
    >
      {/* Image Container */}
      <div 
        className={`relative overflow-hidden rounded-lg bg-muted ${
          isFeatured ? "lg:w-1/2 aspect-[4/5]" : "aspect-[3/4]"
        }`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badge */}
        {product.badge && (
          <Badge 
            className="absolute top-4 left-4 bg-primary text-primary-foreground font-sans text-xs font-medium"
          >
            {product.badge}
          </Badge>
        )}

        {/* Quick Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            className="w-full font-sans text-sm font-medium"
            size="lg"
          >
            Add to Cart — ${product.price}
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className={`${isFeatured ? "lg:w-1/2 lg:py-8" : "mt-4"}`}>
        <span className="font-sans text-xs font-medium uppercase tracking-wider text-muted-foreground">
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
            <div className="mt-6 space-y-2">
              {product.flavor && (
                <p className="font-sans text-sm">
                  <span className="text-muted-foreground">Flavor: </span>
                  <span className="text-foreground">{product.flavor}</span>
                </p>
              )}
              {product.mood && (
                <p className="font-sans text-sm">
                  <span className="text-muted-foreground">Mood: </span>
                  <span className="text-foreground">{product.mood}</span>
                </p>
              )}
            </div>

            {/* Benefits */}
            {product.benefits && (
              <ul className="mt-6 space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="font-sans text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex items-center gap-4">
              <Button size="lg" className="font-sans text-sm font-medium px-8">
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
  );
};

export default ProductCard;
