import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarPlus } from "lucide-react";
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

const TYPE_META: Record<string, { icon: string; label: string }> = {
  live_music: { icon: "🎵", label: "Live music" },
  tasting: { icon: "🥂", label: "Tasting" },
  private: { icon: "🎉", label: "Private event" },
  popup: { icon: "🛍️", label: "Pop-up" },
  release: { icon: "🍾", label: "Release" },
  tour: { icon: "🚶", label: "Tour" },
  market: { icon: "🎪", label: "Market" },
  class: { icon: "📖", label: "Class" },
  meeting: { icon: "📅", label: "Meeting" },
};

const typeMeta = (t: string | null) =>
  (t && TYPE_META[t.toLowerCase().trim()]) || { icon: "✦", label: "Event" };

const LOCATIONS = [
  { key: "lab", label: "The Lab", color: "#48A3AA", match: (l: string) => l.trim().toLowerCase() === "the lab" },
  { key: "pb", label: "PB", color: "#E2A325", match: (l: string) => l.trim().toLowerCase() === "pb" },
  { key: "ob", label: "OB", color: "#4E7A52", match: (l: string) => l.trim().toLowerCase() === "ob" },
  { key: "offsite", label: "Offsite", color: "#7C6BA0", match: (l: string) => l.trim().toLowerCase() === "offsite" },
];

const NEUTRAL = "#8A857B";
const OFFSITE_COLOR = LOCATIONS.find((l) => l.key === "offsite")!.color;

// Our three shops get their brand color; any other named venue (festivals,
// tastings elsewhere) is treated as Offsite (purple) so it reads consistently.
const locationColor = (loc: string | null) => {
  if (!loc) return NEUTRAL;
  return LOCATIONS.find((x) => x.match(loc))?.color ?? OFFSITE_COLOR;
};

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

const formatTimeRange = (start: string | null, end: string | null) => {
  if (!start) return "";
  const startText = formatTime(start);
  if (!end) return startText;

  const [startH, startM] = start.split(":").map(Number);
  const [endH, endM] = end.split(":").map(Number);
  if (Number.isNaN(startH) || Number.isNaN(endH)) return startText;

  const startPeriod = startH >= 12 ? "pm" : "am";
  const endPeriod = endH >= 12 ? "pm" : "am";
  const startHour = startH % 12 === 0 ? 12 : startH % 12;
  const endHour = endH % 12 === 0 ? 12 : endH % 12;
  const startMin = startM ? `:${String(startM).padStart(2, "0")}` : "";
  const endMin = endM ? `:${String(endM).padStart(2, "0")}` : "";

  if (startPeriod === endPeriod) {
    return `${startHour}${startMin}-${endHour}${endMin}${endPeriod}`;
  }
  return `${startHour}${startMin}${startPeriod}-${endHour}${endMin}${endPeriod}`;
};

