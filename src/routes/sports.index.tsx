import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { SPORTS, SPORT_GROUPS, sportsByGroup } from "@/lib/sports-data";
import heroImg from "@/assets/sport-golf.jpg";

export const Route = createFileRoute("/sports/")({
  head: () => ({
    meta: [
      { title: "Sports - Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Golf, tennis, squash, paddle, yoga, tai chi, zumba, Bollywood dance, six-a-side football, fitness and swimming - eleven sports on one historic estate in Vacoas, Mauritius.",
      },
      { property: "og:title", content: "Sports at MGC - Eleven disciplines, one estate" },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: SportsIndex,
});

function SportsIndex() {
  return (
    <>
      <PageHero
        overline={`${SPORTS.length} sports · One estate`}
        title="Sport at the Gymkhana"
        intro="From championship golf to the Indian Ocean's only grass tennis courts, studio wellness and floodlit football — every discipline at the MGC is served by 180 years of tradition."
        image={heroImg}
        imageAlt="Palm-lined fairway of the MGC golf course"
      />
      <Section>
        <SectionHeading overline="Disciplines" title="Choose your sport" />
        <div className="space-y-16">
          {SPORT_GROUPS.map((group) => (
            <div key={group.key}>
              <h3 className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                {group.heading}
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {sportsByGroup(group.key).map((s) => (
                  <Link key={s.path} to={s.path} className="group block">
                    <div className="overflow-hidden rounded-sm ring-1 ring-black/5">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="w-full aspect-[16/10] object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="mt-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gold mb-1">
                          {s.overline}
                        </p>
                        <h3 className="font-serif text-2xl text-pine">{s.title}</h3>
                        <p className="mt-2 text-sm text-ink/60 max-w-[46ch]">{s.body}</p>
                      </div>
                      <ArrowRight className="size-4 mt-2 text-pine/40 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}