import { Link } from "react-router-dom";
import { recipes, RECIPE_BOTTLE } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import stampGold from "@/assets/stamp-gold.svg";

// A teaser of our staff-pick recipes, each shown as the single bottle it's built on
// (matches the Behind the Bar page).
const featured = recipes.filter((r) => r.featured).slice(0, 5);

const Recipes = () => {
  return (
    <section id="recipes" className="py-12 lg:py-16 bg-cream relative overflow-hidden">
      {/* Decorative stamp */}
      <div className="absolute -bottom-20 -left-20 w-64 lg:w-80 opacity-[0.04] pointer-events-none rotate-12">
        <img src={stampGold} alt="" className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
          <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
            Behind the Bar
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl xl:text-6xl leading-[1] text-forest">
            Drinks for every <span className="font-script text-gold text-[1.2em] leading-none">moment</span>
          </h2>
          <p className="font-sans text-sm lg:text-lg text-forest/60 mt-4">
            Real recipes, each built on a zero-proof bottle you can buy right here.
          </p>
        </div>

        {/* Recipe grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {featured.map((r) => (
            <Link
              key={r.id}
              to="/recipes"
              className="group block"
            >
              <div className="aspect-[4/5] overflow-hidden border-2 border-forest/20 mb-3 relative bg-cream shadow-card hover:shadow-brutal transition-all duration-300">
                <img
                  src={RECIPE_BOTTLE[r.id] || r.image}
                  alt={r.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-forest-deep/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="font-sans text-xs uppercase tracking-wider text-cream bg-gold/90 px-4 py-2">
                    View Recipe
                  </span>
                </div>
              </div>
              <h3 className="font-serif text-base lg:text-lg text-forest group-hover:text-forest-deep transition-colors text-center leading-tight">
                {r.title}
              </h3>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 lg:mt-14">
          <Link to="/recipes">
            <Button
              size="lg"
              className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6 group"
            >
              Browse all recipes
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Recipes;
