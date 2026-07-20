import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";
import {
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useEffect, useState } from "react";
import { ActionButton } from "@/components/action-button";
import { Reveal } from "@/components/reveal";
import { AnimatedTestimonials, type Testimonial } from "@/components/ui/animated-testimonials";
import { Marquee } from "@/components/ui/marquee";
import { RECIPROCAL_CLUBS, type ReciprocalClub } from "@/lib/reciprocal-clubs-data";
import { FEATURED_SPORTS, SPORTS, type Sport } from "@/lib/sports-data";
import heroGolf from "@/assets/hero-golf-course.jpg";
import heroTennis from "@/assets/hero-tennis-grass.jpg";
import sportGolf from "@/assets/sport-golf.jpg";
import sportTennis from "@/assets/sport-tennis.png";
import sportPool from "@/assets/sport-pool.jpg";
import diningBrasserie from "@/assets/dining-brasserie.jpg";
import venueEvents from "@/assets/venue-events.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <CinematicHero />

      {/* Heritage fact band */}
      <section className="bg-pine py-14 border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          <Fact year="1844" text="The oldest golf course in the Southern Hemisphere is laid out." />
          <Fact year="1849" text="The Mauritius Gymkhana Club is formally founded." />
          <Fact year="1922" text="First recorded flight from Mauritius, taking off from our course." />
          <Fact year="1935" text="The Men's Ireland Cup is inaugurated." />
        </div>
      </section>

      {/* Sports -bento showcase */}
      <ServiceShowcase />

      {/* Alternating dining / venue */}
      <section className="py-24 bg-pine/5">
        <div className="mx-auto max-w-7xl px-6 space-y-24 md:space-y-32">
          <SplitFeature
            image={diningBrasserie}
            imageAlt="Elegant colonial dining room set with white linens"
            overline="Refined Island Dining"
            title="From the veranda to the Brasserie"
            body="From morning coffee under the shuttered windows to candlelit evenings in the Brasserie, our chefs celebrate Mauritian flavours and continental tradition."
            linkTo="/dining"
            linkLabel="Explore our menus"
          />
          <SplitFeature
            reverse
            image={venueEvents}
            imageAlt="Grand event set-up in the MGC clubhouse"
            overline="Private Events"
            title="Historic celebrations, quietly staged"
            body="Host your corporate retreat, gala dinner or wedding within the timeless architecture of the Vacoas estate. Conference Room, Multipurpose Hall and FootFive available."
            linkTo="/venue-hire"
            linkLabel="Venue hire details"
          />
        </div>
      </section>

      {/* Club life */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 flex justify-between items-end">
            <h2 className="font-serif text-4xl text-pine">Club Life</h2>
            <Link
              to="/events"
              className="text-sm font-medium text-ink/60 hover:text-pine transition-colors focus-visible:outline-none focus-visible:text-pine focus-visible:underline focus-visible:underline-offset-4"
            >
              View calendar
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <NewsItem
              category="Tournament"
              date="15 September 2026"
              title="The 180th Anniversary Cup"
              excerpt="Registrations open for the annual golf tournament celebrating 180 years of the club."
            />
            <NewsItem
              category="Dining"
              date="Every last Sunday"
              title="Sunday Roast on the Veranda"
              excerpt="Join us for our traditional family roast under the shutters of the main clubhouse."
            />
            <NewsItem
              category="Estate"
              date="July 2026"
              title="The Grass Court Refresh"
              excerpt="A look at the conservation work being done on our historic tennis pavilion."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Reciprocal clubs proof */}
      <ReciprocalStrip />

      {/* Membership CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative overflow-hidden rounded-sm bg-pine p-12 md:p-24">
            <div className="relative z-10 max-w-2xl">
              <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-6">
                Membership
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-cream mb-6 text-balance">
                A legacy to call your own
              </h2>
              <p className="text-cream/80 text-lg mb-10 max-w-[46ch] leading-relaxed">
                Join a community of members who value heritage, sportsmanship, and the
                quiet luxury of the MGC. Applications open for individuals and
                corporates.
              </p>
              <ActionButton to="/membership" variant="gold">
                <Plus strokeWidth={2.2} />
                Enquire about Membership
              </ActionButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({ year, text }: { year: string; text: string }) {
  return (
    <div className="space-y-1">
      <span className="block font-serif text-3xl text-gold">{year}</span>
      <p className="text-cream/70 text-sm max-w-[22ch] leading-snug">{text}</p>
    </div>
  );
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Charles L.",
    role: "Member since 2007",
    company: "Golf Section",
    content:
      "Playing the 1844 Course feels like walking through a living chapter of golf history. There is nowhere else quite like the Gymkhana.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&auto=format",
  },
  {
    id: 2,
    name: "Priya M.",
    role: "Member since 2015",
    company: "Tennis Section",
    content:
      "The only grass tennis courts of the Indian Ocean -impeccably maintained. A rare privilege on this side of the world.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces&auto=format",
  },
  {
    id: 3,
    name: "Julien D.",
    role: "Private Event",
    company: "Wedding, 2025",
    content:
      "We hosted our wedding on the veranda. Every detail, from the shuttered light to the service, felt effortlessly considered.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&auto=format",
  },
  {
    id: 4,
    name: "Aisha K.",
    role: "Corporate Member",
    company: "Venue Hire",
    content:
      "We ran our annual gala in the Multipurpose Hall and the team handled every last detail. Our guests are still talking about the estate.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces&auto=format",
  },
];

function Testimonials() {
  return (
    <AnimatedTestimonials
      badgeText="In their words"
      title="A community that stays."
      subtitle="From the fairways of the 1844 Course to the veranda of the Brasserie, our members and guests share what keeps them coming back to the Gymkhana."
      testimonials={TESTIMONIALS}
    />
  );
}

/* ---------- Reciprocal clubs strip ---------- */
const RECIPROCAL_ROW_1 = RECIPROCAL_CLUBS.slice(0, Math.ceil(RECIPROCAL_CLUBS.length / 2));
const RECIPROCAL_ROW_2 = RECIPROCAL_CLUBS.slice(Math.ceil(RECIPROCAL_CLUBS.length / 2));

function ReciprocalStrip() {
  return (
    <section className="py-20 bg-pine text-cream border-t border-gold/15">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-3">
              Reciprocal access
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-cream text-balance max-w-2xl">
              Members welcomed at {RECIPROCAL_CLUBS.length} sister clubs across the world.
            </h2>
          </div>
          <Link
            to="/membership/reciprocal"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cream border-b border-cream/25 pb-1 transition-colors hover:border-gold hover:text-gold"
          >
            See the full list <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </div>

      <div className="relative">
        <Marquee pauseOnHover className="[--duration:50s] [--gap:1.5rem]">
          {RECIPROCAL_ROW_1.map((club) => (
            <ReciprocalClubCard key={club.name} club={club} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="mt-6 [--duration:50s] [--gap:1.5rem]">
          {RECIPROCAL_ROW_2.map((club) => (
            <ReciprocalClubCard key={club.name} club={club} />
          ))}
        </Marquee>
        {/* Edge fades so cards scroll in/out under the pine background rather than clipping */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-pine to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-pine to-transparent" />
      </div>
    </section>
  );
}

/** First letters of the club's two most significant words -its emblem when no crest artwork exists. */
function clubInitials(name: string) {
  const words = name
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter((w) => w && !["the", "of", "and"].includes(w.toLowerCase()));
  return words
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

function ReciprocalClubCard({ club }: { club: ReciprocalClub }) {
  return (
    <div className="flex h-full w-72 shrink-0 flex-col items-center rounded-sm border border-cream/10 bg-pine-deep/70 px-6 py-8 text-center transition-colors hover:border-gold/40">
      {/* Logo emblem -the focal point of the card */}
      <div className="relative mb-5 flex size-20 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-linear-to-b from-gold/15 to-transparent">
        <span className="font-serif text-2xl text-gold">{clubInitials(club.name)}</span>
        <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-gold/20" />
      </div>

      <h3 className="font-serif text-lg text-cream text-balance leading-snug">{club.name}</h3>
      <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold/80">
        {club.country}
      </span>

      <div className="mt-5 w-full space-y-1.5 border-t border-cream/10 pt-4 text-xs leading-relaxed">
        <p className="text-cream/65 text-pretty">{club.address}</p>
        <p className="text-cream/45">{club.phone}</p>
        <p className="truncate text-gold/70">{club.website}</p>
      </div>
    </div>
  );
}

const HERO_TITLE = "The Living Heart of Mauritian Sporting Heritage";

/**
 * Drone-flyover hero sequence: seven aerial + ground plates crossfade with
 * per-frame Ken Burns motion so it reads as one continuous camera move rather
 * than a slideshow. Total loop ≈ 36s. Respects prefers-reduced-motion.
 */
const HERO_FRAMES = [
  { src: heroGolf, alt: "Wide aerial view of the Mauritius Gymkhana estate at sunset", kb: 0 },
  { src: sportGolf, alt: "Descending over the 1844 golf course fairways", kb: 1 },
  { src: heroTennis, alt: "The grass tennis courts from above", kb: 2 },
  { src: sportTennis, alt: "Sweeping across the tennis pavilion", kb: 3 },
  { src: venueEvents, alt: "The historic clubhouse dressed for a private event", kb: 0 },
  { src: diningBrasserie, alt: "The Brasserie veranda at golden hour", kb: 1 },
  { src: sportPool, alt: "The heated swimming pool at dusk", kb: 2 },
] as const;

// Every scale value stays >= 1.04 -the minimum overscan needed so object-cover
// Every scale value stays >= 1.04 — the minimum overscan needed so object-cover
// still fully covers the frame at this preset's largest paired translate (1.4%).
// Dropping to 1.0–1.02 (as some of these once did) leaves zero slack, so the
// translate slides the image off one edge and uncovers a bare sliver of frame.
const KB_PRESETS = [
  { from: { scale: 1.16, x: "-1.2%", y: "1%" }, to: { scale: 1.04, x: "0.6%", y: "-0.6%" } },
  { from: { scale: 1.04, x: "1.2%", y: "-1%" }, to: { scale: 1.2, x: "-0.6%", y: "0.6%" } },
  { from: { scale: 1.14, x: "-1.4%", y: "-0.8%" }, to: { scale: 1.04, x: "0.8%", y: "0.6%" } },
  { from: { scale: 1.04, x: "1.4%", y: "0.8%" }, to: { scale: 1.2, x: "-0.6%", y: "-0.6%" } },
] as const;

const FRAME_MS = 5200; // per-frame dwell; 7 × 5.2s ≈ 36s loop
const CROSSFADE_S = 1.4;
const KB_DURATION_S = 6.8; // slightly longer than dwell so motion never stalls

function HeroFrame({ frame, active, eager }: { frame: (typeof HERO_FRAMES)[number]; active: boolean; eager: boolean }) {
  const preset = KB_PRESETS[frame.kb];
  const controls = useAnimationControls();
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!active) return;
    if (reduce) {
      controls.set({ scale: 1, x: "0%", y: "0%" });
      return;
    }
    controls.set(preset.from);
    controls.start({
      scale: preset.to.scale,
      x: preset.to.x,
      y: preset.to.y,
      transition: { duration: KB_DURATION_S, ease: "linear" },
    });
  }, [active, controls, preset, reduce]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0, filter: active ? "blur(0px)" : "blur(6px)" }}
      transition={{ duration: CROSSFADE_S, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0"
    >
      <motion.img
        src={frame.src}
        alt={frame.alt}
        animate={controls}
        initial={preset.from}
        className="h-full w-full object-cover"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        draggable={false}
      />
    </motion.div>
  );
}

function CinematicHero() {
  const words = HERO_TITLE.split(" ");
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % HERO_FRAMES.length),
      FRAME_MS,
    );
    return () => window.clearInterval(id);
  }, [reduce]);

  // Gentle mouse parallax on the whole image layer.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 40, damping: 20, mass: 0.6 });
  const py = useSpring(useTransform(my, [-1, 1], [-10, 10]), { stiffness: 40, damping: 20, mass: 0.6 });

  return (
    <section
      className="relative min-h-screen flex flex-col justify-end pt-20 overflow-hidden"
      onMouseMove={
        reduce
          ? undefined
          : (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
              my.set(((e.clientY - r.top) / r.height) * 2 - 1);
            }
      }
    >
      {/* Image layer with drone-flyover sequence + entry blur reveal.
          Settles at scale 1.1, not 1 -the mouse parallax below shifts this
          whole layer (images + vignette + grain, all its children) by up to
          ±14px/±10px, and at scale 1 that has zero slack, so the shift used
          to slide the layer off one edge of the section and expose bare,
          unvignetted background there. The permanent 10% overscan (5% per
          side) comfortably absorbs that translate at any realistic viewport
          width, so the layer always fully covers the section. */}
      <motion.div
        initial={{ scale: 1.16, filter: "blur(14px)", opacity: 0.35 }}
        animate={{ scale: 1.1, filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={reduce ? undefined : { x: px, y: py }}
        className="absolute inset-0 z-0"
      >
        {HERO_FRAMES.map((frame, i) => (
          <HeroFrame key={i} frame={frame} active={i === active} eager={i === 0} />
        ))}
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-pine/85 via-pine/30 to-pine/45" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(65% 55% at 50% 42%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 72%)",
            mixBlendMode: "soft-light",
          }}
        />
        <div className="vignette" />
        <div className="film-grain" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-gold"
          >
            Since 1849 · Vacoas, Mauritius
          </motion.span>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-cream text-balance mb-8">
            {words.map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.9,
                  delay: 0.8 + i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-[0.28em]"
              >
                {w}
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.8 + words.length * 0.08 + 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-wrap gap-4"
          >
            <ActionButton to="/membership" variant="gold">
              <Plus strokeWidth={2.2} />
              Become a Member
            </ActionButton>
            <ActionButton to="/sports/golf" variant="outline">
              Visitor Green Fees
              <ArrowRight />
            </ActionButton>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.8 + words.length * 0.08 + 0.5,
            }}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-cream/70 text-xs uppercase tracking-[0.28em]"
          >
            <li><span className="text-gold font-semibold">180</span> years of heritage</li>
            <li className="hidden sm:block h-3 w-px bg-cream/25" aria-hidden />
            <li><span className="text-gold font-semibold">26</span> reciprocal clubs</li>
            <li className="hidden sm:block h-3 w-px bg-cream/25" aria-hidden />
            <li><span className="text-gold font-semibold">{SPORTS.length}</span> sports · one estate</li>
          </motion.ul>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-cream/60 text-[10px] uppercase tracking-[0.4em]"
      >
        Scroll
      </motion.div>
    </section>
  );
}

