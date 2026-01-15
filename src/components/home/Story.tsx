import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Waves, Heart } from "lucide-react";

const Story = () => {
  return (
    <section id="story" className="py-20 lg:py-32 bg-background overflow-hidden relative">
      {/* Subtle wave pattern background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q 15 20, 30 30 T 60 30' fill='none' stroke='%234A90A4' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                alt="Friends sharing drinks at sunset"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating accent image with beach vibe */}
            <div className="absolute -bottom-8 -right-8 w-56 h-56 rounded-2xl overflow-hidden shadow-elevated hidden lg:block border-4 border-background">
              <img
                src="https://images.unsplash.com/photo-1473116763249-2fce8e5c4e4e?w=400&q=80"
                alt="Beach lifestyle"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative circle */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-ocean-light border-4 border-background shadow-soft hidden lg:flex items-center justify-center">
              <Sun className="w-10 h-10 text-sunset animate-pulse" />
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ocean mb-6">
              <Waves className="h-4 w-4" />
              Our Story
            </span>
            
            <h2 className="font-serif text-4xl lg:text-5xl font-medium leading-tight mb-6">
              Born on the 
              <span className="text-primary italic"> Pacific coast</span>
            </h2>
            
            <div className="space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
              <p>
                It started with early morning surf sessions and the realization that the best 
                moments don't need alcohol—they need presence. We wanted drinks as vibrant 
                as a La Jolla sunset, as refreshing as the ocean breeze.
              </p>
              <p>
                From our home in San Diego, we craft beverages that capture that golden hour 
                feeling. Functional ingredients, bold flavors, and that laid-back coastal energy 
                in every sip. Because life's too short for foggy mornings.
              </p>
            </div>

            {/* Coastal values */}
            <div className="grid grid-cols-3 gap-4 mt-10 mb-10">
              {[
                { icon: Sun, number: "365", label: "Days of Sun", color: "text-sunset" },
                { icon: Waves, number: "0%", label: "Alcohol", color: "text-ocean" },
                { icon: Heart, number: "100%", label: "Good Vibes", color: "text-primary" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left group">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                    <stat.icon className={`h-5 w-5 ${stat.color} transition-transform group-hover:scale-110`} />
                    <span className="font-serif text-2xl lg:text-3xl font-medium text-foreground">
                      {stat.number}
                    </span>
                  </div>
                  <div className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="lg"
              className="font-sans text-sm font-medium group border-ocean/30 hover:bg-ocean-light/50"
            >
              Read the full story
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
