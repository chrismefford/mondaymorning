import { recipes } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Clock, Users, ChefHat } from "lucide-react";
import { useRef } from "react";
import stampGold from "@/assets/stamp-gold.svg";
import textureBlue from "@/assets/texture-blue.svg";

const Recipes = () => {
  const featuredRecipe = recipes.find((r) => r.featured) || recipes[0];
  const carouselRecipes = recipes.filter((r) => r.id !== featuredRecipe.id);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section id="recipes" className="py-16 lg:py-40 bg-cream relative overflow-hidden">
      {/* Organic texture background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${textureBlue})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Decorative stamp */}
      <div className="absolute -bottom-20 -left-20 w-64 lg:w-80 opacity-[0.04] pointer-events-none rotate-12">
        <img src={stampGold} alt="" className="w-full h-full" />
      </div>

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 lg:gap-8 mb-8 lg:mb-16">
          <div>
            <span className="font-sans text-[10px] lg:text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-2 lg:mb-4 block">
              Drinks & Pairings
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl xl:text-6xl leading-[1]">
              Recipes to <span className="italic text-gold">inspire</span>
            </h2>
          </div>
          <p className="font-sans text-sm lg:text-base text-muted-foreground max-w-sm hidden lg:block">
            From NA cocktails to dishes cooked with our favorites—get creative with what's in your cart.
          </p>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="lg:hidden">
          {/* Featured Recipe Card */}
          <div className="relative mb-8">
            <div className="aspect-[4/5] overflow-hidden border-2 border-forest">
              <img
                src={featuredRecipe.image}
                alt={featuredRecipe.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay content */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/40 to-transparent flex flex-col justify-end p-5">
              <span className="inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                <ChefHat className="h-3 w-3" />
                Featured Recipe
              </span>
              <h3 className="font-serif text-2xl font-bold text-cream mb-2">
                {featuredRecipe.title}
              </h3>
              <p className="font-sans text-sm text-cream/80 mb-4 line-clamp-2">
                {featuredRecipe.description}
              </p>
              <div className="flex items-center gap-4 text-cream/70 mb-4">
                <span className="flex items-center gap-1 font-sans text-xs">
                  <Clock className="h-3 w-3" />
                  {featuredRecipe.prepTime}
                </span>
                <span className="flex items-center gap-1 font-sans text-xs">
                  <Users className="h-3 w-3" />
                  Serves {featuredRecipe.servings}
                </span>
                <span className="font-sans text-xs px-2 py-0.5 bg-cream/20 rounded">
                  {featuredRecipe.difficulty}
                </span>
              </div>
              <Button
                size="sm"
                className="w-full bg-gold text-forest-deep font-sans text-xs uppercase tracking-wider hover:bg-gold/90"
              >
                View Recipe
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {carouselRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex-shrink-0 w-[70vw] snap-center"
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>

          {/* View all button - mobile */}
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full font-sans text-sm font-bold uppercase tracking-widest py-5 border-2 border-forest text-forest hover:bg-forest hover:text-cream"
            >
              Browse All Recipes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:block">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Featured Recipe - Takes 7 columns */}
            <div className="lg:col-span-7 relative group">
              <div className="aspect-[4/3] overflow-hidden border-2 border-forest">
                <img
                  src={featuredRecipe.image}
                  alt={featuredRecipe.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/90 via-forest-deep/30 to-transparent flex flex-col justify-end p-8">
                <span className="inline-flex items-center gap-2 font-sans text-xs uppercase tracking-[0.3em] text-gold mb-3">
                  <ChefHat className="h-4 w-4" />
                  Featured Recipe
                </span>
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-cream mb-3">
                  {featuredRecipe.title}
                </h3>
                <p className="font-serif text-lg italic text-cream/80 mb-4">
                  "{featuredRecipe.tagline}"
                </p>
                <div className="flex items-center gap-6 text-cream/70 mb-6">
                  <span className="flex items-center gap-2 font-sans text-sm">
                    <Clock className="h-4 w-4" />
                    {featuredRecipe.prepTime}
                  </span>
                  <span className="flex items-center gap-2 font-sans text-sm">
                    <Users className="h-4 w-4" />
                    Serves {featuredRecipe.servings}
                  </span>
                  <span className="font-sans text-sm px-3 py-1 bg-cream/20 rounded">
                    {featuredRecipe.difficulty}
                  </span>
                </div>
                <Button
                  size="lg"
                  className="w-fit bg-gold text-forest-deep font-sans text-sm uppercase tracking-wider hover:bg-gold/90 px-8"
                >
                  View Full Recipe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              {/* Offset accent box */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold z-[-1]" />
            </div>

            {/* Recipe Info + Ingredients - Takes 5 columns */}
            <div className="lg:col-span-5 lg:pl-4">
              <div className="mb-8">
                <h4 className="font-serif text-2xl font-bold text-forest mb-4">
                  {featuredRecipe.title}
                </h4>
                <p className="font-sans text-muted-foreground leading-relaxed mb-6">
                  {featuredRecipe.description}
                </p>

                <div className="border-t-2 border-forest/20 pt-6">
                  <h5 className="font-sans text-xs uppercase tracking-[0.2em] text-gold mb-4">
                    Ingredients
                  </h5>
                  <ul className="space-y-2">
                    {featuredRecipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="font-sans text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Type indicator */}
              <div className="flex items-center gap-3 p-4 bg-forest/5 border-2 border-forest/10">
                <span className="text-2xl">
                  {featuredRecipe.type === "drink" ? "🍹" : "🍽️"}
                </span>
                <div>
                  <span className="font-sans text-xs uppercase tracking-wider text-gold">
                    {featuredRecipe.type === "drink"
                      ? "NA Cocktail"
                      : "Food Pairing"}
                  </span>
                  <p className="font-sans text-sm text-muted-foreground">
                    {featuredRecipe.type === "drink"
                      ? "Mix it up at home"
                      : "Pairs perfectly with our collection"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Section */}
          <div className="mt-16 lg:mt-24">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-serif text-2xl lg:text-3xl text-forest">
                More to explore
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={scrollLeft}
                  className="w-10 h-10 border-2 border-forest/30 flex items-center justify-center hover:bg-forest hover:text-cream hover:border-forest transition-all"
                  aria-label="Scroll left"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>
                <button
                  onClick={scrollRight}
                  className="w-10 h-10 border-2 border-forest/30 flex items-center justify-center hover:bg-forest hover:text-cream hover:border-forest transition-all"
                  aria-label="Scroll right"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {carouselRecipes.map((recipe) => (
                <div key={recipe.id} className="flex-shrink-0 w-80">
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>

            {/* View all link */}
            <div className="mt-8 text-center">
              <Button
                variant="ghost"
                className="font-sans text-sm font-semibold uppercase tracking-wider group border-2 border-transparent hover:border-forest text-forest px-6 py-3"
              >
                View All Recipes
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface RecipeCardProps {
  recipe: (typeof recipes)[0];
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden border-2 border-forest mb-4">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Type badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 font-sans text-[10px] uppercase tracking-wider bg-cream/90 text-forest px-2 py-1 border border-forest/20">
            {recipe.type === "drink" ? "🍹 Drink" : "🍽️ Food"}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-forest-deep/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            size="sm"
            className="bg-gold text-forest-deep font-sans text-xs uppercase tracking-wider"
          >
            View Recipe
          </Button>
        </div>
      </div>
      <div>
        <h4 className="font-serif text-lg font-bold text-forest group-hover:text-gold transition-colors">
          {recipe.title}
        </h4>
        <p className="font-serif text-sm italic text-muted-foreground mt-1">
          {recipe.tagline}
        </p>
        <div className="flex items-center gap-3 mt-2 text-muted-foreground">
          <span className="flex items-center gap-1 font-sans text-xs">
            <Clock className="h-3 w-3" />
            {recipe.prepTime}
          </span>
          <span className="font-sans text-xs px-2 py-0.5 bg-forest/10 rounded">
            {recipe.difficulty}
          </span>
        </div>
      </div>
    </article>
  );
};

export default Recipes;
