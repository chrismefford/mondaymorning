import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateFAQSchema, localBusinessSchema, SITE_URL } from "@/lib/seo";
import beachBonfire from "@/assets/lifestyle/beach-bonfire-beers.jpg";
import naWineCheers from "@/assets/lifestyle/na-wine-cheers.jpg";

const faqs = [
  {
    question: "Where can I buy non-alcoholic drinks in San Diego?",
    answer:
      "Monday Morning has two dedicated non-alcoholic bottle shops in San Diego. Visit us at 1854 Garnet Ave in Pacific Beach or 4967 Newport Ave in Ocean Beach. We carry over 500 zero-proof beers, wines, spirits, and functional drinks. You can also shop our full catalog online with shipping available.",
  },
  {
    question: "Do non-alcoholic drinks contain alcohol?",
    answer:
      "Most non-alcoholic drinks contain less than 0.5% ABV, which is the legal threshold. Many of our products are completely 0.0% ABV. For reference, a ripe banana contains roughly the same amount of alcohol as a 0.5% drink. Our staff can help you find options that match your preferences.",
  },
  {
    question: "What are the best non-alcoholic beers in San Diego?",
    answer:
      "We carry top-rated craft brands like Beaglepuss, Below Brew Co., FLVR!, Mash Gang, Capacity, and UNLTD. Popular styles include West Coast pilsners, helles lagers, Mexican lagers, IPAs, stouts, and wheat beers. Stop by our tasting bar to sample before you buy. Our staff stays current on every new release.",
  },
  {
    question: "Do you offer tastings?",
    answer:
      "Yes. Both of our San Diego locations have a tasting bar. Walk in any time during business hours and sample beers, spirits, and functional drinks on the shelf. For wines, tastings are available when we have a bottle already open that day — we don't always crack a new bottle just for a sample. We rotate featured tastings weekly so there is always something new to try.",
  },
  {
    question: "Can I order non-alcoholic drinks online?",
    answer:
      "Absolutely. Shop our full catalog at mondaymorning-af.com and get non-alcoholic drinks shipped directly to your door. We offer fast shipping across the US. Local San Diego customers can also arrange in-store pickup.",
  },
];

const faqSchema = generateFAQSchema(faqs);

