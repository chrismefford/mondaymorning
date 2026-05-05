import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const NonAlcoholicWine = () => (
  <AuthorityPage
    title="Non Alcoholic Wine: The 2026 Guide to Dealcoholized Bottles"
    description="The complete guide to non alcoholic wine. Sparkling, rosé, red, and white. How dealcoholization works and the bottles worth pouring at dinner."
    path="/non-alcoholic-wine"
    ogImage={`${SITE_URL}/og-non-alcoholic-wine.jpg`}
    eyebrow="Cluster Hub"
    h1="Non alcoholic wine, finally worth drinking"
    subhead="The fastest improving category in the zero proof world. Real fermentation, then careful dealcoholization. The result keeps tannin, oak, and acidity. Here is what to buy."
    tldr="Non alcoholic wine is real wine that has been dealcoholized after fermentation, usually via spinning cone or vacuum distillation. The good bottles, especially sparkling and rosé, are now genuinely competitive at dinner. Brands worth knowing: Bolle (sparkling), Sovi (red and white), and the small dealcoholized producers from Spain and Germany. Sparkling NA wine is the easiest entry point because bubbles carry flavor. Expect $18 to $30 per bottle. Serve cold, in the right glass, at dinner, exactly like real wine."
    heroImage={`${SITE_URL}/og-non-alcoholic-wine.jpg`}
    ctaPrimary={{ label: "Shop NA wine", href: "/collections/wine-alternatives" }}
    ctaSecondary={{ label: "Visit a tasting room", href: "/locations" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Non Alcoholic Drinks", url: `${SITE_URL}/non-alcoholic-drinks` },
      { name: "Non Alcoholic Wine", url: `${SITE_URL}/non-alcoholic-wine` },
    ]}
    sections={[
      {
        heading: "How non alcoholic wine is made",
        body: (
          <>
            <p>
              The single most important fact about good NA wine: <strong>it starts as real wine.</strong> Grapes are pressed, fermented, and aged exactly like any other bottle. Then the alcohol is removed.
            </p>
            <p>
              Two methods dominate.
            </p>
            <p>
              <strong>Spinning cone column.</strong> The wine is spun in a vacuum at low temperature so alcohol evaporates without heating the wine. Aroma compounds are captured separately and added back at the end. This preserves the most flavor and is the gold standard.
            </p>
            <p>
              <strong>Vacuum distillation.</strong> Similar principle, slightly different equipment, also low temperature. Both methods can produce excellent wine.
            </p>
            <p>
              Avoid bottles labeled "non alcoholic" that turn out to be fermented grape juice. They are not the same product. Real dealcoholized wine has tannin, oak influence, and structure. Grape juice has none of that.
            </p>
          </>
        ),
      },
      {
        heading: "The four NA wine styles, ranked by quality",
        body: (
          <>
            <h3>Sparkling NA wine, the strongest category</h3>
            <p>
              Bubbles carry flavor and mask any small loss from dealcoholization. Sparkling NA wines are the easiest sell to a wine drinker. Bolle is our pick for the rose and the bianco. Pour cold in a flute. Tastes like prosecco.
            </p>
            <h3>Rosé NA wine, the surprise category</h3>
            <p>
              Rosé translates beautifully because it relies on freshness and acidity, both of which survive dealcoholization. Bolle Rosé is exceptional. Serves at every summer table.
            </p>
            <h3>White NA wine, mostly good</h3>
            <p>
              Crisp whites like sauvignon blanc and pinot grigio do well. Heavier oaked whites lose more in the dealcoholization process. Sovi makes a strong NA chardonnay.
            </p>
            <h3>Red NA wine, the hardest</h3>
            <p>
              Reds are the toughest because alcohol contributes body and warmth. The best NA reds use Spanish or German techniques to retain tannin. Sovi's red is the standout we carry.
            </p>
          </>
        ),
      },
      {
        heading: "How to serve non alcoholic wine",
        body: (
          <>
            <p>
              Treat it like real wine. The biggest mistake people make is pouring NA wine warm, in the wrong glass, or out of context. Do not do this.
            </p>
            <ul>
              <li>Serve at the right temperature: sparkling 40 to 45°F, rosé and white 45 to 50°F, red 60 to 65°F.</li>
              <li>Use real wine glasses. Stemware shape changes how the wine tastes.</li>
              <li>Pair with food. NA wine, especially red and rosé, comes alive at dinner.</li>
              <li>Refrigerate after opening. Without alcohol as a preservative, NA wine oxidizes faster. Use within 3 to 5 days.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "What to buy first",
        body: (
          <>
            <ol>
              <li><strong>Bolle Rosé.</strong> Sparkling, dry, perfect entry point.</li>
              <li><strong>Bolle Bianco.</strong> Sparkling, citrus, summer in a bottle.</li>
              <li><strong>Sovi Red Blend.</strong> The NA red that finally works.</li>
              <li><strong>Sovi Sparkling.</strong> A drier alternative to Bolle.</li>
              <li><strong>A dealcoholized Riesling or sauvignon blanc</strong> from our rotating shelf.</li>
            </ol>
            <p>
              Build your first NA wine collection with three sparkling, two rosé, two whites, one red. Eight bottles, every dinner covered.
            </p>
          </>
        ),
      },
      {
        heading: "When NA wine works (and when it doesn't)",
        body: (
          <>
            <p>
              <strong>NA wine works:</strong> at dinner with food, at brunch, at a celebration where everyone toasts, at a beach picnic, when you want the ritual without the next morning.
            </p>
            <p>
              <strong>NA wine struggles:</strong> as a sipping drink without food, in long pours, against a complex meal where you want a wine with serious tannin or alcohol warmth. For those moments, consider a <Link to="/non-alcoholic-spirits">non alcoholic spirits</Link> based cocktail or a craft <Link to="/non-alcoholic-beer-guide">NA beer</Link> instead.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "Does non alcoholic wine taste like real wine?", answer: "The good ones do, especially sparkling and rosé. Reds are the hardest category because alcohol contributes body. Bolle, Sovi, and small dealcoholized producers consistently deliver real wine experiences." },
      { question: "Is non alcoholic wine just grape juice?", answer: "No, and this is the most important distinction. Real NA wine is fermented and aged like normal wine, then dealcoholized. Grape juice has no fermentation. The difference in flavor is enormous." },
      { question: "Can I cook with non alcoholic wine?", answer: "Yes. NA wine works in pan sauces, risottos, and braises. Because there is no alcohol to burn off, you can use it raw in vinaigrettes too." },
      { question: "How long does an open bottle last?", answer: "3 to 5 days refrigerated, less for sparkling. Without alcohol as a preservative, NA wine oxidizes faster than regular wine. Use a wine stopper and a vacuum pump to extend." },
      { question: "Why is non alcoholic wine sometimes lower in alcohol than 0.0%?", answer: "Most NA wine is dealcoholized to under 0.5% ABV, the legal threshold. A few are processed to 0.0%. Check the label." },
      { question: "Is non alcoholic wine sweeter than regular wine?", answer: "Sometimes. Removing alcohol can shift the flavor balance toward perceived sweetness. The best producers add back acid or use drier styles to compensate." },
      { question: "Can I drink NA wine while pregnant?", answer: "Talk to your doctor. Most NA wine is below 0.5% ABV, similar to fruit juice. Many doctors consider this acceptable. Some recommend zero alcohol entirely." },
      { question: "Where can I buy non alcoholic wine?", answer: "Monday Morning carries 50+ NA wines, in store at our San Diego locations and online with national shipping. Specialty grocery stores increasingly carry sparkling NA wine, but selection is narrow." },
    ]}
    relatedLinks={[
      { label: "Pillar: Non alcoholic drinks", href: "/non-alcoholic-drinks", description: "The complete category overview." },
      { label: "Non alcoholic spirits hub", href: "/non-alcoholic-spirits", description: "Real cocktails without alcohol." },
      { label: "Best non alcoholic drinks 2026", href: "/best-non-alcoholic-drinks", description: "Editorial picks across categories." },
      { label: "Sober curious guide", href: "/sober-curious-guide", description: "Why people are switching." },
    ]}
  />
);

export default NonAlcoholicWine;
