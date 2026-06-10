import { useState } from "react";
import stampGold from "@/assets/stamp-gold.svg";
import worldMap from "@/assets/brand/world-map-forest.png";
import StorySubmissionForm from "./StorySubmissionForm";

interface Reason {
  id: string;
  text: string;
  author: string;
}

// Real reasons, summarized from our Google reviews (kept distinct from the
// verbatim quotes in the Testimonials section). Named entries map to real
// reviewers; "Google review" entries are paraphrased from real un-named reviews.
const reasons: Reason[] = [
  { id: "1", text: "Changed my whole relationship with going out. I actually look forward to a night sober now.", author: "Michael S. · Pacific Beach" },
  { id: "2", text: "Turns out the good stuff doesn't have to come with a hangover.", author: "Google review" },
  { id: "3", text: "Sober, but I still want something real in my hand. No risk, no rough morning.", author: "Google review" },
  { id: "4", text: "Finally, a place that gets it. No judgment, just better options.", author: "Sarah M. · Ocean Beach" },
  { id: "5", text: "Zane found me drinks I actually enjoy. Didn't think that was possible.", author: "Jeff L. · San Diego" },
];

const WhyWeDontDrink = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="py-12 lg:py-16 bg-gold relative overflow-hidden">
      {/* Hand-drawn world map watermark - breaks up the gold, on-brand */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <img
          src={worldMap}
          alt=""
          className="w-[112%] max-w-none opacity-[0.13] mix-blend-multiply"
        />
      </div>

      {/* Grain overlay */}
      <div className="grain absolute inset-0 pointer-events-none" />

      {/* Decorative stamp */}
      <div className="absolute top-10 right-10 w-32 lg:w-48 opacity-10 pointer-events-none rotate-12">
        <img src={stampGold} alt="" className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-forest-deep mb-4 block">
            Real Talk
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl xl:text-6xl text-forest leading-tight">
            Why we <span className="font-script text-forest-deep text-[1.2em] leading-none">don't</span> drink
          </h2>
          <p className="font-sans text-sm lg:text-lg text-forest/60 mt-4 max-w-lg mx-auto">
            No judgment, just better options. Everyone's got their reason, find your version of AF. Here's what our community is saying.
          </p>
        </div>

        {/* Soft, typographic quotes - spread across a grid (keeps the section short) */}
        <div className="max-w-6xl mx-auto grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <blockquote key={reason.id} className="text-center sm:text-left">
              <span className="block text-xl text-forest-deep/30 mb-2 select-none" aria-hidden="true">✦</span>
              <p className="font-serif italic text-forest-deep text-xl lg:text-2xl leading-snug mb-3">
                “{reason.text}”
              </p>
              <p className="font-sans text-[11px] uppercase tracking-[0.22em] text-forest/55">
                {reason.author}
              </p>
            </blockquote>
          ))}
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
