import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import heroImg from "@/assets/history-archive.jpg";

export const Route = createFileRoute("/the-club/history")({
  head: () => ({
    meta: [
      { title: "History & Milestones — Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "180 years of the Mauritius Gymkhana Club, from the founding of the golf course in 1844 to today. Timeline of key milestones.",
      },
      { property: "og:title", content: "180 Years of the Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "From polo ground to the oldest golf course of the Southern Hemisphere — a timeline.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "article" },
    ],
  }),
  component: HistoryPage,
});

const TIMELINE = [
  {
    year: "1834–1849",
    title: "The early days",
    body: "Golf is introduced to Mauritius by officers of the British Military — the fourth country ever to receive the sport, after Scotland, England and India.",
  },
  {
    year: "1844",
    title: "The course is laid out",
    body: "The land at Vacoas is set aside for golf. The course remains the oldest of the Southern Hemisphere.",
  },
  {
    year: "1849",
    title: "The Club is founded",
    body: "The Mauritius Gymkhana Club is formally constituted, primarily as a polo and golf club house.",
  },
  {
    year: "1922",
    title: "First flight from Mauritius",
    body: "On 2 June 1922, Major F. W. Honnet undertook the first recorded flight from Mauritius, taking off from the gymkhana golf course.",
  },
  {
    year: "1935",
    title: "The Men's Ireland Cup",
    body: "The trophy, still contested today, is inaugurated in 1935.",
  },
  {
    year: "1940s",
    title: "First tennis courts",
    body: "The first grass tennis courts are laid — still the only grass courts of the Indian Ocean.",
  },
  {
    year: "1976",
    title: "Modernisation of the course",
    body: "The layout is converted from a mixed polo/golf ground into the modern 18-hole course.",
  },
  {
    year: "1991 – 1996",
    title: "Renovations & expansion",
    body: "The clubhouse is expanded and additional sporting facilities added over the decade.",
  },
  {
    year: "Today",
    title: "A living heritage",
    body: "Six sports, one estate, and a community of members that spans generations of Mauritian sporting life.",
  },
];

function HistoryPage() {
  return (
    <>
      <PageHero
        overline="Since 1849"
        title="180 years, one estate"
        intro="A timeline of the Mauritius Gymkhana Club, from a polo ground under the British Military to a living private club today."
        image={heroImg}
        imageAlt="Archive photograph of the MGC members on the course"
      />

      <Section>
        <SectionHeading
          overline="Timeline"
          title="Milestones"
          intro="A short walk through the moments that shaped the club as it is today."
        />

        <ol className="relative space-y-16 border-l border-pine/15 pl-10 md:pl-16 max-w-3xl">
          {TIMELINE.map((m) => (
            <li key={m.year} className="relative">
              <span
                aria-hidden
                className="absolute -left-[46px] md:-left-[70px] top-2 size-3 rounded-full bg-gold ring-4 ring-cream"
              />
              <div className="text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-2">
                {m.year}
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-pine mb-3">
                {m.title}
              </h3>
              <p className="text-ink/75 leading-relaxed max-w-[52ch] text-pretty">
                {m.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}