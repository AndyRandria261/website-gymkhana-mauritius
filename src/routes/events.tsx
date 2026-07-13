import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/hero-golf-course.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Mauritius Gymkhana Club" },
      { name: "description", content: "Tournaments, dinners and members' events at the Mauritius Gymkhana Club." },
      { property: "og:title", content: "Events at MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="Tournaments · Dinners · Members"
      title="Club events"
      intro="Our calendar mixes competitive fixtures, social evenings and the club's landmark annual events."
      image={img}
      imageAlt="The MGC golf course at golden hour"
      sectionTitle="Upcoming"
      sectionBody="The full calendar is refreshed monthly. Members are notified by email and via the members' portal."
      ctaLabel="Contact the office"
      emptyState="The next season's calendar will be published shortly."
    />
  ),
});