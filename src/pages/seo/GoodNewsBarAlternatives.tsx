import { Link } from "react-router-dom";
import AuthorityPage from "@/components/seo/AuthorityPage";
import { SITE_URL } from "@/lib/seo";

const GoodNewsBarAlternatives = () => (
  <AuthorityPage
    title="Good News Bar Alternatives in San Diego (2026) | Monday Morning"
    description="If you like Good News Bar in Hillcrest, here are the other non alcoholic bars, bottle shops, and tasting rooms in San Diego worth visiting. An honest local guide."
    path="/good-news-bar-alternatives-san-diego"
    ogImage={`${SITE_URL}/og-good-news-bar-alternatives.jpg`}
    eyebrow="San Diego Local"
    h1="Good News Bar alternatives in San Diego"
    subhead="An honest guide to the rest of San Diego's non alcoholic scene from a local bottle shop. Where to drink, where to shop, and how each spot is different."
    tldr="Good News Bar in Hillcrest is the city's pioneer dedicated alcohol free bar. If you like it, the other spots worth knowing are Monday Morning Bottle Shop in Pacific Beach and Ocean Beach (500+ NA drinks with a tasting bar), Polished Pigeon for a serious sit down NA cocktail bar program, and a growing list of restaurants in North Park, Little Italy, and Liberty Station running real NA cocktail menus. Each spot has a different vibe. Use them together rather than as substitutes."
    heroImage={`${SITE_URL}/og-good-news-bar-alternatives.jpg`}
    ctaPrimary={{ label: "Visit our tasting rooms", href: "/locations" }}
    ctaSecondary={{ label: "All non alcoholic bars in SD", href: "/best-non-alcoholic-bars-san-diego" }}
    breadcrumbs={[
      { name: "Home", url: SITE_URL },
      { name: "San Diego NA Drinks", url: `${SITE_URL}/non-alcoholic-drinks-san-diego` },
      { name: "Good News Bar Alternatives", url: `${SITE_URL}/good-news-bar-alternatives-san-diego` },
    ]}
    sections={[
      {
        heading: "What Good News Bar does well",
        body: (
          <>
            <p>
              Credit where it is due. Good News Bar in Hillcrest opened as San Diego's first fully dedicated alcohol free bar and built the room many people in this city first visited when they were getting curious about drinking less. The strong kava program, functional drink menu, and inclusive community focus all set a tone that the rest of the local scene now builds on.
            </p>
            <p>
              If you have been a few times and want to know what else the city has to offer, here is the honest version from a local bottle shop.
            </p>
          </>
        ),
      },
      {
        heading: "Monday Morning Bottle Shop: the deepest selection in the city",
        body: (
          <>
            <p>
              Disclosure: this is us. We run Monday Morning Bottle Shop, the dedicated non alcoholic bottle shop and tasting room chain in San Diego. Two locations: Pacific Beach at 1854 Garnet Ave and Ocean Beach at 4967 Newport Ave. Both open Tuesday to Sunday, 11am to 8pm.
            </p>
            <p>
              Where Good News is a bar to sit and drink in, Monday Morning is built around exploration and take home. 500+ non alcoholic drinks across beer, wine, spirits, and functional categories. A tasting bar pours every craft NA beer, NA spirit, and functional drink on the shelf so you can try before you buy. Wine tastings happen when a bottle is already open that day. Brands like Almave, Sentia, Glen Dochus, Abstinence, Ceybon, side by side in one room.
            </p>
            <p>
              Most Hillcrest regulars build their home bar with us and use the dedicated bars and restaurant programs for nights out. See <Link to="/locations">both store locations</Link> for hours and directions.
            </p>
          </>
        ),
      },
      {
        heading: "Polished Pigeon: a serious sit down NA cocktail bar",
        body: (
          <>
            <p>
              Polished Pigeon is the bar to know if what you love about Good News is the bar feel but you want a more cocktail forward room. Their NA list runs deep into Almave, Sentia, and rotating dealcoholized wines. The bartenders treat non alcoholic cocktails as a real menu category. The room is gorgeous and works for date night or a small group.
            </p>
          </>
        ),
      },
      {
        heading: "Restaurants in North Park, Little Italy, and Liberty Station",
        body: (
          <>
            <p>
              A surprising number of chef driven San Diego restaurants now run NA cocktail programs at the same level as their alcoholic ones, even when the menu does not say so. The pattern: ask the bartender, not the server.
            </p>
            <p>
              Phrases that work better than "do you have mocktails":
            </p>
            <ul>
              <li>Do you have a non alcoholic cocktail menu</li>
              <li>What can your bartender make without alcohol</li>
              <li>Do you carry any non alcoholic spirits I can build a drink with</li>
            </ul>
            <p>
              Tequila and agave forward kitchens are the most reliable because of Almave. Wine focused rooms usually carry a thoughtful dealcoholized bottle or two.
            </p>
          </>
        ),
      },
      {
        heading: "How each spot is different",
        body: (
          <>
            <h3>Good News Bar, Hillcrest</h3>
            <p>
              Dedicated alcohol free bar. Strong kava and functional focus. Community first room with regular events. Best for a hangout in Hillcrest.
            </p>
            <h3>Monday Morning, Pacific Beach and Ocean Beach</h3>
            <p>
              Dedicated bottle shops with tasting bars. 500+ NA drinks across every category. Best for tasting new things, building a home bar, and shopping. Two locations on opposite sides of the city.
            </p>
            <h3>Polished Pigeon</h3>
            <p>
              Bar program with a serious NA cocktail menu. Best for date night or a sit down drinks focused outing.
            </p>
            <h3>Restaurants with NA programs</h3>
            <p>
              Best when you want dinner that does not feel compromised. Ask the bartender what they can build.
            </p>
          </>
        ),
      },
      {
        heading: "How to actually use the SD non alcoholic scene",
        body: (
          <>
            <p>
              The locals who live alcohol free in San Diego do not treat these places as substitutes for each other. They use them together.
            </p>
            <p>
              A typical week: build the <Link to="/zero-proof-home-bar">home bar</Link> at Monday Morning. Have most weeknight drinks at home. Save Good News for a community focused night out in Hillcrest. Save Polished Pigeon for date night. Save the restaurant programs for dinners. That mix is what the scene is actually for.
            </p>
          </>
        ),
      },
    ]}
    faqs={[
      { question: "What is the best alternative to Good News Bar in San Diego?", answer: "There is no direct substitute because Good News is the only dedicated alcohol free bar in Hillcrest. The closest equivalents in spirit are Monday Morning Bottle Shop in Pacific Beach and Ocean Beach (500+ NA drinks with a tasting bar) for shopping and tasting, and Polished Pigeon for a serious sit down NA cocktail program." },
      { question: "Where can I buy non alcoholic drinks in San Diego?", answer: "Monday Morning Bottle Shop is the dedicated non alcoholic bottle shop chain. Two locations: 1854 Garnet Ave in Pacific Beach and 4967 Newport Ave in Ocean Beach. Open Tuesday to Sunday, 11am to 8pm. The deepest curated NA selection in the city, with a tasting bar at both stores." },
      { question: "Are there other alcohol free bars in San Diego besides Good News?", answer: "Good News is currently the only fully dedicated alcohol free sit down bar in San Diego. Several restaurants and bars run serious NA cocktail programs that function similarly for a night out. Polished Pigeon is the closest in spirit on the bar side." },
      { question: "Which non alcoholic bar in San Diego has the biggest selection?", answer: "Monday Morning Bottle Shop. 500+ non alcoholic drinks across beer, wine, spirits, and functional categories, with a tasting bar at both Pacific Beach and Ocean Beach locations." },
      { question: "Is Good News Bar good for sober curious people?", answer: "Yes. Good News Bar is one of the most welcoming community spaces in the city for sober curious and sober people alike. Pair it with bottle shop trips to Monday Morning and dinners at restaurants with NA programs for a complete local scene." },
      { question: "What neighborhoods in San Diego have non alcoholic bars and bottle shops?", answer: "Hillcrest for Good News Bar, Pacific Beach for the Monday Morning flagship, Ocean Beach for the second Monday Morning location, and North Park, Little Italy, and Liberty Station for restaurant NA cocktail programs." },
    ]}
    relatedLinks={[
      { label: "Best non alcoholic bars in San Diego", href: "/best-non-alcoholic-bars-san-diego", description: "Full citywide guide." },
      { label: "Non alcoholic bar Hillcrest", href: "/non-alcoholic-bar-hillcrest", description: "The Hillcrest neighborhood guide." },
      { label: "Monday Morning locations", href: "/locations", description: "Pacific Beach and Ocean Beach details." },
      { label: "San Diego NA drinks", href: "/non-alcoholic-drinks-san-diego", description: "The local pillar guide." },
    ]}
  />
);

export default GoodNewsBarAlternatives;
