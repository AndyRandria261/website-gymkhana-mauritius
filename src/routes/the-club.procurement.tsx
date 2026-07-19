import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import img from "@/assets/venue-events.jpg";

export const Route = createFileRoute("/the-club/procurement")({
  head: () => ({
    meta: [
      { title: "Procurement -Mauritius Gymkhana Club" },
      {
        name: "description",
        content: "Current tender bids and procurement notices from the Mauritius Gymkhana Club.",
      },
      { property: "og:title", content: "Procurement -MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: ProcurementPage,
});

type Tender = {
  reference: string;
  title: string;
  deadline: string;
  documentUrl: string;
};

const TENDERS: Tender[] = [];

const LAST_UPDATED = "14 July 2026";

function ProcurementPage() {
  const open = TENDERS.filter((t) => new Date(`${t.deadline}T23:59:59`) >= new Date());

  return (
    <>
      <PageHero
        overline="Procurement"
        title="Procurement"
        intro="From time to time the club publishes tender notices for supply, maintenance or professional services."
        image={img}
        imageAlt="Detail of the MGC clubhouse"
      />

      <Section>
        <SectionHeading overline="Current tenders" title="Open tenders" />

        {open.length === 0 ? (
          <div className="p-6 border border-dashed border-pine/20 rounded-sm bg-pine/5 text-ink/60 max-w-2xl">
            No open tenders -last updated {LAST_UPDATED}. Closed tenders are removed from this list
            automatically once their deadline passes.
          </div>
        ) : (
          <div className="overflow-x-auto max-w-4xl">
            <table className="w-full text-left">
              <caption className="sr-only">Open tenders</caption>
              <thead>
                <tr className="border-b border-pine/15 text-xs uppercase tracking-widest text-ink/50">
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Reference
                  </th>
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Title
                  </th>
                  <th scope="col" className="py-3 pr-4 font-medium">
                    Deadline
                  </th>
                  <th scope="col" className="py-3 font-medium">
                    Dossier
                  </th>
                </tr>
              </thead>
              <tbody>
                {open.map((t) => (
                  <tr key={t.reference} className="border-b border-pine/5">
                    <td className="py-4 pr-4 text-ink/75 whitespace-nowrap">{t.reference}</td>
                    <td className="py-4 pr-4 text-ink/75">{t.title}</td>
                    <td className="py-4 pr-4 text-ink/75 tabular-nums">{t.deadline}</td>
                    <td className="py-4">
                      <a
                        href={t.documentUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-pine underline underline-offset-4 hover:text-gold"
                      >
                        <FileText className="size-4" /> PDF
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            Questions about procurement?
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Read the full tender dossier before submitting a bid, and reach the office for any
            clarification.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink"
          >
            Contact procurement <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
