import { Helmet } from "@/lib/helmet-compat";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, Clock, Phone, ExternalLink, Wine, Beer, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import stampGold from "@/assets/stamp-gold.svg";
import textureBlue from "@/assets/texture-blue.svg";
import textureCream from "@/assets/texture-cream.svg";
import { 
  SITE_NAME, 
  SITE_URL, 
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  getCanonicalUrl,
  localBusinessSchema
} from "@/lib/seo";

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
    image: "/images/pacific-beach-location.jpg",
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
    image: "/images/ocean-beach-location.jpg",
  },
];

const partners = [
  { 
    name: "Fall Brewing Company", 
    address: "4542 30th St, San Diego, CA 92116",
    neighborhood: "North Park", 
    type: "brewery",
    mapUrl: "https://www.google.com/maps/place/Fall+Brewing+Company/@32.760023,-117.1304411,17z/"
  },
  { 
    name: "Selva Coffee House", 
    address: "3535 Camino del Rio W, San Diego, CA 92110",
    neighborhood: "Mission Valley", 
    type: "restaurant",
    mapUrl: "https://www.google.com/maps/place/Selva+Coffee+House/@32.7562493,-117.2042902,17z/"
  },
  { 
    name: "Maya Moon Collective", 
    address: "3349 Adams Ave, San Diego, CA 92116",
    neighborhood: "Normal Heights", 
    type: "restaurant",
    mapUrl: "https://www.google.com/maps/place/Maya+Moon+Collective/@32.7655,-117.1283,17z/"
  },
  { 
    name: "Moniker General", 
    address: "2860 Sims Rd, San Diego, CA 92106",
    neighborhood: "Liberty Station", 
    type: "restaurant",
    mapUrl: "https://www.google.com/maps/place/Moniker+General/@32.7428,-117.2108,17z/"
  },
  { 
    name: "Boney's Bayside Market", 
    address: "155 Orange Ave, Coronado, CA 92118",
    neighborhood: "Coronado", 
    type: "restaurant",
    mapUrl: "https://www.google.com/maps/place/Boney's+Bayside+Market/@32.6855,-117.1765,17z/"
  },
  { 
    name: "Collins & Coupe", 
    address: "2876 El Cajon Blvd #100, San Diego, CA 92104",
    neighborhood: "North Park", 
    type: "bar",
    mapUrl: "https://www.google.com/maps/place/Collins+%26+Coupe/@32.7476,-117.1272,17z/"
  },
  { 
    name: "Miss B's Coconut Club", 
    address: "3704 Mission Blvd, San Diego, CA 92109",
    neighborhood: "Mission Beach", 
    type: "bar",
    mapUrl: "https://www.google.com/maps/place/Miss+B's+Coconut+Club/@32.7892,-117.2539,17z/"
  },
  { 
    name: "Park 101", 
    address: "3040 Carlsbad Blvd, Carlsbad, CA 92008",
    neighborhood: "Carlsbad", 
    type: "bar",
    mapUrl: "https://www.google.com/maps/place/PRK101/@33.1252,-117.3389,17z/"
  },
  { 
    name: "Louisiana Purchase", 
    address: "2305 University Ave, San Diego, CA 92104",
    neighborhood: "North Park", 
    type: "restaurant",
    mapUrl: "https://www.google.com/maps/place/Louisiana+Purchase/@32.7497,-117.1291,17z/"
  },
  { 
    name: "Coco Maya by Miss B's", 
    address: "1660 India St, San Diego, CA 92101",
    neighborhood: "Little Italy", 
    type: "bar",
    mapUrl: "https://www.google.com/maps/place/Coco+Maya+by+Miss+B's/@32.7225,-117.1686,17z/"
  },
  { 
    name: "The Lobby Tiki Bar", 
    address: "408 Pier View Wy, Oceanside, CA 92054",
    neighborhood: "Oceanside", 
    type: "bar",
    mapUrl: "https://www.google.com/maps/place/The+Lobby+Tiki+Bar/@33.1954,-117.3795,17z/"
  },
  { 
    name: "Cococabana", 
    address: "408 Pier View Wy Suite 401, Oceanside, CA 92054",
    neighborhood: "Oceanside", 
    type: "bar",
    mapUrl: "https://www.google.com/maps/place/Cococabana/@33.1954,-117.3795,17z/"
  },
  { 
    name: "Dunedin New Zealand Eats", 
    address: "3501 30th St, San Diego, CA 92104",
    neighborhood: "North Park", 
    type: "restaurant",
    mapUrl: "https://www.google.com/maps/place/Dunedin+New+Zealand+Eats/@32.7506,-117.1298,17z/"
  },
  { 
    name: "Queenstown Public House", 
    address: "1557 Columbia St, San Diego, CA 92101",
    neighborhood: "Little Italy", 
    type: "bar",
    mapUrl: "https://www.google.com/maps/place/Queenstown+Public+House/@32.7206,-117.1686,17z/"
  },
  { 
    name: "Bare Back Grill", 
    address: "4640 Mission Blvd, San Diego, CA 92109",
    neighborhood: "Pacific Beach", 
    type: "restaurant",
    mapUrl: "https://www.google.com/maps/place/Bare+Back+Grill/@32.7935,-117.2535,17z/"
  },
  { 
    name: "Raglan Public House", 
    address: "1851 Bacon St, San Diego, CA 92107",
    neighborhood: "Ocean Beach", 
    type: "bar",
    mapUrl: "https://www.google.com/maps/place/Raglan+Public+House/@32.7486,-117.2502,17z/"
  },
  { 
    name: "Queenstown Village", 
    address: "1044 Wall St, La Jolla, CA 92037",
    neighborhood: "La Jolla", 
    type: "restaurant",
    mapUrl: "https://www.google.com/maps/place/Queenstown+Village/@32.8489,-117.2739,17z/"
  },
];

