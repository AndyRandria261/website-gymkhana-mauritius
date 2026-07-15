import type { ReactNode } from "react";

/** Shared input styling for every form on the site - one hairline-underline look. */
export const fieldInputClass =
  "w-full border-b border-pine/20 bg-transparent py-3 outline-none focus:border-pine";

export function FormField({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-widest text-ink/50 mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-ink/40">{hint}</span>}
    </label>
  );
}
