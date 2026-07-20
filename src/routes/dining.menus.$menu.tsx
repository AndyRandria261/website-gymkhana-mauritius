import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { BookingDialog } from "@/components/booking-dialog";
import {
  MENUS,
  VENUE_NAMES,
  formatPrice,
  getMenu,
  menuItemCount,
  type MenuItem,
  type MenuSection,
} from "@/lib/dining-data";

export const Route = createFileRoute("/dining/menus/$menu")({
  loader: ({ params }) => {
    const menu = getMenu(params.menu);
    if (!menu) throw notFound();
    // `icon` is a lucide-react component (a function), which the loader's
    // server->client serializer (seroval) cannot serialize -strip it here;
    // the "other menus" links below read icons straight from MENUS instead.
    const { icon: _icon, ...serializableMenu } = menu;
    return serializableMenu;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} - Dining | Mauritius Gymkhana Club` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.title} at MGC` },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  notFoundComponent: MenuNotFound,
  component: MenuPage,
});

function MenuNotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-xl py-24 text-center">
        <h1 className="font-serif text-3xl text-pine mb-4">Menu not found</h1>
        <p className="text-ink/60 mb-6">That menu doesn't exist, or has been retired.</p>
        <Link to="/dining" className="text-pine underline underline-offset-4">
          Back to Dining
        </Link>
      </div>
    </Section>
  );
}

/** Anchor id for a section heading, so the jump links stay stable. */
const sectionId = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function MenuPage() {
  const menu = Route.useLoaderData();
  const count = menuItemCount(menu);
  const others = MENUS.filter((m) => m.slug !== menu.slug);

  return (
    <>
      <PageHero
        overline={`Dining · ${count} ${menu.unit}`}
        title={menu.title}
        intro={menu.intro}
        image={menu.image}
        imageAlt={menu.imageAlt}
      >
        <BookingDialog
          subject="dining"
          variant="gold"
          ctaLabel={
            <>
              Reserve a table <ArrowRight />
            </>
          }
          title="Reserve a table"
          description="Tell us the date, time and party size. Reception will confirm your table within 24 hours."
          fields={["date", "time", "party"]}
          partyLabel="Number of guests"
          venueOptions={VENUE_NAMES}
        />
        <ActionButton to="/dining" variant="outline">
          <ArrowLeft /> All menus
        </ActionButton>
      </PageHero>

      <div className="border-b border-pine/10 bg-cream">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-3 px-6 py-5">
          <p className="inline-flex items-center gap-2 text-sm text-ink/70">
            <MapPin className="size-4 text-gold" aria-hidden="true" />
            {menu.servedAt}
          </p>
          {/* Jump links -a long menu should never force a scroll hunt */}
          <nav aria-label="Menu sections" className="flex flex-wrap gap-2">
            {menu.sections.map((s) => (
              <a
                key={s.name}
                href={`#${sectionId(s.name)}`}
                className="rounded-full bg-pine/5 px-3.5 py-1.5 text-xs font-medium text-pine ring-1 ring-pine/10 transition-colors hover:bg-pine/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {s.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <Section>
        <div className="mx-auto max-w-6xl space-y-16">
          {menu.sections.map((section) => (
            <MenuSectionBlock key={section.name} section={section} />
          ))}

          <div className="space-y-1 border-t border-pine/10 pt-8 text-xs text-ink/50">
            <p>Prices in Mauritian rupees, inclusive of VAT.</p>
            <p>Dietary requirements or allergies? Let your server know when you order.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-pine/5">
        <SectionHeading overline="Also on the table" title="The other menus" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {others.map((m) => (
            <Link
              key={m.slug}
              to="/dining/menus/$menu"
              params={{ menu: m.slug }}
              className="group flex flex-col rounded-sm bg-cream p-6 ring-1 ring-pine/10 transition-colors hover:ring-gold/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span className="inline-flex size-10 items-center justify-center rounded-full bg-gold/15 text-pine ring-1 ring-gold/25">
                <m.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-lg text-pine">{m.title}</h3>
              <p className="mt-1 text-xs uppercase tracking-widest text-gold">
                {menuItemCount(m)} {m.unit}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-pine">
                View
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

function MenuSectionBlock({ section }: { section: MenuSection }) {
  return (
    <section aria-labelledby={sectionId(section.name)} className="scroll-mt-24">
      <div className="flex items-baseline justify-between gap-4 border-b border-pine/15 pb-3">
        <h2 id={sectionId(section.name)} className="font-serif text-2xl text-pine">
          {section.name}
        </h2>
        <span className="shrink-0 text-xs uppercase tracking-widest text-ink/40">
          {section.items.length} {section.items.length === 1 ? "item" : "items"}
        </span>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {orderedItems(section).map((item) => (
          <MenuItemCard key={item.name} item={item} />
        ))}
      </ul>
    </section>
  );
}

/**
 * Photographed dishes lead their section -a display nicety, not a claim about
 * which dish is "best". Sorting here rather than in the data keeps the
 * kitchen's own ordering intact in dining-data.ts.
 */
function orderedItems(section: MenuSection): MenuItem[] {
  return [...section.items].sort((a, b) => Number(Boolean(b.image)) - Number(Boolean(a.image)));
}

/**
 * One card size for every dish, photographed or not -so which items happen to
 * have a verified photo never reads as an editorial "this is our best dish"
 * call the page hasn't actually made. Same shell as the "other menus" links
 * below: bg-cream, ring-1 ring-pine/10, gold ring on hover.
 */
function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <li className="group flex flex-col overflow-hidden rounded-sm bg-cream ring-1 ring-pine/10 transition-colors hover:ring-gold/40">
      {item.image && (
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.image}
            alt={item.imageAlt ?? ""}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-base text-pine text-pretty">{item.name}</h3>
          {item.price !== undefined && (
            <span className="shrink-0 rounded-full bg-gold/15 px-2 py-0.5 text-[11px] font-semibold text-pine tabular-nums ring-1 ring-gold/25">
              {formatPrice(item.price)}
            </span>
          )}
        </div>
        <p className="text-xs leading-relaxed text-ink/60 text-pretty">{item.description}</p>
      </div>
    </li>
  );
}
