import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generateFAQSchema, websiteSchema } from "@/lib/seo";
import friendsCheers from "@/assets/lifestyle/friends-beach-toast.jpg";
import morningCouple from "@/assets/lifestyle/morning-patio-couple.jpg";
import botanicalBar from "@/assets/lifestyle/botanical-bar-2.jpg";

const faqs = [
  {
    question: "Where do I even start with non-alcoholic drinks?",
    answer:
      "Start with what you already like. If you drink beer, try a non-alcoholic IPA or lager. If you prefer wine, start with a non-alcoholic sparkling wine. If you like cocktails, pick up a non-alcoholic spirit and mix it the same way. Familiarity is your friend. Once you find something you love, branch out from there.",
  },
  {
    question: "Do non-alcoholic drinks actually taste good?",
    answer:
      "Yes. The quality has improved dramatically. The best non-alcoholic beers, wines, and spirits are genuinely excellent drinks that compete with alcoholic options on flavor, aroma, and complexity. The days of flat, sugary substitutes are over. Most people are surprised by how good modern NA drinks are on the first sip.",
  },
  {
    question: "Will I feel anything drinking non-alcoholic drinks?",
    answer:
      "You will not feel the effects of alcohol. However, functional non-alcoholic beverages are designed to provide a real effect through adaptogens, kava, nootropics, or CBD. Kin Euphorics, Aplós, and similar brands create drinks that many people find genuinely relaxing or mood-lifting, just through different pathways than alcohol.",
  },
  {
    question: "How do I explain it at social events?",
    answer:
      "You do not need to explain anything. A great non-alcoholic beer in your hand looks identical to a regular beer. A sparkling wine in a glass looks like wine. Most people at social events will not notice, and those who do rarely care. If someone asks, 'non-alcoholic' is a complete sentence.",
  },
  {
    question: "What should I buy first?",
    answer:
      "For first-timers: start with a non-alcoholic lager or pilsner if you like beer, a sparkling non-alcoholic wine if you prefer wine, or a starter non-alcoholic spirit if you enjoy cocktails. All three are beginner-friendly and immediately satisfying. Come into Monday Morning in San Diego and let us guide you with a tasting.",
  },
  {
    question: "Is non-alcoholic the same as alcohol-free?",
    answer:
      "In the US, both terms apply to beverages under 0.5% ABV. 'Alcohol-free' sometimes specifically indicates 0.0% ABV products. Both are safe for people reducing or eliminating alcohol. If you need certainty about 0.0%, look for products that explicitly state it on the label.",
  },
  {
    question: "Can I drink non-alcoholic drinks every day?",
    answer:
      "Yes. Unlike alcoholic beverages, non-alcoholic drinks carry none of the health risks associated with regular drinking. Many people incorporate NA drinks as a daily ritual: an evening wind-down drink, a beer with dinner, or a functional beverage in the afternoon, without any concern.",
  },
  {
    question: "How much do non-alcoholic drinks cost compared to regular drinks?",
    answer:
      "Premium non-alcoholic drinks are priced comparably to their alcoholic equivalents. A great NA craft beer costs about what a craft beer costs. Non-alcoholic spirits range from $25 to $50 for a bottle. Functional beverages can be premium-priced due to their ingredients. Budget options exist in every category.",
  },
];

const faqSchema = generateFAQSchema(faqs);

const starterPacks = [
  {
    title: "The Beer Starter",
    description: "A crisp non-alcoholic lager or pilsner. Familiar, refreshing, and instantly satisfying. A great first step for any beer drinker.",
    link: "/collections/na-beer",
    cta: "Shop NA Beer",
  },
  {
    title: "The Wine Starter",
    description: "A non-alcoholic sparkling white or rosé. Beautiful in a glass, great for dinner, and immediately recognizable as a wine experience.",
    link: "/collections/wine-alternatives",
    cta: "Shop NA Wine",
  },
  {
    title: "The Cocktail Starter",
    description: "A non-alcoholic gin or tequila alternative. Mix it exactly like the original spirit. Make a gin and tonic, a margarita, or whatever you love.",
    link: "/collections/spirit-alternatives",
    cta: "Shop NA Spirits",
  },
  {
    title: "The Functional Starter",
    description: "A botanical or adaptogen drink that offers a real effect. If you drink to unwind, these are built to deliver that same feeling through different chemistry.",
    link: "/collections/functional",
    cta: "Shop Functional",
  },
];

