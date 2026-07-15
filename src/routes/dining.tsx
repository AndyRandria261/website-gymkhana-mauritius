import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Section, SectionHeading } from "@/components/section";
import { ActionButton } from "@/components/action-button";
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

const VENUES = [
  {
    title: "The Brasserie",
    body: "The Club's main dining room - Mauritian and continental cuisine, open for lunch and dinner.",
  },
  {
    title: "The Veranda",
    body: "Shaded terrace dining overlooking the course, favoured for long lunches and Sunday breakfasts.",
  },
  {
    title: "Sport Bar & Leisure",
    body: "Casual food and screens for match days, open through the afternoon and evening.",
  },
  {
    title: "Bar & Lounge",
    body: "Drinks and light bites by the clubhouse fireplace, open into the evening.",
  },
];

const MENU_CARDS = ["Pizza Menu", "Restaurant Menu", "Wine List", "Deck Menu"];

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

  return (
    <>
      <PageHero
        overline="The Brasserie · The Veranda · The Bar"
        title="Refined island dining"
        intro="From morning coffee under the shutters to candlelit evenings in the Brasserie, our chefs celebrate Mauritian flavours and continental tradition."
        image={heroImg}
        imageAlt="Elegant colonial dining room set with linens"
      >
        <ActionButton to="/contact" variant="gold">
          Reserve a table <ArrowRight />
        </ActionButton>
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
            ["Reservations", "Phone or reception"],
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
            <div key={v.title} className="p-8 bg-pine/5 rounded-sm ring-1 ring-pine/10">
              <h3 className="font-serif text-2xl text-pine mb-3">{v.title}</h3>
              <p className="text-ink/70 leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <section id="menu" className="bg-pine/5 py-24 scroll-mt-24">
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
                  {WEEK_MENU.map((d) => (
                    <tr key={d.day} className="border-b border-pine/5">
                      <th scope="row" className="py-4 pr-4 font-serif text-pine whitespace-nowrap">
                        {d.day}
                      </th>
                      <td className="py-4 pr-4 text-ink/75">{d.starter}</td>
                      <td className="py-4 pr-4 text-ink/75">{d.main}</td>
                      <td className="py-4 text-ink/75">{d.dessert}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <Section>
        <SectionHeading overline="Menu cards" title="More to explore" />
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {MENU_CARDS.map((m) => (
            <div
              key={m}
              className="p-6 bg-cream ring-1 ring-pine/10 rounded-sm flex flex-col items-start gap-3"
            >
              <UtensilsCrossed className="size-5 text-gold" />
              <h3 className="font-serif text-lg text-pine">{m}</h3>
              <p className="text-xs text-ink/50">
                Available at the restaurant - ask your server for a printed copy.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-sm bg-pine text-cream p-12 md:p-20 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-4 text-balance">
            A table, whenever you're ready.
          </h2>
          <p className="mx-auto max-w-xl text-cream/80 mb-8">
            Members and their guests may reserve by phone or through reception.
          </p>
          <ActionButton to="/contact" variant="gold">
            Reserve a table <ArrowRight />
          </ActionButton>
        </div>
      </Section>
    </>
  );
}
