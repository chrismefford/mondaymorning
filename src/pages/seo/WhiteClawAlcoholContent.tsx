import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const WhiteClawAlcoholContent = () => (
  <AuthorityPage
    title="White Claw Alcohol Content: ABV, Calories & NA Alternatives | Monday Morning"
    description="How much alcohol is in a White Claw? ABV, calories, and the best non alcoholic seltzer alternatives, ranked by Monday Morning Bottle Shop."
    path="/white-claw-alcohol-content"
    ogImage={`${SITE_URL}/og-white-claw-alcohol-content.jpg`}
    eyebrow="Comparison Cluster"
    h1="White Claw alcohol content, explained"
    subhead="How much alcohol is in a White Claw, how it compares to beer and wine, and the non alcoholic seltzers that deliver the same vibe without the morning regret."
    tldr="A standard 12oz can of White Claw contains 5% ABV, the same as a typical beer. That equals roughly 0.6 fluid ounces of pure alcohol per can. White Claw Surge contains 8% ABV. The 100 calorie marketing is real but misleading: most calories come from carbs, not from alcohol. For the same beach day vibe without alcohol, the best non alcoholic alternatives are Capacity Mexican Lager, FLVR! Italian Style Pils, and craft NA hop waters or kava based seltzers."
    heroImage={`${SITE_URL}/og-white-claw-alcohol-content.jpg`}
    ctaPrimary={{ label: "Shop NA seltzers and lagers", href: "/collections/na-beer" }}
    ctaSecondary={{ label: "Read the pillar guide", href: "/non-alcoholic-drinks" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Comparisons", url: `${SITE_URL}/non-alcoholic-drinks` },
      { name: "White Claw Alcohol Content", url: `${SITE_URL}/white-claw-alcohol-content` },
    ]}
    sections={[
      {
        heading: "How much alcohol is in a White Claw?",
        body: (
          <>
            <p>
              A standard 12oz can of White Claw Hard Seltzer contains 5% alcohol by volume. That equals about 0.6 fluid ounces of pure ethanol per can, which is roughly the same as one standard drink in US public health terminology.
            </p>
            <p>
              For practical comparison:
            </p>
            <ul>
              <li><strong>White Claw 12oz:</strong> 5% ABV, ~0.6oz pure alcohol.</li>
              <li><strong>Standard 12oz beer:</strong> 5% ABV, identical alcohol content.</li>
              <li><strong>5oz pour of wine:</strong> 12% ABV, ~0.6oz pure alcohol.</li>
              <li><strong>1.5oz shot of liquor:</strong> 40% ABV, ~0.6oz pure alcohol.</li>
            </ul>
            <p>
              In other words: a White Claw is one standard drink. Despite the lighter feel and the marketing, your body processes it the same as a beer.
            </p>
          </>
        ),
      },
      {
        heading: "What about White Claw Surge and the variants?",
        body: (
          <>
            <p>
              <strong>White Claw Surge:</strong> 8% ABV in a 16oz can. That is roughly 1.3oz pure alcohol, or 2.1 standard drinks per can. One Surge equals about two White Claws.
            </p>
            <p>
              <strong>White Claw 0% (the brand's NA line):</strong> 0.0% ABV. Real non alcoholic. Came out in 2024.
            </p>
            <p>
              <strong>White Claw Iced Tea:</strong> 5% ABV, same as the original.
            </p>
            <p>
              <strong>White Claw Vodka:</strong> 4.5 to 5% ABV depending on variant. Spirit based instead of malt based, but the alcohol math is similar.
            </p>
          </>
        ),
      },
      {
        heading: "How does White Claw compare to beer and wine?",
        body: (
          <>
            <p>
              Per drink, White Claw has the same alcohol content as a regular beer and slightly less than a glass of wine (because the wine pour is smaller but more concentrated).
            </p>
            <p>
              The illusion of "lighter" comes from three things: lower carbohydrate content (most White Claws are 2g carbs vs 12g for a typical lager), the seltzer mouthfeel which feels lighter than beer body, and the marketing aesthetic. None of these change the alcohol content. You will get the same buzz from the same number of cans.
            </p>
          </>
        ),
      },
      {
        heading: "Why people are switching from White Claw",
        body: (
          <>
            <p>
              The hard seltzer category that exploded between 2018 and 2021 has been declining since 2022. The reasons are consistent with the broader <Link to="/sober-curious-guide">sober curious shift</Link>: wearable data made the cost visible, the WHO statement on alcohol changed the conversation, and the non alcoholic alternatives finally got good.
            </p>
            <p>
              The replacement is not always non alcoholic. Some drinkers move to lower ABV beer or wine. But a growing share is moving to NA seltzers, NA lagers, and functional kava based drinks for the same beach day, pool day, summer afternoon role.
            </p>
          </>
        ),
      },
      {
        heading: "Best non alcoholic alternatives to White Claw",
        body: (
          <>
            <h3>For the seltzer drinker who wants no alcohol</h3>
            <p>
              <strong>Capacity Mexican Lager.</strong> Crisp, light, lime ready. Sub 0.5% ABV. The most direct flavor swap.
            </p>
            <p>
              <strong>FLVR! Italian Style Pils.</strong> Dry, crushable, beach perfect.
            </p>
            <p>
              <strong>Le Petit Beret Latina.</strong> True 0.0% Mexican style lager. For people who want zero alcohol.
            </p>
            <h3>For the calorie counter</h3>
            <p>
              Most NA beers are 50 to 90 calories per can, comparable to or lower than White Claw's 100. <strong>Go Brewing Savage Lite</strong> is purpose built for this.
            </p>
            <h3>For the relaxation use case</h3>
            <p>
              <strong>Kava Haven</strong>, <strong>Leilo</strong>, or <strong>Kavaly</strong>. Kava based drinks that deliver a real calming effect, often closer to what people are actually after when they pop a White Claw at 4pm.
            </p>
          </>
        ),
      },
      {
        heading: "The bottom line",
        body: (
          <>
            <p>
              A White Claw is not a "light" drink. It contains the same alcohol as a beer. The marketing built the perception, the data does not support it.
            </p>
            <p>
              If you want the beach day, pool side, summer afternoon experience without the alcohol, the modern NA category gives you bottles and cans that look, taste, and feel like the real thing. Start with a Capacity Mexican Lager, a FLVR! Italian Pils, or a kava drink and you will notice you do not miss the buzz.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "How much alcohol is in a White Claw?", answer: "A standard 12oz White Claw contains 5% alcohol by volume, equivalent to one standard drink. That is the same alcohol content as a typical 12oz beer." },
      { question: "Is White Claw stronger than beer?", answer: "No. White Claw is 5% ABV, the same as most lagers and many craft beers. It feels lighter because of lower carbs and the seltzer mouthfeel, but the alcohol math is identical." },
      { question: "How many White Claws equal a shot?", answer: "Roughly one. A 1.5oz shot of 40% liquor and a 12oz White Claw at 5% both contain about 0.6oz of pure alcohol, which is one standard drink in US guidelines." },
      { question: "How many White Claws to get drunk?", answer: "Depends on body weight, food, and tolerance. A 160lb person typically reaches a 0.08% BAC after 3 to 4 White Claws within an hour, which is the legal limit for driving in most US states." },
      { question: "Is White Claw bad for you?", answer: "It contains the same alcohol as beer or wine, so the same long term health considerations apply. The lower carb content is mildly better for blood sugar than beer. The alcohol itself is the bigger health factor." },
      { question: "What is White Claw 0% and is it really alcohol free?", answer: "Yes. White Claw 0% is a fully non alcoholic line at 0.0% ABV launched in 2024. It is genuinely alcohol free, distinct from the original White Claw." },
      { question: "What is the best non alcoholic alternative to White Claw?", answer: "For seltzer style drinkers, Capacity Mexican Lager, FLVR! Italian Style Pils, and Le Petit Beret Latina all deliver the crisp beach day vibe without the alcohol. For relaxation specifically, kava drinks like Kava Haven or Leilo." },
      { question: "Are NA seltzers as low calorie as White Claw?", answer: "Often lower. Most NA beers run 50 to 90 calories per 12oz can, vs 100 for a standard White Claw. Calorie counters often come out ahead with the NA swap." },
    ]}
    relatedLinks={[
      { label: "Cutwater alcohol content", href: "/cutwater-alcohol-content", description: "What Cutwater contains, by the numbers." },
      { label: "NA Beer Guide", href: "/non-alcoholic-beer-guide", description: "Every NA beer style explained." },
      { label: "Pillar: Non alcoholic drinks", href: "/non-alcoholic-drinks", description: "The complete category." },
      { label: "Sober curious guide", href: "/sober-curious-guide", description: "Why people are drinking less." },
    ]}
  />
);

export default WhiteClawAlcoholContent;
