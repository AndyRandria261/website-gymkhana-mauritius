import type { QuickReply } from "@/lib/chatbot/types";

/**
 * Pill chips that ask the bot another question. Deliberately styled unlike
 * ActionButton (rounded-full, ring-only) so they read as "ask the bot" rather
 * than "navigate away".
 */
export function ChatQuickReplies({
  replies,
  onSelect,
}: {
  replies: QuickReply[];
  onSelect: (reply: QuickReply) => void;
}) {
  if (replies.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {replies.map((reply) => (
        <button
          key={reply.id}
          type="button"
          onClick={() => onSelect(reply)}
          className="rounded-full px-3 py-1.5 text-xs font-medium text-pine ring-1 ring-pine/25 transition-colors hover:bg-pine/5 hover:ring-pine/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {reply.label}
        </button>
      ))}
    </div>
  );
}
