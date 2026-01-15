import { collections } from "@/data/products";
import { ArrowRight } from "lucide-react";

const Collections = () => {
  return (
    <section id="collections" className="py-20 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 block">
            Curated
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium">
            Shop by collection
          </h2>
          <p className="font-sans text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Thoughtfully grouped for every moment and mood
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {collections.map((collection) => (
            <a
              key={collection.id}
              href={`#${collection.id}`}
              className="group relative aspect-[4/5] rounded-lg overflow-hidden"
            >
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-2xl font-medium text-background mb-1">
                  {collection.name}
                </h3>
                <p className="font-sans text-sm text-background/80">
                  {collection.description}
                </p>
                <div className="flex items-center gap-2 mt-3 text-background font-sans text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Shop now
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
