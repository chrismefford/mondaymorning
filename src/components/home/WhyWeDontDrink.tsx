import { useEffect, useState } from "react";
import stampGold from "@/assets/stamp-gold.svg";
import StorySubmissionForm from "./StorySubmissionForm";
import { supabase } from "@/integrations/supabase/client";

interface Story {
  id: string;
  text: string;
  author: string;
}

// Fallback stories when no approved stories exist
const fallbackReasons: Story[] = [
  { id: "1", text: "Hangovers were stealing my weekends.", author: "Mike, 34" },
  { id: "2", text: "I wanted to actually remember the concert.", author: "Jess, 28" },
  { id: "3", text: "My skin has never looked better.", author: "Taylor, 31" },
  { id: "4", text: "Training for a marathon. Still want to be social.", author: "Carlos, 29" },
  { id: "5", text: "Pregnant, not boring.", author: "Sarah, 32" },
  { id: "6", text: "Realized I was only drinking because everyone else was.", author: "Alex, 26" },
];

const WhyWeDontDrink = () => {
  const [stories, setStories] = useState<Story[]>(fallbackReasons);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Fetch approved stories from database
  useEffect(() => {
    const fetchStories = async () => {
      const { data, error } = await supabase
        .from('story_submissions')
        .select('id, text, author_name, author_location')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const formattedStories: Story[] = data.map((s) => ({
          id: s.id,
          text: s.text,
          author: s.author_location ? `${s.author_name}, ${s.author_location}` : s.author_name,
        }));
        setStories(formattedStories);
      }
    };
    
    fetchStories();
  }, []);

  // Auto-rotate through stories
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % stories.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [stories.length]);

  // Get visible cards (current + next few for carousel effect)
  const getVisibleReasons = () => {
    const visible = [];
    for (let i = 0; i < Math.min(5, stories.length); i++) {
      visible.push(stories[(activeIndex + i) % stories.length]);
    }
    return visible;
  };

  return (
    <section className="py-16 lg:py-32 bg-gold relative overflow-hidden">
      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Decorative stamp */}
      <div className="absolute top-10 right-10 w-32 lg:w-48 opacity-10 pointer-events-none rotate-12">
        <img src={stampGold} alt="" className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-forest-deep mb-4 block">
            Real Talk
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl xl:text-6xl text-forest leading-tight">
            Why we <span className="italic text-forest-deep">don't</span> drink
          </h2>
          <p className="font-sans text-sm lg:text-lg text-forest/60 mt-4 max-w-lg mx-auto">
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
              "{stories[activeIndex]?.text}"
            </p>
            <p className="font-sans text-sm text-forest/60">
              — {stories[activeIndex]?.author}
            </p>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {stories.slice(0, 6).map((_, i) => (
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
        <div className="hidden lg:block relative h-[500px] max-w-6xl mx-auto">
          {getVisibleReasons().map((reason, index) => {
            // Position cards in a centered scattered pattern
            const positions = [
              { left: "2%", top: "15%", rotate: "-6deg", scale: 1 },
              { left: "18%", top: "55%", rotate: "3deg", scale: 0.95 },
              { left: "38%", top: "8%", rotate: "-2deg", scale: 1.05 },
              { left: "55%", top: "50%", rotate: "5deg", scale: 0.9 },
              { left: "72%", top: "18%", rotate: "-4deg", scale: 1 },
            ];

            const pos = positions[index];
            const isCenter = index === 2;

            return (
              <div
                key={reason.id}
                className={`absolute w-64 bg-cream border-2 border-forest-deep p-6 shadow-brutal transition-all duration-700 hover:scale-105 hover:z-20 ${
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
          <p className="font-sans text-sm text-forest/50 mb-4">
            Got your own reason? We'd love to hear it.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-2 font-sans text-sm font-bold uppercase tracking-wider text-forest-deep border-b-2 border-forest-deep pb-1 hover:text-forest hover:border-forest transition-colors"
          >
            Share Your Story
            <span className="text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Story Submission Form Modal */}
      <StorySubmissionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Decorative blurs */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-forest/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-terracotta/10 blur-3xl pointer-events-none" />
    </section>
  );
};

export default WhyWeDontDrink;
