import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/history-archive.jpg";

export const Route = createFileRoute("/the-club/committee")({
  head: () => ({
    meta: [
      { title: "Executive Committee — Mauritius Gymkhana Club" },
      { name: "description", content: "The Executive Committee of the Mauritius Gymkhana Club." },
      { property: "og:title", content: "Executive Committee — MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="Governance"
      title="The Executive Committee"
      intro="The committee is elected by the members at the Annual General Meeting and oversees the running of the club."
      image={img}
      imageAlt="Archive photograph of former committee members"
      sectionTitle="Current members"
      sectionBody="The committee for the current year is being published. Full biographies, portfolios and portraits will follow. In the meantime, members may reach the office for governance enquiries."
      ctaLabel="Contact the office"
      emptyState="Committee members and portfolios — to be published."
    />
  ),
});