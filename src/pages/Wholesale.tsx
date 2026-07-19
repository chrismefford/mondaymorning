import { Helmet } from "@/lib/helmet-compat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import InquiryDialog from "@/components/InquiryDialog";
import TastingFormDialog from "@/components/TastingFormDialog";
import {
  Truck,
  GraduationCap,
  Sparkles,
  FlaskConical,
  Martini,
  Wine,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Store,
  Building2,
  Beer,
} from "lucide-react";
import stampGold from "@/assets/stamp-gold.svg";
import textureCream from "@/assets/texture-cream.webp";
import textureGreen from "@/assets/texture-green.webp";
import { SITE_NAME, DEFAULT_OG_IMAGE, TWITTER_HANDLE, getCanonicalUrl } from "@/lib/seo";

// The five ways we work with businesses. Each maps to a real agreement
// (B2B Supply / Consulting / Retail Curation / Lab Brewing / Vibations).
const offerings = [
  {
    id: "b2b",
    icon: Truck,
    eyebrow: "B2B & Distribution",
    title: "Stock your bar with",
    accent: "better.",
    who: "For bars, restaurants, hotels, and shops.",
    body: "We supply curated non-alcoholic beer, wine, spirits, and functional drinks, then help you build a menu that actually moves. No liquor license, no guesswork. Once you're approved, reordering is self-serve: order by the case online anytime, with wholesale pricing built in.",
    points: [
      "A curated set chosen to sell, not sit on the shelf",
      "Staff training so your team recommends with confidence",
      "Seasonal rotations that keep regulars curious",
      "Order by the case online, with wholesale case pricing applied at checkout, plus fast local delivery",
      "Need just a few? Single bottles are 25% off in-store, anytime you want to top up",
    ],
    cta: "wholesale",
    ctaLabel: "Apply for wholesale",
  },
  {
    id: "consulting",
    icon: GraduationCap,
    eyebrow: "Consulting",
    title: "Build a program that",
    accent: "actually sells.",
    who: "For venues and brands growing alcohol-free the right way.",
    body: "We built our own AF program from the floor up, across two shops and a tasting bar. We'll do the same for you: menu design, staff training, product strategy, and launch.",
    points: [
      "Menu curation tailored to your venue and price point",
      "Staff training and tasting notes for the NA category",
      "Product strategy backed by real retail sales data",
      "Soft launch to full rollout support",
    ],
    cta: "contact",
    ctaLabel: "Book a consult",
  },
  {
    id: "popups",
    icon: Store,
    eyebrow: "Retail Pop-Ups",
    title: "Bring the bottle shop",
    accent: "to you.",
    who: "For stores, markets, offices, and events.",
    body: "We set up a curated Monday Morning pop-up inside your space, a full bottle shop experience or a featured set, staffed and stocked by us.",
    points: [
      "Turnkey pop-up bottle shops",
      "Curated retail sets and featured-brand displays",
      "On-site tastings that drive sales",
      "Flexible, from a single weekend to a full season",
    ],
    cta: "contact",
    ctaLabel: "Plan a pop-up",
  },
  {
    id: "brewing",
    icon: FlaskConical,
    eyebrow: "Contract Brewing",
    title: "Brew it at",
    accent: "The Lab.",
    who: "For emerging and established alcohol-free brands.",
    body: "Our San Marcos facility is one of the only NA-focused production partners in Southern California, and home to San Diego County's first non-alcoholic brewery taproom, now open. We brew, can, and white-label non-alcoholic beer, tea, coffee, sparkling water, and ready-to-drink (RTD) beverages.",
    points: [
      "Beer, tea, coffee, water, and RTD, all alcohol-free.",
      "Recipe development and small-batch trials",
      "White-label and private-label production",
      "Scale from first run to full distribution",
    ],
    cta: "brewing",
    ctaLabel: "Start your brew intake",
  },
  {
    id: "events",
    icon: Martini,
    eyebrow: "Events & Vibations",
    title: "Vibations for",
    accent: "every occasion.",
    who: "For weddings, parties, and corporate events.",
    body: "Our Vibations bartending team and tasting space bring craft alcohol-free service anywhere, so everyone has something good in hand.",
    points: [
      "Vibations bartending and mobile service",
      "Private events in our tasting space",
      "Weddings and celebrations",
      "Brand activations and guided tastings",
    ],
    cta: "contact",
    ctaLabel: "Inquire about events",
  },
];

// Category / industry figures (not Monday Morning guarantees).
const marketStats = [
  { value: "$25B+", label: "global non-alcoholic beer market" },
  { value: "1 in 3", label: "adults are drinking less, across every generation" },
  { value: "80%+", label: "typical gross margin on a craft NA drink" },
  { value: "$0", label: "alcohol tax or liquor license needed" },
];

