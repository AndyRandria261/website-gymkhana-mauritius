/**
 * Hand-copied facts the bot needs that have no shared lib source today. Each
 * export mirrors an inline array in a page component and is NOT a shared source
 * of truth - if the page changes, update the copy here by hand.
 */

/** Mirrors the opening-hours block inline in src/routes/contact.tsx. */
export const OPENING_HOURS = {
  days: "Tuesday to Sunday",
  hours: "06:00–22:00",
  closed: "Closed Mondays (course maintenance)",
} as const;

/** Mirrors the CATEGORIES array inline in src/routes/membership.index.tsx (name + tagline only). */
export const MEMBERSHIP_CATEGORIES = [
  { name: "Full Member", tagline: "Individual, resident in Mauritius" },
  { name: "Family Member", tagline: "Full member + spouse & children under 18" },
  { name: "Corporate Member", tagline: "Named executives from your company" },
] as const;

/** Mirrors the VENUES array inline in src/routes/venue-hire.tsx (title + capacity only). */
export const VENUE_HIRE_SPACES = [
  { title: "Conference Room", capacity: "Up to 20 seated, boardroom style" },
  { title: "Multipurpose Hall", capacity: "Up to 120 seated · 180 standing" },
  { title: "FootFive Pitch", capacity: "Two teams of 5, plus spectators" },
] as const;

/** Mirrors the founding milestones in src/routes/the-club.history.tsx. */
export const FOUNDING_HIGHLIGHTS = {
  golfLaidOut: "1844",
  clubFounded: "1849",
  grassTennis: "1940s",
} as const;
