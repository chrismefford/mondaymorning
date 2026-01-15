import { collections } from "@/data/products";
import { ArrowRight } from "lucide-react";

const Collections = () => {
  return (
    <section id="collections" className="py-20 lg:py-32 bg-ocean-light/30 relative overflow-hidden">
      {/* Wave decoration at top */}
      <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
        <svg className="absolute -top-1 w-full h-20 text-background" preserveAspectRatio="none" viewBox="0 0 1440 74">
          <path 
            fill="currentColor" 
            d="M0,42L48,37.3C96,32,192,21,288,16C384,11,480,11,576,16C672,21,768,32,864,32C960,32,1056,21,1152,21.3C1248,21,1344,32,1392,37.3L1440,42L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ocean mb-4 block">
            Curated
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium">
            Shop by vibe
          </h2>
          <p className="font-sans text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Drinks for every moment—from sunrise sessions to sunset socials
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {collections.map((collection, index) => (
            <a
              key={collection.id}
              href={`#${collection.id}`}
              className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient with coastal warmth */}
              <div className="absolute inset-0 bg-gradient-to-t from-driftwood/90 via-driftwood/30 to-transparent" />
              
              {/* Index number */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center">
                <span className="font-serif text-sm font-medium text-foreground">
                  0{index + 1}
                </span>
              </div>
              
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-2xl font-medium text-background mb-1">
                  {collection.name}
                </h3>
                <p className="font-sans text-sm text-background/80">
                  {collection.description}
                </p>
                <div className="flex items-center gap-2 mt-3 text-background font-sans text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Wave decoration at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
        <svg className="absolute -bottom-1 w-full h-20 text-background" preserveAspectRatio="none" viewBox="0 0 1440 74">
          <path 
            fill="currentColor" 
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default Collections;
