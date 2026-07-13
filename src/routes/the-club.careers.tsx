import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/dining-brasserie.jpg";

export const Route = createFileRoute("/the-club/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Mauritius Gymkhana Club" },
      { name: "description", content: "Open positions and how to apply at the Mauritius Gymkhana Club." },
      { property: "og:title", content: "Careers at MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="Join the team"
      title="Careers at the Gymkhana"
      intro="From front of house to greenkeeping, the club is home to a team that has quietly maintained one of Mauritius' oldest institutions."
      image={img}
      imageAlt="A candid moment in the clubhouse dining room"
      sectionTitle="How to apply"
      sectionBody="Send your CV and a short cover note to hr_officer@mgc.mu. Applications for spontaneous roles are kept on file for six months."
      ctaLabel="Send your CV"
      ctaTo="/contact"
      emptyState="No open positions at this time — spontaneous applications welcome."
    />
  ),
});