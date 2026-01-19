import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import naBeer from "@/assets/na-beer.jpg";
import naWine from "@/assets/na-wine.jpg";
import naOldFashioned from "@/assets/na-old-fashioned.jpg";
import stampGold from "@/assets/stamp-gold.svg";

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
              America's #1 NA Bottle Shop
            </span>
          </div>

          {/* Large stacked headline - brand messaging */}
          <h1 className="mb-4 animate-fade-up">
            <span className="block font-serif text-[2.5rem] leading-[1] tracking-tight text-cream">
              400+ Flavors.
            </span>
            <span className="block font-serif text-[2.5rem] leading-[1] tracking-tight text-cream">
              Zero <span className="italic text-gold">Proof.</span>
            </span>
          </h1>

          {/* Subtext - the challenge */}
          <p className="font-sans text-sm text-cream/80 max-w-[300px] mb-6 animate-fade-up delay-200">
            Think NA drinks can't taste good? Come in. We love proving skeptics wrong.
          </p>

          {/* Stats row */}
          <div className="flex gap-6 mb-6 animate-fade-up delay-300">
            <div className="text-center">
              <span className="block font-serif text-2xl font-bold text-gold">400+</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-cream/60">Flavors</span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-2xl font-bold text-gold">2</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-cream/60">Locations</span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-2xl font-bold text-gold">#1</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-cream/60">In America</span>
            </div>
          </div>

          {/* Full-width stacked buttons */}
          <div className="space-y-3 animate-fade-up delay-400">
            <Button 
              size="lg" 
              className="w-full font-sans text-sm font-bold uppercase tracking-widest py-6 bg-gold text-forest-deep hover:bg-gold/90"
            >
              Come Try Something
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/locations">
              <Button 
                variant="outline" 
                size="lg"
                className="w-full font-sans text-sm font-bold uppercase tracking-widest py-6 border-2 border-cream/30 text-cream bg-transparent hover:bg-cream/10"
              >
                Find a Store
              </Button>
            </Link>
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
              America's #1 NA Bottle Shop
            </span>
          </div>

          {/* Main headline */}
          <h1 className="mb-6">
            <span className="block font-serif text-5xl xl:text-6xl leading-[0.95] tracking-tight animate-fade-up">
              400+ Flavors.
            </span>
            <span className="block font-serif text-5xl xl:text-6xl leading-[0.95] tracking-tight animate-fade-up delay-100">
              Zero <span className="italic text-gold">Proof.</span>
            </span>
          </h1>

          {/* Subtext - the challenge */}
          <p className="font-sans text-lg text-muted-foreground max-w-md mb-8 animate-fade-up delay-200">
            Think NA can't taste good? We love skeptics. Come in, try something, and we'll make you a believer. More flavors than any shop in America.
          </p>

          {/* Stats row */}
          <div className="flex gap-10 mb-10 py-6 border-y-2 border-forest/20 animate-fade-up delay-300">
            <div>
              <span className="block font-serif text-4xl font-bold text-gold">400+</span>
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">Flavors & Styles</span>
            </div>
            <div>
              <span className="block font-serif text-4xl font-bold text-gold">2</span>
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">SD Locations</span>
            </div>
            <div>
              <span className="block font-serif text-4xl font-bold text-gold">#1</span>
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">In America</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
            <Button 
              size="lg" 
              className="font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6 bg-forest text-cream hover:bg-forest-light hover-brutal"
            >
              Come Try Something
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Link to="/locations">
              <Button 
                variant="outline" 
                size="lg"
                className="font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6 border-2 border-forest hover:bg-forest hover:text-cream transition-all"
              >
                Find a Store
              </Button>
            </Link>
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

          {/* Brand stamp - rotating */}
          <div className="absolute top-24 right-12 z-20">
            <div className="w-48 h-48 xl:w-56 xl:h-56 rotate-text">
              <img 
                src={stampGold} 
                alt="Monday Morning stamp" 
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="bg-forest text-cream py-3 lg:py-4 overflow-hidden relative z-20">
        <div className="marquee whitespace-nowrap">
          <span className="inline-block font-sans text-xs lg:text-sm uppercase tracking-[0.2em]">
            <span className="mx-8 lg:mx-12">America's #1 NA Shop</span>
            <span className="text-gold">✦</span>
            <span className="mx-8 lg:mx-12">400+ Flavors</span>
            <span className="text-gold">✦</span>
            <span className="mx-8 lg:mx-12">Ocean Beach</span>
            <span className="text-gold">✦</span>
            <span className="mx-8 lg:mx-12">Pacific Beach</span>
            <span className="text-gold">✦</span>
            <span className="mx-8 lg:mx-12">Try Before You Buy</span>
            <span className="text-gold">✦</span>
            <span className="mx-8 lg:mx-12">America's #1 NA Shop</span>
            <span className="text-gold">✦</span>
            <span className="mx-8 lg:mx-12">400+ Flavors</span>
            <span className="text-gold">✦</span>
            <span className="mx-8 lg:mx-12">Ocean Beach</span>
            <span className="text-gold">✦</span>
            <span className="mx-8 lg:mx-12">Pacific Beach</span>
            <span className="text-gold">✦</span>
            <span className="mx-8 lg:mx-12">Try Before You Buy</span>
            <span className="text-gold">✦</span>
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
