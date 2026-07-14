import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import heroTennis from "@/assets/hero-tennis-grass.jpg";
import courtImg from "@/assets/sport-tennis.jpg";

export const Route = createFileRoute("/sports/tennis")({
  head: () => ({
    meta: [
      {
        title:
          "Tennis at MGC - The only grass courts of the Indian Ocean | Mauritius Gymkhana Club",
      },
      {
        name: "description",
        content:
          "Play tennis on the only grass courts of the Indian Ocean. Grass and hard courts, coaching for all levels, junior programme and visitor sessions at the Mauritius Gymkhana Club in Vacoas.",
      },
      {
        property: "og:title",
        content: "Tennis at Mauritius Gymkhana Club - Grass since 1889",
      },
      {
        property: "og:description",
        content:
          "The only grass tennis courts of the Indian Ocean. Coaching, junior programme and visitor sessions on lawns played since the late 19th century.",
      },
      { property: "og:image", content: heroTennis },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TennisPage,
});

const TABS = [
  {
    id: "members",
    label: "Members",
    rows: [
      ["Annual tennis subscription", "Included in membership"],
      ["Grass court - booking", "Complimentary"],
      ["Hard court - booking", "Complimentary"],
      ["Guest fee (per session)", "Rs 300"],
    ],
  },
  {
    id: "visitors",
    label: "Visitors",
    rows: [
      ["Grass court - 1 hour", "Rs 1,200"],
      ["Hard court - 1 hour", "Rs 700"],
      ["Racket hire", "Rs 250"],
      ["Ball set (3)", "Rs 350"],
    ],
  },
  {
    id: "juniors",
    label: "Juniors",
    rows: [
      ["Junior court booking (under 18)", "Complimentary"],
      ["Group coaching (per term)", "Rs 4,800"],
      ["Private lesson (30 min)", "Rs 900"],
      ["Holiday clinic (5 days)", "Rs 5,500"],
    ],
  },
  {
    id: "coaching",
    label: "Coaching",
    rows: [
      ["Private lesson (1 hour)", "Rs 1,600"],
      ["Two-player lesson (1 hour)", "Rs 2,200"],
      ["Adult clinic (weekly, per term)", "Rs 6,000"],
      ["Match play & tactics session", "Rs 1,800"],
    ],
  },
] as const;

function TennisPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("visitors");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Grass · Hard · Coaching"
        title="The only grass courts of the Indian Ocean"
        intro="Tennis has been played at the Mauritius Gymkhana Club since the late 19th century. Our lawns remain the only grass courts on the island - and in the region."
        image={heroTennis}
        imageAlt="Freshly cut grass tennis court at MGC with mountains in the background"
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
        >
          Book a court <ArrowRight className="size-4" />
        </Link>
        <a
          href="#fees"
          className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cream ring-1 ring-cream/30 hover:bg-cream/20"
        >
          Court fees
        </a>
      </PageHero>

      {/* Stat chips */}
      <div className="bg-pine text-cream border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Grass courts", "4"],
            ["Hard courts", "3"],
            ["Region-first", "Indian Ocean"],
            ["Playing since", "1889"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-3">
              <span className="font-serif text-3xl text-gold">{v}</span>
              <span className="text-[11px] uppercase tracking-widest text-cream/70">
                {k}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* The courts */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <SectionHeading
              overline="The courts"
              title="Grass, and the alternative"
              intro="Four championship grass courts, maintained to a standard rarely seen outside the great lawn tennis clubs, sit at the heart of the estate. Three hard courts complete the offer for year-round play."
            />
            <p className="text-ink/70 leading-relaxed text-pretty max-w-[52ch]">
              Grass is playable from May through November, when Mauritius'
              tropical rhythm gives the lawns the recovery time they need. Our
              hard courts remain open throughout the year and are lit for
              evening play.
            </p>
          </div>
          <div className="overflow-hidden rounded-sm ring-1 ring-black/5">
            <img
              src={courtImg}
              alt="Detail of a grass tennis court at MGC"
              loading="lazy"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Coaching & juniors */}
      <section className="bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            overline="Coaching & juniors"
            title="From first serve to match play"
            intro="Our pros work with beginners and competition players alike. The junior programme runs in weekly terms during the school year and as short clinics during the holidays."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Junior Academy",
                body: "Weekly groups by age and level, from 5 to 17. School-term programme with an end-of-term round-robin.",
              },
              {
                title: "Adult clinics",
                body: "Small-group sessions on technique, tactics and match play. Suitable for improvers and league players.",
              },
              {
                title: "Private lessons",
                body: "One-to-one or two-player format on grass or hard courts. Video analysis on request.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="p-8 bg-cream rounded-sm ring-1 ring-pine/10"
              >
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
            overline="Court fees"
            title="Play with us"
            intro="Rates as of the 2026 season. Members enjoy complimentary court time; visitors and guests are welcome by prior booking."
          />
          <div
            role="tablist"
            aria-label="Tennis fees categories"
            className="flex flex-wrap gap-2 border-b border-pine/10 mb-8"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors ${
                  tab === t.id
                    ? "text-pine border-b-2 border-gold -mb-px"
                    : "text-ink/50 hover:text-pine"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <table className="w-full text-left">
            <caption className="sr-only">{current.label} fees</caption>
            <tbody>
              {current.rows.map(([label, price]) => (
                <tr key={label} className="border-b border-pine/5">
                  <th
                    scope="row"
                    className="py-4 pr-4 font-normal text-ink/80 text-base"
                  >
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
              <Phone className="size-4 text-gold" /> Front desk · +230 686 1247
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
            A court, a partner, an afternoon.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Tell us the dates, format and level of play. Our tennis desk will
            confirm a court, and pair you with a partner or coach if you need one.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
          >
            Enquire about tennis <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}