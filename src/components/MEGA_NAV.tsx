import { SPORT_GROUPS, SPORTS, sportsByGroup } from "@/lib/sports-data";

export type LeafLink = { to: string; label: string; description?: string };
export type MegaColumn = { heading: string; links: LeafLink[] };
export type MegaSection = {
  key: string;
  label: string;
  /** Landing route for the "meta" header link */
  to: string;
  /** Featured card on the left of the panel */
  feature: {
    to: string;
    overline: string;
    title: string;
    body: string;
    image: string;
  };
  columns: MegaColumn[];
};

// The Sports columns are generated from the single sports-data source so the
// menu never drifts out of sync with the pages. Grouped into three balanced
// columns, with an "All sports" catch-all appended to the last.
const SPORTS_COLUMNS: MegaColumn[] = SPORT_GROUPS.map((g) => ({
  heading: g.heading,
  links: sportsByGroup(g.key).map((s) => ({
    to: s.path,
    label: s.navLabel,
    description: s.megaShort,
  })),
}));
SPORTS_COLUMNS[SPORTS_COLUMNS.length - 1]!.links.push({
  to: "/sports",
  label: "All sports",
  description: `${SPORTS.length} disciplines, one estate`,
});

export const MEGA_NAV: MegaSection[] = [
  {
    key: "club",
    label: "The Club",
    to: "/the-club/history",
    feature: {
      to: "/the-club/history",
      overline: "Since 1849",
      title: "180 years of Mauritian sport",
      body: "The oldest golf course of the Southern Hemisphere and the beating heart of Vacoas life.",
      image: "/mcg-logo.png",
    },
    columns: [
      {
        heading: "Our Heritage",
        links: [
          { to: "/the-club/history", label: "History", description: "1844 to today" },
          { to: "/the-club/committee", label: "Committee", description: "Elected officers & board" },
          { to: "/the-club/rules", label: "Rules & Bylaws", description: "House rules and dress code" },
        ],
      },
      {
        heading: "Working with us",
        links: [
          { to: "/the-club/careers", label: "Careers", description: "Join the team" },
          { to: "/the-club/procurement", label: "Procurement", description: "Open tenders" },
        ],
      },
    ],
  },
  {
    key: "sports",
    label: "Sports",
    to: "/sports",
    feature: {
      to: "/sports/golf",
      overline: "Championship · 18 holes",
      title: "The 1844 Course",
      body: "Play the oldest golf course of the Southern Hemisphere at the foot of the Corps de Garde.",
      image: "/mcg-logo.png",
    },
    columns: SPORTS_COLUMNS,
  },
  {
    key: "dining",
    label: "Dining & Venues",
    to: "/dining",
    feature: {
      to: "/dining",
      overline: "Refined island dining",
      title: "From veranda to Brasserie",
      body: "Mauritian flavours and continental tradition, served under the shutters of the estate.",
      image: "/mcg-logo.png",
    },
    columns: [
      {
        heading: "At the table",
        links: [
          { to: "/dining", label: "Dining", description: "Venues & opening hours" },
          {
            to: "/dining/menus/restaurant",
            label: "Restaurant Menu",
            description: "The Brasserie, à la carte",
          },
          { to: "/dining/menus/wine-list", label: "Wine List", description: "Cellar, by the bottle" },
          { to: "/events", label: "Club Events", description: "Tournaments & socials" },
        ],
      },
      {
        heading: "Host with us",
        links: [
          { to: "/venue-hire", label: "Venue Hire", description: "Weddings · galas · corporate" },
          { to: "/gallery", label: "Gallery", description: "See past events" },
        ],
      },
    ],
  },
  {
    key: "membership",
    label: "Membership",
    to: "/membership",
    feature: {
      to: "/membership",
      overline: "Applications open",
      title: "Become a Member",
      body: "Join a community that values heritage, sportsmanship and the quiet luxury of the MGC.",
      image: "/mcg-logo.png",
    },
    columns: [
      {
        heading: "Join the Club",
        links: [
          { to: "/membership", label: "Membership overview", description: "Categories & fees" },
          { to: "/membership/reciprocal", label: "Reciprocal Clubs", description: "Global partner clubs" },
        ],
      },
      {
        heading: "Stay in touch",
        links: [
          { to: "/news", label: "News", description: "From the estate" },
        ],
      },
    ],
  },
];
