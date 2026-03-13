import { ExternalLink, Tv, Newspaper, Globe, Podcast, BookOpen, Play } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import pressHero from "@/assets/lifestyle/press-hero.jpg";

interface PressItem {
  outlet: string;
  title: string;
  date: string;
  url: string;
  type: "tv" | "newspaper" | "national" | "podcast" | "blog";
}

const tvFeatures: PressItem[] = [
  {
    outlet: "CBS 8",
    title: "Non-Alcoholic Bottle Shop Aids 'Dry January' Participants in San Diego",
    date: "Jan 5, 2025",
    url: "https://www.cbs8.com/article/news/local/non-alcoholic-bottle-shop-aids-dry-january-participants-in-san-diego/509-466a9201-d527-485b-bdbf-01674b7ce3db",
    type: "tv",
  },
  {
    outlet: "FOX 5 San Diego",
    title: "Alcohol free bottle shop, lounge welcomes guests in Ocean Beach",
    date: "Jan 8, 2026",
    url: "https://fox5sandiego.com/news/local-news/alcohol-free-bottle-shop-lounge-welcomes-guests-in-ocean-beach/",
    type: "tv",
  },
  {
    outlet: "KUSI News",
    title: "Monday Morning Bottle Shop on KUSI's Good Business San Diego",
    date: "Dec 17, 2024",
    url: "https://www.youtube.com/watch?v=eplcMcJF2vg",
    type: "tv",
  },
];

const newspaperFeatures: PressItem[] = [
  {
    outlet: "San Diego Union-Tribune",
    title: "On the Menu: Monday Morning Bottle Shop offers spirits, without the alcohol, in Pacific Beach",
    date: "Aug 5, 2025",
    url: "https://www.sandiegouniontribune.com/2025/08/05/on-the-menu-monday-morning-bottle-shop/",
    type: "newspaper",
  },
  {
    outlet: "Times of San Diego",
    title: "Monday Morning Bottle Shop serves non-alcoholic wines, cocktails",
    date: "Jan 6, 2026",
    url: "https://timesofsandiego.com/business/2026/01/06/monday-morning-bottle-shop/",
    type: "newspaper",
  },
  {
    outlet: "San Diego Business Journal",
    title: "Nonalcoholic Bottle Shop Scales Operations",
    date: "Feb 6, 2026",
    url: "https://www.sdbj.com/news/2026/feb/06/nonalcoholic-bottle-shop-scales-operations/",
    type: "newspaper",
  },
  {
    outlet: "SanDiegoVille",
    title: "Monday Morning Non-Alcoholic Bottle Shop To Open Second San Diego Location",
    date: "Dec 27, 2025",
    url: "https://www.sandiegoville.com/2025/12/monday-morning-non-alcoholic-bottle-shop-second-location.html",
    type: "newspaper",
  },
];

const nationalFeatures: PressItem[] = [
  {
    outlet: "Associated Press",
    title: "Nonalcoholic beer and mocktails can help people stay sober or drink less, but are not for everyone",
    date: "Aug 27, 2025",
    url: "https://apnews.com/article/nonalcoholic-beer-mocktails-sober-curious",
    type: "national",
  },
  {
    outlet: "EIN Presswire",
    title: "Monday Morning Bottle Shop Unveils Chic Lounge as Its Non-Alcohol Sales Explode 400%",
    date: "Jun 12, 2025",
    url: "https://www.einpresswire.com/article/monday-morning-bottle-shop-lounge-non-alcohol-sales",
    type: "national",
  },
];

const podcastFeatures: PressItem[] = [
  {
    outlet: "Thriving Alcohol-Free with Mocktail Mom",
    title: "EP 123: From Alcohol to Entrepreneurship, Zane's Journey to Founding Monday Morning Bottle Shop",
    date: "2025",
    url: "https://open.spotify.com/episode/6hfy6jsCjKN2rTlYcsQYsI",
    type: "podcast",
  },
];

const blogFeatures: PressItem[] = [
  {
    outlet: "LocallyWell",
    title: "From PB To OB: San Diego's First Non-Alcoholic Bottle Shop Is Expanding",
    date: "Dec 29, 2025",
    url: "https://locallywell.com/san-diego-non-alcoholic-bottle-shop-expanding/",
    type: "blog",
  },
  {
    outlet: "NA Beer Club",
    title: "Monday Morning Bottle Shop Expands San Diego Footprint",
    date: "Jan 14, 2026",
    url: "https://nabeerclub.com/monday-morning-bottle-shop-san-diego/",
    type: "blog",
  },
  {
    outlet: "San Diego Brewers Guild",
    title: "Monday Morning - Bottle Shop",
    date: "",
    url: "https://sdbeer.com/monday-morning-bottle-shop/",
    type: "blog",
  },
];

const iconMap = {
  tv: Tv,
  newspaper: Newspaper,
  national: Globe,
  podcast: Podcast,
  blog: BookOpen,
};

