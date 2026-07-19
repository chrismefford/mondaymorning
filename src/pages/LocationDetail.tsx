import { useMemo } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "@/lib/helmet-compat";
import { MapPin, Clock, Phone, ExternalLink, Check, ArrowRight, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/home/ProductCard";
import { useLocationProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import { useLocationHours } from "@/hooks/useLocationHours";
import { SITE_NAME, SITE_URL, TWITTER_HANDLE, getCanonicalUrl } from "@/lib/seo";
import { getLocation, locationSchema, OWNED_LOCATIONS } from "@/data/locations";

// Live "shop what's in stock at this store" grid. Reads per-location Shopify
// inventory via the location-products edge function. Self-hides on error or
// empty so the page stays clean; checkout is unchanged (the normal cart/shop).
const LocationShop = ({ slug, name }: { slug: string; name: string }) => {
  const { data, isLoading, error } = useLocationProducts(slug);
  const products = useMemo(() => (data ?? []).map(shopifyToLocalProduct), [data]);

  if (error) return null;
  if (!isLoading && products.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 bg-white border-t border-forest/10">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-2 block">
              On the shelf now
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl text-forest leading-none">
              Shop <span className="font-script text-gold text-[1.15em] leading-none">{name}</span>
            </h2>
            {!isLoading && (
              <p className="font-sans text-sm text-forest/60 mt-2">
                {products.length} non-alcoholic drinks in stock at this store right now
              </p>
            )}
          </div>
          <Link
            to="/shop"
            className="shrink-0 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors border-b-2 border-current pb-1"
          >
            Shop all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[3/4] rounded-xl bg-sand animate-pulse border border-forest/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.slice(0, 12).map((p) => (
              <div key={p.id} className="bg-cream rounded-xl overflow-hidden border border-forest/10">
                <ProductCard product={p} showProductOnly />
              </div>
            ))}
          </div>
        )}

        {!isLoading && products.length > 12 && (
          <div className="text-center mt-10">
            <Link to="/shop">
              <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6">
                Shop the full catalog online
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

const LocationDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const loc = getLocation(slug);
  const { data: liveHours } = useLocationHours();

  if (!loc) return <Navigate to="/locations" replace />;

  const canonicalUrl = getCanonicalUrl(`/locations/${loc.slug}`);
  const ogImage = loc.image.startsWith("http") ? loc.image : `${SITE_URL}${loc.image}`;
  const others = OWNED_LOCATIONS.filter((l) => l.slug !== loc.slug);
  const isBrewery = loc.kind === "brewery";

  // Prefer live Google hours (refreshed weekly server-side); fall back to the
  // built-in hours in locations.ts if Google is unavailable.
  const live = liveHours?.[loc.slug];
  const hasLiveHours = !!live && live.weekdayText.length > 0;

  return (
    <div className="min-h-screen bg-cream brand-type">
      <Helmet>
        <title>{loc.metaTitle}</title>
        <meta name="description" content={loc.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={loc.metaTitle} />
        <meta property="og:description" content={loc.metaDescription} />
        <meta property="og:type" content="business.business" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={loc.metaTitle} />
        <meta name="twitter:description" content={loc.metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <script type="application/ld+json">{JSON.stringify(locationSchema(loc))}</script>
      </Helmet>

      <Header />

      <main>
        {/* Hero */}
        <section className="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden bg-forest text-cream">
          <div className="absolute inset-0">
            <img src={loc.image} alt={`Monday Morning ${loc.name}`} className="w-full h-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/80 to-forest/60" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-3xl">
            <Link to="/locations" className="inline-flex items-center gap-2 text-cream/70 hover:text-gold transition-colors font-sans text-sm mb-6">
              <ArrowLeft className="h-4 w-4" /> All locations
            </Link>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-gold mb-3 block">
              {loc.area}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.02] mb-4">{loc.name}</h1>
            <p className="font-sans text-lg lg:text-2xl text-cream/85 leading-relaxed max-w-2xl">{loc.tagline}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
                <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-gold text-forest hover:bg-gold-light px-8 py-6 group">
                  Get directions
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              {isBrewery ? (
                <Link to="/non-alcoholic-breweries-san-diego">
                  <Button variant="outline" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-cream/40 text-cream bg-transparent hover:bg-cream hover:text-forest px-8 py-6">
                    About the brewery
                  </Button>
                </Link>
              ) : (
                <Link to="/shop">
                  <Button variant="outline" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-cream/40 text-cream bg-transparent hover:bg-cream hover:text-forest px-8 py-6">
                    Shop online
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Intro + details */}
        <section className="py-14 lg:py-20 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 gap-12 lg:gap-16 max-w-5xl mx-auto">
              {/* Left: story + highlights + amenities */}
              <div className="lg:col-span-7">
                <div className="space-y-5 mb-10">
                  {loc.intro.map((p, i) => (
                    <p key={i} className="font-sans text-lg text-forest/80 leading-relaxed">{p}</p>
                  ))}
                </div>

                {loc.spotlight && (
                  <Link
                    to={loc.spotlight.href}
                    className="group block bg-forest text-cream rounded-lg p-6 mb-10 hover:bg-forest-deep transition-colors"
                  >
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.28em] text-gold mb-2 block">
                      {loc.spotlight.eyebrow}
                    </span>
                    <h3 className="font-serif text-xl lg:text-2xl mb-2">{loc.spotlight.title}</h3>
                    <p className="font-sans text-sm text-cream/80 leading-relaxed mb-3">{loc.spotlight.body}</p>
                    <span className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-gold group-hover:gap-2 transition-all">
                      {loc.spotlight.linkLabel} <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                )}

                <h2 className="font-serif text-2xl lg:text-3xl text-forest mb-5">What you'll find</h2>
                <ul className="space-y-3 mb-10">
                  {loc.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <span className="font-sans text-base text-forest/85">{h}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="font-serif text-2xl lg:text-3xl text-forest mb-5">The spot</h2>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {loc.amenities.map((a) => (
                    <div key={a} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                      <span className="font-sans text-base text-forest/85">{a}</span>
                    </div>
                  ))}
                </div>

                {loc.comingSoon.length > 0 && (
                  <p className="mt-8 inline-block font-sans text-sm text-forest/70 border border-gold/40 bg-gold/10 px-4 py-2">
                    Coming soon: {loc.comingSoon.join(", ")}
                  </p>
                )}
              </div>

              {/* Right: visit card */}
              <div className="lg:col-span-5 mt-12 lg:mt-0">
                <div className="bg-white border-2 border-forest/10 p-7 lg:sticky lg:top-28">
                  <h2 className="font-serif text-2xl text-forest mb-5">Visit us</h2>

                  <div className="flex items-start gap-3 mb-5">
                    <MapPin className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                    <div className="font-sans text-sm">
                      <p className="font-semibold text-forest">{loc.streetAddress}</p>
                      <p className="text-forest/70">{loc.locality}, {loc.region} {loc.postalCode}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-5">
                    <Clock className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                    <div className="font-sans text-sm space-y-1">
                      {hasLiveHours ? (
                        <>
                          {live!.weekdayText.map((line, i) => (
                            <p key={i} className="text-forest/75">{line}</p>
                          ))}
                          <p className="text-forest/40 text-xs pt-1">Hours from Google, checked weekly</p>
                        </>
                      ) : loc.hours ? (
                        loc.hours.map((h, i) => (
                          <p key={i} className={h.special ? "text-gold font-semibold" : "text-forest/75"}>
                            {h.days}: {h.time}
                          </p>
                        ))
                      ) : (
                        <p className="text-forest/75">{loc.hoursNote}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mb-7">
                    <Phone className="h-5 w-5 text-gold mt-0.5 shrink-0" />
                    <a href={`tel:${loc.phone}`} className="font-sans text-sm text-forest/75 hover:text-gold transition-colors">
                      {loc.phone}
                    </a>
                  </div>

                  <a href={loc.mapUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full font-sans text-xs font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep py-6 group">
                      Get directions
                      <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Shop this store (live per-location inventory) */}
        <LocationShop slug={loc.slug} name={loc.name} />

        {/* Other locations */}
        <section className="py-12 lg:py-16 bg-sand">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            <h2 className="font-serif text-2xl lg:text-3xl text-forest text-center mb-8">
              More <span className="font-script text-gold text-[1.2em] leading-none">Monday Morning</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={`/locations/${o.slug}`}
                  className="group block bg-cream border-2 border-forest/10 p-6 hover:border-gold/40 transition-colors"
                >
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{o.area}</span>
                  <h3 className="font-serif text-2xl text-forest group-hover:text-gold transition-colors mt-1">{o.name}</h3>
                  <p className="font-sans text-sm text-forest/70 mt-1">{o.tagline}</p>
                  <span className="inline-flex items-center gap-1 font-sans text-xs font-bold uppercase tracking-wider text-forest mt-4 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LocationDetail;
