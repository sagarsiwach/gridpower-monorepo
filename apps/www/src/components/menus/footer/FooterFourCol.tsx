import { Link } from "react-router-dom";

import { FOOTER_COLUMNS } from "../_shared/content";

/*
  Footer — Variant A: 4-col standard.
  Defining attributes:
  - 4 link columns + brand block, no newsletter, no logo wall
  - Quietest possible footer. The page's last visual moment is
    the section above it (a Committed CTA or product narrative),
    not the footer itself.
  - Legal strip below, single line. Bottom-right: legal entity.
*/

export function FooterFourCol() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-neutral-100)]">
      <div className="mx-auto max-w-[var(--container-2xl)] px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="h-6 w-6 rounded-[var(--radius-xs)]"
                style={{ backgroundColor: "var(--color-gp-red)" }}
                aria-hidden="true"
              />
              <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
                GridPower
              </span>
            </div>
            <p className="mt-4 max-w-[36ch] text-sm text-[var(--color-text-body)]">
              India's open energy infrastructure company. Hardware, edge, cloud,
              console, and app, built around open protocols.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  {col.title}
                </p>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        to={l.href}
                        className="text-sm text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[var(--color-border)] pt-6 md:flex-row md:items-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            DeltaEV Mobility Private Limited. Plot S-153, Verna, Goa 403722.
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            (c) 2026 GridPower. Open by default.
          </p>
        </div>
      </div>
    </footer>
  );
}
