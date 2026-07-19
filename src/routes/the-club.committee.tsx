import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { TeamSection, type TeamMember } from "@/components/ui/team";
import img from "@/assets/history-archive.jpg";
import member01 from "@/assets/member-01.jpg";
import member02 from "@/assets/member-02.jpg";
import member03 from "@/assets/member-03.jpg";
import member04 from "@/assets/member-04.jpg";
import member05 from "@/assets/member-05.jpg";
import member06 from "@/assets/member-06.jpg";

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

const COMMITTEE: TeamMember[] = [
  {
    name: "Leckraj Beenessreesingh",
    role: "President",
    avatar: member01,
    link: "https://www.linkedin.com/in/leckraj-beenessreesingh",
  },
  {
    name: "Satyajit Boolell",
    role: "Vice-President",
    avatar: member02,
    link: "https://www.linkedin.com/in/satyajit-boolell",
  },
  {
    name: "Ashween Bunwaree",
    role: "Honorary Secretary",
    avatar: member03,
    link: "https://www.linkedin.com/in/ashween-bunwaree",
  },
  {
    name: "Aline Wong",
    role: "Honorary Treasurer",
    avatar: member04,
    link: "https://www.linkedin.com/in/aline-wong",
  },
  {
    name: "Sunjay Saddul",
    role: "Committee Member",
    avatar: member05,
    link: "https://www.linkedin.com/in/sunjay-saddul",
  },
  {
    name: "Akil Pirbhai",
    role: "Committee Member",
    avatar: member06,
    link: "https://www.linkedin.com/in/akil-pirbhai",
  },
];

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
        <SectionHeading
          overline="Current members"
          title="Committee for the current year"
          intro="Elected at the Annual General Meeting and confirmed as of the date below."
        />

        <TeamSection members={COMMITTEE} className="mb-12" />

        <div className="max-w-3xl border-t border-pine/10 pt-10">
          <p className="text-ink/70 leading-relaxed text-pretty max-w-[60ch] mb-8">
            Portfolios shown are confirmed as at {LAST_UPDATED}. For any governance enquiry — AGM
            minutes, committee portfolios, or how to raise a matter for the committee's attention —
            members may reach the office.
          </p>
          <ActionButton to="/contact" variant="pine">
            Contact the office <ArrowRight />
          </ActionButton>
        </div>
      </Section>
    </>
  );
}