function ServiceShowcase() {
  const [featured, ...rest] = FEATURED_SPORTS;
  return (
    <section className="py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Eleven sports · One estate
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-pine text-balance">
              Centuries of Sport
            </h2>
            <p className="text-base text-ink/70 text-pretty leading-relaxed">
              From championship fairways and grass tennis courts unique in the Indian
              Ocean to studio wellness and floodlit football -every discipline
              backed by 180 years of tradition.
            </p>
          </div>
          <Link
            to="/sports"
            className="inline-flex items-center gap-2 text-sm font-semibold text-pine border-b border-pine/20 pb-1 transition-colors hover:text-pine/70 hover:border-gold focus-visible:outline-none focus-visible:border-gold"
          >
            All sports <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        {/* Bento: 1 col mobile, 2 col md, 12-col bento lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
          <ServiceFeaturedCard service={featured} className="lg:col-span-7 lg:row-span-2" />
          <ServiceCard service={rest[0]} className="lg:col-span-5 lg:row-span-2" tall />
          {rest.slice(1).map((s) => (
            <ServiceCard key={s.path} service={s} className="lg:col-span-4" />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceFeaturedCard({
  service,
  className = "",
}: {
  service: Sport;
  className?: string;
}) {
  return (
    <Link
      to={service.path}
      className={`group relative flex min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem] overflow-hidden rounded-sm ring-1 ring-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${className}`}
    >
      <img
        src={service.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-pine/90 via-pine/50 to-pine/10" />

      {/* Top-right stat pill */}
      <div className="absolute right-6 top-6 rounded-full bg-cream/95 px-4 py-1.5 text-[11px] uppercase tracking-widest text-pine shadow-sm">
        <span className="font-serif text-base tracking-normal text-pine mr-2">
          {service.stat.value}
        </span>
        {service.stat.label}
      </div>

      {/* Bottom content */}
      <div className="relative mt-auto p-8 md:p-10 max-w-2xl text-cream">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-gold mb-3">
          Signature discipline
        </span>
        <h3 className="font-serif text-3xl md:text-5xl text-balance">{service.title}</h3>
        <p className="mt-4 text-cream/85 text-pretty leading-relaxed max-w-[52ch]">
          {service.tagline}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold border-b border-gold/30 pb-0.5 transition-colors group-hover:border-gold">
          {service.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function ServiceCard({
  service,
  className = "",
  tall,
}: {
  service: Sport;
  className?: string;
  tall?: boolean;
}) {
  return (
    <Link
      to={service.path}
      className={`group relative flex overflow-hidden rounded-sm ring-1 ring-black/5 ${
        tall ? "min-h-[24rem] md:min-h-[28rem] lg:min-h-[32rem]" : "min-h-[18rem] lg:min-h-[16rem]"
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream ${className}`}
    >
      <img
        src={service.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-pine/90 via-pine/40 to-transparent" />

      <div className="absolute right-5 top-5 rounded-full bg-cream/90 px-3 py-1 text-[10px] uppercase tracking-widest text-pine">
        <span className="font-serif text-sm tracking-normal text-pine mr-1.5">
          {service.stat.value}
        </span>
        {service.stat.label}
      </div>

      <div className="relative mt-auto p-6 text-cream w-full">
        <h3 className={`font-serif ${tall ? "text-3xl md:text-4xl" : "text-2xl"}`}>
          {service.title}
        </h3>
        <p className="mt-2 text-sm text-cream/80 leading-relaxed line-clamp-2 max-w-[42ch]">
          {service.tagline}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gold">
          {service.cta}
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

function SplitFeature({
  image,
  imageAlt,
  overline,
  title,
  body,
  linkTo,
  linkLabel,
  reverse,
}: {
  image: string;
  imageAlt: string;
  overline: string;
  title: string;
  body: string;
  linkTo: string;
  linkLabel: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} gap-12 md:gap-16 items-center`}
    >
      <div className="w-full md:w-3/5">
        <div className="overflow-hidden rounded-sm ring-1 ring-black/5">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="w-full aspect-[4/3] object-cover"
          />
        </div>
      </div>
      <div className="w-full md:w-2/5">
        <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-4">
          {overline}
        </span>
        <h2 className="font-serif text-4xl text-pine mb-6 text-balance">{title}</h2>
        <p className="text-ink/70 mb-8 max-w-[48ch] text-pretty leading-relaxed">
          {body}
        </p>
        <Link
          to={linkTo}
          className="inline-flex items-center gap-2 text-sm font-semibold text-pine border-b border-pine/20 pb-1 transition-colors hover:text-pine/70 hover:border-gold focus-visible:outline-none focus-visible:border-gold"
        >
          {linkLabel} <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}

function NewsItem({
  category,
  date,
  title,
  excerpt,
  to = "/news",
}: {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  to?: string;
}) {
  return (
    <article>
      <Link
        to={to}
        className="group block border-t border-pine/15 pt-6 transition-colors hover:border-gold focus-visible:outline-none focus-visible:border-gold"
      >
        <div className="text-xs font-semibold tracking-widest text-gold uppercase">
          {category}
        </div>
        <h3 className="mt-3 font-serif text-xl text-ink transition-colors group-hover:text-pine">
          {title}
        </h3>
        <p className="mt-3 text-sm text-ink/65 leading-relaxed">{excerpt}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-ink/40 uppercase tracking-widest">{date}</span>
          <ArrowRight className="size-4 text-pine/40 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>
    </article>
  );
}
