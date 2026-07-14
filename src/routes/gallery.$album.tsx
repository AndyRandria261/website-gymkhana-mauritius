import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getAlbum } from "@/lib/gallery-data";

export const Route = createFileRoute("/gallery/$album")({
  loader: ({ params }) => {
    const album = getAlbum(params.album);
    if (!album) throw notFound();
    return album;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} - Gallery | Mauritius Gymkhana Club` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: loaderData.title },
          { property: "og:image", content: loaderData.photos[0].src },
        ]
      : [],
  }),
  notFoundComponent: AlbumNotFound,
  component: AlbumPage,
});

function AlbumNotFound() {
  return (
    <Section>
      <div className="max-w-xl mx-auto text-center py-24">
        <h1 className="font-serif text-3xl text-pine mb-4">Album not found</h1>
        <p className="text-ink/60 mb-6">That collection doesn't exist, or has been moved.</p>
        <Link to="/gallery" className="text-pine underline underline-offset-4">
          Back to Gallery
        </Link>
      </div>
    </Section>
  );
}

function AlbumPage() {
  const album = Route.useLoaderData();
  const [index, setIndex] = useState<number | null>(null);

  const close = () => setIndex(null);
  const prev = () =>
    setIndex((i) => (i === null ? null : (i - 1 + album.photos.length) % album.photos.length));
  const next = () => setIndex((i) => (i === null ? null : (i + 1) % album.photos.length));

  useEffect(() => {
    if (index === null) return;
    const count = album.photos.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") setIndex((i) => (i === null ? null : (i - 1 + count) % count));
      if (e.key === "ArrowRight") setIndex((i) => (i === null ? null : (i + 1) % count));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, album.photos.length]);

  return (
    <>
      <PageHero
        overline="Gallery"
        title={album.title}
        intro={album.description}
        image={album.photos[0].src}
        imageAlt={album.photos[0].alt}
      >
        <Link
          to="/gallery"
          className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cream ring-1 ring-cream/30 hover:bg-cream/20"
        >
          <ArrowLeft className="size-4" /> All albums
        </Link>
      </PageHero>

      <Section>
        <SectionHeading
          overline={`${album.photos.length} photo${album.photos.length > 1 ? "s" : ""}`}
          title="Browse the album"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {album.photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open photo ${i + 1}: ${p.alt}`}
              className="group relative overflow-hidden rounded-sm ring-1 ring-black/5 aspect-[4/3]"
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </Section>

      <Dialog open={index !== null} onOpenChange={(open) => !open && close()}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none sm:rounded-none">
          {index !== null && (
            <div className="relative">
              <img
                src={album.photos[index].src}
                alt={album.photos[index].alt}
                className="max-h-[80vh] w-full rounded-sm object-contain"
              />
              <div className="mt-3 flex items-center justify-between text-cream">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className="inline-flex items-center gap-1 text-sm hover:text-gold"
                >
                  <ChevronLeft className="size-5" /> Previous
                </button>
                <span className="text-xs uppercase tracking-widest text-cream/70">
                  {index + 1} / {album.photos.length}
                </span>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="inline-flex items-center gap-1 text-sm hover:text-gold"
                >
                  Next <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
