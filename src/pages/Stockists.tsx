import { useState } from "react";
import { Helmet } from "@/lib/helmet-compat";
import { MapPin, ArrowUpRight, ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { STOCKISTS, type Stockist } from "@/data/stockists";
import { SITE_NAME, DEFAULT_OG_IMAGE, TWITTER_HANDLE, getCanonicalUrl } from "@/lib/seo";

const mapHref = (name: string, address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;

const StockistCard = ({ s }: { s: Stockist }) => {
  const [open, setOpen] = useState(false);
  const hasBrands = s.brands.length > 0;
  return (
    <div className="bg-white border-2 border-forest/15 p-6 lg:p-7">
      <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.25em] text-gold">
        {s.area}
      </span>

      {hasBrands ? (
        /* Name = click target → reveals what they carry. */
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="w-full text-left group mt-1"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-serif text-2xl lg:text-3xl text-forest leading-tight group-hover:text-gold transition-colors">
              {s.name}
            </h2>
            <span className="shrink-0 inline-flex items-center gap-1 font-sans text-[11px] font-bold uppercase tracking-wider text-forest/45 group-hover:text-forest transition-colors">
              {s.brands.length}
              <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </span>
          </div>
        </button>
      ) : (
        <div className="flex items-center justify-between gap-3 mt-1">
          <h2 className="font-serif text-2xl lg:text-3xl text-forest leading-tight">{s.name}</h2>
          <span className="shrink-0 font-sans text-[10px] font-bold uppercase tracking-wider text-forest/40 whitespace-nowrap">
            Ask in store
          </span>
        </div>
      )}

      <a
        href={mapHref(s.name, s.address)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-start gap-1.5 mt-1.5 font-sans text-sm text-forest/65 hover:text-forest transition-colors group/map w-fit"
      >
        <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-gold" />
        <span>
          {s.address}
          <ArrowUpRight className="inline h-3.5 w-3.5 ml-0.5 opacity-40 group-hover/map:opacity-100 transition-opacity" />
        </span>
      </a>

      {hasBrands && open && (
        <div className="mt-4 pt-4 border-t border-forest/10">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-forest/50 mb-2.5">
            What they carry
          </p>
          <div className="flex flex-wrap gap-2">
            {s.brands.map((b) => (
              <span
                key={b}
                className="font-sans text-xs lg:text-[13px] text-forest bg-cream border border-forest/15 px-2.5 py-1"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Stockists = () => {
  const pageTitle = "Where to Find Our Drinks in San Diego | Monday Morning";
  const pageDescription =
    "Bars, restaurants, and shops across San Diego that carry the non-alcoholic brands Monday Morning distributes — tap any spot to see what it stocks. Find an alcohol-free pour near you.";
  const canonicalUrl = getCanonicalUrl("/stockists");

  return (
    <div className="min-h-screen bg-cream brand-type">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
      </Helmet>

      <Header />

      <main id="main">
        {/* HERO */}
        <section className="pt-28 lg:pt-32 pb-10 lg:pb-14 bg-cream">
          <div className="container mx-auto px-4 lg:px-8 text-center max-w-2xl">
            <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
              Stockists · Find Us Out There
            </span>
            <h1 className="font-serif text-4xl lg:text-6xl leading-[1.05] text-forest">
              Where to find our <span className="font-script text-gold text-[1.15em] leading-none">drinks.</span>
            </h1>
            <p className="font-sans text-sm lg:text-lg text-forest/65 mt-5">
              These San Diego spots stock the non-alcoholic brands we distribute. Tap any place to see what they carry.
            </p>
          </div>
        </section>

        {/* STOCKIST CARDS */}
        <section className="pb-16 lg:pb-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto">
              {STOCKISTS.map((s) => (
                <StockistCard key={s.name} s={s} />
              ))}
            </div>

            <p className="text-center font-sans text-xs text-forest/45 mt-10 max-w-xl mx-auto">
              Stock rotates, call ahead for a specific bottle. Want to carry these brands at your venue?{" "}
              <a href="/services" className="text-forest underline hover:text-gold transition-colors">Work with us</a>.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Stockists;
