import { useEffect, useMemo, useState } from "react";
import { CalendarDays, MapPin, Clock, ChevronLeft, ChevronRight, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/SEO";

const EVENTS_API = "https://crm.mondaymorning.info/api/public/events";
const EVENTS_ICS = "https://crm.mondaymorning.info/api/public/events.ics";

interface CrmEvent {
  id: string;
  title: string;
  event_type: string | null;
  location: string | null;
  event_date: string | null;
  start_time: string | null;
  end_time: string | null;
  all_day: boolean | null;
}

const TYPE_LABELS: Record<string, string> = {
  private: "Private event",
  tasting: "Tasting",
  popup: "Pop-up",
  release: "Release",
  tour: "Tour",
  market: "Market",
  class: "Class",
  meeting: "Meeting",
};

const typeLabel = (t: string | null) => (t ? TYPE_LABELS[t] || t : "");

// "17:00" -> "5pm", "17:30" -> "5:30pm"
const formatTime = (t: string | null) => {
  if (!t) return "";
  const [hRaw, mRaw] = t.split(":");
  const h = Number(hRaw);
  const m = Number(mRaw ?? 0);
  if (Number.isNaN(h)) return "";
  const suffix = h >= 12 ? "pm" : "am";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour12}:${String(m).padStart(2, "0")}${suffix}` : `${hour12}${suffix}`;
};

const timeLabel = (e: CrmEvent) => {
  if (e.all_day) return "All day";
  const start = formatTime(e.start_time);
  if (!start) return "";
  const end = formatTime(e.end_time);
  return end ? `${start} to ${end}` : start;
};

// Parse "YYYY-MM-DD" as a local date so the grid never shifts a day.
const parseDate = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return new Date(y, (m || 1) - 1, day || 1);
};

const formatDay = (d: string) =>
  parseDate(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const Events = () => {
  const [events, setEvents] = useState<CrmEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));

  useEffect(() => {
    let active = true;
    fetch(EVENTS_API)
      .then((r) => (r.ok ? r.json() : { events: [] }))
      .then((data) => {
        if (!active) return;
        setEvents(Array.isArray(data?.events) ? data.events : []);
      })
      .catch(() => active && setEvents([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const byDate = useMemo(() => {
    const map: Record<string, CrmEvent[]> = {};
    events
      .filter((e) => !!e.event_date)
      .forEach((e) => {
        const key = e.event_date as string;
        (map[key] ||= []).push(e);
      });
    Object.values(map).forEach((list) =>
      list.sort((a, b) => (a.start_time || "").localeCompare(b.start_time || "")),
    );
    return map;
  }, [events]);

  const upcoming = useMemo(() => {
    const todayKey = toKey(today);
    return events
      .filter((e) => !e.event_date || (e.event_date as string) >= todayKey)
      .sort((a, b) =>
        `${a.event_date || "9999"}${a.start_time || ""}`.localeCompare(`${b.event_date || "9999"}${b.start_time || ""}`),
      );
  }, [events, today]);

  // Build the month grid (leading blanks + days).
  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const out: (Date | null)[] = Array.from({ length: first.getDay() }, () => null);
    for (let d = 1; d <= daysInMonth; d++) out.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    while (out.length % 7 !== 0) out.push(null);
    return out;
  }, [cursor]);

  const shiftMonth = (delta: number) =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + delta, 1));

  return (
    <>
      <SEO
        title="Events"
        description="Tastings, pop-ups, releases, and gatherings across Monday Morning in Pacific Beach, Ocean Beach, and The Lab."
        path="/events"
      />
      <Header forceSolid />

      <main id="main" className="bg-background pt-28 lg:pt-32">
        {/* Page header */}
        <section className="container mx-auto px-4 lg:px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary">
                What's Happening
              </p>
              <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-[0.95]">Events</h1>
              <p className="font-sans text-sm md:text-base text-muted-foreground max-w-xl">
                What's happening across Monday Morning, Pacific Beach, Ocean Beach, and The Lab.
              </p>
            </div>
            <a href={EVENTS_ICS} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button className="bg-gold text-forest hover:bg-forest hover:text-cream border-2 border-forest font-sans text-xs font-bold uppercase tracking-wider px-6 py-5">
                <CalendarPlus className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </a>
          </div>
          <p className="font-sans text-xs text-muted-foreground mt-3">
            Add to Google, Apple, or Outlook calendar.
          </p>
        </section>

        {/* Calendar */}
        <section className="container mx-auto px-4 lg:px-8 pb-12">
          <div className="border-2 border-foreground bg-card">
            <div className="flex items-center justify-between border-b-2 border-foreground px-4 py-3">
              <button
                type="button"
                aria-label="Previous month"
                onClick={() => shiftMonth(-1)}
                className="p-2 border-2 border-foreground hover:bg-forest hover:text-cream transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <h2 className="font-serif text-xl md:text-2xl text-foreground">
                {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
              </h2>
              <button
                type="button"
                aria-label="Next month"
                onClick={() => shiftMonth(1)}
                className="p-2 border-2 border-foreground hover:bg-forest hover:text-cream transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-7 border-b-2 border-foreground/20">
              {WEEKDAYS.map((d) => (
                <div
                  key={d}
                  className="py-2 text-center font-sans text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {cells.map((date, i) => {
                const key = date ? toKey(date) : `blank-${i}`;
                const dayEvents = date ? byDate[toKey(date)] || [] : [];
                const isToday = date && toKey(date) === toKey(today);
                return (
                  <div
                    key={key}
                    className={`min-h-[74px] md:min-h-[110px] border-r border-b border-foreground/15 p-1.5 ${
                      date ? "" : "bg-muted/30"
                    }`}
                  >
                    {date && (
                      <>
                        <span
                          className={`inline-flex items-center justify-center font-sans text-[11px] md:text-xs font-bold w-6 h-6 mb-1 ${
                            isToday ? "bg-forest text-cream" : "text-foreground"
                          }`}
                        >
                          {date.getDate()}
                        </span>
                        <div className="space-y-1">
                          {dayEvents.map((e) => (
                            <div
                              key={e.id}
                              title={e.title}
                              className="bg-gold/25 border-l-2 border-gold px-1 py-0.5 font-sans text-[10px] md:text-[11px] leading-tight text-foreground truncate"
                            >
                              {!e.all_day && formatTime(e.start_time) ? (
                                <span className="font-bold">{formatTime(e.start_time)} </span>
                              ) : null}
                              {e.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upcoming list */}
        <section className="container mx-auto px-4 lg:px-8 pb-20 lg:pb-28">
          <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-6">Upcoming</h2>

          {loading ? (
            <p className="font-sans text-sm text-muted-foreground">Loading events...</p>
          ) : upcoming.length === 0 ? (
            <div className="border-2 border-dashed border-foreground/30 p-10 text-center">
              <p className="font-sans text-sm text-muted-foreground">
                No upcoming events right now, check back soon.
              </p>
            </div>
          ) : (
            <ul className="divide-y-2 divide-foreground/10 border-y-2 border-foreground/10">
              {upcoming.map((e) => (
                <li key={e.id} className="py-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                  <div className="md:w-40 shrink-0">
                    <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary">
                      {e.event_date ? formatDay(e.event_date) : "Date TBA"}
                    </span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-serif text-lg md:text-xl text-foreground leading-tight">{e.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-muted-foreground">
                      {timeLabel(e) && (
                        <span className="inline-flex items-center gap-1.5 font-sans text-sm">
                          <Clock className="h-3.5 w-3.5 text-gold" />
                          {timeLabel(e)}
                        </span>
                      )}
                      {e.location && (
                        <span className="inline-flex items-center gap-1.5 font-sans text-sm">
                          <MapPin className="h-3.5 w-3.5 text-gold" />
                          {e.location}
                        </span>
                      )}
                    </div>
                  </div>
                  {typeLabel(e.event_type) && (
                    <span className="self-start md:self-center px-3 py-1 bg-forest text-cream font-sans text-[10px] font-bold uppercase tracking-wider">
                      {typeLabel(e.event_type)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary/40" />
            <a href={EVENTS_ICS} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-sans text-xs font-bold uppercase tracking-wider"
              >
                Subscribe to the calendar
              </Button>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Events;
