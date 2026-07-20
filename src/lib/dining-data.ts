import type { LucideIcon } from "lucide-react";
import { ChefHat, Pizza, TreePalm, Tv, Waves, Wine } from "lucide-react";
import diningBrasserie from "@/assets/dining-brasserie.jpg";

/**
 * Single source of truth for the dining offer -the four venues and the four
 * menus. The /dining page, the menu detail pages and the sitemap all read from
 * here rather than keeping their own copies, so adding a dish or renaming a
 * venue is a one-line change.
 *
 * Images follow the same convention as sports-data.ts: local assets where we
 * have them, Unsplash otherwise.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=1400&q=80&auto=format&fit=crop`;

export type Venue = {
  slug: string;
  title: string;
  tag: string;
  hours: string;
  body: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
};

export const VENUES: readonly Venue[] = [
  {
    slug: "brasserie",
    title: "The Brasserie",
    tag: "Lunch & dinner",
    hours: "12:00–15:00 · 19:00–22:30",
    body: "The Club's main dining room -Mauritian and continental cuisine served under the shuttered windows, for long lunches and candlelit evenings alike.",
    image: diningBrasserie,
    imageAlt: "The Brasserie dining room set with white linens",
    icon: ChefHat,
  },
  {
    slug: "veranda",
    title: "The Veranda",
    tag: "Breakfast & Sunday brunch",
    hours: "07:00–16:00",
    body: "Shaded terrace dining overlooking the course, favoured for morning coffee and unhurried Sunday breakfasts.",
    image: unsplash("photo-1414235077428-338989a2e8c0"),
    imageAlt: "Shaded terrace tables overlooking a green lawn",
    icon: TreePalm,
  },
  {
    slug: "sport-bar",
    title: "Sport Bar & Leisure",
    tag: "Match days & casual bites",
    hours: "12:00–23:00",
    body: "Casual food and big screens for match days, open right through the afternoon and into the evening.",
    image: unsplash("photo-1514933651103-005eec06c04b"),
    imageAlt: "Warmly lit sports bar with screens above the counter",
    icon: Tv,
  },
  {
    slug: "bar-lounge",
    title: "Bar & Lounge",
    tag: "Evenings by the fireplace",
    hours: "17:00–23:00",
    body: "Drinks and light bites by the clubhouse fireplace, from the first round of the evening to the last.",
    image: unsplash("photo-1470337458703-46ad1756a187"),
    imageAlt: "Club lounge armchairs beside a lit fireplace",
    icon: Wine,
  },
] as const;

export const VENUE_NAMES = VENUES.map((v) => v.title);

/**
 * Venue names ordered so `venue` sits first -the booking dialog preselects the
 * first option, which is how each venue card opens straight onto its own venue.
 */
export function venueOptionsFor(venue: string): string[] {
  return [venue, ...VENUE_NAMES.filter((n) => n !== venue)];
}

export type MenuItem = {
  name: string;
  description: string;
  /** Rupees. Omitted where the kitchen prices to market. */
  price?: number;
  /**
   * Photographed dishes are the section's signature -they render as a wide
   * card ahead of the text-only ones, so the eye lands on what the kitchen
   * wants to sell. Deliberately a minority: a menu where every line carries a
   * stock photo reads like a delivery app, not a club founded in 1849.
   */
  image?: string;
  imageAlt?: string;
};

export type MenuSection = {
  name: string;
  items: MenuItem[];
};

export type Menu = {
  slug: string;
  title: string;
  /** One line for the showcase card. */
  summary: string;
  /** Fuller intro for the menu page hero. */
  intro: string;
  /** Where the menu is served -shown on the card and the detail page. */
  servedAt: string;
  /** Plural noun for the count pill: "18 dishes", "23 bottles". */
  unit: string;
  image: string;
  imageAlt: string;
  icon: LucideIcon;
  sections: MenuSection[];
};

