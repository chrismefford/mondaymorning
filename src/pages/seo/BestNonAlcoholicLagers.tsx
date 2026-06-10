import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";
import heroImg from "@/assets/lifestyle/na-beer-beach.jpg";

const BestNonAlcoholicLagers = () => (
  <AuthorityPage
    title="Best Non-Alcoholic Lagers & Pilsners of 2026: Ranked | Monday Morning"
    description="The best non-alcoholic lagers and pilsners of 2026. Crisp Mexican lagers, Italian pils and German helles, ranked by Monday Morning's San Diego tasting room staff."
    path="/best-non-alcoholic-lagers"
    ogImage={`${SITE_URL}/og-best-non-alcoholic-lagers.jpg`}
    eyebrow="Beer Cluster"
    h1="The best non-alcoholic lagers and pilsners, ranked"
    subhead="Lager is the highest stakes NA beer style. There is nowhere to hide. Either it is crisp, clean, and refreshing, or it is not. Here are the bottles that get it right."
    tldr="Non-alcoholic lagers and pilsners are the hardest style to fake because there is nothing to hide behind. No hop bitterness, no roast, no haze, just clean malt and yeast. The best NA lagers we carry are Capacity Mexican Lager, FLVR! Italian Style Pils, Go Brewing Sunbeam Pils, Below Brew Co. Heaven and Helles, and UNLTD Lager. Most run 30 to 90 calories per can and under 0.5% ABV. Drink them ice cold from a chilled glass."
    heroImage={heroImg}
    ctaPrimary={{ label: "Shop NA lagers", href: "/collections/na-beer" }}
    ctaSecondary={{ label: "Visit a tasting room", href: "/locations" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Non-Alcoholic Drinks", url: `${SITE_URL}/non-alcoholic-drinks` },
      { name: "NA Beer Guide", url: `${SITE_URL}/non-alcoholic-beer-guide` },
      { name: "Best NA Lagers", url: `${SITE_URL}/best-non-alcoholic-lagers` },
    ]}
    sections={[
      {
        heading: "Why lager is the toughest NA category",
        body: (
          <>
            <p>
              Lager is naked beer. There is no hop bomb to mask off flavors, no roasted malt to hide thinness, no haze to suggest body. It is just clean fermentation, soft malt, a touch of bitterness, and a clean finish. Every flaw shows.
            </p>
            <p>
              That is why for years NA lager was the worst category in the zero-proof world. Worty, sweet, thin, sometimes vegetal. The original NA beer experience that gave the category a bad reputation.
            </p>
            <p>
              The current generation of brewers has cracked it. They use cleaner yeast strains, low alcohol fermentation, and proper carbonation. The result is a handful of NA lagers that genuinely drink like the real thing. Not all of them, but enough to recommend.
            </p>
          </>
        ),
      },
      {
        heading: "Capacity Mexican Lager: the everyday hero",
        body: (
          <>
            <p>
              Capacity makes the cleanest, most session ready Mexican style lager in the NA world. Light, crisp, slightly sweet corn note, and a snappy finish. Throw a lime in it and put it next to tacos or a sunny patio and it is hard to clock as non-alcoholic.
            </p>
            <p>
              Around 60 calories a can. Pairs with everything. The first NA lager we recommend to anyone who tells us they only drink Modelo or Pacifico. They almost always come back for a four pack.
            </p>
          </>
        ),
      },
      {
        heading: "FLVR! Italian Style Pils and Go Brewing Sunbeam Pils",
        body: (
          <>
            <p>
              For the dry pils drinkers. <strong>FLVR! Italian Style Pils</strong> (the rebrand of Untitled Art's NA line) is dry, slightly herbal, with a noble hop snap on the finish. Closer to a Tipopils than a typical American pilsner.
            </p>
            <p>
              <strong>Go Brewing Sunbeam Pils</strong> is the cleaner American interpretation. Bright, crisp, low bitterness, with a touch of cracker malt. Both are excellent. Pick FLVR! if you want something more European, Go Brewing if you want something more sessionable.
            </p>
          </>
        ),
      },
      {
        heading: "Below Brew Co. Heaven and Helles: the German style",
        body: (
          <>
            <p>
              Below Brew Co.'s Heaven and Helles is a Bavarian style helles lager with the soft, rounded malt character that defines the style. Less hops than a pilsner, more body than a Mexican lager, with a clean honey note from the malt.
            </p>
            <p>
              This is the bottle for people who drink Augustiner or Spaten in Munich. It is also our pick for any kind of Oktoberfest themed event where you want NA options that fit the vibe.
            </p>
          </>
        ),
      },
      {
        heading: "UNLTD Lager: the default pour",
        body: (
          <>
            <p>
              UNLTD Lager is the bottle we hand to anyone who walks in and says "I just want a normal beer." Clean, balanced, no surprises. The kind of NA beer you can drink three of without thinking about it.
            </p>
            <p>
              For BBQs, beach days, work events, and anything where you want NA beer to be present but not the focal point, UNLTD Lager is the right answer.
            </p>
          </>
        ),
      },
      {
        heading: "How to drink NA lager the right way",
        body: (
          <>
            <p>
              <strong>Drink it ice cold.</strong> Lager is the one beer style where ice cold actually helps. The carbonation is sharper, the finish snaps, and any minor off flavors get masked.
            </p>
            <p>
              <strong>Use a chilled glass.</strong> Pop a pint glass or stein in the freezer for ten minutes before pouring. Frozen glasses are the move with lager.
            </p>
            <p>
              <strong>Pair with salt and acid.</strong> Tacos, ceviche, oysters, fries, anything where salt or lime is in play. Lager rinses the palate and keeps the meal moving.
            </p>
            <p>
              <strong>Pour aggressively.</strong> A two finger head matters more in lager than in any other style. It carries aroma and softens the carbonation. Pour the first half hard, the second half gentle.
            </p>
          </>
        ),
      },
      {
        heading: "Where to buy non-alcoholic lager in San Diego",
        body: (
          <>
            <p>
              Monday Morning carries Capacity, FLVR!, Go Brewing, Below Brew Co., UNLTD, and a rotating selection of NA lagers and pilsners at our Pacific Beach and Ocean Beach tasting rooms. We will pour you tasters of two or three side by side so you can pick the right one.
            </p>
            <p>
              We ship the full NA lager lineup nationally. <a href="/collections/na-beer">Shop the NA beer collection</a>, or read the broader <a href="/non-alcoholic-beer-guide">non-alcoholic beer guide</a> for the full picture.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      {
        question: "What is the best non-alcoholic lager?",
        answer:
          "Capacity Mexican Lager is our most recommended NA lager for everyday drinking, especially in warm weather. For pilsner drinkers, FLVR! Italian Style Pils or Go Brewing Sunbeam Pils are the picks. For Bavarian style, Below Brew Co. Heaven and Helles. For a default crowd pleaser, UNLTD Lager.",
      },
      {
        question: "Does non-alcoholic lager taste like real lager?",
        answer:
          "The best ones do. Lager is the hardest NA style because there is nowhere to hide flaws, but a current generation of NA brewers has cracked it using clean yeast strains and low alcohol fermentation. Capacity, FLVR!, Go Brewing, Below Brew Co., and UNLTD all make NA lagers that drink genuinely like the real thing.",
      },
      {
        question: "How many calories are in a non-alcoholic lager?",
        answer:
          "Most NA lagers run between 30 and 90 calories per 12 oz can, compared to 150 for a standard alcoholic lager. Capacity Mexican Lager is around 60 calories. Light NA lagers can drop into the 30s. The lower count comes from removing alcohol, which is highly calorie dense.",
      },
      {
        question: "What temperature should I drink non-alcoholic lager at?",
        answer:
          "Ice cold, around 38 to 42 degrees Fahrenheit. Lager is the one beer style where the coldest possible serving temperature actually improves the experience. Crisper carbonation, sharper finish, and any minor off notes are masked. A frozen glass helps.",
      },
      {
        question: "What food pairs with non-alcoholic lager?",
        answer:
          "Tacos, ceviche, oysters, fried foods, pizza, and anything with salt or lime. Lager is the universal food beer because it rinses the palate without competing with the food. A Mexican lager with carne asada or a pilsner with margherita pizza is hard to beat.",
      },
      {
        question: "Are there any 0.0% non-alcoholic lagers?",
        answer:
          "Yes. Le Petit Beret Latina is a true 0.0% Mexican style lager we carry, and several other NA lagers come in at 0.0% to 0.1%. If you need certified 0.0% for medical, religious, or recovery reasons, ask us at the tasting bar and we will point you to the right options.",
      },
    ]}
    relatedLinks={[
      { label: "Ultimate NA Beer Guide 2026", href: "/blog/ultimate-non-alcoholic-beer-guide-2026", description: "Our annual deep dive on the best NA beer of the year." },
      { label: "Best Non-Alcoholic IPAs", href: "/best-non-alcoholic-ipas", description: "Hop forward picks from Bravus, Mash Gang, Beaglepuss, and more." },
      { label: "Best Non-Alcoholic Stouts", href: "/best-non-alcoholic-stouts", description: "Roasty, full bodied dark NA beers." },
      { label: "NA Beer Guide", href: "/non-alcoholic-beer-guide", description: "Every style, every brand, every use case." },
      { label: "Non-Alcoholic Drinks Pillar", href: "/non-alcoholic-drinks", description: "Every category, every use case, all in one place." },
      { label: "White Claw Alcohol Content", href: "/white-claw-alcohol-content", description: "And the NA seltzers that scratch the same itch." },
    ]}
  />
);

export default BestNonAlcoholicLagers;
