import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/sport-pool.jpg";

export const Route = createFileRoute("/sports/pool")({
  head: () => ({
    meta: [
      { title: "Swimming Pool — Mauritius Gymkhana Club" },
      { name: "description", content: "Outdoor swimming pool set in the tropical gardens of the MGC estate." },
      { property: "og:title", content: "The Pool at Mauritius Gymkhana Club" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="Outdoor · 25 m"
      title="The pool"
      intro="A tranquil pool set in the palms of the Vacoas estate — a favourite for members' families and post-round refreshment."
      image={img}
      imageAlt="MGC outdoor swimming pool surrounded by palm trees"
      sectionTitle="Poolside"
      sectionBody="Loungers, shaded pavilions and light poolside dining are available throughout the day. Swimming lessons for juniors by appointment."
      ctaLabel="Ask about the pool"
    />
  ),
});