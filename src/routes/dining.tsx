import { createFileRoute } from "@tanstack/react-router";
import { SimplePage } from "@/components/simple-page";
import img from "@/assets/dining-brasserie.jpg";

export const Route = createFileRoute("/dining")({
  head: () => ({
    meta: [
      { title: "Dining — Mauritius Gymkhana Club" },
      { name: "description", content: "Restaurant, veranda and bars at the Mauritius Gymkhana Club — Mauritian and continental cuisine." },
      { property: "og:title", content: "Dining at MGC" },
      { property: "og:image", content: img },
    ],
  }),
  component: () => (
    <SimplePage
      overline="The Brasserie · The Veranda · The Bar"
      title="Refined island dining"
      intro="From morning coffee under the shutters to candlelit evenings in the Brasserie, our chefs celebrate Mauritian flavours and continental tradition."
      image={img}
      imageAlt="Elegant colonial dining room set with linens"
      sectionTitle="Menu of the day"
      sectionBody="Our daily menu changes with the seasons and the produce arriving each morning. Members and their guests may reserve a table by phone or via reception."
      ctaLabel="Reserve a table"
      emptyState="This week's menu is being finalised — updated every Monday morning."
    />
  ),
});