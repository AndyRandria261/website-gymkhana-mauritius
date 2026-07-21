import { useState } from "react";
import { Send } from "lucide-react";

export function ChatInputRow({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-pine/10 bg-cream px-3 py-3"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask about membership, sports, dining…"
        aria-label="Type your message"
        className="min-w-0 flex-1 rounded-full bg-pine/5 px-4 py-2.5 text-sm text-ink outline-none ring-1 ring-pine/10 placeholder:text-ink/40 focus:ring-pine/30"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        aria-label="Send message"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-pine text-cream transition-colors hover:bg-pine-deep disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
      >
        <Send className="size-4" strokeWidth={2.25} />
      </button>
    </form>
  );
}
