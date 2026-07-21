import { useEffect, useRef } from "react";
import type { ChatMessage, QuickReply } from "@/lib/chatbot/types";
import { ChatMessageBubble } from "./chat-message-bubble";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-pine/5 px-4 py-3 ring-1 ring-pine/10 w-fit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full bg-pine/50"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

export function ChatMessageList({
  messages,
  isTyping,
  onQuickReply,
}: {
  messages: ChatMessage[];
  isTyping: boolean;
  onQuickReply: (reply: QuickReply) => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, isTyping]);

  return (
    <div
      role="log"
      aria-live="polite"
      aria-label="Conversation"
      className="flex-1 space-y-5 overflow-y-auto px-4 py-5"
    >
      {messages.map((message) => (
        <ChatMessageBubble key={message.id} message={message} onQuickReply={onQuickReply} />
      ))}
      {isTyping && <TypingIndicator />}
      <div ref={endRef} />
    </div>
  );
}