const NewToNonAlcoholic = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="New to Non-Alcoholic Drinks? Start Here | Beginner's Guide"
        description="Just getting into non-alcoholic drinks? This beginner's guide covers where to start, what to expect, and how to find non-alcoholic options you'll actually love in 2026."
        path="/new-to-non-alcoholic-drinks"
        schema={[faqSchema, websiteSchema]}
      />

      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-forest py-20 lg:py-28 overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="absolute inset-0">
            <img
              src={friendsCheers}
              alt="Friends discovering non-alcoholic drinks together"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
                New to Non-Alcoholic Drinks?
              </h1>
              <p className="font-sans text-lg text-cream/80 max-w-2xl mb-4 leading-relaxed">
                New to non-alcoholic drinks and not sure where to start? You are in the right place. This guide covers everything a beginner needs to know: what to expect, what to try first, and how to find drinks you will actually love.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/collections/best-sellers">
                  <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 bg-gold text-forest-deep hover:bg-gold/90">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="outline" size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 border-2 border-cream/30 text-cream bg-transparent hover:bg-cream/10">
                    Browse All Options
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Educational Intro */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                Why People Are Making the Switch
              </h2>
              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  Most people arrive at non-alcoholic drinks from different directions. Some want to cut alcohol for health reasons. Others are pregnant, in recovery, or training seriously. Many are simply sober-curious, interested in what life with less alcohol looks and feels like without a full commitment to sobriety.
                </p>
                <p>
                  Whatever brought you here, the good news is the same: the quality of non-alcoholic drinks in 2026 is extraordinary. You are not giving something up. You are gaining a new category of genuinely excellent drinks.
                </p>
                <p>
                  The sober-curious movement has reshaped the entire beverage industry. Major breweries, spirit brands, and new dedicated NA companies have all invested heavily in this space. The result is a market full of options that meet you wherever you are, whether you want something that tastes exactly like beer, functions like a cocktail, or actively improves your wellbeing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What to Expect */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                What to Expect When You Start
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-12 leading-relaxed">
                Honest expectations make the transition easier. Here is what you need to know going in.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    heading: "The first sip might surprise you",
                    body: "Non-alcoholic drinks often taste different from what you expect, sometimes better. Many people assume NA beer will be flat and thin. A great craft NA IPA tends to change that assumption immediately.",
                  },
                  {
                    heading: "You will not feel the same",
                    body: "You will not feel alcohol's effects. That is the point. What you will feel depends on what you drink: refreshed, satisfied, and present. Functional beverages can add their own effects through botanicals and adaptogens.",
                  },
                  {
                    heading: "Some categories are better than others",
                    body: "Non-alcoholic beer is the most advanced category. Wine is catching up fast. Spirits are very good in cocktails. Some categories are stronger than others, and personal taste matters. Try a few before committing to a category.",
                  },
                  {
                    heading: "Quality varies significantly by brand",
                    body: "Not all non-alcoholic drinks are created equal. The gap between a budget NA beer and a craft NA beer is noticeable. Start with well-reviewed brands to get an accurate impression of the category.",
                  },
                  {
                    heading: "Social situations work fine",
                    body: "A non-alcoholic beer looks like a beer. A sparkling wine in a glass looks like wine. You will rarely need to explain yourself, and when you do, most people are more curious than judgmental.",
                  },
                  {
                    heading: "Your tastes will evolve",
                    body: "Most people start with familiar styles and gradually explore more adventurous options. A NA lager drinker often becomes a NA sour drinker within a few months. There is a lot to discover.",
                  },
                ].map((item, i) => (
                  <div key={i} className="border-2 border-forest/10 bg-cream p-6">
                    <h3 className="font-sans text-sm font-semibold text-forest mb-2">{item.heading}</h3>
                    <p className="font-sans text-sm text-foreground/70 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Starter Packs */}
        <section className="py-16 lg:py-24 bg-forest text-cream">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
                Where to Start: New to Non-Alcoholic Drinks
              </h2>
              <p className="font-sans text-base text-cream/70 mb-12 leading-relaxed">
                Match your current drinking preferences to the best non-alcoholic starting point.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {starterPacks.map((pack) => (
                  <div key={pack.title} className="bg-cream/10 border border-cream/20 p-8 flex flex-col">
                    <h3 className="font-serif text-xl text-gold mb-3">{pack.title}</h3>
                    <p className="font-sans text-sm text-cream/80 leading-relaxed flex-grow mb-6">{pack.description}</p>
                    <Link to={pack.link}>
                      <Button className="font-sans text-xs font-bold uppercase tracking-widest bg-gold text-forest-deep hover:bg-gold/90 w-full">
                        {pack.cta}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Types of NA Drinks */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                Types of Non-Alcoholic Drinks Explained
              </h2>
              <div className="space-y-6">
                {[
                  {
                    type: "Non-Alcoholic Beer",
                    desc: "Brewed like regular beer, then dealcoholized. Every style exists: lagers, IPAs, stouts, sours, wheat beers. The most approachable and widely available category.",
                    link: "/collections/na-beer",
                  },
                  {
                    type: "Non-Alcoholic Wine",
                    desc: "Produced from real grapes, then dealcoholized through vacuum distillation. Reds, whites, rosés, and sparkling wines. Quality improves every year.",
                    link: "/collections/wine-alternatives",
                  },
                  {
                    type: "Non-Alcoholic Spirits",
                    desc: "Botanical distillates designed to replicate gin, whiskey, rum, tequila, and more. Built for cocktails. Mix them exactly like the originals.",
                    link: "/collections/spirit-alternatives",
                  },
                  {
                    type: "Functional Beverages",
                    desc: "Drinks that go beyond hydration. Adaptogens for stress, nootropics for focus, kava for relaxation, CBD for calm. The most innovative and fastest-growing segment.",
                    link: "/collections/functional",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                    <div>
                      <Link to={item.link} className="font-sans text-sm font-semibold text-forest hover:text-gold transition-colors">{item.type}</Link>
                      <p className="font-sans text-sm text-foreground/70 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* San Diego */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div className="relative hidden lg:block">
                <img
                  src={morningCouple}
                  alt="Morning coffee alternative drinks on a patio"
                  className="w-full h-[480px] object-cover border-2 border-forest/10"
                />
                <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                  Start with a Tasting in San Diego
                </h2>
                <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                  <p>
                    The easiest way to start is to taste. At both of our San Diego locations, we have a full tasting bar where you can sample before you commit to anything. Walk in, tell us where you are in your non-alcoholic journey, and we will guide you.
                  </p>
                  <p>
                    No pressure. No judgment. No need to justify your reasons. Everyone walks out with something they love.
                  </p>
                  <p>
                    If you prefer to start online, our catalog is fully available with detailed product descriptions to help you choose. Every product we stock has been personally tasted and approved by our team.
                  </p>
                </div>
                <div className="mt-8 flex gap-4">
                  <Link to="/locations">
                    <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6">
                      Find Our Locations
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10 text-center">
                Beginner Questions Answered
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`} className="bg-background border-2 border-forest/10 px-6">
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
              Ready to Take the First Sip?
            </h2>
            <p className="font-sans text-forest/70 mb-8 max-w-lg mx-auto">
              Shop our best-seller picks for beginners or visit us in San Diego and let our team guide your first tasting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/collections/best-sellers">
                <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6">
                  Start with Best Sellers
                </Button>
              </Link>
              <Link to="/locations">
                <Button variant="outline" size="lg" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-10 py-6">
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

export default NewToNonAlcoholic;
