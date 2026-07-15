import { Link } from "@tanstack/react-router";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "pine" | "outline";

/**
 * The club's primary call-to-action. One button, one set of interaction states,
 * used everywhere so hover and keyboard focus stay identical across the site.
 * Renders as a router <Link> (`to`), an anchor (`href`) or a native <button>.
 */
const base =
  "inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium " +
  "transition-[transform,background-color,color] duration-200 hover:-translate-y-px " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  gold: "bg-gold text-ink ring-1 ring-gold hover:bg-gold-soft focus-visible:ring-pine focus-visible:ring-offset-cream",
  pine: "bg-pine text-cream ring-1 ring-pine hover:bg-pine-deep focus-visible:ring-gold focus-visible:ring-offset-cream",
  outline:
    "bg-cream/10 text-cream backdrop-blur-sm ring-1 ring-cream/30 hover:bg-cream/20 focus-visible:ring-cream focus-visible:ring-offset-transparent",
};

/**
 * Same classes as <ActionButton>, exposed for callers that need to style a
 * plain <a>/<button> themselves (e.g. a dialog trigger that must stay a real
 * anchor for no-JS/middle-click fallback instead of going through <Link>).
 */
export function actionButtonClass(variant: Variant = "gold", className?: string) {
  return cn(base, variants[variant], className);
}

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type AnchorRest = Omit<ComponentPropsWithoutRef<"a">, "className" | "href" | "children">;
type ButtonRest = Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function ActionButton({
  variant = "gold",
  className,
  to,
  href,
  children,
  ...rest
}: BaseProps & { to?: string; href?: string } & AnchorRest & ButtonRest) {
  const cls = cn(base, variants[variant], className);

  if (to) {
    // Routes are validated at runtime by the router; loosen the strict Link typing.
    return (
      <Link to={to as never} className={cls} {...(rest as AnchorRest)}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} {...(rest as AnchorRest)}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...(rest as ButtonRest)}>
      {children}
    </button>
  );
}
