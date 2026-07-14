import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import img from "@/assets/history-archive.jpg";

export const Route = createFileRoute("/the-club/rules")({
  head: () => ({
    meta: [
      { title: "Rules & Bye-Laws — Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "A plain-language summary of the Mauritius Gymkhana Club's rules and bye-laws, with the full PDF document.",
      },
      { property: "og:title", content: "Rules & Bye-Laws — MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: RulesPage,
});

const TOPICS = [
  {
    title: "Guests",
    body: "Members may sign in guests under the conditions set out in the Rules & Bye-Laws. The full document details visit frequency and applicable guest fees by facility.",
  },
  {
    title: "Attire",
    body: "Appropriate club attire is expected in all indoor and dining areas, and on the course and courts. Specific dress codes by venue are set out in the Rules & Bye-Laws.",
  },
  {
    title: "Accounts",
    body: "Member accounts are billed monthly. Settlement terms, and the process for accounts in arrears, are set out in the Rules & Bye-Laws.",
  },
];

const RULES_PDF_URL = "https://files.elastik.mu/files/mauritiusgymkhanaclub/websites/RULES.pdf";

function RulesPage() {
  return (
    <>
      <PageHero
        overline="For members"
        title="Rules & bye-laws"
        intro="A short summary of the club's most-consulted rules — guests, attire and member accounts — with the full document below."
        image={img}
        imageAlt="Archive photograph of members outside the clubhouse"
      >
        <a
          href={RULES_PDF_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
        >
          Download the PDF <ArrowRight className="size-4" />
        </a>
      </PageHero>

      <Section>
        <SectionHeading overline="In brief" title="What members ask about most" />
        <div className="grid md:grid-cols-3 gap-6">
          {TOPICS.map((t) => (
            <div key={t.title} className="p-8 bg-pine/5 rounded-sm ring-1 ring-pine/10">
              <h3 className="font-serif text-2xl text-pine mb-3">{t.title}</h3>
              <p className="text-ink/70 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-pine/5 py-24">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading
            overline="Full document"
            title="Rules & Bye-Laws (PDF)"
            intro="The complete Rules & Bye-Laws, updated after each Annual General Meeting."
          />
          <a
            href={RULES_PDF_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center gap-4 p-6 bg-cream ring-1 ring-pine/10 rounded-sm hover:ring-pine/30 transition-colors"
          >
            <FileText className="size-8 text-gold shrink-0" />
            <span>
              <span className="block font-serif text-lg text-pine">Rules & Bye-Laws.pdf</span>
              <span className="block text-xs text-ink/50">
                Opens in a new tab · contact the office for the latest print copy
              </span>
            </span>
          </a>
        </div>
      </section>

      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            Questions about a specific rule?
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            The office can point you to the exact clause, or clarify how it applies to your
            situation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
          >
            Contact the office <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
