import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { addHours, format } from "date-fns";
import { ArrowRight, CalendarPlus, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { FilterTabs } from "@/components/filter-tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import heroImg from "@/assets/venue-events.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events - Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Tournaments, dinners and members' events at the Mauritius Gymkhana Club, Vacoas. Add any fixture straight to your calendar.",
      },
      { property: "og:title", content: "Events at Mauritius Gymkhana Club" },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: EventsPage,
});

type EventCategory = "Golf" | "Fitness" | "Football" | "Music" | "Other";

type ClubEvent = {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  description: string;
};

const EVENTS: ClubEvent[] = [
  {
    id: "monthly-medal-august",
    title: "Monthly Medal - August Stableford",
    category: "Golf",
    date: "2026-08-02",
    time: "07:00",
    location: "1st Tee, Suffolk Road course",
    description:
      "The club's monthly Stableford competition, open to all golfing members. Tee times from 07:00; sign up at the pro shop by the Friday before.",
  },
  {
    id: "sunset-yoga",
    title: "Sunset Yoga on the Lawn",
    category: "Fitness",
    date: "2026-08-15",
    time: "17:30",
    location: "Poolside lawn",
    description:
      "An outdoor yoga session led by the fitness centre's instructors as the light fades over the estate. Mats provided; all levels welcome.",
  },
  {
    id: "gymkhana-cup-football",
    title: "Gymkhana Cup - Football 7s",
    category: "Football",
    date: "2026-08-29",
    time: "09:00",
    location: "FootFive Pitch",
    description:
      "A round-robin 7-a-side tournament between member teams, followed by a braai at the Sport Bar. Teams of 8–10 players.",
  },
  {
    id: "live-jazz-veranda",
    title: "Live Jazz at the Veranda",
    category: "Music",
    date: "2026-09-12",
    time: "19:30",
    location: "The Veranda",
    description:
      "An evening of live jazz on the Veranda, with a set dinner menu from the Brasserie kitchen. Booking recommended.",
  },
  {
    id: "junior-tennis-roundrobin",
    title: "Junior Tennis Round-Robin",
    category: "Other",
    date: "2026-09-26",
    time: "08:30",
    location: "Grass courts",
    description:
      "A friendly round-robin for junior members across all age groups, closing the school-term coaching programme.",
  },
  {
    id: "agm-2026",
    title: "Annual General Meeting",
    category: "Other",
    date: "2026-10-17",
    time: "18:00",
    location: "Main Hall",
    description:
      "The Club's Annual General Meeting. All members in good standing are entitled to attend and vote; notice and agenda are circulated by post and email.",
  },
];

const CATEGORIES = ["All", "Golf", "Fitness", "Football", "Music", "Other"] as const;

function escapeICS(text: string) {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function downloadICS(event: ClubEvent) {
  const start = new Date(`${event.date}T${event.time}:00`);
  const end = addHours(start, 2);
  const fmt = (d: Date) => format(d, "yyyyMMdd'T'HHmmss");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mauritius Gymkhana Club//Events//EN",
    "BEGIN:VEVENT",
    `UID:${event.id}@mgc.mu`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${escapeICS(event.title)}`,
    `LOCATION:${escapeICS(event.location)}`,
    `DESCRIPTION:${escapeICS(event.description)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${event.id}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

function EventsPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<ClubEvent | null>(null);

  const sorted = useMemo(() => [...EVENTS].sort((a, b) => a.date.localeCompare(b.date)), []);
  const filtered = filter === "All" ? sorted : sorted.filter((e) => e.category === filter);

  return (
    <>
      <PageHero
        overline="Tournaments · Dinners · Members"
        title="Club events"
        intro="Competitive fixtures, social evenings and the club's landmark annual events - all in one calendar."
        image={heroImg}
        imageAlt="Event set-up at the Club"
      />

      <Section>
        <SectionHeading overline="What's on" title="Upcoming events" />

        <FilterTabs
          ariaLabel="Filter events by category"
          items={CATEGORIES.map((c) => ({ id: c, label: c }))}
          value={filter}
          onChange={setFilter}
          className="mb-10"
        />

        {filtered.length === 0 ? (
          <div className="p-6 border border-dashed border-pine/20 rounded-sm bg-pine/5 text-ink/60">
            No {filter} events on the calendar right now - check back soon.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map((e) => (
              <div key={e.id} className="p-6 bg-cream ring-1 ring-pine/10 rounded-sm flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-widest bg-gold/15 text-pine rounded-full">
                    {e.category}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-ink/50">
                    {format(new Date(`${e.date}T00:00:00`), "EEE d MMM yyyy")} · {e.time}
                  </span>
                </div>
                <h3 className="font-serif text-2xl text-pine mb-2">{e.title}</h3>
                <p className="inline-flex items-center gap-2 text-sm text-ink/60 mb-4">
                  <MapPin className="size-4 text-gold" /> {e.location}
                </p>
                <p className="text-sm text-ink/70 leading-relaxed mb-6 flex-1">{e.description}</p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActive(e)}
                    className="text-sm font-medium text-pine underline underline-offset-4 hover:text-gold"
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadICS(e)}
                    className="inline-flex items-center gap-2 text-sm font-medium text-pine underline underline-offset-4 hover:text-gold"
                  >
                    <CalendarPlus className="size-4" /> Add to calendar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-lg">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl text-pine">{active.title}</DialogTitle>
                <DialogDescription>
                  {format(new Date(`${active.date}T00:00:00`), "EEEE d MMMM yyyy")} · {active.time}{" "}
                  · {active.location}
                </DialogDescription>
              </DialogHeader>
              <p className="text-sm text-ink/70 leading-relaxed">{active.description}</p>
              <button
                type="button"
                onClick={() => downloadICS(active)}
                className="inline-flex items-center gap-2 self-start bg-pine py-2.5 pr-4 pl-3 text-sm font-medium text-cream"
              >
                <CalendarPlus className="size-4" /> Add to calendar
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            Never miss a fixture.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Add any event straight to your calendar, or get in touch for the full members'
            programme.
          </p>
          <ActionButton to="/contact" variant="gold">
            Contact the office <ArrowRight />
          </ActionButton>
        </div>
      </Section>
    </>
  );
}
