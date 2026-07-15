import { ArrowRight } from "lucide-react";
import { PageHero } from "./page-hero";
import { Section, SectionHeading } from "./section";
import { ActionButton } from "./action-button";

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
          <ActionButton to={ctaTo} variant="pine">
            {ctaLabel} <ArrowRight />
          </ActionButton>
        </div>
      </Section>
    </>
  );
}