const timeLabel = (e: CrmEvent) => {
  if (e.all_day) return "All day";
  return formatTimeRange(e.start_time, e.end_time);
};

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

  const pill =
    "inline-flex items-center justify-center rounded-full border border-[#E7E1D5] bg-background px-3 py-1.5 font-sans text-xs font-semibold text-foreground transition-colors hover:bg-[#F7F1E4]";

  return (
    <>
      <SEO
        title="Events"
        description="Tastings, pop-ups, live music, releases, and gatherings across Monday Morning in Pacific Beach, Ocean Beach, and The Lab."
        path="/events"
      />
      <Header forceSolid />

      <main id="main" className="bg-background pt-28 lg:pt-32">
        {/* Page header */}
        <section className="container mx-auto px-4 lg:px-8 pb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-primary">
                What's Happening
              </p>
              <h1 className="font-serif text-4xl md:text-6xl text-foreground leading-[1.05]">Events</h1>
              <p className="font-sans text-sm md:text-base text-muted-foreground max-w-xl">
                What's happening across Monday Morning, Pacific Beach, Ocean Beach, and The Lab.
              </p>
            </div>
            <div className="shrink-0 space-y-2">
              <a href={EVENTS_ICS} target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-gold text-forest hover:bg-forest hover:text-cream font-sans text-xs font-bold uppercase tracking-wider px-6 py-5">
                  <CalendarPlus className="h-4 w-4 mr-2" />
                  Subscribe
                </Button>
              </a>
              <p className="font-sans text-xs text-muted-foreground">
                Add to Google, Apple, or Outlook calendar.
              </p>
            </div>
          </div>
        </section>

        {/* Calendar */}
        <section className="container mx-auto px-4 lg:px-8 pb-16">
          <div className="rounded-2xl border border-[#E7E1D5] bg-card p-4 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <button type="button" aria-label="Previous month" onClick={() => shiftMonth(-1)} className={`${pill} h-8 w-8 px-0`}>
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="text-center">
                <h2 className="font-serif text-xl md:text-3xl text-foreground">
                  {MONTHS[cursor.getMonth()]} {cursor.getFullYear()}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}
                  className={pill}
                >
                  Today
                </button>
                <button type="button" aria-label="Next month" onClick={() => shiftMonth(1)} className={`${pill} h-8 w-8 px-0`}>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
              {LOCATIONS.map((l) => (
                <span key={l.key} className="inline-flex items-center gap-2 font-sans text-[11px] text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-7 gap-1.5 md:gap-2">
              {WEEKDAYS.map((d) => (
                <div
                  key={d}
                  className="pb-2 text-center font-sans text-[10px] md:text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {d}
                </div>
              ))}

              {cells.map((date, i) => {
                const key = date ? toKey(date) : `blank-${i}`;
                const dayEvents = date ? byDate[toKey(date)] || [] : [];
                const isToday = date && toKey(date) === toKey(today);
                if (!date) return <div key={key} className="min-h-[80px] md:min-h-[118px]" />;
                return (
                  <div
                    key={key}
                    className={`min-h-[80px] md:min-h-[118px] rounded-[10px] p-1.5 md:p-2 transition-colors ${
                      isToday ? "bg-gold/10 ring-1 ring-gold/40" : "hover:bg-[#FAF5EA]"
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center font-sans text-[11px] md:text-xs font-semibold w-6 h-6 mb-1 rounded-full ${
                        isToday ? "bg-gold text-forest" : "text-muted-foreground"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                    <div className="space-y-1">
                      {dayEvents.map((e) => {
                        const color = locationColor(e.location);
                        const meta = typeMeta(e.event_type);
                        return (
                          <div
                            key={e.id}
                            title={`${meta.label}: ${e.title}${e.location ? ` at ${e.location}` : ""}`}
                            className="rounded-md px-1.5 py-0.5 font-sans text-[10px] md:text-[11px] leading-tight truncate"
                            style={{ backgroundColor: `${color}26`, color: "hsl(var(--foreground))" }}
                          >
                            {e.all_day ? (
                              <span className="font-semibold">All day </span>
                            ) : formatTimeRange(e.start_time, e.end_time) ? (
                              <span className="font-semibold">{formatTimeRange(e.start_time, e.end_time)} </span>
                            ) : null}
                            <span className="mr-1">{meta.icon}</span>
                            {e.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upcoming list */}
        <section className="container mx-auto px-4 lg:px-8 pb-20 lg:pb-28">
          <h2 className="font-serif text-2xl md:text-4xl text-foreground mb-8">Upcoming</h2>

          {loading ? (
            <p className="font-sans text-sm text-muted-foreground">Loading events...</p>
          ) : upcoming.length === 0 ? (
            <div className="rounded-2xl border border-[#E7E1D5] p-12 text-center">
              <p className="font-sans text-sm text-muted-foreground">
                No upcoming events right now, check back soon.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((e) => {
                const color = locationColor(e.location);
                const meta = typeMeta(e.event_type);
                const bits = [
                  e.event_date ? formatDay(e.event_date) : "Date TBA",
                  timeLabel(e),
                  meta.label,
                  e.location || "",
                ].filter(Boolean);
                return (
                  <li
                    key={e.id}
                    className="rounded-2xl border border-[#E7E1D5] bg-card px-5 py-4 flex items-start gap-4 transition-colors hover:bg-[#FAF5EA]"
                  >
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                    <div className="min-w-0 space-y-1">
                      <h3 className="font-serif text-lg md:text-xl text-foreground leading-tight">
                        <span className="mr-2">{meta.icon}</span>
                        {e.title}
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground">{bits.join(" · ")}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-10">
            <a href={EVENTS_ICS} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="rounded-full border-forest text-forest hover:bg-forest hover:text-cream font-sans text-xs font-bold uppercase tracking-wider px-6"
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
