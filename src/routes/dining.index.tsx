import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { BookingDialog } from "@/components/booking-dialog";
import {
  MENUS,
  VENUES,
  VENUE_NAMES,
  menuItemCount,
  type Menu,
  type Venue,
  venueOptionsFor,
} from "@/lib/dining-data";
import heroImg from "@/assets/dining-brasserie.jpg";

export const Route = createFileRoute("/dining/")({
  head: () => ({
    meta: [
      { title: "Dining - Mauritius Gymkhana Club" },
      {
        name: "description",
        content:
          "The Brasserie, the Veranda and the Bar at the Mauritius Gymkhana Club - Mauritian and continental cuisine, plus this week's menu of the day.",
      },
      { property: "og:title", content: "Dining at MGC" },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: DiningPage,
});

const BOOKING_STEPS = [
  "Choose your venue - the Brasserie for a full meal, the Veranda for a long lunch, the Sport Bar for match days, or the Lounge for drinks.",
  "Send your request with a date, time and party size - through the form or a call to reception.",
  "Reception confirms within 24 hours, by phone or email, to lock in your table.",
  "Arrive and check in - a member of the front-of-house team will seat you at the agreed time.",
];

const MENU_VALID_FROM = "2026-07-13";
const MENU_VALID_UNTIL = "2026-07-19";

const WEEK_MENU = [
  {
    day: "Monday",
    starter: "Palm heart salad",
    main: "Grilled dorade, creole sauce",
    dessert: "Coconut blancmange",
  },
  { day: "Tuesday", starter: "Pumpkin soup", main: "Chicken vindaye", dessert: "Gâteau patate" },
  { day: "Wednesday", starter: "Octopus salad", main: "Beef daube, rice", dessert: "Napolitaine" },
  { day: "Thursday", starter: "Green mango salad", main: "Venison civet", dessert: "Tarte tatin" },
  {
    day: "Friday",
    starter: "Fish cakes",
    main: "Grilled kingfish, rougaille",
    dessert: "Lime tart",
  },
  {
    day: "Saturday",
    starter: "Prawn cocktail",
    main: "Roast leg of lamb",
    dessert: "Crème caramel",
  },
  {
    day: "Sunday",
    starter: "Consommé",
    main: "Sunday roast, seasonal vegetables",
    dessert: "Sticky toffee pudding",
  },
];

function formatRange(from: string, to: string) {
  const f = new Date(`${from}T00:00:00`);
  const t = new Date(`${to}T00:00:00`);
  const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long" });
  return `${fmt.format(f)} – ${fmt.format(t)}`;
}

function DiningPage() {
  const isStale = new Date() > new Date(`${MENU_VALID_UNTIL}T23:59:59`);
  const todayName = !isStale ? new Date().toLocaleDateString("en-US", { weekday: "long" }) : null;

  return (
    <>
      <PageHero
        overline="The Brasserie · The Veranda · The Bar & Lounge"
        title="Refined island dining"
        intro="From morning coffee under the shutters to candlelit evenings in the Brasserie, our chefs celebrate Mauritian flavours and continental tradition."
        image={heroImg}
        imageAlt="Elegant colonial dining room set with linens"
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
        <ActionButton href="#menu" variant="outline">
          This week's menu
        </ActionButton>
      </PageHero>

      <div className="bg-pine text-cream border-y border-gold/20">
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Venues", String(VENUES.length)],
            ["Menus", String(MENUS.length)],
            ["Open", "Breakfast to late"],
            ["Reservations", "Confirmed within 24h"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline gap-3">
              <span className="font-serif text-2xl text-gold">{v}</span>
              <span className="text-[11px] uppercase tracking-widest text-cream/70">{k}</span>
            </div>
          ))}
        </div>
      </div>

      <VenueShowcase />

      <MenuShowcase />

      <section id="menu" className="py-24 scroll-mt-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            overline="Menu of the day"
            title={
              isStale
                ? "This week's menu"
                : `Week of ${formatRange(MENU_VALID_FROM, MENU_VALID_UNTIL)}`
            }
            intro="Set by the Brasserie kitchen each Monday, drawing on the produce arriving that morning."
          />
          {isStale ? (
            <div className="p-6 border border-dashed border-pine/20 rounded-sm bg-cream text-ink/60">
              This week's menu is being updated - last published{" "}
              {formatRange(MENU_VALID_FROM, MENU_VALID_UNTIL)}.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <caption className="sr-only">
                  Menu of the day, {formatRange(MENU_VALID_FROM, MENU_VALID_UNTIL)}
                </caption>
                <thead>
                  <tr className="border-b border-pine/15 text-xs uppercase tracking-widest text-ink/50">
                    <th scope="col" className="py-3 pr-4 font-medium">
                      Day
                    </th>
                    <th scope="col" className="py-3 pr-4 font-medium">
                      Starter
                    </th>
                    <th scope="col" className="py-3 pr-4 font-medium">
                      Main
                    </th>
                    <th scope="col" className="py-3 font-medium">
                      Dessert
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {WEEK_MENU.map((d) => {
                    const isToday = d.day === todayName;
                    return (
                      <tr
                        key={d.day}
                        className={`border-b border-pine/5 ${isToday ? "bg-gold/10" : ""}`}
                      >
                        <th
                          scope="row"
                          className="py-4 pr-4 font-serif text-pine whitespace-nowrap"
                        >
                          <span className="inline-flex items-center gap-2">
                            {d.day}
                            {isToday && (
                              <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-sans font-semibold uppercase tracking-wider text-ink">
                                Today
                              </span>
                            )}
                          </span>
                        </th>
                        <td className="py-4 pr-4 text-ink/75">{d.starter}</td>
                        <td className="py-4 pr-4 text-ink/75">
                          {d.main}
                          {d.day === "Sunday" && (
                            <span className="ml-2 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gold">
                              <Sparkles className="size-3" aria-hidden="true" /> Weekly favourite
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-ink/75">{d.dessert}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <p className="mt-6 text-xs text-ink/50">
                Dietary requirements or allergies? Let your server know when you order.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-pine/5 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            overline="Reservations"
            title="How to book a table"
            intro="Reservations are simple - tell us when, where and how many, and we'll take care of the rest."
          />
          <ol className="space-y-6">
            {BOOKING_STEPS.map((s, i) => (
              <li key={s} className="flex gap-6 items-start">
                <span className="shrink-0 font-serif text-3xl text-gold w-12 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-ink/80 pt-2 leading-relaxed">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            A table, whenever you're ready.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Send a request below, or call reception directly - either way, we'll confirm your table
            within 24 hours.
          </p>
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
        </div>
      </Section>
    </>
  );
}

/* ---------- Venues ---------- */

/**
 * Bento showcase of the four venues, mirroring the home page's sports grid: the
 * Brasserie leads as the wide card, the Veranda takes the tall companion, and
 * the two bars split the row beneath. Each card carries its own booking CTA so
 * a visitor never has to scroll back up and re-pick a venue in the dialog.
 */
function VenueShowcase() {
  const [brasserie, veranda, ...bars] = VENUES;

  return (
    <Section>
      <SectionHeading
        overline="Where to eat"
        title="Four settings, one kitchen"
        intro="One brigade cooks for all four rooms - what changes is the pace, the view and the hour."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
        <VenueCard venue={brasserie} featured className="lg:col-span-7" />
        <VenueCard venue={veranda} className="lg:col-span-5" />
        {bars.map((v) => (
          <VenueCard key={v.slug} venue={v} className="lg:col-span-6" />
        ))}
      </div>
    </Section>
  );
}

function VenueCard({
  venue,
  featured,
  className = "",
}: {
  venue: Venue;
  featured?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`group relative flex flex-col justify-end overflow-hidden rounded-sm ring-1 ring-black/5 ${
        featured ? "min-h-[26rem] lg:min-h-[32rem]" : "min-h-[22rem] lg:min-h-[24rem]"
      } ${className}`}
    >
      <img
        src={venue.image}
        alt={venue.imageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-pine/95 via-pine/55 to-pine/10" />

      {/* Category chip -lets the eye sort the four rooms at a glance */}
      <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-cream/95 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-pine shadow-sm">
        <venue.icon className="size-3.5 text-pine/70" aria-hidden="true" />
        {venue.tag}
      </span>

      <div className="relative p-6 md:p-8 text-cream">
        <h3 className={`font-serif text-balance ${featured ? "text-3xl md:text-4xl" : "text-2xl"}`}>
          {venue.title}
        </h3>
        <p
          className={`mt-3 text-cream/80 leading-relaxed text-pretty ${
            featured ? "max-w-[48ch]" : "max-w-[44ch] text-sm"
          }`}
        >
          {venue.body}
        </p>
        <p className="mt-4 inline-flex items-center gap-2 text-xs text-cream/70">
          <Clock className="size-3.5 text-gold" aria-hidden="true" />
          <span className="sr-only">Opening hours: </span>
          {venue.hours}
        </p>
        <div className="mt-6">
          <BookingDialog
            subject="dining"
            variant={featured ? "gold" : "outline"}
            ctaLabel={
              <>
                Reserve<span className="sr-only"> a table at {venue.title}</span>
                <ArrowRight />
              </>
            }
            title={`Reserve at ${venue.title}`}
            description="Tell us the date, time and party size. Reception will confirm your table within 24 hours."
            fields={["date", "time", "party"]}
            partyLabel="Number of guests"
            venueOptions={venueOptionsFor(venue.title)}
          />
        </div>
      </div>
    </article>
  );
}

/* ---------- Menus ---------- */

/**
 * The four standing menus. Same card anatomy as the home page's sports cards
 * -image, gradient, stat pill, arrow CTA -with the pill carrying the dish
 * count, so the card promises something concrete before the click.
 */
function MenuShowcase() {
  return (
    <Section className="bg-pine/5">
      <SectionHeading
        overline="Our menus"
        title="Browse before you sit down"
        intro="Every standing menu in full - dishes, descriptions and prices - so you arrive knowing what you came for."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
        {MENUS.map((menu) => (
          <MenuCard key={menu.slug} menu={menu} />
        ))}
      </div>
      <p className="mt-8 text-xs text-ink/50">
        Printed copies of every menu are available at each venue - ask your server.
      </p>
    </Section>
  );
}

function MenuCard({ menu }: { menu: Menu }) {
  const count = menuItemCount(menu);

  return (
    <Link
      to="/dining/menus/$menu"
      params={{ menu: menu.slug }}
      className="group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-sm ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
    >
      <img
        src={menu.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-pine/95 via-pine/60 to-pine/15" />

      {/* Count pill -the concrete promise behind the click */}
      <span className="absolute right-5 top-5 rounded-full bg-cream/95 px-3 py-1 text-[10px] uppercase tracking-widest text-pine shadow-sm">
        <span className="mr-1.5 font-serif text-sm tracking-normal text-pine">{count}</span>
        {menu.unit}
      </span>

      <div className="relative w-full p-6 text-cream">
        <h3 className="font-serif text-2xl text-balance">{menu.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-cream/80">{menu.summary}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
          View the menu
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
