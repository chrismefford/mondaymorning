import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Story = () => {
  return (
    <section id="story" className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                alt="Friends sharing drinks"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating accent image */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-lg overflow-hidden shadow-elevated hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80"
                alt="Premium ingredients"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6 block">
              Our Philosophy
            </span>
            
            <h2 className="font-serif text-4xl lg:text-5xl font-medium leading-tight mb-6">
              Presence is the 
              <span className="italic"> new luxury</span>
            </h2>
            
            <div className="space-y-4 font-sans text-base text-muted-foreground leading-relaxed">
              <p>
                We believe the best moments happen when you're fully present. That's why we craft 
                beverages that let you participate in every ritual—the toast, the conversation, 
                the connection—without compromise.
              </p>
              <p>
                Each bottle is an invitation to be here, now. Made with adaptogens, functional 
                ingredients, and flavors that surprise and delight, Monday Morning is for those 
                who want all the ceremony and none of the fog.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-4 mt-10 mb-10">
              {[
                { number: "0%", label: "Alcohol" },
                { number: "100%", label: "Presence" },
                { number: "∞", label: "Moments" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-serif text-3xl lg:text-4xl font-medium text-primary">
                    {stat.number}
                  </div>
                  <div className="font-sans text-xs uppercase tracking-wider text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              variant="outline" 
              size="lg"
              className="font-sans text-sm font-medium group"
            >
              Read our story
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
