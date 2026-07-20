import { createFileRoute } from "@tanstack/react-router";
import { Calendar, FileText } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import img from "@/assets/history-archive.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News -Mauritius Gymkhana Club" },
      {
        name: "description",
        content: "News and newsletters from the Mauritius Gymkhana Club, Vacoas.",
      },
      { property: "og:title", content: "News -Mauritius Gymkhana Club" },
      { property: "og:image", content: img },
    ],
  }),
  component: NewsPage,
});

const ARTICLES = [
  {
    title: "Club Newsletter -September 2023",
    date: "September 2023",
    excerpt:
      "The Club's regular newsletter, rounding up recent tournaments, social events and committee updates.",
  },
];

function NewsPage() {
  return (
    <>
      <PageHero
        overline="News"
        title="From the Club"
        intro="Newsletters, notices and updates from the committee and the club's departments."
        image={img}
        imageAlt="Archive photograph of the MGC clubhouse"
      />

      <Section>
        <SectionHeading overline="Latest" title="Articles & newsletters" />
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {ARTICLES.map((a) => (
            <div key={a.title} className="p-6 bg-cream ring-1 ring-pine/10 rounded-sm">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink/50 mb-3">
                <Calendar className="size-3.5 text-gold" /> {a.date}
              </p>
              <h3 className="font-serif text-2xl text-pine mb-3">{a.title}</h3>
              <p className="text-sm text-ink/70 leading-relaxed mb-4">{a.excerpt}</p>
              <p className="inline-flex items-center gap-2 text-xs text-ink/50">
                <FileText className="size-3.5 text-gold" /> Available at the office as a printed
                copy
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 border border-dashed border-pine/20 rounded-sm bg-pine/5 text-ink/60">
          More news will be published here as it happens -check back soon.
        </div>
      </Section>
    </>
  );
}
