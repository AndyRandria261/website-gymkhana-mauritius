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
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1600&q=80&auto=format&fit=crop";

const YOGA_NOTE =
  "Mats are provided, but you're welcome to bring your own. Reserve your place ahead of the session and we'll confirm the instructor and studio.";

export const Route = createFileRoute("/sports/yoga")({
  head: () => ({
    meta: [
      { title: "Yoga & Wellness at MGC - Classes & schedule | Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Vinyasa, Hatha and restorative yoga in a light-filled studio at the Mauritius Gymkhana Club, Vacoas. Weekly schedule, levels and class rates.",
      },
      { property: "og:title", content: "Yoga & Wellness at Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "Sunrise flows to gentle evening sessions -breath, balance and stillness above the estate.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: YogaPage,
});

const SCHEDULE = [
  {
    id: "morning",
    label: "Mornings",
    rows: [
      ["Mon · Wed · Fri", "Sunrise Vinyasa", "06:30 – 07:30"],
      ["Tue · Thu", "Hatha Basics", "07:00 – 08:00"],
      ["Saturday", "Slow Flow & Breath", "08:00 – 09:15"],
    ],
  },
  {
    id: "evening",
    label: "Evenings",
    rows: [
      ["Mon · Wed", "Restorative & Yin", "18:00 – 19:00"],
      ["Tue · Thu", "Power Vinyasa", "18:30 – 19:30"],
      ["Sunday", "Candlelight Wind-down", "17:30 – 18:30"],
    ],
  },
] as const;

function YogaPage() {
  const [tab, setTab] = useState<(typeof SCHEDULE)[number]["id"]>("morning");
  const current = SCHEDULE.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Studio · Mind & body"
        title="Yoga & Wellness"
        intro="A light-filled studio for breath, balance and stillness -from sunrise flows to gentle evening sessions, guided by our resident instructors."
        image={heroImg}
        imageAlt="A person practising yoga at sunrise"
      >
        <BookingDialog
          subject="yoga"
          variant="gold"
          ctaLabel={<>Reserve a class <ArrowRight /></>}
          title="Reserve a yoga class"
          description={YOGA_NOTE}
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
            ["Classes", "Daily"],
            ["Levels", "All"],
            ["Session", "60–75 min"],
            ["Mats", "Provided"],
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
            overline="The practice"
            title="Stillness, above the estate"
            intro="Our studio sits in the quiet of the clubhouse, opening to the greens beyond. Whether you are new to the mat or a seasoned practitioner, there is a class to meet you where you are."
          />
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch]">
            Vinyasa and Hatha classes build strength and mobility, while restorative Yin and
            candlelight sessions ease the body down at the end of the day. Come ten minutes early to
            settle in.
          </p>
        </div>
      </Section>

      {/* What to expect */}
      <section className="bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            overline="What to expect"
            title="Every level, welcomed"
            intro="A calm, unhurried practice with instructors who adapt each pose to the room."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Come as you are",
                body: "No experience needed. Wear something you can move in and arrive a few minutes early to unroll a mat and settle.",
              },
              {
                title: "Guided throughout",
                body: "Instructors offer modifications and props so every posture meets your body, from first-timers to regulars.",
              },
              {
                title: "Breathe out the day",
                body: "Evening restorative and Yin sessions close with a long, quiet relaxation -the reset the week needs.",
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
            intro="Timetable for the 2026 season. Members practise as part of their membership; visitors are welcome by prior reservation."
          />
          <FilterTabs
            ariaLabel="Yoga schedule"
            items={SCHEDULE.map((t) => ({ id: t.id, label: t.label }))}
            value={tab}
            onChange={setTab}
            className="mb-8"
          />
          <table className="w-full text-left">
            <caption className="sr-only">{current.label} yoga schedule</caption>
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
            Roll out a mat this week.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Tell us the class you'd like to join and we'll hold a place for you in the studio.
          </p>
          <BookingDialog
            subject="yoga"
            variant="gold"
            ctaLabel={<>Reserve a class <ArrowRight /></>}
            title="Reserve a yoga class"
            description={YOGA_NOTE}
            fields={["date", "time"]}
          />
        </div>
      </Section>
    </>
  );
}
