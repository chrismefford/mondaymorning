import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCart } from "@/hooks/useCart";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, MapPin, Recycle, Snowflake, GlassWater, Leaf } from "lucide-react";
// Real Pexels photos matched to each drink's flavor (ids + credits in assets/thanksgiving/_credits.json)
import photoPumpkinElixir from "@/assets/thanksgiving/pumpkin-elixir.jpg";
import photoDreamyBananas from "@/assets/thanksgiving/dreamy-bananas.jpg";
import photoDemApples from "@/assets/thanksgiving/dem-apples.jpg";
import photoSummerEuphoria from "@/assets/thanksgiving/summer-euphoria.jpg";
import photoCitrusZen from "@/assets/thanksgiving/citrus-zen.jpg";
import photoPumpkinPie from "@/assets/thanksgiving/pumpkin-pie-smash.jpg";
import photoNewFashioned from "@/assets/thanksgiving/new-fashioned.jpg";
import textureGreen from "@/assets/texture-green.webp";
import stampGold from "@/assets/stamp-gold.svg";

// Thanksgiving 2026 batched Vibations pre-order. Drinks, sizes, and prices are
// final per the Vibations brief (06 - Operations & Programs/Vibations Bartending/
// Thanksgiving 2026 - Website Brief.md); do not change prices without Zane.
// Pickup is Pacific Beach only. `handle` is the Shopify product handle; until
// the products exist the order buttons render as "opening soon".

const ORDER_CUTOFF = new Date("2026-11-24T07:59:00Z"); // Mon Nov 23, 11:59 PM Pacific
const PICKUP_DAY = "Wednesday, November 25";
const PICKUP_HOURS = "11 AM to 8 PM";
const ORDER_BY = "Monday, November 23";

type Bottle = {
  name: string;
  sizes: SizeOption[]; // shown as a 16 oz / 32 oz switch on the card
  tagline: string;
  ingredients: string;
  skip: string | null; // functional-ingredient guidance from the Vibations tool
  photo: string;
  photoAlt: string;
  madeWith: MadeWith[]; // the bottles we pour from, linked to their product pages
};

type MadeWith = { name: string; handle: string; img: string };

// Final two-size pricing from the Vibations brief (2026-11-16). Zane chose to show
// drinks per bottle + price per drink instead of a strikethrough compare-at price.
// drinks = about how many 4 oz pours over ice.
type SizeOption = { size: "16 oz" | "32 oz"; drinks: number; price: number | null };

// Bottle shots straight from our Shopify catalog
const CDN = "https://cdn.shopify.com/s/files/1/0902/1377/7708/files";
const KAVA_HAVEN: MadeWith = { name: "Kava Haven", handle: "kava-haven-kava-infused-spirit", img: `${CDN}/KavaHaven-NonAlcoholicSpirit.png` };
const DROMME_CALM: MadeWith = { name: "Drømme Calm", handle: "dromme-calm-founder-edition", img: `${CDN}/CalmFoundersEdition-NonAlcoholicSpirit.png` };
const CEYBON_CHILL: MadeWith = { name: "Ceybon Chill AF", handle: "ceybon-af-chill-af", img: `${CDN}/ChillAF-NonAlcoholicAperitif.png` };
const CEYBON_BRIGHT: MadeWith = { name: "Ceybon Bright AF", handle: "ceybon-af-bright-af", img: `${CDN}/BrightAF-NonAlcoholicAperitif.png` };
const APLOS_ARISE: MadeWith = { name: "Aplos Arise", handle: "ceybon-af-bright-af-copy", img: `${CDN}/Aplos-Arise.webp` };
const SENTIA_GOLD: MadeWith = { name: "Sentia GABA Gold", handle: "sentia-gaba-gold", img: `${CDN}/Sentia_-_Gaba_Gold_-_50cl.webp` };
const MONDAY_WHISKEY: MadeWith = { name: "Monday Whiskey", handle: "monday-whiskey", img: `${CDN}/Whiskey-NonAlcoholicSpirit.png` };
const SOBOUR: MadeWith = { name: "SoBour Bourbonesque", handle: "sobour-bournbonesque-whiskey", img: `${CDN}/SoV.webp` };

