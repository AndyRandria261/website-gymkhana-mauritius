import sportGolf from "@/assets/sport-golf.jpg";
import sportTennis from "@/assets/sport-tennis.png";
import sportSquash from "@/assets/sport-squash.jpg";
import sportFitness from "@/assets/sport-fitness.jpg";
import sportPool from "@/assets/sport-pool.jpg";

/**
 * Single source of truth for the club's sporting disciplines.
 *
 * Every consumer -the header mega-menu, the footer, the home showcase, the
 * /sports index and the sitemap -reads from this list rather than keeping its
 * own copy. Adding or renaming a sport is a one-line change here.
 *
 * The five heritage sports use optimised local assets; the six newer
 * disciplines are sourced from Unsplash (each id has been checked to resolve
 * and match its subject).
 */
export type SportGroup = "court" | "studio" | "active";

export type Sport = {
  slug: string;
  path: string;
  /** Short label for nav, footer and menu. */
  navLabel: string;
  /** Full display title for the showcase cards. */
  title: string;
  overline: string;
  /** One-liner shown under the label in the mega-menu. */
  megaShort: string;
  /** Longer marketing line for the home showcase. */
  tagline: string;
  /** Compact body for the /sports index cards. */
  body: string;
  stat: { value: string; label: string };
  cta: string;
  image: string;
  group: SportGroup;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?w=1400&q=80&auto=format&fit=crop`;

export const SPORTS: readonly Sport[] = [
  {
    slug: "golf",
    path: "/sports/golf",
    navLabel: "Golf",
    title: "Championship Golf",
    overline: "Since 1844 · 18 holes",
    megaShort: "1844 · 18 holes",
    tagline:
      "18 holes woven through 180 years of Mauritian history -the oldest course of the Southern Hemisphere, still played today.",
    body: "The oldest golf course of the Southern Hemisphere, still played today.",
    stat: { value: "1844", label: "Founded" },
    cta: "Explore the course",
    image: sportGolf,
    group: "court",
  },
  {
    slug: "tennis",
    path: "/sports/tennis",
    navLabel: "Tennis",
    title: "Grass Tennis",
    overline: "Only grass courts of the Indian Ocean",
    megaShort: "Grass & hard courts",
    tagline:
      "The only manicured grass courts in the Indian Ocean -a Wimbledon-style bounce, minutes from Curepipe.",
    body: "First courts laid in the 1940s -a signature of the club.",
    stat: { value: "4", label: "Grass courts" },
    cta: "Discover tennis",
    image: sportTennis,
    group: "court",
  },
  {
    slug: "squash",
    path: "/sports/squash",
    navLabel: "Squash",
    title: "Squash",
    overline: "Two dedicated courts",
    megaShort: "Two dedicated courts",
    tagline:
      "Two air-conditioned glass-backed courts with dedicated coaching.",
    body: "Booking system for members, coaching by arrangement.",
    stat: { value: "2", label: "Courts" },
    cta: "See squash",
    image: sportSquash,
    group: "court",
  },
  {
    slug: "paddle",
    path: "/sports/paddle",
    navLabel: "Paddle",
    title: "Paddle",
    overline: "Glass courts · Doubles play",
    megaShort: "Fast, social doubles",
    tagline:
      "The fastest-growing racquet sport in the world -social, easy to learn and endlessly addictive, on enclosed courts.",
    body: "Enclosed courts for fast, sociable doubles -the club's newest racquet discipline.",
    stat: { value: "New", label: "Courts" },
    cta: "Book a court",
    image: unsplash("photo-1554068865-24cecd4e34b8"),
    group: "court",
  },
  {
    slug: "yoga",
    path: "/sports/yoga",
    navLabel: "Yoga",
    title: "Yoga & Wellness",
    overline: "Studio · Mind & body",
    megaShort: "Mat & breath classes",
    tagline:
      "Sunrise flows and restorative sessions in a light-filled studio -breath, balance and stillness above the estate.",
    body: "Vinyasa, Hatha and restorative classes for every level, from sunrise flows to gentle evening sessions.",
    stat: { value: "Daily", label: "Classes" },
    cta: "Find your flow",
    image: unsplash("photo-1506126613408-eca07ce68773"),
    group: "studio",
  },
  {
    slug: "taichi",
    path: "/sports/taichi",
    navLabel: "Tai Chi",
    title: "Tai Chi",
    overline: "Garden · Balance & flow",
    megaShort: "Slow-flow in the garden",
    tagline:
      "Slow, deliberate movement practised in the morning garden -a quiet discipline of balance, breath and calm.",
    body: "Gentle standing forms practised outdoors, cultivating balance, focus and calm.",
    stat: { value: "Dawn", label: "Sessions" },
    cta: "Find your balance",
    image: unsplash("photo-1518241353330-0f7941c2d9b5"),
    group: "studio",
  },
  {
    slug: "zumba",
    path: "/sports/zumba",
    navLabel: "Zumba",
    title: "Zumba",
    overline: "Studio · Dance fitness",
    megaShort: "Dance-fitness cardio",
    tagline:
      "A full-body dance-fitness party -Latin rhythms, big energy and a serious cardio workout that never feels like one.",
    body: "Latin-inspired dance-fitness classes that pack a cardio workout into a party.",
    stat: { value: "High", label: "Energy" },
    cta: "Feel the rhythm",
    image: unsplash("photo-1535525153412-5a42439a210d"),
    group: "studio",
  },
  {
    slug: "bollywood",
    path: "/sports/bollywood",
    navLabel: "Bollywood Dance",
    title: "Bollywood Dance",
    overline: "Studio · Rhythm & colour",
    megaShort: "Choreography & rhythm",
    tagline:
      "High-energy choreography set to the beat of Mumbai -a joyful, expressive class for every generation.",
    body: "Expressive routines blending classical and film-style dance, for all ages and abilities.",
    stat: { value: "All", label: "Levels" },
    cta: "Join the beat",
    image: unsplash("photo-1547153760-18fc86324498"),
    group: "studio",
  },
  {
    slug: "football",
    path: "/sports/football",
    navLabel: "Six-a-side Football",
    title: "Six-a-side Football",
    overline: "Floodlit FootFive pitch",
    megaShort: "Floodlit FootFive pitch",
    tagline:
      "Fast, floodlit six-a-side on the FootFive pitch -weekly fixtures, casual kickabouts and private bookings after dark.",
    body: "Book the floodlit FootFive pitch for six-a-side matches, leagues and evening kickabouts.",
    stat: { value: "6-a-side", label: "Format" },
    cta: "Book the pitch",
    image: unsplash("photo-1431324155629-1a6deb1dec8d"),
    group: "active",
  },
  {
    slug: "fitness",
    path: "/sports/fitness",
    navLabel: "Health & Fitness",
    title: "Health & Fitness",
    overline: "Cardio & strength",
    megaShort: "Cardio · strength",
    tagline: "Full cardio and strength floor, morning to evening access.",
    body: "Modern equipment, morning to evening access.",
    stat: { value: "6am–9pm", label: "Open daily" },
    cta: "Visit the gym",
    image: sportFitness,
    group: "active",
  },
  {
    slug: "pool",
    path: "/sports/pool",
    navLabel: "Swimming",
    title: "Swimming",
    overline: "Outdoor 25 m pool",
    megaShort: "Open year-round",
    tagline: "Outdoor 25-metre heated pool with shaded family lounging.",
    body: "Family-friendly poolside with shaded lounging.",
    stat: { value: "25 m", label: "Heated pool" },
    cta: "See the pool",
    image: sportPool,
    group: "active",
  },
] as const;

export const SPORT_GROUPS: { key: SportGroup; heading: string }[] = [
  { key: "court", heading: "Course & Court" },
  { key: "studio", heading: "Studio & Wellness" },
  { key: "active", heading: "Team, Gym & Water" },
];

export function sportsByGroup(group: SportGroup): Sport[] {
  return SPORTS.filter((s) => s.group === group);
}

/**
 * Curated line-up for the home showcase -a balance of heritage signatures and
 * the newest disciplines. The full eleven live on /sports.
 */
export const FEATURED_SLUGS = ["golf", "tennis", "paddle", "yoga", "football"] as const;

export const FEATURED_SPORTS: readonly Sport[] = FEATURED_SLUGS.map(
  (slug) => SPORTS.find((s) => s.slug === slug)!,
);
