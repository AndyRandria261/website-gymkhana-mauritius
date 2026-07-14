import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section } from "@/components/section";
import heroImg from "@/assets/venue-events.jpg";

export const Route = createFileRoute("/contact")({
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
  const [subject, setSubject] = useState("membership");
  const [sent, setSent] = useState(false);

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
              Suffolk Road, Vacoas 73420
              <br />
              Mauritius
            </InfoBlock>
            <InfoBlock icon={<Phone className="size-5" />} title="Phone">
              Main office · +230 696 1404
              <br />
              Caddy Master · +230 698 6302
            </InfoBlock>
            <InfoBlock icon={<Mail className="size-5" />} title="Email">
              info@mgc.mu
              <br />
              membership@mgc.mu
            </InfoBlock>
            <InfoBlock icon={<Clock className="size-5" />} title="Opening hours">
              Tuesday to Sunday · 06:00 - 22:00
              <br />
              Closed Mondays (course maintenance)
            </InfoBlock>

            <div className="aspect-video overflow-hidden rounded-sm ring-1 ring-pine/10">
              <iframe
                title="Map to Mauritius Gymkhana Club"
                src="https://www.openstreetmap.org/export/embed.html?bbox=57.475%2C-20.315%2C57.505%2C-20.295&layer=mapnik&marker=-20.305%2C57.49"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <div>
            <h2 className="font-serif text-3xl text-pine mb-8">Send us a message</h2>
            {sent ? (
              <div className="p-8 rounded-sm bg-pine text-cream">
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
                <F label="Full name" required>
                  <input
                    required
                    className="w-full border-b border-pine/20 bg-transparent py-3 outline-none focus:border-pine"
                  />
                </F>
                <F label="Email" required>
                  <input
                    type="email"
                    required
                    className="w-full border-b border-pine/20 bg-transparent py-3 outline-none focus:border-pine"
                  />
                </F>
                <F label="Subject">
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full border-b border-pine/20 bg-transparent py-3 outline-none focus:border-pine"
                  >
                    <option value="membership">Membership enquiry</option>
                    <option value="golf">Visitor green fees</option>
                    <option value="venue">Venue hire</option>
                    <option value="press">Press & media</option>
                    <option value="other">Other</option>
                  </select>
                </F>
                <F label="Message" required>
                  <textarea
                    rows={5}
                    required
                    className="w-full border-b border-pine/20 bg-transparent py-3 outline-none focus:border-pine resize-none"
                  />
                </F>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-pine text-cream py-3 pr-5 pl-4 text-sm font-medium"
                >
                  Send message <ArrowRight className="size-4" />
                </button>
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

function F({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-ink/50 mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
    </label>
  );
}