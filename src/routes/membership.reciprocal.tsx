import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Globe, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { COUNTRIES, RECIPROCAL_CLUBS } from "@/lib/reciprocal-clubs-data";
import img from "@/assets/dining-brasserie.jpg";

export const Route = createFileRoute("/membership/reciprocal")({
  head: () => ({
    meta: [
      { title: "Reciprocal Clubs -Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "26 reciprocal clubs worldwide, granting Mauritius Gymkhana Club members access to affiliated venues on their travels.",
      },
      { property: "og:title", content: "Reciprocal Clubs -MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: ReciprocalPage,
});

const FILTERS = ["All", ...COUNTRIES] as const;

function websiteUrl(site: string) {
  return site.startsWith("http") ? site : `https://${site}`;
}

function ReciprocalPage() {
  const [country, setCountry] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(
    () =>
      country === "All" ? RECIPROCAL_CLUBS : RECIPROCAL_CLUBS.filter((c) => c.country === country),
    [country],
  );

  return (
    <>
      <PageHero
        overline="26 clubs · Worldwide"
        title="Reciprocal clubs"
        intro="Our members enjoy access to a network of 26 affiliated clubs, primarily in India and the Commonwealth."
        image={img}
        imageAlt="Detail of colonial architecture at the clubhouse"
      >
        <ActionButton href="#directory" variant="gold">
          Browse the directory <ArrowRight />
        </ActionButton>
      </PageHero>

      <div className="bg-pine text-cream border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Affiliated clubs", "26"],
            ["Countries", "7"],
            ["Access", "Reciprocal"],
            ["Procedure", "Letter of introduction"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-3">
              <span className="font-serif text-2xl text-gold">{v}</span>
              <span className="text-[11px] uppercase tracking-widest text-cream/70">{k}</span>
            </div>
          ))}
        </div>
      </div>

      <Section>
        <SectionHeading overline="Access & procedure" title="Visiting an affiliated club" />
        <p className="max-w-[65ch] text-ink/70 leading-relaxed mb-6">
          Members travelling to an affiliated club may request a letter of introduction from our
          secretary. Reciprocal members visiting Mauritius are welcome at the Gymkhana upon
          presentation of a valid member card and a letter from their home club.
        </p>
        <ActionButton to="/contact" variant="pine">
          Request a letter <ArrowRight />
        </ActionButton>
      </Section>

      <section id="directory" className="bg-pine/5 py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading overline="Directory" title="Find a club" />

          <div
            role="tablist"
            aria-label="Filter clubs by country"
            className="flex flex-wrap gap-2 mb-10"
          >
            {FILTERS.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={country === c}
                onClick={() => setCountry(c)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-full ring-1 transition-colors ${
                  country === c
                    ? "bg-pine text-cream ring-pine"
                    : "bg-cream text-ink/60 ring-pine/15 hover:text-pine"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <div key={c.name} className="p-6 bg-cream ring-1 ring-pine/10 rounded-sm">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-serif text-lg text-pine leading-snug">{c.name}</h3>
                  <span className="shrink-0 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest bg-gold/15 text-pine rounded-full">
                    {c.country}
                  </span>
                </div>
                <p className="inline-flex items-start gap-2 text-xs text-ink/60 mb-2">
                  <MapPin className="size-3.5 text-gold shrink-0 mt-0.5" /> {c.address}
                </p>
                <a
                  href={websiteUrl(c.website)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-xs text-ink/60 hover:text-pine mb-2"
                >
                  <Globe className="size-3.5 text-gold shrink-0" /> {c.website}
                </a>
                {c.email && (
                  <p className="flex items-center gap-2 text-xs text-ink/60 mb-2">
                    <Mail className="size-3.5 text-gold shrink-0" /> {c.email}
                  </p>
                )}
                <p className="inline-flex items-center gap-2 text-xs text-ink/60">
                  <Phone className="size-3.5 text-gold shrink-0" /> {c.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            Visiting from an affiliated club?
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Let us know ahead of your visit and we'll have your access ready at reception.
          </p>
          <ActionButton to="/contact" variant="gold">
            Contact the office <ArrowRight />
          </ActionButton>
        </div>
      </Section>
    </>
  );
}
