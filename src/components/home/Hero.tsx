import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-0 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&q=80"
          alt="Elegant cocktail setting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6 animate-fade-up">
            Premium Non-Alcoholic
          </span>
          
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Every morning
            <br />
            <span className="text-primary">deserves clarity</span>
          </h1>
          
          <p className="font-sans text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-lg animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Sophisticated beverages crafted for those who choose presence over proof. 
            All the ritual, none of the regret.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="font-sans text-sm font-medium px-8 group"
            >
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="font-sans text-sm font-medium"
            >
              Our Story
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-foreground/50 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
