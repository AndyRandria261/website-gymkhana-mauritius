import { useCallback, useRef, useState } from "react";
import type { BotResponse, ChatMessage, QuickReply } from "./types";
import { INTENTS, FALLBACK_RESPONSE } from "./knowledge-base";
import { matchIntent } from "./matcher";

const TYPING_DELAY_MS = 500;

function newId(): string {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const seededRef = useRef(false);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pushUser = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: newId(), role: "user", text, createdAt: Date.now() }]);
  }, []);

  const pushBot = useCallback((response: BotResponse) => {
    setIsTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: "bot",
          text: response.text,
          actions: response.actions,
          quickReplies: response.quickReplies,
          createdAt: Date.now(),
        },
      ]);
      setIsTyping(false);
    }, TYPING_DELAY_MS);
  }, []);

  const respondTo = useCallback(
    (text: string) => {
      const { intent } = matchIntent(text, INTENTS);
      pushBot(intent ? intent.response : FALLBACK_RESPONSE);
    },
    [pushBot],
  );

  const open = useCallback(() => {
    setIsOpen(true);
    // Seed the greeting on first open only (lazy, never at mount/SSR).
    if (!seededRef.current) {
      seededRef.current = true;
      const greeting = INTENTS.find((i) => i.id === "greeting");
      if (greeting) pushBot(greeting.response);
    }
  }, [pushBot]);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => (isOpen ? close() : open()), [isOpen, open, close]);

  /** Clears the transcript and re-seeds the greeting - lets a visitor start a fresh conversation without reloading the page. */
  const resetConversation = useCallback(() => {
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setIsTyping(false);
    setMessages([]);
    const greeting = INTENTS.find((i) => i.id === "greeting");
    if (greeting) pushBot(greeting.response);
  }, [pushBot]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      pushUser(trimmed);
      respondTo(trimmed);
    },
    [pushUser, respondTo],
  );

  const selectQuickReply = useCallback(
    (reply: QuickReply) => {
      pushUser(reply.label);
      const intent = INTENTS.find((i) => i.id === reply.intentId);
      pushBot(intent ? intent.response : FALLBACK_RESPONSE);
    },
    [pushUser, pushBot],
  );

  return {
    isOpen,
    messages,
    isTyping,
    open,
    close,
    toggle,
    sendMessage,
    selectQuickReply,
    resetConversation,
  };
}
