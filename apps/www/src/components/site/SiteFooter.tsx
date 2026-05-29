import { Link } from "react-router";
import { ArrowRight } from "@phosphor-icons/react";
import { Logo } from "../Logo";
import { tokens } from "../../routes/_preview/_v3-tokens";

/*
  SiteFooter — tokens.* (olive substrate + GridRed brand).
  Matches the GlobalHeader mega-panel visual language:
  rounded Rect tiles, hairline borders, uppercase micro-labels,
  GridRed accents, dark spotlight treatment for brand block.

  Layout (desktop): brand block | four link columns
  Bottom bar: copyright + legal links + "Also from GridPower → GridCharge" chip
*/

const SOLUTIONS_LINKS = [
  { label: "Homes", href: "/solutions/homes" },
  { label: "Hospitality", href: "/solutions/homes" },
  { label: "Offices & Industrial", href: "/solutions/homes" },
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
  return (
    <footer
      style={{
        background: tokens.pageBgDeep,
        borderTop: `1px solid ${tokens.hairline}`,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Main grid */}
      <div className="mx-auto max-w-[1280px] px-8">
        <div
          className="grid py-16"
          style={{ gridTemplateColumns: "1fr auto", gap: 48 }}
        >
          {/* Brand block — dark tile with GridRed accent */}
          <div style={{ maxWidth: 340 }}>
            <div
              style={{
                background: tokens.ink,
                borderRadius: 20,
                padding: "28px 28px 24px",
                display: "inline-block",
                width: "100%",
              }}
            >
              {/* Logo + wordmark */}
              <Link
                to="/"
                className="flex items-center gap-2.5 mb-5"
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
                style={{ color: "rgba(255,255,255,0.65)", maxWidth: "34ch" }}
              >
                Energy storage for India — homes, offices, campuses, and enterprises. Software-first. Open standards. GridOS in the cloud.
              </p>

              {/* Status chip */}
              <div className="flex items-center gap-2 mb-5">
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: 999,
                    background: tokens.accentLine,
                    flexShrink: 0,
                  }}
                />
                <span
                  className="text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: "rgba(255,255,255,0.45)", fontWeight: 600 }}
                >
                  All systems operational
                </span>
              </div>

              {/* CTA */}
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.08em] font-semibold transition-colors"
                style={{
                  background: tokens.brand,
                  color: "#ffffff",
                  padding: "9px 16px",
                  borderRadius: 12,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = tokens.brandHover;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = tokens.brand;
                }}
              >
                <span>Get early access</span>
                <ArrowRight size={12} weight="bold" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-4 gap-12 pt-2">
            <FooterColumn title="Solutions" links={SOLUTIONS_LINKS} />
            <FooterColumn title="Platform" links={PLATFORM_LINKS} />
            <FooterColumn title="Company" links={COMPANY_LINKS} />
            <FooterColumn title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        {/* Hairline divider */}
        <div style={{ height: 1, background: tokens.hairline }} />

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between py-4 flex-wrap gap-3"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <span
              className="text-[12px]"
              style={{ color: tokens.muted }}
            >
              {/* placeholder — replace year and entity before launch */}
              &copy; {new Date().getFullYear()} GridEnergy. All rights reserved. [Placeholder — legal entity name pending.]
            </span>
            <span style={{ width: 1, height: 12, background: tokens.hairlineStrong, display: "inline-block" }} />
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="text-[12px] transition-colors"
                style={{ color: tokens.muted, textDecoration: "none" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = tokens.body;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = tokens.muted;
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* "Also from GridPower → GridCharge" chip — mirrors mega-panel footer */}
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] uppercase tracking-[0.12em]"
              style={{ color: tokens.muted, fontWeight: 600 }}
            >
              Also from GridPower
            </span>
            <Link
              to="/solutions/homes"
              className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] font-semibold transition-colors"
              style={{
                color: tokens.ink,
                background: tokens.card,
                padding: "6px 10px 6px 8px",
                borderRadius: 10,
                border: `1px solid ${tokens.hairline}`,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = tokens.hairlineStrong;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = tokens.hairline;
              }}
            >
              <Logo variant="gridcharge" size={16} />
              GridCharge
              <ArrowRight size={12} weight="bold" />
            </Link>
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
    <div>
      <p
        className="text-[10px] uppercase tracking-[0.16em] mb-4"
        style={{ color: tokens.inkMuted, fontWeight: 700 }}
      >
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              to={l.href}
              className="text-[13px] transition-colors"
              style={{ color: tokens.body, textDecoration: "none" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = tokens.ink;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = tokens.body;
              }}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
