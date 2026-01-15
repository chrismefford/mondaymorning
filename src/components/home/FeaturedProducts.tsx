import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  const featuredProduct = products[0];
  const gridProducts = products.slice(1, 5);

  return (
    <section id="shop" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 block">
              Featured
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-medium">
              Shop our favorites
            </h2>
          </div>
          <Button 
            variant="ghost" 
            className="font-sans text-sm font-medium mt-4 lg:mt-0 group self-start lg:self-auto"
          >
            View all products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Featured Product */}
        <div className="mb-16 lg:mb-24">
          <ProductCard product={featuredProduct} variant="featured" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {gridProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