const Locations = () => {
  const pageTitle = "Store Locations | Monday Morning Bottle Shop";
  const pageDescription = "Visit Monday Morning's NA bottle shops in Pacific Beach & Ocean Beach, San Diego. Try 500+ non-alcoholic drinks before you buy. Plus find us at 17+ partner bars and restaurants.";
  const canonicalUrl = getCanonicalUrl("/locations");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:site_name" content={SITE_NAME} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        
        {/* JSON-LD - Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>
      
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
              Stop by one of our two San Diego locations to explore 500+ flavors, or find us at your favorite local restaurant or bar.
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
                Try before you buy at our tasting bars. 500+ flavors waiting for you.
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

                    <div className="flex items-start gap-4 mb-8">
                      <Phone className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                      <a 
                        href={`tel:${store.phone}`}
                        className="font-sans text-sm text-forest/70 hover:text-gold transition-colors"
                      >
                        {store.phone}
                      </a>
                    </div>

                    <a 
                      className="block mt-6"
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
                Find Us at <span className="italic">{partners.length}+ Spots</span>
              </h2>
              <p className="font-sans text-cream/70 max-w-xl mx-auto mt-4">
                Enjoy Monday Morning drinks at these San Diego restaurants and bars.
              </p>
            </div>

            {/* Grid of partners */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((partner, index) => (
                <a 
                  key={index}
                  href={partner.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cream/5 border border-cream/10 p-5 hover:bg-cream/10 hover:border-gold/30 transition-all group block"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-sans text-sm font-semibold text-cream group-hover:text-gold transition-colors">
                        {partner.name}
                      </h3>
                      <p className="font-sans text-xs text-cream/70 mt-1">
                        {partner.address}
                      </p>
                      <p className="font-sans text-xs text-cream/50 mt-1">
                        {partner.neighborhood}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                      {partner.type === "restaurant" ? (
                        <UtensilsCrossed className="h-4 w-4 text-gold/60" />
                      ) : partner.type === "bar" ? (
                        <Wine className="h-4 w-4 text-gold/60" />
                      ) : (
                        <Beer className="h-4 w-4 text-gold/60" />
                      )}
                      <ExternalLink className="h-3 w-3 text-cream/30 group-hover:text-gold transition-colors" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="font-sans text-sm text-cream/50">
                Want to carry Monday Morning at your establishment?{" "}
                <Link to="/services" className="text-gold hover:underline">
                  Contact our wholesale team
                </Link>
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
            <Link to="/shop">
              <Button 
                size="lg"
                className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6"
              >
                Shop Online
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Locations;
