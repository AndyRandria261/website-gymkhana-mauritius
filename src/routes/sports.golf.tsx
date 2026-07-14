import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import heroGolf from "@/assets/hero-golf-course.jpg";
import historyImg from "@/assets/history-archive.jpg";

export const Route = createFileRoute("/sports/golf")({
  head: () => ({
    meta: [
      { title: "Golf at MGC - Green fees, coaching & the 1844 course | Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Play the oldest golf course in the Southern Hemisphere. Green fees, coaching, and equipment at the Mauritius Gymkhana Club in Vacoas.",
      },
      { property: "og:title", content: "Golf at Mauritius Gymkhana Club - Since 1844" },
      {
        property: "og:description",
        content:
          "18 holes, Par 68, 5.6 km. Visitor green fees available for a round on the oldest course in the Southern Hemisphere.",
      },
      { property: "og:image", content: heroGolf },
      { property: "og:type", content: "website" },
    ],
  }),
  component: GolfPage,
});

const TABS = [
  {
    id: "members",
    label: "Members",
    rows: [
      ["Annual subscription", "Included in membership"],
      ["Green fee - weekday", "Complimentary"],
      ["Green fee - weekend", "Complimentary"],
    ],
  },
  {
    id: "visitors",
    label: "Visitors",
    rows: [
      ["18 holes - weekday", "Rs 3,500"],
      ["18 holes - weekend", "Rs 4,500"],
      ["9 holes", "Rs 2,200"],
      ["Annual visitor pass", "Rs 35,000"],
    ],
  },
  {
    id: "juniors",
    label: "Juniors",
    rows: [
      ["Under 12", "Rs 500"],
      ["12 to 18", "Rs 1,200"],
      ["Junior coaching (per term)", "Rs 6,500"],
    ],
  },
  {
    id: "equipment",
    label: "Equipment & Caddies",
    rows: [
      ["Golf club hire (full set)", "Rs 1,200"],
      ["Trolley hire", "Rs 300"],
      ["Caddy fee (18 holes)", "Rs 800"],
      ["Range balls (bucket)", "Rs 200"],
    ],
  },
] as const;

function GolfPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("visitors");
  const current = TABS.find((t) => t.id === tab)!;

  return (
    <>
      <PageHero
        overline="Since 1844 · 18 holes · Par 68"
        title="The oldest golf course of the Southern Hemisphere"
        intro="Mauritius is the fourth country where golf was introduced by British Military officers, after Scotland, England and India. Play the same fairways today."
        image={heroGolf}
        imageAlt="The MGC golf course at golden hour"
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
        >
          Plan a round <ArrowRight className="size-4" />
        </Link>
        <a
          href="#fees"
          className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cream ring-1 ring-cream/30 hover:bg-cream/20"
        >
          Green fees
        </a>
      </PageHero>

      {/* Stat chips */}
      <div className="bg-pine text-cream border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Par", "68"],
            ["Holes", "18"],
            ["Length", "5.6 km"],
            ["Established", "1844"],
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

      {/* History strip */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <SectionHeading
              overline="A short history"
              title="From polo ground to championship course"
              intro="Before the 1914–18 War, the estate was used almost entirely as a polo and golf club house. On 2 June 1922, Major F. W. Honnet took off from these very fairways in the first recorded flight from Mauritius."
            />
            <p className="text-ink/70 leading-relaxed text-pretty max-w-[52ch]">
              The course was later converted into the modern 18-hole layout still
              played today. Its greens have hosted every generation of Mauritian
              golfers for over 180 years.
            </p>
          </div>
          <div className="overflow-hidden rounded-sm ring-1 ring-black/5">
            <img
              src={historyImg}
              alt="Archive photograph of members on the MGC course"
              loading="lazy"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Fees */}
      <section id="fees" className="py-24 bg-pine/5 scroll-mt-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            overline="Green fees"
            title="Play with us"
            intro="Rates as of the 2026 season. Members enjoy complimentary rounds; visitors and juniors are welcome by prior booking."
          />
          <div
            role="tablist"
            aria-label="Green fees categories"
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
              <Phone className="size-4 text-gold" /> Caddy Master · +230 698 6302
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
            Planning a round in Mauritius?
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Tell us the dates, party size and preferred tee-off time. Our caddy master
            will confirm availability within 24 hours.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
          >
            Request a booking <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}