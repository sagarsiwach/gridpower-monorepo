import { Link } from "react-router-dom";

/*
  Breadcrumbs — Variant A: Text-only minimal.
  Defining attributes:
  - Inter, text-xs. Plain slashes as separators.
  - Final crumb in neutral-900, others in neutral-500.
  - No home icon, no chevrons, no surface fill.
  - Used at the top of deep solution pages, sits flush against
    the page body — looks like prose, not chrome.
*/

const TRAIL = [
  { label: "Solutions", href: "/solutions" },
  { label: "Hospitality", href: "/solutions/hospitality" },
  { label: "Hotels", href: "/solutions/hospitality/hotels" },
];

export function BreadcrumbsMinimal() {
  return (
    <div className="px-6 py-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-1.5 text-xs">
          {TRAIL.map((c, i) => {
            const last = i === TRAIL.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-x-1.5">
                {last ? (
                  <span
                    aria-current="page"
                    className="text-[var(--color-text-heading)]"
                  >
                    {c.label}
                  </span>
                ) : (
                  <Link
                    to={c.href}
                    className="text-[var(--color-text-muted)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                  >
                    {c.label}
                  </Link>
                )}
                {!last ? (
                  <span aria-hidden="true" className="text-[var(--color-text-muted)]">
                    /
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
