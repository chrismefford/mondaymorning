import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import friendsDrinking from "@/assets/friends-drinking.jpg";
import stampGreen from "@/assets/stamp-green.svg";
import textureCream from "@/assets/texture-cream.svg";

const Story = () => {
  const steps = [
    { number: "01", title: "Sample", description: "Walk in and try anything—free tastings, no pressure" },
    { number: "02", title: "Discover", description: "400+ options means there's something for everyone" },
    { number: "03", title: "Believe", description: "Leave knowing NA can actually taste incredible" },
  ];

  return (
    <section id="story" className="py-16 lg:py-40 bg-cream relative overflow-hidden">
      {/* Organic texture background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Background stamp watermark */}
      <div className="absolute top-0 left-0 w-[30rem] lg:w-[60rem] opacity-[0.03] pointer-events-none select-none -translate-x-1/4 -translate-y-1/4">
        <img src={stampGreen} alt="" className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* MOBILE LAYOUT */}
        <div className="lg:hidden">
          {/* Header */}
          <div className="mb-8">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-forest mb-2 block">
              Why We Exist
            </span>
            <h2 className="font-serif text-3xl leading-[1.1]">
              We love <span className="italic text-gold">skeptics</span>
            </h2>
          </div>

          {/* Single hero image with overlay content */}
          <div className="relative mb-8">
            <div className="aspect-[4/5] overflow-hidden border-2 border-forest">
              <img
                src={friendsDrinking}
                alt="Friends sharing drinks at sunset"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating quote card */}
            <div className="absolute -bottom-6 left-4 right-4 bg-gold border-2 border-forest p-5 shadow-brutal">
              <p className="font-serif text-lg italic leading-relaxed text-forest-deep">
                "We'll make you a believer."
              </p>
            </div>
          </div>

          {/* Content below image - The WHY */}
          <div className="mt-12 space-y-5">
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              "NA drinks can't taste good." We hear it all the time. That's exactly why we opened—to prove it wrong.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              Forget sugary mocktails with Sprite and juice. We've got <strong className="text-forest">400+ flavors</strong>—wines, beers, spirits, aperitifs—that rival the real thing. This isn't guesswork. Come in. Try something. Taste the difference.
            </p>
            <p className="font-sans text-lg font-medium text-forest">
              Our favorite customers? The ones who don't believe us yet.
            </p>
          </div>

          {/* Sample, Sip, Shop */}
          <div className="mt-8 py-6 border-y-2 border-forest/20">
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.title} className="flex items-start gap-4">
                  <span className="font-serif text-2xl font-bold text-gold">{step.number}</span>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-forest">{step.title}</h4>
                    <p className="font-sans text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button 
            variant="outline" 
            size="lg"
            className="w-full mt-8 font-sans text-sm font-bold uppercase tracking-widest py-5 border-2 border-forest text-forest hover:bg-forest hover:text-cream"
          >
            Visit Ocean Beach or Pacific Beach
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Content Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-forest mb-6 block">
              Why We Exist
            </span>
            
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-8">
              We love <span className="italic text-gold">skeptics</span>
            </h2>
            
            <div className="space-y-6 font-sans text-lg text-muted-foreground leading-relaxed mb-10">
              <p>
                "NA drinks can't taste good." We hear it all the time. <strong className="text-forest">That's exactly why we opened.</strong>
              </p>
              <p>
                Forget sugary mocktails with Sprite and juice. We stock <strong className="text-forest">400+ flavors</strong>—wines, beers, spirits, aperitifs—more than any shop in America. This isn't guesswork. Come in. Try something. We'll make you a believer.
              </p>
              <p className="text-xl font-medium text-forest">
                Our favorite customers? The ones who don't believe us yet.
              </p>
            </div>

            {/* Sample, Sip, Shop - Horizontal */}
            <div className="flex gap-8 lg:gap-10 mb-10 py-8 border-y-2 border-forest/20">
              {steps.map((step) => (
                <div key={step.title} className="group">
                  <div className="font-serif text-3xl lg:text-4xl font-bold text-gold group-hover:text-terracotta transition-colors">
                    {step.number}
                  </div>
                  <div className="font-serif text-lg font-bold text-forest mt-1">
                    {step.title}
                  </div>
                  <div className="font-sans text-xs text-muted-foreground mt-1 max-w-[120px]">
                    {step.description}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="lg"
              className="font-sans text-sm font-semibold uppercase tracking-wider group border-2 border-forest text-forest px-8 py-6 hover:bg-forest hover:text-cream"
            >
              Visit Our Stores
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Image Column - Stacked images */}
          <div className="lg:col-span-7 relative">
            {/* Main image */}
            <div className="relative mb-6">
            <div className="aspect-[4/3] overflow-hidden border-2 border-forest">
                <img
                  src={friendsDrinking}
                  alt="Friends sharing drinks at sunset"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Offset accent box - Gold */}
              <div className="absolute -bottom-4 -right-4 w-1/3 h-24 bg-gold z-[-1]" />
            </div>

            {/* Secondary images grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square overflow-hidden border-2 border-forest">
                <img
                  src="/images/beach-lifestyle.jpg"
                  alt="Beach lifestyle"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden border-2 border-forest translate-y-8">
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80"
                  alt="San Diego beach"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Quote overlay */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="bg-gold border-2 border-forest p-6 max-w-xs shadow-brutal">
                <p className="font-serif text-lg italic leading-relaxed text-forest-deep">
                  "We took on the alcohol industry to prove NA doesn't have to mean boring."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
