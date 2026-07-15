import { Link } from "react-router";

/*
  Main solutions-led navigation.
  Logo left, center nav, primary CTA right.
  Mega-menu mechanics on Solutions hover (desktop).
  Mobile collapse into Sheet drawer — out of scope for foundation.

  Audience order locked per site. This shell uses placeholder audience
  list — real solutions populate in SAG-2985 (Homepages).
*/
const MAIN_LINKS = [
  { label: "Solutions", href: "/solutions", hasMenu: true },
  { label: "Platform", href: "/platform" },
  { label: "App", href: "/app" },
  { label: "Economics", href: "/economics" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-page-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-page-bg)]/80">
      <div className="mx-auto flex max-w-[var(--container-2xl)] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          aria-label="GridPower home"
          className="flex items-center gap-2"
        >
          <div
            className="h-7 w-7 rounded-sm"
            style={{ backgroundColor: "var(--color-gp-red)" }}
            aria-hidden="true"
          />
          <span className="font-display text-base font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
            GridPower
          </span>
        </Link>

        {/* Center nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {MAIN_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                >
                  {link.label}
                  {link.hasMenu && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 3.75L5 6.25L7.5 3.75"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/signup"
            className="hidden rounded-sm bg-[var(--color-gp-red)] px-4 py-2 text-sm font-medium text-[var(--color-neutral-50)] transition-all duration-[var(--duration-hover)] hover:bg-[var(--color-gp-red-hover)] md:inline-block"
          >
            Get early access
          </Link>

          {/* Mobile hamburger — Sheet drawer wired in SAG-2985 */}
          <button
            type="button"
            aria-label="Open menu"
            className="lg:hidden"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 5h14M3 10h14M3 15h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
