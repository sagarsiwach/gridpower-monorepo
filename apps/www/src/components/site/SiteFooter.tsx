import { Link } from "react-router";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Logo } from "../Logo";
import { tokens } from "../../routes/_preview/_v3-tokens";

/*
  SiteFooter — "Statement" direction (tokens.*: olive substrate + GridRed spark).
  The footer is the last conversion moment: a type-led CTA line up top, then the
  link columns, then a slim legal bar. Operator-grade, type-led, honest
  (PRODUCT.md / DESIGN.md). GridRed is the only saturated color, on the CTA.

  Layout
  - mobile  : stacked headline + CTA, 2-col link grid, stacked legal bar
  - desktop : headline left / CTA right, four link columns, single-row legal bar

  Hover + keyboard focus live in one scoped CSS block (reduced-motion aware);
  all text passes AA on the light substrate.

  NOTE (verify before launch): the sister-site chip points at gridcharge.co.in;
  confirm that domain is live, else swap to an internal placeholder route.
*/

const COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "Homes", href: "/solutions/homes" },
      { label: "Offices & Industrial", href: "/solutions/homes" },
      { label: "Hospitality", href: "/solutions/homes" },
      { label: "Enterprises", href: "/solutions/homes" },
      { label: "Educational Institutes", href: "/solutions/homes" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "GridOS", href: "/platform" },
      { label: "Mobile app", href: "/app" },
      { label: "Economics model", href: "/economics" },
      { label: "Product range", href: "/products" },
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
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="ge-footer"
      style={
        {
          background: tokens.pageBgDeep,
          borderTop: `1px solid ${tokens.hairline}`,
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          // Tokens surfaced as CSS vars so hover/focus live in the scoped
          // <style> block below instead of per-element JS handlers.
          "--ge-link": tokens.body,
          "--ge-link-hover": tokens.ink,
          "--ge-brand": tokens.brand,
          "--ge-brand-hover": tokens.brandHover,
          "--ge-chip-border-hover": tokens.hairlineStrong,
        } as React.CSSProperties
      }
    >
      <style>{FOOTER_CSS}</style>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        {/* Statement / CTA row */}
        <div className="grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <Link
              to="/"
              className="ge-brandmark inline-flex items-center gap-2.5 mb-6"
              aria-label="GridEnergy home"
            >
              <Logo variant="gridenergy" size={26} />
              <span
                className="text-[15px] font-semibold tracking-[-0.02em]"
                style={{ color: tokens.ink }}
              >
                GridEnergy
              </span>
            </Link>
            <h2
              className="text-[clamp(28px,4vw,44px)] font-semibold leading-[1.08]"
              style={{
                color: tokens.ink,
                letterSpacing: "-0.03em",
                textWrap: "balance",
                maxWidth: "18ch",
              }}
            >
              Enter your load and tariff. Get a sized stack and payback in 48 hours.
            </h2>
          </div>

          <Link
            to="/contact"
            className="ge-cta inline-flex items-center gap-2.5 text-[14px] font-semibold whitespace-nowrap"
            style={{
              background: tokens.brand,
              color: "#ffffff",
              padding: "14px 24px",
              borderRadius: 14,
              textDecoration: "none",
            }}
          >
            <span>Get early access</span>
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>

        <div style={{ height: 1, background: tokens.hairline }} />

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-12 sm:grid-cols-4 sm:gap-12">
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p
                className="text-[10px] uppercase tracking-[0.16em] mb-4"
                style={{ color: tokens.inkMuted, fontWeight: 700 }}
              >
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="ge-col-link text-[13px]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div style={{ height: 1, background: tokens.hairline }} />

        {/* Legal bar — extra bottom padding below lg clears the fixed
            MobileSiteNav tab bar (64px, rendered only on lg:hidden). */}
        <div className="flex flex-col gap-4 pt-5 pb-28 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p className="text-[12px] leading-[1.5]" style={{ color: tokens.body }}>
            © {year} DeltaEV Mobility Private Limited.{" "}
            <span style={{ color: tokens.muted }}>
              GridEnergy is a DeltaEV brand. Verna, Goa.
            </span>
          </p>

          {/* Sister site — GridCharge is co-equal, not a parent/child of GridPower */}
          <div className="flex items-center gap-2.5">
            <span
              className="text-[10px] uppercase tracking-[0.12em]"
              style={{ color: tokens.inkMuted, fontWeight: 700, flexShrink: 0 }}
            >
              Sister site
            </span>
            <a
              href="https://gridcharge.co.in"
              className="ge-chip flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] font-semibold"
              style={{
                color: tokens.ink,
                background: tokens.card,
                padding: "6px 10px 6px 8px",
                borderRadius: 10,
                border: `1px solid ${tokens.hairline}`,
                textDecoration: "none",
              }}
            >
              <Logo variant="gridcharge" size={16} />
              GridCharge
              <ArrowUpRight size={12} weight="bold" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Scoped interaction styles — hover + keyboard focus + reduced motion */
/* ------------------------------------------------------------------ */

const FOOTER_CSS = `
.ge-footer .ge-col-link {
  color: var(--ge-link);
  text-decoration: none;
  transition: color 0.15s ease;
}
.ge-footer .ge-col-link:hover,
.ge-footer .ge-col-link:focus-visible {
  color: var(--ge-link-hover);
}
.ge-footer .ge-cta {
  transition: background 0.15s ease;
}
.ge-footer .ge-cta:hover,
.ge-footer .ge-cta:focus-visible {
  background: var(--ge-brand-hover);
}
.ge-footer .ge-cta svg {
  transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
}
.ge-footer .ge-cta:hover svg,
.ge-footer .ge-cta:focus-visible svg {
  transform: translateX(2px);
}
.ge-footer .ge-chip {
  transition: border-color 0.15s ease;
}
.ge-footer .ge-chip:hover,
.ge-footer .ge-chip:focus-visible {
  border-color: var(--ge-chip-border-hover);
}
.ge-footer .ge-brandmark {
  text-decoration: none;
  border-radius: 6px;
}
.ge-footer a:focus-visible {
  outline: 2px solid var(--ge-brand);
  outline-offset: 3px;
}
.ge-footer .ge-cta:focus-visible,
.ge-footer .ge-chip:focus-visible {
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .ge-footer .ge-col-link,
  .ge-footer .ge-cta,
  .ge-footer .ge-cta svg,
  .ge-footer .ge-chip {
    transition: none;
  }
  .ge-footer .ge-cta:hover svg,
  .ge-footer .ge-cta:focus-visible svg {
    transform: none;
  }
}
`;
