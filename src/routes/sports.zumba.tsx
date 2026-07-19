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
  "https://images.unsplash.com/photo-1535525153412-5a42439a210d?w=1600&q=80&auto=format&fit=crop";

const ZUMBA_NOTE =
  "Bring water and trainers with good grip -that's it. Reserve your place ahead of the class and we'll confirm the instructor and studio.";

export const Route = createFileRoute("/sports/zumba")({
  head: () => ({
    meta: [
      { title: "Zumba at MGC - Dance-fitness classes & schedule | Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Latin-inspired Zumba dance-fitness classes at the Mauritius Gymkhana Club, Vacoas. Weekly schedule, all levels welcome, class rates.",
      },
      { property: "og:title", content: "Zumba at Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "A full-body dance-fitness party -Latin rhythms, big energy and a serious cardio workout.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ZumbaPage,
});

const SCHEDULE = [
  {
    id: "week",
    label: "Weekdays",
    rows: [
      ["Mon · Wed", "Zumba Classic", "18:15 – 19:15"],
      ["Tue · Thu", "Zumba Toning", "18:30 – 19:30"],
      ["Friday", "Friday Night Fiesta", "19:00 – 20:00"],
    ],
  },
  {
    id: "weekend",
    label: "Weekend",
    rows: [
      ["Saturday", "Family Zumba", "09:30 – 10:30"],
      ["Sunday", "Zumba Express", "08:30 – 09:15"],
    ],
  },
] as const;

function ZumbaPage() {
  const [tab, setTab] = useState<(typeof SCHEDULE)[number]["id"]>("week");
  const current = SCHEDULE.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Studio · Dance fitness"
        title="Zumba"
        intro="A full-body dance-fitness party -Latin rhythms, big energy and a serious cardio workout that never feels like one."
        image={heroImg}
        imageAlt="A dancer mid-movement, full of energy"
      >
        <BookingDialog
          subject="zumba"
          variant="gold"
          ctaLabel={<>Reserve a class <ArrowRight /></>}
          title="Reserve a Zumba class"
          description={ZUMBA_NOTE}
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
            ["Energy", "High"],
            ["Levels", "All"],
            ["Class", "45–60 min"],
            ["Burn", "~500 kcal"],
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
            title="A workout that feels like a night out"
            intro="Zumba blends salsa, merengue, reggaeton and more into choreography anyone can follow. Keep up, let go, and the cardio takes care of itself."
          />
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch]">
            No dance background required -the steps repeat, the playlist carries you, and every class
            builds from a warm-up to a peak and back down to a stretch. Come for the workout, stay for
            the atmosphere.
          </p>
        </div>
      </Section>

      {/* What to expect */}
      <section className="bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            overline="What to expect"
            title="Turn up and move"
            intro="High-energy, easy to follow, and impossible to do without smiling."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "No steps to learn",
                body: "Follow the instructor and the music. The routines repeat, so you'll be moving with the room within minutes.",
              },
              {
                title: "Real cardio",
                body: "Interval-style choreography keeps your heart rate up -expect to work up a sweat and burn serious energy.",
              },
              {
                title: "Bring a friend",
                body: "Zumba is better shared. Members may bring a guest, and family classes on Saturdays welcome all ages.",
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
            ariaLabel="Zumba schedule"
            items={SCHEDULE.map((t) => ({ id: t.id, label: t.label }))}
            value={tab}
            onChange={setTab}
            className="mb-8"
          />
          <table className="w-full text-left">
            <caption className="sr-only">{current.label} Zumba schedule</caption>
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
            Dance your workout this week.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Tell us the class you'd like to join and we'll hold a spot on the floor for you.
          </p>
          <BookingDialog
            subject="zumba"
            variant="gold"
            ctaLabel={<>Reserve a class <ArrowRight /></>}
            title="Reserve a Zumba class"
            description={ZUMBA_NOTE}
            fields={["date", "time"]}
          />
        </div>
      </Section>
    </>
  );
}
