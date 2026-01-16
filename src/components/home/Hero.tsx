import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

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
          {/* Dramatic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />
        </div>

        {/* Content overlay - positioned at bottom */}
        <div className="relative z-20 mt-auto px-6 pb-8 pt-32 text-background">
          {/* Animated badge */}
          <div className="mb-6 animate-fade-up">
            <span className="inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-background/80">
              <span className="w-8 h-px bg-primary" />
              Born in San Diego
            </span>
          </div>

          {/* Large stacked headline */}
          <h1 className="mb-6 animate-fade-up">
            <span className="block font-serif text-[3.5rem] leading-[0.9] tracking-tight text-background">
              Wake up
            </span>
            <span className="block font-serif text-[3.5rem] leading-[0.9] tracking-tight text-background">
              to <span className="italic text-primary">better</span>
            </span>
            <span className="block font-serif text-[3.5rem] italic leading-[0.9] text-primary">
              mornings
            </span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-sm text-background/70 max-w-[280px] mb-8 animate-fade-up delay-200">
            Premium non-alcoholic drinks. Crafted on the coast for those who choose sunrise over hangover.
          </p>

          {/* Full-width stacked buttons */}
          <div className="space-y-3 animate-fade-up delay-400">
            <Button 
              size="lg" 
              className="w-full font-sans text-sm font-bold uppercase tracking-widest py-6 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="w-full font-sans text-sm font-bold uppercase tracking-widest py-6 border-2 border-background/30 text-background bg-transparent hover:bg-background/10"
            >
              Our Story
            </Button>
          </div>
        </div>

        {/* Floating product card - positioned uniquely */}
        <div className="absolute top-24 right-4 z-30 animate-float">
          <div className="w-20 h-28 bg-background border-2 border-foreground shadow-brutal overflow-hidden rotate-6">
            <img
              src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80"
              alt="Featured drink"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Swipe indicator */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce-subtle">
          <div className="w-8 h-1 bg-background/40 rounded-full" />
          <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-background/50">Scroll</span>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Keep existing */}
      <div className="hidden lg:flex flex-1 relative">
        {/* Left side - Typography */}
        <div className="w-1/2 flex flex-col justify-center px-16 py-32 relative z-20">
          {/* Small badge */}
          <div className="mb-8 animate-fade-up">
            <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-secondary border-2 border-secondary px-4 py-2">
              Born in San Diego
            </span>
          </div>

          {/* Main headline */}
          <h1 className="mb-6">
            <span className="block font-serif text-7xl xl:text-8xl leading-[0.95] tracking-tight animate-fade-up">
              Wake up to
            </span>
            <span className="block font-serif text-7xl xl:text-8xl italic leading-[0.95] text-primary animate-fade-up delay-100">
              better mornings
            </span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg text-muted-foreground max-w-md mb-10 animate-fade-up delay-200">
            Premium non-alcoholic drinks for those who choose sunrise over hangover. 
            Crafted on the coast.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
            <Button 
              size="lg" 
              className="font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6 bg-foreground text-background hover:bg-foreground/90 hover-brutal"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6 border-2 border-foreground hover:bg-foreground hover:text-background transition-all"
            >
              Our Story
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

          {/* Floating product image */}
          <div className="absolute top-1/2 -left-20 -translate-y-1/2 z-30 animate-float">
            <div className="w-48 h-72 bg-card border-2 border-foreground shadow-brutal overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80"
                alt="Featured drink"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Circular rotating text */}
          <div className="absolute top-16 right-16 z-20">
            <div className="relative w-36 h-36">
              <svg className="w-full h-full rotate-text" viewBox="0 0 100 100">
                <defs>
                  <path id="circle" d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                </defs>
                <text className="fill-foreground font-sans text-[8px] uppercase tracking-[0.4em]">
                  <textPath href="#circle">
                    • CALIFORNIA MADE • ZERO PROOF •
                  </textPath>
                </text>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-2xl font-bold">SD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="bg-foreground text-background py-3 lg:py-4 overflow-hidden relative z-20">
        <div className="marquee whitespace-nowrap">
          <span className="inline-block font-sans text-xs lg:text-sm uppercase tracking-[0.2em] mx-6 lg:mx-8">
            Free Shipping Over $50 ✦ San Diego Born ✦ 0% Alcohol ✦ 100% Flavor ✦ Craft Beverages ✦ 
            Free Shipping Over $50 ✦ San Diego Born ✦ 0% Alcohol ✦ 100% Flavor ✦ Craft Beverages ✦
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
