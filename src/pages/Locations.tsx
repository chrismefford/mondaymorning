import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, Phone, ExternalLink, Wine, Beer, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import stampGold from "@/assets/stamp-gold.svg";
import textureBlue from "@/assets/texture-blue.svg";
import textureCream from "@/assets/texture-cream.svg";

const stores = [
  {
    name: "Pacific Beach",
    address: "1854 Garnet Ave.",
    city: "San Diego, CA 92109",
    hours: [
      { days: "Mon - Sat", time: "11 AM - 8 PM" },
      { days: "Sunday", time: "11 AM - 4 PM", special: true },
    ],
    phone: "(619) 555-0101",
    mapUrl: "https://maps.google.com/?q=1854+Garnet+Ave+San+Diego+CA+92109",
    image: "/images/beach-lifestyle.jpg",
  },
  {
    name: "Ocean Beach",
    address: "4967 Newport Ave",
    city: "San Diego, CA 92107",
    hours: [
      { days: "Mon - Sunday", time: "9 AM - 6 PM" },
      { days: "Wednesday", time: "Open until 8 PM", special: true },
    ],
    phone: "(619) 555-0102",
    mapUrl: "https://maps.google.com/?q=4967+Newport+Ave+San+Diego+CA+92107",
    image: "/images/beach-bonfire.jpg",
  },
];

const partners = [
  { name: "The Patio on Lamont", neighborhood: "Pacific Beach", type: "restaurant" },
  { name: "Wonderland Ocean Pub", neighborhood: "Ocean Beach", type: "bar" },
  { name: "OB Noodle House", neighborhood: "Ocean Beach", type: "restaurant" },
  { name: "The Joint", neighborhood: "Ocean Beach", type: "bar" },
  { name: "Waterbar", neighborhood: "Pacific Beach", type: "bar" },
  { name: "JRDN Restaurant", neighborhood: "Pacific Beach", type: "restaurant" },
  { name: "Pillbox Tavern", neighborhood: "Solana Beach", type: "bar" },
  { name: "Board & Brew", neighborhood: "Del Mar", type: "restaurant" },
  { name: "Raglan Public House", neighborhood: "Ocean Beach", type: "bar" },
  { name: "Grass Skirt Tiki Room", neighborhood: "Pacific Beach", type: "bar" },
  { name: "The Local", neighborhood: "Pacific Beach", type: "bar" },
  { name: "Wonderland Ocean Pub", neighborhood: "Ocean Beach", type: "bar" },
  { name: "Firehouse American Eatery", neighborhood: "Pacific Beach", type: "restaurant" },
  { name: "Oscars Mexican Seafood", neighborhood: "Pacific Beach", type: "restaurant" },
  { name: "South Beach Bar & Grille", neighborhood: "Ocean Beach", type: "bar" },
  { name: "Mike's Taco Club", neighborhood: "Ocean Beach", type: "restaurant" },
  { name: "Hodad's", neighborhood: "Ocean Beach", type: "restaurant" },
  { name: "Pizza Port", neighborhood: "Ocean Beach", type: "restaurant" },
  { name: "The Lafayette Hotel", neighborhood: "North Park", type: "restaurant" },
  { name: "Campfire", neighborhood: "Carlsbad", type: "restaurant" },
  { name: "Herb & Wood", neighborhood: "Little Italy", type: "restaurant" },
  { name: "Queenstown Public House", neighborhood: "Little Italy", type: "bar" },
  { name: "False Idol", neighborhood: "Little Italy", type: "bar" },
  { name: "Coin-Op Game Room", neighborhood: "North Park", type: "bar" },
  { name: "Tiger! Tiger!", neighborhood: "North Park", type: "bar" },
  { name: "Polite Provisions", neighborhood: "Normal Heights", type: "bar" },
  { name: "Soda & Swine", neighborhood: "Normal Heights", type: "restaurant" },
  { name: "Craft & Commerce", neighborhood: "Little Italy", type: "bar" },
  { name: "El Dorado Cocktail Lounge", neighborhood: "East Village", type: "bar" },
  { name: "Prohibition Lounge", neighborhood: "Gaslamp", type: "bar" },
];

