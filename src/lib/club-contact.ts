/**
 * Single source of truth for the club's contact details. Every page that
 * shows a phone number, email or address should import from here instead
 * of hardcoding its own copy - that's how the site ended up with two
 * different numbers both labelled "Front desk".
 */
export const CLUB_PHONES = {
  mainOffice: "+230 696 1404",
  caddyMaster: "+230 698 6302",
  frontDesk: "+230 660 1844",
  eventsTeam: "+230 660 1845",
} as const;

export const CLUB_EMAILS = {
  info: "info@mgc.mu",
  membership: "membership@mgc.mu",
  hr: "hr_officer@mgc.mu",
  events: "resto@mgc.mu",
} as const;

export const CLUB_ADDRESS = {
  full: "Suffolk Road, Vacoas 73420, Mauritius",
  line1: "Suffolk Road, Vacoas 73420",
  country: "Mauritius",
  short: "Suffolk Road, Vacoas",
} as const;
