import { Helmet } from "@/lib/helmet-compat";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLocationHours } from "@/hooks/useLocationHours";
import { compactHours, getLocation } from "@/data/locations";
import stampGold from "@/assets/stamp-gold.svg";
import stampGreen from "@/assets/stamp-green.svg";
import textureCream from "@/assets/texture-cream.webp";
import textureGreen from "@/assets/texture-green.webp";
import zaneFounder from "@/assets/zane-founder.webp";
import friendsLounge from "@/assets/brand/friends.jpg";
import haymakerCan from "@/assets/brand/haymaker-can.webp";
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  getCanonicalUrl,
  organizationSchema
} from "@/lib/seo";

const About = () => {
  // Live opening hours from Google (weekly sync), folded into a one-line
  // string per shop. Falls back to the built-in string below if unavailable.
  const { data: liveHours } = useLocationHours();
  const liveHoursLine = (slug: string): string | null => {
    const live = liveHours?.[slug];
    if (!live || !live.weekdayText.length) return null;
    const open = compactHours(live.weekdayText).filter((h) => !h.closed);
    if (!open.length) return null;
    return open.map((h) => `${h.days} ${h.time}`).join(", ");
  };

  // What we believe (brand manifesto)
  const beliefs = [
    "Alcohol-free should taste like something, not like an apology.",
    "There's no wrong reason. Sober, sober-curious, pregnant, training, or just done waking up wrecked.",
    "We don't judge what's in your glass. We just make sure it's good.",
    "You're welcome here, whether it's your first dry day or your thousandth.",
  ];

  // Our places
  const places = [
    {
      name: "Pacific Beach",
      tag: "The Flagship",
      slug: "pacific-beach",
      blurb: "Our first bottle shop and tasting room. The full 500+ wall, plus a bar to actually try things.",
      address: "1854 Garnet Ave, San Diego, CA 92109",
      hours: "Tue to Sat 11am to 8pm, Sun 11am to 6pm",
      image: friendsLounge,
      href: "/locations",
    },
    {
      name: "Ocean Beach",
      tag: "Beachside",
      slug: "ocean-beach",
      blurb: "A laid-back bottle shop one block from the beach. Grab your Vibations for a beach day and a little more salt air.",
      address: "4967 Newport Ave, San Diego, CA 92107",
      hours: "Tue & Thu 11am to 8pm, Wed 3pm to 8pm, Fri to Sun 11am to 6pm",
      image: "/hero/beach.webp",
      href: "/locations",
    },
    {
      name: "The Lab",
      tag: "San Marcos",
      slug: "the-lab",
      blurb: "Our non-alcoholic brewing and innovation space. Home of Haymaker NA IPA, our first house brew.",
      address: "1784 La Costa Meadows Dr, Ste 103, San Marcos, CA 92078",
      hours: "See our Google listing for current hours",
      image: haymakerCan,
      href: "/services",
    },
  ];

  // Press: top outlets pulled from the full list on /press (Press.tsx).
  const press = [
    { name: "Inc.", href: "https://www.inc.com/marcel-schwantes/why-more-people-are-embracing-the-alcohol-free-drinking-boom/91151053" },
    { name: "Associated Press", href: "https://apnews.com/article/na-beer-alcohol-sober-drinking-mocktail-294a5de375fc7798c98a5b64691ed6f0" },
    { name: "Fox 5 San Diego", href: "https://www.youtube.com/watch?v=ZPQ0O6rEnCI" },
    { name: "CBS 8", href: "https://www.cbs8.com/article/news/local/non-alcoholic-bottle-shop-aids-dry-january-participants-in-san-diego/509-466a9201-d527-485b-bdbf-01674b7ce3db" },
    { name: "San Diego Union-Tribune", href: "https://www.sandiegouniontribune.com/2025/08/05/on-the-menu-monday-morning-bottle-shop-offers-spirits-without-the-alcohol-in-pacific-beach/" },
  ];

  // Leadership / core team. `image` is optional: when a member has a real photo
  // it renders in the medallion, otherwise we show their initials in brand gold.
  const team = [
    { name: "Zane Curtis", title: "Founder & CEO", image: undefined as string | undefined },
    { name: "Brian Andersen", title: "Chief Revenue Officer", image: undefined as string | undefined },
    { name: "Jen Unger", title: "Operations Manager", image: undefined as string | undefined },
    { name: "Dy Lorenzana", title: "Vibe Alchemist", image: undefined as string | undefined },
  ];
  const initials = (name: string) =>
    name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

  const pageTitle = "Our Story | Monday Morning Bottle Shop";
  const pageDescription = "The story behind Monday Morning, San Diego's first non-alcoholic bottle shop. Why we built it, what we believe, and where to find us in Pacific Beach and Ocean Beach.";
  const canonicalUrl = getCanonicalUrl("/about");

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Monday Morning Bottle Shop",
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": organizationSchema
  };

  return (
    <div className="min-h-screen bg-cream brand-type">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={DEFAULT_OG_IMAGE} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
        <meta name="twitter:site" content={TWITTER_HANDLE} />
        <script type="application/ld+json">
          {JSON.stringify(aboutSchema)}
        </script>
      </Helmet>

      <Header />

      <main>
        {/* MANIFESTO HERO */}
        <section className="relative pt-28 lg:pt-32 pb-8 lg:pb-10 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          {/* Stamp accent */}
          <div className="absolute top-20 right-6 lg:right-16 w-28 lg:w-44 opacity-[0.12] pointer-events-none rotate-6">
            <img src={stampGold} alt="" className="w-full h-full" />
          </div>

          <div className="mx-auto max-w-[1600px] px-6 lg:px-12 relative z-10">
            <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-5 block">
              Our Story · San Diego, Est. 2024
            </span>
            <h1 className="font-serif text-5xl lg:text-7xl xl:text-8xl leading-[0.95] mb-6">
              Better mornings start the<br /><span className="font-script text-gold text-[1.15em] leading-none whitespace-nowrap">night before.</span>
            </h1>
            <p className="font-sans text-lg lg:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
              We're here to prove that drinking differently means drinking better, not missing out.
            </p>
          </div>
        </section>

        {/* FOUNDER STORY */}
        <section className="py-8 lg:py-12 relative overflow-hidden bg-cream-warm">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
              {/* Photo */}
              <div className="relative mb-20 lg:mb-0 lg:col-span-2 lg:sticky lg:top-28">
                <div className="aspect-[4/5] overflow-hidden border-2 border-forest">
                  <img
                    src={zaneFounder}
                    alt="Zane Curtis, founder of Monday Morning"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="hidden lg:block absolute -bottom-5 -left-5 w-1/3 h-32 bg-gold z-[-1]" />
                {/* Pull-quote: the line that named the company */}
                <div className="absolute -bottom-12 left-4 right-4 lg:left-6 lg:right-6 bg-teal-dark border-2 border-teal-dark p-6 shadow-brutal">
                  <p className="font-serif text-lg italic leading-relaxed text-cream">
                    "I realized on a Monday morning that I wasn't keeping the promise I made her."
                  </p>
                  <p className="font-sans text-xs uppercase tracking-[0.15em] text-gold mt-3">
                    Zane Curtis · Founder &amp; CEO
                  </p>
                </div>
              </div>

              {/* Copy */}
              <div className="lg:col-span-3">
                <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-5 block">
                  The Founder
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1.02] mb-6">
                  Meet <span className="font-script text-gold text-[1.2em] leading-none">Zane.</span>
                </h2>
                <div className="space-y-4 font-sans text-base lg:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    For years I was a ten to fourteen drink a day guy who thought that was normal. A few beers at lunch, more when I got home, a bottle of wine with dinner, then a couple of nightcaps. I never thought I had a problem. It took making it to a full year sober to finally see it.
                  </p>
                  <p>
                    My real why is my wife. She grew up with an alcoholic, and on our wedding day I promised her a better life. Seventeen years in, drinking still sat right in the middle of our marriage, our conversations, our weekends. So I got sober, for her and our kids. It is the hardest thing I have ever done.
                  </p>
                  <p>
                    Getting sober also showed me how lonely that road can be. That is why Monday Morning exists: somewhere to find genuinely good drinks and genuinely good people, with zero judgment.
                  </p>
                  <p>
                    I also wanted my nightlife back. I was done feeling like the kid at the adult table, handed a sad mocktail or the same boring NA beer everywhere I went. So we help bars and restaurants pour better, and I bought a brewery to bring back what I missed: real craft on tap, food trucks, the whole scene, made for people who want a better option.
                  </p>
                  <p className="text-lg lg:text-xl font-medium text-forest">
                    I can't get those years back. But I can help the next person who's ready. That's the whole point.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE BELIEVE */}
        <section className="py-12 lg:py-16 bg-forest text-cream relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-40" />
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: `url(${textureGreen})`, backgroundSize: 'cover' }}
          />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mb-10 lg:mb-14">
              <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
                What We Believe
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.05] text-cream">
                No lectures. <span className="font-script text-gold text-[1.2em] leading-none">Just better options.</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl">
              {beliefs.map((belief, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="font-serif text-2xl text-gold leading-none shrink-0 pt-1">0{i + 1}</span>
                  <p className="font-serif italic text-xl lg:text-2xl text-cream/90 leading-snug">
                    {belief}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR PLACES */}
        <section className="py-10 lg:py-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-10 lg:mb-14 max-w-2xl mx-auto">
              <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
                Come See Us
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] mb-4">
                Three rooms, <span className="font-script text-gold text-[1.2em] leading-none">one idea.</span>
              </h2>
              <p className="font-sans text-base lg:text-lg text-muted-foreground">
                Every bottle is open to taste before you buy. No guessing, no pressure.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {places.map((place) => (
                <Link
                  to={place.href}
                  key={place.name}
                  className="group block border-2 border-forest overflow-hidden bg-cream hover:shadow-brutal transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {place.image ? (
                      <img
                        src={place.image}
                        alt={`Monday Morning ${place.name}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-forest flex items-center justify-center relative overflow-hidden">
                        <div className="grain absolute inset-0 opacity-40" />
                        <img src={stampGold} alt="" className="w-28 opacity-20" />
                      </div>
                    )}
                    <span className="absolute top-3 left-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-cream bg-forest/80 px-2 py-1">
                      {place.tag}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl lg:text-3xl text-forest mb-2">{place.name}</h3>
                    <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">{place.blurb}</p>
                    <div className="flex items-start gap-2 text-forest/80">
                      <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-gold" />
                      <div className="font-sans text-xs leading-relaxed">
                        <p>{place.address}</p>
                        <p className={getLocation(place.slug)?.temporarilyClosed ? "text-gold font-semibold" : "text-forest/50"}>
                          {getLocation(place.slug)?.temporarilyClosed
                            ? "Temporarily closed"
                            : liveHoursLine(place.slug) || place.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE CURATE */}
        <section className="py-10 lg:py-16 bg-sand relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[20rem] lg:w-[34rem] opacity-[0.04] pointer-events-none translate-x-1/4 translate-y-1/4">
            <img src={stampGreen} alt="" className="w-full h-full" />
          </div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
                  Our Standard
                </span>
                <h2 className="font-serif text-4xl lg:text-5xl leading-[1.05] mb-6">
                  We taste <span className="font-script text-gold text-[1.2em] leading-none">everything.</span>
                </h2>
                <div className="space-y-4 font-sans text-base lg:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Around 500 bottles make our shelves. Plenty more never do. If it tastes like flat juice, drowns in sugar, or tries too hard, it doesn't earn a spot.
                  </p>
                  <p>
                    Everything we carry is something we'd actually pour ourselves. That's the whole bar: would we drink it on a Friday and still feel great on Monday?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:gap-6 mt-10 lg:mt-0">
                <div className="bg-cream border-2 border-forest p-6 lg:p-8 text-center">
                  <div className="font-serif text-4xl lg:text-6xl font-bold text-forest mb-1">500+</div>
                  <div className="font-sans text-[10px] lg:text-xs uppercase tracking-[0.15em] text-muted-foreground">On the shelf</div>
                </div>
                <div className="bg-cream border-2 border-forest p-6 lg:p-8 text-center">
                  <div className="font-serif text-4xl lg:text-6xl font-bold text-forest mb-1">0</div>
                  <div className="font-sans text-[10px] lg:text-xs uppercase tracking-[0.15em] text-muted-foreground">Compromises</div>
                </div>
                <div className="bg-forest text-cream p-6 lg:p-8 text-center col-span-2">
                  <div className="font-serif text-2xl lg:text-3xl text-gold mb-1">Try before you buy</div>
                  <div className="font-sans text-[10px] lg:text-xs uppercase tracking-[0.15em] text-cream/60">Always, on every bottle</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRESS */}
        <section className="py-8 lg:py-12 relative overflow-hidden border-y border-forest/10">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <p className="text-center font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-forest/40 mb-6">
              As Featured In
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 lg:gap-x-14">
              {press.map((p) => (
                <a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-lg lg:text-2xl text-forest/55 hover:text-forest transition-colors"
                >
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* MEET THE TEAM */}
        <section className="py-10 lg:py-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: `url(${textureCream})`, backgroundSize: 'cover' }}
          />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-sans text-[10px] lg:text-xs font-bold uppercase tracking-[0.3em] text-gold mb-4 block">
                The Team
              </span>
              <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] mb-5">
                The people helping you drink <span className="font-script text-gold text-[1.2em] leading-none">differently.</span>
              </h2>
              <p className="font-sans text-base lg:text-lg text-muted-foreground leading-relaxed">
                We're not all alcohol-free. Some of us are sober, some are damp, all of us are here to help you drink differently and actually love it. From the shop floor to the brewhouse, this is the crew making sure the alcohol-free option is the best one in the room.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-10 lg:gap-x-14 mt-12 lg:mt-16">
              {team.map((member) => (
                <div key={member.name} className="w-40 lg:w-48 text-center">
                  <div className="mx-auto mb-4 w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-gold border-2 border-forest overflow-hidden flex items-center justify-center shadow-card">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={`${member.name}, ${member.title} at Monday Morning`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top"
                      />
                    ) : (
                      <span className="font-serif text-3xl lg:text-4xl text-forest leading-none">
                        {initials(member.name)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl lg:text-2xl text-forest leading-tight">{member.name}</h3>
                  <p className="font-sans text-[11px] lg:text-xs font-bold uppercase tracking-[0.15em] text-gold mt-1.5">
                    {member.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOFT CTA */}
        <section className="py-12 lg:py-16 bg-gold relative overflow-hidden">
          <div className="grain absolute inset-0 pointer-events-none opacity-30" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-serif text-4xl lg:text-6xl leading-[1.02] text-forest mb-5">
                Come <span className="font-script text-forest-deep text-[1.15em] leading-none">say hi.</span>
              </h2>
              <p className="font-sans text-lg text-forest/80 mb-8">
                Pacific Beach or Ocean Beach, Tuesday through Sunday. Pull up, taste a few things, leave with something good.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/locations">
                  <Button
                    size="lg"
                    className="font-sans text-sm font-bold uppercase tracking-widest bg-forest text-cream hover:bg-forest-deep px-8 py-6 group"
                  >
                    Find Us
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/collections/all">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-sans text-sm font-bold uppercase tracking-widest border-2 border-forest text-forest hover:bg-forest hover:text-cream px-8 py-6"
                  >
                    Shop Online
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
