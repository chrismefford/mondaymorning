import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Finally found my post-surf drink. The Golden Hour Spritz hits different when you're watching the sun set over PB.",
    author: "Mike T.",
    location: "Pacific Beach, CA",
    rating: 5,
  },
  {
    quote: "Brought these to our beach bonfire and everyone was obsessed. No hangover for the dawn patrol the next morning!",
    author: "Sarah K.",
    location: "Encinitas, CA",
    rating: 5,
  },
  {
    quote: "As a bartender in the Gaslamp, I recommend Monday Morning to anyone wanting a sophisticated NA option. Game changer.",
    author: "Carlos R.",
    location: "San Diego, CA",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-32 bg-sand-warm/50 relative overflow-hidden">
      {/* Sand texture overlay */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            opacity: 0.05,
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ocean mb-4 block">
            Community Love
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium">
            From our San Diego fam
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-background rounded-2xl p-8 shadow-card hover-lift relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-4 left-6 w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Quote className="h-5 w-5 text-primary-foreground" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-sunset text-sunset" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-lg leading-relaxed mb-6 text-foreground">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ocean-light flex items-center justify-center">
                  <span className="font-sans text-sm font-semibold text-ocean-deep">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-sans text-sm font-medium">
                    {testimonial.author}
                  </div>
                  <div className="font-sans text-xs text-muted-foreground">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Proof Bar */}
        <div className="mt-16 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 text-center">
          {[
            { value: "10,000+", label: "Happy customers" },
            { value: "4.9/5", label: "Average rating" },
            { value: "50+", label: "SoCal retailers" },
          ].map((stat) => (
            <div key={stat.label} className="group">
              <div className="font-serif text-3xl font-medium text-foreground group-hover:text-primary transition-colors">
                {stat.value}
              </div>
              <div className="font-sans text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
