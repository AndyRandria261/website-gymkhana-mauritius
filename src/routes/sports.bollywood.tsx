import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { FilterTabs } from "@/components/filter-tabs";
import { BookingDialog } from "@/components/booking-dialog";
import { CLUB_ADDRESS, CLUB_PHONES } from "@/lib/club-contact";

const heroImg =
  "https://images.unsplash.com/photo-1547153760-18fc86324498?w=1600&q=80&auto=format&fit=crop";

const BOLLYWOOD_NOTE =
  "No experience needed — every routine is taught from the ground up. Reserve your place ahead of the class and we'll confirm the instructor and studio.";

export const Route = createFileRoute("/sports/bollywood")({
  head: () => ({
    meta: [
      { title: "Bollywood Dance at MGC - Classes & schedule | Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Expressive Bollywood dance classes at the Mauritius Gymkhana Club, Vacoas. Weekly schedule for all ages and abilities, class rates.",
      },
      { property: "og:title", content: "Bollywood Dance at Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "High-energy choreography set to the beat of Mumbai — joyful and expressive, for every generation.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: BollywoodPage,
});

const SCHEDULE = [
  {
    id: "adults",
    label: "Adults",
    rows: [
      ["Mon · Wed", "Bollywood Beginners", "18:30 – 19:30"],
      ["Tuesday", "Choreography Lab", "19:00 – 20:15"],
      ["Saturday", "Bhangra & Fusion", "10:00 – 11:15"],
    ],
  },
  {
    id: "juniors",
    label: "Juniors & Family",
    rows: [
      ["Wednesday", "Juniors (7–12)", "16:30 – 17:30"],
      ["Saturday", "Family Bollywood", "09:00 – 09:45"],
    ],
  },
] as const;

function BollywoodPage() {
  const [tab, setTab] = useState<(typeof SCHEDULE)[number]["id"]>("adults");
  const current = SCHEDULE.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Studio · Rhythm & colour"
        title="Bollywood Dance"
        intro="High-energy choreography set to the beat of Mumbai — a joyful, expressive class that brings the whole family onto the floor."
        image={heroImg}
        imageAlt="An expressive dancer mid-routine under studio light"
      >
        <BookingDialog
          subject="bollywood"
          variant="gold"
          ctaLabel={<>Reserve a class <ArrowRight /></>}
          title="Reserve a Bollywood class"
          description={BOLLYWOOD_NOTE}
          fields={["date", "time"]}
        />
        <ActionButton href="#schedule" variant="outline">
          View the schedule
        </ActionButton>
      </PageHero>

      {/* Stat chips */}
      <div className="bg-pine text-cream border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Levels", "All"],
            ["Ages", "7+"],
            ["Class", "60–75 min"],
            ["Styles", "Film · Bhangra"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-3">
              <span className="font-serif text-3xl text-gold">{v}</span>
              <span className="text-[11px] uppercase tracking-widest text-cream/70">{k}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Overview */}
      <Section>
        <div className="max-w-3xl">
          <SectionHeading
            overline="The class"
            title="Colour, rhythm and a lot of joy"
            intro="Bollywood dance blends classical Indian technique with the exuberance of film choreography — a class built as much on expression as on steps."
          />
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch]">
            Routines are taught piece by piece and set to well-loved tracks, so beginners keep up
            while regulars refine their style. Fusion and Bhangra sessions add footwork and flair, and
            family classes bring every generation together.
          </p>
        </div>
      </Section>

      {/* What to expect */}
      <section className="bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            overline="What to expect"
            title="Everyone on the floor"
            intro="Expressive, welcoming classes where technique comes second to having a good time."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Taught from scratch",
                body: "Each routine is broken down step by step. Come with no experience and leave with a number you can perform.",
              },
              {
                title: "For every generation",
                body: "Adult, junior and family classes run through the week, so the whole household can find a floor.",
              },
              {
                title: "Perform if you wish",
                body: "Keen dancers can join choreography for the club's cultural evenings and seasonal socials.",
              },
            ].map((c) => (
              <div key={c.title} className="p-8 bg-cream rounded-sm ring-1 ring-pine/10">
                <h3 className="font-serif text-2xl text-pine mb-3">{c.title}</h3>
                <p className="text-ink/70 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" className="py-24 scroll-mt-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            overline="Weekly schedule"
            title="Find your class"
            intro="Timetable for the 2026 season. Members join as part of their membership; visitors are welcome by prior reservation."
          />
          <FilterTabs
            ariaLabel="Bollywood dance schedule"
            items={SCHEDULE.map((t) => ({ id: t.id, label: t.label }))}
            value={tab}
            onChange={setTab}
            className="mb-8"
          />
          <table className="w-full text-left">
            <caption className="sr-only">{current.label} Bollywood dance schedule</caption>
            <tbody>
              {current.rows.map(([days, name, time]) => (
                <tr key={`${days}-${name}`} className="border-b border-pine/5">
                  <th scope="row" className="py-4 pr-4 font-normal text-ink/80 text-base">
                    <span className="block font-serif text-lg text-pine">{name}</span>
                    <span className="text-xs uppercase tracking-widest text-ink/45">{days}</span>
                  </th>
                  <td className="py-4 text-right font-serif text-lg text-pine tabular-nums">
                    {time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-ink/60">
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4 text-gold" /> Studio desk · {CLUB_PHONES.frontDesk}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-gold" /> {CLUB_ADDRESS.short}
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            Step into the rhythm.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Tell us the class you'd like to join and we'll hold a place for you on the floor.
          </p>
          <BookingDialog
            subject="bollywood"
            variant="gold"
            ctaLabel={<>Reserve a class <ArrowRight /></>}
            title="Reserve a Bollywood class"
            description={BOLLYWOOD_NOTE}
            fields={["date", "time"]}
          />
        </div>
      </Section>
    </>
  );
}
