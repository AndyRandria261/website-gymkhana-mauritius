import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import heroImg from "@/assets/sport-golf.jpg";
import golfImg from "@/assets/sport-golf.jpg";
import tennisImg from "@/assets/sport-tennis.jpg";
import squashImg from "@/assets/sport-squash.jpg";
import fitnessImg from "@/assets/sport-fitness.jpg";
import poolImg from "@/assets/sport-pool.jpg";

export const Route = createFileRoute("/sports/")({
  head: () => ({
    meta: [
      { title: "Sports - Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Golf, grass tennis, squash, fitness and swimming - six sports on one historic estate in Vacoas, Mauritius.",
      },
      { property: "og:title", content: "Sports at MGC - Golf, Tennis, Squash, Fitness, Pool" },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: SportsIndex,
});

const SPORTS = [
  { to: "/sports/golf", title: "Golf", overline: "Since 1844 · 18 holes", img: golfImg, body: "The oldest golf course of the Southern Hemisphere, still played today." },
  { to: "/sports/tennis", title: "Grass Tennis", overline: "Only grass courts of the Indian Ocean", img: tennisImg, body: "First courts laid in the 1940s - a signature of the club." },
  { to: "/sports/squash", title: "Squash", overline: "Two dedicated courts", img: squashImg, body: "Booking system for members, coaching by arrangement." },
  { to: "/sports/fitness", title: "Fitness Centre", overline: "Cardio & strength", img: fitnessImg, body: "Modern equipment, morning to evening access." },
  { to: "/sports/pool", title: "Swimming Pool", overline: "Outdoor 25 m pool", img: poolImg, body: "Family-friendly poolside with shaded lounging." },
] as const;

function SportsIndex() {
  return (
    <>
      <PageHero
        overline="Six sports · One estate"
        title="Sport at the Gymkhana"
        intro="From championship golf to the Indian Ocean's only grass tennis courts, every discipline at the MGC is served by 180 years of tradition."
        image={heroImg}
        imageAlt="Palm-lined fairway of the MGC golf course"
      />
      <Section>
        <SectionHeading overline="Disciplines" title="Choose your sport" />
        <div className="grid md:grid-cols-2 gap-8">
          {SPORTS.map((s) => (
            <Link key={s.to} to={s.to} className="group block">
              <div className="overflow-hidden rounded-sm ring-1 ring-black/5">
                <img
                  src={s.img}
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
      </Section>
    </>
  );
}