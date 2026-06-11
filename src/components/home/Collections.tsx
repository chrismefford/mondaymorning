import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShopifyCollections } from "@/hooks/useShopifyProducts";
import textureCream from "@/assets/texture-cream.webp";
import illusBeer from "@/assets/brand/illus-beer-bottle.png";
import illusMartini from "@/assets/brand/illus-martini.png";
import illusRocks from "@/assets/brand/illus-rocks.png";
import illusCitrus from "@/assets/brand/illus-citrus.png";
import illusWine from "@/assets/brand/illus-wine.png";
import illusFunctional from "@/assets/brand/illus-functional.png";
import { CannedIllustration, ShopAllIllustration } from "@/components/home/vibeIllustrations";

// Curated "vibe" categories, each wired to a live Shopify collection.
// All six tiles use the real brand line illustrations (gold line art on dark).
const VIBE_CATEGORIES = [
  { handle: "non-alcoholic-beer", label: "Beer", blurb: "Crisp IPAs, lagers & stouts", bg: "bg-forest", img: illusBeer },
  { handle: "non-alcoholic-wine", label: "Wine", blurb: "Reds, rosés & sparkling", bg: "bg-teal-dark", img: illusWine },
  { handle: "non-alcoholic-spirits", label: "Spirits", blurb: "Gin, whiskey & agave, zero-proof", bg: "bg-forest-deep", img: illusRocks },
  { handle: "non-alcoholic-canned-cocktails", label: "Cocktails", blurb: "Bar-quality, ready to pour", bg: "bg-teal-dark", img: illusMartini },
  { handle: "non-alcoholic-aperitifs-digestifs-liqueurs", label: "Aperitifs", blurb: "Bittersweet & botanical", bg: "bg-forest", img: illusCitrus },
  { handle: "non-alcoholic-functional-rtds", label: "Functional", blurb: "Adaptogens, kava & calm", bg: "bg-forest-deep", img: illusFunctional },
  { handle: "non-alcoholic-ready-to-drinks", label: "Canned", blurb: "Sparkling, seltzers & RTD cans", bg: "bg-forest", Illustration: CannedIllustration },
  { to: "/shop", label: "Shop All", blurb: "Browse all 500+ pours", bg: "bg-teal-dark", alwaysShow: true, Illustration: ShopAllIllustration },
];

const Collections = () => {
  // Pull live collections so we only show categories that exist in the catalog.
  const { data: liveCollections } = useShopifyCollections(50);
  const liveHandles = new Set((liveCollections || []).map((c) => c.handle));
  const cats = VIBE_CATEGORIES.filter((c) => c.alwaysShow || liveHandles.size === 0 || liveHandles.has(c.handle));

  return (
    <section id="collections" className="py-12 lg:py-16 bg-cream relative overflow-hidden">
      {/* Organic texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: `url(${textureCream})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 lg:mb-12">
          <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
            Shop by Category
          </span>
          <h2 className="font-serif text-3xl lg:text-5xl xl:text-6xl leading-[1] text-forest">
            Find your <span className="font-script text-gold text-[1.2em] leading-none">vibe</span>
          </h2>
          <p className="font-sans text-sm lg:text-lg text-forest/60 mt-4">
            Beer, wine, spirits, cocktails and more. However you like to drink differently, start here.
          </p>
        </div>

        {/* Category tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {cats.map((c) => {
            const Illustration = c.Illustration;
            return (
              <Link
                key={c.handle || c.label}
                to={c.to || `/collections/${c.handle}`}
                className={`group relative ${c.bg} text-cream border-2 border-forest p-6 lg:p-8 aspect-[4/3] overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-card hover:shadow-brutal`}
              >
                {/* Hand-drawn illustration (gold) */}
                {c.img ? (
                  <img
                    src={c.img}
                    alt=""
                    aria-hidden="true"
                    className={`absolute right-3 -bottom-1 max-h-[78%] max-w-[52%] object-contain object-bottom transition-transform duration-500 group-hover:scale-105 ${c.label === "Aperitifs" ? "opacity-50" : "opacity-95"}`}
                  />
                ) : Illustration ? (
                  <Illustration className="absolute right-3 bottom-1 w-32 h-36 lg:w-36 lg:h-40 text-gold opacity-95 transition-transform duration-500 group-hover:scale-105" />
                ) : null}

                <div className="relative z-10 max-w-[58%]">
                  <h3 className="font-serif text-2xl lg:text-3xl leading-tight">{c.label}</h3>
                  <p className="font-sans text-xs lg:text-sm mt-1 text-cream/70">{c.blurb}</p>
                </div>
                <ArrowUpRight className="absolute top-6 right-6 h-5 w-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 lg:mt-14">
          <Link to="/shop">
            <Button
              size="lg"
              className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6 group"
            >
              Browse all 500+
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collections;
