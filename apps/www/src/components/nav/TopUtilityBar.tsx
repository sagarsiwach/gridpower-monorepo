import { Link } from "react-router-dom";

/*
  Top utility bar.
  Sits above the main solutions nav.
  Small, low-emphasis. Cross-site utility navigation only.
  Hidden on mobile (consolidated into hamburger drawer instead).
*/
const UTILITY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Support", href: "/support" },
  { label: "Sign in", href: "/sign-in" },
];

export function TopUtilityBar() {
  return (
    <div className="hidden border-b border-[var(--color-border)] bg-[var(--color-neutral-100)] md:block">
      <div className="mx-auto flex max-w-[var(--container-2xl)] items-center justify-between px-6 py-2">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          The Open Energy Platform
        </p>
        <nav>
          <ul className="flex items-center gap-6">
            {UTILITY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-xs text-[var(--color-text-muted)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
