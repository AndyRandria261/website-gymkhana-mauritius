import { Link } from "@tanstack/react-router";
import { CLUB_ADDRESS } from "@/lib/club-contact";

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
