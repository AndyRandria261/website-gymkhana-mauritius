import { createFileRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  ChefHat,
  Clock,
  Pizza,
  Sparkles,
  TreePalm,
  Tv,
  Wine,
  Waves,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
import { BookingDialog } from "@/components/booking-dialog";
import heroImg from "@/assets/dining-brasserie.jpg";

export const Route = createFileRoute("/dining")({
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

const VENUES: Array<{
  title: string;
  tag: string;
  hours: string;
  body: string;
  icon: LucideIcon;
}> = [
  {
    title: "The Brasserie",
    tag: "Lunch & dinner",
    hours: "12:00–15:00 · 19:00–22:30",
    body: "The Club's main dining room - Mauritian and continental cuisine, open for lunch and dinner.",
    icon: ChefHat,
  },
  {
    title: "The Veranda",
    tag: "Long lunches & Sunday brunch",
    hours: "07:00–16:00",
    body: "Shaded terrace dining overlooking the course, favoured for long lunches and Sunday breakfasts.",
    icon: TreePalm,
  },
  {
    title: "Sport Bar & Leisure",
    tag: "Match days & casual bites",
    hours: "12:00–23:00",
    body: "Casual food and screens for match days, open through the afternoon and evening.",
    icon: Tv,
  },
  {
    title: "Bar & Lounge",
    tag: "Evenings by the fireplace",
    hours: "17:00–23:00",
    body: "Drinks and light bites by the clubhouse fireplace, open into the evening.",
    icon: Wine,
  },
];

const MENU_CARDS: Array<{ title: string; body: string; icon: LucideIcon }> = [
  {
    title: "Pizza Menu",
    body: "Wood-fired classics and seasonal toppings, served at the Veranda and poolside.",
    icon: Pizza,
  },
  {
    title: "Restaurant Menu",
    body: "The Brasserie's seasonal Mauritian and continental dishes, for lunch and dinner.",
    icon: ChefHat,
  },
  {
    title: "Wine List",
    body: "Old World labels alongside a growing selection from the Cape and Australia.",
    icon: Wine,
  },
  {
    title: "Deck Menu",
    body: "Light bites and grills served poolside through the afternoon.",
    icon: Waves,
  },
];

const VENUE_NAMES = VENUES.map((v) => v.title);

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
  const todayName = !isStale
    ? new Date().toLocaleDateString("en-US", { weekday: "long" })
    : null;

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
          ctaLabel={<>Reserve a table <ArrowRight /></>}
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
            ["Venues", "4"],
            ["Kitchen", "Mauritian & continental"],
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

      <Section>
        <SectionHeading overline="Where to eat" title="Four settings, one kitchen" />
        <div className="grid md:grid-cols-2 gap-6">
          {VENUES.map((v) => (
            <div
              key={v.title}
              className="p-8 bg-pine/5 rounded-sm ring-1 ring-pine/10 transition-colors hover:bg-pine/[0.07]"
            >
              <span className="inline-flex items-center justify-center size-11 rounded-full bg-gold/15 text-pine ring-1 ring-gold/25 mb-5">
                <v.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-2xl text-pine mb-1">{v.title}</h3>
              <p className="text-xs uppercase tracking-widest text-gold mb-4">{v.tag}</p>
              <p className="text-ink/70 leading-relaxed mb-4">{v.body}</p>
              <p className="inline-flex items-center gap-2 text-xs text-ink/50">
                <Clock className="size-3.5 text-gold" aria-hidden="true" /> {v.hours}
              </p>
            </div>
          ))}
        </div>
      </Section>

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
                        className={`border-b border-pine/5 ${
                          isToday ? "bg-gold/10" : ""
                        }`}
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

      <Section>
        <SectionHeading overline="Menu cards" title="More to explore" />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {MENU_CARDS.map((m) => (
            <div
              key={m.title}
              className="p-6 bg-cream ring-1 ring-pine/10 rounded-sm flex flex-col items-start gap-3 transition-shadow hover:shadow-sm"
            >
              <span className="inline-flex items-center justify-center size-10 rounded-full bg-gold/15 text-pine ring-1 ring-gold/25">
                <m.icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-serif text-lg text-pine">{m.title}</h3>
              <p className="text-xs text-ink/60 leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-ink/50">
          Printed copies of every menu are available at each venue - ask your server.
        </p>
      </Section>

      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            A table, whenever you're ready.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Send a request below, or call reception directly - either way, we'll confirm your
            table within 24 hours.
          </p>
          <BookingDialog
            subject="dining"
            variant="gold"
            ctaLabel={<>Reserve a table <ArrowRight /></>}
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
