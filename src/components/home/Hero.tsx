import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import naBeer from "@/assets/na-beer.jpg";
import naWine from "@/assets/na-wine.jpg";
import naOldFashioned from "@/assets/na-old-fashioned.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Grain texture */}
      <div className="grain absolute inset-0 z-10 pointer-events-none" />
      
      {/* MOBILE LAYOUT - Full screen immersive */}
      <div className="lg:hidden relative flex-1 flex flex-col">
        {/* Full-screen image background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
            alt="San Diego beach at golden hour"
            className="w-full h-full object-cover"
          />
          {/* Forest green gradient overlay - brand color */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/70 to-forest-deep/20" />
        </div>

        {/* Content overlay - positioned at bottom */}
        <div className="relative z-20 mt-auto px-6 pb-8 pt-32 text-cream">
          {/* Animated badge */}
          <div className="mb-6 animate-fade-up">
            <span className="inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-cream/80">
              <span className="w-8 h-px bg-gold" />
              San Diego's First NA Bottle Shop
            </span>
          </div>

          {/* Large stacked headline - brand messaging */}
          <h1 className="mb-6 animate-fade-up">
            <span className="block font-serif text-[2.75rem] leading-[1] tracking-tight text-cream">
              The Party
            </span>
            <span className="block font-serif text-[2.75rem] leading-[1] tracking-tight text-cream">
              Without the <span className="italic text-gold">Proof</span>
            </span>
          </h1>

          {/* Subtext - the "why" */}
          <p className="font-sans text-sm text-cream/80 max-w-[300px] mb-8 animate-fade-up delay-200">
            We curate the best non-alcoholic wines, brews, and spirits—so you never have to sacrifice flavor or fun.
          </p>

          {/* Full-width stacked buttons */}
          <div className="space-y-3 animate-fade-up delay-400">
            <Button 
              size="lg" 
              className="w-full font-sans text-sm font-bold uppercase tracking-widest py-6 bg-gold text-forest-deep hover:bg-gold/90"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full font-sans text-sm font-bold uppercase tracking-widest py-6 border-2 border-cream/30 text-cream bg-transparent hover:bg-cream/10"
            >
              Visit the Shop
            </Button>
          </div>
        </div>

        {/* Floating polaroid cards - Mobile */}
        <div className="absolute top-20 right-2 z-30 animate-float">
          <div className="w-16 h-20 bg-cream p-1 pb-4 border-2 border-forest shadow-brutal rotate-6">
            <img src={naBeer} alt="NA Beer" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute top-32 right-20 z-30 animate-float" style={{ animationDelay: '0.3s' }}>
          <div className="w-14 h-18 bg-cream p-1 pb-3 border-2 border-forest shadow-brutal -rotate-3">
            <img src={naWine} alt="NA Wine" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute top-16 right-36 z-30 animate-float" style={{ animationDelay: '0.6s' }}>
          <div className="w-12 h-16 bg-cream p-1 pb-3 border-2 border-forest shadow-brutal rotate-12">
            <img src={naOldFashioned} alt="Old Fashioned" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Swipe indicator */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce-subtle">
          <div className="w-8 h-1 bg-cream/40 rounded-full" />
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-cream/50">Scroll</span>
        </div>
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:flex flex-1 relative">
        {/* Left side - Typography */}
        <div className="w-1/2 flex flex-col justify-center px-16 py-32 relative z-20">
          {/* Small badge */}
          <div className="mb-8 animate-fade-up">
            <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-forest border-2 border-forest px-4 py-2">
              San Diego's First NA Bottle Shop
            </span>
          </div>

          {/* Main headline */}
          <h1 className="mb-6">
            <span className="block font-serif text-6xl xl:text-7xl leading-[0.95] tracking-tight animate-fade-up">
              The Party Without
            </span>
            <span className="block font-serif text-6xl xl:text-7xl italic leading-[0.95] text-gold animate-fade-up delay-100">
              the Proof
            </span>
          </h1>

          {/* Subtext - the "why" */}
          <p className="font-sans text-lg text-muted-foreground max-w-md mb-10 animate-fade-up delay-200">
            We curate the best non-alcoholic wines, brews, and spirits from around the world—so you never have to sacrifice flavor or fun. Sample, sip, and discover your new favorites.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
            <Button 
              size="lg" 
              className="font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6 bg-forest text-cream hover:bg-forest-light hover-brutal"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6 border-2 border-forest hover:bg-forest hover:text-cream transition-all"
            >
              Visit the Shop
            </Button>
          </div>
        </div>

        {/* Right side - Image with overlays */}
        <div className="w-1/2 relative">
          {/* Main image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
              alt="San Diego beach at golden hour"
              className="w-full h-full object-cover"
            />
            {/* Color overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/30 to-background" />
          </div>

          {/* Floating polaroid cards - Desktop */}
          <div className="absolute top-1/4 -left-16 z-30 animate-float">
            <div className="w-40 h-52 bg-cream p-2 pb-8 border-2 border-forest shadow-brutal -rotate-6">
              <img src={naBeer} alt="NA Beer" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-0 right-0 text-center font-serif text-sm italic text-forest">NA Beer</span>
            </div>
          </div>
          <div className="absolute top-[45%] -left-8 z-40 animate-float" style={{ animationDelay: '0.3s' }}>
            <div className="w-44 h-56 bg-cream p-2 pb-8 border-2 border-forest shadow-brutal rotate-3">
              <img src={naWine} alt="NA Wine" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-0 right-0 text-center font-serif text-sm italic text-forest">NA Wine</span>
            </div>
          </div>
          <div className="absolute bottom-1/4 -left-12 z-30 animate-float" style={{ animationDelay: '0.6s' }}>
            <div className="w-36 h-48 bg-cream p-2 pb-8 border-2 border-forest shadow-brutal rotate-6">
              <img src={naOldFashioned} alt="Old Fashioned" className="w-full h-full object-cover" />
              <span className="absolute bottom-2 left-0 right-0 text-center font-serif text-sm italic text-forest">Old Fashioned</span>
            </div>
          </div>

          {/* Circular rotating text */}
          <div className="absolute top-16 right-16 z-20">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full rotate-text" viewBox="0 0 100 100">
                <defs>
                  <path id="circle" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                </defs>
                <text className="fill-forest font-sans text-[8px] uppercase tracking-[0.4em]">
                  <textPath href="#circle">
                    • SAN DIEGO • ZERO PROOF •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-2xl font-bold text-forest">MM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="bg-forest text-cream py-3 lg:py-4 overflow-hidden relative z-20">
        <div className="marquee whitespace-nowrap">
          <span className="inline-block font-sans text-xs lg:text-sm uppercase tracking-[0.2em] mx-6 lg:mx-8">
            Delicious AF ✦ Healthy AF ✦ Fun AF ✦ Flavorful AF ✦ Mindful AF ✦ Connected AF ✦ 
            Delicious AF ✦ Healthy AF ✦ Fun AF ✦ Flavorful AF ✦ Mindful AF ✦ Connected AF ✦
          </span>
        </div>
      </div>

      {/* Scroll indicator - Desktop only */}
      <div className="absolute bottom-24 left-16 z-30 hidden lg:flex flex-col items-center gap-2 animate-bounce-subtle">
        <span className="font-sans text-xs uppercase tracking-[0.2em] [writing-mode:vertical-lr]">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </div>
    </section>
  );
};

export default Hero;
