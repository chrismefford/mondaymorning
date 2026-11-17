import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THANKSGIVING_2026, isThanksgivingOpen } from "@/data/promos";
import pumpkinPhoto from "@/assets/thanksgiving/pumpkin-elixir.jpg";

// Home-page promo band for the Thanksgiving pre-order. Renders nothing after the
// order cutoff (src/data/promos.ts), so it never needs manual removal.
const ThanksgivingBanner = () => {
  if (!isThanksgivingOpen()) return null;

  return (
    <section className="brand-type relative overflow-hidden bg-terracotta text-cream">
      <div className="grain absolute inset-0 pointer-events-none opacity-40" />
      <div className="relative z-10 mx-auto max-w-6xl grid md:grid-cols-[1.2fr_1fr] items-stretch">
        <div className="px-6 py-10 md:py-14 md:pr-10 flex flex-col justify-center">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-gold">
            Thanksgiving pre-order · Limited run
          </p>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl leading-[1.05]">
            Thanksgiving, <span className="font-script text-gold">bottled.</span>
          </h2>
          <p className="mt-4 max-w-md font-sans text-sm md:text-base text-cream/85 leading-relaxed">
            Seven zero-proof Vibations by the bottle, batched by hand for the table. Order by{" "}
            {THANKSGIVING_2026.orderBy}, pick up {THANKSGIVING_2026.pickupDay} in Pacific Beach.
          </p>
          <div className="mt-7">
            <a href={THANKSGIVING_2026.path}>
              <Button
                size="lg"
                className="bg-cream text-forest-deep hover:bg-cream/90 font-sans text-sm font-bold uppercase tracking-widest px-8 py-6"
              >
                See the bottles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
        <div className="relative min-h-[200px] md:min-h-0">
          <img
            src={pumpkinPhoto}
            alt="Warm drinks in pumpkin mugs by a fireplace"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ThanksgivingBanner;