const PressCard = ({ item }: { item: PressItem }) => {
  const Icon = iconMap[item.type];
  
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-cream/50 border border-sand/60 p-6 lg:p-8 hover:border-gold/40 hover:bg-cream transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3">
            <Icon className="w-4 h-4 text-gold flex-shrink-0" />
            <span className="font-sans text-xs uppercase tracking-[0.15em] text-forest-light font-semibold">
              {item.outlet}
            </span>
            {item.date && (
              <>
                <span className="text-sand-dark">·</span>
                <span className="font-sans text-xs text-muted-foreground">{item.date}</span>
              </>
            )}
          </div>
          <h3 className="font-serif text-lg lg:text-xl text-forest leading-snug group-hover:text-gold transition-colors duration-300">
            {item.title}
          </h3>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors flex-shrink-0 mt-1" />
      </div>
    </a>
  );
};

const SectionHeader = ({ icon: Icon, title, count }: { icon: React.ElementType; title: string; count: number }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className="w-10 h-10 bg-forest flex items-center justify-center">
      <Icon className="w-5 h-5 text-cream" />
    </div>
    <div>
      <h2 className="font-serif text-2xl lg:text-3xl text-forest">{title}</h2>
      <p className="font-sans text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">
        {count} {count === 1 ? "feature" : "features"}
      </p>
    </div>
  </div>
);

const Press = () => {
  const totalMentions = tvFeatures.length + newspaperFeatures.length + nationalFeatures.length + podcastFeatures.length + blogFeatures.length;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Press & Media | Monday Morning Bottle Shop",
    "description": "Media coverage and press mentions for Monday Morning Bottle Shop, San Diego's premier non alcoholic beverage destination.",
    "url": "https://mondaymorning-af.com/press",
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Press & Media"
        description="Read what CBS 8, FOX 5, the San Diego Union-Tribune, Associated Press, and more are saying about Monday Morning Bottle Shop, San Diego's premier non alcoholic beverage destination."
        path="/press"
        schema={schema}
      />

      <Header />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={pressHero} alt="Press and media coverage" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-forest-deep/75" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold mb-4">
            In the News
          </p>
          <h1 className="font-serif text-5xl lg:text-7xl text-cream mb-6">
            Press & Media
          </h1>
          <p className="font-sans text-lg text-cream/80 max-w-xl mx-auto leading-relaxed">
            {totalMentions} features across TV, print, podcasts, and digital media covering San Diego's non alcoholic movement.
          </p>
        </div>
      </section>

      {/* Featured Logos Bar */}
      <section className="bg-forest py-6 border-b border-forest-light/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {["Associated Press", "CBS 8", "FOX 5", "KUSI", "San Diego Union-Tribune", "SD Business Journal"].map((name) => (
              <span key={name} className="font-serif text-sm lg:text-base text-cream/60 italic whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 space-y-20">
        {/* TV & Video */}
        <section>
          <SectionHeader icon={Tv} title="TV & Video Features" count={tvFeatures.length} />
          <div className="space-y-4">
            {tvFeatures.map((item, i) => (
              <PressCard key={i} item={item} />
            ))}
          </div>
        </section>

        {/* National */}
        <section>
          <SectionHeader icon={Globe} title="National & Wire Service" count={nationalFeatures.length} />
          <div className="space-y-4">
            {nationalFeatures.map((item, i) => (
              <PressCard key={i} item={item} />
            ))}
          </div>
          <p className="font-sans text-sm text-muted-foreground mt-4 italic">
            The EIN Presswire release was syndicated to various local news sites, including FOX 2 Now (St. Louis) and CBS 17 (Raleigh).
          </p>
        </section>

        {/* Newspapers */}
        <section>
          <SectionHeader icon={Newspaper} title="Newspapers & Online News" count={newspaperFeatures.length} />
          <div className="space-y-4">
            {newspaperFeatures.map((item, i) => (
              <PressCard key={i} item={item} />
            ))}
          </div>
        </section>

        {/* Podcasts */}
        <section>
          <SectionHeader icon={Podcast} title="Podcasts" count={podcastFeatures.length} />
          <div className="space-y-4">
            {podcastFeatures.map((item, i) => (
              <PressCard key={i} item={item} />
            ))}
          </div>
          {/* Spotify Embed */}
          <div className="mt-6 max-w-xl">
            <iframe
              src="https://open.spotify.com/embed/episode/6hfy6jsCjKN2rTlYcsQYsI?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-lg"
              title="Monday Morning Bottle Shop podcast episode"
            />
          </div>
        </section>

        {/* Blogs */}
        <section>
          <SectionHeader icon={BookOpen} title="Blogs & Online Publications" count={blogFeatures.length} />
          <div className="space-y-4">
            {blogFeatures.map((item, i) => (
              <PressCard key={i} item={item} />
            ))}
          </div>
        </section>

        {/* Press Contact CTA */}
        <section className="bg-forest text-cream p-10 lg:p-16 text-center">
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-gold mb-4">Media Inquiries</p>
          <h2 className="font-serif text-3xl lg:text-4xl mb-4">Want to feature Monday Morning?</h2>
          <p className="font-sans text-cream/70 max-w-lg mx-auto mb-8 leading-relaxed">
            We love sharing our story. Reach out for interviews, product samples, or press kits.
          </p>
          <a
            href="mailto:hello@mondaymorning-af.com?subject=Press Inquiry"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-forest font-sans text-sm uppercase tracking-wider px-8 py-4 transition-colors"
          >
            Get in Touch
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
