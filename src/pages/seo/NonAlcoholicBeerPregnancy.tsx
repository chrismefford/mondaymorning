import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const NonAlcoholicBeerPregnancy = () => (
  <AuthorityPage
    title="Non-Alcoholic Beer & Pregnancy: Is NA Beer Safe? 2026 Guide | Monday Morning"
    description="Is non-alcoholic beer safe during pregnancy? A clear, evidence based answer plus the NA beer brands worth knowing. From Monday Morning Bottle Shop."
    path="/non-alcoholic-beer-pregnancy"
    ogImage={`${SITE_URL}/og-non-alcoholic-beer-pregnancy.jpg`}
    eyebrow="NA Beer Cluster"
    h1="Non-alcoholic beer and pregnancy"
    subhead="The honest answer to a question that gets a lot of confusing answers online. ABV thresholds, what doctors actually say, and how to choose a bottle that fits your comfort level."
    tldr="Most non-alcoholic beer in the US contains less than 0.5% ABV, which is similar to ripe fruit, fruit juice, and kombucha. Some NA beers are truly 0.0% ABV. Many doctors consider sub 0.5% ABV beverages acceptable during pregnancy in moderation, but practices vary, and some recommend avoiding any product that contains any alcohol. Talk to your provider before deciding. If you want zero risk, choose a 0.0% labeled product (Le Petit Beret, some Bravus and Surreal lines) and read the label carefully. The safest option is to confirm with your doctor first, then choose accordingly."
    heroImage={`${SITE_URL}/og-non-alcoholic-beer-pregnancy.jpg`}
    ctaPrimary={{ label: "Shop 0.0% NA beer", href: "/collections/na-beer" }}
    ctaSecondary={{ label: "Read the NA beer guide", href: "/non-alcoholic-beer-guide" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "NA Beer Guide", url: `${SITE_URL}/non-alcoholic-beer-guide` },
      { name: "NA Beer and Pregnancy", url: `${SITE_URL}/non-alcoholic-beer-pregnancy` },
    ]}
    sections={[
      {
        heading: "Important: this is not medical advice",
        body: (
          <>
            <p>
              Pregnancy decisions belong with you and your provider. This page summarizes what is publicly known about non-alcoholic beer ABV levels and how various professional bodies frame the question. It is not a substitute for medical advice. Talk to your OB or midwife before deciding whether NA beer fits your pregnancy.
            </p>
          </>
        ),
      },
      {
        heading: "How much alcohol is actually in non-alcoholic beer?",
        body: (
          <>
            <p>
              In the US, "non-alcoholic beer" is a regulated category. Products labeled non-alcoholic must contain less than 0.5% ABV. Many fall well below that, often between 0.05% and 0.4%.
            </p>
            <p>
              For practical comparison, the same trace levels appear in everyday foods and drinks:
            </p>
            <ul>
              <li>Ripe banana: roughly 0.4% ABV.</li>
              <li>Fresh orange juice (after a few days): up to 0.5% ABV.</li>
              <li>Kombucha: typically 0.5% ABV, sometimes higher.</li>
              <li>Burger bun (yeasted): trace amounts.</li>
            </ul>
            <p>
              A separate category, products labeled <strong>0.0% ABV</strong>, contains no detectable alcohol. Examples include Le Petit Beret (Latina, IPA Amber, others), some Bravus lines, Surreal, and select dealcoholized European brands.
            </p>
          </>
        ),
      },
      {
        heading: "What do doctors and professional bodies say?",
        body: (
          <>
            <p>
              The conservative position, held by some OB/GYNs and the CDC's strictest reading of FAS prevention guidance, is that no level of alcohol consumption has been proven safe during pregnancy and therefore any product that may contain trace alcohol should be avoided.
            </p>
            <p>
              The more permissive position, held by many providers and most European medical bodies, is that products under 0.5% ABV pose negligible risk because the trace alcohol does not raise maternal blood alcohol levels above what is naturally present from food and metabolism. Studies have not shown FAS or developmental risk from sub 0.5% ABV beverages consumed in moderation.
            </p>
            <p>
              The practical answer most providers land on:
            </p>
            <ul>
              <li>Sub 0.5% ABV NA beer is generally considered acceptable in moderation, but ask your provider.</li>
              <li>If you want zero risk, choose a 0.0% labeled product.</li>
              <li>Avoid drinking five or six NA beers in a session, the trace alcohol can compound.</li>
              <li>Read labels. ABV varies by product and batch.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "How to choose a 0.0% non-alcoholic beer",
        body: (
          <>
            <p>
              For pregnancy, look specifically for the <strong>0.0% ABV</strong> label rather than just "non-alcoholic." Brands and products that are reliably 0.0% include:
            </p>
            <ul>
              <li><strong>Le Petit Beret Latina</strong> (Mexican style lager, 0.0%).</li>
              <li><strong>Le Petit Beret IPA Amber</strong> (Amber IPA, 0.0%).</li>
              <li>Select <strong>Bravus</strong> products (read individual labels).</li>
              <li>Several European dealcoholized brands available through specialty retailers.</li>
            </ul>
            <p>
              Most US craft NA beer is sub 0.5% rather than true 0.0%. If true 0.0% matters to you, the European dealcoholized category and Le Petit Beret are the strongest options.
            </p>
          </>
        ),
      },
      {
        heading: "Other considerations during pregnancy",
        body: (
          <>
            <p>
              Beyond ABV, a few practical notes:
            </p>
            <ul>
              <li><strong>Caffeine.</strong> Some NA beers and a number of functional drinks contain caffeine. Check the label.</li>
              <li><strong>Adaptogens and botanicals.</strong> Many functional drinks include herbs (ashwagandha, kava, certain mushrooms) that are not recommended during pregnancy. Avoid these categories unless cleared by your provider.</li>
              <li><strong>Folate fortification.</strong> Some NA brewers add folate or B vitamins. Read the label. Useful if appropriate, but supplementation should still come from prenatal vitamins.</li>
              <li><strong>Carbonation and acid reflux.</strong> Many pregnant people experience reflux. Lighter, lower carbonation NA beers tend to feel better.</li>
            </ul>
          </>
        ),
      },
      {
        heading: "Why people choose NA beer during pregnancy",
        body: (
          <>
            <p>
              The most common reasons we hear at our shop:
            </p>
            <ul>
              <li>Wanting to participate in a social ritual without explaining themselves.</li>
              <li>Missing the flavor and ritual of a beer at dinner.</li>
              <li>Looking for variety beyond water and juice during nine months.</li>
              <li>Easing back into beer flavor preference for after pregnancy and breastfeeding.</li>
            </ul>
            <p>
              The decision is personal. The category exists, the science is reasonably understood at sub 0.5% ABV, and the 0.0% products give a fully alcohol-free option for anyone who wants zero. Get medical advice, choose what fits, and enjoy the drink.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "Is non-alcoholic beer safe during pregnancy?", answer: "Most US non-alcoholic beers are below 0.5% ABV, which many providers consider acceptable in moderation, comparable to ripe fruit and fruit juice. Some providers recommend avoiding any product containing any alcohol. Talk to your OB or midwife before deciding. If you want zero risk, choose a product labeled 0.0% ABV." },
      { question: "How much alcohol is in non-alcoholic beer?", answer: "In the US, non-alcoholic beer is legally below 0.5% ABV. Many products fall between 0.05% and 0.4%. Some products are labeled 0.0% ABV and contain no detectable alcohol." },
      { question: "What is the difference between non-alcoholic and 0.0% beer?", answer: "Non-alcoholic beer in the US is anything under 0.5% ABV. 0.0% beer specifically contains no detectable alcohol. If true zero matters to you, look for the 0.0% label, not just non-alcoholic." },
      { question: "Are 0.0% beers truly alcohol-free?", answer: "Yes. A product labeled 0.0% ABV contains no detectable alcohol. Le Petit Beret and select Bravus products are reliable 0.0% options." },
      { question: "Can I drink NA beer while breastfeeding?", answer: "Most providers consider sub 0.5% ABV NA beer acceptable during breastfeeding because the trace alcohol passes into breast milk in negligible amounts. Confirm with your provider, and consider 0.0% products if you want zero risk." },
      { question: "Are functional drinks like kava safe during pregnancy?", answer: "No. Most functional drinks containing kava, certain adaptogens, or some mushrooms are not recommended during pregnancy. Stick to NA beer, dealcoholized wine (with provider approval), or simple non-alcoholic options like sparkling water with citrus." },
      { question: "What about non-alcoholic wine during pregnancy?", answer: "Same logic applies. Most NA wine is sub 0.5% ABV. Some are 0.0%. Talk to your provider, and if you want zero risk choose a labeled 0.0% product." },
      { question: "What is the best 0.0% NA beer for pregnancy?", answer: "Le Petit Beret Latina (Mexican style lager) is widely available and reliably 0.0% ABV. Their IPA Amber is also 0.0%. For more options, ask at our tasting rooms or check our 0.0% inventory online." },
    ]}
    relatedLinks={[
      { label: "NA Beer Guide", href: "/non-alcoholic-beer-guide", description: "Every NA beer style explained." },
      { label: "Best non-alcoholic IPAs", href: "/best-non-alcoholic-ipas", description: "Top picks across IPA styles." },
      { label: "Pillar: Non-alcoholic drinks", href: "/non-alcoholic-drinks", description: "The complete category." },
      { label: "Sober-curious guide", href: "/sober-curious-guide", description: "The broader context." },
    ]}
  />
);

export default NonAlcoholicBeerPregnancy;
