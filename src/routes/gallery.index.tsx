import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ALBUMS } from "@/lib/gallery-data";
import heroImg from "@/assets/history-archive.jpg";

export const Route = createFileRoute("/gallery/")({
  head: () => ({
    meta: [
      { title: "Gallery - Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "Photo albums of the MGC estate - golf, sports, events and club history in Vacoas, Mauritius.",
      },
      { property: "og:title", content: "Gallery - Mauritius Gymkhana Club" },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        overline="Gallery"
        title="A portrait of the estate"
        intro="A short walk through the club's course, courts, clubhouse and members' life - sorted into albums."
        image={heroImg}
        imageAlt="Sepia-toned archive photograph of the MGC"
      />
      <Section>
        <SectionHeading overline="Albums" title="Browse by collection" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALBUMS.map((a) => (
            <Link
              key={a.slug}
              to="/gallery/$album"
              params={{ album: a.slug }}
              className="group block"
            >
              <div className="overflow-hidden rounded-sm ring-1 ring-black/5">
                <img
                  src={a.photos[0].src}
                  alt={a.photos[0].alt}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-2xl text-pine">{a.title}</h3>
                  <p className="mt-1 text-sm text-ink/60 max-w-[40ch]">{a.description}</p>
                </div>
                <span className="shrink-0 text-xs uppercase tracking-widest text-gold mt-2">
                  {a.photos.length} photo{a.photos.length > 1 ? "s" : ""}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
