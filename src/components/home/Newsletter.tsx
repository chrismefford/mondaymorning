import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import { useNewsletterSubscribe } from "@/hooks/useNewsletterSubscribe";
import stampGold from "@/assets/stamp-gold.svg";
import textureGreen from "@/assets/texture-green.svg";
import friendsCocktails from "@/assets/friends-cocktails.jpg";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading } = useNewsletterSubscribe();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await subscribe(email);
    if (success) {
      setEmail("");
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* MOBILE LAYOUT - Stacked with image background */}
      <div className="lg:hidden relative">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={friendsCocktails}
            alt="Friends enjoying drinks together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gold/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-16 text-forest">
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-forest-deep mb-4 block">
            Become a Believer
          </span>
          
          <h2 className="font-serif text-3xl leading-[1.1] mb-4 text-forest">
            Join the <span className="italic text-forest-deep">movement</span>
          </h2>
          
          <p className="font-sans text-sm text-forest/70 mb-8">
            Be the first to know about new flavors hitting our 500+ selection, 
            tastings at OB & PB, and get 10% off your first order.
          </p>

          <form 
            className="space-y-3"
            onSubmit={handleSubmit}
          >
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="bg-forest/10 border-2 border-forest/30 text-forest placeholder:text-forest/50 focus:border-forest-deep focus:ring-0 h-14 font-sans"
            />
            <Button 
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep h-14"
            >
              {isLoading ? "Joining..." : "Join"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
            <p className="font-sans text-[10px] text-forest/50 text-center">
              No spam, just good vibes. Unsubscribe anytime.
            </p>
          </form>

          {/* Discount badge */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-forest/20 border border-forest px-4 py-2">
              <span className="font-sans text-xs uppercase tracking-wider text-forest font-semibold">
                Get 10% off your first order
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP LAYOUT - Split background */}
      <div className="hidden lg:grid lg:grid-cols-2">
        {/* Left side - Gold */}
        <div className="bg-gold text-forest py-24 lg:py-40 px-6 lg:px-16 relative">
          {/* Organic texture */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
            style={{ backgroundImage: `url(${textureGreen})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-50" />
          
          {/* Decorative stamp */}
          <div className="absolute -top-20 -left-20 w-64 opacity-[0.05] pointer-events-none rotate-12">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>
          
          <div className="relative z-10 max-w-lg">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-forest-deep mb-6 block">
              Become a Believer
            </span>
            
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-6 text-forest">
              Join the <span className="italic text-forest-deep">movement</span>
            </h2>
            
            <p className="font-sans text-lg text-forest/70 mb-10">
              New flavors drop weekly across our 500+ selection. Get first dibs on tastings at Ocean Beach & Pacific Beach, plus 10% off your first order.
            </p>

            <form 
              className="space-y-4"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-forest/10 border-2 border-forest/30 text-forest placeholder:text-forest/50 focus:border-forest-deep focus:ring-0 h-14 font-sans"
                />
                <Button 
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                  className="font-sans text-sm font-semibold uppercase tracking-wider shrink-0 bg-forest text-cream hover:bg-forest-deep h-14 px-8"
                >
                  {isLoading ? "Joining..." : "Join"}
                  {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
              <p className="font-sans text-xs text-forest/50">
                No spam, just good vibes. Unsubscribe anytime.
              </p>
            </form>
          </div>

          {/* Decorative text */}
          <div className="absolute bottom-8 left-6 lg:left-16 font-serif text-6xl lg:text-8xl font-bold text-forest/5">
            MMAF
          </div>
        </div>

        {/* Right side - Image */}
        <div className="relative h-[50vh] lg:h-auto">
          <img
            src={friendsCocktails}
            alt="Friends enjoying drinks together"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-forest/30" />
          
          {/* Floating element */}
          <div className="absolute bottom-8 right-8 lg:bottom-16 lg:right-16 bg-cream border-2 border-forest p-6 max-w-xs shadow-brutal hidden lg:block">
            <p className="font-sans text-sm uppercase tracking-wider mb-2 font-semibold text-forest">Early Access</p>
            <p className="font-serif text-2xl text-forest">Get 10% off your first order</p>
          </div>
        </div>
      </div>

      {/* Bottom marquee - Ocean teal */}
      <div className="bg-ocean text-cream py-3 lg:py-4 overflow-hidden">
        <div className="marquee-reverse whitespace-nowrap">
          <span className="inline-block font-sans text-xs lg:text-sm uppercase tracking-[0.2em]">
            <span className="mx-8 lg:mx-12">Ocean Beach</span>
            <span className="text-cream/60">✦</span>
            <span className="mx-8 lg:mx-12">Pacific Beach</span>
            <span className="text-cream/60">✦</span>
            <span className="mx-8 lg:mx-12">500+ Flavors</span>
            <span className="text-cream/60">✦</span>
            <span className="mx-8 lg:mx-12">Try Before You Buy</span>
            <span className="text-cream/60">✦</span>
            <span className="mx-8 lg:mx-12">America's #1 NA Shop</span>
            <span className="text-cream/60">✦</span>
            <span className="mx-8 lg:mx-12">Ocean Beach</span>
            <span className="text-cream/60">✦</span>
            <span className="mx-8 lg:mx-12">Pacific Beach</span>
            <span className="text-cream/60">✦</span>
            <span className="mx-8 lg:mx-12">500+ Flavors</span>
            <span className="text-cream/60">✦</span>
            <span className="mx-8 lg:mx-12">Try Before You Buy</span>
            <span className="text-cream/60">✦</span>
            <span className="mx-8 lg:mx-12">America's #1 NA Shop</span>
            <span className="text-cream/60">✦</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
