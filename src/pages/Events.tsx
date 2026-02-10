import { CalendarDays, MapPin, Clock, ArrowUpRight, Martini } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";
import stampGold from "@/assets/stamp-gold.svg";
import textureBlue from "@/assets/texture-blue.svg";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  ticketUrl: string;
  image: string;
  isFeatured?: boolean;
  tag?: string;
}

const events: Event[] = [
  {
    id: "valentines-2026",
    title: "Sips & Sweethearts — Valentine's Experience",
    date: "February 14, 2026",
    time: "6:00 PM – 9:00 PM",
    location: "Monday Morning — Pacific Beach",
    description: "An intimate evening of curated NA wine pairings, chocolate tastings, and live acoustic music. The perfect date night without the hangover.",
    ticketUrl: "https://www.eventbrite.com/e/san-diego-valentines-day-experience-sips-sweethearts-tickets-1982235825715?aff=oddtdtcreator",
    image: "https://images.unsplash.com/photo-1516594798947-e65505dbb29d?w=1200&q=80",
    isFeatured: true,
    tag: "Date Night",
  },
  {
    id: "tasting-tuesday",
    title: "Tasting Tuesday — NA Beer Flight Night",
    date: "Every Tuesday",
    time: "5:00 PM – 8:00 PM",
    location: "Monday Morning — Pacific Beach",
    description: "Sample 4 rotating NA craft beers with guided tasting notes. Free to attend, flights available for purchase.",
    ticketUrl: "#",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80",
    tag: "Weekly",
  },
  {
    id: "mocktail-masterclass",
    title: "Mocktail Masterclass",
    date: "February 22, 2026",
    time: "2:00 PM – 4:00 PM",
    location: "Monday Morning — Pacific Beach",
    description: "Learn to craft 3 signature NA cocktails with our head bartender. All ingredients and recipes included.",
    ticketUrl: "#",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80",
    tag: "Workshop",
  },
  {
    id: "sunset-social",
    title: "Sunset Social — Rooftop Mixer",
    date: "March 1, 2026",
    time: "5:00 PM – 8:00 PM",
    location: "Monday Morning — Ocean Beach",
    description: "Mingle with the sober-curious community over sunset views and complimentary NA sparkling wine. DJ set by local artists.",
    ticketUrl: "#",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tag: "Social",
  },
  {
    id: "wellness-morning",
    title: "Wellness Wednesday — Morning Elixirs",
    date: "Every Wednesday",
    time: "7:00 AM – 9:00 AM",
    location: "Monday Morning — Pacific Beach",
    description: "Start your day with adaptogenic lattes, functional tonics, and a 30-min guided breathwork session.",
    ticketUrl: "#",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    tag: "Wellness",
  },
];

const tagColors: Record<string, string> = {
  "Date Night": "bg-accent text-accent-foreground",
  "Weekly": "bg-ocean text-cream",
  "Workshop": "bg-gold text-forest",
  "Social": "bg-forest text-cream",
  "Wellness": "bg-forest-light text-cream",
};

const EventCard = ({ event }: { event: Event }) => (
  <div className="group relative bg-card border-2 border-foreground overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_hsl(var(--foreground))]">
    {/* Image */}
    <div className="relative h-56 overflow-hidden">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
      {event.tag && (
        <span className={`absolute top-4 left-4 px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider ${tagColors[event.tag] || "bg-primary text-primary-foreground"}`}>
          {event.tag}
        </span>
      )}
    </div>

    {/* Content */}
    <div className="p-6 space-y-4">
      <h3 className="font-serif text-xl text-foreground leading-tight">{event.title}</h3>
      
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CalendarDays className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="font-sans text-sm">{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="font-sans text-sm">{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="font-sans text-sm">{event.location}</span>
        </div>
      </div>

      <p className="font-sans text-sm text-muted-foreground leading-relaxed line-clamp-3">
        {event.description}
      </p>

      <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
        <Button className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground border-2 border-foreground font-sans text-xs font-bold uppercase tracking-wider group/btn">
          Get Tickets
          <ArrowUpRight className="h-4 w-4 ml-2 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </Button>
      </a>
    </div>
  </div>
);

const Events = () => {
  const featured = events.find((e) => e.isFeatured);
  const upcoming = events.filter((e) => !e.isFeatured);

  return (
    <>
      <SEO
        title="Events — Monday Morning"
        description="Join us for tastings, workshops, and social events at Monday Morning. Discover the alcohol-free lifestyle in San Diego."
        path="/events"
      />
      <Header />

      {/* Hero — Featured Event */}
      {featured && (
        <section className="relative min-h-[85vh] flex items-end overflow-hidden">
          <img
            src={featured.image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
          
          {/* Stamp watermark */}
          <img
            src={stampGold}
            alt=""
            className="absolute top-24 right-8 lg:right-16 w-24 lg:w-36 opacity-20 pointer-events-none"
          />

          <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-16 lg:pb-24">
            <div className="max-w-2xl space-y-6">
              {featured.tag && (
                <span className={`inline-block px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest ${tagColors[featured.tag] || "bg-primary text-primary-foreground"}`}>
                  {featured.tag}
                </span>
              )}
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-gold">
                Featured Event
              </p>
              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-cream leading-[0.95]">
                {featured.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-cream/80">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-gold" />
                  <span className="font-sans text-sm">{featured.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gold" />
                  <span className="font-sans text-sm">{featured.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gold" />
                  <span className="font-sans text-sm">{featured.location}</span>
                </div>
              </div>
              <p className="font-sans text-base text-cream/70 leading-relaxed max-w-lg">
                {featured.description}
              </p>
              <a href={featured.ticketUrl} target="_blank" rel="noopener noreferrer">
                <Button className="bg-gold text-forest hover:bg-cream hover:text-forest border-2 border-gold font-sans text-sm font-bold uppercase tracking-wider px-8 py-6">
                  Get Tickets
                  <ArrowUpRight className="h-5 w-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events Grid */}
      <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
        {/* Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url(${textureBlue})`, backgroundSize: "cover" }}
        />

        <div className="relative container mx-auto px-4 lg:px-8">
          {/* Section header */}
          <div className="flex items-end justify-between mb-12 lg:mb-16">
            <div className="space-y-3">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary">
                What's Coming Up
              </p>
              <h2 className="font-serif text-3xl md:text-5xl text-foreground">
                Upcoming Events
              </h2>
            </div>
            <Martini className="hidden md:block h-12 w-12 text-primary/20" />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 lg:mt-24 text-center border-t-2 border-foreground/10 pt-12">
            <p className="font-sans text-sm text-muted-foreground mb-4">
              Want to host a private event or partner with us?
            </p>
            <a href="/locations">
              <Button variant="outline" className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-sans text-xs font-bold uppercase tracking-wider px-8">
                Get in Touch
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Events;
