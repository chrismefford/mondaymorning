import { Star, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import stampGreen from "@/assets/stamp-green.svg";

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
    <section className="py-16 lg:py-40 bg-sand relative overflow-hidden">
      {/* Grain texture */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Background stamp watermark */}
      <div className="absolute bottom-0 right-0 w-[20rem] lg:w-[40rem] opacity-[0.03] pointer-events-none select-none translate-x-1/4 translate-y-1/4">
        <img src={stampGreen} alt="" className="w-full h-full" />
      </div>

      {/* Large quote mark */}
      <div className="absolute top-8 left-4 lg:top-12 lg:left-16 font-serif text-[8rem] lg:text-[25rem] text-forest/5 leading-none pointer-events-none select-none">
        "
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-8 lg:mb-24">
          <div>
            <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.2em] text-forest mb-2 lg:mb-4 block">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] text-forest">
              From the <span className="italic text-gold">SD fam</span>
            </h2>
          </div>

          {/* Navigation arrows - Desktop */}
          <div className="hidden lg:flex gap-3">
            <button 
              onClick={prevTestimonial}
              className="w-12 h-12 border-2 border-forest flex items-center justify-center hover:bg-forest hover:text-cream transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-12 h-12 border-2 border-forest flex items-center justify-center hover:bg-forest hover:text-cream transition-colors"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* MOBILE: Card-based testimonial */}
        <div className="lg:hidden">
          <div className="bg-cream border-2 border-forest p-6 shadow-brutal">
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            
            <blockquote className="font-serif text-xl leading-snug mb-6 text-forest">
              "{testimonials[activeIndex].quote}"
            </blockquote>
            
            <div className="flex items-center gap-3 pt-4 border-t border-forest/20">
              <div className="w-10 h-10 border-2 border-forest overflow-hidden">
                <img 
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-sans text-sm font-semibold text-forest">
                  {testimonials[activeIndex].author}
                </div>
                <div className="font-sans text-xs text-muted-foreground">
                  {testimonials[activeIndex].location}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile navigation */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? 'w-6 bg-gold' : 'w-2 bg-forest/20'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={prevTestimonial}
                className="w-10 h-10 border-2 border-forest flex items-center justify-center"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-10 h-10 border-2 border-forest flex items-center justify-center"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP: Featured testimonial */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 lg:gap-16 items-center mb-16">
          {/* Quote */}
          <div className="lg:col-span-8">
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
            <blockquote className="font-serif text-3xl lg:text-5xl xl:text-6xl leading-tight mb-8 text-forest">
              "{testimonials[activeIndex].quote}"
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 border-2 border-forest overflow-hidden">
                <img 
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-sans text-sm font-semibold uppercase tracking-wider text-forest">
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
              <span className="font-serif text-8xl lg:text-9xl font-bold text-gold">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="font-sans text-2xl text-muted-foreground">
                / {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Social Proof Bar */}
        <div className="border-t-2 border-forest pt-8 lg:pt-12 mt-8 lg:mt-0">
          <div className="grid grid-cols-3 gap-4 lg:gap-16">
            {[
              { value: "10K+", label: "Happy customers" },
              { value: "4.9", label: "Average rating" },
              { value: "50+", label: "SoCal retailers" },
            ].map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="font-serif text-2xl lg:text-6xl font-bold text-forest group-hover:text-gold transition-colors">
                  {stat.value}
                </div>
                <div className="font-sans text-[9px] lg:text-xs uppercase tracking-[0.15em] lg:tracking-[0.2em] text-muted-foreground mt-1 lg:mt-2">
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
