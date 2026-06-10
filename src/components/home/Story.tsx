import { Button } from "@/components/ui/button";
import { ArrowRight, Store, Building2, FlaskConical, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import zaneFounder from "@/assets/zane-founder.webp";
import stampGreen from "@/assets/stamp-green.svg";
import textureCream from "@/assets/texture-cream.webp";

const Story = () => {
  const pillars = [
    {
      icon: Store,
      title: "Retail",
      subtitle: "Bottle Shops & Tasting Rooms",
      description: "Our bottle shops let you try before you buy, so you leave with confidence, not a guess. 500+ options, free tastings, zero pressure.",
      href: "/locations",
    },
    {
      icon: Building2,
      title: "B2B",
      subtitle: "Distribution & Wholesale",
      description: "We help bars, restaurants and shops turn AF-curiosity into real demand, with curated product mixes and the data on what actually sells.",
      href: "/services",
    },
    {
      icon: FlaskConical,
      title: "Brewing",
      subtitle: "The Lab",
      description: "The Lab is our non-alcoholic brewing and innovation facility, building what's next in AF, from contract brewing to white-label partnerships.",
      href: "/services",
    },
  ];

  const stats = [
    { value: "61%", label: "of Gen Z are drinking less" },
    { value: "49%", label: "of Millennials are cutting back" },
    { value: "500+", label: "flavors to discover" },
  ];

  return (
    <section id="story" className="bg-cream relative overflow-hidden">
      {/* Organic texture background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${textureCream})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      {/* Background stamp watermark */}
      <div className="absolute top-0 right-0 w-[30rem] lg:w-[50rem] opacity-[0.03] pointer-events-none select-none translate-x-1/4 -translate-y-1/4">
        <img src={stampGreen} alt="" className="w-full h-full" />
      </div>

      {/* EDITORIAL FOUNDER STORY */}
      <div className="relative py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            {/* Founder image */}
            <div className="relative mb-12 lg:mb-0">
              <div className="aspect-[4/5] lg:aspect-auto lg:h-[460px] overflow-hidden border-2 border-forest">
                <img
                  src={zaneFounder}
                  alt="Zane Curtis, founder of Monday Morning, on a San Diego beach"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Offset accent block */}
              <div className="hidden lg:block absolute -bottom-5 -left-5 w-1/3 h-32 bg-gold z-[-1]" />
              {/* Pull-quote card */}
              <div className="absolute -bottom-8 left-4 right-4 lg:left-auto lg:right-8 lg:max-w-sm bg-teal-dark border-2 border-teal-dark p-6 shadow-brutal">
                <p className="font-serif text-lg lg:text-xl italic leading-relaxed text-cream">
                  "People aren't going alcohol-free because they want less. They want better."
                </p>
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-gold mt-3">
                  Zane Curtis · Founder &amp; CEO
                </p>
              </div>
            </div>

            {/* Copy */}
            <div className="mt-16 lg:mt-0">
              <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-5 block">
                Our Story · San Diego, Est. 2024
              </span>

              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1.02] mb-6">
                Built by a skeptic, <span className="font-script text-gold text-[1.2em] leading-none">for skeptics.</span>
              </h2>

              <div className="space-y-4 font-sans text-base lg:text-lg text-muted-foreground leading-relaxed">
                <p>
                  I'm Zane. I still love a good night out. I just got tired of paying for it the next morning. When I went looking for alcohol-free drinks that didn't taste like sad, flat juice, they barely existed. So I built the place I wished I'd had.
                </p>
                <p>
                  Monday Morning is San Diego's first non-alcoholic bottle shop and lounge. No lectures, no judgment, no wellness-influencer energy. Just <strong className="text-forest">500+ genuinely good drinks</strong> and a crew that gets it, whether you're sober, sober-curious, pregnant, training, or just done waking up feeling like garbage.
                </p>
                <p className="text-lg lg:text-xl font-medium text-forest">
                  Our favorite customers? The ones who don't believe us yet.
                </p>
              </div>

              {/* Locations line */}
              <div className="mt-8 flex items-start gap-3 text-forest">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-gold" />
                <p className="font-sans text-sm lg:text-base">
                  Two bottle shops in <strong>Pacific Beach</strong> &amp; <strong>Ocean Beach</strong>, plus <strong>The Lab</strong>, our NA brewing &amp; innovation facility in La Costa.
                </p>
              </div>

              <Link to="/about" className="inline-block mt-8">
                <Button
                  size="lg"
                  className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6 group"
                >
                  Read Our Full Story
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="py-12 lg:py-16 bg-gold text-forest relative">
        <div className="grain absolute inset-0 pointer-events-none opacity-30" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-8 lg:mb-12">
            <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-forest-deep mb-4 block">
              The Movement
            </span>
            <h3 className="font-serif text-2xl lg:text-4xl text-forest">
              You're in <span className="font-script text-forest-deep text-[1.2em] leading-none">good company</span>
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-4 lg:gap-8 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-serif text-3xl lg:text-6xl font-bold text-forest mb-2">
                  {stat.value}
                </div>
                <p className="font-sans text-[10px] lg:text-sm text-forest/60 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SIP, SIT, SHOP SECTION */}
      <div className="py-12 lg:py-16 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <span className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.3em] text-forest mb-4 block">
              What We Do
            </span>
            <h3 className="font-serif text-3xl lg:text-5xl leading-[1.1]">
              More than a <br className="hidden lg:block" />
              <span className="font-script text-gold text-[1.2em] leading-none">bottle shop</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {pillars.map((pillar, index) => {
              const IconComponent = pillar.icon;
              return (
                <Link
                  to={pillar.href}
                  key={pillar.title}
                  className="group text-center lg:text-left p-6 lg:p-8 border-2 border-forest/20 hover:border-gold hover:bg-gold/5 transition-all duration-300 block"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gold/20 border-2 border-gold mb-6 group-hover:bg-gold group-hover:scale-105 transition-all">
                    <IconComponent className="w-6 h-6 lg:w-8 lg:h-8 text-forest" />
                  </div>
                  <div className="font-sans text-[10px] lg:text-xs font-medium uppercase tracking-[0.2em] text-gold mb-2">
                    0{index + 1} · {pillar.subtitle}
                  </div>
                  <h4 className="font-serif text-2xl lg:text-3xl font-bold text-forest mb-3 flex items-center justify-center lg:justify-start gap-2">
                    {pillar.title}
                    <ArrowRight className="h-5 w-5 text-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </h4>
                  <p className="font-sans text-sm lg:text-base text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-12 lg:mt-16">
            <Link to="/locations">
              <Button
                size="lg"
                className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6 group"
              >
                Find a Location
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
