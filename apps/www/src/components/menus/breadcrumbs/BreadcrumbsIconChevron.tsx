import { Link } from "react-router-dom";

/*
  Breadcrumbs — Variant B: With separators + home icon.
  Defining attributes:
  - Home icon as first crumb, chevron separators, monospaced labels
  - Geist Mono labels at text-[10px], wider tracking
  - Sits inside a thin chrome-y row with a hairline underline
  - Reads more like a "you are here" status bar than a sentence.
  - Use on docs / resources sections where the path is informational
    not narrative.
*/

const TRAIL = [
  { label: "Solutions", href: "/solutions" },
  { label: "Hospitality", href: "/solutions/hospitality" },
  { label: "Hotels", href: "/solutions/hospitality/hotels" },
];

function ChevronRight() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M3.5 2.5L6.5 5L3.5 7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M1.5 6L6 1.5L10.5 6V10a.5.5 0 0 1-.5.5H2A.5.5 0 0 1 1.5 10V6Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function BreadcrumbsIconChevron() {
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-neutral-50)]">
      <div className="mx-auto flex max-w-[var(--container-2xl)] items-center px-6 py-2.5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2">
            <li>
              <Link
                to="/"
                aria-label="Home"
                className="flex items-center text-[var(--color-text-muted)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
              >
                <HomeIcon />
              </Link>
            </li>
            {TRAIL.map((c, i) => {
              const last = i === TRAIL.length - 1;
              return (
                <li key={c.href} className="flex items-center gap-x-2">
                  <span className="text-[var(--color-text-muted)]/70">
                    <ChevronRight />
                  </span>
                  {last ? (
                    <span
                      aria-current="page"
                      className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-heading)]"
                    >
                      {c.label}
                    </span>
                  ) : (
                    <Link
                      to={c.href}
                      className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                    >
                      {c.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
