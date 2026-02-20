import { Link } from "react-router-dom";
import { collections } from "@/data/products";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import stampGold from "@/assets/stamp-gold.svg";
import stampBlue from "@/assets/stamp-blue.svg";
import textureGreen from "@/assets/texture-green.svg";

const Collections = () => {
  return (
    <section id="collections" className="py-16 lg:py-40 bg-gold text-forest relative overflow-hidden">
      {/* Organic texture background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url(${textureGreen})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none" />
      
      {/* Decorative stamps - multiple for visual interest */}
      <div className="absolute -top-20 -right-20 w-64 lg:w-96 opacity-10 pointer-events-none">
        <img src={stampGold} alt="" className="w-full h-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-[20rem] lg:w-[35rem] opacity-[0.05] pointer-events-none select-none -translate-x-1/4 translate-y-1/4">
        <img src={stampBlue} alt="" className="w-full h-full" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-8 mb-8 lg:mb-24">
            <div>
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.2em] text-gold mb-2 lg:mb-4 block">
                500+ Options
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl xl:text-6xl leading-[1] text-cream">
                Find your <span className="italic text-gold">vibe</span>
              </h2>
            </div>
            <p className="font-sans text-sm lg:text-lg text-cream/70 max-w-md">
              Wines, beers, spirits, aperitifs—we've got it all. No guessing, just tasting.
            </p>
          </div>
        </div>

        {/* MOBILE: Stacked cards with overlap effect */}
        <div className="lg:hidden px-4 space-y-4">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.id}`}
              className="group block relative overflow-hidden border-2 border-cream/20 aspect-[16/10]"
            >
              <img
                src={collection.image}
                alt={collection.name}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-transparent" />
              
              {/* Large number watermark */}
              <div className="absolute top-2 right-4">
                <span className="font-serif text-6xl font-bold text-cream/10">
                  0{index + 1}
                </span>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-1 block">
                      {collection.description}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-cream">
                      {collection.name}
                    </h3>
                  </div>
                  <div className="w-10 h-10 border-2 border-cream/30 flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <ArrowUpRight className="h-4 w-4 text-cream group-hover:text-forest" />
                  </div>
                </div>
              </div>
            </Link>
          ))}

          {/* View all button */}
          <Link to="/shop">
            <Button 
              variant="outline"
              className="w-full font-sans text-sm font-bold uppercase tracking-widest py-5 border-2 border-cream/30 text-cream bg-transparent hover:bg-gold hover:border-gold hover:text-forest mt-6"
            >
              Browse All Collections
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* DESKTOP: Grid layout */}
        <div className="hidden lg:block container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {collections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className={`group relative overflow-hidden border-2 border-cream/20 hover:border-gold transition-colors duration-300 ${
                  index === 0 || collection.id === 'na-beer' ? 'md:row-span-2 aspect-square md:aspect-auto' : 'aspect-[16/9]'
                }`}
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-transparent" />
                
                {/* Index number - Large */}
                <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                  <span className="font-serif text-4xl lg:text-6xl font-bold text-cream/20 group-hover:text-gold/50 transition-colors">
                    0{index + 1}
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-serif text-2xl lg:text-4xl font-bold text-cream mb-2">
                        {collection.name}
                      </h3>
                      <p className="font-sans text-sm text-cream/70">
                        {collection.description}
                      </p>
                    </div>
                    <div className="w-12 h-12 border-2 border-cream flex items-center justify-center shrink-0 group-hover:bg-gold group-hover:border-gold group-hover:text-forest transition-all duration-300">
                      <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-terracotta/10 blur-3xl pointer-events-none" />
    </section>
  );
};

export default Collections;
