import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import kavaHaven from "@/assets/products/kava-haven.webp";
import sentiaGold from "@/assets/products/sentia-gold.webp";
import bolleRose from "@/assets/products/bolle-rose.webp";

interface ShowcaseItem {
  img: string;
  name: string;
  handle?: string;
}

const FALLBACK: ShowcaseItem[] = [
  { img: kavaHaven, name: "Kava Haven" },
  { img: sentiaGold, name: "Sentia Gold" },
  { img: bolleRose, name: "Bolle Rosé" },
];

/**
 * A single polaroid-style card that slowly crossfades through real products
 * from Shopify, like pages turning. Subtle by design (one card, gentle fade).
 */
const HeroProductShowcase = ({ className = "" }: { className?: string }) => {
  const { data: products } = useShopifyProducts(40, { sortKey: "BEST_SELLING" });

  // Best sellers, but only one product per brand so the showcase stays varied
  // (otherwise a single vendor like Leilo dominates the rotation).
  const items: ShowcaseItem[] = (() => {
    if (!products || !products.length) return [];
    const seenBrand = new Set<string>();
    const out: ShowcaseItem[] = [];
    for (const p of products) {
      if (!p.featuredImage?.url) continue;
      const brand = (p.vendor || p.title).trim().toLowerCase();
      if (seenBrand.has(brand)) continue;
      seenBrand.add(brand);
      out.push({ img: p.featuredImage.url, name: p.title, handle: p.handle });
      if (out.length >= 7) break;
    }
    return out;
  })();

  const list = items.length >= 2 ? items : FALLBACK;

  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (list.length <= 1) return;
    const interval = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % list.length);
        setShow(true);
      }, 600);
    }, 4500);
    return () => clearInterval(interval);
  }, [list.length]);

  const current = list[idx % list.length];

  const card = (
    <div className="bg-gradient-to-b from-cream-warm to-sand border-2 border-gold/70 shadow-elevated p-3 pb-9 relative w-full -rotate-2 transition-transform duration-500 group-hover:rotate-0">
      {/* warm inner tint */}
      <div className="absolute inset-0 bg-gold/[0.06] pointer-events-none" />
      <div className={`relative transition-opacity duration-700 ease-in-out ${show ? "opacity-100" : "opacity-0"}`}>
        <div className="aspect-[3/4] flex items-center justify-center">
          <img
            src={current.img}
            alt={current.name}
            loading="lazy"
            decoding="async"
            className="max-w-full max-h-full object-contain mix-blend-multiply"
          />
        </div>
        <span className="absolute bottom-2 left-0 right-0 text-center font-serif text-sm italic text-forest px-3 truncate">
          {current.name}
        </span>
      </div>
    </div>
  );

  return (
    <div className={`group ${className}`}>
      {current.handle ? (
        <Link to={`/product/${current.handle}`} aria-label={current.name}>
          {card}
        </Link>
      ) : (
        <Link to="/shop" aria-label="Shop all products">
          {card}
        </Link>
      )}
    </div>
  );
};

export default HeroProductShowcase;
