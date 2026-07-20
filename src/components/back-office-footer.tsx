import { Link } from "@tanstack/react-router";

/** Stripped-down footer for the Back Office area - no marketing links, no socials. */
export function BackOfficeFooter() {
  return (
    <footer className="border-t border-pine/10 bg-cream py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-[10px] uppercase tracking-widest text-ink/40 md:flex-row">
        <p>© {new Date().getFullYear()} Mauritius Gymkhana Club. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/" className="transition-colors hover:text-pine">
            Privacy
          </Link>
          <Link to="/" className="transition-colors hover:text-pine">
            Terms
          </Link>
          <a
            href="https://www.visylo.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-pine"
          >
            Powered By Visylo Consulting
          </a>
        </div>
      </div>
    </footer>
  );
}
