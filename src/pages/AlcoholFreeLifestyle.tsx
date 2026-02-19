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
import wellnessRetreat from "@/assets/lifestyle/wellness-retreat-drinks.jpg";
import functionalWellness from "@/assets/lifestyle/functional-wellness-morning.jpg";
import gardenParty from "@/assets/lifestyle/garden-party-toast.jpg";

const faqs = [
  {
    question: "What are the health benefits of an alcohol-free lifestyle?",
    answer:
      "Eliminating or significantly reducing alcohol leads to measurable improvements across multiple areas: better sleep quality, improved liver function, clearer skin, reduced anxiety and depression, sharper mental focus, better physical performance, and lower risk of multiple cancers. Many people also report improved relationships, stronger morning routines, and more consistent energy levels.",
  },
  {
    question: "Is the sober-curious movement the same as sobriety?",
    answer:
      "No. Sober-curious is not the same as sobriety. Sober-curious describes a deliberate, investigative approach to alcohol — questioning your relationship with it without committing to complete abstinence. Many sober-curious people still drink occasionally but have significantly reduced their consumption and become more intentional about when and why they drink.",
  },
  {
    question: "How quickly will I see benefits from reducing alcohol?",
    answer:
      "Many people notice improved sleep within the first week. Skin changes are often visible within two to four weeks. Mental clarity and energy improvements typically appear within the first month. Longer-term benefits — liver recovery, reduced cancer risk, cardiovascular improvements — compound over months and years of reduced consumption.",
  },
  {
    question: "Will I miss alcohol at social events?",
    answer:
      "Most people are surprised by how little they miss alcohol when they have great alternatives in hand. The ritual of holding a drink, sipping something complex and flavorful, and participating in a toast is entirely preserved with non-alcoholic options. The absence of impairment is the main difference, and most people find that a welcome change.",
  },
  {
    question: "What do I drink instead of alcohol?",
    answer:
      "The best alcohol-free alternatives depend on what you love about drinking. If you love the flavor of beer, non-alcoholic craft beer is the answer. If you prefer cocktails, non-alcoholic spirits mixed the same way deliver a nearly identical experience. If you want an effect similar to light relaxation, functional beverages with kava, adaptogens, or CBD are worth exploring.",
  },
  {
    question: "Can I maintain an alcohol-free lifestyle and still have a social life?",
    answer:
      "Absolutely. The social dimension of drinking is about presence, ritual, and shared experience — none of which require alcohol. A great non-alcoholic drink in your hand at a party, a sparkling wine in a glass at a dinner toast, or a cold beer at a barbecue all support the same social function as their alcoholic equivalents.",
  },
  {
    question: "What are the best functional drinks for replacing alcohol's relaxing effect?",
    answer:
      "Kava-based drinks, ashwagandha formulations, and drinks containing L-theanine or calming adaptogens are the closest functional replacements for alcohol's relaxing effect. Brands like Kin Euphorics, Aplós, and Daytrip are specifically designed for this use case. Many people find them genuinely effective at creating a wind-down effect.",
  },
  {
    question: "Is it realistic to go alcohol-free long-term?",
    answer:
      "Yes, and an increasing number of people are doing it permanently. The availability of high-quality non-alcoholic alternatives has made long-term alcohol-free living genuinely enjoyable rather than a sacrifice. Many people who started sober-curious ended up discovering they preferred their lives without alcohol entirely.",
  },
];

const faqSchema = generateFAQSchema(faqs);

const benefits = [
  { area: "Sleep", detail: "Alcohol disrupts REM sleep. Without it, most people experience deeper, more restorative sleep within days." },
  { area: "Mental Clarity", detail: "Alcohol impairs cognition long after the effects wear off. Removing it sharpens focus, memory, and decision-making." },
  { area: "Physical Performance", detail: "Alcohol impairs protein synthesis and recovery. Athletes and active people see immediate performance gains." },
  { area: "Skin & Appearance", detail: "Alcohol dehydrates and causes inflammation. Most people see visible skin improvement within three to four weeks." },
  { area: "Mood & Mental Health", detail: "Alcohol is a depressant. Many people find their baseline mood improves significantly after reducing or eliminating it." },
  { area: "Weight & Metabolism", detail: "Alcohol calories are empty and numerous. Eliminating them — without changing anything else — often leads to weight loss." },
];

