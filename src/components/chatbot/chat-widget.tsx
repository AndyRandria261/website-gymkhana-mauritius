import { useEffect, useRef } from "react";
import { AnimatePresence } from "motion/react";
import { useChatbot } from "@/lib/chatbot/use-chatbot";
import { ChatLauncher } from "./chat-launcher";
import { ChatPanel } from "./chat-panel";

export function ChatWidget() {
  const {
    isOpen,
    messages,
    isTyping,
    close,
    toggle,
    sendMessage,
    selectQuickReply,
    resetConversation,
  } = useChatbot();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Escape closes the panel (active only while open), matching site-header.tsx.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // On open, move focus into the panel (not the input, to avoid popping the
  // mobile keyboard). On close, return focus to the launcher.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (isOpen) {
      panelRef.current?.focus();
    } else if (wasOpen.current) {
      launcherRef.current?.focus();
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  return (
    <>
      <ChatLauncher ref={launcherRef} isOpen={isOpen} onClick={toggle} />
      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            ref={panelRef}
            messages={messages}
            isTyping={isTyping}
            onClose={close}
            onReset={resetConversation}
            onSend={sendMessage}
            onQuickReply={selectQuickReply}
          />
        )}
      </AnimatePresence>
    </>
  );
}
