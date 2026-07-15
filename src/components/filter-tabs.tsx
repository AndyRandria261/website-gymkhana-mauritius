import { cn } from "@/lib/utils";

/**
 * The club's single filter/tab control: a hairline underline with a gold
 * active indicator. Used for fee categories and the events filter so every
 * "choose one" control on the site reads the same way.
 */
export function FilterTabs<T extends string>({
  items,
  value,
  onChange,
  ariaLabel,
  className,
}: {
  items: ReadonlyArray<{ id: T; label: string }>;
  value: T;
  onChange: (id: T) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn("flex flex-wrap gap-2 border-b border-pine/10", className)}
    >
      {items.map((item) => {
        const active = value === item.id;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={cn(
              "-mb-px border-b-2 px-4 py-3 text-sm font-medium uppercase tracking-wider transition-colors",
              "focus-visible:outline-none focus-visible:text-pine focus-visible:border-gold/50",
              active ? "border-gold text-pine" : "border-transparent text-ink/50 hover:text-pine",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
