import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const FeaturedProducts = () => {
  const featuredProduct = products[0];
  const gridProducts = products.slice(1, 5);

  return (
    <section id="shop" className="py-24 lg:py-40 bg-background relative overflow-hidden">
      {/* Background number */}
      <div className="absolute top-0 right-0 font-serif text-[20rem] lg:text-[40rem] font-bold text-muted/30 leading-none pointer-events-none select-none -translate-y-1/4 translate-x-1/4">
        01
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header - Asymmetric */}
        <div className="mb-16 lg:mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-primary mb-4 block">
                ( Featured )
              </span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1]">
              Shop our <span className="italic text-primary">favorites</span>
            </h2>
            </div>
            <Button 
              variant="ghost" 
              className="font-sans text-sm font-semibold uppercase tracking-wider group self-start lg:self-auto border-2 border-transparent hover:border-foreground px-6 py-3"
            >
              View all
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </div>
        </div>

        {/* Editorial Layout - Featured Product */}
        <div className="mb-20 lg:mb-32">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Image - Takes 7 columns */}
            <div className="lg:col-span-7 relative group">
              <div className="aspect-[4/3] overflow-hidden border-2 border-foreground">
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Offset accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 lg:w-48 lg:h-48 bg-primary z-[-1]" />
            </div>

            {/* Content - Takes 5 columns */}
            <div className="lg:col-span-5 lg:pl-8">
              <span className="font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4 block">
                Bestseller
              </span>
              <h3 className="font-serif text-3xl lg:text-5xl font-bold mb-4">
                {featuredProduct.name}
              </h3>
              <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                {featuredProduct.description}
              </p>
              <div className="flex items-center gap-4 mb-8">
                <span className="font-sans text-2xl lg:text-3xl font-bold">
                  ${featuredProduct.price}
                </span>
                <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground border border-border px-3 py-1">
                  {featuredProduct.category}
                </span>
              </div>
              <Button 
                size="lg"
                className="font-sans text-sm font-semibold uppercase tracking-wider w-full lg:w-auto px-10 py-6 bg-foreground text-background hover:bg-foreground/90 hover-brutal"
              >
                Add to Cart
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Grid - Staggered */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {gridProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`${index % 2 === 1 ? 'lg:translate-y-12' : ''}`}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
