import { Link } from "react-router-dom";

import { FOOTER_COLUMNS, AUDIENCES } from "../_shared/content";

/*
  Footer — Variant B: 6-col ultra-rich with newsletter + logo wall.
  Defining attributes:
  - Left half is a brand block + newsletter signup
  - Right half is six condensed columns of nav (Solutions split into
    audience-grouped sub-columns plus the standard Platform/Company/Legal)
  - Below, a logo wall (placeholder mono badges) for partner / press
    attribution (Stripe-style)
  - Cross-site link "Also from GridPower" lives just above legal
  - Visually heavier than Variant A. Use when the homepage and footer
    need to do most of the cross-linking (no global mega-menu).
*/

const PARTNER_BADGES = [
  "Razorpay",
  "FAME III",
  "OCPP 2.0",
  "MQTT",
  "OpenAPI",
  "MODBUS",
];

export function FooterUltraRich() {
  // Build extra solution column from first audience
  const solutionsColumns = [
    {
      title: "Solutions · Homes",
      links: AUDIENCES[0]?.solutions ?? [],
    },
    {
      title: "Solutions · Hospitality",
      links: AUDIENCES[1]?.solutions ?? [],
    },
    ...FOOTER_COLUMNS.slice(1),
  ];

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-neutral-100)]">
      <div className="mx-auto max-w-[var(--container-2xl)] px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr]">
          {/* Brand + newsletter */}
          <div>
            <div className="flex items-center gap-2">
              <span
                className="h-7 w-7 rounded-[var(--radius-xs)]"
                style={{ backgroundColor: "var(--color-gp-red)" }}
                aria-hidden="true"
              />
              <span className="font-display text-base font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
                GridPower
              </span>
            </div>
            <p className="mt-4 max-w-[40ch] text-sm leading-[1.625] text-[var(--color-text-body)]">
              The open energy platform. Storage and charging, software-first,
              India-built. Hardware in the field, GridOS in the cloud, your team
              in the seat.
            </p>

            <div className="mt-8">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Field notes
              </p>
              <p className="mb-4 max-w-[40ch] text-sm text-[var(--color-text-body)]">
                Monthly. Real numbers from real deployments. No marketing fluff.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="flex-1 rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gp-red)] focus:outline-none"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="rounded-[var(--radius-sm)] bg-[var(--color-text-heading)] px-4 py-2 text-sm font-medium text-[var(--color-neutral-50)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-neutral-700)]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Right: 6 columns */}
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {solutionsColumns.map((col) => (
              <div key={col.title}>
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  {col.title}
                </p>
                <ul className="space-y-1.5">
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

        {/* Logo wall — mono partner badges */}
        <div className="mt-16 border-t border-[var(--color-border)] pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Open protocols, real integrations
          </p>
          <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
            {PARTNER_BADGES.map((b) => (
              <li
                key={b}
                className="rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-3 py-1.5 font-mono text-xs tracking-[0.06em] text-[var(--color-text-body)]"
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Cross-site + legal */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-6 md:flex-row md:items-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            DeltaEV Mobility Private Limited. Plot S-153, Phase III, Verna
            Industrial Estate, Goa 403722.
          </p>
          <a
            href="https://gridenergy.co.in"
            className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
          >
            Also from GridPower: GridEnergy
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M3 3h4v4M7 3L3 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
