import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Lock, User, ChevronDown, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MEGA_NAV, type LeafLink, type MegaSection } from "./MEGA_NAV";

const UTILITY_LINKS: LeafLink[] = [
  { to: "/gallery", label: "Gallery" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);

  // Scroll shadow / bg
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes everything
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveKey(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll while mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const openPanel = (key: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setActiveKey(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveKey(null), 120);
  };

  // Once a panel is open, the header always carries the cream chrome so the
  // panel reads on a solid ground.
  const solid = scrolled || activeKey !== null;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        solid
          ? "bg-cream/95 backdrop-blur-md border-b border-pine/10"
          : "bg-transparent"
      }`}
      onMouseLeave={scheduleClose}
    >
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6">
        <div className="flex min-w-0 items-center gap-10">
          <Link
            to="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-sm"
            onFocus={() => setActiveKey(null)}
          >
            <img
              src="/mcg-logo.png"
              alt="Mauritius Gymkhana Club"
              className="h-14 w-auto"
            />
          </Link>
          <nav
            aria-label="Primary"
            className={`hidden lg:flex items-stretch gap-1 text-sm font-medium uppercase tracking-wider ${
              solid ? "text-ink/75" : "text-cream/85"
            }`}
          >
            {MEGA_NAV.map((section) => {
              const isActive = activeKey === section.key;
              return (
                <div
                  key={section.key}
                  className="relative flex items-stretch"
                  onMouseEnter={() => openPanel(section.key)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isActive}
                    onClick={() =>
                      setActiveKey((k) => (k === section.key ? null : section.key))
                    }
                    onFocus={() => openPanel(section.key)}
                    className={`inline-flex items-center gap-1 px-3 transition-colors focus-visible:outline-none focus-visible:text-gold ${
                      isActive ? "text-gold" : "hover:text-gold"
                    }`}
                  >
                    {section.label}
                    <ChevronDown
                      className={`size-3 transition-transform ${
                        isActive ? "rotate-180" : ""
                      }`}
                      strokeWidth={2.5}
                    />
                  </button>
                </div>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <nav
            aria-label="Utility"
            className={`hidden xl:flex items-center gap-5 text-xs font-medium uppercase tracking-widest ${
              solid ? "text-ink/55" : "text-cream/70"
            }`}
          >
            {UTILITY_LINKS.map((u) => (
              <Link
                key={u.to}
                to={u.to}
                className="transition-colors hover:text-gold focus-visible:outline-none focus-visible:text-gold"
                onFocus={() => setActiveKey(null)}
              >
                {u.label}
              </Link>
            ))}
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                aria-label="Account"
                onFocus={() => setActiveKey(null)}
                className={`hidden size-10 items-center justify-center rounded-full ring-1 transition-colors sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  solid
                    ? "text-ink/70 ring-pine/20 hover:text-pine hover:ring-pine/40"
                    : "text-cream/85 ring-cream/30 hover:text-cream hover:ring-cream/50"
                }`}
              >
                <User className="size-4" strokeWidth={2.25} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={12}
              className="w-52 rounded-sm border-pine/10 bg-cream p-1.5"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                Staff & Committee
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-pine/10" />
              <DropdownMenuItem
                asChild
                className="cursor-pointer gap-2 rounded-sm py-2 text-sm text-ink/80 focus:bg-pine/5 focus:text-pine"
              >
                <Link to="/back-office/login">
                  <Lock className="size-3.5" strokeWidth={2.25} />
                  Sign in to Back Office
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            className={`lg:hidden inline-flex size-10 items-center justify-center rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              solid ? "text-pine" : "text-cream"
            }`}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega-panel */}
      <AnimatePresence>
        {activeKey && (
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute inset-x-0 top-20 border-t border-pine/10 bg-cream shadow-[0_24px_48px_-24px_rgba(27,67,50,0.25)]"
            onMouseEnter={() => openPanel(activeKey)}
            onMouseLeave={scheduleClose}
          >
            {MEGA_NAV.filter((s) => s.key === activeKey).map((section) => (
              <div
                key={section.key}
                className={`mx-auto grid max-w-7xl gap-12 px-6 py-12 ${
                  section.columns.length >= 3
                    ? "grid-cols-[0.9fr_2.6fr]"
                    : "grid-cols-[1.1fr_2fr]"
                }`}
              >
                <Link
                  to={section.feature.to}
                  onClick={() => setActiveKey(null)}
                  className="group relative overflow-hidden rounded-sm bg-pine p-8 min-h-[240px] flex flex-col justify-end focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <div className="absolute inset-0 bg-linear-to-br from-pine via-pine to-pine/85" />
                  <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,#E8B04B_1px,transparent_1px)] [background-size:14px_14px]" />
                  <div className="relative z-10">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-gold mb-3">
                      {section.feature.overline}
                    </span>
                    <h3 className="font-serif text-3xl text-cream leading-tight mb-3 text-balance">
                      {section.feature.title}
                    </h3>
                    <p className="text-sm text-cream/75 leading-relaxed mb-6 max-w-[36ch]">
                      {section.feature.body}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold border-b border-gold/40 pb-1 transition-colors group-hover:border-gold">
                      Discover <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </Link>
                <div
                  className={`grid gap-y-8 ${
                    section.columns.length >= 3
                      ? "grid-cols-3 gap-x-8"
                      : "grid-cols-2 gap-x-10"
                  }`}
                >
                  {section.columns.map((col) => (
                    <div key={col.heading}>
                      <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold mb-5">
                        {col.heading}
                      </h4>
                      <ul className="space-y-4">
                        {col.links.map((link) => (
                          <li key={link.to}>
                            <Link
                              to={link.to}
                              onClick={() => setActiveKey(null)}
                              className="group block focus-visible:outline-none"
                              activeProps={{ className: "text-pine" }}
                            >
                              <span className="flex items-center gap-2 font-serif text-lg text-ink transition-colors group-hover:text-pine group-focus-visible:text-pine">
                                {link.label}
                                <ArrowRight className="size-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-60 group-hover:translate-x-0" />
                              </span>
                              {link.description && (
                                <span className="mt-0.5 block text-xs text-ink/55">
                                  {link.description}
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-20 z-40 bg-cream overflow-y-auto"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto max-w-7xl px-6 pb-16 pt-4"
            >
              {MEGA_NAV.map((section) => (
                <MobileSection
                  key={section.key}
                  section={section}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}

              <div className="mt-8 space-y-1 border-t border-pine/10 pt-6">
                {UTILITY_LINKS.map((u) => (
                  <Link
                    key={u.to}
                    to={u.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-3 text-sm font-medium uppercase tracking-widest text-ink/70 hover:text-pine"
                  >
                    {u.label}
                    <ArrowRight className="size-4 text-pine/40" />
                  </Link>
                ))}
              </div>

              <Link
                to="/back-office/login"
                onClick={() => setMobileOpen(false)}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium uppercase tracking-widest text-pine ring-1 ring-pine/25 transition-colors hover:bg-pine/5"
              >
                <User className="size-4" strokeWidth={2.25} /> Sign in to Back Office
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileSection({
  section,
  onNavigate,
}: {
  section: MegaSection;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-pine/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left focus-visible:outline-none focus-visible:text-pine"
      >
        <span className="font-serif text-2xl text-ink">{section.label}</span>
        <ChevronDown
          className={`size-5 text-pine/60 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5 space-y-6">
              {section.columns.map((col) => (
                <div key={col.heading}>
                  <h4 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold mb-3">
                    {col.heading}
                  </h4>
                  <ul className="space-y-3 pl-1">
                    {col.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          onClick={onNavigate}
                          className="block"
                        >
                          <span className="font-serif text-lg text-ink">
                            {link.label}
                          </span>
                          {link.description && (
                            <span className="mt-0.5 block text-xs text-ink/55">
                              {link.description}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}