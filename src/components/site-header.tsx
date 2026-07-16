import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Plus, ChevronDown, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { ActionButton } from "./action-button";

type LeafLink = { to: string; label: string; description?: string };
type MegaColumn = { heading: string; links: LeafLink[] };
type MegaSection = {
  key: string;
  label: string;
  /** Landing route for the "meta" header link */
  to: string;
  /** Featured card on the left of the panel */
  feature: {
    to: string;
    overline: string;
    title: string;
    body: string;
    image: string;
  };
  columns: MegaColumn[];
};

const MEGA_NAV: MegaSection[] = [
  {
    key: "club",
    label: "The Club",
    to: "/the-club/history",
    feature: {
      to: "/the-club/history",
      overline: "Since 1849",
      title: "180 years of Mauritian sport",
      body: "The oldest golf course of the Southern Hemisphere and the beating heart of Vacoas life.",
      image: "/mcg-logo.png",
    },
    columns: [
      {
        heading: "Our Heritage",
        links: [
          { to: "/the-club/history", label: "History", description: "1844 to today" },
          { to: "/the-club/committee", label: "Committee", description: "Elected officers & board" },
          { to: "/the-club/rules", label: "Rules & Bylaws", description: "House rules and dress code" },
        ],
      },
      {
        heading: "Working with us",
        links: [
          { to: "/the-club/careers", label: "Careers", description: "Join the team" },
          { to: "/the-club/tenders", label: "Tenders", description: "Open procurement" },
          { to: "/contact", label: "Contact", description: "Reach the office" },
        ],
      },
    ],
  },
  {
    key: "sports",
    label: "Sports",
    to: "/sports",
    feature: {
      to: "/sports/golf",
      overline: "Championship · 18 holes",
      title: "The 1844 Course",
      body: "Play the oldest golf course of the Southern Hemisphere at the foot of the Corps de Garde.",
      image: "/mcg-logo.png",
    },
    columns: [
      {
        heading: "Racquet & club",
        links: [
          { to: "/sports/golf", label: "Golf", description: "1844 · 18 holes" },
          { to: "/sports/tennis", label: "Tennis", description: "Grass & hard courts" },
          { to: "/sports/squash", label: "Squash", description: "Two dedicated courts" },
        ],
      },
      {
        heading: "Health & leisure",
        links: [
          { to: "/sports/fitness", label: "Health & Fitness", description: "Cardio · strength" },
          { to: "/sports/pool", label: "Swimming", description: "Open year-round" },
          { to: "/sports", label: "All sports", description: "Six sports, one estate" },
        ],
      },
    ],
  },
  {
    key: "dining",
    label: "Dining & Venues",
    to: "/dining",
    feature: {
      to: "/dining",
      overline: "Refined island dining",
      title: "From veranda to Brasserie",
      body: "Mauritian flavours and continental tradition, served under the shutters of the estate.",
      image: "/mcg-logo.png",
    },
    columns: [
      {
        heading: "At the table",
        links: [
          { to: "/dining", label: "Dining", description: "Menus & opening hours" },
          { to: "/events", label: "Club Events", description: "Tournaments & socials" },
        ],
      },
      {
        heading: "Host with us",
        links: [
          { to: "/venue-hire", label: "Venue Hire", description: "Weddings · galas · corporate" },
          { to: "/gallery", label: "Gallery", description: "See past events" },
        ],
      },
    ],
  },
  {
    key: "membership",
    label: "Membership",
    to: "/membership",
    feature: {
      to: "/membership",
      overline: "Applications open",
      title: "Become a Member",
      body: "Join a community that values heritage, sportsmanship and the quiet luxury of the MGC.",
      image: "/mcg-logo.png",
    },
    columns: [
      {
        heading: "Join the Club",
        links: [
          { to: "/membership", label: "Membership overview", description: "Categories & fees" },
          { to: "/membership/reciprocal", label: "Reciprocal Clubs", description: "Global partner clubs" },
        ],
      },
      {
        heading: "Stay in touch",
        links: [
          { to: "/news", label: "News", description: "From the estate" },
          { to: "/contact", label: "Contact", description: "Office & directions" },
        ],
      },
    ],
  },
];

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
          <ActionButton
            to="/membership"
            variant={solid ? "pine" : "gold"}
            className="hidden px-4 py-2 sm:inline-flex"
          >
            <Plus strokeWidth={2} />
            Join the Club
          </ActionButton>
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
                className="mx-auto grid max-w-7xl grid-cols-[1.1fr_2fr] gap-12 px-6 py-12"
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
                <div className="grid grid-cols-2 gap-x-10 gap-y-8">
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

              <ActionButton
                to="/membership"
                variant="pine"
                onClick={() => setMobileOpen(false)}
                className="mt-8 w-full justify-center"
              >
                <Plus /> Join the Club
              </ActionButton>
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