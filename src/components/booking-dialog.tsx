import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ActionButton, actionButtonClass } from "@/components/action-button";
import { FormField, fieldInputClass } from "@/components/form-field";
import { cn } from "@/lib/utils";

export type BookingSubject =
  | "golf"
  | "tennis"
  | "squash"
  | "fitness"
  | "pool"
  | "dining"
  | "venue"
  | "membership";

type ScheduleField = "date" | "time" | "party";

/**
 * The club's single "request a booking" flow. Opens as a modal so the sport
 * and price-list context the visitor was just reading isn't lost - the CTA
 * always keeps a real `/contact?subject=...` href underneath so it still
 * works with JS disabled, middle-click, or a crawler.
 */
export function BookingDialog({
  subject,
  ctaLabel,
  variant = "gold",
  className,
  title,
  description,
  confirmation,
  fields = ["date", "time", "party"],
  partyLabel = "Party size",
  venueOptions,
}: {
  subject: BookingSubject;
  ctaLabel: ReactNode;
  variant?: "gold" | "pine" | "outline";
  className?: string;
  title: string;
  description?: string;
  confirmation?: string;
  fields?: ScheduleField[];
  partyLabel?: string;
  venueOptions?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState<"member" | "visitor">("visitor");
  const confirmationRef = useRef<HTMLDivElement>(null);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      // Let the close animation finish before resetting to the form view.
      window.setTimeout(() => setSent(false), 200);
    }
  }

  useEffect(() => {
    if (sent) confirmationRef.current?.focus();
  }, [sent]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <a
        href={`/contact?subject=${subject}`}
        className={cn(actionButtonClass(variant), className)}
        onClick={(e) => {
          if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          e.preventDefault();
          setOpen(true);
        }}
      >
        {ctaLabel}
      </a>
      <DialogContent className="max-w-lg p-8 sm:rounded-sm">
        {sent ? (
          <div
            ref={confirmationRef}
            tabIndex={-1}
            role="status"
            aria-live="polite"
            className="py-6 text-center outline-none"
          >
            <Check className="mx-auto mb-4 size-8 text-gold" aria-hidden="true" />
            <DialogTitle className="font-serif text-2xl text-pine mb-2">Thank you.</DialogTitle>
            <DialogDescription className="text-ink/70">
              {confirmation ?? "We will confirm availability within 24 hours."}
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl text-pine">{title}</DialogTitle>
              {description && (
                <DialogDescription className="text-ink/60 leading-relaxed">
                  {description}
                </DialogDescription>
              )}
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-5 pt-2"
              aria-label={title}
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <FormField label="Full name" required>
                  <input required autoComplete="name" className={fieldInputClass} />
                </FormField>
                <FormField label="Email" required>
                  <input type="email" required autoComplete="email" className={fieldInputClass} />
                </FormField>
              </div>

              <FormField label="I am a" required>
                <div role="radiogroup" aria-label="Member or visitor" className="flex gap-2">
                  {(["member", "visitor"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="radio"
                      aria-checked={status === s}
                      onClick={() => setStatus(s)}
                      className={cn(
                        "flex-1 py-2.5 text-sm font-medium capitalize ring-1 transition-colors cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pine",
                        status === s
                          ? "bg-pine text-cream ring-pine"
                          : "bg-transparent text-ink/60 ring-pine/20 hover:text-pine",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </FormField>

              {venueOptions && (
                <FormField label="Preferred venue">
                  <select className={fieldInputClass} defaultValue={venueOptions[0]}>
                    {venueOptions.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </FormField>
              )}

              {(fields.includes("date") || fields.includes("time") || fields.includes("party")) && (
                <div className="grid sm:grid-cols-3 gap-5">
                  {fields.includes("date") && (
                    <FormField label="Preferred date" required>
                      <input type="date" required className={fieldInputClass} />
                    </FormField>
                  )}
                  {fields.includes("time") && (
                    <FormField label="Preferred time">
                      <input type="time" className={fieldInputClass} />
                    </FormField>
                  )}
                  {fields.includes("party") && (
                    <FormField label={partyLabel}>
                      <input
                        type="number"
                        min={1}
                        max={20}
                        defaultValue={2}
                        className={fieldInputClass}
                      />
                    </FormField>
                  )}
                </div>
              )}

              <FormField label="Anything else we should know?">
                <textarea rows={3} className={cn(fieldInputClass, "resize-none")} />
              </FormField>

              <ActionButton type="submit" variant="pine" className="w-full sm:w-auto">
                Send request <ArrowRight />
              </ActionButton>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
