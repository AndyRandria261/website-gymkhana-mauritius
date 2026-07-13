import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Plus } from "lucide-react";

const NAV = [
  { to: "/the-club/history", label: "The Club" },
  { to: "/sports/golf", label: "Golf" },
  { to: "/sports", label: "Sports" },
  { to: "/dining", label: "Dining" },
  { to: "/venue-hire", label: "Venue Hire" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md border-b border-pine/10"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            to="/"
            className={`font-serif text-2xl tracking-tight ${
              scrolled ? "text-pine" : "text-cream"
            }`}
          >
            MGC
          </Link>
          <nav
            className={`hidden md:flex gap-6 text-sm font-medium uppercase tracking-wider ${
              scrolled ? "text-ink/70" : "text-cream/85"
            }`}
          >
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className={`hidden sm:inline-flex text-sm font-medium transition-colors ${
              scrolled ? "text-pine hover:text-pine/70" : "text-cream hover:text-gold"
            }`}
          >
            Contact
          </Link>
          <Link
            to="/membership"
            className="hidden sm:inline-flex items-center gap-2 bg-pine py-2 pr-4 pl-3 text-sm font-medium text-cream ring-1 ring-pine transition-transform hover:-translate-y-px"
          >
            <Plus className="size-4 shrink-0" strokeWidth={2} />
            Join the Club
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
            className={`md:hidden inline-flex size-10 items-center justify-center rounded-sm ${
              scrolled ? "text-pine" : "text-cream"
            }`}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-pine/10 bg-cream">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4 text-sm font-medium uppercase tracking-wider text-ink/80">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-pine/5 hover:text-pine"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/membership"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 bg-pine px-5 py-3 text-cream"
            >
              <Plus className="size-4" /> Join the Club
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}