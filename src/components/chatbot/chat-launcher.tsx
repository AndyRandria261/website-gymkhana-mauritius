import { forwardRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { BOT_NAME } from "@/lib/chatbot/constants";

export const ChatLauncher = forwardRef<HTMLButtonElement, { isOpen: boolean; onClick: () => void }>(
  function ChatLauncher({ isOpen, onClick }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label={isOpen ? "Close chat" : `Open ${BOT_NAME} chat`}
        aria-expanded={isOpen}
        className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-pine text-cream shadow-[0_12px_32px_-12px_rgba(27,67,50,0.6)] ring-1 ring-pine/20 transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-pine-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        {isOpen ? (
          <X className="size-6" strokeWidth={2} />
        ) : (
          <MessageCircle className="size-6" strokeWidth={2} />
        )}
      </button>
    );
  },
);
