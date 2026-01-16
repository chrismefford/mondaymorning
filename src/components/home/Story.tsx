import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Story = () => {
  const steps = [
    { number: "01", title: "Sample", description: "Try before you buy at our tasting room" },
    { number: "02", title: "Sip", description: "Discover your new favorites with expert guidance" },
    { number: "03", title: "Shop", description: "Take home what you love, zero judgment" },
  ];

  return (
    <section id="story" className="py-16 lg:py-40 bg-cream relative overflow-hidden">
      {/* Background number */}
      <div className="absolute top-0 left-0 font-serif text-[10rem] lg:text-[40rem] font-bold text-forest/5 leading-none pointer-events-none select-none -translate-x-1/4 -translate-y-1/4">
        MM
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* MOBILE LAYOUT */}
        <div className="lg:hidden">
          {/* Header */}
          <div className="mb-8">
            <span className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-forest mb-2 block">
              Our Story
            </span>
            <h2 className="font-serif text-3xl leading-[1.1]">
              Why we <span className="italic text-gold">started</span>
            </h2>
          </div>

          {/* Single hero image with overlay content */}
          <div className="relative mb-8">
            <div className="aspect-[4/5] overflow-hidden border-2 border-forest">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&q=80"
                alt="Friends sharing drinks at sunset"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating quote card */}
            <div className="absolute -bottom-6 left-4 right-4 bg-gold border-2 border-forest p-5 shadow-brutal">
              <p className="font-serif text-lg italic leading-relaxed text-forest-deep">
                "Choosing you means choosing connection."
              </p>
            </div>
          </div>

          {/* Content below image - The WHY */}
          <div className="mt-12 space-y-5">
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              When our founder Zane began exploring alcohol-free beverages, he was frustrated by the lack of quality options. The sugary mocktails and limited selections weren't satisfying.
            </p>
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              Understanding the importance of <strong className="text-forest">community</strong> for those who choose to drink differently, we knew a physical space was essential.
            </p>
            <p className="font-sans text-lg font-medium text-forest">
              Whatever your reason—you're welcome here.
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
            Meet Zane
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Content Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-forest mb-6 block">
              Our Story
            </span>
            
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-8">
              Why we <span className="italic text-gold">started</span>
            </h2>
            
            <div className="space-y-6 font-sans text-lg text-muted-foreground leading-relaxed mb-10">
              <p>
                When our founder Zane began exploring alcohol-free beverages, he was frustrated by the lack of quality options. The sugary mocktails and limited selections just weren't satisfying.
              </p>
              <p>
                Understanding the importance of <strong className="text-forest">community</strong> for those who choose to drink differently, we knew a physical space was essential to fostering genuine connections.
              </p>
              <p className="text-xl font-medium text-forest">
                Whatever your reason—cutting back, going dry, or simply sober curious—you're welcome here.
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
              Meet Zane
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Image Column - Stacked images */}
          <div className="lg:col-span-7 relative">
            {/* Main image */}
            <div className="relative mb-6">
              <div className="aspect-[4/3] overflow-hidden border-2 border-forest">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&q=80"
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
                  src="https://images.unsplash.com/photo-1473116763249-2fce8e5c4e4e?w=600&q=80"
                  alt="Beach lifestyle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden border-2 border-forest translate-y-8">
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80"
                  alt="San Diego beach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Quote overlay */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="bg-gold border-2 border-forest p-6 max-w-xs shadow-brutal">
                <p className="font-serif text-lg italic leading-relaxed text-forest-deep">
                  "Choosing a non-alcoholic beverage is about choosing you."
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
