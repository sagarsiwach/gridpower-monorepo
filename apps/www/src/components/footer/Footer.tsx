import { Link } from "react-router-dom";

/*
  Richer multi-column footer.
  Four content columns + newsletter + legal strip.
  "Also from GridPower" cross-link surfaces the sibling site.

  Cross-link target adapts per host (gridenergy.co.in points to
  gridcharge.co.in, and vice versa). For foundation, both placeholders.
*/

const COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "Homes", href: "/solutions/homes" },
      { label: "Offices", href: "/solutions/offices" },
      { label: "Industrial", href: "/solutions/industrial" },
      { label: "Hospitality", href: "/solutions/hospitality" },
      { label: "Enterprises", href: "/solutions/enterprises" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "GridOS", href: "/platform" },
      { label: "App", href: "/app" },
      { label: "Economics", href: "/economics" },
      { label: "Products", href: "/products" },
      { label: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Partners", href: "/partners" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Cookies", href: "/cookies" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-neutral-100)]">
      <div className="mx-auto max-w-[var(--container-2xl)] px-6 py-16">
        {/* Top: brand + newsletter */}
        <div className="grid gap-12 border-b border-[var(--color-border)] pb-12 md:grid-cols-2">
          <div>
            <div className="flex items-center gap-2">
              <div
                className="h-7 w-7 rounded-sm"
                style={{ backgroundColor: "var(--color-gp-red)" }}
                aria-hidden="true"
              />
              <span className="font-display text-base font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
                GridPower
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm text-[var(--color-text-body)]">
              India's open energy infrastructure company. Hardware,
              edge, cloud, console, and app — built around open protocols
              and transparent economics.
            </p>
          </div>

          <div>
            <p className="mb-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              Field notes
            </p>
            <p className="mb-4 text-sm text-[var(--color-text-body)]">
              Monthly. Real numbers from real deployments. No marketing fluff.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 rounded-xs border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gp-red)] focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="rounded-sm bg-[var(--color-text-heading)] px-4 py-2 text-sm font-medium text-[var(--color-neutral-50)] transition-all duration-[var(--duration-hover)] hover:bg-[var(--color-neutral-700)]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle: 4 link columns */}
        <div className="grid gap-8 py-12 sm:grid-cols-2 md:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: cross-site link + legal */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-8 md:flex-row md:items-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            GridPower is a brand of DeltaEV Mobility Private Limited.
            Plot No. S-153, Phase III, Verna Industrial Estate, Goa 403722.
          </p>
          <a
            href="https://gridcharge.co.in"
            className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
          >
            Also from GridPower: GridCharge
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 3h4v4M7 3L3 7"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
