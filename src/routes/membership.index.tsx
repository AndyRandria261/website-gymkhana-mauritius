import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { FormField, fieldInputClass } from "@/components/form-field";
import heroImg from "@/assets/dining-brasserie.jpg";

export const Route = createFileRoute("/membership/")({
  head: () => ({
    meta: [
      { title: "Membership - Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Individual, family and corporate membership at the Mauritius Gymkhana Club. Categories, benefits and how to apply.",
      },
      { property: "og:title", content: "Become a Member - Mauritius Gymkhana Club" },
      {
        property: "og:description",
        content:
          "Join a community of members who value heritage, sportsmanship and the quiet luxury of the MGC.",
      },
      { property: "og:image", content: heroImg },
      { property: "og:type", content: "website" },
    ],
  }),
  component: MembershipPage,
});

type Category = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  featured?: boolean;
};

const CATEGORIES: Category[] = [
  {
    name: "Full Member",
    price: "Enquire",
    tagline: "Individual, resident in Mauritius",
    features: [
      "Full access to all sporting facilities",
      "Complimentary golf green fees",
      "Guest privileges (up to 4 per month)",
      "Voting rights at the AGM",
    ],
  },
  {
    name: "Family Member",
    price: "Enquire",
    tagline: "Full member + spouse & children under 18",
    features: [
      "Full facilities for the household",
      "Junior coaching programme included",
      "Family Sunday brunch tariff",
      "Reciprocal club access worldwide",
    ],
    featured: true,
  },
  {
    name: "Corporate Member",
    price: "Enquire",
    tagline: "Named executives from your company",
    features: [
      "Up to 4 nominated members",
      "Priority venue hire for events",
      "Boardroom & conference room access",
      "Client entertainment privileges",
    ],
  },
] as const;

const STEPS = [
  "Submit the enquiry form with your details.",
  "Our secretary contacts you within 5 working days to arrange a visit.",
  "Tour the estate and meet the committee informally.",
  "Formal application with two member proposers.",
  "Committee review at the next monthly meeting.",
];

export default function MembershipPage() {
  return <MembershipContent />;
}

function MembershipContent() {
  const [form, setForm] = useState({ name: "", email: "", category: "family", message: "" });
  const [sent, setSent] = useState(false);
  const confirmationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) confirmationRef.current?.focus();
  }, [sent]);

  return (
    <>
      <PageHero
        overline="Membership"
        title="A legacy to call your own"
        intro="Applications are open for individuals, families and corporates who value heritage, sportsmanship and quiet Mauritian hospitality."
        image={heroImg}
        imageAlt="Members dining under the shuttered windows of the MGC clubhouse"
      />

      <Section>
        <SectionHeading
          overline="Categories"
          title="Three ways to belong"
          intro="All fees are reviewed annually. Concrete rates are shared during the enquiry process - please contact us for your quotation."
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {CATEGORIES.map((c) => (
            <div
              key={c.name}
              className={`p-8 rounded-sm ring-1 ${
                c.featured
                  ? "bg-pine text-cream ring-pine"
                  : "bg-cream ring-pine/10"
              }`}
            >
              <h3
                className={`font-serif text-2xl mb-1 ${c.featured ? "text-cream" : "text-pine"}`}
              >
                {c.name}
              </h3>
              <p
                className={`text-sm mb-6 ${c.featured ? "text-cream/70" : "text-ink/60"}`}
              >
                {c.tagline}
              </p>
              <div
                className={`font-serif text-3xl mb-6 ${c.featured ? "text-gold" : "text-pine"}`}
              >
                {c.price}
              </div>
              <ul className="space-y-3 text-sm">
                {c.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className={`size-4 mt-0.5 shrink-0 ${
                        c.featured ? "text-gold" : "text-pine"
                      }`}
                    />
                    <span className={c.featured ? "text-cream/90" : "text-ink/75"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <section className="py-24 bg-pine/5">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            overline="Process"
            title="How to apply"
            intro="Membership at the MGC is by proposition. The steps below outline what to expect from enquiry to confirmation."
          />
          <ol className="space-y-6">
            {STEPS.map((s, i) => (
              <li key={s} className="flex gap-6 items-start">
                <span className="shrink-0 font-serif text-3xl text-gold w-12 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-ink/80 pt-2 leading-relaxed">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            overline="Enquire"
            title="Start your application"
            align="center"
          />
          {sent ? (
            <div
              ref={confirmationRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="text-center p-12 rounded-sm bg-pine text-cream outline-none"
            >
              <h3 className="font-serif text-3xl mb-3 text-gold">Thank you.</h3>
              <p>Our secretary will be in touch within 5 working days.</p>
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
                <input
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={fieldInputClass}
                />
              </FormField>
              <FormField label="Email" required>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={fieldInputClass}
                />
              </FormField>
              <FormField label="Membership category">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={fieldInputClass}
                >
                  <option value="full">Full Member</option>
                  <option value="family">Family Member</option>
                  <option value="corporate">Corporate Member</option>
                </select>
              </FormField>
              <FormField label="Tell us a little about yourself">
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${fieldInputClass} resize-none`}
                />
              </FormField>
              <ActionButton type="submit" variant="pine">
                Send enquiry <ArrowRight />
              </ActionButton>
            </form>
          )}
        </div>
      </Section>
    </>
  );
}