// Notable venues we already supply.
const partners = [
  { name: "BoujieMana", note: "Yelp's #8 Best New Restaurant in the USA" },
  { name: "Miss B's Coconut Club", note: "Mission Beach" },
  { name: "Bare Back Grill", note: "Pacific Beach" },
  { name: "Queenstown Village", note: "La Jolla" },
  { name: "Paradisaea", note: "Bird Rock" },
  { name: "The Lodge at Torrey Pines", note: "La Jolla" },
  { name: "Good News Bar", note: "University Heights" },
  { name: "Boney's Bayside Market", note: "Coronado" },
];

const comparison = [
  { feature: "Tastes syrupy and sweet", them: true, us: false },
  { feature: "Genuine craft-cocktail quality", them: false, us: true },
  { feature: "Functional benefits (adaptogens, nootropics)", them: false, us: true },
  { feature: "On-trend, pulls new guests in", them: false, us: true },
  { feature: "Margins worth building a program on", them: false, us: true },
];

const OfferingCTA = ({ offering, label }: { offering: string; label: string }) => {
  const btn = (
    <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-7 py-5 group">
      {label}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
  // Every offering (incl. B2B) captures into the unified inquiries table, tagged
  // by offering, and syncs to the CRM for vetting + Shopify B2B setup on approval.
  return <InquiryDialog offering={offering as never} trigger={btn} />;
};

const Wholesale = () => {
  const pageTitle = "How We Can Help | Monday Morning Bottle Shop";
  const pageDescription =
    "Work with Monday Morning: non-alcoholic wholesale and distribution, consulting, retail pop-ups, contract brewing at The Lab, and Vibations event service. Operators, not just consultants.";
  const canonicalUrl = getCanonicalUrl("/services");

  return (
    <div className="min-h-screen bg-background brand-type">
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

      <main>
        {/* HERO */}
        <section className="relative pt-28 lg:pt-32 pb-12 lg:pb-16 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: "cover" }}
          />
          <div className="absolute top-20 right-6 lg:right-16 w-28 lg:w-44 opacity-[0.1] pointer-events-none rotate-6">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-5 block">
                Partner With Us
              </span>
              <h1 className="font-serif text-5xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6">
                Let's build the alcohol-free shift <span className="font-script text-gold text-[1.15em] leading-none whitespace-nowrap">together.</span>
              </h1>
              <p className="font-sans text-lg lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
                We help bars, restaurants, retailers, and brands win the fastest-growing category in beverage. Five ways to partner with us, all run by people who do this for a living.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <InquiryDialog
                  offering="general"
                  trigger={
                    <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6 group">
                      Start a conversation
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  }
                />
                <TastingFormDialog
                  trigger={
                    <Button size="lg" variant="outline" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-8 py-6">
                      Come taste first
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="py-12 lg:py-16 bg-gold-warm text-forest relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{ backgroundImage: `url(${textureGreen})`, backgroundSize: "cover" }}
          />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mb-10">
              <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-forest-deep mb-4 block">
                Why Hire Us
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-forest">
                Not just consultants, <span className="font-script text-forest-deep text-[1.2em] leading-none">operators.</span>
              </h2>
              <p className="font-sans text-base lg:text-lg text-forest/70 leading-relaxed mt-4">
                We don't theorize about the alcohol-free category. We run it: two bottle shops, a tasting bar, a brewery, and a wholesale program supplying San Diego's best venues. Everything we'd advise, we've already done ourselves.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { icon: Store, value: "2 shops", label: "Pacific Beach & Ocean Beach" },
                { icon: Beer, value: "The Lab", label: "Our NA brewery in San Marcos" },
                { icon: Building2, value: "50+ accounts", label: "Bars, restaurants & markets served" },
                { icon: Sparkles, value: "Inc · AP · Fox", label: "Featured nationally" },
              ].map((s) => (
                <div key={s.label}>
                  <s.icon className="h-6 w-6 text-forest-deep mb-3" />
                  <div className="font-serif text-2xl lg:text-3xl text-forest mb-1">{s.value}</div>
                  <p className="font-sans text-xs lg:text-sm text-forest/60 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OFFERINGS QUICK NAV */}
        <section className="py-10 lg:py-12 bg-cream relative overflow-hidden border-b border-forest/10">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <p className="text-center font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-6">
              Five Ways We Help
            </p>
            <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
              {offerings.map((o) => (
                <a
                  key={o.id}
                  href={`#${o.id}`}
                  className="inline-flex items-center gap-2 border-2 border-forest/20 px-5 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-forest hover:border-gold hover:bg-gold/10 transition-colors"
                >
                  <o.icon className="h-4 w-4 text-gold" />
                  {o.eyebrow}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* OFFERING BLOCKS */}
        {offerings.map((o, i) => (
          <section
            key={o.id}
            id={o.id}
            className={`scroll-mt-28 py-12 lg:py-16 relative overflow-hidden ${i % 2 === 0 ? "bg-cream" : "bg-sand"}`}
          >
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                {/* Left: intro + CTA */}
                <div className="lg:col-span-5 mb-8 lg:mb-0">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gold/15 border-2 border-gold/40 mb-5">
                    <o.icon className="h-7 w-7 text-forest" />
                  </div>
                  <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-3 block">
                    {o.eyebrow}
                  </span>
                  <h2 className="font-serif text-3xl lg:text-4xl xl:text-5xl leading-[1.05] mb-4">
                    {o.title} <span className="font-script text-gold text-[1.2em] leading-none">{o.accent}</span>
                  </h2>
                  <p className="font-sans text-sm font-semibold uppercase tracking-wider text-forest/60 mb-6">
                    {o.who}
                  </p>
                  <OfferingCTA offering={o.id} label={o.ctaLabel} />
                </div>

                {/* Right: detail */}
                <div className="lg:col-span-7">
                  <p className="font-sans text-lg lg:text-xl text-muted-foreground leading-relaxed mb-6">
                    {o.body}
                  </p>
                  <ul className="space-y-3">
                    {o.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                        <span className="font-sans text-base text-forest/80">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* THE OPPORTUNITY */}
        <section className="py-12 lg:py-16 bg-forest text-cream relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-40" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
                Why Now
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-cream">
                They're not avoiding drinking. They're avoiding <span className="font-script text-gold text-[1.15em] leading-none">alcohol.</span>
              </h2>
              <p className="font-sans text-base lg:text-lg text-cream/80 leading-relaxed mt-4">
                People still want the ritual, the night out, the drink in hand, just without the hangover. The numbers behind the shift:
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {marketStats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-serif text-3xl lg:text-5xl text-gold mb-2">{s.value}</div>
                  <p className="font-sans text-[11px] lg:text-sm text-cream/60 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-center font-sans text-[11px] text-cream/40 mt-8">
              Category and industry estimates, shown to size the opportunity.
            </p>
          </div>
        </section>

        {/* NOT MOCKTAILS */}
        <section className="py-12 lg:py-16 bg-cream relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
                The Difference
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-forest">
                We don't do <span className="font-script text-gold text-[1.15em] leading-none">mocktails.</span>
              </h2>
              <p className="font-sans text-base lg:text-lg text-muted-foreground leading-relaxed mt-4">
                The word says it all: a "mocktail" is a mockery of the real thing. What we pour is craft, functional, and alcohol-free, the kind of drink your guests actually order again.
              </p>
            </div>
            <div className="max-w-3xl mx-auto border-2 border-forest">
              <div className="grid grid-cols-3 bg-forest text-cream">
                <div className="p-4" />
                <div className="p-4 font-sans text-[10px] lg:text-xs font-bold uppercase tracking-wider text-center text-cream/60">The usual NA</div>
                <div className="p-4 font-sans text-[10px] lg:text-xs font-bold uppercase tracking-wider text-center text-gold">Monday Morning</div>
              </div>
              {comparison.map((row, i) => (
                <div key={row.feature} className={`grid grid-cols-3 ${i % 2 === 1 ? "bg-sand" : "bg-cream"} border-t border-forest/15`}>
                  <div className="p-4 font-sans text-sm text-forest/80">{row.feature}</div>
                  <div className="p-4 flex justify-center items-center">
                    {row.them ? <CheckCircle2 className="h-5 w-5 text-forest/25" /> : <XCircle className="h-5 w-5 text-forest/15" />}
                  </div>
                  <div className="p-4 flex justify-center items-center">
                    {row.us ? <CheckCircle2 className="h-5 w-5 text-gold" /> : <XCircle className="h-5 w-5 text-forest/15" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section className="py-12 lg:py-16 bg-sand relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
                In Good Company
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] text-forest">
                San Diego's best already <span className="font-script text-gold text-[1.2em] leading-none">pour with us.</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 max-w-5xl mx-auto">
              {partners.map((p) => (
                <div key={p.name} className="bg-cream border-2 border-forest/15 p-5 text-center">
                  <h3 className="font-serif text-lg lg:text-xl text-forest leading-tight">{p.name}</h3>
                  <p className="font-sans text-[11px] text-forest/50 mt-1">{p.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 lg:py-20 bg-gold relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-4xl lg:text-6xl leading-[1.02] text-forest mb-5">
                Tell us what you're <span className="font-script text-forest-deep text-[1.15em] leading-none">building.</span>
              </h2>
              <p className="font-sans text-lg text-forest/80 mb-8">
                One conversation and we'll point you to the right fit, whether that's a wholesale account, a consult, a pop-up, a brew run, or an event. Or just come taste first.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <InquiryDialog
                  offering="general"
                  trigger={
                    <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6 group">
                      Start a conversation
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  }
                />
                <TastingFormDialog
                  trigger={
                    <Button size="lg" variant="outline" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-8 py-6">
                      Come taste first
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Wholesale;