const BOTTLES: Bottle[] = [
  {
    name: "Pumpkin Elixir",
    sizes: [
      { size: "16 oz", drinks: 4.5, price: 50 },
      { size: "32 oz", drinks: 9, price: 82 },
    ],
    tagline: "Smooth pumpkin spice. The easy fall sipper.",
    ingredients: "Orange, pumpkin syrup, Kava Haven",
    skip: "you're pregnant or nursing, drinking alcohol, on sedatives, sleep aids, anti-anxiety or regular prescription meds, or have liver concerns or Parkinson's. Kava isn't for daily, long-term use.",
    photo: photoPumpkinElixir,
    photoAlt: "Warm drinks in pumpkin mugs by a fireplace",
    madeWith: [KAVA_HAVEN],
  },
  {
    name: "Dreamy Bananas",
    sizes: [
      { size: "16 oz", drinks: 4, price: 45 },
      { size: "32 oz", drinks: 8, price: 72 },
    ],
    tagline: "Warm, creamy, and cozy. Banana bread in a glass.",
    ingredients: "Pumpkin spice chai, banana bread syrup, Kava Haven, Drømme Calm",
    skip: "you're pregnant or nursing, drinking alcohol, on an antidepressant or other serotonin-affecting medication, on sedatives, sleep aids, anti-anxiety meds, blood thinners or regular prescription meds, or have an aspirin allergy, liver concerns, Parkinson's, or a thyroid or autoimmune condition. Kava isn't for daily, long-term use.",
    photo: photoDreamyBananas,
    photoAlt: "Creamy drink topped with banana slices and cinnamon",
    madeWith: [KAVA_HAVEN, DROMME_CALM],
  },
  {
    name: "Dem Apples",
    sizes: [
      { size: "16 oz", drinks: 4.5, price: 50 },
      { size: "32 oz", drinks: 9, price: 82 },
    ],
    tagline: "Crisp fall apple, straight off the orchard.",
    ingredients: "Apple juice, apple crisp syrup, Ceybon Chill",
    skip: "you're pregnant or nursing, on blood thinners or having surgery soon, or on blood-pressure or heart meds.",
    photo: photoDemApples,
    photoAlt: "Glass of apple juice with fresh green apples",
    madeWith: [CEYBON_CHILL],
  },
  {
    name: "Summer Euphoria",
    sizes: [
      { size: "16 oz", drinks: 4, price: 45 },
      { size: "32 oz", drinks: 8, price: 72 },
    ],
    tagline: "Tropical with a little sweet heat.",
    ingredients: "Pineapple, mango habanero syrup, Ceybon Bright, Aplos Arise",
    skip: "you're pregnant or nursing, caffeine-sensitive, on blood thinners or having surgery soon, on blood-pressure, heart, diabetes or thyroid meds or an MAOI, or have G6PD deficiency.",
    photo: photoSummerEuphoria,
    photoAlt: "Mango drink with red chili peppers and fresh mango",
    madeWith: [CEYBON_BRIGHT, APLOS_ARISE],
  },
  {
    name: "Citrus Zen",
    sizes: [
      { size: "16 oz", drinks: 4, price: 42 },
      { size: "32 oz", drinks: 7.5, price: 68 },
    ],
    tagline: "Bright, tropical, and easy-going.",
    ingredients: "Pineapple, passionfruit citrus, Sentia GABA Gold, Kava Haven",
    skip: "you're pregnant or nursing, drinking alcohol, on any medication, or have liver concerns, Parkinson's, or a thyroid or autoimmune condition. Don't drive for about 45 minutes. Kava isn't for daily, long-term use.",
    photo: photoCitrusZen,
    photoAlt: "Passionfruit and citrus drink over ice with limes",
    madeWith: [SENTIA_GOLD, KAVA_HAVEN],
  },
  {
    name: "Pumpkin Pie Bourbon Smash",
    sizes: [
      { size: "16 oz", drinks: 4, price: 48 },
      { size: "32 oz", drinks: 8.5, price: 78 },
    ],
    tagline: "Dessert in a glass. Bourbon-style pumpkin pie.",
    ingredients: "Monday Whiskey (NA), lemon, pumpkin syrup",
    skip: null,
    photo: photoPumpkinPie,
    photoAlt: "Slice of pumpkin pie on a wooden table",
    madeWith: [MONDAY_WHISKEY],
  },
  {
    name: "New Fashioned",
    sizes: [
      { size: "16 oz", drinks: 5, price: 58 },
      { size: "32 oz", drinks: 10.5, price: 95 },
    ],
    tagline: "The classic old fashioned, spirit-forward and smooth.",
    ingredients: "Drømme Calm, SoBour (NA whiskey), orange bitters",
    skip: "you're on an antidepressant or other serotonin-affecting medication, on sedatives or blood thinners, have an aspirin allergy or a thyroid or autoimmune condition, or are pregnant or nursing.",
    photo: photoNewFashioned,
    photoAlt: "Old fashioned style drink with an orange peel",
    madeWith: [DROMME_CALM, SOBOUR],
  },
];

