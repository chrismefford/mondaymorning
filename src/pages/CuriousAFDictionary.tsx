import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import { SITE_URL, generateFAQSchema } from "@/lib/seo";

interface Term {
  term: string;
  slug: string;
  definition: string;
}

interface Section {
  letter: string;
  terms: Term[];
}

const sections: Section[] = [
  {
    letter: "A",
    terms: [
      {
        term: "Adaptogenic Drink",
        slug: "adaptogenic-drink",
        definition:
          "A non alcoholic beverage formulated with adaptogens, herbs and mushrooms (ashwagandha, reishi, rhodiola, tulsi, holy basil) that help the body manage stress. Adaptogenic drinks promise calm without the depressant effect of alcohol. Brands like Three Spirit, Kin Euphorics, and De Soi lead the category. Effects are real for some people, subtle for others. Worth experimenting.",
      },
      {
        term: "AF",
        slug: "af",
        definition:
          'Two meanings, both useful. The original: "as fuck," an intensifier ("tired AF," "curious AF"). The newer: alcohol free, a beverage with 0.0% alcohol by volume. The sober space took the first meaning and bolted on the second, giving the alcohol free movement a name with attitude built in. Both meanings now live side by side.',
      },
      {
        term: "Alcohol-Free",
        slug: "alcohol-free",
        definition:
          "A beverage with 0.0% alcohol by volume. Stricter than non alcoholic. In the United States, alcohol free is a labeling claim that requires zero detectable alcohol, while non alcoholic permits up to 0.5% ABV. The distinction matters for people in recovery, pregnant women, observant Muslims, and anyone avoiding even trace alcohol for medical reasons.",
      },
      {
        term: "Alcohol Use Disorder (AUD)",
        slug: "alcohol-use-disorder",
        definition:
          'The clinical name for what people used to call alcoholism. AUD is a medical diagnosis defined by the DSM-5, ranging from mild to severe based on the number of symptoms present. Treatment professionals use AUD instead of "alcoholic" because it puts the person before the condition and acknowledges that problem drinking is not binary.',
      },
      {
        term: "Alt-Sober",
        slug: "alt-sober",
        definition:
          "Someone who pursues sobriety outside the traditional 12-step path. Coined by writer Tawny Lara, alt-sober describes people who got sober through therapy, medication, harm reduction, fitness, faith, or just deciding to stop. AA works for many people. Alt-sober is a name for the rest.",
      },
    ],
  },
  {
    letter: "C",
    terms: [
      {
        term: "California Sober",
        slug: "california-sober",
        definition:
          "Someone who avoids alcohol but uses cannabis or psychedelics. The term is contested in recovery circles, where some argue any substance use disqualifies sobriety and others insist harm reduction is still progress. California Sober entered the mainstream when Demi Lovato used it in 2021. Like every term in this dictionary, it means what the person using it says it means.",
      },
      {
        term: "Canna Curious",
        slug: "canna-curious",
        definition:
          'Curious about cannabis, especially as a possible replacement for alcohol. The term echoes "sober curious" and applies to people exploring whether legal cannabis fits their lifestyle better than alcohol. Canna curiosity has accelerated in states with adult-use legalization and overlaps heavily with the California Sober crowd.',
      },
      {
        term: "Curious AF",
        slug: "curious-af",
        definition:
          "The state of being open to drinking less without committing to anything. Curious AF is the doorway. You have not quit. You are not in recovery. You just want to know what life looks like when you swap a few drinks for something better. Sober curious with a sharper tongue and no ideology required.",
      },
    ],
  },
  {
    letter: "D",
    terms: [
      {
        term: "Damp January",
        slug: "damp-january",
        definition:
          "The softer cousin of Dry January. Instead of going fully alcohol free for the month, damp drinkers cut back significantly: maybe weekends only, maybe a two-drink ceiling, maybe alcohol on social occasions but never solo. Damp January acknowledges that for many people, modification works better than total abstinence.",
      },
      {
        term: "Damp Lifestyle",
        slug: "damp-lifestyle",
        definition:
          "A year-round version of Damp January. People living the damp lifestyle do not quit drinking, they just make it occasional and intentional. The damp lifestyle has gained traction with people who tried Dry January, learned something about themselves, and decided permanent moderation suited them better than permanent abstinence.",
      },
      {
        term: "Dealcoholized",
        slug: "dealcoholized",
        definition:
          "A wine, beer, or spirit that started with alcohol and had it removed. Dealcoholized drinks are made by fermenting normally, then stripping the alcohol through reverse osmosis, vacuum distillation, or spinning cone column extraction. The process preserves more of the original flavor than brewing alcohol free from the start, which is why dealcoholized wine tastes closer to wine.",
      },
      {
        term: "Done AF",
        slug: "done-af",
        definition:
          'Slang for finished with drinking. Not curious, not damp, not exploring. Done. Done AF is the language of someone past the deliberation phase, someone who tried sober curiosity and decided to make it permanent. Less clinical than "sober," less loaded than "in recovery," and entirely owned by the person using it.',
      },
      {
        term: "Drink Differently",
        slug: "drink-differently",
        definition:
          'Monday Morning\'s tagline and a phrase that captures the entire alcohol free movement. You are not quitting drinking. You are drinking different things. The shift from "I do not drink" to "I drink differently" reframes the conversation around inclusion instead of subtraction.',
      },
      {
        term: "Dry AF",
        slug: "dry-af",
        definition:
          "Completely alcohol free, with conviction. Dry AF describes someone or something that takes a firm no-alcohol stance, often during a specific period (Dry January, Dry July) or as a permanent lifestyle choice. The phrase works equally well for the person and the bar tab.",
      },
      {
        term: "Dry Drunk",
        slug: "dry-drunk",
        definition:
          "Someone who has stopped drinking but has not dealt with anything underneath. Dry drunks are sober but still angry, resentful, or stuck in the patterns that drove the drinking. Recovery communities use the term as a warning that abstinence alone is not the whole job.",
      },
      {
        term: "Dry January",
        slug: "dry-january",
        definition:
          "The annual challenge to give up alcohol for the month of January. Started by Alcohol Change UK in 2013, Dry January has gone global and is now the single biggest entry point into the alcohol free category. Sales of non alcoholic beverages spike sharply in late December and early January as people stock up.",
      },
    ],
  },
  {
    letter: "F",
    terms: [
      {
        term: "Functional Beverage",
        slug: "functional-beverage",
        definition:
          "A drink that delivers something beyond hydration: focus, calm, energy, sleep, gut health. Functional beverages typically use adaptogens, nootropics, prebiotics, electrolytes, or cannabinoids. The category exploded as people quit alcohol and looked for replacements that did something instead of nothing.",
      },
    ],
  },
  {
    letter: "G",
    terms: [
      {
        term: "Grey Area Drinker",
        slug: "grey-area-drinker",
        definition:
          "Someone whose drinking is not severe enough to qualify as alcohol use disorder but is not casual enough to feel fine. Grey area drinkers occupy the space between heavy social drinking and clinical addiction. They might drink a glass of wine every night, blackout occasionally, or wake up feeling worse than the drinking should warrant. Coined by sobriety coach Jolene Park.",
      },
    ],
  },
  {
    letter: "M",
    terms: [
      {
        term: "Mindful AF",
        slug: "mindful-af",
        definition:
          "The intersection of mindful drinking and alcohol free living. Mindful AF describes a posture: you are paying attention to what you put in your body, you are choosing alcohol free more often than not, and you are not apologizing for either. It is the version of wellness culture that did not get sanctimonious.",
      },
      {
        term: "Mindful Drinking",
        slug: "mindful-drinking",
        definition:
          "The practice of paying attention to when, why, and how much you drink. Mindful drinking does not require quitting. It requires noticing. People who drink mindfully ask themselves whether they actually want a drink before they pour one, and they stop when the answer turns into a habit.",
      },
      {
        term: "Mocktail",
        slug: "mocktail",
        definition:
          "A non alcoholic cocktail. The word is on its way out among alcohol free professionals, who argue that mocktail implies the drink is mocking or imitating something better. Newer terms include spirit-free cocktail, zero proof cocktail, or just cocktail with an NA designation. The drink itself stays popular regardless of what we call it.",
      },
    ],
  },
  {
    letter: "N",
    terms: [
      {
        term: "NA (Non-Alcoholic)",
        slug: "na-non-alcoholic",
        definition:
          'A drink with less than 0.5% alcohol by volume. Non alcoholic is the legal threshold in the United States, set by the TTB. NA beer, NA wine, and NA spirits all fall under this label. Not the same as alcohol free, which means 0.0%. Most "non alcoholic" beer contains roughly the same trace alcohol as a ripe banana.',
      },
      {
        term: "Nootropic Drink",
        slug: "nootropic-drink",
        definition:
          "A non alcoholic beverage formulated for cognitive function. Nootropic drinks typically contain ingredients like L-theanine, lion's mane, alpha-GPC, or calibrated caffeine doses. The category overlaps with adaptogenic drinks but emphasizes mental clarity and focus rather than stress response. Brands like Magic Mind and TruBrain live here.",
      },
    ],
  },
  {
    letter: "S",
    terms: [
      {
        term: "Sober",
        slug: "sober",
        definition:
          "Not currently drinking alcohol. Sober is one of the most flexible words in this dictionary. It can describe an hour, a day, a decade, or a permanent life change. Some people use it only for those in formal recovery. Others use it any time they are not drinking. Both uses are correct.",
      },
      {
        term: "Sober AF",
        slug: "sober-af",
        definition:
          'Sober and not quiet about it. Sober AF is the confident, unembarrassed version of sobriety, usually worn by people who are years past the awkward "no thanks I am not drinking" phase. The term carries pride and a slight middle finger, which is why it landed.',
      },
      {
        term: "Sober Curious",
        slug: "sober-curious",
        definition:
          "Curious about reducing or eliminating alcohol. Coined by Ruby Warrington in 2015, sober curious describes people who want to examine their relationship with drinking without committing to lifelong abstinence. The term opened the door for millions of moderate drinkers who did not see themselves in traditional recovery language.",
      },
      {
        term: "Sober October",
        slug: "sober-october",
        definition:
          "A month-long alcohol break in October, popularized by Joe Rogan and his circle. Sober October draws a different crowd than Dry January: more men, more athletes, often paired with fitness challenges. Same idea, different season, slightly more bro.",
      },
      {
        term: "Soberversary",
        slug: "soberversary",
        definition:
          "The anniversary of the day someone stopped drinking. Also called a soberthday. Treated as a real birthday in recovery communities, with cards, dinners, and social posts. Marking time matters because each year sober is genuinely difficult, regardless of how easy it looks from the outside.",
      },
      {
        term: "Spirit-Free",
        slug: "spirit-free",
        definition:
          'A non alcoholic version of a spirit category: spirit-free gin, spirit-free whiskey, spirit-free tequila. The term replaced "non alcoholic spirit" in better bars because spirit-free sounds like a positive identity rather than a subtraction. The category includes Ritual, Lyre\'s, Wilderton, Free Spirits, and dozens more.',
      },
    ],
  },
  {
    letter: "T",
    terms: [
      {
        term: "Teetotaler",
        slug: "teetotaler",
        definition:
          "Someone who completely abstains from alcohol. The word dates to the 1830s temperance movement in England and originally meant total abstinence, with the T emphasized for capital-T total. Teetotaler still works as a precise descriptor, though it carries a slightly old-fashioned, almost Victorian flavor.",
      },
    ],
  },
  {
    letter: "W",
    terms: [
      {
        term: "Wellness AF",
        slug: "wellness-af",
        definition:
          "The wellness lifestyle taken seriously enough to drop alcohol. Wellness AF is the overlap between people doing cold plunges and people drinking adaptogenic seltzer. It is the demographic that made functional non alcoholic drinks a permanent retail category.",
      },
    ],
  },
  {
    letter: "Z",
    terms: [
      {
        term: "Zero Proof",
        slug: "zero-proof",
        definition:
          "A drink with no alcohol at all. Zero proof is industry-friendly language for alcohol free, and the term has gained ground because it sounds celebratory rather than abstinent. A zero proof bar is a fully stocked bar that just happens to not pour alcohol. The vibe is the point.",
      },
    ],
  },
];

