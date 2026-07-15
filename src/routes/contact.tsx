import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { FormField, fieldInputClass } from "@/components/form-field";
import { CLUB_ADDRESS, CLUB_EMAILS, CLUB_PHONES } from "@/lib/club-contact";
import heroImg from "@/assets/venue-events.jpg";

const SUBJECTS = [
  { value: "membership", label: "Membership enquiry" },
  { value: "golf", label: "Golf - visitor green fees" },
  { value: "tennis", label: "Tennis - court booking" },
  { value: "squash", label: "Squash - court booking" },
  { value: "fitness", label: "Fitness centre" },
  { value: "pool", label: "Swimming pool & lessons" },
  { value: "dining", label: "Restaurant reservation" },
  { value: "venue", label: "Venue hire" },
  { value: "press", label: "Press & media" },
  { value: "other", label: "Other" },
] as const;

type Subject = (typeof SUBJECTS)[number]["value"];
const SUBJECT_VALUES = SUBJECTS.map((s) => s.value) as [Subject, ...Subject[]];

const contactSearchSchema = z.object({
  subject: z
    .enum(SUBJECT_VALUES)
    .optional()
    .catch(undefined),
});

export const Route = createFileRoute("/contact")({
  validateSearch: contactSearchSchema,
  head: () => ({
    meta: [
      { title: "Contact & Directions - Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Reach the Mauritius Gymkhana Club in Vacoas - phone, email, opening hours and directions.",
      },
      { property: "og:title", content: "Contact the Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content: "Suffolk Road, Vacoas. Phone, email and directions to the estate.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const search = Route.useSearch();
  const [subject, setSubject] = useState<Subject>(search.subject ?? "membership");
  const [sent, setSent] = useState(false);
  const confirmationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) confirmationRef.current?.focus();
  }, [sent]);

  return (
    <>
      <PageHero
        overline="Contact"
        title="Visit us in Vacoas"
        intro="We welcome members, visiting golfers, corporates and friends of the club. Reach us by phone, email, or the form below."
        image={heroImg}
        imageAlt="The MGC clubhouse set for an evening event"
      />

      <Section>
        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <InfoBlock icon={<MapPin className="size-5" />} title="Address">
              {CLUB_ADDRESS.line1}
              <br />
              {CLUB_ADDRESS.country}
            </InfoBlock>
            <InfoBlock icon={<Phone className="size-5" />} title="Phone">
              Main office · {CLUB_PHONES.mainOffice}
              <br />
              Caddy Master · {CLUB_PHONES.caddyMaster}
            </InfoBlock>
            <InfoBlock icon={<Mail className="size-5" />} title="Email">
              {CLUB_EMAILS.info}
              <br />
              {CLUB_EMAILS.membership}
            </InfoBlock>
            <InfoBlock icon={<Clock className="size-5" />} title="Opening hours">
              Tuesday to Sunday · 06:00 - 22:00
              <br />
              Closed Mondays (course maintenance)
            </InfoBlock>

            {/* The raw OSM tiles are cold grey; the filter settles them into the
                club's warm palette without hiding any map detail. */}
            <div className="group relative aspect-video overflow-hidden rounded-sm ring-1 ring-pine/10">
              <iframe
                title="Map to Mauritius Gymkhana Club"
                src="https://www.openstreetmap.org/export/embed.html?bbox=57.475%2C-20.315%2C57.505%2C-20.295&layer=mapnik&marker=-20.305%2C57.49"
                className="h-full w-full [filter:grayscale(0.85)_sepia(0.25)_contrast(0.95)_brightness(1.03)] transition-[filter] duration-500 group-hover:[filter:none]"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-pine/10 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-pine mb-8">Send us a message</h2>
            {sent ? (
              <div
                ref={confirmationRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="p-8 rounded-sm bg-pine text-cream outline-none"
              >
                <p className="font-serif text-2xl text-gold mb-2">Thank you.</p>
                <p>We will respond within 2 working days.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-6"
              >
                <FormField label="Full name" required>
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
                <FormField label="Subject">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as Subject)}
                    className={fieldInputClass}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Message" required>
                  <textarea
                    rows={5}
                    required
                    className={`${fieldInputClass} resize-none`}
                  />
                </FormField>
                <ActionButton type="submit" variant="pine">
                  Send message <ArrowRight />
                </ActionButton>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}

function InfoBlock({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-1 text-gold shrink-0">{icon}</span>
      <div>
        <h3 className="text-xs uppercase tracking-widest text-ink/50 mb-1">{title}</h3>
        <p className="text-ink/80 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}