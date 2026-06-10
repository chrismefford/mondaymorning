import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const DryJanuaryGuide = () => (
  <AuthorityPage
    title="Dry January 2026: NA Drinks Playbook & Best Bottles | Monday Morning"
    description="The complete Dry January 2026 playbook. What to drink instead of alcohol, the best NA bottles to stock, and how to make it stick. From Monday Morning Bottle Shop."
    path="/dry-january-guide"
    ogImage={`${SITE_URL}/og-dry-january-guide.jpg`}
    eyebrow="Sober-Curious Cluster"
    h1="Dry January 2026, the playbook"
    subhead="Thirty one days off alcohol. Real benefits, real challenges, and the exact NA drinks that make it doable. Here is how to actually finish the month."
    tldr="Dry January is a 31 day alcohol-free experiment that started in the UK in 2013 and has become a global tradition. Studies show participants sleep better, lose modest weight, and report sharper mood by week three. Success comes from preparation: buy NA alternatives in advance, plan for two specific social events, and track how you feel daily. The single best swap is craft NA beer for regular beer. Most people who finish Dry January end up drinking 30 to 50% less the following year."
    heroImage={`${SITE_URL}/og-dry-january-guide.jpg`}
    ctaPrimary={{ label: "Shop NA drinks", href: "/shop" }}
    ctaSecondary={{ label: "Read the sober-curious guide", href: "/sober-curious-guide" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Sober-Curious Guide", url: `${SITE_URL}/sober-curious-guide` },
      { name: "Dry January Guide", url: `${SITE_URL}/dry-january-guide` },
    ]}
    sections={[
      {
        heading: "What Dry January actually is",
        body: (
          <>
            <p>
              Dry January is a 31 day public health campaign launched by Alcohol Change UK in 2013. The idea: take the entire month of January off alcohol. It has since gone global, with millions participating in the US, Canada, Europe, and Australia.
            </p>
            <p>
              It is not sobriety. It is not recovery. It is a structured experiment with a clear start date, a clear end date, and a measurable outcome: how do you feel after 31 days without alcohol.
            </p>
            <p>
              The data is consistently good. Multiple studies (most notably the University of Sussex 2018 study and the University College London 2024 follow ups) show participants report better sleep, modest weight loss, sharper mood, and a meaningful reduction in alcohol consumption six months later.
            </p>
          </>
        ),
      },
      {
        heading: "Week by week: what to expect",
        body: (
          <>
            <h3>Week 1, the hardest</h3>
            <p>
              Habit pulls you toward your usual Friday pour. Sleep often gets worse before it gets better, especially if you were drinking nightly. Hydrate, exercise lightly, and stock the fridge with NA alternatives so you have something to reach for.
            </p>
            <h3>Week 2, the curve breaks</h3>
            <p>
              Sleep quality starts to improve noticeably. Resting heart rate drops. Energy in the morning is the first thing most people notice.
            </p>
            <h3>Week 3, the social test</h3>
            <p>
              You will hit one or two events where everyone is drinking. This is where most people quit. Plan in advance: pick the venue, bring an NA bottle, or have a polite exit strategy.
            </p>
            <h3>Week 4, the gains compound</h3>
            <p>
              By day 21 to 28, most people report sharper focus, calmer mood, and visible skin changes. This is also when the temptation drops because the benefits are now obvious.
            </p>
            <h3>Day 31, the decision</h3>
            <p>
              Most people who finish do not return to their old drinking pattern. The follow up data is consistent: average reduction of 30 to 50% in alcohol consumption six months later.
            </p>
          </>
        ),
      },
      {
        heading: "The 8 swaps that make Dry January work",
        body: (
          <>
            <ol>
              <li><strong>Friday beer →</strong> Craft NA IPA from <Link to="/best-non-alcoholic-ipas">Beaglepuss, FLVR!, or Go Brewing</Link>.</li>
              <li><strong>Wine with dinner →</strong> Bolle Rosé or Sovi Red Blend. <Link to="/non-alcoholic-wine">More NA wine picks</Link>.</li>
              <li><strong>After work cocktail →</strong> Almave Blanco paloma or Sentia Gold over ice.</li>
              <li><strong>Nightcap →</strong> Glen Dochus old fashioned with a single big ice cube.</li>
              <li><strong>Weekend beach beer →</strong> Capacity Mexican Lager or Go Brewing Sunshine State.</li>
              <li><strong>Stress unwind →</strong> Kava drink (Kava Haven, Leilo) or Trip CBD blend.</li>
              <li><strong>Restaurant order →</strong> Ask for a non-alcoholic spirit if they have it, or order a club soda with bitters and lime.</li>
              <li><strong>Toast at a celebration →</strong> NA sparkling wine in a flute. Nobody can tell.</li>
            </ol>
          </>
        ),
      },
      {
        heading: "How to handle social events",
        body: (
          <>
            <p>
              The social pressure is the biggest reason people quit Dry January. Three rules that work.
            </p>
            <p>
              <strong>Rule 1: Always have a drink in hand.</strong> A craft NA beer in a can looks identical to a regular beer. Most people will not even notice.
            </p>
            <p>
              <strong>Rule 2: "I am doing Dry January" is a complete sentence.</strong> You do not owe an explanation. Most people will respect it. Some will quietly join you.
            </p>
            <p>
              <strong>Rule 3: Bring your own bottle.</strong> If you are going to a friend's place, bring a six pack of NA beer or a bottle of NA wine. Removes any friction about what you will drink.
            </p>
          </>
        ),
      },
      {
        heading: "What changes after Dry January",
        body: (
          <>
            <p>
              The honest answer is that for most people, drinking habits do not return to baseline. The category data tells the story:
            </p>
            <ul>
              <li>NA beer category sales spike 200%+ every January and stay 40% above the prior year average through summer.</li>
              <li>Roughly 60% of finishers report drinking less six months later.</li>
              <li>Sleep tracking data from wearables shows the benefit pattern persists if drinking does not return to nightly.</li>
            </ul>
            <p>
              Many people do not realize they have effectively become <Link to="/sober-curious-guide">sober-curious</Link> until February or March, when they notice they have not really wanted to drink the way they used to.
            </p>
          </>
        ),
      },
      {
        heading: "Common Dry January mistakes",
        body: (
          <>
            <p>
              <strong>Going in unprepared.</strong> Stock the fridge before January 1. If your only options are alcohol or nothing, you will reach for alcohol.
            </p>
            <p>
              <strong>Replacing alcohol with sugar.</strong> Many soda alternatives spike blood sugar more than wine does. Stick to NA beer, dealcoholized wine, NA cocktails with fresh citrus, or sparkling water.
            </p>
            <p>
              <strong>Treating it as deprivation.</strong> The whole point is that you are upgrading, not depriving. Buy good bottles. Make real cocktails. Make it feel like a positive choice.
            </p>
            <p>
              <strong>White knuckling alone.</strong> Tell three people. Public commitment compounds.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "Is Dry January worth it?", answer: "Yes, if you complete the full 31 days. The biggest benefits, sleep improvements, mood lift, modest weight loss, accrue in weeks 3 and 4. Quitting on day 12 captures very little of the upside." },
      { question: "How many calories do I save during Dry January?", answer: "Depends on your baseline. Someone drinking five drinks per week saves roughly 600 to 800 calories weekly. Someone drinking nightly can save 2,000 to 4,000 calories weekly. Many participants lose 3 to 7 pounds without changing food." },
      { question: "Will I have trouble sleeping during Dry January?", answer: "The first 3 to 5 nights are often worse, especially if you were drinking before bed. By week 2 most people report deeper sleep, more REM, and waking up clearer. Sleep tracker data confirms this consistently." },
      { question: "Do I have to give up everything that contains alcohol?", answer: "Most participants treat it strictly: no beer, wine, spirits, or cocktails. Most do not worry about trace amounts in NA beverages under 0.5% ABV, food cooked in wine, or bitters. Set the rules that match your goals." },
      { question: "What if I slip up halfway through?", answer: "Pick back up the next day. The benefits do not disappear. Most participants slip at least once. Finishing the month with a few slips still beats giving up entirely." },
      { question: "Should I do Dry January if I do not drink that much?", answer: "Yes, the experiment is even more useful if you are a moderate drinker. You get a baseline reading on how alcohol actually affects your sleep, mood, and energy without the noise of dependence." },
      { question: "What is the best NA drink to start Dry January with?", answer: "A craft NA IPA. The transition is easiest because the flavor is genuine and the social fit is identical to a regular beer." },
      { question: "Will Dry January help me sleep better?", answer: "Almost certainly yes, especially if you were drinking near bedtime. Alcohol disrupts REM sleep even at low doses. Removing it for 31 days produces measurable improvements on most sleep trackers." },
    ]}
    relatedLinks={[
      { label: "Sober-curious guide", href: "/sober-curious-guide", description: "What comes after Dry January." },
      { label: "Best non-alcoholic IPAs 2026", href: "/best-non-alcoholic-ipas", description: "The easiest beer swaps." },
      { label: "Zero-proof home bar", href: "/zero-proof-home-bar", description: "Build a cocktail setup that works." },
      { label: "Pillar: Non-alcoholic drinks", href: "/non-alcoholic-drinks", description: "The complete category." },
    ]}
  />
);

export default DryJanuaryGuide;
