import { Star, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote: "Finally found my post-surf drink. The Golden Hour Spritz hits different when you're watching the sun set over PB.",
    author: "Mike T.",
    location: "Pacific Beach, CA",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80"
  },
  {
    quote: "Brought these to our beach bonfire and everyone was obsessed. No hangover for the dawn patrol the next morning!",
    author: "Sarah K.",
    location: "Encinitas, CA",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80"
  },
  {
    quote: "As a bartender in the Gaslamp, I recommend Monday Morning to anyone wanting a sophisticated NA option. Game changer.",
    author: "Carlos R.",
    location: "San Diego, CA",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 lg:py-40 bg-sand-warm relative overflow-hidden">
      {/* Grain texture */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Large quote mark */}
      <div className="absolute top-12 left-8 lg:left-16 font-serif text-[15rem] lg:text-[25rem] text-foreground/5 leading-none pointer-events-none select-none">
        "
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-24">
          <div>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-secondary mb-4 block">
              ( Testimonials )
            </span>
            <h2 className="font-serif text-5xl lg:text-7xl font-bold leading-[0.9]">
              From the
              <span className="block text-outline">SD fam</span>
            </h2>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-3">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 border-2 border-foreground flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Featured testimonial */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16">
          {/* Quote */}
          <div className="lg:col-span-8">
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-sunset text-sunset" />
              ))}
            </div>
            <blockquote className="font-serif text-3xl lg:text-5xl xl:text-6xl leading-tight mb-8">
              "{testimonials[activeIndex].quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 border-2 border-foreground overflow-hidden">
                <img 
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-sans text-sm font-semibold uppercase tracking-wider">
                  {testimonials[activeIndex].author}
                </div>
                <div className="font-sans text-sm text-muted-foreground">
                  {testimonials[activeIndex].location}
                </div>
              </div>
            </div>
          </div>

          {/* Counter */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-8xl lg:text-9xl font-bold text-primary">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="font-sans text-2xl text-muted-foreground">
                / {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="border-t-2 border-foreground pt-12">
          <div className="grid grid-cols-3 gap-8 lg:gap-16">
            {[
              { value: "10K+", label: "Happy customers" },
              { value: "4.9", label: "Average rating" },
              { value: "50+", label: "SoCal retailers" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="font-serif text-4xl lg:text-6xl font-bold group-hover:text-primary transition-colors">
                  {stat.value}
                </div>
                <div className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
