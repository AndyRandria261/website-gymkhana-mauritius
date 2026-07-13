import type { ReactNode } from "react";

export function SectionHeading({
  overline,
  title,
  intro,
  align = "left",
}: {
  overline?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`mb-12 space-y-3 ${align === "center" ? "text-center mx-auto max-w-2xl" : ""}`}
    >
      {overline && (
        <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {overline}
        </span>
      )}
      <h2 className="font-serif text-4xl md:text-5xl text-pine text-balance">{title}</h2>
      {intro && (
        <p className="max-w-[52ch] text-base text-ink/70 text-pretty leading-relaxed">
          {intro}
        </p>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  );
}