import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import stampGold from "@/assets/stamp-gold.svg";
const heroBeach = "/hero/beach.webp";
const heroBeachMobile = "/hero/beach-mobile.webp";


const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      {/* Grain texture */}
      <div className="grain absolute inset-0 z-10 pointer-events-none" />
      
      {/* MOBILE LAYOUT - Full screen immersive */}
      <div className="md:hidden relative flex-1 flex flex-col">
        {/* Full-screen image background */}
        <div className="absolute inset-0">
          <img
            src={heroBeachMobile}
            srcSet={`${heroBeachMobile} 800w, ${heroBeach} 1400w`}
            sizes="100vw"
            alt="San Diego beach at golden hour"
            className="w-full h-full object-cover"
            width="900"
            height="1200"
            fetchPriority="high"
            decoding="async"
          />

          {/* Forest green gradient overlay - brand color */}
          <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/70 to-forest-deep/20" />
        </div>

        {/* Content overlay - positioned at bottom */}
        <div className="relative z-20 mt-auto px-6 pb-8 pt-32 text-cream">
          {/* Brand tagline kicker */}
          <p className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.3em] text-gold animate-fade-up">Drink Differently · Live Free AF</p>

          {/* H1 - SEO primary heading */}
          {/* Visual heading - mirrors the single H1 in desktop for mobile styling */}
          <p className="mb-2 font-serif uppercase text-[2.2rem] leading-[1.05] tracking-tight text-cream animate-fade-up" aria-hidden="true">
            America's #1<br />Non-Alcoholic<br /><span className="font-script text-gold text-[2.9rem] leading-none inline-block">Bottle Shop</span>
          </p>

          {/* H2 - SEO secondary heading */}
          <p className="mb-2 font-serif uppercase text-xl leading-tight tracking-tight text-cream/90 animate-fade-up delay-100" aria-hidden="true">
            500+ Zero-Proof Wines, Beers & Spirits
          </p>
          <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-cream/70 animate-fade-up delay-100">
            Bottle Shops <span className="text-gold">·</span> Hospitality <span className="text-gold">·</span> Brewing
          </p>

          {/* Supporting paragraph */}
          <p className="font-sans text-sm text-cream/80 max-w-[300px] mb-6 animate-fade-up delay-200">
            People go alcohol-free because they want better, not less. 500+ NA wines, beers, and zero-proof spirits, hand-picked in San Diego. You're welcome here.
          </p>

          {/* Stats row */}
          <div className="flex gap-6 mb-6 animate-fade-up delay-300">
            <div className="text-center">
              <span className="block font-serif text-2xl font-bold text-gold">500+</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-cream/60">Flavors</span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-2xl font-bold text-gold">3</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-cream/60">Locations</span>
            </div>
            <div className="text-center">
              <span className="block font-serif text-2xl font-bold text-gold">#1</span>
              <span className="font-sans text-[9px] uppercase tracking-wider text-cream/60">In America</span>
            </div>
          </div>

          {/* Centered buttons */}
          <div className="flex flex-col items-center gap-3 animate-fade-up delay-400">
            <Link to="/locations">
              <Button 
                size="lg" 
                className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 bg-gold text-forest-deep hover:bg-gold/90"
              >
                Come Try Something
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/collections/all">
              <Button 
                variant="outline" 
                size="lg"
                className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 border-2 border-cream/30 text-cream bg-transparent hover:bg-cream/10"
              >
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>

      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex flex-1 relative">
        {/* Left side - Typography */}
        <div className="w-1/2 flex flex-col justify-center px-16 py-32 relative z-20">
          {/* Brand tagline kicker */}
          <p className="mb-3 font-sans text-sm font-bold uppercase tracking-[0.35em] text-gold animate-fade-up">Drink Differently · Live Free AF</p>

          {/* H1 - SEO primary heading (hidden on mobile where mobile H1 is shown) */}
          <h1 className="mb-4 -ml-1 font-serif text-6xl xl:text-7xl 2xl:text-8xl leading-[0.92] tracking-tight animate-fade-up">
            America's #1<br />Non-Alcoholic<br /><span className="font-script text-gold text-7xl xl:text-8xl 2xl:text-9xl leading-none inline-block mt-2">Bottle Shop</span>
          </h1>

          {/* H2 - SEO secondary heading */}
          <h2 className="mb-3 font-serif text-3xl xl:text-4xl leading-tight tracking-tight text-muted-foreground animate-fade-up delay-100">
            500+ Zero-Proof Wines, Beers & Spirits
          </h2>
          <p className="mb-6 font-sans text-xs xl:text-sm font-bold uppercase tracking-[0.25em] text-forest/70 animate-fade-up delay-100">
            Bottle Shops <span className="text-gold">·</span> Hospitality <span className="text-gold">·</span> Brewing
          </p>

          {/* Supporting paragraph */}
          <p className="font-sans text-lg xl:text-xl text-muted-foreground max-w-xl mb-8 animate-fade-up delay-200">
            People aren't going alcohol-free because they want less. They want better. That's what we pour: 500+ non-alcoholic wines, craft NA beers, and zero-proof spirits, hand-picked at our San Diego bottle shops to turn skeptics into regulars. Curious, committed, or just sober-curious, you're welcome here.
          </p>

          {/* Stats row */}
          <div className="flex justify-between gap-6 mb-10 py-6 border-y-2 border-forest/20 max-w-lg animate-fade-up delay-300">
            <div>
              <span className="block font-serif text-4xl font-bold text-gold">500+</span>
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">Flavors & Styles</span>
            </div>
            <div>
              <span className="block font-serif text-4xl font-bold text-gold">3</span>
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">SD Locations</span>
            </div>
            <div>
              <span className="block font-serif text-4xl font-bold text-gold">#1</span>
              <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">In America</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 animate-fade-up delay-400">
            <Link to="/locations">
              <Button 
                size="lg" 
                className="font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6 bg-forest text-cream hover:bg-forest-light hover-brutal"
              >
                Come Try Something
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/collections/all">
              <Button 
                variant="outline" 
                size="lg"
                className="font-sans text-sm font-semibold uppercase tracking-wider px-8 py-6 border-2 border-forest hover:bg-forest hover:text-cream transition-all"
              >
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>

        {/* Right side - Image with overlays */}
        <div className="w-1/2 relative">
          {/* Main image */}
          <div className="absolute inset-0">
            <img
              src={heroBeach}
              srcSet={`${heroBeachMobile} 800w, ${heroBeach} 1400w`}
              sizes="50vw"
              alt="San Diego beach at golden hour"
              className="w-full h-full object-cover"
              width="1200"
              height="1400"
              fetchPriority="high"
              decoding="async"
            />

            {/* Color overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/30 to-background" />
          </div>

          {/* Brand stamp - static */}
          <div className="absolute top-24 right-12 z-20">
            <div className="w-48 h-48 xl:w-56 xl:h-56">
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
      <div className="bg-gold-warm text-teal-dark py-3 lg:py-4 overflow-hidden relative z-20">
        <div className="marquee whitespace-nowrap">
          <span className="inline-block font-sans text-xs lg:text-sm uppercase tracking-[0.2em]">
            <span className="mx-8 lg:mx-12">Drink Differently</span>
            <span className="text-teal-dark/40">✦</span>
            <span className="mx-8 lg:mx-12">500+ Flavors</span>
            <span className="text-teal-dark/40">✦</span>
            <span className="mx-8 lg:mx-12">Ocean Beach</span>
            <span className="text-teal-dark/40">✦</span>
            <span className="mx-8 lg:mx-12">Pacific Beach</span>
            <span className="text-teal-dark/40">✦</span>
            <span className="mx-8 lg:mx-12">Try Before You Buy</span>
            <span className="text-teal-dark/40">✦</span>
            <span className="mx-8 lg:mx-12">Drink Differently</span>
            <span className="text-teal-dark/40">✦</span>
            <span className="mx-8 lg:mx-12">500+ Flavors</span>
            <span className="text-teal-dark/40">✦</span>
            <span className="mx-8 lg:mx-12">Ocean Beach</span>
            <span className="text-teal-dark/40">✦</span>
            <span className="mx-8 lg:mx-12">Pacific Beach</span>
            <span className="text-teal-dark/40">✦</span>
            <span className="mx-8 lg:mx-12">Try Before You Buy</span>
            <span className="text-teal-dark/40">✦</span>
          </span>
        </div>
      </div>

    </section>
  );
};

export default Hero;
