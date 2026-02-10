import { useState, useEffect } from "react";
import { X, Heart, ArrowRight, Wine, Gift, Camera, UtensilsCrossed, Film } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ValentinePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Event is Feb 12, 2026 — stop showing after that
    const expirationDate = new Date("2026-02-13T03:00:00Z");
    const now = new Date();

    if (now < expirationDate) {
      const dismissed = sessionStorage.getItem("valentine-popup-dismissed");
      if (!dismissed) {
        const timer = setTimeout(() => setIsOpen(true), 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("valentine-popup-dismissed", "true");
  };

  const expirationDate = new Date("2026-02-13T03:00:00Z");
  if (new Date() >= expirationDate) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="p-0 border-2 border-rose-300 bg-transparent shadow-2xl max-w-md sm:max-w-lg overflow-hidden rounded-lg">
        <DialogClose className="absolute right-3 top-3 z-10 rounded-full bg-cream/90 p-1.5 opacity-90 hover:opacity-100 transition-opacity">
          <X className="h-4 w-4 text-forest" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {/* Content */}
        <div className="bg-gradient-to-br from-rose-900 via-rose-800 to-forest text-cream p-8 sm:p-10 pt-10 text-center relative overflow-hidden">
          {/* Background hearts */}
          <Heart className="absolute top-4 left-4 w-20 h-20 text-rose-400/10 fill-rose-400/10" />
          <Heart className="absolute bottom-6 right-4 w-24 h-24 text-rose-400/10 fill-rose-400/10" />

          <Heart className="w-12 h-12 text-rose-300 fill-rose-300 mx-auto mb-4 animate-pulse" />

          <p className="font-sans text-xs uppercase tracking-[0.25em] text-rose-300 mb-2">
            Valentine's Event · February 12th
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl mb-3">
            Sips & <span className="italic text-rose-300">Sweethearts</span>
          </h2>

          <p className="font-sans text-sm text-cream/70 mb-6 max-w-sm mx-auto leading-relaxed">
            The perfect date night — no hangover required.
          </p>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-3 mb-8 text-left max-w-sm mx-auto">
            {[
              { icon: Wine, label: "Cocktail making class" },
              { icon: Gift, label: "Chocolate truffle pairing" },
              { icon: UtensilsCrossed, label: "Charcuterie for two" },
              { icon: Camera, label: "Couples love portraits" },
              { icon: Film, label: "Cozy movie screening" },
              { icon: Heart, label: "$60 per couple" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-rose-300 shrink-0" />
                <span className="font-sans text-xs text-cream/80">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <a href="/valentines" onClick={handleClose}>
              <Button
                size="lg"
                className="w-full bg-rose-500 hover:bg-rose-400 text-cream font-sans text-xs font-semibold uppercase tracking-wider py-6"
              >
                Learn More & Get Tickets
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

export default ValentinePopup;
