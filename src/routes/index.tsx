import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Crown, Flag, Sparkles, Quote } from "lucide-react";
import { motion } from "motion/react";
import { ActionButton } from "@/components/action-button";
import { Reveal } from "@/components/reveal";
import { RECIPROCAL_CLUBS } from "@/lib/reciprocal-clubs-data";
import heroGolf from "@/assets/hero-golf-course.jpg";
import sportGolf from "@/assets/sport-golf.jpg";
import sportTennis from "@/assets/sport-tennis.png";
import sportSquash from "@/assets/sport-squash.jpg";
import sportFitness from "@/assets/sport-fitness.jpg";
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

      {/* 3 Personas — pathways */}
      <Personas />

      {/* Heritage fact band */}
      <section className="bg-pine py-14 border-b border-gold/20">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          <Fact year="1844" text="The oldest golf course in the Southern Hemisphere is laid out." />
          <Fact year="1849" text="The Mauritius Gymkhana Club is formally founded." />
          <Fact year="1922" text="First recorded flight from Mauritius, taking off from our course." />
          <Fact year="1935" text="The Men's Ireland Cup is inaugurated." />
        </div>
      </section>

      {/* Sports asymmetric grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Six sports · One estate
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-pine text-balance">
                Centuries of Sport
              </h2>
              <p className="text-base text-ink/70 text-pretty leading-relaxed">
                From the rolling fairways of our historic golf course to the precision
                of the Indian Ocean's only grass tennis courts.
              </p>
            </div>
            <Link
              to="/sports"
              className="inline-flex items-center gap-2 text-sm font-semibold text-pine border-b border-pine/20 pb-1 transition-colors hover:text-pine/70 hover:border-gold focus-visible:outline-none focus-visible:border-gold"
            >
              All sports <ArrowRight className="size-4" />
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SportCard
              large
              className="md:col-span-2"
              aspect="aspect-[16/10]"
              image={sportGolf}
              title="The 1844 Course"
              overline="Championship Golf · 18 holes"
              to="/sports/golf"
            />
            <SportCard
              aspect="aspect-square"
              image={sportTennis}
              title="Grass Tennis"
              overline="The only grass courts of the Indian Ocean"
              to="/sports/tennis"
            />
            <SportCard
              image={sportSquash}
              title="Squash"
              overline="Two dedicated courts"
              to="/sports/squash"
            />
            <SportCard
              image={sportFitness}
              title="Health & Fitness"
              overline="Cardio & strength"
              to="/sports/fitness"
            />
            <SportCard
              image={sportPool}
              title="Swimming"
              overline="Heated · Open year-round"
              to="/sports/pool"
            />
          </div>
        </div>
      </section>

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

/* ---------- 3 Personas Cards ---------- */
const PERSONAS = [
  {
    icon: Crown,
    overline: "Prospective Member",
    title: "Become a Member",
    body: "Join a 180-year legacy. Individual, family and corporate memberships open — with reciprocal access to 26 clubs worldwide.",
    linkTo: "/membership",
    linkLabel: "Explore membership",
  },
  {
    icon: Flag,
    overline: "Visitor · Green Fees",
    title: "Play Today",
    body: "Non-members are welcome on the 1844 Course and the grass tennis courts. Reserve a tee time or a court within minutes.",
    linkTo: "/sports/golf",
    linkLabel: "Visitor green fees",
  },
  {
    icon: Sparkles,
    overline: "Event Planner",
    title: "Host an Event",
    body: "Weddings, galas, corporate retreats and private dinners staged inside the historic clubhouse and Multipurpose Hall.",
    linkTo: "/venue-hire",
    linkLabel: "Venue hire",
  },
] as const;

function Personas() {
  return (
    <section className="relative -mt-20 z-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={p.linkTo}
                className="group block h-full bg-cream border border-pine/10 shadow-[0_20px_60px_-30px_rgba(27,67,50,0.35)] p-8 md:p-10 rounded-sm transition-all hover:shadow-[0_30px_80px_-30px_rgba(27,67,50,0.5)] hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="inline-flex size-11 items-center justify-center rounded-full bg-pine/5 text-pine">
                    <p.icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
                    {p.overline}
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-pine mb-4 text-balance">
                  {p.title}
                </h3>
                <p className="text-ink/70 text-sm leading-relaxed mb-8 text-pretty">
                  {p.body}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-pine border-b border-pine/20 pb-1 transition-colors group-hover:border-gold">
                  {p.linkLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  {
    quote:
      "Playing the 1844 Course feels like walking through a living chapter of golf history. There is nowhere else quite like the Gymkhana.",
    name: "Charles L.",
    role: "Member since 2007",
  },
  {
    quote:
      "The only grass tennis courts of the Indian Ocean — impeccably maintained. A rare privilege on this side of the world.",
    name: "Priya M.",
    role: "Tennis Section",
  },
  {
    quote:
      "We hosted our wedding on the veranda. Every detail, from the shuttered light to the service, felt effortlessly considered.",
    name: "Julien & Aisha D.",
    role: "Private Event, 2025",
  },
] as const;

function Testimonials() {
  return (
    <section className="py-24 bg-cream">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-16 max-w-2xl">
          <span className="block text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-3">
            In their words
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-pine text-balance">
            A community that stays.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name}>
              <figure className="h-full flex flex-col">
                <Quote className="size-6 text-gold mb-6" strokeWidth={1.5} />
                <blockquote className="font-serif text-xl text-pine/90 leading-relaxed text-pretty mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto pt-6 border-t border-pine/10">
                  <div className="text-sm font-semibold text-ink">{t.name}</div>
                  <div className="text-xs uppercase tracking-widest text-ink/50 mt-1">
                    {t.role}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reciprocal clubs strip ---------- */
function ReciprocalStrip() {
  const clubs = RECIPROCAL_CLUBS.slice(0, 12);
  return (
    <section className="py-20 bg-pine text-cream border-t border-gold/15">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
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
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
          {clubs.map((c) => (
            <li
              key={c.name}
              className="text-cream/75 text-sm py-2 border-b border-cream/10 flex items-baseline justify-between gap-4"
            >
              <span className="font-serif text-base truncate">{c.name}</span>
              <span className="text-[10px] uppercase tracking-widest text-gold/80 shrink-0">
                {c.country}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const HERO_TITLE = "The Living Heart of Mauritian Sporting Heritage";

function CinematicHero() {
  const words = HERO_TITLE.split(" ");
  return (
    <section className="relative min-h-screen flex flex-col justify-end pt-20 overflow-hidden">
      {/* Image layer with Ken Burns + entry scale/blur */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.15, filter: "blur(12px)", opacity: 0.4 }}
          animate={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={heroGolf}
            alt="The MGC golf course at sunset with the colonial clubhouse in the distance"
            className="ken-burns h-full w-full object-cover"
            fetchPriority="high"
          />
        </motion.div>
        {/* Cinematic overlays */}
        <div className="vignette" />
        <div className="film-grain" />
        <div className="absolute inset-0 bg-linear-to-t from-pine/80 via-pine/25 to-pine/40" />
      </div>

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

/**
 * One card treatment for every sport: image, pine scrim, title over the image.
 * Size is varied through `aspect` / `className` only — never through a second
 * visual language.
 */
function SportCard({
  image,
  title,
  overline,
  to,
  className = "",
  aspect = "aspect-[4/3]",
  large,
}: {
  image: string;
  title: string;
  overline?: string;
  to: string;
  className?: string;
  aspect?: string;
  large?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-sm ring-1 ring-black/5 ${aspect} ${className} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream`}
    >
      {/* Decorative: the link is already named by the heading below. */}
      <img
        src={image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-pine/85 via-pine/25 to-transparent" />
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
        <div>
          <h3
            className={`font-serif text-cream ${large ? "text-3xl md:text-4xl" : "text-2xl"}`}
          >
            {title}
          </h3>
          {overline && (
            <p className="mt-1 text-[11px] uppercase tracking-widest text-cream/75">
              {overline}
            </p>
          )}
        </div>
        <ArrowRight className="mb-1 size-4 shrink-0 text-cream/70 transition-transform group-hover:translate-x-1" />
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
