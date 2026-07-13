import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/venue-events.jpg";

export const Route = createFileRoute("/the-club/tenders")({
  head: () => ({
    meta: [
      { title: "Tender Bids — Mauritius Gymkhana Club" },
      { name: "description", content: "Current tender bids and procurement notices from the Mauritius Gymkhana Club." },
      { property: "og:title", content: "Tender Bids — MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="Procurement"
      title="Tender bids"
      intro="From time to time the club publishes tender notices for supply, maintenance or professional services."
      image={img}
      imageAlt="Detail of the MGC clubhouse"
      sectionTitle="Current tenders"
      sectionBody="Full tender dossiers are published as PDFs with submission deadlines. Please read all attachments before submitting a bid."
      ctaLabel="Contact procurement"
      emptyState="No open tenders — last updated this month."
    />
  ),
});