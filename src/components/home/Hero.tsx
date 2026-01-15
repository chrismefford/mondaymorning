import { Button } from "@/components/ui/button";
import { ArrowRight, Waves } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
          alt="San Diego beach at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-golden-hour/10 via-transparent to-ocean-light/20" />
      </div>

      {/* Wave texture decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[1]">
        <svg className="absolute bottom-0 w-full h-24 text-background" preserveAspectRatio="none" viewBox="0 0 1440 74">
          <path 
            fill="currentColor" 
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,42.7C960,43,1056,53,1152,53.3C1248,53,1344,43,1392,37.3L1440,32L1440,74L1392,74C1344,74,1248,74,1152,74C1056,74,960,74,864,74C768,74,672,74,576,74C480,74,384,74,288,74C192,74,96,74,48,74L0,74Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          {/* Location badge */}
          <div className="inline-flex items-center gap-2 bg-ocean-light/80 backdrop-blur-sm text-ocean-deep px-4 py-2 rounded-full mb-6 animate-fade-up">
            <Waves className="h-4 w-4" />
            <span className="font-sans text-xs font-semibold uppercase tracking-wider">
              Born in San Diego
            </span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Wake up to
            <br />
            <span className="text-primary">better mornings</span>
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Crafted on the coast for those who choose sunrise over hangover. 
            Premium non-alcoholic drinks with that laid-back SoCal spirit.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="font-sans text-sm font-medium px-8 group bg-primary hover:bg-coral-dark"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="font-sans text-sm font-medium border-ocean/30 hover:bg-ocean-light/50"
            >
              Our Story
            </Button>
          </div>

          {/* Beach vibes tagline */}
          <p className="font-serif text-sm italic text-muted-foreground mt-8 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            "Life's better with sand between your toes and clarity in your glass."
          </p>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-1/4 right-[15%] w-24 h-24 rounded-full bg-sunset/20 blur-3xl animate-float hidden lg:block" />
      <div className="absolute bottom-1/3 right-[25%] w-32 h-32 rounded-full bg-ocean/15 blur-3xl animate-float hidden lg:block" style={{ animationDelay: "2s" }} />
    </section>
  );
};

export default Hero;
