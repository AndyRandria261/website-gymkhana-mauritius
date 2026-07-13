import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/sport-fitness.jpg";

export const Route = createFileRoute("/sports/fitness")({
  head: () => ({
    meta: [
      { title: "Fitness Centre — Mauritius Gymkhana Club" },
      { name: "description", content: "Modern fitness centre with cardio and strength equipment at MGC Vacoas." },
      { property: "og:title", content: "Fitness Centre at MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="Cardio · Strength · Recovery"
      title="The MGC Fitness Centre"
      intro="A calm, well-lit space with modern equipment, open to members from early morning to late evening."
      image={img}
      imageAlt="Fitness centre interior with cardio equipment"
      sectionTitle="Access & personal training"
      sectionBody="Members enjoy unlimited access. Personal training sessions and small group classes are scheduled through the front desk."
      ctaLabel="Enquire about fitness"
    />
  ),
});