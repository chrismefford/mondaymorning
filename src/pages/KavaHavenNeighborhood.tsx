import { useParams, Link, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, MapPin, UtensilsCrossed, Wine, Beer, ExternalLink, Leaf } from "lucide-react";
import { generateFAQSchema, localBusinessSchema, SITE_URL } from "@/lib/seo";
import { getNeighborhoodBySlug } from "@/data/kavaHavenNeighborhoods";
import stampGold from "@/assets/stamp-gold.svg";
import textureBlue from "@/assets/texture-blue.svg";
import textureCream from "@/assets/texture-cream.svg";

const KavaHavenNeighborhood = () => {
  const { neighborhood } = useParams<{ neighborhood: string }>();
  const data = neighborhood ? getNeighborhoodBySlug(neighborhood) : undefined;

  if (!data) {
    return <Navigate to="/locations" replace />;
  }

  const faqSchema = generateFAQSchema(data.faqs);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.headline,
    description: data.heroSubtext,
    url: `${SITE_URL}/kava-haven/${data.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Monday Morning Bottle Shop",
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: `Kava Haven ${data.name}`, item: `${SITE_URL}/kava-haven/${data.slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Kava Haven ${data.name} | Buy Kava Drinks in ${data.name}`}
        description={data.heroSubtext}
        path={`/kava-haven/${data.slug}`}
        schema={[localBusinessSchema, faqSchema, articleSchema, breadcrumbSchema]}
      />

      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-forest py-20 lg:py-28 overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${textureBlue})`, backgroundSize: "cover" }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="absolute -bottom-20 -right-20 w-64 lg:w-96 opacity-[0.03] pointer-events-none">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              {/* Breadcrumbs */}
              <nav className="flex items-center gap-2 font-sans text-xs text-cream/50 mb-6 uppercase tracking-widest">
                <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                <span>/</span>
                <Link to="/locations" className="hover:text-gold transition-colors">Locations</Link>
                <span>/</span>
                <span className="text-gold">{data.name}</span>
              </nav>

              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
                <Leaf className="inline h-3 w-3 mr-1 -mt-0.5" />
                Kava Haven
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
                {data.headline}
              </h1>
              <p className="font-sans text-lg text-cream/80 max-w-2xl leading-relaxed">
                {data.heroSubtext}
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/collections/all">
                  <Button className="font-sans text-xs font-bold uppercase tracking-widest bg-gold text-forest hover:bg-gold/90 px-8 py-6">
                    Shop Kava Haven
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/locations">
                  <Button
                    variant="outline"
                    className="font-sans text-xs font-bold uppercase tracking-widest border-cream/30 text-cream hover:bg-cream/10 px-8 py-6"
                  >
                    Find a Store
                    <MapPin className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-16 lg:py-24 bg-cream relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: "cover" }}
          />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Why <span className="italic text-gold">{data.name}</span> Is Drinking Kava
              </h2>
              <p className="font-sans text-forest/80 leading-relaxed mb-8 text-lg">
                {data.intro}
              </p>
            </div>
          </div>
        </section>

        {/* What is Kava */}
        <section className="py-16 lg:py-24 bg-forest relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${textureBlue})`, backgroundSize: "cover" }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
                What Is Kava
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-6">
                Plant-Based <span className="italic">Relaxation</span>
              </h2>
              <p className="font-sans text-cream/80 leading-relaxed text-lg">
                {data.whyKava}
              </p>
            </div>
          </div>
        </section>

        {/* Local Angle / Where to Find */}
        <section className="py-16 lg:py-24 bg-cream relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.02] pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: "cover" }}
          />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
                Where to Find It
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Kava Haven in <span className="italic text-gold">{data.name}</span>
              </h2>
              <p className="font-sans text-forest/80 leading-relaxed text-lg mb-10">
                {data.localAngle}
              </p>

              {/* Partner cards */}
              <div className="space-y-4 mb-10">
                {data.nearbyPartners.map((partner, i) => (
                  <div
                    key={i}
                    className="bg-background border-2 border-forest/10 p-5 flex items-center justify-between"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-gold/10 border border-gold/20 flex items-center justify-center">
                        {partner.type === "restaurant" ? (
                          <UtensilsCrossed className="h-4 w-4 text-gold" />
                        ) : partner.type === "bar" ? (
                          <Wine className="h-4 w-4 text-gold" />
                        ) : (
                          <Beer className="h-4 w-4 text-gold" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-sans text-sm font-semibold text-forest">
                          {partner.name}
                        </h3>
                        <p className="font-sans text-xs text-forest/60 mt-1">
                          {partner.address}
                        </p>
                      </div>
                    </div>
                    <MapPin className="h-4 w-4 text-gold/40 flex-shrink-0" />
                  </div>
                ))}
              </div>

              {/* Nearest Monday Morning store */}
              <div className="bg-gold/10 border-2 border-gold/30 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gold/20 border border-gold/40 flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold block mb-1">
                      Nearest Monday Morning Store
                    </span>
                    <h3 className="font-sans text-sm font-semibold text-forest">
                      {data.nearbyStore.name}
                    </h3>
                    <p className="font-sans text-xs text-forest/60 mt-1">
                      {data.nearbyStore.address}
                    </p>
                    <Link
                      to="/locations"
                      className="font-sans text-xs text-gold font-semibold uppercase tracking-wide mt-3 inline-flex items-center gap-1 hover:underline"
                    >
                      Get Directions <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-forest relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{ backgroundImage: `url(${textureBlue})`, backgroundSize: "cover" }}
          />
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4 block">
                FAQ
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                Frequently Asked <span className="italic">Questions</span>
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                {data.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="bg-cream/5 border border-cream/10 px-6"
                  >
                    <AccordionTrigger className="font-sans text-sm font-semibold text-cream hover:text-gold text-left py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-sm text-cream/70 leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 bg-gold relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              Ready to Try Kava Haven?
            </h2>
            <p className="font-sans text-forest/70 mb-8 max-w-md mx-auto">
              Shop online or visit Monday Morning in person. Try before you buy at our tasting bar.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/collections/all">
                <Button
                  size="lg"
                  className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6"
                >
                  Shop Online
                </Button>
              </Link>
              <Link to="/locations">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-sans text-sm font-bold uppercase tracking-widest border-forest/30 text-forest hover:bg-forest/10 px-10 py-6"
                >
                  Visit a Store
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default KavaHavenNeighborhood;