const Locations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-forest py-20 lg:py-32 overflow-hidden">
          {/* Texture background */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${textureBlue})`, backgroundSize: 'cover' }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          
          {/* Decorative stamp */}
          <div className="absolute -bottom-20 -right-20 w-64 lg:w-96 opacity-[0.03] pointer-events-none">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
              Find Us
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6">
              Visit <span className="italic">Monday Morning</span>
            </h1>
            <p className="font-sans text-cream/70 max-w-2xl mx-auto text-lg">
              Stop by one of our two San Diego locations to explore 400+ flavors, or find us at your favorite local restaurant or bar.
            </p>
          </div>
        </section>

        {/* Our Stores Section */}
        <section className="py-16 lg:py-24 bg-cream relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-12 lg:mb-16">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
                Our Shops
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-forest">
                America's #1 <span className="italic">NA Bottle Shops</span>
              </h2>
              <p className="font-sans text-forest/70 max-w-xl mx-auto mt-4">
                Try before you buy at our tasting bars. 400+ flavors waiting for you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {stores.map((store) => (
                <div 
                  key={store.name}
                  className="bg-background border-2 border-forest/10 overflow-hidden group"
                >
                  {/* Store Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={store.image} 
                      alt={store.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
                    <h3 className="absolute bottom-6 left-6 font-serif text-3xl italic text-cream">
                      {store.name}
                    </h3>
                  </div>

                  {/* Store Details */}
                  <div className="p-6 lg:p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-sans text-sm font-semibold uppercase tracking-wide text-forest">
                          {store.address}
                        </p>
                        <p className="font-sans text-sm text-forest/70">
                          {store.city}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                      <div className="space-y-1">
                        {store.hours.map((h, i) => (
                          <p 
                            key={i}
                            className={`font-sans text-sm ${h.special ? 'text-gold font-semibold' : 'text-forest/70'}`}
                          >
                            {h.days}: {h.time}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                      <a 
                        href={`tel:${store.phone}`}
                        className="font-sans text-sm text-forest/70 hover:text-gold transition-colors"
                      >
                        {store.phone}
                      </a>
                    </div>

                    <a 
                      href={store.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button 
                        className="w-full font-sans text-xs font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep py-6 group/btn"
                      >
                        Get Directions
                        <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-16 lg:py-24 bg-forest relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${textureBlue})`, backgroundSize: 'cover' }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-12 lg:mb-16">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
                Partner Locations
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream">
                Find Us at <span className="italic">30+ Spots</span>
              </h2>
              <p className="font-sans text-cream/70 max-w-xl mx-auto mt-4">
                Enjoy Monday Morning drinks at these San Diego restaurants and bars.
              </p>
            </div>

            {/* Grid of partners */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className="bg-cream/5 border border-cream/10 p-5 hover:bg-cream/10 hover:border-gold/30 transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-sans text-sm font-semibold text-cream group-hover:text-gold transition-colors">
                        {partner.name}
                      </h3>
                      <p className="font-sans text-xs text-cream/50 mt-1">
                        {partner.neighborhood}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      {partner.type === "restaurant" ? (
                        <UtensilsCrossed className="h-4 w-4 text-gold/60" />
                      ) : partner.type === "bar" ? (
                        <Wine className="h-4 w-4 text-gold/60" />
                      ) : (
                        <Beer className="h-4 w-4 text-gold/60" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="font-sans text-sm text-cream/50">
                Want to carry Monday Morning at your establishment?{" "}
                <a href="mailto:wholesale@mondaymorning.com" className="text-gold hover:underline">
                  Contact our wholesale team
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gold relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              Can't visit in person?
            </h2>
            <p className="font-sans text-forest/70 mb-8 max-w-md mx-auto">
              Shop our curated collection online and get premium NA drinks delivered to your door.
            </p>
            <Button 
              size="lg"
              className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6"
            >
              Shop Online
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Locations;
