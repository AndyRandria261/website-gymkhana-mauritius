import { Linkedin } from "lucide-react";

export type TeamMember = {
  name: string;
  /** Portfolio or title, e.g. "President". Rendered as a gold overline. */
  role: string;
  /** Imported image module or URL. */
  avatar: string;
  /** Profile link (LinkedIn). Opens in a new tab. */
  link: string;
};

/**
 * A grid of portrait cards for people (committee members, staff, coaches).
 * Presentational only -pass the members in. The card design follows the
 * club's shared language: cream card, pine serif name, gold overline role
 * and a restrained grayscale-to-colour hover, echoing the site's Reveal motion.
 */
export function TeamSection({
  members,
  className = "",
}: {
  members: TeamMember[];
  className?: string;
}) {
  return (
    <div className={`grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {members.map((member, index) => (
        <article
          key={member.name}
          className="group overflow-hidden rounded-sm bg-cream ring-1 ring-pine/10 transition-shadow duration-500 hover:shadow-md"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={member.avatar}
              alt={member.name}
              width={826}
              height={1239}
              loading="lazy"
              className="h-full w-full object-cover object-top grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
            />
          </div>
          <div className="p-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-xl text-pine transition-[letter-spacing] duration-500 group-hover:tracking-wide">
                {member.name}
              </h3>
              <span className="text-xs text-ink/40">_0{index + 1}</span>
            </div>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                {member.role}
              </span>
              <a
                href={member.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="text-ink/40 transition-colors duration-200 hover:text-pine focus-visible:outline-none focus-visible:text-pine"
              >
                <Linkedin className="size-4" />
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default TeamSection;
