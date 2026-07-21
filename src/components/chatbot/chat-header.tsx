import { RotateCcw, X } from "lucide-react";
import { BOT_NAME, BOT_TAGLINE } from "@/lib/chatbot/constants";

const iconButtonClass =
  "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export function ChatHeader({ onClose, onReset }: { onClose: () => void; onReset: () => void }) {
  return (
    <div className="flex items-start justify-between gap-3 bg-pine px-5 py-4 text-cream">
      <div>
        <p className="font-serif text-xl leading-tight">{BOT_NAME}</p>
        <p className="mt-0.5 text-[11px] leading-snug text-cream/70">{BOT_TAGLINE}</p>
      </div>
      <div className="-mr-1 flex items-center gap-1">
        <button
          type="button"
          onClick={onReset}
          aria-label="Start new conversation"
          title="Start new conversation"
          className={iconButtonClass}
        >
          <RotateCcw className="size-4" strokeWidth={2.25} />
        </button>
        <button type="button" onClick={onClose} aria-label="Close chat" className={iconButtonClass}>
          <X className="size-4" strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
