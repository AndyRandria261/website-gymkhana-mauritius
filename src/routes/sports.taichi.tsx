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
  "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1600&q=80&auto=format&fit=crop";

const TAICHI_NOTE =
  "Sessions run outdoors in the garden, weather permitting. No equipment needed -just comfortable clothing and flat shoes. Reserve ahead and we'll confirm the meeting point.";

export const Route = createFileRoute("/sports/taichi")({
  head: () => ({
    meta: [
      { title: "Tai Chi at MGC - Garden sessions & schedule | Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Gentle Tai Chi practised in the morning garden of the Mauritius Gymkhana Club, Vacoas. Weekly sessions cultivating balance, focus and calm.",
      },
      { property: "og:title", content: "Tai Chi at Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "Slow, deliberate movement in the morning garden -a quiet discipline of balance and breath.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TaichiPage,
});

const SCHEDULE = [
  {
    id: "weekday",
    label: "Weekdays",
    rows: [
      ["Mon · Wed · Fri", "Morning Form (Yang style)", "06:15 – 07:15"],
      ["Tuesday", "Standing Meditation & Qigong", "07:00 – 07:45"],
    ],
  },
  {
    id: "weekend",
    label: "Weekend",
    rows: [
      ["Saturday", "Long Form Practice", "07:30 – 08:45"],
      ["Sunday", "Gentle Flow (beginners)", "08:00 – 09:00"],
    ],
  },
] as const;

function TaichiPage() {
  const [tab, setTab] = useState<(typeof SCHEDULE)[number]["id"]>("weekday");
  const current = SCHEDULE.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Garden · Balance & flow"
        title="Tai Chi"
        intro="Slow, deliberate movement practised in the morning garden -a quiet discipline of balance, breath and calm to open the day."
        image={heroImg}
        imageAlt="A serene garden scene evoking stillness and balance"
      >
        <BookingDialog
          subject="taichi"
          variant="gold"
          ctaLabel={<>Reserve a session <ArrowRight /></>}
          title="Reserve a Tai Chi session"
          description={TAICHI_NOTE}
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
            ["Sessions", "Dawn"],
            ["Setting", "Garden"],
            ["Session", "45–75 min"],
            ["Levels", "All"],
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
            title="An unhurried start to the day"
            intro="Tai Chi trades speed for intention. Each slow form links breath to movement, building quiet strength, steadier balance and a clearer head."
          />
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch]">
            Practised on the lawn in the cool of the morning, our sessions suit every age and level of
            mobility. Newcomers are guided through the opening forms; regulars work toward the long
            form and standing meditation.
          </p>
        </div>
      </Section>

      {/* What to expect */}
      <section className="bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            overline="What to expect"
            title="Gentle by design"
            intro="A low-impact practice that meets you at your own pace, led outdoors in the garden."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Low impact",
                body: "Soft, flowing movement that is kind on joints -ideal for building balance and mobility at any age.",
              },
              {
                title: "In the open air",
                body: "Sessions run on the garden lawn at dawn, moving indoors only if the weather turns. Flat shoes are all you need.",
              },
              {
                title: "Steadier by the week",
                body: "Regular practice sharpens focus and posture. Beginners start with the opening forms and build from there.",
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
            title="Join a session"
            intro="Timetable for the 2026 season. Members practise as part of their membership; visitors are welcome by prior reservation."
          />
          <FilterTabs
            ariaLabel="Tai Chi schedule"
            items={SCHEDULE.map((t) => ({ id: t.id, label: t.label }))}
            value={tab}
            onChange={setTab}
            className="mb-8"
          />
          <table className="w-full text-left">
            <caption className="sr-only">{current.label} Tai Chi schedule</caption>
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
            Begin the day in balance.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Tell us the morning that suits you and we'll hold your place on the lawn.
          </p>
          <BookingDialog
            subject="taichi"
            variant="gold"
            ctaLabel={<>Reserve a session <ArrowRight /></>}
            title="Reserve a Tai Chi session"
            description={TAICHI_NOTE}
            fields={["date", "time"]}
          />
        </div>
      </Section>
    </>
  );
}
