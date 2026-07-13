import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus } from "lucide-react";
import heroGolf from "@/assets/hero-golf-course.jpg";
import sportGolf from "@/assets/sport-golf.jpg";
import sportTennis from "@/assets/sport-tennis.jpg";
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
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src={heroGolf}
            alt="The MGC golf course at sunset with the colonial clubhouse in the distance"
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-linear-to-t from-pine/70 via-pine/20 to-pine/40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24">
          <div className="max-w-3xl fade-up">
            <span className="mb-4 block text-sm font-medium uppercase tracking-[0.3em] text-gold">
              Since 1849 · Vacoas, Mauritius
            </span>
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-cream text-balance mb-8">
              The Living Heart of Mauritian Sporting Heritage
            </h1>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/membership"
                className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink ring-1 ring-gold transition-transform hover:-translate-y-px"
              >
                <Plus className="size-4 shrink-0" strokeWidth={2.2} />
                Become a Member
              </Link>
              <Link
                to="/sports/golf"
                className="inline-flex items-center gap-2 bg-cream/10 backdrop-blur-sm px-6 py-3 text-sm font-medium text-cream ring-1 ring-cream/30 transition-colors hover:bg-cream/20"
              >
                Visitor Green Fees
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

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
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-pine border-b border-pine/20 pb-1"
            >
              All sports <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SportCard
              featured
              image={sportGolf}
              title="The 1844 Course"
              overline="Championship Golf · 18 holes"
              to="/sports/golf"
            />
            <SportCard
              image={sportTennis}
              title="Grass Tennis"
              overline="The only grass courts of the Indian Ocean"
              to="/sports/tennis"
              tallCard
            />
            <SportCardStacked image={sportSquash} title="Squash" to="/sports/squash" />
            <SportCardStacked
              image={sportFitness}
              title="Health & Fitness"
              to="/sports/fitness"
            />
            <SportCardStacked image={sportPool} title="Swimming" to="/sports/pool" />
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
          <div className="mb-12 flex justify-between items-end">
            <h2 className="font-serif text-4xl text-pine">Club Life</h2>
            <Link
              to="/events"
              className="text-sm font-medium text-ink/60 hover:text-pine transition-colors"
            >
              View calendar
            </Link>
          </div>
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
              <Link
                to="/membership"
                className="inline-flex items-center gap-2 bg-gold py-3 pr-5 pl-4 text-sm font-medium text-ink ring-1 ring-gold"
              >
                <Plus className="size-4 shrink-0" strokeWidth={2.2} />
                Enquire about Membership
              </Link>
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

function SportCard({
  image,
  title,
  overline,
  to,
  featured,
  tallCard,
}: {
  image: string;
  title: string;
  overline?: string;
  to: string;
  featured?: boolean;
  tallCard?: boolean;
}) {
  return (
    <Link
      to={to}
      className={`relative group overflow-hidden rounded-sm ring-1 ring-black/5 ${
        featured ? "md:col-span-2" : ""
      } ${tallCard ? "" : ""}`}
    >
      <img
        src={image}
        alt={title}
        loading="lazy"
        className={`w-full ${featured ? "aspect-[16/10]" : "aspect-square"} object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]`}
      />
      <div className="absolute inset-0 bg-linear-to-t from-pine/85 via-pine/20 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="font-serif text-2xl md:text-3xl text-cream">{title}</h3>
        {overline && (
          <p className="mt-1 text-[11px] uppercase tracking-widest text-cream/75">
            {overline}
          </p>
        )}
      </div>
    </Link>
  );
}

function SportCardStacked({
  image,
  title,
  to,
}: {
  image: string;
  title: string;
  to: string;
}) {
  return (
    <Link to={to} className="group">
      <div className="overflow-hidden rounded-sm ring-1 ring-black/5">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <h3 className="font-serif text-xl text-pine">{title}</h3>
        <ArrowRight className="size-4 text-pine/50 transition-transform group-hover:translate-x-1" />
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
          className="inline-flex items-center gap-2 text-sm font-semibold text-pine border-b border-pine/20 pb-1 hover:text-pine/70"
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
}: {
  category: string;
  date: string;
  title: string;
  excerpt: string;
}) {
  return (
    <article className="space-y-3">
      <div className="text-xs font-semibold tracking-widest text-gold uppercase">
        {category}
      </div>
      <h3 className="font-serif text-xl text-ink">{title}</h3>
      <p className="text-sm text-ink/65 leading-relaxed">{excerpt}</p>
      <div className="text-xs text-ink/40 uppercase tracking-widest">{date}</div>
    </article>
  );
}
