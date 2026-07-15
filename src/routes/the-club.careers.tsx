import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Send } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { CLUB_ADDRESS, CLUB_EMAILS } from "@/lib/club-contact";
import img from "@/assets/dining-brasserie.jpg";

export const Route = createFileRoute("/the-club/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Open positions and how to apply at the Mauritius Gymkhana Club — Food & Beverage, Golf and behind-the-scenes roles.",
      },
      { property: "og:title", content: "Careers at MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: CareersPage,
});

const CHANNELS = [
  { title: "By email", body: `Send your application to ${CLUB_EMAILS.hr}.` },
  {
    title: "By post",
    body: `Club Manager, Mauritius Gymkhana Club, ${CLUB_ADDRESS.full}.`,
  },
  { title: "In person", body: "Drop off your application at the Reception Desk." },
];

const DOCUMENTS = [
  "Curriculum Vitae",
  "Copy of ID / Passport",
  "Copies of Birth, Character & Educational Certificates",
  "Testimonials / references from past employers",
  "One passport-size photograph",
];

const LAST_UPDATED = "14 July 2026";

function CareersPage() {
  return (
    <>
      <PageHero
        overline="Join the team"
        title="Careers at the Gymkhana"
        intro="A wide variety of opportunities — from front office roles in Food & Beverage and Golf to behind-the-scenes positions across the estate."
        image={img}
        imageAlt="A candid moment in the clubhouse dining room"
      >
        <a
          href={`mailto:${CLUB_EMAILS.hr}?subject=Application%20—%20Spontaneous%20enquiry`}
          className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
        >
          Send your CV <Send className="size-4" />
        </a>
      </PageHero>

      <Section>
        <SectionHeading overline="Open positions" title="Current vacancies" />
        <div className="p-6 border border-dashed border-pine/20 rounded-sm bg-pine/5 text-ink/60 max-w-2xl">
          No open positions at this time — last updated {LAST_UPDATED}. Spontaneous applications are
          welcome and kept on file for six months.
        </div>
      </Section>

      <section className="bg-pine/5 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading overline="How to apply" title="Three ways to reach us" />
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {CHANNELS.map((c) => (
              <div key={c.title} className="p-8 bg-cream rounded-sm ring-1 ring-pine/10">
                <h3 className="font-serif text-2xl text-pine mb-3">{c.title}</h3>
                <p className="text-ink/70 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl">
            <h3 className="font-serif text-xl text-pine mb-4">Documents to include</h3>
            <ul className="space-y-2 text-sm text-ink/70">
              {DOCUMENTS.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="mt-2 size-1.5 rounded-full bg-gold shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink/50">
              The Club reserves the right to convene only the best-qualified candidates for an
              interview.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            Don't see the right role today?
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            We keep spontaneous applications on file for six months and reach out as roles open up.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4 text-gold" /> {CLUB_EMAILS.hr}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="size-4 text-gold" /> {CLUB_ADDRESS.short}
            </span>
          </div>
        </div>
      </Section>
    </>
  );
}
