import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import haymaker from "@/assets/brand/haymaker-can.webp";

// Launch promo for The Lab grand opening. Appears once per browser session after
// a short delay, and stops showing on its own after the event day.
const EXPIRES = new Date("2026-07-19T07:00:00Z"); // approx midnight PT after July 18

const GrandOpeningPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (new Date() >= EXPIRES) return;
    if (sessionStorage.getItem("grand-opening-popup-dismissed")) return;
    const timer = setTimeout(() => setIsOpen(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    sessionStorage.setItem("grand-opening-popup-dismissed", "true");
  };

  if (new Date() >= EXPIRES) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(o) => !o && close()}>
      <DialogContent className="brand-type p-0 gap-0 border-2 border-gold/50 bg-cream max-w-md max-h-[92vh] overflow-y-auto rounded-none shadow-2xl [&>button]:z-20 [&>button]:bg-cream/90 [&>button]:text-forest [&>button]:rounded-full [&>button]:p-1.5 [&>button]:opacity-100 [&>button>svg]:h-4 [&>button>svg]:w-4">
        <DialogTitle className="sr-only">Grand opening, Saturday July 18</DialogTitle>

        {/* Haymaker NA IPA artwork, shown clean as the hero */}
        <img
          src={haymaker}
          alt="Haymaker NA IPA, the flagship brew from The Lab by Monday Morning"
          className="w-full h-auto block"
        />

        {/* Event details */}
        <div className="bg-cream text-forest px-6 py-7 text-center">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold block mb-2">
            Grand Opening
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl leading-[1.1] mb-5">
            San Diego's first{" "}
            <span className="font-script text-gold text-[1.25em] leading-none">NA brewery</span> taproom
          </h2>
          <div className="space-y-2.5 mb-5">
            <p className="font-sans text-sm font-semibold flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4 text-gold shrink-0" /> Saturday, July 18, 2026
            </p>
            <p className="font-sans text-sm font-semibold flex items-center justify-center gap-2">
              <Clock className="h-4 w-4 text-gold shrink-0" /> 11 AM to 6 PM
            </p>
            <p className="font-sans text-sm font-semibold flex items-center justify-center gap-2">
              <MapPin className="h-4 w-4 text-gold shrink-0" /> The Lab, San Marcos
            </p>
          </div>
          <p className="font-sans text-sm text-forest/70 leading-relaxed mb-6 max-w-xs mx-auto">
            Live music, games, food, and a bounce house from 12 to 3 PM. Come see where the NA beer gets made.
          </p>
          <a
            href="/grandopening"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest-deep text-cream font-sans text-sm font-bold uppercase tracking-widest px-8 py-4 transition-colors"
          >
            Get tickets <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GrandOpeningPopup;
