import { ActionButton, actionButtonClass } from "@/components/action-button";
import { cn } from "@/lib/utils";
import type { ChatAction, ChatMessage, QuickReply } from "@/lib/chatbot/types";
import { ChatQuickReplies } from "./chat-quick-replies";

const actionClass = "text-xs px-4 py-2 w-full sm:w-auto";

function BubbleAction({ action }: { action: ChatAction }) {
  // `to` -> client-side Link (widget stays mounted); `href` -> full navigation
  // (used for ?query / #hash targets), mirroring BookingDialog's fallback.
  if (action.to) {
    return (
      <ActionButton to={action.to} variant={action.variant ?? "gold"} className={actionClass}>
        {action.label}
      </ActionButton>
    );
  }
  return (
    <a href={action.href} className={cn(actionButtonClass(action.variant ?? "pine"), actionClass)}>
      {action.label}
    </a>
  );
}

export function ChatMessageBubble({
  message,
  onQuickReply,
}: {
  message: ChatMessage;
  onQuickReply: (reply: QuickReply) => void;
}) {
  const isBot = message.role === "bot";
  return (
    <div className={cn("flex flex-col gap-3", isBot ? "items-start" : "items-end")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-4 py-2.5 text-sm leading-relaxed",
          isBot ? "bg-pine/5 text-ink ring-1 ring-pine/10" : "bg-pine text-cream",
        )}
      >
        {message.text}
      </div>

      {message.actions && message.actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {message.actions.map((action) => (
            <BubbleAction key={action.label} action={action} />
          ))}
        </div>
      )}

      {message.quickReplies && message.quickReplies.length > 0 && (
        <ChatQuickReplies replies={message.quickReplies} onSelect={onQuickReply} />
      )}
    </div>
  );
}
