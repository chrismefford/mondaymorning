import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import stampGold from "@/assets/stamp-gold.svg";
import textureCream from "@/assets/texture-cream.svg";
import textureGreen from "@/assets/texture-green.svg";
import zaneFounder from "@/assets/zane-founder.png";
import cheersDrinks from "@/assets/cheers-drinks.jpg";

const About = () => {
  const brands = [
    "Atmos", "Buzzkill", "Pentire", "Tenneyson", "Three Spirit", 
    "Bauhaus", "Pathfinder", "Go Brewing", "Dromme", "Ritual Zero Proof"
  ];

  const testimonials = [
    {
      quote: "Zane's knowledge of alcohol-free beverages is unmatched. He helped me find drinks I actually enjoy.",
      author: "Jeff L.",
      location: "San Diego"
    },
    {
      quote: "This place changed my relationship with drinking. I never thought I'd look forward to a night out sober.",
      author: "Michael S.",
      location: "Pacific Beach"
    },
    {
      quote: "Finally, a place that gets it. No judgment, incredible selection, and staff who actually care.",
      author: "Sarah M.",
      location: "Ocean Beach"
    },
  ];

  const pillars = [
    { 
      number: "01",
      title: "Sip", 
      description: "Sample AF options until you find your favorite. Every bottle is available to try—no purchase necessary." 
    },
    { 
      number: "02",
      title: "Sit", 
      description: "Grab a seat at our tasting bar. Enjoy craft NA cocktails in a space built for connection." 
    },
    { 
      number: "03",
      title: "Shop", 
      description: "Take your favorites home. We ship nationwide or pick up in-store at OB or PB." 
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 lg:mb-6 block">
                About Our Bottle Shop + Tasting Room
              </span>
              <h1 className="font-serif text-4xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6 lg:mb-8">
                Where you can drink <span className="italic text-gold">differently</span>—without judgment or sacrificing taste
              </h1>
            </div>
          </div>
        </section>

        {/* HERO IMAGE */}
        <section className="relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden border-2 border-forest">
              <img
                src={cheersDrinks}
                alt="Friends toasting with drinks"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
            </div>
            
            {/* Floating stamp */}
            <div className="absolute -bottom-12 right-8 lg:right-16 w-24 lg:w-32 z-10">
              <img src={stampGold} alt="Monday Morning AF" className="w-full h-full" />
            </div>
          </div>
        </section>

        {/* WHY MONDAY MORNING - Founder Story */}
        <section className="py-20 lg:py-32 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Content */}
              <div className="mb-12 lg:mb-0 order-2 lg:order-1">
                <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 lg:mb-6 block">
                  Why Monday Morning?
                </span>
                <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] mb-6 lg:mb-8">
                  "I loved <span className="italic text-gold">Monday mornings</span> again."
                </h2>
                
                <div className="space-y-5 lg:space-y-6 font-sans text-base lg:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    That's what our founder, Zane, realized after choosing to go alcohol-free. No more foggy Sundays. No more dreading the week ahead. Just clarity, energy, and a weird sense of excitement for... <em>Monday</em>.
                  </p>
                  <p>
                    But there was a problem. Finding AF drinks that actually tasted good? Nearly impossible. Everything was either watery, packed with sugar, or tasted like an afterthought.
                  </p>
                  <p>
                    So Zane went on a mission. He traveled the world—tasting, testing, and curating the best alcohol-free beverages on the planet. <strong className="text-forest">The result? Monday Morning.</strong>
                  </p>
                  <p>
                    We opened our doors in San Diego to share what we discovered: that you don't have to sacrifice taste to live differently. That "alcohol-free" can mean sophisticated, complex, and genuinely delicious.
                  </p>
                </div>
              </div>

              <div className="relative order-1 lg:order-2">
                <div className="aspect-[4/5] overflow-hidden border-2 border-forest">
                  <img
                    src={zaneFounder}
                    alt="Founder Zane at the beach"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-2/5 h-24 bg-gold z-[-1]" />
              </div>
            </div>
          </div>
        </section>

        {/* DID YOU KNOW - Stats Section */}
        <section className="py-16 lg:py-24 bg-forest text-cream relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-50" />
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `url(${textureGreen})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 lg:mb-6 block">
                Did You Know?
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] mb-8">
                <span className="text-gold">61%</span> of Gen Z and <span className="text-gold">49%</span> of Millennials are trying to drink less.
              </h2>
              <p className="font-sans text-lg lg:text-xl text-cream/80 leading-relaxed max-w-2xl mx-auto">
                You're not alone. A massive cultural shift is underway, and we're here to make it delicious. We're revolutionizing the alcohol-free experience for San Diegans with good AF brews, wines, and spirits.
              </p>
            </div>
          </div>
        </section>

        {/* KILLER AF BRANDS */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-12 lg:mb-16">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 lg:mb-6 block">
                What We Carry
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1]">
                Killer <span className="italic text-gold">AF</span> Brands
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-4xl mx-auto">
              {brands.map((brand) => (
                <Link 
                  key={brand}
                  to={`/collections/brand/${encodeURIComponent(brand.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="px-6 py-3 lg:px-8 lg:py-4 border-2 border-forest/30 hover:border-gold hover:bg-gold/10 transition-all duration-300 cursor-pointer"
                >
                  <span className="font-serif text-lg lg:text-xl text-forest font-medium">{brand}</span>
                </Link>
              ))}
            </div>

            <p className="text-center font-sans text-sm text-muted-foreground mt-8">
              + 50 more brands and counting
            </p>
          </div>
        </section>

        {/* SIP, SIT, SHOP */}
        <section className="py-16 lg:py-24 bg-sand relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-12 lg:mb-16">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 lg:mb-6 block">
                The Experience
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1]">
                We make it easy to <span className="italic text-gold">drink differently</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {pillars.map((pillar) => (
                <div 
                  key={pillar.title}
                  className="bg-cream p-8 lg:p-10 border-2 border-forest text-center hover:shadow-brutal transition-all duration-300"
                >
                  <div className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
                    {pillar.number}
                  </div>
                  <h3 className="font-serif text-4xl lg:text-5xl font-bold text-forest mb-4">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-base text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 lg:py-24 relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-12 lg:mb-16">
              <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 lg:mb-6 block">
                What People Say
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1]">
                From our <span className="italic text-gold">community</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-forest text-cream p-8 lg:p-10 border-2 border-forest relative"
                >
                  <div className="absolute top-4 right-4 font-serif text-6xl text-gold/20">"</div>
                  <p className="font-serif text-lg lg:text-xl italic leading-relaxed mb-6 relative z-10">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-cream/20 pt-4">
                    <p className="font-sans text-sm font-semibold text-gold">{testimonial.author}</p>
                    <p className="font-sans text-xs text-cream/60">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-16 lg:py-24 bg-gold relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] text-forest mb-6">
                Ready to drink <span className="italic">differently</span>?
              </h2>
              <p className="font-sans text-lg text-forest/80 mb-8">
                Come visit us at Ocean Beach or Pacific Beach. We can't wait to make you a believer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/locations">
                  <Button 
                    size="lg"
                    className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6 group"
                  >
                    Find Our Stores
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/collections/all">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-8 py-6"
                  >
                    Shop Online
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;