import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "@/lib/helmet-compat";
import {
  Loader2, ArrowRight, Palmtree, Heart, Sun, Moon, Sparkles,
  Beer, Wine, Martini, Leaf, GlassWater, Truck, Package, Globe, CupSoda,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/home/ProductCard";
import { Button } from "@/components/ui/button";
import { useShopifyAllProducts, shopifyToLocalProduct } from "@/hooks/useShopifyProducts";
import textureCream from "@/assets/texture-cream.webp";
import textureGreen from "@/assets/texture-green.webp";
import stampGold from "@/assets/stamp-gold.svg";
import { SITE_NAME, DEFAULT_OG_IMAGE, TWITTER_HANDLE, getCanonicalUrl } from "@/lib/seo";

// Quick-jump categories (the chip row under the trust bar).
const categoryChips = [
  { name: "Best Sellers", icon: Sparkles, href: "/collections/best-sellers" },
  { name: "NA Beer", icon: Beer, href: "/collections/na-beer" },
  { name: "NA Wine", icon: Wine, href: "/collections/wine-alternatives" },
  { name: "NA Spirits", icon: Martini, href: "/collections/spirit-alternatives" },
  { name: "Functionals", icon: Leaf, href: "/collections/functional" },
  { name: "Canned", icon: CupSoda, href: "/collections/canned" },
  { name: "Shop All", icon: ArrowRight, href: "/collections/all" },
];

// Trust / value props bar.
const valueProps = [
  { icon: GlassWater, label: "Taste before you buy", sub: "Free sips at our shops" },
  { icon: Truck, label: "Fast local delivery", sub: "Across San Diego" },
  { icon: Package, label: "500+ selection", sub: "Curated by our tasting room" },
  { icon: Globe, label: "Ships nationwide", sub: "Right to your door" },
];

// Product rows by type. `match` filters the catalog by category.
const typeSections = [
  { key: "beer", eyebrow: "Crack one open", title: "NA", accent: "Beer", href: "/collections/na-beer", match: /beer/i },
  { key: "wine", eyebrow: "Pour something", title: "NA", accent: "Wine", href: "/collections/wine-alternatives", match: /wine|sparkling|champagne/i },
  { key: "spirits", eyebrow: "Shake it up", title: "NA", accent: "Spirits", href: "/collections/spirit-alternatives", match: /spirit|aperitif|aperitivo|botanical/i },
  { key: "functional", eyebrow: "Feel good", title: "Functional", accent: "Drinks", href: "/collections/functional", match: /functional|elixir|adapto|tonic/i },
  { key: "canned", eyebrow: "Grab & go", title: "Canned", accent: "Drinks", href: "/collections/canned", match: /rtd/i },
];

// Shop-by-vibe is now a compact, photo-free discovery row (consistent + on-brand).
const vibes = [
  { id: "beach-day", title: "Beach Day", subtitle: "Sun, sand, good sips", icon: Palmtree },
  { id: "date-night", title: "Date Night", subtitle: "Intimate, elevated", icon: Heart },
  { id: "golden-hour", title: "Golden Hour", subtitle: "When the light hits", icon: Sun },
  { id: "cozy-evening", title: "Cozy Evening", subtitle: "Unwind your way", icon: Moon },
  { id: "party-mode", title: "Party Mode", subtitle: "Toast, no hangover", icon: Sparkles },
];

const ProductGrid = ({ products, count = 4 }: { products: any[]; count?: number }) => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
    {products.slice(0, count).map((p) => (
      <div key={p.id} className="bg-cream rounded-xl overflow-hidden border border-forest/10">
        <ProductCard product={p} showProductOnly />
      </div>
    ))}
  </div>
);

const SectionHeader = ({
  eyebrow, title, accent, href, label = "Shop all",
}: { eyebrow?: string; title: string; accent?: string; href?: string; label?: string }) => (
  <div className="flex items-end justify-between gap-4 mb-6 lg:mb-8">
    <div>
      {eyebrow && (
        <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-2 block">
          {eyebrow}
        </span>
      )}
      <h2 className="font-serif text-3xl lg:text-4xl text-forest leading-none">
        {title}
        {accent ? <> <span className="font-script text-gold text-[1.15em] leading-none">{accent}</span></> : null}
      </h2>
    </div>
    {href && (
      <Link
        to={href}
        className="shrink-0 inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-forest hover:text-gold transition-colors border-b-2 border-current pb-1"
      >
        {label} <ArrowRight className="h-4 w-4" />
      </Link>
    )}
  </div>
);

