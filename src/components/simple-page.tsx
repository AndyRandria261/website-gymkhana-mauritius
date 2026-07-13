import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "./page-hero";
import { Section, SectionHeading } from "./section";

export function SimplePage({
  overline,
  title,
  intro,
  image,
  imageAlt,
  sectionTitle,
  sectionBody,
  ctaLabel = "Contact us",
  ctaTo = "/contact",
  emptyState,
}: {
  overline?: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  sectionTitle: string;
  sectionBody: string;
  ctaLabel?: string;
  ctaTo?: string;
  emptyState?: string;
}) {
  return (
    <>
      <PageHero
        overline={overline}
        title={title}
        intro={intro}
        image={image}
        imageAlt={imageAlt}
      />
      <Section>
        <div className="max-w-3xl">
          <SectionHeading title={sectionTitle} />
          <p className="text-ink/75 leading-relaxed text-pretty text-lg mb-8">
            {sectionBody}
          </p>
          {emptyState && (
            <div className="p-6 border border-dashed border-pine/20 rounded-sm bg-pine/5 text-ink/60 mb-8">
              {emptyState}
            </div>
          )}
          <Link
            to={ctaTo}
            className="inline-flex items-center gap-2 bg-pine text-cream py-3 pr-5 pl-4 text-sm font-medium"
          >
            {ctaLabel} <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}