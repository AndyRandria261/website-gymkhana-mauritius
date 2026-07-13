import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/venue-events.jpg";

export const Route = createFileRoute("/venue-hire")({
  head: () => ({
    meta: [
      { title: "Venue Hire — Mauritius Gymkhana Club" },
      { name: "description", content: "Conference room, multipurpose hall and gardens available for private and corporate events at MGC." },
      { property: "og:title", content: "Venue Hire at Mauritius Gymkhana Club" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="Corporate · Private · Celebration"
      title="Historic venues, quietly staged"
      intro="Host your corporate retreat, gala dinner or wedding within the timeless architecture of the Vacoas estate."
      image={img}
      imageAlt="Grand event set-up in the MGC clubhouse ballroom"
      sectionTitle="Spaces available"
      sectionBody="Conference Room (up to 20), Multipurpose Hall (up to 120 seated / 180 standing) and the FootFive pitch for informal team events. Our events team will build a bespoke proposal within 48 hours of your enquiry."
      ctaLabel="Request a proposal"
    />
  ),
});