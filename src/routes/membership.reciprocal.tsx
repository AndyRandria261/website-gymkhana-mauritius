import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/dining-brasserie.jpg";

export const Route = createFileRoute("/membership/reciprocal")({
  head: () => ({
    meta: [
      { title: "Reciprocal Clubs — Mauritius Gymkhana Club" },
      { name: "description", content: "26 reciprocal clubs worldwide, granting our members access to affiliated venues on their travels." },
      { property: "og:title", content: "Reciprocal Clubs — MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="26 clubs · Worldwide"
      title="Reciprocal clubs"
      intro="Our members enjoy access to a network of 26 affiliated clubs, primarily in India and the Commonwealth."
      image={img}
      imageAlt="Detail of colonial architecture at the clubhouse"
      sectionTitle="Access & procedure"
      sectionBody="Members travelling to an affiliated club may request a letter of introduction from our secretary. Reciprocal members visiting Mauritius are welcome upon presentation of a member card and letter from their home club."
      ctaLabel="Request a letter"
    />
  ),
});