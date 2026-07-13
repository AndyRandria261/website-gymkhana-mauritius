import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/sport-squash.jpg";

export const Route = createFileRoute("/sports/squash")({
  head: () => ({
    meta: [
      { title: "Squash — Mauritius Gymkhana Club" },
      { name: "description", content: "Squash courts and coaching at the Mauritius Gymkhana Club in Vacoas." },
      { property: "og:title", content: "Squash at MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="Two dedicated courts"
      title="Squash at Vacoas"
      intro="A discreet pair of courts tucked in the sports wing of the clubhouse."
      image={img}
      imageAlt="Interior of an MGC squash court"
      sectionTitle="Play & book"
      sectionBody="Booking system open to members. Coaching available by arrangement. Racket and ball hire at the pro shop."
      ctaLabel="Enquire about squash"
    />
  ),
});