const BYOB_OFF = 5;
const BOTTLE_LIMIT = 20; // we have 20 of our own 16 oz bottles and 20 of our 32 oz bottles, shared across every drink

// Shopify variants (products created 2026-11-16). Drink variants are priced at the BYOB
// price; choosing one of our bottles adds the matching $5 bottle item, which is the
// stock-tracked piece (20 of each at Pacific Beach) that Shopify counts down.
const BOTTLE_VARIANT: Record<SizeOption["size"], string> = {
  "16 oz": "gid://shopify/ProductVariant/67884603244844",
  "32 oz": "gid://shopify/ProductVariant/67884603277612",
};
const DRINK_VARIANT: Record<string, Record<SizeOption["size"], string>> = {
  "Pumpkin Elixir": { "16 oz": "gid://shopify/ProductVariant/67884604522796", "32 oz": "gid://shopify/ProductVariant/67884604555564" },
  "Dreamy Bananas": { "16 oz": "gid://shopify/ProductVariant/67884604588332", "32 oz": "gid://shopify/ProductVariant/67884604621100" },
  "Dem Apples": { "16 oz": "gid://shopify/ProductVariant/67884604653868", "32 oz": "gid://shopify/ProductVariant/67884604686636" },
  "Summer Euphoria": { "16 oz": "gid://shopify/ProductVariant/67884604719404", "32 oz": "gid://shopify/ProductVariant/67884604752172" },
  "Citrus Zen": { "16 oz": "gid://shopify/ProductVariant/67884604784940", "32 oz": "gid://shopify/ProductVariant/67884604817708" },
  "Pumpkin Pie Bourbon Smash": { "16 oz": "gid://shopify/ProductVariant/67884604850476", "32 oz": "gid://shopify/ProductVariant/67884604883244" },
  "New Fashioned": { "16 oz": "gid://shopify/ProductVariant/67884604916012", "32 oz": "gid://shopify/ProductVariant/67884604948780" },
};

type BottleStock = Record<SizeOption["size"], number> | null; // null = count unavailable right now

// Live count of our bottles left, refreshed every minute. Falls back to null (no counter shown,
// Shopify still enforces the 20 limit at checkout) if the lookup fails.
const useBottleStock = () =>
  useQuery({
    queryKey: ["tg-bottle-stock"],
    queryFn: async (): Promise<BottleStock> => {
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/shopify-storefront?action=bottle-stock`, {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}` },
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data?.stock ?? null;
    },
    refetchInterval: 60_000,
    retry: 1,
  });

const byobPrice = (o: SizeOption) => (o.price ? o.price - BYOB_OFF : null);
const perDrink = (total: number | null, drinks: number) => (total ? Math.round(total / drinks) : null);

// Headline numbers for the value strip, computed from the price table so they never drift.
const ALL_SIZES = BOTTLES.flatMap((b) => b.sizes);
const DRINKS_32 = ALL_SIZES.filter((o) => o.size === "32 oz").map((o) => o.drinks);
const DRINKS_32_RANGE = `${Math.round(Math.min(...DRINKS_32))} to ${Math.round(Math.max(...DRINKS_32))}`;
const BIG_EACH = Math.round(
  Math.max(...ALL_SIZES.filter((o) => o.size === "32 oz").map((o) => (o.price ? (o.price - BYOB_OFF) / o.drinks : 0)))
);

