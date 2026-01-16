import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const FeaturedProducts = () => {
  const featuredProduct = products[0];
  const gridProducts = products.slice(1, 5);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="shop" className="py-16 lg:py-40 bg-cream relative overflow-hidden">
      {/* Background number */}
      <div className="absolute top-0 right-0 font-serif text-[12rem] lg:text-[40rem] font-bold text-forest/5 leading-none pointer-events-none select-none -translate-y-1/4 translate-x-1/4">
        01
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="container mx-auto px-4 lg:px-8 mb-8 lg:mb-24">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-6">
            <div>
              <span className="font-sans text-[10px] lg:text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-2 lg:mb-4 block">
                ( Featured )
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl xl:text-6xl leading-[1]">
                Shop our <span className="italic text-gold">favorites</span>
              </h2>
            </div>
            <Button 
              variant="ghost" 
              className="hidden lg:flex font-sans text-sm font-semibold uppercase tracking-wider group self-start lg:self-auto border-2 border-transparent hover:border-forest text-forest px-6 py-3"
            >
              View all
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Button>
          </div>
        </div>

        {/* MOBILE: Horizontal scroll cards with peek */}
        <div className="lg:hidden mb-12">
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-4 pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Featured product as first card */}
            <div className="flex-shrink-0 w-[85vw] snap-center">
              <div className="relative bg-cream border-2 border-forest overflow-hidden">
                <div className="aspect-[3/4]">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-cream">
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold">Bestseller</span>
                  <h3 className="font-serif text-2xl font-bold mt-1">{featuredProduct.name}</h3>
                  <p className="font-sans text-sm text-cream/70 mt-2 line-clamp-2">{featuredProduct.description}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-sans text-xl font-bold">${featuredProduct.price}</span>
                    <Button size="sm" className="bg-gold text-forest font-sans text-xs uppercase tracking-wider">
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Other products */}
            {gridProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[70vw] snap-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Scroll indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {[featuredProduct, ...gridProducts].map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all ${i === 0 ? 'w-6 bg-gold' : 'w-1.5 bg-forest/20'}`} 
              />
            ))}
          </div>

          {/* View all button - mobile */}
          <div className="px-4 mt-8">
            <Button 
              variant="outline"
              className="w-full font-sans text-sm font-bold uppercase tracking-widest py-5 border-2 border-forest text-forest hover:bg-forest hover:text-cream"
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* DESKTOP: Editorial Layout */}
        <div className="hidden lg:block container mx-auto px-4 lg:px-8">
          {/* Featured Product */}
          <div className="mb-20 lg:mb-32">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Image - Takes 7 columns */}
              <div className="lg:col-span-7 relative group">
                <div className="aspect-[4/3] overflow-hidden border-2 border-forest">
                  <img
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                {/* Offset accent - Gold */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 lg:w-48 lg:h-48 bg-gold z-[-1]" />
              </div>

              {/* Content - Takes 5 columns */}
              <div className="lg:col-span-5 lg:pl-8">
                <span className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4 block">
                  Bestseller
                </span>
                <h3 className="font-serif text-3xl lg:text-5xl font-bold mb-4 text-forest">
                  {featuredProduct.name}
                </h3>
                <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                  {featuredProduct.description}
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-sans text-2xl lg:text-3xl font-bold text-forest">
                    ${featuredProduct.price}
                  </span>
                  <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground border border-forest/30 px-3 py-1">
                    {featuredProduct.category}
                  </span>
                </div>
                <Button 
                  size="lg"
                  className="font-sans text-sm font-semibold uppercase tracking-wider w-full lg:w-auto px-10 py-6 bg-forest text-cream hover:bg-forest-light hover-brutal"
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
