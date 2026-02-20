import { Button } from "@/components/ui/button";
import { ArrowRight, Wine, Beer, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import friendsDrinking from "@/assets/friends-drinking.jpg";
import stampGreen from "@/assets/stamp-green.svg";
import textureCream from "@/assets/texture-cream.svg";

const Story = () => {
  const pillars = [
    { 
      icon: Wine,
      title: "Sip", 
      subtitle: "Free Tastings",
      description: "Walk in and try anything. We'll find what you love—no pressure, no judgment." 
    },
    { 
      icon: Beer,
      title: "Sit", 
      subtitle: "Tasting Room",
      description: "Stay a while. Our bar serves craft NA cocktails in a space built for community." 
    },
    { 
      icon: ShoppingBag,
      title: "Shop", 
      subtitle: "500+ Options",
      description: "Take your favorites home. The largest AF selection in America, curated for you." 
    },
  ];

  const stats = [
    { value: "61%", label: "of Gen Z are drinking less" },
    { value: "49%", label: "of Millennials are cutting back" },
    { value: "500+", label: "flavors to discover" },
  ];

  return (
    <section id="story" className="bg-cream relative overflow-hidden">
      {/* Organic texture background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Background stamp watermark */}
      <div className="absolute top-0 right-0 w-[30rem] lg:w-[50rem] opacity-[0.03] pointer-events-none select-none translate-x-1/4 -translate-y-1/4">
        <img src={stampGreen} alt="" className="w-full h-full" />
      </div>

      {/* HERO SECTION */}
      <div className="relative py-16 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          {/* MOBILE LAYOUT */}
          <div className="lg:hidden">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-gold mb-4 block">
              About Our Bottle Shop + Tasting Room
            </span>
            <h2 className="font-serif text-4xl leading-[1.05] mb-6">
              Drink <span className="italic text-gold">differently</span>
            </h2>
            <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
              We're on a mission to prove that alcohol-free doesn't mean boring. Welcome to America's #1 NA shop.
            </p>
          </div>

          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:block max-w-4xl">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-gold mb-6 block">
              About Our Bottle Shop + Tasting Room
            </span>
            <h2 className="font-serif text-5xl xl:text-7xl leading-[1.05] mb-8">
              Drink <span className="italic text-gold">differently</span>
            </h2>
            <p className="font-sans text-xl text-muted-foreground leading-relaxed max-w-2xl">
              We're on a mission to prove that alcohol-free doesn't mean boring. Welcome to San Diego's home for the curious, the sober, and everyone in between.
            </p>
          </div>
        </div>
      </div>

      {/* FOUNDER STORY SECTION */}
      <div className="relative">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative mb-8 lg:mb-0">
              <div className="aspect-[4/5] lg:aspect-[3/4] overflow-hidden border-2 border-forest">
                <img
                  src={friendsDrinking}
                  alt="Friends enjoying NA drinks together"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating quote card - Mobile */}
              <div className="lg:hidden absolute -bottom-6 left-4 right-4 bg-gold border-2 border-forest p-5 shadow-brutal">
                <p className="font-serif text-lg italic leading-relaxed text-forest-deep">
                  "Monday mornings don't suck anymore."
                </p>
              </div>
              {/* Offset accent - Desktop */}
              <div className="hidden lg:block absolute -bottom-4 -left-4 w-1/3 h-32 bg-gold z-[-1]" />
            </div>

            {/* Content */}
            <div className="mt-12 lg:mt-0 lg:py-16">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.2em] text-forest mb-4 lg:mb-6 block">
                Our Story
              </span>
              
              <h3 className="font-serif text-2xl lg:text-4xl leading-[1.1] mb-6">
                We love <span className="italic text-gold">skeptics</span>
              </h3>
              
              <div className="space-y-4 lg:space-y-6 font-sans text-base lg:text-lg text-muted-foreground leading-relaxed">
                <p>
                  "NA drinks can't taste good." We hear it all the time. <strong className="text-forest">That's exactly why we opened.</strong>
                </p>
                <p>
                  Forget sugary mocktails with Sprite and juice. We stock <strong className="text-forest">500+ flavors</strong>—wines, beers, spirits, aperitifs—more than any shop in America.
                </p>
                <p className="text-lg lg:text-xl font-medium text-forest">
                  Our favorite customers? The ones who don't believe us yet.
                </p>
              </div>

              {/* Desktop quote */}
              <div className="hidden lg:block mt-10 p-6 bg-gold border-2 border-forest max-w-md">
                <p className="font-serif text-xl italic leading-relaxed text-forest-deep">
                  "Monday mornings don't suck anymore."
                </p>
                <p className="font-sans text-sm text-forest/70 mt-2">— Our founder, on going AF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="py-16 lg:py-24 mt-16 lg:mt-24 bg-gold text-forest relative">
        <div className="grain absolute inset-0 pointer-events-none opacity-30" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-10 lg:mb-16">
            <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-forest-deep mb-4 block">
              The Movement
            </span>
            <h3 className="font-serif text-2xl lg:text-4xl text-forest">
              You're not alone in <span className="italic text-forest-deep">drinking less</span>
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl lg:text-6xl font-bold text-forest mb-2">
                  {stat.value}
                </div>
                <p className="font-sans text-[10px] lg:text-sm text-forest/60 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIP, SIT, SHOP SECTION */}
      <div className="py-16 lg:py-32 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 lg:mb-20">
            <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-forest mb-4 block">
              How It Works
            </span>
            <h3 className="font-serif text-3xl lg:text-5xl leading-[1.1]">
              We make it easy to <br className="hidden lg:block" />
              <span className="italic text-gold">drink differently</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <div 
                  key={pillar.title} 
                  className="group text-center lg:text-left p-6 lg:p-8 border-2 border-forest/20 hover:border-gold hover:bg-gold/5 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gold/20 border-2 border-gold mb-6 group-hover:bg-gold group-hover:scale-105 transition-all">
                    <IconComponent className="w-6 h-6 lg:w-8 lg:h-8 text-forest" />
                  </div>
                  <div className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.2em] text-gold mb-2">
                    0{index + 1} — {pillar.subtitle}
                  </div>
                  <h4 className="font-serif text-2xl lg:text-3xl font-bold text-forest mb-3">
                    {pillar.title}
                  </h4>
                  <p className="font-sans text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12 lg:mt-16">
            <Link to="/locations">
              <Button 
                size="lg"
                className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6 group"
              >
                Find a Location
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;