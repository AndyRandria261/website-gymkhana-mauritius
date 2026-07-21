export type ChatRole = "user" | "bot";

/**
 * A call-to-action rendered under a bot message. Either an in-app route
 * (`to` -> client-side <Link>, keeps the widget mounted) or a raw URL
 * (`href` -> full navigation, for anything with a ?query or #hash).
 */
export type ChatAction = {
  label: string;
  variant?: "gold" | "pine";
} & ({ to: string; href?: never } | { href: string; to?: never });

/** A tappable chip that asks the bot another question (never navigates away). */
export type QuickReply = {
  id: string;
  label: string;
  intentId: string;
};

export type BotResponse = {
  text: string;
  actions?: ChatAction[];
  quickReplies?: QuickReply[];
};

export type ChatMessage = {
  id: string;
  role: ChatRole;
  text: string;
  actions?: ChatAction[];
  quickReplies?: QuickReply[];
  createdAt: number;
};

export type Intent = {
  id: string;
  /** 2-6 confident phrases; a single hit alone identifies the intent (weight 3). */
  primary: string[];
  /** Supporting words, confident only in combination (weight 1). */
  keywords: string[];
  response: BotResponse;
};

export type MatchResult = {
  intent: Intent | null;
  score: number;
  confident: boolean;
};
