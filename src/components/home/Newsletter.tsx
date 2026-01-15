import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sun, Waves } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Sunset gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-golden-hour via-primary to-coral-dark" />
      
      {/* Wave overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            fill="currentColor" 
            className="text-background"
            d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background/20 backdrop-blur-sm mb-6">
            <Sun className="w-8 h-8 animate-pulse" />
          </div>

          <h2 className="font-serif text-4xl lg:text-5xl font-medium mb-4">
            Join the sunrise crew
          </h2>
          <p className="font-sans text-lg opacity-90 mb-8">
            Be the first to know about new flavors, local events, 
            and get 10% off your first order.
          </p>

          <form 
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="your@email.com"
              className="bg-background/20 backdrop-blur-sm border-background/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-background/50 focus:ring-background/30"
            />
            <Button 
              type="submit"
              size="lg"
              className="font-sans text-sm font-medium shrink-0 bg-background text-foreground hover:bg-background/90"
            >
              Join the Crew
            </Button>
          </form>

          <p className="font-sans text-xs opacity-60 mt-4 flex items-center justify-center gap-2">
            <Waves className="h-3 w-3" />
            No spam, just good vibes. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
