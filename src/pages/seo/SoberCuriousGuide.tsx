import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const SoberCuriousGuide = () => (
  <AuthorityPage
    title="Sober Curious Guide 2026: How to Drink Less Without Quitting | Monday Morning"
    description="A practical, judgment free sober curious guide. How to drink less, what to drink instead, and the NA bottles worth trying first. From Monday Morning Bottle Shop."
    path="/sober-curious-guide"
    ogImage={`${SITE_URL}/og-sober-curious-guide.jpg`}
    eyebrow="Cluster Hub"
    h1="The sober curious guide"
    subhead="Sober curious is not sobriety. It is a deliberate, investigative relationship with alcohol. Here is the playbook for drinking less without missing out."
    tldr="Sober curious means questioning your relationship with alcohol without committing to full sobriety. Most sober curious people drink occasionally and intentionally rather than habitually. The shift is generational: 61% of Gen Z and 49% of Millennials report drinking less than the previous generation. The lifestyle works because the alternatives finally got good. Start by tracking how you actually feel after drinking, then run a 30 day experiment with non alcoholic alternatives, then decide your steady state."
    heroImage={`${SITE_URL}/og-sober-curious-guide.jpg`}
    ctaPrimary={{ label: "Shop NA drinks", href: "/shop" }}
    ctaSecondary={{ label: "Read the dictionary", href: "/blog/curious-af-dictionary" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "Sober Curious Guide", url: `${SITE_URL}/sober-curious-guide` },
    ]}
    sections={[
      {
        heading: "What sober curious actually means",
        body: (
          <>
            <p>
              The term was popularized by Ruby Warrington in her 2018 book Sober Curious. It is not a synonym for sober, and it is not a softer way to say recovery. It is a separate idea.
            </p>
            <p>
              Sober curious means deliberately questioning your relationship with alcohol. You ask: Do I actually enjoy this? Why am I reaching for this drink? How do I feel tomorrow? Would I be missing anything if I skipped tonight?
            </p>
            <p>
              The answer might be that you keep drinking the way you do. Or it might be that you cut back significantly. Or that you stop. Sober curious is a lens, not a destination.
            </p>
            <p>
              For more language to navigate these conversations, see <Link to="/blog/curious-af-dictionary">the Curious AF Dictionary</Link>.
            </p>
          </>
        ),
      },
      {
        heading: "Why people are getting curious in 2026",
        body: (
          <>
            <p>
              Five forces converged.
            </p>
            <ol>
              <li><strong>Wearables made the cost visible.</strong> Sleep trackers showed exactly what one drink does to recovery. The data is brutal and personal.</li>
              <li><strong>The WHO statement in 2023.</strong> No level of alcohol consumption is safe for health. That changed the cultural baseline.</li>
              <li><strong>Cannabis legalization.</strong> Created a real alternative for relaxation that did not exist in most states a decade ago.</li>
              <li><strong>Pandemic drinking patterns.</strong> A lot of people noticed they had been drinking more than they meant to, and decided to recalibrate.</li>
              <li><strong>The alternatives finally got good.</strong> Modern <Link to="/non-alcoholic-beer-guide">NA beer</Link>, <Link to="/non-alcoholic-wine">NA wine</Link>, and <Link to="/non-alcoholic-spirits">NA spirits</Link> are genuinely good. That makes the choice viable.</li>
            </ol>
          </>
        ),
      },
      {
        heading: "The sober curious starter playbook",
        body: (
          <>
            <h3>Week 1: Observe, don't change</h3>
            <p>
              Track every drink for one week. Time, occasion, how you felt before, how you felt the next morning. No judgment. Just data. Most people are surprised by both how much and how little they drink.
            </p>
            <h3>Week 2 to 4: Run the experiment</h3>
            <p>
              Pick a 30 day window. Replace alcohol with non alcoholic alternatives whenever you would normally pour a drink. Use real bottles, not soda water. The point is to keep the ritual and remove the alcohol.
            </p>
            <h3>Week 5: Decide your steady state</h3>
            <p>
              After 30 days you will know what you actually want. Some people go fully sober. Most settle into a "sometimes drinker" pattern: special occasions only, or weekends only, or just dinner with friends. There is no wrong answer.
            </p>
          </>
        ),
      },
      {
        heading: "What to drink when you are not drinking",
        body: (
          <>
            <p>
              The category sorts cleanly. Here is how to think about it.
            </p>
            <ul>
              <li><strong>For the social moment.</strong> A craft NA beer in your hand looks identical to a regular beer. Most people will not even notice.</li>
              <li><strong>For dinner.</strong> A bottle of dealcoholized rosé or a sparkling NA wine. Real wine glasses, real ritual.</li>
              <li><strong>For the cocktail moment.</strong> An NA spirit and a tonic. Or a fully built NA negroni. Use Almave, Sentia, or Glen Dochus.</li>
              <li><strong>For relaxation.</strong> A kava drink (Kava Haven, Leilo) or an adaptogenic blend (Trip, Curious Elixirs). Designed to take the edge off without alcohol.</li>
              <li><strong>For focus or mood.</strong> Functional drinks with L theanine, lion's mane, or rhodiola.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "How to navigate social life sober curious",
        body: (
          <>
            <p>
              The biggest fear is social: what do I say, will people make it weird. Three things help.
            </p>
            <p>
              <strong>1. Hold a drink.</strong> A craft NA beer in your hand short circuits 90% of awkwardness. People notice if your hand is empty. They do not notice what is in the bottle.
            </p>
            <p>
              <strong>2. "Non alcoholic" is a complete sentence.</strong> You do not owe anyone an explanation. If pressed, "I just feel better when I do not drink tonight" works for any context.
            </p>
            <p>
              <strong>3. Pick the venue intentionally.</strong> San Diego now has <Link to="/best-non-alcoholic-bars-san-diego">several bars with serious NA programs</Link>. Suggest one of those instead of a default brewery.
            </p>
          </>
        ),
      },
      {
        heading: "Common myths about being sober curious",
        body: (
          <>
            <p>
              <strong>Myth: It is just sobriety in disguise.</strong> No. Sobriety is a commitment to not drinking. Sober curious is a commitment to thinking about whether you should drink.
            </p>
            <p>
              <strong>Myth: It is for people with a problem.</strong> Most sober curious people drink at perfectly normal levels. They are optimizing, not recovering.
            </p>
            <p>
              <strong>Myth: It is boring.</strong> Anyone who has tried a real NA negroni knows this is not true. The drinks are good. The mornings are better.
            </p>
            <p>
              <strong>Myth: It is anti drinking.</strong> The point is not that drinking is bad. The point is that drinking should be a deliberate choice, not a default.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "What is the difference between sober curious and sober?", answer: "Sober means you do not drink at all. Sober curious means you are actively investigating your relationship with alcohol, and you may drink occasionally, intentionally, or not at all. Sober is a state. Sober curious is a process." },
      { question: "Do sober curious people drink at all?", answer: "Many do, in small, intentional amounts. The point is conscious choice rather than habit. Some sober curious people land on full sobriety. Others land on a much reduced drinking pattern. Both are valid outcomes." },
      { question: "How long does it take to feel the benefits of drinking less?", answer: "Sleep improvements show up in the first week. Skin and energy changes within two to four weeks. Mental clarity and resting heart rate improvements within the first month. Long term cardiovascular and cancer risk benefits accrue over years." },
      { question: "Is being sober curious a trend?", answer: "It is a trend in the same way running became a trend in the 1970s. The shift looks faddish from outside but the data, generational drinking decline, NA category growth, wearable adoption, suggests it is structural and persistent." },
      { question: "What if I want to be sober curious but my friends still drink?", answer: "This is the most common situation. Hold an NA beer or a glass of NA wine. Most of your friends will not care, and many will be quietly curious themselves. The social problem solves itself faster than people expect." },
      { question: "Can I be sober curious for just a month?", answer: "Yes. Dry January and Sober October are exactly this. A 30 day experiment is often how people start. See our Dry January guide for a full playbook." },
      { question: "Does sober curious work if I drink because of stress?", answer: "Often yes, but the issue underneath the drinking still needs attention. Functional drinks like kava or adaptogens replace the relaxation, but the stress source itself does not go away. Therapy, exercise, and real rest matter more than the drink swap." },
      { question: "Is sober curious the same as California sober?", answer: "No. California sober usually means no alcohol but yes to cannabis or other substances. Sober curious is specifically about questioning the role of alcohol. They overlap but they are different ideas. Both are defined in our dictionary." },
    ]}
    relatedLinks={[
      { label: "Curious AF Dictionary", href: "/blog/curious-af-dictionary", description: "Every term in the sober curious vocabulary." },
      { label: "Pillar: Non alcoholic drinks", href: "/non-alcoholic-drinks", description: "What to drink instead." },
      { label: "Dry January guide", href: "/dry-january-guide", description: "The 30 day experiment, properly run." },
      { label: "Alcohol free lifestyle benefits", href: "/alcohol-free-lifestyle-benefits", description: "What actually changes when you stop." },
    ]}
  />
);

export default SoberCuriousGuide;
