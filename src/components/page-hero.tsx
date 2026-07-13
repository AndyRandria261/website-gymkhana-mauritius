import type { ReactNode } from "react";

export function PageHero({
  overline,
  title,
  intro,
  image,
  imageAlt,
  children,
}: {
  overline?: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative min-h-[70vh] flex flex-col justify-end pt-32 pb-16">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-linear-to-t from-pine/80 via-pine/40 to-pine/20" />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="max-w-3xl">
          {overline && (
            <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-gold">
              {overline}
            </span>
          )}
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-cream text-balance mb-6">
            {title}
          </h1>
          {intro && (
            <p className="max-w-2xl text-lg text-cream/85 leading-relaxed text-pretty">
              {intro}
            </p>
          )}
          {children && <div className="mt-8 flex flex-wrap gap-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}