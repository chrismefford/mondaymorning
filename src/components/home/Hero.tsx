import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Grain texture */}
      <div className="grain absolute inset-0 z-10 pointer-events-none" />
      
      {/* Main content area */}
      <div className="flex-1 grid lg:grid-cols-2 relative">
        {/* Left side - Typography */}
        <div className="flex flex-col justify-center px-6 lg:px-16 py-32 lg:py-0 relative z-20">
          {/* Small badge */}
          <div className="mb-8 animate-fade-up">
            <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-secondary border-2 border-secondary px-4 py-2">
              Born in San Diego
            </span>
          </div>

          {/* Main headline - Kinetic typography */}
          <h1 className="mb-6">
            <span className="block font-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] tracking-tight animate-fade-up">
              WAKE
            </span>
            <span className="block font-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] text-outline animate-fade-up delay-100">
              UP TO
            </span>
            <span className="block font-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold italic leading-[0.85] text-primary animate-fade-up delay-200">
              BETTER
            </span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-md mb-10 animate-fade-up delay-300">
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
        <div className="relative h-[60vh] lg:h-auto">
          {/* Main image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80"
              alt="San Diego beach at golden hour"
              className="w-full h-full object-cover"
            />
            {/* Color overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-l lg:from-background lg:via-background/30 lg:to-transparent" />
          </div>

          {/* Floating product image */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:bottom-auto lg:top-1/2 lg:-left-20 lg:-translate-y-1/2 lg:translate-x-0 z-30 animate-float">
            <div className="w-32 h-48 lg:w-48 lg:h-72 bg-card border-2 border-foreground shadow-brutal overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&q=80"
                alt="Featured drink"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Circular rotating text */}
          <div className="absolute top-8 right-8 lg:top-16 lg:right-16 z-20 hidden md:block">
            <div className="relative w-28 h-28 lg:w-36 lg:h-36">
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
                <span className="font-serif text-xl lg:text-2xl font-bold">SD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="bg-foreground text-background py-4 overflow-hidden relative z-20">
        <div className="marquee whitespace-nowrap">
          <span className="inline-block font-sans text-sm uppercase tracking-[0.2em] mx-8">
            Free Shipping Over $50 ✦ San Diego Born ✦ 0% Alcohol ✦ 100% Flavor ✦ Craft Beverages ✦ 
            Free Shipping Over $50 ✦ San Diego Born ✦ 0% Alcohol ✦ 100% Flavor ✦ Craft Beverages ✦
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-6 lg:left-16 z-30 hidden lg:flex flex-col items-center gap-2 animate-bounce-subtle">
        <span className="font-sans text-xs uppercase tracking-[0.2em] [writing-mode:vertical-lr]">Scroll</span>
        <ArrowDown className="h-4 w-4" />
      </div>
    </section>
  );
};

export default Hero;
