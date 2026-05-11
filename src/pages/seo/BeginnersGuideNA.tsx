import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const BeginnersGuideNA = () => (
  <AuthorityPage
    title="Beginner's Guide to Non Alcoholic Drinks: Where to Start | Monday Morning"
    description="New to non alcoholic drinks? Start here. The 10 bottles, the categories, and the easy wins for your first month. From San Diego's biggest NA bottle shop."
    path="/beginners-guide-non-alcoholic-drinks"
    ogImage={`${SITE_URL}/og-beginners-guide-na.jpg`}
    eyebrow="Start Here"
    h1="Beginner's guide to non alcoholic drinks"
    subhead="If you are new to the category, the choices can feel overwhelming. Start here. Ten bottles, four categories, and a clear path through your first month of better drinks."
    tldr="If you are new to non alcoholic drinks, start with one bottle from each of four categories: a craft NA IPA or lager (Go Brewing, Bravus, or Mash Gang), a sparkling NA wine (Bolle Rosé), a non alcoholic spirit you would actually use in a cocktail (Almave for tequila lovers, Abstinence for gin), and one functional drink (Leilo kava or a Curious Elixir). Pick one of these per night for the first week. Notice what you reach for naturally. That is your starting point. Expect to spend $12 to $25 per bottle. Avoid grape juice in disguise and anything labeled simply 'sparkling water with flavor'."
    heroImage={`${SITE_URL}/og-beginners-guide-na.jpg`}
    ctaPrimary={{ label: "Shop starter bundle", href: "/shop" }}
    ctaSecondary={{ label: "Visit a tasting room", href: "/locations" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Non Alcoholic Drinks", url: `${SITE_URL}/non-alcoholic-drinks` },
      { name: "Beginner's Guide", url: `${SITE_URL}/beginners-guide-non-alcoholic-drinks` },
    ]}
    sections={[
      {
        heading: "The four categories you need to know",
        body: (
          <>
            <p>
              Non alcoholic drinks fall into four big buckets. You do not need to love all of them. You just need to know which one fits the moment.
            </p>
            <h3>1. NA beer</h3>
            <p>
              The most developed category. Craft NA breweries now make IPAs, lagers, stouts, and sours that are genuinely good. <Link to="/non-alcoholic-beer-guide">Start with our NA beer guide</Link> if you are a beer drinker. Best for casual nights, sports, pizza, the grill.
            </p>
            <h3>2. NA wine</h3>
            <p>
              The fastest improving category. Sparkling and rosé are the strongest, reds are the hardest. <Link to="/non-alcoholic-wine">See our NA wine hub</Link>. Best for dinner, brunch, celebrations.
            </p>
            <h3>3. NA spirits</h3>
            <p>
              The cocktail category. Gin, whiskey, tequila, and rum alternatives built to mix. <Link to="/non-alcoholic-spirits">See our NA spirits hub</Link>. Best for anyone who likes the ritual of making a drink.
            </p>
            <h3>4. Functional drinks</h3>
            <p>
              Kava, adaptogens, mood blends. These do something. Best when you want the wind-down feeling without alcohol. <Link to="/na-drinks-for-relaxation">See our relaxation guide</Link>.
            </p>
          </>
        ),
      },
      {
        heading: "Your first 10 bottles, in order",
        body: (
          <>
            <p>
              If we had to build a starter shelf from scratch, this is what we would put on it. Every bottle is on our shelf at Monday Morning today.
            </p>
            <ol>
              <li><strong>Go Brewing Salty AF</strong>: a clean, sessionable craft NA beer for your first night.</li>
              <li><strong>Mash Gang Lesser Evil</strong>: the NA IPA that finally tastes like a real West Coast IPA.</li>
              <li><strong>Bravus Oatmeal Stout</strong>: proof that NA beer can have weight and character.</li>
              <li><strong>Bolle Rosé</strong>: sparkling NA rosé. Easiest sell to a wine drinker.</li>
              <li><strong>Sovi Red Blend</strong>: the NA red that actually works.</li>
              <li><strong>Almave Ámbar</strong>: blanco-style NA tequila built for margaritas and palomas.</li>
              <li><strong>Abstinence Cape Citrus</strong>: a botanical NA spirit that makes a perfect gin and tonic.</li>
              <li><strong>Curious Elixirs No. 2</strong>: bottled, ready to pour, drinks like a complex cocktail.</li>
              <li><strong>Leilo Original Kava</strong>: the wind-down at the end of a long day.</li>
              <li><strong>FLVR! sparkling</strong>: a sessionable mixer or stand-alone for hot afternoons.</li>
            </ol>
            <p>
              Buy three or four from this list. Try one per night. Take notes (literally, your phone is fine). The ones you reach for twice are your category.
            </p>
          </>
        ),
      },
      {
        heading: "What to avoid",
        body: (
          <>
            <p>
              Not everything in the non alcoholic aisle is worth your money. Steer clear of a few things in month one.
            </p>
            <ul>
              <li><strong>Grape juice in a wine bottle.</strong> Real NA wine is fermented and then dealcoholized. If the label says "non alcoholic wine" but lists grape juice as the first ingredient, skip it.</li>
              <li><strong>Sweetened mocktail mixers without a real spirit.</strong> They taste like soda. A real NA spirit changes the game.</li>
              <li><strong>Sugar bomb "functional" drinks.</strong> Check the label. Real adaptogen drinks should be low-sugar and clearly list active ingredients.</li>
              <li><strong>Trendy CBD seltzers as your wind-down.</strong> Most are underdosed. Kava and adaptogens work better.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Try before you buy",
        body: (
          <>
            <p>
              The single biggest difference between buying NA online and buying at a tasting room is taste. Every bottle on this page is open for sampling at <Link to="/locations">our North Park and Ocean Beach tasting rooms</Link>. Walk in, tell us what you usually drink, taste four or five things in 20 minutes. You will know exactly what to take home.
            </p>
            <p>
              If you cannot make it in, the team can build a custom starter bundle and ship it. Email <Link to="/contact">hello at Monday Morning</Link> with your usual drink (IPA fan? Negroni person? Pinot drinker?) and we will pull six bottles for you.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "What is the best non alcoholic drink for a beginner?", answer: "A craft NA IPA from Go Brewing or Mash Gang, or a Bolle sparkling rosé. Both deliver an immediate 'oh, this is real' moment that builds confidence in the category." },
      { question: "How much do non alcoholic drinks cost?", answer: "A six pack of NA craft beer runs $12 to $18. A bottle of NA wine runs $18 to $30. NA spirits are $25 to $40 a bottle but stretch over 15 to 20 cocktails. Functional drinks run $5 to $9 per serving." },
      { question: "Do non alcoholic drinks have any alcohol?", answer: "Most NA beer and wine in the US contain under 0.5% ABV, similar to ripe fruit or kombucha. A growing number are 0.0%. NA spirits and functional drinks are usually 0.0%. Check labeling if zero is important to you." },
      { question: "Will non alcoholic beer trigger cravings if I'm in recovery?", answer: "This is personal. Some people in recovery find NA beer a helpful bridge. Others find the taste or ritual triggers cravings. Talk to your support network. If alcohol-flavored drinks are a risk, functional bottles like kava and adaptogen blends avoid that association entirely." },
      { question: "Where do I buy non alcoholic drinks in San Diego?", answer: "Monday Morning is the city's biggest non alcoholic bottle shop with two tasting rooms (North Park and Ocean Beach), online ordering with local delivery, and nationwide shipping. We carry 500 plus bottles." },
      { question: "Can I drink non alcoholic beer while driving?", answer: "Yes. NA beer under 0.5% ABV is legal to drink in non-public spaces and generally considered safe for driving. Check your state's specific rules for open container laws." },
      { question: "What's the easiest way to switch from cocktails?", answer: "Replace your usual spirit with the matching NA spirit and keep everything else the same. If you drink margaritas, swap to Almave. If you drink gin and tonics, swap to Abstinence. The first time you do this it feels uncanny." },
      { question: "Are there non alcoholic options for events and parties?", answer: "Yes. Ready-to-pour bottles like Curious Elixirs and FLVR! work beautifully for events. For larger gatherings, our team can build a custom party menu, contact us at the shop." },
    ]}
    relatedLinks={[
      { label: "Non Alcoholic Beer Guide", href: "/non-alcoholic-beer-guide", description: "The full beer category breakdown." },
      { label: "Non Alcoholic Wine Hub", href: "/non-alcoholic-wine", description: "Reds, whites, sparkling, and rosé." },
      { label: "NA Drinks for Relaxation", href: "/na-drinks-for-relaxation", description: "Functional bottles that actually help you wind down." },
      { label: "Sober Curious Guide", href: "/sober-curious-guide", description: "Why people are switching and how to start." },
    ]}
  />
);

export default BeginnersGuideNA;
