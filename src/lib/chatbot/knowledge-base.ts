import { SPORTS, FEATURED_SPORTS } from "@/lib/sports-data";
import { VENUES, MENUS, formatPrice, getMenu, menuPath } from "@/lib/dining-data";
import { CLUB_PHONES, CLUB_EMAILS, CLUB_ADDRESS } from "@/lib/club-contact";
import type { BotResponse, Intent } from "./types";
import { BOT_NAME, TOPIC_QUICK_REPLIES } from "./constants";
import {
  OPENING_HOURS,
  MEMBERSHIP_CATEGORIES,
  VENUE_HIRE_SPACES,
  FOUNDING_HIGHLIGHTS,
} from "./mock-facts";

export const FALLBACK_RESPONSE: BotResponse = {
  text: "I didn't quite catch that — I'm a preview assistant answering from what's on the site. Try one of these topics, or ask about our sports, dining, membership or opening hours.",
  quickReplies: TOPIC_QUICK_REPLIES,
};

/** Per-sport synonym sets, keyed by slug. Kept separate from the generated response text. */
const SPORT_KEYWORDS: Record<string, { primary: string[]; keywords: string[] }> = {
  golf: {
    primary: ["golf", "tee time", "green fee", "18 holes", "golf course"],
    keywords: ["par", "handicap", "caddy", "fairway", "round"],
  },
  tennis: {
    primary: ["tennis", "grass court", "grass courts"],
    keywords: ["court", "racket", "racquet", "wimbledon", "clay"],
  },
  squash: {
    primary: ["squash"],
    keywords: ["court", "racket", "racquet", "glass"],
  },
  paddle: {
    primary: ["paddle", "padel"],
    keywords: ["doubles", "court", "racket", "racquet"],
  },
  yoga: {
    primary: ["yoga", "vinyasa", "hatha"],
    keywords: ["stretch", "mat", "wellness", "flow", "meditation"],
  },
  taichi: {
    primary: ["tai chi", "taichi"],
    keywords: ["balance", "breathing", "flow", "calm"],
  },
  zumba: {
    primary: ["zumba"],
    keywords: ["dance", "cardio", "fitness", "latin"],
  },
  bollywood: {
    primary: ["bollywood", "bollywood dance"],
    keywords: ["dance", "choreography", "rhythm"],
  },
  football: {
    primary: ["football", "soccer", "footfive", "five a side", "six a side"],
    keywords: ["pitch", "match", "kickabout", "team"],
  },
  fitness: {
    primary: ["gym", "fitness", "workout"],
    keywords: ["cardio", "strength", "weights", "training", "exercise"],
  },
  pool: {
    primary: ["swimming", "swim", "pool"],
    keywords: ["laps", "lessons", "water", "poolside"],
  },
};

/** One intent per sport, generated from SPORTS; only the synonym sets are hand-authored. */
const sportIntents: Intent[] = SPORTS.map((sport) => {
  const kw = SPORT_KEYWORDS[sport.slug] ?? {
    primary: [sport.navLabel.toLowerCase()],
    keywords: [],
  };
  return {
    id: `sport_${sport.slug}`,
    primary: kw.primary,
    keywords: kw.keywords,
    response: {
      text: `${sport.title} — ${sport.tagline} (${sport.stat.value} ${sport.stat.label}.)`,
      actions: [{ to: sport.path, label: sport.cta, variant: "gold" }],
    },
  };
});

const membershipList = MEMBERSHIP_CATEGORIES.map((c) => `${c.name} (${c.tagline})`).join("; ");

const venueHireList = VENUE_HIRE_SPACES.map((v) => `${v.title} — ${v.capacity}`).join("; ");

const diningVenueList = VENUES.map((v) => v.title).join(", ");

/** 2-3 representative dishes with live prices, pulled from the restaurant menu. */
const restaurantMenu = getMenu("restaurant");
const sampleDishes = restaurantMenu
  ? restaurantMenu.sections
      .flatMap((s) => s.items)
      .filter((i) => typeof i.price === "number")
      .slice(0, 3)
      .map((i) => `${i.name} (${formatPrice(i.price!)})`)
      .join(", ")
  : "";

/**
 * Intents authored most-specific-first. `booking_deflection` is declared before
 * the per-sport intents so a booking-shaped phrase resolves to the honest
 * deflection rather than an informational answer.
 */
