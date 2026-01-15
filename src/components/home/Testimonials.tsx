import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Finally, a drink that makes me feel included at happy hour without the hangover. The Golden Hour Spritz is my new ritual.",
    author: "Sarah M.",
    location: "Brooklyn, NY",
    rating: 5,
  },
  {
    quote: "I was skeptical, but the complexity of these flavors rivals any craft cocktail I've had. Now I don't miss what I gave up.",
    author: "James L.",
    location: "Austin, TX",
    rating: 5,
  },
  {
    quote: "These aren't just 'non-alcoholic drinks'—they're an experience. My dinner parties have never been better.",
    author: "Elena R.",
    location: "San Francisco, CA",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 lg:py-32 bg-warmth">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4 block">
            Community
          </span>
          <h2 className="font-serif text-4xl lg:text-5xl font-medium">
            What people are saying
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-background rounded-lg p-8 shadow-card"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-serif text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div>
                <div className="font-sans text-sm font-medium">
                  {testimonial.author}
                </div>
                <div className="font-sans text-xs text-muted-foreground">
                  {testimonial.location}
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
            { value: "50+", label: "Retail partners" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-serif text-3xl font-medium text-foreground">
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