const AlcoholFreeLifestyle = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Alcohol-Free Lifestyle Benefits | Health, Clarity & Balance"
        description="Discover the real benefits of an alcohol-free lifestyle in 2026. From better sleep and mental clarity to the sober-curious movement — everything you need to know."
        path="/alcohol-free-lifestyle-benefits"
        schema={[faqSchema, websiteSchema]}
      />

      <Header />
      <main>
        {/* Hero */}
        <section className="relative bg-forest py-20 lg:py-28 overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="absolute inset-0">
            <img
              src={wellnessRetreat}
              alt="Wellness-focused alcohol-free lifestyle with botanical drinks"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream mb-6 leading-tight">
                Alcohol-Free Lifestyle Benefits
              </h1>
              <p className="font-sans text-lg text-cream/80 max-w-2xl mb-4 leading-relaxed">
                The alcohol-free lifestyle is one of the most impactful changes a person can make. Better sleep, sharper focus, improved physical performance, and a richer social life — without giving up the ritual of a great drink. This is what the sober-curious movement has unlocked.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link to="/collections/functional">
                  <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 bg-gold text-forest-deep hover:bg-gold/90">
                    Explore Zero Proof Drinks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/shop">
                  <Button variant="outline" size="lg" className="font-sans text-sm font-bold uppercase tracking-widest px-8 py-6 border-2 border-cream/30 text-cream bg-transparent hover:bg-cream/10">
                    Shop All Categories
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                The Sober-Curious Movement in 2026
              </h2>
              <div className="space-y-5 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  The sober-curious movement is not about abstinence ideology. It is about intentionality. It is about questioning whether alcohol is serving you — your health, your mornings, your relationships, your performance — and having the freedom to choose differently.
                </p>
                <p>
                  In 2026, the culture around alcohol has shifted. Major research has surfaced showing there is no safe level of alcohol consumption. Athletes at the highest levels are publicly alcohol-free. Social circles that once built everything around drinking are adapting to include everyone. The stigma around not drinking has largely evaporated.
                </p>
                <p>
                  What has replaced it is a genuine appreciation for the alcohol-free lifestyle — not as a compromise, but as an upgrade. The people living it are not giving something up. They are getting more back than they expected.
                </p>
                <p>
                  Non-alcoholic drinks are the bridge. They preserve the ritual, the flavor, and the social experience of drinking while eliminating the downsides entirely. At Monday Morning, we exist to make that bridge as good as possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                Health Benefits of Going Alcohol-Free
              </h2>
              <p className="font-sans text-base text-foreground/70 mb-12 leading-relaxed">
                The evidence is clear. Reducing or eliminating alcohol improves multiple dimensions of health simultaneously.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {benefits.map((item) => (
                  <div key={item.area} className="border-2 border-forest/10 bg-cream p-6">
                    <h3 className="font-sans text-sm font-bold uppercase tracking-widest text-gold mb-2">{item.area}</h3>
                    <p className="font-sans text-sm text-foreground/70 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Social & Lifestyle */}
        <section className="py-16 lg:py-24 bg-forest text-cream">
          <div className="grain absolute inset-0 pointer-events-none opacity-20" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-cream mb-8">
                The Social Benefits of the Alcohol-Free Lifestyle
              </h2>
              <div className="space-y-5 font-sans text-base text-cream/80 leading-relaxed">
                <p>
                  The most common concern about going alcohol-free is social. What do you do at parties? At dinners? At celebrations? The answer is the same thing everyone else is doing — just without the impairment.
                </p>
                <p>
                  Non-alcoholic drinks have eliminated the visual distinction. A great non-alcoholic beer in your hand looks identical to a regular beer. A sparkling NA wine in a glass is indistinguishable at a toast. The social ritual is preserved completely.
                </p>
                <p>
                  What changes is how you feel the next morning. And how you feel at 10 PM when the conversation is still good. And how you perform at 6 AM when you have not disrupted your sleep. The social experience stays. The downsides disappear.
                </p>
                <p>
                  In San Diego specifically, the beach culture, fitness culture, and outdoor lifestyle all align naturally with an alcohol-free approach. More social settings than ever accommodate and celebrate non-drinking choices. The environment has never been more supportive.
                </p>
              </div>

              <div className="mt-10">
                <Link to="/collections/functional">
                  <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-gold text-forest-deep hover:bg-gold/90 px-8 py-6">
                    Explore Functional Drinks
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                  Who the Alcohol-Free Lifestyle Is Perfect For
                </h2>
                <ul className="space-y-4">
                  {[
                    { group: "Athletes & Performance-Focused People", why: "Alcohol impairs recovery, sleep, and performance. Going alcohol-free is one of the highest-leverage health decisions an active person can make." },
                    { group: "Anyone Prioritizing Mental Health", why: "Alcohol is a depressant. Many people with anxiety, depression, or mood issues find significant improvement when alcohol is removed." },
                    { group: "The Sober-Curious", why: "You do not need a reason beyond curiosity. Exploring life without alcohol is always worthwhile." },
                    { group: "Parents & Caregivers", why: "Clarity, presence, and consistent energy are invaluable when you are responsible for others." },
                    { group: "Professionals Who Need to Perform", why: "Alcohol costs you mornings. Removing it gives them back, along with sharper thinking and better decision-making." },
                    { group: "Anyone in Recovery", why: "High-quality non-alcoholic drinks make social situations entirely manageable without compromise." },
                  ].map((item) => (
                    <li key={item.group} className="flex gap-3">
                      <CheckCircle className="h-5 w-5 text-gold mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-sans text-sm font-semibold text-forest block">{item.group}</span>
                        <span className="font-sans text-sm text-foreground/70">{item.why}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative hidden lg:block">
                <img
                  src={functionalWellness}
                  alt="Functional wellness drinks as part of an alcohol-free morning routine"
                  className="w-full h-[500px] object-cover border-2 border-forest/10"
                />
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-gold/30 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* How to Start */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-8">
                How to Start an Alcohol-Free Lifestyle
              </h2>
              <div className="space-y-6 font-sans text-base text-foreground/80 leading-relaxed">
                <p>
                  You do not need a dramatic announcement or a formal commitment. The most effective approach is simply to start replacing. The next time you reach for an alcoholic drink, reach for a non-alcoholic one instead. Do it for a week. Notice what changes.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 my-8">
                  {[
                    { step: "01", action: "Pick a starting point", detail: "Choose one occasion or habit where you will swap alcohol for a non-alcoholic alternative." },
                    { step: "02", action: "Stock good options", detail: "Having quality non-alcoholic drinks in your fridge makes the swap effortless. Start with what you already like." },
                    { step: "03", action: "Let results speak", detail: "Notice your sleep, your mornings, your mood. The benefits create their own momentum." },
                  ].map((step) => (
                    <div key={step.step} className="border-2 border-forest/10 bg-cream p-5">
                      <p className="font-sans text-xs font-bold text-gold uppercase tracking-widest mb-2">{step.step}</p>
                      <p className="font-sans text-sm font-semibold text-forest mb-2">{step.action}</p>
                      <p className="font-sans text-sm text-foreground/70 leading-relaxed">{step.detail}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Monday Morning carries over 500 non-alcoholic drinks across every category. Whatever your starting point, we have something that will make the transition feel less like sacrifice and more like discovery.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/shop">
                  <Button className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6">
                    Start Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/recipes">
                  <Button variant="outline" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-8 py-6">
                    Explore Recipes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 lg:py-24 bg-cream">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10 text-center">
                Alcohol-Free Lifestyle: Frequently Asked Questions
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
              Your Alcohol-Free Journey Starts Here
            </h2>
            <p className="font-sans text-forest/70 mb-8 max-w-lg mx-auto">
              Explore 500+ non-alcoholic drinks that make the alcohol-free lifestyle easy, enjoyable, and genuinely satisfying.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shop">
                <Button size="lg" className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-10 py-6">
                  Shop All Drinks
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" size="lg" className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-10 py-6">
                  Read Our Blog
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

export default AlcoholFreeLifestyle;
