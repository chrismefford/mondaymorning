import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const NADrinksForRelaxation = () => (
  <AuthorityPage
    title="NA Drinks for Relaxation: 20+ Calming Bottles That Work | Monday Morning"
    description="The non-alcoholic drinks that actually help you wind down. Kava, adaptogen elixirs, low-dose botanicals, and the brands we stock in San Diego."
    path="/na-drinks-for-relaxation"
    ogImage={`${SITE_URL}/og-na-drinks-relaxation.jpg`}
    eyebrow="Cluster Hub"
    h1="Non-alcoholic drinks for relaxation that actually work"
    subhead="Alcohol is a sedative, but it taxes your sleep and your morning. These bottles use kava, adaptogens, and functional botanicals to deliver the wind-down without the cost."
    tldr="The most effective non-alcoholic drinks for relaxation use kava (a Pacific Island root that calms the nervous system), adaptogens like ashwagandha and reishi, or low-dose botanical blends. Top picks we stock: Leilo and Kavaly for clean kava, Soul Hum Elixirs and Alice Mushrooms for adaptogenic blends, Sentia for botanical mood drinks, and Curious Elixirs for ready-to-pour cocktails. Drink them like you would a glass of wine: at the end of the day, slowly, with intention. Effects build over 20 to 40 minutes."
    heroImage={`${SITE_URL}/og-na-drinks-relaxation.jpg`}
    ctaPrimary={{ label: "Shop relaxation drinks", href: "/collections/functional" }}
    ctaSecondary={{ label: "Visit a tasting room", href: "/locations" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Non-Alcoholic Drinks", url: `${SITE_URL}/non-alcoholic-drinks` },
      { name: "Drinks for Relaxation", url: `${SITE_URL}/na-drinks-for-relaxation` },
    ]}
    sections={[
      {
        heading: "Why people switch from alcohol to functional drinks",
        body: (
          <>
            <p>
              Alcohol does help you relax in the short term. It is a central nervous system depressant, so the first drink genuinely lowers tension. The problem is what happens next: disrupted REM sleep, a 3 a.m. cortisol spike, anxiety the next day, and a slow build of tolerance that pushes one drink into three.
            </p>
            <p>
              Functional non-alcoholic drinks aim for the same wind-down feeling without that tax. They use ingredients with real, studied effects on the nervous system, in doses that calm without sedating you into a hangover.
            </p>
          </>
        ),
      },
      {
        heading: "The three ingredients that actually relax you",
        body: (
          <>
            <h3>Kava, the closest thing to a glass of wine</h3>
            <p>
              Kava is a root native to the Pacific Islands. The active compounds (kavalactones) bind to the same GABA receptors that alcohol does, producing a calm, social, slightly euphoric feeling. Effects come on in 15 to 30 minutes. There is no hangover. Leilo and Kavaly are the cleanest, best-tasting brands on our shelf.
            </p>
            <h3>Adaptogens, slow but steady</h3>
            <p>
              Reishi, ashwagandha, and lion's mane are mushrooms and herbs that help your body regulate stress over time. They work best with consistent use, not a single dose. Alice Mushrooms and Soul Hum Elixirs build adaptogens into drinkable formats.
            </p>
            <h3>Botanical mood blends</h3>
            <p>
              Drinks like Sentia and Curious Elixirs blend GABA precursors, magnesium, and traditional calming herbs (chamomile, passionflower, lavender) into mature, complex flavor profiles. They sip like a real cocktail.
            </p>
          </>
        ),
      },
      {
        heading: "How to use them",
        body: (
          <>
            <p>
              Treat a relaxation drink like a ritual, not a chug. The serving and setting matter as much as the bottle.
            </p>
            <ul>
              <li><strong>Serve cold, in a real glass.</strong> Stemware or a heavy rocks glass changes how it tastes and feels.</li>
              <li><strong>Sip over 20 to 30 minutes.</strong> Kava and adaptogens build gradually. Slamming them does not speed things up.</li>
              <li><strong>Pair with something.</strong> A small plate, a record, a long walk. The wind-down comes from the whole moment.</li>
              <li><strong>Do not stack with sedatives.</strong> Kava and adaptogens are gentle on their own. Do not combine with sleep medication or alcohol.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Our top picks for evening unwind",
        body: (
          <>
            <ol>
              <li><strong>Leilo Original Kava.</strong> Smooth, slightly sweet, comes on fast.</li>
              <li><strong>Kavaly.</strong> Cleaner kava taste, great for someone new to the root.</li>
              <li><strong>Curious Elixirs No. 1.</strong> A bittersweet sipper that drinks like a Negroni.</li>
              <li><strong>Soul Hum Elixirs.</strong> Adaptogen-forward, beautiful with a slice of orange.</li>
              <li><strong>Sentia Red.</strong> Botanical mood drink, complex on the palate.</li>
              <li><strong>Alice Mushrooms Nightcap.</strong> Mushroom chocolate for the deepest wind-down.</li>
            </ol>
            <p>
              Want to try before you commit? Every bottle on this list is open at our <Link to="/locations">North Park and Ocean Beach tasting rooms</Link>.
            </p>
          </>
        ),
      },
      {
        heading: "When to choose a relaxation drink over NA beer or wine",
        body: (
          <>
            <p>
              <strong>Pick a functional bottle when:</strong> you want a real shift in how you feel, you are winding down for the night, you have a stressful evening ahead, or you are replacing a nightly cocktail habit.
            </p>
            <p>
              <strong>Pick NA beer or wine when:</strong> the social ritual matters more than the effect, you want food pairing, or you want a longer pour. For those nights, see our <Link to="/non-alcoholic-beer-guide">NA beer guide</Link> or <Link to="/non-alcoholic-wine">NA wine hub</Link>.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "What is the best non-alcoholic drink for relaxation?", answer: "Kava is the most direct substitute for the calming feeling of alcohol because it acts on the same GABA receptors. Leilo and Kavaly are our top picks. For slower, gentler relaxation, adaptogen blends from Soul Hum Elixirs or Alice Mushrooms are excellent." },
      { question: "Is kava safe to drink every night?", answer: "Moderate kava use is considered safe by most research. Avoid combining with alcohol, sedatives, or acetaminophen. If you take prescription medication or have liver issues, talk to your doctor first." },
      { question: "How long do functional drinks take to work?", answer: "Kava effects start in 15 to 30 minutes. Adaptogen blends are subtler and build with consistent use over days or weeks. Botanical mood drinks like Sentia work in 20 to 40 minutes." },
      { question: "Do relaxation drinks make you tired?", answer: "Kava and adaptogen drinks produce calm without heavy sedation. You can still function, drive, and hold a conversation. They are not sleep aids. For sleep specifically, look at chamomile or magnesium-forward formulas." },
      { question: "Can I drink them with food?", answer: "Yes. Kava actually pairs well with light food, and most botanical blends are designed for the cocktail hour. Avoid heavy fat right before kava if you want a faster onset." },
      { question: "What is the difference between kava and CBD drinks?", answer: "Kava acts on GABA receptors and produces a more noticeable mood shift. CBD acts on the endocannabinoid system and is subtler. We stock both. Kava is closer to the alcohol substitute experience." },
      { question: "Are these drinks legal everywhere?", answer: "Kava, adaptogens, and the botanical blends we carry are legal in all 50 states. CBD products may have additional state-level rules. Check labeling on individual products." },
      { question: "Where can I buy them in San Diego?", answer: "Monday Morning carries all of them in store at our North Park and Ocean Beach tasting rooms, plus online with national shipping. Sample any of them before you commit." },
    ]}
    relatedLinks={[
      { label: "Functional Mocktails and Adaptogens", href: "/functional-mocktails-adaptogens", description: "Recipes that build kava and adaptogens into cocktails." },
      { label: "Beginner's Guide to Non-Alcoholic Drinks", href: "/beginners-guide-non-alcoholic-drinks", description: "Where to start if you are new to the category." },
      { label: "Sober-Curious Guide", href: "/sober-curious-guide", description: "The bigger picture on cutting back without quitting completely." },
      { label: "Pillar: Non-Alcoholic Drinks", href: "/non-alcoholic-drinks", description: "The full category overview." },
    ]}
  />
);

export default NADrinksForRelaxation;
