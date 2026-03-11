import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import foundersLogo from "@/assets/founders-club-logo.png";

const benefits = [
  "Private tasting nights with rare bottles",
  "Host your own bar buyout event",
  "Dinners with industry leaders",
  "10% off every purchase, always",
  "Complimentary Kava Haven slushies monthly",
  "Exclusive product launches before anyone else",
];

const FoundersClubPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const expirationDate = new Date("2026-05-01T06:59:00Z");
    const now = new Date();

    if (now < expirationDate) {
      const dismissed = sessionStorage.getItem("founders-club-popup-dismissed");
      if (!dismissed) {
        const timer = setTimeout(() => setIsOpen(true), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("founders-club-popup-dismissed", "true");
  };

  const expirationDate = new Date("2026-05-01T06:59:00Z");
  if (new Date() >= expirationDate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-2xl max-w-md sm:max-w-lg overflow-hidden rounded-none">
        <DialogClose className="absolute right-3 top-3 z-10 rounded-full bg-cream/90 p-1.5 opacity-90 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4 text-forest" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="relative overflow-hidden">
          {/* Gold border frame */}
          <div className="absolute inset-0 border-2 border-gold/40 pointer-events-none z-10" />
          <div className="absolute inset-[6px] border border-gold/20 pointer-events-none z-10" />

          {/* Main content */}
          <div className="bg-cream text-forest relative">
            {/* Linen texture overlay */}
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 2px,
                  hsl(40 20% 80% / 0.3) 2px,
                  hsl(40 20% 80% / 0.3) 3px
                )`,
              }}
            />

            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

            <div className="px-8 sm:px-10 pt-8 pb-4 text-center relative">
              <img
                src={foundersLogo}
                alt=""
                className="w-20 h-20 mx-auto mb-4 opacity-90"
              />

              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-forest-light mb-2 font-semibold">
                Only 130 founding spots
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl text-forest mb-2 leading-[1.15]">
                The Founder's Club
              </h2>

              <p className="font-sans text-sm text-forest/60 max-w-xs mx-auto leading-relaxed">
                A private collective for the people shaping San Diego's alcohol-free culture.
              </p>
            </div>

            {/* Benefits section */}
            <div className="px-8 sm:px-10 pb-6 relative">
              <div className="border-t border-forest/10 pt-5">
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-forest-light mb-4 text-center font-semibold">
                  What you get as a founder
                </p>
                <div className="space-y-2.5 max-w-sm mx-auto">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-gold text-base mt-0.5 leading-none font-serif italic shrink-0">+</span>
                      <span className="font-sans text-sm text-forest/80 leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA section */}
            <div className="px-8 sm:px-10 pb-8 relative">
              <div className="flex flex-col gap-3">
                <a href="/social-club" onClick={handleClose}>
                  <Button
                    size="lg"
                    className="w-full bg-forest hover:bg-forest-deep text-cream font-sans text-xs font-semibold uppercase tracking-wider py-6 rounded-none border border-forest"
                  >
                    Claim Your Founding Spot
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <p className="text-center font-sans text-xs text-forest/50">
                  Starting at $1,000/yr. Spots are filling up.
                </p>
                <button
                  onClick={handleClose}
                  className="font-sans text-xs text-forest/30 hover:text-forest/60 transition-colors"
                >
                  Maybe later
                </button>
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoundersClubPopup;
