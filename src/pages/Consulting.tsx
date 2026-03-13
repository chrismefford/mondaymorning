import { Helmet } from "@/lib/helmet-compat";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import ContactFormDialog from "@/components/ContactFormDialog";
import {
  Wine,
  GraduationCap,
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Users,
  Sparkles,
  Star,
} from "lucide-react";
import stampGold from "@/assets/stamp-gold.svg";
import logoSecondaryGold from "@/assets/logo-secondary-gold.svg";
import { SITE_NAME, SITE_URL, DEFAULT_OG_IMAGE } from "@/lib/seo";

const services = [
  {
    icon: Wine,
    title: "Menu Curation",
    description:
      "We design non-alcoholic menus tailored to your venue, audience, and price point — from craft cocktail bars to fine dining.",
  },
  {
    icon: GraduationCap,
    title: "Staff Training",
    description:
      "Equip your team with product knowledge, tasting notes, and upselling techniques for the NA category.",
  },
  {
    icon: Target,
    title: "Product Strategy",
    description:
      "Leverage our retail data and customer insights to select the right products for your market.",
  },
  {
    icon: TrendingUp,
    title: "Launch & Growth",
    description:
      "From soft launch to full rollout — we help you introduce non-alcoholic options that actually sell.",
  },
  {
    icon: BookOpen,
    title: "Category Education",
    description:
      "Workshops and seminars for hospitality teams, corporate groups, and wellness organizations.",
  },
  {
    icon: Users,
    title: "Event Programming",
    description:
      "Curated tastings, pop-ups, and brand activations that showcase the best in non-alcoholic beverages.",
  },
];

const stats = [
  { value: "200+", label: "Products Tested" },
  { value: "2", label: "Retail Locations" },
  { value: "50+", label: "Brands Carried" },
  { value: "1000s", label: "Customers Served" },
];

const Consulting = () => {
  return (
    <>
      <Helmet>
        <title>Non-Alcoholic Consulting | {SITE_NAME}</title>
        <meta
          name="description"
          content="Expert non-alcoholic beverage consulting for restaurants, bars, hotels, and brands. Menu curation, staff training, and product strategy from San Diego's leading NA bottle shop."
        />
        <link rel="canonical" href={`${SITE_URL}/consulting`} />
        <meta property="og:title" content={`Non-Alcoholic Consulting | ${SITE_NAME}`} />
        <meta
          property="og:description"
          content="Expert non-alcoholic beverage consulting for restaurants, bars, hotels, and brands."
        />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:url" content={`${SITE_URL}/consulting`} />
      </Helmet>

      <Header />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center bg-forest overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src={stampGold}
            alt=""
            className="absolute -right-20 -bottom-20 w-[500px] h-[500px] opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 py-32 relative z-10">
          <div className="max-w-3xl">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-6">
              Consulting & Advisory
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-cream leading-[0.95] mb-8">
              We Know
              <br />
              <span className="text-gold">Non-Alc.</span>
            </h1>
            <p className="font-sans text-lg text-cream/70 max-w-xl mb-10 leading-relaxed">
              From our retail floor to your venue — we bring real-world
              expertise in non-alcoholic beverages to help restaurants, bars,
              hotels, and brands build programs that perform.
            </p>
            <Button
              onClick={() => setContactOpen(true)}
              className="bg-gold text-forest hover:bg-gold-light font-sans text-sm font-bold uppercase tracking-widest px-10 py-6 border-0"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Us Stats */}
      <section className="bg-background border-b-2 border-foreground">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-4xl md:text-5xl text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-cream py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-4">
              What We Offer
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Our Services
            </h2>
            <p className="font-sans text-muted-foreground max-w-lg mx-auto">
              Everything you need to build a world-class non-alcoholic program.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-background border-2 border-foreground p-8 hover:border-gold transition-colors group"
                >
                  <div className="w-12 h-12 bg-forest flex items-center justify-center mb-6">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Monday Morning */}
      <section className="bg-forest py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <img
              src={logoSecondaryGold}
              alt=""
              className="h-12 mx-auto mb-8 opacity-60"
            />
            <h2 className="font-serif text-4xl md:text-5xl text-cream mb-6">
              Why Monday Morning?
            </h2>
            <p className="font-sans text-cream/60 leading-relaxed">
              We're not just consultants — we're operators. Every product we
              recommend has been tested on our retail floor, every strategy has
              been validated by real customers, and every insight comes from
              running San Diego's first non-alcoholic bottle shops.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {[
              "Real retail data from 200+ NA products",
              "Direct relationships with 50+ brands",
              "Hospitality-focused training programs",
              "Menu design rooted in actual customer behavior",
              "Event & tasting programming expertise",
              "San Diego market knowledge",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                <p className="font-sans text-sm text-cream/80">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-24 border-t-2 border-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <Sparkles className="h-8 w-8 text-gold mx-auto mb-6" />
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
              Let's Build Something
            </h2>
            <p className="font-sans text-muted-foreground mb-10 max-w-lg mx-auto">
              Whether you're launching a new NA program or elevating an existing
              one, we'd love to help. Reach out for a free consultation.
            </p>
            <Button
              onClick={() => setContactOpen(true)}
              className="bg-foreground text-background hover:bg-gold hover:text-foreground font-sans text-sm font-bold uppercase tracking-widest px-12 py-6 border-2 border-foreground"
            >
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <ContactFormDialog open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default Consulting;
