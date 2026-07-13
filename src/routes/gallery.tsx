import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import hero from "@/assets/history-archive.jpg";
import golf from "@/assets/sport-golf.jpg";
import tennis from "@/assets/sport-tennis.jpg";
import pool from "@/assets/sport-pool.jpg";
import dining from "@/assets/dining-brasserie.jpg";
import venue from "@/assets/venue-events.jpg";
import fitness from "@/assets/sport-fitness.jpg";
import squash from "@/assets/sport-squash.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Mauritius Gymkhana Club" },
      { name: "description", content: "Photography of the MGC estate, course, courts and clubhouse." },
      { property: "og:title", content: "Gallery — Mauritius Gymkhana Club" },
      { property: "og:image", content: hero },
    ],
  }),
  component: GalleryPage,
});

const GRID = [
  { src: hero, alt: "Archive photograph of the MGC members", span: "md:col-span-2 md:row-span-2" },
  { src: golf, alt: "The MGC course at sunrise" },
  { src: tennis, alt: "Grass tennis court" },
  { src: pool, alt: "The pool" },
  { src: dining, alt: "The Brasserie" },
  { src: venue, alt: "Event set-up" },
  { src: fitness, alt: "Fitness centre" },
  { src: squash, alt: "Squash court" },
];

function GalleryPage() {
  return (
    <>
      <PageHero
        overline="Gallery"
        title="A portrait of the estate"
        intro="A short walk through the club's course, courts, clubhouse and members' life."
        image={hero}
        imageAlt="Sepia-toned archive photograph of the MGC"
      />
      <Section>
        <SectionHeading overline="Portfolio" title="Selected photography" />
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
          {GRID.map((g, i) => (
            <figure
              key={i}
              className={`relative overflow-hidden rounded-sm ring-1 ring-black/5 ${g.span ?? ""}`}
            >
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}