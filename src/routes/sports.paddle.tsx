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
  "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1600&q=80&auto=format&fit=crop";

const PADDLE_NOTE =
  "Courts are booked as doubles, one week ahead of play. Send your request and we'll follow up to lock in the slot and pair you up if you're short of players.";

export const Route = createFileRoute("/sports/paddle")({
  head: () => ({
    meta: [
      { title: "Paddle at MGC - Courts, booking & rates | Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Enclosed paddle courts at the Mauritius Gymkhana Club, Vacoas — fast, social doubles. Booking rules, guest policy and rates.",
      },
      { property: "og:title", content: "Paddle at Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "The club's newest racquet sport — fast, social doubles on enclosed courts. Members and guests welcome.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PaddlePage,
});

const TABS = [
  {
    id: "members",
    label: "Members",
    rows: [
      ["Court booking (per hour, doubles)", "Included in membership"],
      ["Peak hours (weekday 17:00–20:00)", "Included · 90 min slots"],
      ["Racquet hire", "Rs 200"],
      ["Ball set", "Rs 250"],
    ],
  },
  {
    id: "guests",
    label: "Guests",
    rows: [
      ["Guest session — 1st & 2nd visit", "Rs 350"],
      ["Guest session — subsequent visits", "Rs 700"],
      ["No-show / late cancellation", "Rs 350"],
    ],
  },
  {
    id: "coaching",
    label: "Coaching",
    rows: [
      ["Introductory clinic (per person)", "Rs 500"],
      ["Private coaching (per hour)", "Rs 900"],
      ["Junior coaching (under 18)", "Rs 600"],
    ],
  },
] as const;

function PaddlePage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("members");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Glass courts · Doubles play"
        title="Paddle at Vacoas"
        intro="The fastest-growing racquet sport in the world arrives at the Gymkhana — social, easy to learn and endlessly addictive, on enclosed courts."
        image={heroImg}
        imageAlt="A racquet player on an enclosed paddle court"
      >
        <BookingDialog
          subject="paddle"
          variant="gold"
          ctaLabel={<>Request a booking <ArrowRight /></>}
          title="Request a paddle booking"
          description={PADDLE_NOTE}
          fields={["date", "time", "party"]}
          partyLabel="Number of players"
        />
        <ActionButton href="#fees" variant="outline">
          Court rules & rates
        </ActionButton>
      </PageHero>

      {/* Stat chips */}
      <div className="bg-pine text-cream border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Format", "Doubles"],
            ["Book ahead", "1 week"],
            ["Slot length", "90 min"],
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
            title="Easy to start, hard to put down"
            intro="Paddle is played in fours on an enclosed court, where the walls stay in play. The rallies are longer, the learning curve is gentle, and it is every bit as social as it is competitive."
          />
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch]">
            Whether you come from tennis, squash or have never held a racquet, a first session is all
            it takes. Bring three friends or let us pair you into a four — introductory clinics run
            through the week.
          </p>
        </div>
      </Section>

      {/* Booking & house rules */}
      <section className="bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            overline="Booking & house rules"
            title="How reservations work"
            intro="A simple system, kept fair for everyone sharing the courts."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Reservations",
                body: "Book one week in advance through the front desk, by phone or in person. Courts are reserved as doubles for 90-minute slots.",
              },
              {
                title: "Cancellations",
                body: "Cancel at least 24 hours ahead of your slot. Later cancellations and no-shows are billed at the standard rate.",
              },
              {
                title: "Guests",
                body: "Members may bring guests twice at the standard guest fee. Further visits by the same guest are charged at double rate.",
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
            intro="Rates as of the 2026 season. Members enjoy complimentary court time; guests, coaching and juniors are welcome by prior booking."
          />
          <FilterTabs
            ariaLabel="Paddle fees categories"
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
            Four players, ninety minutes, one addiction.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Tell us your preferred day and time, one week ahead of play, and we'll hold a court — or
            find you a four.
          </p>
          <BookingDialog
            subject="paddle"
            variant="gold"
            ctaLabel={<>Request a booking <ArrowRight /></>}
            title="Request a paddle booking"
            description={PADDLE_NOTE}
            fields={["date", "time", "party"]}
            partyLabel="Number of players"
          />
        </div>
      </Section>
    </>
  );
}