const faqs = [
  {
    question: "What does AF mean in drinks?",
    answer:
      'AF stands for alcohol free, meaning a beverage with 0.0% alcohol by volume. It is also slang for "as fuck," used as an intensifier. The alcohol free movement adopted both meanings, so phrases like "Curious AF" or "Sober AF" carry double weight: alcohol free, plus attitude.',
  },
  {
    question: "What is the difference between alcohol-free and non-alcoholic?",
    answer:
      "Alcohol free means 0.0% alcohol by volume. Non alcoholic means less than 0.5% ABV, which is the legal threshold in the United States. A non alcoholic beer can contain trace alcohol comparable to ripe fruit. An alcohol free beer contains none. The distinction matters most for people in recovery, pregnancy, certain medications, and religious observance.",
  },
  {
    question: "What does it mean to be Curious AF?",
    answer:
      "Curious AF means you are open to drinking less without committing to quitting. You have not joined a program. You have not sworn off anything. You just want to know what life feels like when alcohol takes a smaller role. Curious AF is the most low-pressure entry point into the alcohol free category.",
  },
  {
    question: "Is sober curious the same as sober?",
    answer:
      "No. Sober curious means you are examining your relationship with alcohol, often while still drinking sometimes. Sober means you are not currently drinking. Sober curious is exploration. Sober is a state. People often pass through sober curious on the way to sober, but plenty stay curious indefinitely and that is a valid place to live.",
  },
  {
    question: "What is the best way to start drinking alcohol-free?",
    answer:
      "Pick one situation where alcohol normally shows up (dinner, social event, evening wind-down) and replace it with a quality alcohol free option you actually like. Do not start with the worst-tasting NA beer you can find. Start with something good. The category has come a long way since 2018, and the right first drink decides whether you stick with it.",
  },
];

