import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const BestNABarsSanDiego = () => (
  <AuthorityPage
    title="Best Non-Alcoholic Bars in San Diego (2026): NA Tasting Rooms & Bars | Monday Morning"
    description="The best non-alcoholic bars and tasting rooms in San Diego for 2026. Where to drink zero-proof in PB, OB, North Park and beyond, picked by Monday Morning Bottle Shop."
    
    path="/best-non-alcoholic-bars-san-diego"
    ogImage={`${SITE_URL}/og-best-na-bars-san-diego.jpg`}
    eyebrow="San Diego Local"
    h1="The best non-alcoholic bars in San Diego"
    subhead="San Diego has quietly become one of the country's strongest cities for zero-proof drinking. Here are the bottle shops, tasting rooms, and bar programs worth visiting."
    tldr="San Diego has emerged as a leader for non-alcoholic drinking thanks to a strong sober-curious culture and a critical mass of dedicated venues. The standouts: Monday Morning Bottle Shop (two locations, 500+ NA drinks, tasting rooms), Polished Pigeon, Good News Bar, plus a growing roster of restaurants with serious NA cocktail programs. For visitors, hit Pacific Beach for the bottle shop scene and North Park for the bar program scene. For locals, build your home bar at Monday Morning and use the partner bars for nights out."
    heroImage={`${SITE_URL}/og-best-na-bars-san-diego.jpg`}
    ctaPrimary={{ label: "Visit our tasting rooms", href: "/locations" }}
    ctaSecondary={{ label: "Read the SD pillar guide", href: "/non-alcoholic-drinks-san-diego" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "San Diego NA Drinks", url: `${SITE_URL}/non-alcoholic-drinks-san-diego` },
      { name: "Best NA Bars San Diego", url: `${SITE_URL}/best-non-alcoholic-bars-san-diego` },
    ]}
    sections={[
      {
        heading: "Why San Diego is a leader for non-alcoholic drinking",
        body: (
          <>
            <p>
              The city stacks three things very few US metros have together: a strong outdoor and wellness culture, a craft beverage scene with brewery DNA in its bones, and a critical mass of dedicated NA venues that have been operating for several years now. The result is a city where ordering a non-alcoholic cocktail at a serious bar does not mean a Shirley Temple.
            </p>
            <p>
              The neighborhoods that lead are Pacific Beach, Ocean Beach, North Park, and Little Italy. Each has its own flavor.
            </p>
          </>
        ),
      },
      {
        heading: "Monday Morning Bottle Shop, Pacific Beach and Ocean Beach",
        body: (
          <>
            <p>
              Disclosure: this is us. We run the two flagship dedicated NA bottle shops in San Diego.
            </p>
            <p>
              <strong>Pacific Beach:</strong> 1854 Garnet Ave. Two minutes from the boardwalk. 500+ non-alcoholic drinks across beer, wine, spirits, and functional. Tasting bar pours every craft beer, NA spirit, and functional drink on the shelf. Wine tastings available when a bottle is already open that day. Open Tue to Sat 11am to 8pm, Sun 11am to 6pm. Closed Monday (open by appointment for industry).
            </p>
            <p>
              <strong>Ocean Beach:</strong> 4967 Newport Ave. Same selection, same tasting program, with a slightly more local crowd and easier parking. Open Tue and Thu 11am to 8pm, Wed 3pm to 8pm, Fri to Sun 11am to 6pm. Closed Monday.
            </p>
            <p>
              See both <Link to="/locations">store locations</Link> for details and hours.
            </p>
          </>
        ),
      },
      {
        heading: "Polished Pigeon",
        body: (
          <>
            <p>
              One of San Diego's serious bar programs that takes non-alcoholic cocktails as a real menu category, not an afterthought. Their NA list runs deep into Almave, Sentia, and rotating dealcoholized wines. The room is gorgeous and the bartenders know what to do with NA spirits. A great date night option for sober-curious or mixed groups.
            </p>
          </>
        ),
      },
      {
        heading: "Good News Bar",
        body: (
          <>
            <p>
              A dedicated alcohol-free bar with a focus on functional and adaptogenic drinks alongside zero-proof cocktails. Strong kava program, strong adaptogenic mocktail list, and a community feel that makes it a default for sober-curious nights out. Frequently hosts events and programming.
            </p>
          </>
        ),
      },
      {
        heading: "Restaurants with strong NA programs",
        body: (
          <>
            <p>
              Several San Diego restaurants now run NA cocktail programs at the same level as their alcoholic ones. The pattern: ask the bartender, not the server. NA programs are often word of mouth even when the restaurant has them. If you are at a thoughtful restaurant in North Park, Little Italy, or Liberty Station, ask "do you have a non-alcoholic cocktail menu" and you will often be surprised.
            </p>
            <p>
              The chef driven spots tend to lead. Tequila and agave forward kitchens are also early adopters because of Almave specifically.
            </p>
          </>
        ),
      },
      {
        heading: "How to plan an NA drinking night in San Diego",
        body: (
          <>
            <h3>Pre game at home</h3>
            <p>
              Build a basic <Link to="/zero-proof-home-bar">zero-proof home bar</Link>. Make a paloma or a Sentia spritz. Sets the tone before going out.
            </p>
            <h3>Stop at Monday Morning for a tasting</h3>
            <p>
              Drop into Pacific Beach or Ocean Beach. Sample three or four new NA beers or spirits. Buy whatever you fall in love with for later in the week.
            </p>
            <h3>Dinner at a restaurant with an NA program</h3>
            <p>
              Ask for the NA cocktail menu, not just a mocktail. The vocabulary signals you to a real bartender that you want a serious drink.
            </p>
            <h3>Night cap at a dedicated NA venue</h3>
            <p>
              Polished Pigeon, Good News Bar, or any bar that lists Almave or Sentia on the menu. End the night somewhere built for this kind of drinking.
            </p>
          </>
        ),
      },
      {
        heading: "What to look for in a good NA bar",
        body: (
          <>
            <p>
              The signs that a bar takes NA seriously:
            </p>
            <ul>
              <li>NA cocktails listed on the printed menu, not just available on request.</li>
              <li>Real NA spirits on the back bar (Almave, Sentia, Glen Dochus, Abstinence, Ceybon).</li>
              <li>Fresh citrus and proper ice. NA drinks live or die on technique.</li>
              <li>NA beer in cans or bottles, not just one tap of legacy supermarket NA.</li>
              <li>Pricing comparable to alcoholic drinks. If NA cocktails cost $4 less, the bar does not respect them.</li>
            </ul>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "What is the best non-alcoholic bottle shop in San Diego?", answer: "Monday Morning Bottle Shop. Two locations (Pacific Beach and Ocean Beach), 500+ non-alcoholic drinks, tasting rooms at both stores, and the largest curated selection in the city. Open Tuesday through Sunday; hours vary by location, so check the Locations page." },
      { question: "Where can I order non-alcoholic cocktails in San Diego?", answer: "Polished Pigeon, Good News Bar, and a growing list of restaurants in North Park, Little Italy, and Liberty Station. Ask for the NA cocktail menu specifically, not just a mocktail." },
      { question: "Are there fully alcohol-free bars in San Diego?", answer: "Yes. Good News Bar is the leader. The space is fully alcohol-free with a strong kava program and zero-proof cocktail menu. Several other concepts are launching." },
      { question: "Can I taste non-alcoholic drinks before buying?", answer: "Yes at Monday Morning. Both our Pacific Beach and Ocean Beach locations have a tasting bar. Walk in and sample any beer, spirit, or functional drink on the shelf during business hours. Wine tastings happen when a bottle is already open that day." },
      { question: "Is San Diego a good city for sober-curious travel?", answer: "Excellent. The combination of dedicated bottle shops, alcohol-free bars, restaurant NA programs, and the broader wellness and outdoor culture makes it one of the best US cities for a sober-curious trip." },
      { question: "What neighborhoods have the best NA scene?", answer: "Pacific Beach for the bottle shop scene, North Park for the cocktail bar programs, Ocean Beach for the local feel, and Little Italy for restaurant NA menus. Most visitors hit Pacific Beach and North Park on the same trip." },
      { question: "Do San Diego bars carry Almave?", answer: "Increasingly yes. The bars with serious NA programs almost always carry Almave Blanco or Ámbar. It is the easiest sign that a bar takes the category seriously." },
    ]}
    relatedLinks={[
      { label: "San Diego NA drinks", href: "/non-alcoholic-drinks-san-diego", description: "The full local guide." },
      { label: "Monday Morning locations", href: "/locations", description: "Pacific Beach and Ocean Beach details." },
      { label: "Pillar: Non-alcoholic drinks", href: "/non-alcoholic-drinks", description: "The complete category." },
      { label: "Zero-proof home bar", href: "/zero-proof-home-bar", description: "Build the bar at home." },
    ]}
  />
);

export default BestNABarsSanDiego;
