import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import img from "@/assets/history-archive.jpg";

export const Route = createFileRoute("/the-club/committee")({
  head: () => ({
    meta: [
      { title: "Executive Committee — Mauritius Gymkhana Club" },
      {
        name: "description",
        content: "The Executive Committee of the Mauritius Gymkhana Club.",
      },
      { property: "og:title", content: "Executive Committee — MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: CommitteePage,
});

const LAST_UPDATED = "14 July 2026";

function CommitteePage() {
  return (
    <>
      <PageHero
        overline="Governance"
        title="The Executive Committee"
        intro="The committee is elected by the members at the Annual General Meeting and oversees the running of the club."
        image={img}
        imageAlt="Archive photograph of former committee members"
      />

      <Section>
        <div className="max-w-3xl">
          <SectionHeading overline="Current members" title="Committee for the current year" />
          <div className="p-6 border border-dashed border-pine/20 rounded-sm bg-pine/5 text-ink/60 mb-8">
            Committee members and portfolios are being confirmed following the Annual General
            Meeting — last checked {LAST_UPDATED}. Full biographies and portraits will follow once
            approved by the committee.
          </div>
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch] mb-8">
            In the meantime, members may reach the office for any governance enquiry — AGM minutes,
            committee portfolios, or how to raise a matter for the committee's attention.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-pine text-cream py-3 pr-5 pl-4 text-sm font-medium"
          >
            Contact the office <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
