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
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1600&q=80&auto=format&fit=crop";

const FOOTBALL_NOTE =
  "The FootFive pitch is booked by the hour, up to two weeks ahead. Send your request with your preferred slot and squad size, and we'll confirm availability under lights.";

export const Route = createFileRoute("/sports/football")({
  head: () => ({
    meta: [
      { title: "Six-a-side Football at MGC - FootFive pitch & booking | Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Book the floodlit FootFive pitch at the Mauritius Gymkhana Club, Vacoas — six-a-side matches, leagues and evening kickabouts. Rates and rules.",
      },
      { property: "og:title", content: "Six-a-side Football at Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "Fast, floodlit six-a-side on the FootFive pitch — weekly fixtures, kickabouts and private bookings after dark.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FootballPage,
});

const TABS = [
  {
    id: "members",
    label: "Members",
    rows: [
      ["Pitch hire (per hour, daytime)", "Included in membership"],
      ["Pitch hire under floodlights (per hour)", "Rs 400"],
      ["Bib set hire", "Rs 150"],
      ["Match ball hire", "Rs 100"],
    ],
  },
  {
    id: "guests",
    label: "Guests & non-members",
    rows: [
      ["Pitch hire (per hour, daytime)", "Rs 900"],
      ["Pitch hire under floodlights (per hour)", "Rs 1,200"],
      ["No-show / late cancellation", "Rs 600"],
    ],
  },
  {
    id: "leagues",
    label: "Leagues",
    rows: [
      ["Seasonal league entry (per team)", "Rs 6,000"],
      ["One-off tournament entry (per team)", "Rs 1,500"],
      ["Referee (per match)", "Rs 400"],
    ],
  },
] as const;

function FootballPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("members");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Floodlit FootFive pitch"
        title="Six-a-side Football"
        intro="Fast, floodlit six-a-side on the FootFive pitch — weekly fixtures, casual kickabouts and private bookings long after the sun goes down."
        image={heroImg}
        imageAlt="A floodlit six-a-side football match at night"
      >
        <BookingDialog
          subject="football"
          variant="gold"
          ctaLabel={<>Book the pitch <ArrowRight /></>}
          title="Book the FootFive pitch"
          description={FOOTBALL_NOTE}
          fields={["date", "time", "party"]}
          partyLabel="Number of players"
        />
        <ActionButton href="#fees" variant="outline">
          Pitch rules & rates
        </ActionButton>
      </PageHero>

      {/* Stat chips */}
      <div className="bg-pine text-cream border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Format", "6-a-side"],
            ["Lights", "Floodlit"],
            ["Slot length", "60 min"],
            ["Book ahead", "2 weeks"],
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
            overline="The pitch"
            title="Six a side, under the lights"
            intro="The FootFive pitch is built for a fast, small-sided game — quick passing, plenty of touches and end-to-end action that suits every level of player."
          />
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch]">
            Gather a squad for a weekly kickabout, enter a team in the seasonal league, or hire the
            pitch for a one-off match. Floodlights keep the game going well into the evening, and bibs
            and balls are on hand at the desk.
          </p>
        </div>
      </Section>

      {/* Booking & house rules */}
      <section className="bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            overline="Booking & pitch rules"
            title="How bookings work"
            intro="A simple system, kept fair for everyone sharing the pitch."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Reservations",
                body: "Book by the hour, up to two weeks ahead, through the front desk. Floodlit evening slots are charged separately from daytime hire.",
              },
              {
                title: "Cancellations",
                body: "Cancel at least 24 hours ahead of your slot. Later cancellations and no-shows are billed at the standard rate.",
              },
              {
                title: "Footwear & conduct",
                body: "Flat or moulded studs only — no metal blades. Fair play and respect for the pitch and other members are expected at all times.",
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
            title="Get a game on"
            intro="Rates as of the 2026 season. Members play daytime hours as part of their membership; floodlit slots, guests and leagues are charged as below."
          />
          <FilterTabs
            ariaLabel="Football pitch fees categories"
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
              <Phone className="size-4 text-gold" /> Front desk · {CLUB_PHONES.frontDesk}
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
            Round up the squad.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Tell us your preferred slot and squad size, and we'll hold the pitch under the lights.
          </p>
          <BookingDialog
            subject="football"
            variant="gold"
            ctaLabel={<>Book the pitch <ArrowRight /></>}
            title="Book the FootFive pitch"
            description={FOOTBALL_NOTE}
            fields={["date", "time", "party"]}
            partyLabel="Number of players"
          />
        </div>
      </Section>
    </>
  );
}
