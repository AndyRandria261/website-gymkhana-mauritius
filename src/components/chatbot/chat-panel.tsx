import { forwardRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { ChatMessage, QuickReply } from "@/lib/chatbot/types";
import { ChatHeader } from "./chat-header";
import { ChatMessageList } from "./chat-message-list";
import { ChatInputRow } from "./chat-input-row";

/** Lock body scroll on the mobile full-screen layout only. */
function useMobileScrollLock() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(max-width: 639px)").matches) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
}

export const ChatPanel = forwardRef<
  HTMLDivElement,
  {
    messages: ChatMessage[];
    isTyping: boolean;
    onClose: () => void;
    onReset: () => void;
    onSend: (text: string) => void;
    onQuickReply: (reply: QuickReply) => void;
  }
>(function ChatPanel({ messages, isTyping, onClose, onReset, onSend, onQuickReply }, ref) {
  const reduce = useReducedMotion();
  useMobileScrollLock();

  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      aria-label="MGC AI Assistant chat"
      initial={{ opacity: 0, y: reduce ? 0 : 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduce ? 0 : 16 }}
      transition={{ duration: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-cream shadow-2xl outline-none sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[560px] sm:max-h-[calc(100vh-8rem)] sm:w-[380px] sm:rounded-lg sm:ring-1 sm:ring-pine/15"
    >
      <ChatHeader onClose={onClose} onReset={onReset} />
      <ChatMessageList messages={messages} isTyping={isTyping} onQuickReply={onQuickReply} />
      <ChatInputRow onSend={onSend} />
    </motion.div>
  );
});
