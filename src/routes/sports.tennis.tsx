import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/sport-tennis.jpg";

export const Route = createFileRoute("/sports/tennis")({
  head: () => ({
    meta: [
      { title: "Grass Tennis — Mauritius Gymkhana Club" },
      { name: "description", content: "Play on the only grass tennis courts of the Indian Ocean, first laid in the 1940s at the Mauritius Gymkhana Club." },
      { property: "og:title", content: "Grass Tennis at MGC — Since the 1940s" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="Since the 1940s"
      title="The only grass courts of the Indian Ocean"
      intro="First laid in the early 1940s, our tennis courts remain the unique signature of the club — meticulously maintained by the estate team."
      image={img}
      imageAlt="Grass tennis court with palm trees in the background"
      sectionTitle="Coaching & bookings"
      sectionBody="Court bookings, coaching by our tennis professional and inter-club tournaments are open to members. Guests welcome by invitation. Contact us for tournament schedules and coaching availability."
      ctaLabel="Enquire about tennis"
    />
  ),
});