export const INTENTS: readonly Intent[] = [
  {
    id: "greeting",
    primary: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
    keywords: ["greetings", "hiya", "bonjour"],
    response: {
      text: `Welcome to the Mauritius Gymkhana Club. I'm the ${BOT_NAME} — a preview assistant. How can I help? You can ask about membership, our sports, dining, events or how to reach us.`,
      quickReplies: TOPIC_QUICK_REPLIES,
    },
  },
  {
    id: "booking_deflection",
    primary: [
      "book a court",
      "book a table",
      "reserve a table",
      "make a booking",
      "make a reservation",
      "book me",
      "can you book",
      "reserve a court",
      "tee time booking",
    ],
    keywords: ["book", "booking", "reserve", "reservation", "confirm"],
    response: {
      text: "I'm a preview assistant, so I can't complete a booking or reservation here. But I can point you straight to the right place — the team will confirm within a day.",
      actions: [
        { href: "/contact?subject=golf", label: "Golf enquiry", variant: "pine" },
        { href: "/contact?subject=dining", label: "Dining reservation", variant: "pine" },
        { to: "/venue-hire", label: "Venue hire", variant: "pine" },
        { to: "/membership", label: "Membership", variant: "pine" },
      ],
    },
  },
  {
    id: "hours",
    primary: ["opening hours", "opening times", "what time", "are you open", "when are you open"],
    keywords: ["hours", "open", "close", "closing", "time", "today"],
    response: {
      text: `We're open ${OPENING_HOURS.days}, ${OPENING_HOURS.hours}. ${OPENING_HOURS.closed}.`,
      actions: [{ to: "/contact", label: "Contact & directions", variant: "gold" }],
    },
  },
  {
    id: "location",
    primary: ["where are you", "address", "directions", "how to get there", "location"],
    keywords: ["located", "find you", "map", "vacoas", "suffolk"],
    response: {
      text: `You'll find us at ${CLUB_ADDRESS.full}. There's a map and directions on our contact page.`,
      actions: [{ to: "/contact", label: "Map & directions", variant: "gold" }],
    },
  },
  {
    id: "membership_overview",
    primary: ["membership", "become a member", "join the club", "how to join", "join"],
    keywords: ["member", "members", "apply", "categories", "fees"],
    response: {
      text: `We offer three ways to belong: ${membershipList}. Fees are shared during the enquiry process.`,
      actions: [{ to: "/membership", label: "Explore membership", variant: "gold" }],
      quickReplies: [
        { id: "qr-apply", label: "How to apply", intentId: "membership_apply" },
        { id: "qr-reciprocal", label: "Reciprocal clubs", intentId: "membership_reciprocal" },
      ],
    },
  },
  {
    id: "membership_apply",
    primary: ["how do i apply", "application process", "how to apply", "apply for membership"],
    keywords: ["apply", "application", "process", "proposer", "steps"],
    response: {
      text: "Membership is by proposition: submit the enquiry form, our secretary contacts you within 5 working days to arrange a visit, you tour the estate and meet the committee, then a formal application with two member proposers goes to the next committee meeting.",
      actions: [{ to: "/membership", label: "Start your enquiry", variant: "gold" }],
    },
  },
  {
    id: "membership_reciprocal",
    primary: ["reciprocal", "reciprocal clubs", "affiliated clubs"],
    keywords: ["worldwide", "overseas", "travel", "abroad", "partner"],
    response: {
      text: "Members enjoy reciprocal access to a network of clubs around the world when they travel.",
      actions: [{ to: "/membership/reciprocal", label: "See reciprocal clubs", variant: "gold" }],
    },
  },
  ...sportIntents,
  {
    id: "sports_overview",
    primary: ["what sports", "which sports", "sports", "activities", "facilities"],
    keywords: ["sport", "play", "disciplines", "gym", "courts"],
    response: {
      text: `We offer ${SPORTS.length} disciplines across the estate — from championship golf and grass tennis to yoga, football and swimming. A few favourites: ${FEATURED_SPORTS.map((s) => s.navLabel).join(", ")}.`,
      actions: [{ to: "/sports", label: "All sports", variant: "gold" }],
      quickReplies: [
        { id: "qr-golf", label: "Golf", intentId: "sport_golf" },
        { id: "qr-tennis", label: "Tennis", intentId: "sport_tennis" },
        { id: "qr-fitness", label: "Fitness", intentId: "sport_fitness" },
      ],
    },
  },
  {
    id: "dining_overview",
    primary: ["dining", "restaurant", "where to eat", "food", "eat"],
    keywords: ["dine", "lunch", "dinner", "breakfast", "brasserie", "bar", "veranda"],
    response: {
      text: `The club has four dining spaces: ${diningVenueList}. From long lunches at the Brasserie to poolside bites and evenings by the fireplace.`,
      actions: [{ to: "/dining", label: "Explore dining", variant: "gold" }],
      quickReplies: [
        { id: "qr-menus", label: "See the menus", intentId: "dining_menus" },
        { id: "qr-reserve", label: "Reserve a table", intentId: "booking_deflection" },
      ],
    },
  },
  {
    id: "dining_menus",
    primary: ["menu", "menus", "wine list", "how much", "prices"],
    keywords: ["price", "pizza", "dishes", "drinks", "cost", "deck"],
    response: {
      text: sampleDishes
        ? `A taste of the Brasserie: ${sampleDishes}. We also have pizza, a poolside deck menu and a full wine list.`
        : "We have a full à la carte restaurant menu, wood-fired pizzas, a poolside deck menu and a wine list.",
      actions: MENUS.map((m) => ({
        to: menuPath(m.slug),
        label: m.title,
        variant: "gold" as const,
      })),
    },
  },
  {
    id: "venue_hire",
    primary: ["venue hire", "hire a venue", "conference room", "private event", "corporate event"],
    keywords: ["venue", "hall", "hire", "wedding", "gala", "meeting", "event"],
    response: {
      text: `We hire out historic spaces for private and corporate events: ${venueHireList}. Our events team builds a bespoke proposal within 48 hours.`,
      actions: [{ href: "/venue-hire#quote", label: "Request a proposal", variant: "gold" }],
    },
  },
  {
    id: "events_teaser",
    primary: ["events", "what's on", "whats on", "calendar", "tournaments"],
    keywords: ["event", "fixture", "tournament", "social", "dinner", "medal"],
    response: {
      text: "Members enjoy a full calendar of tournaments, dinners and social evenings throughout the year. The events page always has the current dates.",
      actions: [{ to: "/events", label: "See what's on", variant: "gold" }],
    },
  },
  {
    id: "club_history",
    primary: ["history", "founded", "how old", "since when", "heritage"],
    keywords: ["old", "oldest", "1849", "1844", "story", "past"],
    response: {
      text: `The club dates to ${FOUNDING_HIGHLIGHTS.clubFounded}, with the golf course laid out in ${FOUNDING_HIGHLIGHTS.golfLaidOut} — the oldest in the Southern Hemisphere — and the Indian Ocean's only grass tennis courts added in the ${FOUNDING_HIGHLIGHTS.grassTennis}.`,
      actions: [{ to: "/the-club/history", label: "Our history", variant: "gold" }],
    },
  },
  {
    id: "contact_info",
    primary: ["phone number", "phone", "email", "call you", "contact", "get in touch"],
    keywords: ["telephone", "reach", "number", "mail", "enquiry"],
    response: {
      text: `You can reach the main office on ${CLUB_PHONES.mainOffice} or email ${CLUB_EMAILS.info}. For membership, write to ${CLUB_EMAILS.membership}.`,
      actions: [{ to: "/contact", label: "Contact us", variant: "gold" }],
    },
  },
  {
    id: "gallery",
    primary: ["gallery", "photos", "pictures", "images"],
    keywords: ["photo", "album", "see the club"],
    response: {
      text: "Our gallery has photographs of the estate, the course and club life across the seasons.",
      actions: [{ to: "/gallery", label: "View the gallery", variant: "gold" }],
    },
  },
  {
    id: "news",
    primary: ["news", "latest news", "announcements", "updates"],
    keywords: ["update", "announcement", "bulletin"],
    response: {
      text: "The latest club news and announcements are posted on our news page.",
      actions: [{ to: "/news", label: "Read the news", variant: "gold" }],
    },
  },
  {
    id: "careers",
    primary: ["careers", "jobs", "vacancies", "work here", "hiring"],
    keywords: ["job", "vacancy", "employment", "recruit"],
    response: {
      text: "Current openings and how to apply are listed on our careers page.",
      actions: [{ to: "/the-club/careers", label: "See careers", variant: "gold" }],
    },
  },
];