const NonAlcoholicDrinksSanDiego = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Non-Alcoholic Drinks San Diego | 500+ Zero Proof Options"
        description="San Diego's largest non-alcoholic bottle shop. 500+ zero-proof beers, wines, spirits and functional drinks. Visit our Pacific Beach and Ocean Beach locations or shop online."
        path="/non-alcoholic-drinks-san-diego"
        schema={[localBusinessSchema, faqSchema]}
      />

      <Header />
      <main>
        {/* Section 1: Above-the-Fold Hero */}
        <section className="relative bg-forest py-20 lg:py-28 overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="absolute inset-0">
            <img
              src={beachBonfire}
              alt="Friends enjoying non-alcoholic drinks at a San Diego beach"
              className="w-full h-full object-cover opacity-20"
            />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
                Non-Alcoholic Drinks in San Diego
              </h1>
              <p className="font-sans text-lg text-cream/80 max-w-2xl mb-4 leading-relaxed">
                Monday Morning is San Diego's dedicated non-alcoholic bottle shop. We stock over 500 zero-proof beers, wines, spirits, and functional drinks. Walk into our Pacific Beach or Ocean Beach locations and try anything on the shelf before you buy. Prefer to shop from home? Our full catalog is available online with fast shipping.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/collections/all">
                  <Button
                    size="lg"
                    className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 bg-gold text-forest-deep hover:bg-gold/90"
                  >
                    Shop Online
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/locations">
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 border-2 border-cream/30 text-cream bg-transparent hover:bg-cream/10"
                  >
                    Visit Our San Diego Locations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Why San Diego Is Choosing Non-Alcoholic Drinks */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                Why San Diego Is Choosing Non-Alcoholic Drinks
              </h2>

              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  San Diego has always been a city that values health and quality of life. That mindset is driving a major shift in how people drink. More San Diegans are choosing non-alcoholic options without sacrificing flavor or social connection.
                </p>
                <p>
                  The sober-curious movement is not a trend. It is a lifestyle change. People want to wake up clear, train harder, and still enjoy a great drink at dinner. Non-alcoholic drinks make that possible.
                </p>
                <p>
                  Functional beverages are part of this shift. Adaptogens, nootropics, and botanical blends offer real benefits beyond hydration. Drinks that support focus, relaxation, or gut health are replacing alcohol for many San Diego professionals and athletes.
                </p>
                <p>
                  Social drinking no longer requires alcohol. Whether you are at a beach bonfire in Pacific Beach or dinner in Ocean Beach, non-alcoholic drinks let you participate fully without the hangover.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Largest Selection */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                  Largest Selection of Non-Alcoholic Drinks in San Diego
                </h2>

                <p className="font-sans text-base text-foreground/80 mb-8 leading-relaxed">
                  No other store in San Diego comes close to our range. Over 500 products across every category. Here is what you will find:
                </p>

                <ul className="space-y-4">
                  {[
                    {
                      title: "Non-Alcoholic Beer",
                      desc: "IPAs, lagers, stouts, sours, and wheat beers from Athletic Brewing, Bravus, Partake, and dozens more.",
                    },
                    {
                      title: "Non-Alcoholic Wine",
                      desc: "Reds, whites, rosés, and sparkling wines that deliver real complexity. No compromise on taste.",
                    },
                    {
                      title: "Non-Alcoholic Spirits",
                      desc: "Gin, whiskey, tequila, and rum alternatives built for cocktails. Mix them exactly like the originals.",
                    },
                    {
                      title: "Ready-to-Drink Mocktails",
                      desc: "Grab-and-go options for picnics, parties, and weeknight dinners. Open and enjoy.",
                    },
                    {
                      title: "Functional Beverages",
                      desc: "Adaptogens, nootropics, CBD, and botanical blends. Drinks that do more than taste good.",
                    },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-sans text-sm font-semibold text-forest block">
                          {item.title}
                        </span>
                        <span className="font-sans text-sm text-foreground/70">
                          {item.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link to="/collections/all">
                    <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6">
                      Browse All 500+ Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <img
                  src={naWineCheers}
                  alt="Non-alcoholic wine tasting in San Diego"
                  className="w-full h-[500px] object-cover border-2 border-forest/10"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Visit Our San Diego Bottle Shop */}
        <section className="py-16 lg:py-24 bg-forest text-cream">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <h2 className="font-serif text-3xl md:text-4xl text-cream mb-10 text-center">
              Visit Our San Diego Bottle Shop
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {/* Pacific Beach */}
              <div className="bg-cream/5 border border-cream/10 p-8">
                <h3 className="font-serif text-2xl text-gold mb-4 italic">Pacific Beach</h3>
                <div className="space-y-3 font-sans text-sm text-cream/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                    <span>1854 Garnet Ave, San Diego, CA 92109</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Mon–Sat: 11 AM – 8 PM</p>
                      <p>Sun: 11 AM – 4 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ocean Beach */}
              <div className="bg-cream/5 border border-cream/10 p-8">
                <h3 className="font-serif text-2xl text-gold mb-4 italic">Ocean Beach</h3>
                <div className="space-y-3 font-sans text-sm text-cream/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                    <span>4967 Newport Ave, San Diego, CA 92107</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <p>Mon–Sun: 9 AM – 6 PM</p>
                      <p>Wed: Open until 8 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-5 font-sans text-base text-cream/80 leading-relaxed">
              <p>
                Both locations feature a full tasting bar. Walk in and sample anything before you commit. Our staff knows every product on the shelf and will match you with something you love.
              </p>
              <p>
                We built these shops for anyone who wants better options. Athletes looking for post-workout drinks. Parents who want something special after bedtime. Professionals who refuse to sacrifice their mornings. And anyone who is simply curious about what non-alcoholic drinks can taste like in 2026.
              </p>
              <p>
                No judgment. No pressure. Just great drinks and people who care about what they are drinking.
              </p>
            </div>

            <div className="text-center mt-10">
              <Link to="/locations">
                <Button
                  size="lg"
                  className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 bg-gold text-forest-deep hover:bg-gold/90"
                >
                  Get Directions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: FAQs */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10 text-center">
                Frequently Asked Questions
              </h2>

              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="bg-background border-2 border-forest/10 px-6"
                  >
                    <AccordionTrigger className="font-sans text-sm font-semibold text-forest text-left hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-sans text-sm text-foreground/70 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 lg:py-20 bg-gold">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              Ready to Explore?
            </h2>
            <p className="font-sans text-forest/70 mb-8 max-w-lg mx-auto">
              San Diego's largest selection of non-alcoholic drinks is waiting. Shop online or stop by our Pacific Beach and Ocean Beach locations today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
                  variant="outline"
                  size="lg"
                  className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-10 py-6"
                >
                  Visit a Location
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

export default NonAlcoholicDrinksSanDiego;
