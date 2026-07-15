import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { FilterTabs } from "@/components/filter-tabs";
import heroImg from "@/assets/sport-squash.jpg";

export const Route = createFileRoute("/sports/squash")({
  head: () => ({
    meta: [
      { title: "Squash at MGC - Courts, booking & rates | Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Two dedicated squash courts in the fitness wing of the Mauritius Gymkhana Club, Vacoas. Booking rules, guest policy and rates.",
      },
      { property: "og:title", content: "Squash at Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "Two courts, booked one week ahead through the gym instructor. Guests welcome by arrangement.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SquashPage,
});

const TABS = [
  {
    id: "members",
    label: "Members",
    rows: [
      ["Court booking (per hour)", "Included in membership"],
      ["Peak hours (weekday 17:00–20:00)", "Included · 60 min slots"],
      ["Racket hire", "Rs 150"],
      ["Ball (single)", "Rs 100"],
    ],
  },
  {
    id: "guests",
    label: "Guests",
    rows: [
      ["Guest session - 1st & 2nd visit", "Rs 300"],
      ["Guest session - subsequent visits", "Rs 600"],
      ["No-show / late cancellation", "Rs 300"],
    ],
  },
  {
    id: "juniors",
    label: "Juniors",
    rows: [
      ["Junior court booking (under 18)", "Complimentary"],
      ["Junior coaching (per session)", "Rs 700"],
    ],
  },
] as const;

function SquashPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("members");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Two courts · Fitness wing"
        title="Squash at Vacoas"
        intro="A discreet pair of courts tucked into the Club's fitness wing - open to members by advance booking, with guests welcome by arrangement."
        image={heroImg}
        imageAlt="Interior of an MGC squash court"
      >
        <ActionButton to="/contact" variant="gold">
          Book a court <ArrowRight />
        </ActionButton>
        <ActionButton href="#fees" variant="outline">
          Court rules & rates
        </ActionButton>
      </PageHero>

      {/* Stat chips */}
      <div className="bg-pine text-cream border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Courts", "2"],
            ["Book ahead", "1 week"],
            ["Slot length", "60 min"],
            ["Guest visits", "2 free"],
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
            overline="The courts"
            title="Two courts, one booking desk"
            intro="Bookings run through the gym instructor rather than an app - by phone or in person, one week ahead of play. It keeps a small, well-used facility easy to manage."
          />
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch]">
            The courts sit within the fitness centre, so a squash session pairs easily with a
            warm-up on the cardio floor or a stretch class beforehand. Alcoholic drinks are not
            permitted on the squash premises.
          </p>
        </div>
      </Section>

      {/* Booking & house rules */}
      <section className="bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            overline="Booking & house rules"
            title="How reservations work"
            intro="A simple system, kept fair for everyone sharing two courts."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Reservations",
                body: "Book one week in advance through the gym instructor, by phone or at the front desk. Confirmations must be signed at the time of booking.",
              },
              {
                title: "Cancellations",
                body: "Cancel at least 24 hours ahead of your slot. Later cancellations and no-shows are billed at the standard rate.",
              },
              {
                title: "Guests",
                body: "Members may bring a guest twice at the standard guest fee. Further visits by the same guest are charged at double rate.",
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

      {/* Fees */}
      <section id="fees" className="py-24 scroll-mt-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            overline="Rates"
            title="Play with us"
            intro="Rates as of the 2026 season. Members enjoy complimentary court time; guests and juniors are welcome by prior booking."
          />
          <FilterTabs
            ariaLabel="Squash fees categories"
            items={TABS.map((t) => ({ id: t.id, label: t.label }))}
            value={tab}
            onChange={setTab}
            className="mb-8"
          />
          <table className="w-full text-left">
            <caption className="sr-only">{current.label} fees</caption>
            <tbody>
              {current.rows.map(([label, price]) => (
                <tr key={label} className="border-b border-pine/5">
                  <th scope="row" className="py-4 pr-4 font-normal text-ink/80 text-base">
                    {label}
                  </th>
                  <td className="py-4 text-right font-serif text-xl text-pine tabular-nums">
                    {price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-10 flex flex-wrap gap-6 text-sm text-ink/60">
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4 text-gold" /> Gym instructor · +230 660 1844
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-gold" /> Suffolk Road, Vacoas
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            A quick match, sorted in a phone call.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Tell the gym instructor your preferred day and time, one week ahead of play, and a court
            will be held for you.
          </p>
          <ActionButton to="/contact" variant="gold">
            Enquire about squash <ArrowRight />
          </ActionButton>
        </div>
      </Section>
    </>
  );
}
