import { Helmet } from "@/lib/helmet-compat";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { MapPin, ExternalLink, Wine, Beer, UtensilsCrossed, Store, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import stampGold from "@/assets/stamp-gold.svg";
import textureBlue from "@/assets/texture-blue.webp";
import textureCream from "@/assets/texture-cream.webp";
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  getCanonicalUrl,
  localBusinessSchema
} from "@/lib/seo";
import { OWNED_LOCATIONS } from "@/data/locations";

// Partner venues that carry Monday Morning, pulled from our Shopify B2B
// company accounts (holding companies flattened to their actual venues).
const partners = [
  { name: "Boney's Bayside Market", address: "155 Orange Ave, Coronado, CA 92118", neighborhood: "Coronado", type: "market" },
  { name: "Heights Market", address: "3355 Adams Ave, San Diego, CA 92116", neighborhood: "Normal Heights", type: "market" },
  { name: "Catch Brewing", address: "7889 Ostrow St, San Diego, CA 92111", neighborhood: "Kearny Mesa", type: "brewery" },
  { name: "Collins & Coupe", address: "2876 El Cajon Blvd #100, San Diego, CA 92104", neighborhood: "North Park", type: "bar" },
  { name: "Good News Bar", address: "3821 Park Blvd, San Diego, CA 92103", neighborhood: "University Heights", type: "bar" },
  { name: "Polished Pigeon", address: "1450 Market St, San Diego, CA 92101", neighborhood: "East Village", type: "bar" },
  { name: "Miss B's Coconut Club", address: "3704 Mission Blvd, San Diego, CA 92109", neighborhood: "Mission Beach", type: "bar" },
  { name: "Coco Maya by Miss B's", address: "1660 India St, San Diego, CA 92101", neighborhood: "Little Italy", type: "bar" },
  { name: "PRK101", address: "3040 Carlsbad Blvd, Carlsbad, CA 92008", neighborhood: "Carlsbad", type: "bar" },
  { name: "Louisiana Purchase", address: "2305 University Ave, San Diego, CA 92104", neighborhood: "North Park", type: "restaurant" },
  { name: "The Lobby Tiki", address: "408 Pier View Way, Oceanside, CA 92054", neighborhood: "Oceanside", type: "bar" },
  { name: "Cocoacabana", address: "408 Pier View Wy Ste 401, Oceanside, CA 92054", neighborhood: "Oceanside", type: "bar" },
  { name: "Queenstown Village", address: "1044 Wall St, La Jolla, CA 92037", neighborhood: "La Jolla", type: "restaurant" },
  { name: "Queenstown Public House", address: "1557 Columbia St, San Diego, CA 92101", neighborhood: "Little Italy", type: "bar" },
  { name: "Raglan House", address: "1851 Bacon St, San Diego, CA 92107", neighborhood: "Ocean Beach", type: "bar" },
  { name: "Bare Back Grill", address: "4640 Mission Blvd, San Diego, CA 92109", neighborhood: "Pacific Beach", type: "restaurant" },
  { name: "Maya Moon", address: "3349 Adams Ave, San Diego, CA 92116", neighborhood: "Normal Heights", type: "restaurant" },
  { name: "Paradisaea", address: "5680 La Jolla Blvd, La Jolla, CA 92037", neighborhood: "Bird Rock", type: "restaurant" },
  { name: "The Lodge at Torrey Pines", address: "11480 N Torrey Pines Rd, La Jolla, CA 92037", neighborhood: "La Jolla", type: "restaurant" },
];

const Locations = () => {
  const pageTitle = "Visit Monday Morning: NA Bottle Shops & Brewery in San Diego | Locations";
  const pageDescription = "Find Monday Morning across San Diego: our Pacific Beach and Ocean Beach non-alcoholic bottle shops, plus The Lab, California's first NA brewery and tasting room, born in San Diego, now in San Marcos.";
  const canonicalUrl = getCanonicalUrl("/locations");

  return (
    <div className="min-h-screen bg-background brand-type">
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
        <section className="relative pt-28 lg:pt-32 pb-14 lg:pb-20 overflow-hidden">
          {/* Texture background */}
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />

          {/* Decorative stamp */}
          <div className="absolute -bottom-20 -right-20 w-64 lg:w-96 opacity-[0.06] pointer-events-none">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
              Find Us
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest mb-6">
              Visit <span className="font-script text-gold text-[1.15em] leading-none">Monday Morning</span>
            </h1>
            <p className="font-sans text-muted-foreground max-w-2xl mx-auto text-lg">
              Stop by one of our locations to explore 500+ flavors, or find us at your favorite local restaurant or bar.
            </p>
          </div>
        </section>

        {/* Our Stores Section */}
        <section className="pb-12 lg:pb-16 bg-cream relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {OWNED_LOCATIONS.map((loc) => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className="group block bg-background border-2 border-forest/10 overflow-hidden hover:border-gold/40 transition-colors"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={loc.image}
                      alt={loc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold block mb-1">
                        {loc.area}
                      </span>
                      <h3 className="font-script text-3xl text-cream leading-none">{loc.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="font-sans text-sm text-forest/75 leading-relaxed mb-4">{loc.tagline}</p>
                    <div className="flex items-start gap-2 mb-5">
                      <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                      <p className="font-sans text-xs text-forest/70">{loc.streetAddress}, {loc.locality}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-widest text-forest group-hover:gap-2 transition-all">
                      View this location <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-12 lg:py-16 bg-forest relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${textureBlue})`, backgroundSize: 'cover' }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-8 lg:mb-12">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
                Partner Locations
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream">
                Find Us at <span className="font-script text-gold text-[1.2em] leading-none">{partners.length}+ Spots</span>
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
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${partner.name}, ${partner.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cream/5 border border-cream/10 p-5 hover:bg-cream/10 hover:border-gold/30 transition-all group block"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-base font-semibold text-cream group-hover:text-gold transition-colors">
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
                      ) : partner.type === "market" ? (
                        <Store className="h-4 w-4 text-gold/60" />
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
        <section className="py-12 lg:py-16 bg-gold relative overflow-hidden">
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
