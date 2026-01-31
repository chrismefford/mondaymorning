import { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import stringsEventImage from "@/assets/events/strings-jan-31.png";

const EventPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Event expires: January 31, 2026 at 7:00 PM PST (Los Angeles time)
    // PST is UTC-8, so 7PM PST = 3AM UTC on Feb 1
    const expirationDate = new Date("2026-02-01T03:00:00Z");
    const now = new Date();

    // Only show if before expiration and user hasn't dismissed in this session
    if (now < expirationDate) {
      const dismissed = sessionStorage.getItem("event-popup-dismissed");
      if (!dismissed) {
        // Small delay for better UX
        const timer = setTimeout(() => setIsOpen(true), 1500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("event-popup-dismissed", "true");
  };

  // Check if event has expired (don't render anything)
  const expirationDate = new Date("2026-02-01T03:00:00Z");
  if (new Date() >= expirationDate) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-md sm:max-w-lg overflow-hidden">
        <DialogClose className="absolute right-2 top-2 z-10 rounded-full bg-cream/90 p-1.5 opacity-90 hover:opacity-100 transition-opacity">
          <X className="h-5 w-5 text-forest" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <a 
          href="/locations" 
          onClick={handleClose}
          className="block cursor-pointer"
        >
          <img 
            src={stringsEventImage} 
            alt="The Strings - Dark Country Acoustic 4-Piece - January 31, 4:30-7:00 PM at 1854 Garnet Ave - No Cover"
            className="w-full h-auto rounded-lg"
          />
        </a>
      </DialogContent>
    </Dialog>
  );
};

export default EventPopup;
