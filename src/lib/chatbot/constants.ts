import type { QuickReply } from "./types";

export const BOT_NAME = "MGC MGC AI Assistant chat";
export const BOT_TAGLINE = "Preview assistant · answers based on current site content";

/**
 * A reply is treated as confident (not sent to fallback) at this score or
 * above. One primary hit scores 3; two supporting keywords score 2.
 */
export const CONFIDENCE_THRESHOLD = 2;

/** The top-level topic chips offered on greeting and after a fallback. */
export const TOPIC_QUICK_REPLIES: QuickReply[] = [
  { id: "qr-membership", label: "Membership", intentId: "membership_overview" },
  { id: "qr-sports", label: "Golf & Sports", intentId: "sports_overview" },
  { id: "qr-dining", label: "Dining", intentId: "dining_overview" },
  { id: "qr-events", label: "Events", intentId: "events_teaser" },
  { id: "qr-venue", label: "Venue Hire", intentId: "venue_hire" },
  { id: "qr-contact", label: "Contact", intentId: "contact_info" },
];
