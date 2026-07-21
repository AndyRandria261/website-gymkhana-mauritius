import type { Intent, MatchResult } from "./types";
import { CONFIDENCE_THRESHOLD } from "./constants";

const PRIMARY_WEIGHT = 3;
const KEYWORD_WEIGHT = 1;

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * A multi-word entry matches as a substring of the normalized string (safe for
 * phrases); a single-word entry must be an exact token so "par" can't match
 * inside "party".
 */
function entryHits(entry: string, normalized: string, tokens: Set<string>): boolean {
  const e = normalize(entry);
  if (!e) return false;
  if (e.includes(" ")) return normalized.includes(e);
  return tokens.has(e);
}

function scoreIntent(intent: Intent, normalized: string, tokens: Set<string>): number {
  let score = 0;
  for (const entry of intent.primary) {
    if (entryHits(entry, normalized, tokens)) score += PRIMARY_WEIGHT;
  }
  for (const entry of intent.keywords) {
    if (entryHits(entry, normalized, tokens)) score += KEYWORD_WEIGHT;
  }
  return score;
}

/**
 * Pick the best-matching intent for a free-text input. Highest score wins;
 * on a tie the first-declared intent wins, so author `intents`
 * most-specific-first. Returns `confident: false` when nothing clears the
 * threshold, so the caller can fall back.
 */
export function matchIntent(input: string, intents: readonly Intent[]): MatchResult {
  const normalized = normalize(input);
  const tokens = new Set(normalized ? normalized.split(" ") : []);

  let best: Intent | null = null;
  let bestScore = 0;

  for (const intent of intents) {
    const score = scoreIntent(intent, normalized, tokens);
    if (score > bestScore) {
      bestScore = score;
      best = intent;
    }
  }

  const confident = bestScore >= CONFIDENCE_THRESHOLD;
  return { intent: confident ? best : null, score: bestScore, confident };
}