export const MENUS: readonly Menu[] = [
  {
    slug: "pizza",
    title: "Pizza Menu",
    summary: "Wood-fired classics and seasonal toppings, served at the Veranda and poolside.",
    intro:
      "Fired in the Veranda's wood oven and carried straight to the table -classics kept honest, plus a handful of island twists you will not find anywhere else on the estate.",
    servedAt: "The Veranda · Poolside deck",
    unit: "pizzas",
    image: unsplash("photo-1513104890138-7c749659a591"),
    imageAlt: "Wood-fired pizza fresh from the oven",
    icon: Pizza,
    sections: [
      {
        name: "The classics",
        items: [
          {
            name: "Margherita",
            description: "San Marzano tomato, fior di latte, basil",
            price: 420,
            image: unsplash("photo-1574071318508-1cdbab80d002"),
            imageAlt: "Wood-fired Margherita pizza with basil leaves",
          },
          {
            name: "Marinara",
            description: "Tomato, garlic, oregano, extra virgin olive oil",
            image: unsplash("photo-1574071318508-1cdbab80d002"),
            price: 380,
          },
          { name: "Napoletana", description: "Anchovy, caper, black olive, tomato", price: 490 },
          {
            name: "Quattro Formaggi",
            description: "Fior di latte, gorgonzola, parmesan, goat's cheese",
            price: 560,
          },
          {
            name: "Prosciutto e Rucola",
            description: "Parma ham, rocket, shaved parmesan",
            price: 620,
          },
          {
            name: "Funghi",
            description: "Field mushroom, thyme, garlic cream, mozzarella",
            price: 520,
          },
        ],
      },
      {
        name: "Signature",
        items: [
          {
            name: "Gymkhana",
            description: "Smoked marlin, red onion, crème fraîche, lime",
            price: 690,
          },
          {
            name: "Vindaye",
            description: "Chicken vindaye, mustard seed, curry leaf, mozzarella",
            price: 640,
            image: unsplash("photo-1565299624946-b28f40a0ae38"),
            imageAlt: "Pizza topped with chicken, red onion and coriander",
          },
          {
            name: "Prawn & Chilli",
            description: "Tiger prawn, bird's eye chilli, garlic, coriander",
            price: 720,
          },
          {
            name: "Vacoas Garden",
            description: "Grilled aubergine, courgette, roast pepper, goat's cheese",
            price: 560,
          },
          {
            name: "Boeuf Bourguignon",
            description: "Slow-braised beef, caramelised onion, gruyère",
            price: 680,
          },
        ],
      },
      {
        name: "Sweet",
        items: [
          { name: "Nutella & Banana", description: "Folded calzone, icing sugar", price: 380 },
          {
            name: "Pineapple & Cinnamon",
            description: "Victoria pineapple, honey, mascarpone",
            price: 360,
          },
        ],
      },
    ],
  },
  {
    slug: "restaurant",
    title: "Restaurant Menu",
    summary: "The Brasserie's seasonal Mauritian and continental dishes, for lunch and dinner.",
    intro:
      "The Brasserie's à la carte -Mauritian cooking and continental technique, written around the produce arriving at the kitchen door each morning.",
    servedAt: "The Brasserie",
    unit: "dishes",
    image: unsplash("photo-1517248135467-4c7edcad34c4"),
    imageAlt: "Plated fine dining dish on a linen-set table",
    icon: ChefHat,
    sections: [
      {
        name: "To begin",
        items: [
          {
            name: "Palm heart salad",
            description: "Coeur de palmiste, lime, toasted coconut",
            price: 480,
          },
          {
            name: "Octopus salad",
            description: "Ourite, red onion, coriander, chilli oil",
            price: 520,
          },
          {
            name: "Smoked marlin",
            description: "Estate-smoked, crème fraîche, rye toast",
            price: 560,
          },
          {
            name: "Pumpkin velouté",
            description: "Roast pumpkin, curry leaf oil, crème fraîche",
            price: 380,
          },
          {
            name: "Gâteaux piments",
            description: "Split pea fritters, tamarind chutney",
            price: 280,
          },
          {
            name: "Prawn cocktail",
            description: "Tiger prawn, avocado, cocktail sauce",
            price: 590,
          },
        ],
      },
      {
        name: "From the sea",
        items: [
          {
            name: "Grilled dorade",
            description: "Whole dorade, creole sauce, sautéed greens",
            price: 890,
          },
          {
            name: "Kingfish rougaille",
            description: "Seared kingfish, tomato rougaille, steamed rice",
            price: 850,
          },
          {
            name: "Camarons à l'ail",
            description: "Freshwater prawns, garlic butter, herb rice",
            price: 1150,
            image: unsplash("photo-1559847844-5315695dadae"),
            imageAlt: "Prawns in creole sauce served with rice",
          },
          {
            name: "Calamari à la creole",
            description: "Braised squid, thyme, tomato, rice",
            price: 780,
          },
          {
            name: "Fish of the day",
            description: "Landed that morning -ask your server",
            price: 950,
          },
        ],
      },
      {
        name: "From the land",
        items: [
          {
            name: "Beef daube",
            description: "Slow-braised beef, red wine, potato purée",
            price: 880,
          },
          {
            name: "Chicken vindaye",
            description: "Mustard seed, turmeric, ginger, steamed rice",
            price: 720,
          },
          {
            name: "Venison civet",
            description: "Mauritian deer, juniper, root vegetables",
            price: 980,
          },
          {
            name: "Roast leg of lamb",
            description: "Rosemary jus, gratin dauphinois",
            price: 1050,
          },
          {
            name: "Sunday roast",
            description: "Sundays only -seasonal vegetables, Yorkshire pudding",
            price: 890,
          },
          {
            name: "Vegetable curry",
            description: "Seasonal island vegetables, coconut, roti",
            price: 620,
          },
        ],
      },
      {
        name: "To finish",
        items: [
          {
            name: "Coconut blancmange",
            description: "Fresh coconut, passion fruit coulis",
            price: 340,
          },
          { name: "Gâteau patate", description: "Sweet potato, coconut, cardamom", price: 290 },
          {
            name: "Tarte tatin",
            description: "Caramelised apple, vanilla crème fraîche",
            price: 380,
            image: unsplash("photo-1568571780765-9276ac8b75a2"),
            imageAlt: "Slice of caramelised apple tart",
          },
          {
            name: "Crème caramel",
            description: "The Brasserie's, unchanged since 1979",
            price: 320,
          },
          { name: "Lime tart", description: "Torched meringue, shortcrust", price: 360 },
        ],
      },
    ],
  },
  {
    slug: "wine-list",
    title: "Wine List",
    summary: "Old World labels alongside a growing selection from the Cape and Australia.",
    intro:
      "A cellar built around Bordeaux and Burgundy, opened up over the last decade to South Africa, Australia and New Zealand. Prices are per bottle; a rotating selection is poured by the glass.",
    servedAt: "All venues",
    unit: "bottles",
    image: unsplash("photo-1510812431401-41d2bd2722f3"),
    imageAlt: "Bottles of wine resting in a cellar rack",
    icon: Wine,
    sections: [
      {
        name: "Champagne & sparkling",
        items: [
          { name: "Moët & Chandon Brut Impérial", description: "Champagne, France", price: 4800 },
          { name: "Veuve Clicquot Yellow Label", description: "Champagne, France", price: 5600 },
          { name: "Graham Beck Brut", description: "Western Cape, South Africa", price: 1900 },
          { name: "Prosecco di Valdobbiadene", description: "Veneto, Italy", price: 1650 },
        ],
      },
      {
        name: "White",
        items: [
          {
            name: "Sancerre, Domaine Vacheron",
            description: "Loire, France",
            price: 3200,
            image: unsplash("photo-1558346489-19413928158b"),
            imageAlt: "Two glasses of white wine raised in a toast",
          },
          { name: "Chablis 1er Cru", description: "Burgundy, France", price: 3900 },
          { name: "Pouilly-Fumé", description: "Loire, France", price: 2800 },
          {
            name: "Cloudy Bay Sauvignon Blanc",
            description: "Marlborough, New Zealand",
            price: 3100,
          },
          { name: "Boschendal Chardonnay", description: "Franschhoek, South Africa", price: 1750 },
          { name: "Pinot Grigio, Alto Adige", description: "Trentino, Italy", price: 1550 },
        ],
      },
      {
        name: "Rosé",
        items: [
          {
            name: "Whispering Angel",
            description: "Côtes de Provence, France",
            price: 2400,
            image: unsplash("photo-1558001373-7b93ee48ffa0"),
            imageAlt: "Rows of rosé wine glasses garnished with strawberries",
          },
          { name: "Domaine Ott By.Ott", description: "Provence, France", price: 2900 },
          { name: "Delheim Pinotage Rosé", description: "Stellenbosch, South Africa", price: 1350 },
        ],
      },
      {
        name: "Red",
        items: [
          {
            name: "Château Cantemerle",
            description: "Haut-Médoc, Bordeaux",
            price: 4200,
            image: unsplash("photo-1553361371-9b22f78e8b1d"),
            imageAlt: "Red wine poured into a glass beside a carving board",
          },
          { name: "Saint-Émilion Grand Cru", description: "Bordeaux, France", price: 3800 },
          { name: "Gevrey-Chambertin", description: "Burgundy, France", price: 5200 },
          { name: "Châteauneuf-du-Pape", description: "Rhône, France", price: 3600 },
          { name: "Kanonkop Pinotage", description: "Stellenbosch, South Africa", price: 2600 },
          { name: "Penfolds Bin 389", description: "South Australia", price: 3400 },
          { name: "Chianti Classico Riserva", description: "Tuscany, Italy", price: 2200 },
        ],
      },
      {
        name: "Dessert & fortified",
        items: [
          {
            name: "Sauternes, Château Rieussec",
            description: "Bordeaux, France · 375ml",
            price: 3100,
          },
          {
            name: "Taylor's 10 Year Tawny",
            description: "Douro, Portugal",
            price: 2400,
            image: unsplash("photo-1516594915697-87eb3b1c14ea"),
            imageAlt: "Row of wine bottles resting on a cellar shelf",
          },
          {
            name: "Vin de Constance",
            description: "Constantia, South Africa · 500ml",
            price: 3800,
          },
        ],
      },
    ],
  },
  {
    slug: "deck",
    title: "Deck Menu",
    summary: "Light bites and grills served poolside through the afternoon.",
    intro:
      "Poolside eating, kept deliberately simple -things you can order in a swimsuit and eat with one hand, from midday until the sun goes off the deck.",
    servedAt: "Poolside deck · 11:00–18:00",
    unit: "items",
    image: unsplash("photo-1530062845289-9109b2c9c868"),
    imageAlt: "Poolside deck tables under palm trees",
    icon: Waves,
    sections: [
      {
        name: "Light bites",
        items: [
          {
            name: "Gâteaux piments",
            description: "Split pea fritters, tamarind chutney",
            price: 240,
          },
          { name: "Samoussas", description: "Vegetable or chicken, mint chutney", price: 260 },
          { name: "Salt & pepper calamari", description: "Lime aioli", price: 480 },
          { name: "Chicken wings", description: "Honey and chilli glaze", price: 420 },
          {
            name: "Loaded fries",
            description: "Cheddar, spring onion, smoked paprika",
            price: 380,
          },
          {
            name: "Green papaya salad",
            description: "Peanut, lime, bird's eye chilli",
            price: 340,
          },
        ],
      },
      {
        name: "From the grill",
        items: [
          {
            name: "Club burger",
            description: "Beef patty, cheddar, pickles, fries",
            price: 650,
            image: unsplash("photo-1568901346375-23c9450c58cd"),
            imageAlt: "Beef burger with cheddar, pickles and salad",
          },
          { name: "Chicken burger", description: "Grilled breast, avocado, fries", price: 590 },
          { name: "Prawn skewers", description: "Garlic butter, lemon, salad", price: 780 },
          { name: "Fish brochette", description: "Catch of the day, creole marinade", price: 720 },
          {
            name: "Grilled vegetable wrap",
            description: "Halloumi, roast pepper, hummus",
            price: 480,
          },
        ],
      },
      {
        name: "Cold drinks",
        items: [
          { name: "Fresh coconut", description: "Served in the shell", price: 180 },
          { name: "Pineapple & mint juice", description: "Pressed to order", price: 220 },
          { name: "Mango lassi", description: "Yoghurt, cardamom", price: 240 },
          { name: "Iced rooibos", description: "Lemon, honey", price: 190 },
          { name: "Phoenix draught", description: "Local lager, 500ml", price: 260 },
          {
            name: "Rum punch",
            description: "Island rum, lime, cane syrup",
            price: 320,
            image: unsplash("photo-1513558161293-cdaf765ed2fd"),
            imageAlt: "Tall glass of rum punch with lime and mint",
          },
        ],
      },
    ],
  },
] as const;

/** Total dishes across every section -the count shown on each menu card. */
export function menuItemCount(menu: Menu): number {
  return menu.sections.reduce((n, s) => n + s.items.length, 0);
}

export function getMenu(slug: string): Menu | undefined {
  return MENUS.find((m) => m.slug === slug);
}

export function menuPath(slug: string): string {
  return `/dining/menus/${slug}`;
}

/** Rs 1 150 -grouped with a thin space, the local convention. */
export function formatPrice(price: number): string {
  return `Rs ${price.toLocaleString("en-GB").replace(/,/g, " ")}`;
}
