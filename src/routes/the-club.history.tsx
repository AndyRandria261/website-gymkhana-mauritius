import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { Timeline } from "@/components/ui/timeline";
import heroImg from "@/assets/history-archive.jpg";
import golfImg from "@/assets/hero-golf-course.jpg";
import tennisImg from "@/assets/hero-tennis-grass.jpg";

export const Route = createFileRoute("/the-club/history")({
  head: () => ({
    meta: [
      { title: "History & Milestones - Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "180 years of the Mauritius Gymkhana Club, from the founding of the golf course in 1844 to today. Timeline of key milestones.",
      },
      { property: "og:title", content: "180 Years of the Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "From polo ground to the oldest golf course of the Southern Hemisphere - a timeline.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "article" },
    ],
  }),
  component: HistoryPage,
});

const heading = "font-serif text-2xl md:text-3xl text-pine mb-3";
const lead = "text-ink/75 leading-relaxed max-w-[56ch] text-pretty";
const frame =
  "rounded-lg object-cover h-32 md:h-52 lg:h-64 w-full shadow-md ring-1 ring-pine/10";

const TIMELINE = [
  {
    title: "1834–1849",
    content: (
      <div>
        <h3 className={heading}>The early days</h3>
        <p className={lead}>
          Golf is introduced to Mauritius by officers of the British Military —
          the fourth country ever to receive the sport, after Scotland, England
          and India.
        </p>
      </div>
    ),
  },
  {
    title: "1844",
    content: (
      <div>
        <h3 className={heading}>The course is laid out</h3>
        <p className={`${lead} mb-6`}>
          The land at Vacoas is set aside for golf. The course remains the
          oldest of the Southern Hemisphere.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={heroImg}
            alt="Archive photograph of members on the course"
            className={frame}
            loading="lazy"
          />
          <img
            src={golfImg}
            alt="The Gymkhana golf course today"
            className={frame}
            loading="lazy"
          />
        </div>
      </div>
    ),
  },
  {
    title: "1849",
    content: (
      <div>
        <h3 className={heading}>The Club is founded</h3>
        <p className={lead}>
          The Mauritius Gymkhana Club is formally constituted, primarily as a
          polo and golf club house.
        </p>
      </div>
    ),
  },
  {
    title: "1922",
    content: (
      <div>
        <h3 className={heading}>First flight from Mauritius</h3>
        <p className={lead}>
          On 2 June 1922, Major F. W. Honnet undertook the first recorded flight
          from Mauritius, taking off from the gymkhana golf course.
        </p>
      </div>
    ),
  },
  {
    title: "1935",
    content: (
      <div>
        <h3 className={heading}>The Men's Ireland Cup</h3>
        <p className={lead}>
          The trophy, still contested today, is inaugurated in 1935.
        </p>
      </div>
    ),
  },
  {
    title: "1940s",
    content: (
      <div>
        <h3 className={heading}>First tennis courts</h3>
        <p className={`${lead} mb-6`}>
          The first grass tennis courts are laid — still the only grass courts of
          the Indian Ocean.
        </p>
        <img
          src={tennisImg}
          alt="The grass tennis courts of the Mauritius Gymkhana Club"
          className={frame}
          loading="lazy"
        />
      </div>
    ),
  },
  {
    title: "1976",
    content: (
      <div>
        <h3 className={heading}>Modernisation of the course</h3>
        <p className={lead}>
          The layout is converted from a mixed polo/golf ground into the modern
          18-hole course.
        </p>
      </div>
    ),
  },
  {
    title: "1991–1996",
    content: (
      <div>
        <h3 className={heading}>Renovations &amp; expansion</h3>
        <p className={lead}>
          The clubhouse is expanded and additional sporting facilities added
          over the decade.
        </p>
      </div>
    ),
  },
  {
    title: "Today",
    content: (
      <div>
        <h3 className={heading}>A living heritage</h3>
        <p className={lead}>
          Six sports, one estate, and a community of members that spans
          generations of Mauritian sporting life.
        </p>
      </div>
    ),
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
          intro="A short walk through the moments that shaped the club as it is today. Scroll to follow the thread through 180 years."
        />

        <Timeline data={TIMELINE} />
      </Section>
    </>
  );
}