const ShopPage = () => {
  const { data: products, isLoading, error } = useShopifyAllProducts({ sortKey: "BEST_SELLING" });

  const allProducts = useMemo(() => {
    if (!products) return [];
    return products
      .map(shopifyToLocalProduct)
      .filter((p) =>
        !p.name.toLowerCase().includes("gift card") &&
        !p.name.toLowerCase().includes("membership") &&
        !p.name.toLowerCase().includes("subscription")
      );
  }, [products]);

  const bestSellers = useMemo(() => allProducts.slice(0, 8), [allProducts]);

  const byType = useMemo(() => {
    const out: Record<string, any[]> = {};
    typeSections.forEach((t) => {
      out[t.key] = allProducts.filter((p) => t.match.test(p.category || "")).slice(0, 4);
    });
    return out;
  }, [allProducts]);

  const pageTitle = "Shop Non-Alcoholic Drinks: 500+ NA Beer, Wine & Spirits | Monday Morning";
  const pageDescription = "Shop the largest curated NA drinks selection in San Diego. 500+ non-alcoholic beers, wines, spirits, mocktails and functional drinks. Taste before you buy, fast local delivery, nationwide shipping.";
  const canonicalUrl = getCanonicalUrl("/shop");

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

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-14 lg:py-20 bg-cream text-forest overflow-hidden">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: "cover" }}
          />
          <div className="absolute -top-20 -right-20 w-64 lg:w-[28rem] opacity-[0.05] pointer-events-none">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
                Shop · Find Your Version of AF
              </span>
              <h1 className="font-serif text-5xl lg:text-7xl xl:text-8xl font-normal mb-6 text-forest">
                Shop Non-Alcoholic <span className="font-script text-gold text-[1.15em] leading-none">Drinks</span>
              </h1>
              <p className="font-sans text-lg lg:text-xl text-forest/70 max-w-2xl mx-auto">
                500+ non-alcoholic beers, wines, spirits, and functional drinks, hand-picked by our San Diego tasting room. Taste before you buy, get fast local delivery, or ship nationwide.
              </p>
            </div>
          </div>
        </section>

        {/* Trust / value bar */}
        <section className="bg-cream border-y border-forest/15 py-5 lg:py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-5">
              {valueProps.map((v) => (
                <div key={v.label} className="flex items-center gap-3">
                  <v.icon className="h-6 w-6 lg:h-7 lg:w-7 text-gold shrink-0" />
                  <div className="min-w-0">
                    <p className="font-sans text-sm font-bold uppercase tracking-wide text-forest leading-tight">{v.label}</p>
                    <p className="font-sans text-xs text-forest/55">{v.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Category quick-nav */}
        <section className="bg-sand border-b border-forest/10 py-5 lg:py-6">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-2.5 lg:gap-3">
              {categoryChips.map((c) => (
                <Link
                  key={c.name}
                  to={c.href}
                  className="group inline-flex items-center gap-2 border-2 border-forest/20 hover:border-gold hover:bg-gold/10 px-4 py-2 lg:px-5 lg:py-2.5 transition-colors"
                >
                  <c.icon className="h-4 w-4 text-gold shrink-0" />
                  <span className="font-sans text-xs lg:text-sm font-bold uppercase tracking-wider text-forest">{c.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Loading state */}
        {isLoading && (
          <section className="py-32 bg-cream">
            <div className="flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-gold mb-4" />
              <span className="font-sans text-forest/60">Stocking the shelves...</span>
            </div>
          </section>
        )}

        {/* Error state */}
        {error && !isLoading && (
          <section className="py-20 bg-cream">
            <div className="text-center">
              <p className="text-forest/60 mb-4">Unable to load products. Please try again.</p>
              <Button onClick={() => window.location.reload()}>Refresh Page</Button>
            </div>
          </section>
        )}

        {!isLoading && !error && (
          <>
            {/* Best Sellers */}
            {bestSellers.length > 0 && (
              <section className="py-12 lg:py-16 bg-cream">
                <div className="container mx-auto px-4 lg:px-8">
                  <SectionHeader eyebrow="Community favorites" title="Best" accent="Sellers" href="/collections/best-sellers" />
                  <ProductGrid products={bestSellers} count={8} />
                </div>
              </section>
            )}

            {/* Product rows by type */}
            {typeSections.map((t, i) =>
              byType[t.key] && byType[t.key].length > 0 ? (
                <section key={t.key} className={`py-12 lg:py-16 ${i % 2 === 0 ? "bg-sand" : "bg-cream"}`}>
                  <div className="container mx-auto px-4 lg:px-8">
                    <SectionHeader eyebrow={t.eyebrow} title={t.title} accent={t.accent} href={t.href} />
                    <ProductGrid products={byType[t.key]} count={4} />
                  </div>
                </section>
              ) : null
            )}

            {/* Shop by Vibe, compact discovery cards (no lifestyle photos) */}
            <section className="py-12 lg:py-16 bg-sand">
              <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-10">
                  <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
                    Not sure where to start?
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl text-forest">
                    Shop by <span className="font-script text-gold text-[1.15em] leading-none">vibe</span>
                  </h2>
                  <p className="font-sans text-forest/65 mt-3">
                    Tell us the moment, we'll point you to the pour.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4">
                  {vibes.map((v) => (
                    <Link
                      key={v.id}
                      to={`/collections/${v.id}`}
                      className="group bg-cream hover:bg-forest border-2 border-forest/15 hover:border-forest rounded-xl p-5 text-center transition-colors"
                    >
                      <div className="w-12 h-12 mx-auto rounded-full bg-forest group-hover:bg-gold flex items-center justify-center mb-3 transition-colors">
                        <v.icon className="h-6 w-6 text-gold group-hover:text-forest transition-colors" />
                      </div>
                      <p className="font-serif text-lg text-forest group-hover:text-cream transition-colors">{v.title}</p>
                      <p className="font-sans text-xs text-forest/60 group-hover:text-cream/70 mt-1 transition-colors">{v.subtitle}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 lg:py-24 bg-forest relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url(${textureGreen})`, backgroundSize: "cover" }}
              />
              <div className="grain absolute inset-0 pointer-events-none opacity-20" />
              <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
                <h2 className="font-serif text-3xl lg:text-5xl text-cream mb-4">
                  Want to see <span className="font-script text-gold text-[1.2em] leading-none">everything</span>?
                </h2>
                <p className="font-sans text-cream/70 max-w-md mx-auto mb-8">
                  Browse our full collection of 500+ non-alcoholic drinks, or come taste them in person.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="font-sans text-sm font-bold uppercase tracking-widest bg-gold text-forest hover:bg-gold/90 px-10 py-6">
                    <Link to="/collections/all">Browse All Products</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-gold text-gold hover:bg-gold hover:text-forest px-10 py-6">
                    <Link to="/locations">Visit a Shop</Link>
                  </Button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ShopPage;
