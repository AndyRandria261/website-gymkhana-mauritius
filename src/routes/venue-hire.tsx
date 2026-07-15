import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail, Phone, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { FormField, fieldInputClass } from "@/components/form-field";
import { CLUB_EMAILS, CLUB_PHONES } from "@/lib/club-contact";
import img from "@/assets/venue-events.jpg";

export const Route = createFileRoute("/venue-hire")({
  head: () => ({
    meta: [
      { title: "Venue Hire — Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Conference room, multipurpose hall and the FootFive pitch available for private and corporate events at MGC, Vacoas.",
      },
      { property: "og:title", content: "Venue Hire at Mauritius Gymkhana Club" },
      { property: "og:image", content: img },
    ],
  }),
  component: VenueHirePage,
});

const VENUES = [
  {
    title: "Conference Room",
    capacity: "Up to 20 seated, boardroom style",
    body: "A private, quiet space suited to board meetings, workshops and small seminars. Natural light throughout the day.",
  },
  {
    title: "Multipurpose Hall",
    capacity: "Up to 120 seated · 180 standing",
    body: "The Club's largest function space, for conferences, galas and celebrations, with direct access to the gardens.",
  },
  {
    title: "FootFive Pitch",
    capacity: "Two teams of 5, plus spectators",
    body: "A five-a-side football pitch available for private hire, corporate tournaments and team afternoons.",
  },
];

function VenueHirePage() {
  const [sent, setSent] = useState(false);
  const confirmationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) confirmationRef.current?.focus();
  }, [sent]);

  return (
    <>
      <PageHero
        overline="Corporate · Private · Celebration"
        title="Historic venues, quietly staged"
        intro="Host your corporate retreat, gala dinner or team afternoon within the timeless architecture of the Vacoas estate."
        image={img}
        imageAlt="Grand event set-up in the MGC clubhouse ballroom"
      >
        <ActionButton href="#quote" variant="gold">
          Request a proposal <ArrowRight />
        </ActionButton>
      </PageHero>

      <Section>
        <SectionHeading overline="Spaces available" title="Three settings, one estate" />
        <div className="grid md:grid-cols-3 gap-6">
          {VENUES.map((v) => (
            <div key={v.title} className="p-8 bg-pine/5 rounded-sm ring-1 ring-pine/10">
              <h3 className="font-serif text-2xl text-pine mb-2">{v.title}</h3>
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold mb-4">
                <Users className="size-3.5" /> {v.capacity}
              </p>
              <p className="text-ink/70 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-ink/50 max-w-[60ch]">
          Exact capacities and available equipment vary by configuration — our events team will
          confirm the details for your event.
        </p>
      </Section>

      <section id="quote" className="bg-pine/5 py-24 scroll-mt-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            overline="Request a proposal"
            title="Tell us about your event"
            intro="Our events team will build a bespoke proposal within 48 hours of your enquiry."
          />
          {sent ? (
            <div
              ref={confirmationRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="p-8 rounded-sm bg-pine text-cream outline-none"
            >
              <p className="font-serif text-2xl text-gold mb-2">Thank you.</p>
              <p>Our events team will respond within 48 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField label="Company or organisation">
                  <input autoComplete="organization" className={fieldInputClass} />
                </FormField>
                <FormField label="Contact name" required>
                  <input required autoComplete="name" className={fieldInputClass} />
                </FormField>
                <FormField label="Email" required>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldInputClass}
                  />
                </FormField>
                <FormField label="Phone">
                  <input type="tel" autoComplete="tel" className={fieldInputClass} />
                </FormField>
                <FormField label="Venue">
                  <select className={fieldInputClass}>
                    <option value="conference-room">Conference Room</option>
                    <option value="multipurpose-hall">Multipurpose Hall</option>
                    <option value="footfive">FootFive Pitch</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </FormField>
                <FormField label="Preferred date">
                  <input type="date" className={fieldInputClass} />
                </FormField>
                <FormField label="Expected guests">
                  <input type="number" min={1} className={fieldInputClass} />
                </FormField>
              </div>
              <FormField label="Tell us about your event" required>
                <textarea
                  rows={5}
                  required
                  className={`${fieldInputClass} resize-none`}
                />
              </FormField>
              <ActionButton type="submit" variant="pine">
                Request a proposal <ArrowRight />
              </ActionButton>
            </form>
          )}
        </div>
      </section>

      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            Prefer to speak with someone directly?
          </h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm mt-6">
            <span className="inline-flex items-center gap-2">
              <Phone className="size-4 text-gold" /> Events team · {CLUB_PHONES.eventsTeam}
            </span>
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4 text-gold" /> {CLUB_EMAILS.events}
            </span>
          </div>
        </div>
      </Section>
    </>
  );
}
