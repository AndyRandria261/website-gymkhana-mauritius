import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/history-archive.jpg";

export const Route = createFileRoute("/the-club/rules")({
  head: () => ({
    meta: [
      { title: "Rules & Bye-Laws — Mauritius Gymkhana Club" },
      { name: "description", content: "The Rules and Bye-Laws of the Mauritius Gymkhana Club." },
      { property: "og:title", content: "Rules & Bye-Laws — MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="For members"
      title="Rules & bye-laws"
      intro="A summary of the club rules, dress code, guest policy and members' accounts."
      image={img}
      imageAlt="Archive photograph of members outside the clubhouse"
      sectionTitle="Download the full document"
      sectionBody="The full Rules & Bye-Laws are available as a PDF, updated after each Annual General Meeting. Contact the office to request the latest version."
      ctaLabel="Request the PDF"
    />
  ),
});