const BottleCard = ({ b, ordersOpen, stock }: { b: Bottle; ordersOpen: boolean; stock: BottleStock }) => {
  const { addLines, isLoading } = useCart();
  const [sel, setSel] = useState(b.sizes.length - 1); // default to the biggest bottle
  const [ours, setOurs] = useState(false); // default: bring your own bottle
  const o = b.sizes[sel];
  const left = stock ? stock[o.size] : null;
  const oursAvailable = left === null || left > 0;
  const useOurs = ours && oursAvailable;
  const total = useOurs ? o.price : byobPrice(o);
  const each = perDrink(total, o.drinks);

  const preorder = async () => {
    const lines = [{ merchandiseId: DRINK_VARIANT[b.name][o.size], quantity: 1 }];
    if (useOurs) lines.push({ merchandiseId: BOTTLE_VARIANT[o.size], quantity: 1 });
    await addLines(lines);
  };

  const pill = (active: boolean) =>
    `py-2 font-sans text-xs font-bold uppercase tracking-[0.12em] transition-colors ${
      active ? "bg-forest-deep text-cream" : "bg-transparent text-forest hover:bg-forest/5"
    }`;

  return (
  <article className="flex flex-col bg-background border-2 border-forest/15 hover:border-forest/40 transition-colors">
    <div className="relative aspect-[4/3] overflow-hidden bg-sand">
      <img src={b.photo} alt={b.photoAlt} loading="lazy" className="h-full w-full object-cover" />
    </div>

    <div className="flex flex-col flex-1 p-6">
      <h3 className="font-serif text-2xl text-forest-deep leading-tight">{b.name}</h3>
      <p className="mt-1 font-sans text-sm text-muted-foreground">{b.tagline}</p>

      <p className="mt-4 font-sans text-xs uppercase tracking-[0.15em] text-forest/60">What's in it</p>
      <p className="mt-1 font-sans text-sm text-forest">{b.ingredients}</p>

      <p className="mt-4 font-sans text-xs uppercase tracking-[0.15em] text-forest/60">Made with</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {b.madeWith.map((m) => (
          <Link
            key={m.handle}
            to={`/product/${m.handle}`}
            className="flex items-center gap-2 border border-forest/15 bg-cream/60 pr-3 hover:border-forest/40 transition-colors"
            title={`Shop ${m.name}`}
          >
            <img src={`${m.img}?width=120`} alt={`${m.name} bottle`} loading="lazy" className="h-12 w-12 object-contain bg-white" />
            <span className="font-sans text-xs font-semibold text-forest-deep">{m.name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-5 border-t border-forest/10 pt-4 space-y-2">
        <div role="radiogroup" aria-label={`${b.name} size`} className="grid grid-cols-2 border-2 border-forest/20">
          {b.sizes.map((s, i) => (
            <button key={s.size} type="button" role="radio" aria-checked={i === sel} onClick={() => setSel(i)} className={pill(i === sel)}>
              {s.size}
            </button>
          ))}
        </div>
        <div role="radiogroup" aria-label={`${b.name} bottle`} className="grid grid-cols-2 border-2 border-forest/20">
          <button type="button" role="radio" aria-checked={!useOurs} onClick={() => setOurs(false)} className={pill(!useOurs)}>
            My bottle
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={useOurs}
            disabled={!oursAvailable}
            onClick={() => setOurs(true)}
            className={`${pill(useOurs)} disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            Yours, +${BYOB_OFF}
          </button>
        </div>
        <p className="font-sans text-xs text-forest/70 min-h-[1rem]">
          {!oursAvailable
            ? `Our ${o.size} bottles are all spoken for. Bring your own and you're set.`
            : useOurs
              ? left !== null
                ? `Our ${o.size} bottles: ${left} of ${BOTTLE_LIMIT} left`
                : `Limited: only ${BOTTLE_LIMIT} of our ${o.size} bottles`
              : `Bring a clean ${o.size} bottle to pickup. Need one? Ours are $${BYOB_OFF}.`}
        </p>

        <div className="pt-1 flex items-end justify-between gap-4">
          {total ? (
            <span className="font-serif text-3xl text-forest-deep">${total}</span>
          ) : (
            <span className="font-sans text-sm font-semibold text-terracotta">Price coming</span>
          )}
          <div className="text-right font-sans text-forest-deep">
            <p className="text-sm font-semibold">Makes about {o.drinks} drinks</p>
            {each !== null && <p className="text-xs text-forest/70">About ${each} a drink</p>}
          </div>
        </div>
      </div>

      {b.skip ? (
        <details className="mt-4 group">
          <summary className="cursor-pointer list-none font-sans text-xs font-semibold uppercase tracking-[0.15em] text-terracotta flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5" />
            Before you sip
            <span className="ml-auto text-forest/50 group-open:rotate-45 transition-transform text-base leading-none">+</span>
          </summary>
          <p className="mt-2 font-sans text-xs leading-relaxed text-forest/80">
            Made with functional botanicals. Skip it if {b.skip}
          </p>
        </details>
      ) : (
        <p className="mt-4 font-sans text-xs font-semibold uppercase tracking-[0.15em] text-forest/50">
          No functional ingredients, just flavor
        </p>
      )}

      <div className="mt-auto pt-5">
        {ordersOpen ? (
          <Button
            onClick={preorder}
            disabled={isLoading || !total}
            className="w-full bg-forest hover:bg-forest-deep text-cream font-sans text-xs font-bold uppercase tracking-widest py-5"
          >
            Pre-order {o.size}{total ? `, $${total}` : ""}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button disabled className="w-full bg-forest/80 text-cream font-sans text-xs font-bold uppercase tracking-widest py-5">
            Pre-orders closed
          </Button>
        )}
      </div>
    </div>
  </article>
  );
};

const Thanksgiving = () => {
  const ordersOpen = Date.now() < ORDER_CUTOFF.getTime();
  const { data: stock = null } = useBottleStock();

  return (
    <div className="min-h-screen bg-background brand-type">
      <SEO
        title="Thanksgiving Vibations: Zero-Proof Cocktails by the Bottle"
        description={`Pre-order batched, 100% alcohol-free Vibations for Thanksgiving. Order by ${ORDER_BY}, pick up ${PICKUP_DAY} at Monday Morning Pacific Beach. About 8 cocktails per bottle.`}
        path="/thanksgiving"
      />
      <Header />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-forest-deep text-cream">
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: `url(${textureGreen})`, backgroundSize: "cover", backgroundPosition: "center" }}
          />
          <div className="grain absolute inset-0 pointer-events-none" />
          <img
            src={stampGold}
            alt=""
            aria-hidden="true"
            className="absolute -right-24 -bottom-24 w-[22rem] md:w-[30rem] opacity-[0.07] pointer-events-none"
          />

          <div className="relative z-10 mx-auto max-w-6xl px-6 pt-36 pb-20 md:pt-44 md:pb-28">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-gold">
              Zero-proof Vibations · Thanksgiving pre-order
            </p>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl leading-[1.02]">
              Thanksgiving,
              <br />
              <span className="font-script text-gold text-6xl md:text-8xl leading-none">bottled.</span>
            </h1>
            <p className="mt-6 max-w-xl font-sans text-base md:text-lg text-cream/80 leading-relaxed">
              Seven batched craft cocktails, 100% alcohol-free and made by hand at our Pacific Beach bar.
              Pour over ice, pass them around the table, and let everyone drink differently.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-3 font-sans text-sm text-cream/90">
              <span className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gold" /> Order by {ORDER_BY}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gold" /> Pick up {PICKUP_DAY}, {PICKUP_HOURS}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold" /> Pacific Beach, 1854 Garnet Ave
              </span>
            </div>

            <div className="mt-10">
              <a href="#bottles">
                <Button
                  size="lg"
                  className="bg-gold text-forest-deep hover:bg-gold/90 font-sans text-sm font-bold uppercase tracking-widest px-8 py-6"
                >
                  {ordersOpen ? "Pick your bottles" : "See the lineup"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              {!ordersOpen && (
                <p className="mt-4 font-sans text-sm text-cream/70">
                  Pre-orders are closed. See you {PICKUP_DAY} for pickup.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Value strip */}
        <section className="bg-gold-warm text-forest-deep">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-3 gap-3 sm:gap-6 text-center">
            <div>
              <p className="font-serif text-2xl sm:text-3xl">{DRINKS_32_RANGE}</p>
              <p className="mt-1 font-sans text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] text-forest leading-snug">drinks in every 32 oz bottle</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl">About ${BIG_EACH}</p>
              <p className="mt-1 font-sans text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] text-forest leading-snug">a drink in a 32 oz, vs $15 at our bar</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl">BYOB</p>
              <p className="mt-1 font-sans text-[10px] sm:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] text-forest leading-snug">bring a bottle, or add ours for ${BYOB_OFF}</p>
            </div>
          </div>
        </section>

        {/* Bottles */}
        <section id="bottles" className="scroll-mt-24 bg-cream py-20 md:py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-terracotta">The lineup</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl text-forest-deep">
                Seven bottles, <span className="font-script text-terracotta">zero proof</span>
              </h2>
              <p className="mt-4 mx-auto max-w-xl font-sans text-muted-foreground">
                A limited run, batched by hand for the holiday. Once a bottle sells out, it's gone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {BOTTLES.map((b) => (
                <BottleCard key={b.name} b={b} ordersOpen={ordersOpen} stock={stock} />
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-background py-20 md:py-24 px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-terracotta">How it works</p>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl text-forest-deep">Easy as pie</h2>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Calendar, title: `Pre-order by ${ORDER_BY}`, body: "Pick your bottles and pay online. It's a limited run, so earlier is better." },
                { icon: MapPin, title: `Pick up ${PICKUP_DAY}`, body: `Swing by our Pacific Beach shop at 1854 Garnet Ave, ${PICKUP_HOURS}.` },
                { icon: GlassWater, title: "Pour and pass", body: "About 4 oz over ice per glass. Garnish if you like, then let the table do the rest." },
              ].map((s, i) => (
                <li key={s.title} className="relative border-2 border-forest/15 p-7 bg-cream/40">
                  <span className="absolute -top-4 left-6 bg-forest-deep text-gold font-serif text-lg w-9 h-9 flex items-center justify-center">
                    {i + 1}
                  </span>
                  <s.icon className="h-7 w-7 text-terracotta mt-2" />
                  <h3 className="mt-4 font-serif text-xl text-forest-deep">{s.title}</h3>
                  <p className="mt-2 font-sans text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex gap-4 bg-forest text-cream p-6">
                <Recycle className="h-7 w-7 text-gold shrink-0" />
                <div>
                  <h3 className="font-serif text-xl">Bring your own bottle</h3>
                  <p className="mt-1 font-sans text-sm text-cream/80 leading-relaxed">
                    Prices are for your own clean 16 oz or 32 oz bottle, so bring it to pickup and we'll fill it.
                    No bottle? Add one of ours for ${BYOB_OFF}. We only have {BOTTLE_LIMIT} of each size.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 bg-sand/60 text-forest-deep p-6">
                <Snowflake className="h-7 w-7 text-ocean shrink-0" />
                <div>
                  <h3 className="font-serif text-xl">Keep it cold</h3>
                  <p className="mt-1 font-sans text-sm text-forest leading-relaxed">
                    These are made fresh, so keep them refrigerated until it's time to pour.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-terracotta text-cream py-20 px-6 text-center">
          <div className="grain absolute inset-0 pointer-events-none opacity-40" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="font-serif text-4xl md:text-5xl">
              Bring the good stuff <span className="font-script text-gold">to the table</span>
            </h2>
            <p className="mt-4 font-sans text-cream/85">
              100% alcohol-free and made for everyone at the table. Drink Differently. Live Free AF.
            </p>
            <a href="#bottles" className="inline-block mt-8">
              <Button
                size="lg"
                className="bg-cream text-forest-deep hover:bg-cream/90 font-sans text-sm font-bold uppercase tracking-widest px-8 py-6"
              >
                {ordersOpen ? `Pre-order by ${ORDER_BY}` : "See the lineup"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Thanksgiving;
