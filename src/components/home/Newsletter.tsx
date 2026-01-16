import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="relative overflow-hidden">
      {/* MOBILE LAYOUT - Stacked with image background */}
      <div className="lg:hidden relative">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=1000&q=80"
            alt="Sunrise over ocean"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/85" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-16 text-background">
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-seafoam mb-4 block">
            Newsletter
          </span>
          
          <h2 className="font-serif text-3xl leading-[1.1] mb-4">
            Join the <span className="italic text-primary">sunrise crew</span>
          </h2>
          
          <p className="font-sans text-sm text-background/70 mb-8">
            Be the first to know about new flavors, local events, 
            and get 10% off your first order.
          </p>

          <form 
            className="space-y-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="your@email.com"
              className="bg-transparent border-2 border-background/30 text-background placeholder:text-background/50 focus:border-primary focus:ring-0 h-14 font-sans"
            />
            <Button 
              type="submit"
              size="lg"
              className="w-full font-sans text-sm font-bold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 h-14"
            >
              Join
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="font-sans text-[10px] text-background/50 text-center">
              No spam, just good vibes. Unsubscribe anytime.
            </p>
          </form>

          {/* Discount badge */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-primary/20 border border-primary px-4 py-2">
              <span className="font-sans text-xs uppercase tracking-wider text-primary font-semibold">
                Get 10% off your first order
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Split background */}
      <div className="hidden lg:grid lg:grid-cols-2">
        {/* Left side - Dark */}
        <div className="bg-foreground text-background py-24 lg:py-40 px-6 lg:px-16 relative">
          <div className="grain absolute inset-0 pointer-events-none opacity-50" />
          
          <div className="relative z-10 max-w-lg">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-seafoam mb-6 block">
              Newsletter
            </span>
            
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6">
              Join the <span className="italic text-primary">sunrise crew</span>
            </h2>
            
            <p className="font-sans text-lg text-background/70 mb-10">
              Be the first to know about new flavors, local events, 
              and get 10% off your first order.
            </p>

            <form 
              className="space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-transparent border-2 border-background/30 text-background placeholder:text-background/50 focus:border-primary focus:ring-0 h-14 font-sans"
                />
                <Button 
                  type="submit"
                  size="lg"
                  className="font-sans text-sm font-semibold uppercase tracking-wider shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8"
                >
                  Join
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="font-sans text-xs text-background/50">
                No spam, just good vibes. Unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Decorative text */}
          <div className="absolute bottom-8 left-6 lg:left-16 font-serif text-6xl lg:text-8xl font-bold text-background/5">
            MMAF
          </div>
        </div>

        {/* Right side - Image */}
        <div className="relative h-[50vh] lg:h-auto">
          <img
            src="https://images.unsplash.com/photo-1509914398892-963f53e6e2f1?w=1000&q=80"
            alt="Sunrise over ocean"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-foreground/30" />
          
          {/* Floating element */}
          <div className="absolute bottom-8 right-8 lg:bottom-16 lg:right-16 bg-background border-2 border-foreground p-6 max-w-xs shadow-brutal hidden lg:block">
            <p className="font-sans text-sm uppercase tracking-wider mb-2 font-semibold">Early Access</p>
            <p className="font-serif text-2xl">Get 10% off your first order</p>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="bg-primary text-primary-foreground py-3 lg:py-4 overflow-hidden">
        <div className="marquee-reverse whitespace-nowrap">
          <span className="inline-block font-sans text-xs lg:text-sm uppercase tracking-[0.2em] mx-6 lg:mx-8">
            ✦ Join 10,000+ Happy Customers ✦ San Diego Born ✦ Zero Proof ✦ Maximum Flavor ✦ 
            ✦ Join 10,000+ Happy Customers ✦ San Diego Born ✦ Zero Proof ✦ Maximum Flavor ✦
          </span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
