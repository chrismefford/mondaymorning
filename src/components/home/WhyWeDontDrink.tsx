import { useEffect, useState } from "react";
import stampGold from "@/assets/stamp-gold.svg";

const reasons = [
  {
    id: 1,
    text: "Hangovers were stealing my weekends.",
    author: "Mike, 34",
  },
  {
    id: 2,
    text: "I wanted to actually remember the concert.",
    author: "Jess, 28",
  },
  {
    id: 3,
    text: "My skin has never looked better.",
    author: "Taylor, 31",
  },
  {
    id: 4,
    text: "Training for a marathon. Still want to be social.",
    author: "Carlos, 29",
  },
  {
    id: 5,
    text: "Pregnant, not boring.",
    author: "Sarah, 32",
  },
  {
    id: 6,
    text: "Realized I was only drinking because everyone else was.",
    author: "Alex, 26",
  },
  {
    id: 7,
    text: "5am gym sessions hit different when you're not hungover.",
    author: "Jordan, 30",
  },
  {
    id: 8,
    text: "I like who I am sober. Turns out, so does everyone else.",
    author: "Nina, 27",
  },
  {
    id: 9,
    text: "My wallet thanked me. Then my liver did too.",
    author: "Chris, 35",
  },
  {
    id: 10,
    text: "Sober driver = free tacos. Always.",
    author: "Priya, 24",
  },
  {
    id: 11,
    text: "Anxiety said 'bye bye' when alcohol did.",
    author: "Marcus, 33",
  },
  {
    id: 12,
    text: "I'm the designated driver. Might as well enjoy something good.",
    author: "Elena, 29",
  },
];

const WhyWeDontDrink = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate through reasons
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % reasons.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Get visible cards (current + next few for carousel effect)
  const getVisibleReasons = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      visible.push(reasons[(activeIndex + i) % reasons.length]);
    }
    return visible;
  };

  return (
    <section className="py-16 lg:py-32 bg-forest relative overflow-hidden">
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Decorative stamp */}
      <div className="absolute top-10 right-10 w-32 lg:w-48 opacity-10 pointer-events-none rotate-12">
        <img src={stampGold} alt="" className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
            Real Talk
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl xl:text-6xl text-cream leading-tight">
            Why we <span className="italic text-gold">don't</span> drink
          </h2>
          <p className="font-sans text-sm lg:text-lg text-cream/60 mt-4 max-w-lg mx-auto">
            Everyone's got their reason. Here's what our community is saying.
          </p>
        </div>

        {/* MOBILE: Single rotating card */}
        <div className="lg:hidden">
          <div
            className={`bg-cream border-2 border-forest-deep p-6 shadow-brutal transition-all duration-300 ${
              isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <p className="font-serif text-xl italic text-forest leading-relaxed mb-4">
              "{reasons[activeIndex].text}"
            </p>
            <p className="font-sans text-sm text-forest/60">
              — {reasons[activeIndex].author}
            </p>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {reasons.slice(0, 6).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeIndex % 6 === i ? "bg-gold w-6" : "bg-cream/30"
                }`}
                aria-label={`Go to reason ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP: Scattered rotating cards */}
        <div className="hidden lg:block relative h-[500px]">
          {getVisibleReasons().map((reason, index) => {
            // Position cards in a scattered pattern
            const positions = [
              { left: "5%", top: "10%", rotate: "-6deg", scale: 1 },
              { left: "25%", top: "50%", rotate: "3deg", scale: 0.95 },
              { left: "45%", top: "5%", rotate: "-2deg", scale: 1.05 },
              { left: "65%", top: "45%", rotate: "5deg", scale: 0.9 },
              { left: "80%", top: "15%", rotate: "-4deg", scale: 1 },
            ];

            const pos = positions[index];
            const isCenter = index === 2;

            return (
              <div
                key={reason.id}
                className={`absolute w-72 bg-cream border-2 border-forest-deep p-6 shadow-brutal transition-all duration-700 hover:scale-105 hover:z-20 ${
                  isCenter ? "z-10" : "z-0"
                }`}
                style={{
                  left: pos.left,
                  top: pos.top,
                  transform: `rotate(${pos.rotate}) scale(${pos.scale})`,
                }}
              >
                <p className="font-serif text-lg italic text-forest leading-relaxed mb-3">
                  "{reason.text}"
                </p>
                <p className="font-sans text-sm text-forest/60">
                  — {reason.author}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 lg:mt-8">
          <p className="font-sans text-sm text-cream/50 mb-4">
            Got your own reason? We'd love to hear it.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-wider text-gold border-b-2 border-gold pb-1 hover:text-cream hover:border-cream transition-colors"
          >
            Share Your Story
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>

      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gold/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-terracotta/10 blur-3xl pointer-events-none" />
    </section>
  );
};

export default WhyWeDontDrink;
