import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import heroImg from "@/assets/sport-pool.jpg";

export const Route = createFileRoute("/sports/pool")({
  head: () => ({
    meta: [
      { title: "Swimming Pool at MGC - Heated, year-round | Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "A heated outdoor pool set in the palm gardens of the Mauritius Gymkhana Club, Vacoas - open to members of all ages year-round, with professional swim coaching.",
      },
      { property: "og:title", content: "The Pool at Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "Heated and open year-round, with lessons from a professional swimming coach for children and adults.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PoolPage,
});

const TABS = [
  {
    id: "members",
    label: "Members",
    rows: [
      ["Pool access", "Included in membership"],
      ["Children's lessons (per term)", "Rs 3,500"],
      ["Adult coaching (per session)", "Rs 900"],
    ],
  },
  {
    id: "guests",
    label: "Guests",
    rows: [
      ["Guest fee (per visit)", "Rs 300"],
      ["Guest - school holiday pass", "Rs 1,800"],
    ],
  },
] as const;

function PoolPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("members");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Heated · Open year-round"
        title="The pool"
        intro="A heated outdoor pool set in the palms of the Vacoas estate, open to members of all ages through every season, with lessons from a professional swimming coach."
        image={heroImg}
        imageAlt="MGC outdoor swimming pool surrounded by palm trees"
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
        >
          Ask about lessons <ArrowRight className="size-4" />
        </Link>
        <a
          href="#fees"
          className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cream ring-1 ring-cream/30 hover:bg-cream/20"
        >
          Poolside rates
        </a>
      </PageHero>

      {/* Stat chips */}
      <div className="bg-pine text-cream border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Heated", "Year-round"],
            ["Open to", "All ages"],
            ["Coaching", "Children & adults"],
            ["Setting", "Palm gardens"],
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
            overline="The pool"
            title="A heated pool, open every season"
            intro="Unlike many outdoor pools on the island, the MGC pool is heated - so members swim through the cooler months as easily as the summer season."
          />
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch]">
            Loungers and shaded pavilions line the deck for family afternoons and post-round
            refreshment, with light poolside dining available throughout the day.
          </p>
        </div>
      </Section>

      {/* Lessons & families */}
      <section className="bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            overline="Lessons & families"
            title="For every age, and every level"
            intro="A professional swimming coach is available for lessons, from a first splash to stroke refinement."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Children's lessons",
                body: "Learn-to-swim classes for junior members, taught by the Club's professional swimming coach.",
              },
              {
                title: "Adult coaching",
                body: "Stroke correction and confidence sessions for adult members, scheduled by appointment.",
              },
              {
                title: "Poolside dining",
                body: "Light meals and drinks are served poolside throughout the day - ask the F&B team for the current menu.",
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
            title="At the poolside"
            intro="Rates as of the 2026 season. Pool access is included for members; guests are welcome by prior arrangement."
          />
          <div
            role="tablist"
            aria-label="Pool fees categories"
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
              <Phone className="size-4 text-gold" /> Front desk · +230 660 1844
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
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">Take the plunge.</h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Book a first lesson for your child, or simply come by for an afternoon at the pool.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
          >
            Ask about the pool <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
