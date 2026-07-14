import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import heroImg from "@/assets/sport-fitness.jpg";

export const Route = createFileRoute("/sports/fitness")({
  head: () => ({
    meta: [
      { title: "Fitness Centre at MGC - Hours, classes & membership | Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "The Mauritius Gymkhana Club Fitness Centre in Vacoas: open 06:00–22:00 daily, ten class formats, single and family membership rates.",
      },
      { property: "og:title", content: "Fitness Centre at Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content: "Cardio, strength and ten class formats - open every day from 06:00 to 22:00.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FitnessPage,
});

const CLASSES = [
  "Yoga",
  "Muay Thai",
  "Zumba",
  "Spinning",
  "HIIT Training",
  "Abs Mix",
  "Aqua Gym",
  "Aerobic Dance",
  "Stretching",
  "Table Tennis Class",
];

const TABS = [
  {
    id: "membership",
    label: "Membership",
    rows: [
      ["Single - monthly", "Rs 790"],
      ["Single - yearly", "Rs 7,400"],
      ["Family - monthly", "Rs 1,100"],
      ["Family - yearly", "Rs 10,400"],
      ["Senior single - monthly", "Rs 395"],
      ["Senior family - monthly", "Rs 555"],
    ],
  },
  {
    id: "dropin",
    label: "Drop-in",
    rows: [
      ["Single session", "Rs 150"],
      ["Member's guest - session", "Rs 250"],
      ["Guest - monthly pass", "Rs 1,500"],
    ],
  },
  {
    id: "extras",
    label: "Extras",
    rows: [["Towel rental", "Rs 50"]],
  },
] as const;

function FitnessPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("membership");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Open 06:00–22:00 · Every day"
        title="The MGC Fitness Centre"
        intro="A well-equipped gym in the heart of the estate, open seven days a week, with a class timetable running from HIIT to yoga and a squash court in the same wing."
        image={heroImg}
        imageAlt="Fitness centre interior with cardio equipment"
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
        >
          Join a class <ArrowRight className="size-4" />
        </Link>
        <a
          href="#fees"
          className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cream ring-1 ring-cream/30 hover:bg-cream/20"
        >
          Membership & rates
        </a>
      </PageHero>

      {/* Stat chips */}
      <div className="bg-pine text-cream border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Open", "06:00–22:00"],
            ["Days", "7 / 7"],
            ["Class formats", "10"],
            ["Membership", "Single & family"],
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
            overline="Equipment & training"
            title="Cardio, strength, and ten class formats"
            intro="The centre is equipped for cardio and strength training and run by professional instructors who give members individual attention, whatever their level."
          />
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch] mb-6">
            A full class timetable runs across the week - ask the front desk for current times. The
            programme rotates through:
          </p>
          <ul className="flex flex-wrap gap-2">
            {CLASSES.map((c) => (
              <li
                key={c}
                className="px-4 py-2 text-sm bg-pine/5 text-pine rounded-full ring-1 ring-pine/10"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Membership tiers */}
      <section className="bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <SectionHeading
            overline="Membership tiers"
            title="Join at your own pace"
            intro="Monthly or yearly, single or family - with a senior rate and no obligation to commit long-term."
          />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Single",
                body: "Rs 790 per month, or Rs 7,400 for the year - full access to the gym floor and class timetable.",
              },
              {
                title: "Family",
                body: "Rs 1,100 per month, or Rs 10,400 for the year, covering the whole household under one membership.",
              },
              {
                title: "Senior",
                body: "Rs 395 per month single, or Rs 555 per month family - the same access, at a senior rate.",
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
            title="Membership & drop-in rates"
            intro="Rates as of the 2026 season. A towel rental and guest passes are available at the front desk."
          />
          <div
            role="tablist"
            aria-label="Fitness fees categories"
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
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            Start with a single session.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Drop in for Rs 150, or ask about a monthly membership - no long-term commitment
            required.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
          >
            Enquire about fitness <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
