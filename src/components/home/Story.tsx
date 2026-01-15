import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Story = () => {
  const stats = [
    { number: "365", label: "Days of Sun", suffix: "" },
    { number: "0", label: "Alcohol", suffix: "%" },
    { number: "100", label: "Good Vibes", suffix: "%" },
  ];

  return (
    <section id="story" className="py-24 lg:py-40 bg-background relative overflow-hidden">
      {/* Background number */}
      <div className="absolute top-0 left-0 font-serif text-[20rem] lg:text-[40rem] font-bold text-muted/30 leading-none pointer-events-none select-none -translate-x-1/4 -translate-y-1/4">
        02
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Two column asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Content Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-secondary mb-6 block">
              Our Story
            </span>
            
            <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-8">
              Born on <span className="italic text-primary">the coast</span>
            </h2>
            
            <div className="space-y-6 font-sans text-lg text-muted-foreground leading-relaxed mb-10">
              <p>
                It started with early morning surf sessions and the realization that the best 
                moments don't need alcohol—they need presence.
              </p>
              <p>
                From our home in San Diego, we craft beverages that capture that golden hour 
                feeling. Functional ingredients, bold flavors, and that laid-back coastal energy.
              </p>
            </div>

            {/* Stats - Horizontal */}
            <div className="flex gap-8 lg:gap-12 mb-10 py-8 border-y-2 border-border">
              {stats.map((stat) => (
                <div key={stat.label} className="group">
                  <div className="font-serif text-4xl lg:text-5xl font-bold group-hover:text-primary transition-colors">
                    {stat.number}
                    <span className="text-2xl">{stat.suffix}</span>
                  </div>
                  <div className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="lg"
              className="font-sans text-sm font-semibold uppercase tracking-wider group border-2 border-foreground px-8 py-6 hover:bg-foreground hover:text-background"
            >
              Read more
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Image Column - Stacked images */}
          <div className="lg:col-span-7 relative">
            {/* Main image */}
            <div className="relative mb-6">
              <div className="aspect-[4/3] overflow-hidden border-2 border-foreground">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1000&q=80"
                  alt="Friends sharing drinks at sunset"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Offset accent box */}
              <div className="absolute -bottom-4 -right-4 w-1/3 h-24 bg-secondary z-[-1]" />
            </div>

            {/* Secondary images grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-square overflow-hidden border-2 border-foreground">
                <img
                  src="https://images.unsplash.com/photo-1473116763249-2fce8e5c4e4e?w=600&q=80"
                  alt="Beach lifestyle"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden border-2 border-foreground translate-y-8">
                <img
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80"
                  alt="San Diego beach"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Quote overlay */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden xl:block">
              <div className="bg-sand-warm border-2 border-foreground p-6 max-w-xs shadow-brutal">
                <p className="font-serif text-lg italic leading-relaxed">
                  "Life's better with sand between your toes and clarity in your glass."
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
