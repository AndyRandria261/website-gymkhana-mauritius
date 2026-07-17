import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import { CLUB_ADDRESS } from "@/lib/club-contact";

const SOCIALS = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: Facebook },
  {
    label: "WhatsApp",
    href: "https://wa.me/",
    Icon: (props: React.SVGProps<SVGSVGElement>) => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.695.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M20.52 3.449C18.24 1.245 15.24 0 12.05 0 5.495 0 .16 5.334.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.882 11.882 0 0 0 5.687 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.426-8.452zM12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.002-5.45 4.437-9.884 9.889-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884z"/>
      </svg>
    ),
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/", Icon: Linkedin },
  { label: "YouTube", href: "https://www.youtube.com/", Icon: Youtube },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-cream border-t border-pine/10 pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src="/mcg-logo.png" alt="Mauritius Gymkhana Club" className="h-16 w-auto" />
              <span className="font-serif text-2xl text-pine">Mauritius Gymkhana Club</span>
            </Link>
            <p className="text-sm text-ink/60 max-w-[32ch] leading-relaxed">
              {CLUB_ADDRESS.full}
              <br />
              Established 1849.
            </p>
          </div>
          <FooterCol title="The Club">
            <FooterLink to="/the-club/history">Our History</FooterLink>
            <FooterLink to="/membership/reciprocal">Reciprocal Clubs</FooterLink>
            <FooterLink to="/the-club/careers">Careers</FooterLink>
            <FooterLink to="/the-club/tenders">Tender Bids</FooterLink>
          </FooterCol>
          <FooterCol title="Activities">
            <FooterLink to="/sports/golf">Golf</FooterLink>
            <FooterLink to="/sports/tennis">Grass Tennis</FooterLink>
            <FooterLink to="/sports/fitness">Fitness</FooterLink>
            <FooterLink to="/dining">Dining</FooterLink>
          </FooterCol>
          <FooterCol title="Visit">
            <FooterLink to="/contact">Contact & Directions</FooterLink>
            <FooterLink to="/venue-hire">Venue Hire</FooterLink>
            <FooterLink to="/events">Events</FooterLink>
            <FooterLink to="/news">News</FooterLink>
            <FooterLink to="/gallery">Gallery</FooterLink>
          </FooterCol>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-pine/5">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">
            Follow the Club
          </span>
          <ul className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-pine/15 text-pine transition-colors hover:bg-pine hover:text-cream hover:border-pine focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-pine/5 text-[10px] uppercase tracking-widest text-ink/40 gap-4">
          <p>© {new Date().getFullYear()} Mauritius Gymkhana Club. All rights reserved.</p>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <Link to="/">Privacy</Link>
            <Link to="/">Terms</Link>
            <a
              href="https://www.visylo.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pine transition-colors"
            >
              Powered By Visylo Consulting
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="md:col-span-2">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-6">{title}</h4>
      <ul className="space-y-4 text-sm text-ink/70">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="hover:text-pine transition-colors">
        {children}
      </Link>
    </li>
  );
}
