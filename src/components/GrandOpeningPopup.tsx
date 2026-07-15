import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Launch promo for The Lab grand opening. Appears once per browser session after
// a short delay, and stops showing on its own after the event day.
const TICKETS_URL =
  "https://www.eventbrite.com/e/craft-na-brewery-opening-monday-morning-tickets-1993155984203?aff=oddtdtcreator";
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
      <DialogContent className="brand-type p-0 gap-0 border-2 border-gold/50 bg-cream max-w-md overflow-hidden rounded-none shadow-2xl [&>button]:z-20 [&>button]:bg-cream/90 [&>button]:text-forest [&>button]:rounded-full [&>button]:p-1.5 [&>button]:opacity-100 [&>button>svg]:h-4 [&>button>svg]:w-4">
        <DialogTitle className="sr-only">Grand opening, Saturday July 18</DialogTitle>

        {/* Banner */}
        <div className="relative h-40 sm:h-44 overflow-hidden">
          <img
            src="/og-the-lab-opening-san-marcos.jpg"
            alt="The Lab, San Diego County's first non-alcoholic brewery, in San Marcos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-forest/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold mb-2">
              Grand Opening
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-cream leading-[1.1]">
              San Diego's first{" "}
              <span className="font-script text-gold text-[1.25em] leading-none">NA brewery</span> taproom
            </h2>
          </div>
        </div>

        {/* Details */}
        <div className="bg-cream text-forest px-6 py-7 text-center">
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
            href={TICKETS_URL}
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