const CuriousAFDictionary = () => {
  const path = "/blog/curious-af-dictionary";
  const allTerms = sections.flatMap((s) => s.terms);

  const definedTermSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "The Curious AF Dictionary",
    description:
      "The vocabulary of drinking less, defined. A glossary of alcohol free, sober curious, and mindful drinking terms.",
    url: `${SITE_URL}${path}`,
    hasDefinedTerm: allTerms.map((t) => ({
      "@type": "DefinedTerm",
      "@id": `${SITE_URL}${path}#${t.slug}`,
      name: t.term,
      description: t.definition,
      inDefinedTermSet: `${SITE_URL}${path}`,
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Curious AF Dictionary",
    description: "The vocabulary of drinking less, defined.",
    author: {
      "@type": "Person",
      name: "Zane Curtis",
    },
    publisher: {
      "@type": "Organization",
      name: "Monday Morning Bottle Shop",
    },
    mainEntityOfPage: `${SITE_URL}${path}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Curious AF Dictionary: NA Drinks Terms Explained | Monday Morning"
        description="Sober curious, zero proof, dealcoholized, NA: the complete glossary of non alcoholic drinks terms, defined plainly. Updated quarterly by Monday Morning."
        path={path}
        type="article"
        image="/og-curious-af-dictionary.jpg"
        schema={[definedTermSetSchema, generateFAQSchema(faqs), articleSchema]}
      />

      <Header />
      <main>
        {/* Hero */}
        <section className="bg-forest py-16 md:py-24 relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
            <span className="font-sans text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-gold mb-4 block">
              Glossary, updated quarterly
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-cream mb-4">
              The Curious <span className="italic text-gold">AF</span> Dictionary
            </h1>
            <p className="font-sans text-cream/80 text-lg md:text-xl mb-2">
              The vocabulary of drinking less, defined.
            </p>
            <p className="font-sans text-cream/60 text-base md:text-lg">
              Two letters. Two meanings. One movement.
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="prose prose-lg max-w-none font-sans text-foreground/90 space-y-5">
              <p>
                "Excited AF" means something specific. Drinking "AF" means
                something else specific. When those two meanings collide, you
                get a vocabulary that did not exist ten years ago: a way of
                talking about drinking less that is blunt, useful, and actually
                fun to say out loud.
              </p>
              <p>
                This is that vocabulary. Bookmark it. Send it to the friend who
                keeps asking what Damp January means. Use it next time someone
                confuses sober curious with sober.
              </p>
              <p>
                We update this dictionary every quarter. The space moves fast.
                The language follows.
              </p>
            </div>

            {/* Letter index */}
            <nav
              aria-label="Dictionary index"
              className="mt-10 flex flex-wrap gap-2 justify-center border-y border-foreground/10 py-6"
            >
              {sections.map((s) => (
                <a
                  key={s.letter}
                  href={`#letter-${s.letter}`}
                  className="font-serif text-xl md:text-2xl text-brand-green hover:text-gold transition-colors px-3 py-1"
                >
                  {s.letter}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Terms */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4 max-w-3xl">
            {sections.map((section) => (
              <div key={section.letter} className="mb-14">
                <h2
                  id={`letter-${section.letter}`}
                  className="font-serif text-5xl md:text-6xl text-brand-green mb-6 scroll-mt-28"
                >
                  {section.letter}
                </h2>
                <div className="space-y-8">
                  {section.terms.map((t) => (
                    <article key={t.slug} id={t.slug} className="scroll-mt-28">
                      <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-2">
                        <a
                          href={`#${t.slug}`}
                          className="hover:text-brand-green transition-colors"
                        >
                          {t.term}
                        </a>
                      </h3>
                      <p className="font-sans text-foreground/85 leading-relaxed">
                        {t.definition}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-cream/40 py-16 md:py-24 border-t border-foreground/10">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-10 text-center">
              Frequently Asked <span className="italic text-brand-green">Questions</span>
            </h2>
            <div className="space-y-8">
              {faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="font-sans text-foreground/85 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About + CTA */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              About This Dictionary
            </h2>
            <div className="font-sans text-foreground/85 leading-relaxed space-y-4">
              <p>
                The Curious AF Dictionary is curated by Zane Curtis, founder of
                Monday Morning Bottle Shop in San Diego, drawing on
                conversations with thousands of customers, brand makers, sober
                coaches, and recovery professionals. We update it quarterly to
                reflect new vocabulary entering the space.
              </p>
              <p>
                Spot a term we missed?{" "}
                <Link to="/contact" className="text-brand-green underline hover:text-gold">
                  Send it to us
                </Link>{" "}
                and we will add it.
              </p>
              <p>
                Visit our{" "}
                <Link to="/locations" className="text-brand-green underline hover:text-gold">
                  Pacific Beach or Ocean Beach shop
                </Link>{" "}
                to taste anything in the dictionary before you commit. Or start
                with our{" "}
                <Link
                  to="/new-to-non-alcoholic-drinks"
                  className="text-brand-green underline hover:text-gold"
                >
                  beginner's guide to drinking less
                </Link>
                .
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-block bg-brand-green text-cream px-6 py-3 font-sans uppercase tracking-widest text-sm hover:bg-gold hover:text-forest transition-colors"
              >
                Shop the Dictionary
              </Link>
              <Link
                to="/blog"
                className="inline-block border border-brand-green text-brand-green px-6 py-3 font-sans uppercase tracking-widest text-sm hover:bg-brand-green hover:text-cream transition-colors"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CuriousAFDictionary;
