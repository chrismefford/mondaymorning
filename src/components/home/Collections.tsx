import { collections } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

const Collections = () => {
  return (
    <section id="collections" className="py-24 lg:py-40 bg-ocean-deep text-background relative overflow-hidden">
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-seafoam mb-4 block">
              Collections
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1] text-background">
              Shop by <span className="italic text-primary">vibe</span>
            </h2>
          </div>
          <p className="font-sans text-lg text-background/70 max-w-md">
            From sunrise sessions to sunset socials—find your moment
          </p>
        </div>

        {/* Horizontal scroll collections on mobile, grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {collections.map((collection, index) => (
            <a
              key={collection.id}
              href={`#${collection.id}`}
              className={`group relative overflow-hidden border-2 border-background/20 hover:border-background transition-colors duration-300 ${
                index === 0 ? 'md:row-span-2 aspect-square md:aspect-auto' : 'aspect-[16/9]'
              }`}
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/40 to-transparent" />
              
              {/* Index number - Large */}
              <div className="absolute top-4 left-4 lg:top-6 lg:left-6">
                <span className="font-serif text-4xl lg:text-6xl font-bold text-background/30 group-hover:text-background/50 transition-colors">
                  0{index + 1}
                </span>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-2xl lg:text-4xl font-bold text-background mb-2">
                      {collection.name}
                    </h3>
                    <p className="font-sans text-sm text-background/70">
                      {collection.description}
                    </p>
                  </div>
                  <div className="w-12 h-12 border-2 border-background flex items-center justify-center shrink-0 group-hover:bg-background group-hover:text-foreground transition-all duration-300">
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-seafoam/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 blur-3xl pointer-events-none" />
    </section>
  );
};

export default Collections;
