import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, MapPin } from "@phosphor-icons/react";
import { Logo } from "../Logo";
import { tokens } from "../../routes/_preview/_v3-tokens";

/*
  SiteFooter — tokens.* (olive substrate + GridRed spark).
  Mirrors the GlobalHeader mega-panel language: dark spotlight brand tile,
  hairline-separated link columns, uppercase micro-labels, GridRed only on the
  conversion CTA. Operator-grade, type-led, honest (PRODUCT.md / DESIGN.md).

  Layout
  - mobile  : brand tile, then 2-col link grid, then stacked bottom bar
  - desktop : 340px brand tile | four link columns; single-row bottom bar

  Identity is locked, so this is alignment + polish, not a redesign:
  hover/focus live in one scoped CSS block (keyboard-accessible, reduced-motion
  aware); all text passes AA on the light substrate.

  NOTE (verify before launch): the sister-site chip points at gridcharge.co.in;
  confirm that domain is live, else swap to an internal placeholder route.
*/

const SOLUTIONS_LINKS = [
  { label: "Homes", href: "/solutions/homes" },
  { label: "Offices & Industrial", href: "/solutions/homes" },
  { label: "Hospitality", href: "/solutions/homes" },
  { label: "Enterprises", href: "/solutions/homes" },
  { label: "Educational Institutes", href: "/solutions/homes" },
] as const;

const PLATFORM_LINKS = [
  { label: "GridOS", href: "/platform" },
  { label: "Mobile app", href: "/app" },
  { label: "Economics model", href: "/economics" },
  { label: "Product range", href: "/products" },
  { label: "Resources", href: "/resources" },
] as const;

const COMPANY_LINKS = [
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Compliance", href: "/compliance" },
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
          // Tokens surfaced as CSS vars so hover/focus can live in the scoped
          // <style> block below instead of per-element JS handlers.
          "--ge-link": tokens.body,
          "--ge-link-hover": tokens.ink,
          "--ge-brand": tokens.brand,
          "--ge-brand-hover": tokens.brandHover,
          "--ge-chip-border": tokens.hairline,
          "--ge-chip-border-hover": tokens.hairlineStrong,
          "--ge-chip-bg": tokens.card,
        } as React.CSSProperties
      }
    >
      <style>{FOOTER_CSS}</style>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        {/* Main region: brand tile + link columns */}
        <div className="grid gap-12 py-14 lg:grid-cols-[340px_1fr] lg:gap-16 lg:py-16">
          {/* Brand block — dark spotlight tile, mirrors the mega-panel */}
          <div
            style={{
              background: tokens.ink,
              borderRadius: 20,
              padding: "28px 28px 24px",
            }}
          >
            <Link
              to="/"
              className="ge-brandmark flex items-center gap-2.5 mb-5"
              aria-label="GridEnergy home"
            >
              <Logo variant="gridenergy" size={28} fill="#ffffff" />
              <span
                className="text-[15px] font-semibold tracking-[-0.02em]"
                style={{ color: "#ffffff" }}
              >
                GridEnergy
              </span>
            </Link>

            <p
              className="text-[13.5px] leading-[1.65] mb-5"
              style={{ color: "rgba(255,255,255,0.68)", maxWidth: "36ch" }}
            >
              Battery storage for Indian homes, offices, campuses, and enterprises. GridOS
              runs every stack from the cloud: meter reads, payback math, open standards,
              no lock-in.
            </p>

            {/* HQ location — an honest fact, not a fabricated status indicator */}
            <div className="flex items-center gap-2 mb-6">
              <MapPin
                size={13}
                weight="fill"
                style={{ color: tokens.accentLine, flexShrink: 0 }}
              />
              <span
                className="text-[11px] uppercase tracking-[0.14em]"
                style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600 }}
              >
                Verna, Goa · India
              </span>
            </div>

            <Link
              to="/contact"
              className="ge-cta inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.08em] font-semibold"
              style={{
                background: tokens.brand,
                color: "#ffffff",
                padding: "9px 16px",
                borderRadius: 12,
                textDecoration: "none",
              }}
            >
              <span>Get early access</span>
              <ArrowRight size={12} weight="bold" />
            </Link>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 pt-1 sm:grid-cols-4 sm:gap-12 lg:pt-2">
            <FooterColumn title="Solutions" links={SOLUTIONS_LINKS} />
            <FooterColumn title="Platform" links={PLATFORM_LINKS} />
            <FooterColumn title="Company" links={COMPANY_LINKS} />
            <FooterColumn title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        {/* Hairline divider */}
        <div style={{ height: 1, background: tokens.hairline }} />

        {/* Bottom bar — extra bottom padding below lg clears the fixed
            MobileSiteNav tab bar (64px, rendered only on lg:hidden). */}
        <div className="flex flex-col gap-4 pt-5 pb-28 sm:flex-row sm:items-center sm:justify-between lg:pb-5">
          <p className="text-[12px] leading-[1.5]" style={{ color: tokens.body }}>
            © {year} DeltaEV Mobility Private Limited.{" "}
            <span style={{ color: tokens.muted }}>GridEnergy is a DeltaEV brand.</span>
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
/*  FooterColumn                                                       */
/* ------------------------------------------------------------------ */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <p
        className="text-[10px] uppercase tracking-[0.16em] mb-4"
        style={{ color: tokens.inkMuted, fontWeight: 700 }}
      >
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.href} className="ge-col-link text-[13px]">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
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
  transition: border-color 0.15s ease, background 0.15s ease;
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
