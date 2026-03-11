import { useState, useEffect } from "react";
import { X, Star, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import stampGold from "@/assets/stamp-gold.svg";

const FoundersClubPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Stop showing after April 30, 2026 at 11:59 PM PDT (UTC-7)
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
      <DialogContent className="p-0 border-2 border-gold/30 bg-transparent shadow-2xl max-w-md sm:max-w-lg overflow-hidden rounded-lg">
        <DialogClose className="absolute right-3 top-3 z-10 rounded-full bg-cream/90 p-1.5 opacity-90 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4 text-forest" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <div className="bg-gradient-to-br from-forest via-forest-dark to-forest text-cream p-8 sm:p-10 pt-10 text-center relative overflow-hidden">
          {/* Background decorative elements */}
          <Star className="absolute top-6 left-6 w-16 h-16 text-gold/10 fill-gold/10" />
          <Star className="absolute bottom-8 right-6 w-20 h-20 text-gold/10 fill-gold/10" />

          <img
            src={stampGold}
            alt=""
            className="w-16 h-16 mx-auto mb-4 opacity-80"
          />

          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold mb-2">
            Exclusive Membership
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl mb-3">
            Founders <span className="italic text-gold">Club</span>
          </h2>

          <p className="font-sans text-sm text-cream/70 mb-6 max-w-sm mx-auto leading-relaxed">
            Join San Diego's premier non-alcoholic social club. Exclusive tastings, discounts, events & more.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 mb-8 text-left max-w-sm mx-auto">
            {[
              "Monthly curated tastings",
              "10% off bottle shop",
              "Members-only events",
              "Birthday celebrations",
              "Flat-rate shipping",
              "Starting at $1,000/yr",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Star className="w-3 h-3 text-gold shrink-0 fill-gold" />
                <span className="font-sans text-xs text-cream/80">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <a href="/social-club" onClick={handleClose}>
              <Button
                size="lg"
                className="w-full bg-gold hover:bg-gold/90 text-forest font-sans text-xs font-semibold uppercase tracking-wider py-6"
              >
                Explore Membership
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <button
              onClick={handleClose}
              className="font-sans text-xs text-cream/50 hover:text-cream/80 transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoundersClubPopup;
