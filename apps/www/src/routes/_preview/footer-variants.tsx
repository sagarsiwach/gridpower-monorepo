import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, MapPin } from "@phosphor-icons/react";
import { Logo } from "../../components/Logo";
import { SiteFooter } from "../../components/site/SiteFooter";
import { tokens } from "./_v3-tokens";

/*
  Footer variant gallery — three directions to compare, all inside the locked
  V3 identity (olive substrate + GridRed, operator-grade, type-led).
  A: Spotlight (the current SiteFooter). B: Statement. C: Drenched dark.
  Whichever wins becomes the canonical SiteFooter; this route is throwaway.
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

export default function FooterVariants() {
  return (
    <div style={{ background: tokens.pageBg, minHeight: "100vh" }}>
      <style>{GALLERY_CSS}</style>

      <header
        className="mx-auto max-w-[1280px] px-8 py-14"
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
      >
        <p
          className="text-[11px] uppercase tracking-[0.16em] mb-3"
          style={{ color: tokens.brand, fontWeight: 700 }}
        >
          Preview · footer directions
        </p>
        <h1
          className="text-[40px] font-semibold tracking-[-0.03em] leading-[1.05] mb-3"
          style={{ color: tokens.ink }}
        >
          Three footers. Pick one.
        </h1>
        <p className="text-[15px] leading-[1.6]" style={{ color: tokens.body, maxWidth: "60ch" }}>
          Same identity, three moods. A is what's wired now. Tell me the letter and I'll make it
          the canonical SiteFooter.
        </p>
      </header>

      <VariantBand
        letter="A"
        name="Spotlight"
        note="Dark brand tile + four columns. Dense, operator. (Currently wired.)"
      >
        <SiteFooter />
      </VariantBand>

      <VariantBand
        letter="B"
        name="Statement"
        note="Footer is the last conversion moment: a type-led CTA line, lighter links below."
      >
        <FooterStatement />
      </VariantBand>

      <VariantBand
        letter="C"
        name="Drenched dark"
        note="Whole footer on near-black, warm-white columns, GridRed CTA. Heavy base for the page."
      >
        <FooterDark />
      </VariantBand>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Band wrapper                                                       */
/* ------------------------------------------------------------------ */

function VariantBand({
  letter,
  name,
  note,
  children,
}: {
  letter: string;
  name: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginTop: 8 }}>
      <div
        className="mx-auto max-w-[1280px] px-8 flex items-center gap-3 py-4"
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
      >
        <span
          className="inline-flex items-center justify-center text-[13px] font-bold"
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background: tokens.brand,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {letter}
        </span>
        <span className="text-[14px] font-semibold" style={{ color: tokens.ink }}>
          {name}
        </span>
        <span className="text-[13px]" style={{ color: tokens.muted }}>
          {note}
        </span>
      </div>
      <div style={{ borderTop: `2px solid ${tokens.ink}` }}>{children}</div>
    </section>
  );
}

/* ================================================================== */
/*  Variant B — Statement                                             */
/* ================================================================== */

function FooterStatement() {
  return (
    <footer
      className="fv-b"
      style={
        {
          background: tokens.pageBgDeep,
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          "--ge-link": tokens.body,
          "--ge-link-hover": tokens.ink,
          "--ge-brand": tokens.brand,
          "--ge-brand-hover": tokens.brandHover,
        } as React.CSSProperties
      }
    >
      <style>{STATEMENT_CSS}</style>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        {/* CTA statement row */}
        <div className="grid gap-8 py-16 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <Link
              to="/"
              className="fv-brandmark inline-flex items-center gap-2.5 mb-6"
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
              style={{ color: tokens.ink, letterSpacing: "-0.03em", textWrap: "balance", maxWidth: "18ch" }}
            >
              Enter your load and tariff. Get a sized stack and payback in 48 hours.
            </h2>
          </div>

          <Link
            to="/contact"
            className="fv-cta inline-flex items-center gap-2.5 text-[14px] font-semibold whitespace-nowrap"
            style={{
              background: tokens.brand,
              color: "#fff",
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

        {/* Lighter inline link columns */}
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
                    <Link to={l.href} className="fv-link text-[13px]">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div style={{ height: 1, background: tokens.hairline }} />

        <div className="flex flex-col gap-4 pt-5 pb-28 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p className="text-[12px] leading-[1.5]" style={{ color: tokens.body }}>
            © {new Date().getFullYear()} DeltaEV Mobility Private Limited.{" "}
            <span style={{ color: tokens.muted }}>GridEnergy is a DeltaEV brand. Verna, Goa.</span>
          </p>
          <div className="flex items-center gap-2.5">
            <span
              className="text-[10px] uppercase tracking-[0.12em]"
              style={{ color: tokens.inkMuted, fontWeight: 700 }}
            >
              Sister site
            </span>
            <a
              href="https://gridcharge.co.in"
              className="fv-chip flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] font-semibold"
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

/* ================================================================== */
/*  Variant C — Drenched dark                                         */
/* ================================================================== */

function FooterDark() {
  const line = "rgba(255,255,255,0.10)";
  const lineStrong = "rgba(255,255,255,0.18)";
  const labelDim = "rgba(255,255,255,0.50)";
  const linkRest = "rgba(255,255,255,0.72)";

  return (
    <footer
      className="fv-c"
      style={
        {
          background: tokens.ink,
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          "--ge-link": linkRest,
          "--ge-link-hover": "#ffffff",
          "--ge-brand": tokens.brand,
          "--ge-brand-hover": tokens.brandHover,
          "--ge-chip-border": line,
          "--ge-chip-border-hover": lineStrong,
        } as React.CSSProperties
      }
    >
      <style>{DARK_CSS}</style>

      <div className="mx-auto max-w-[1280px] px-6 sm:px-8">
        <div className="grid gap-12 py-16 lg:grid-cols-[1fr_2fr] lg:gap-20">
          {/* Brand side */}
          <div>
            <Link
              to="/"
              className="fv-brandmark inline-flex items-center gap-2.5 mb-5"
              aria-label="GridEnergy home"
            >
              <Logo variant="gridenergy" size={28} fill="#ffffff" />
              <span className="text-[16px] font-semibold tracking-[-0.02em]" style={{ color: "#fff" }}>
                GridEnergy
              </span>
            </Link>
            <p
              className="text-[14px] leading-[1.7] mb-6"
              style={{ color: "rgba(255,255,255,0.68)", maxWidth: "34ch" }}
            >
              Battery storage for Indian homes, offices, campuses, and enterprises. GridOS runs
              every stack from the cloud: meter reads, payback math, open standards, no lock-in.
            </p>
            <div className="flex items-center gap-2 mb-7">
              <MapPin size={13} weight="fill" style={{ color: tokens.brand, flexShrink: 0 }} />
              <span
                className="text-[11px] uppercase tracking-[0.14em]"
                style={{ color: labelDim, fontWeight: 600 }}
              >
                Verna, Goa · India
              </span>
            </div>
            <Link
              to="/contact"
              className="fv-cta inline-flex items-center gap-2 text-[13px] font-semibold"
              style={{
                background: tokens.brand,
                color: "#fff",
                padding: "11px 18px",
                borderRadius: 12,
                textDecoration: "none",
              }}
            >
              <span>Get early access</span>
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 sm:gap-10 lg:pt-1">
            {COLUMNS.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p
                  className="text-[10px] uppercase tracking-[0.16em] mb-4"
                  style={{ color: labelDim, fontWeight: 700 }}
                >
                  {col.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.href} className="fv-link text-[13px]">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: line }} />

        <div className="flex flex-col gap-4 pt-5 pb-28 sm:flex-row sm:items-center sm:justify-between lg:pb-6">
          <p className="text-[12px] leading-[1.5]" style={{ color: "rgba(255,255,255,0.65)" }}>
            © {new Date().getFullYear()} DeltaEV Mobility Private Limited.{" "}
            <span style={{ color: labelDim }}>GridEnergy is a DeltaEV brand.</span>
          </p>
          <div className="flex items-center gap-2.5">
            <span
              className="text-[10px] uppercase tracking-[0.12em]"
              style={{ color: labelDim, fontWeight: 700 }}
            >
              Sister site
            </span>
            <a
              href="https://gridcharge.co.in"
              className="fv-chip flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] font-semibold"
              style={{
                color: "#fff",
                background: "rgba(255,255,255,0.05)",
                padding: "6px 10px 6px 8px",
                borderRadius: 10,
                border: `1px solid ${line}`,
                textDecoration: "none",
              }}
            >
              <Logo variant="gridcharge" size={16} fill="#ffffff" />
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
/*  Shared interaction CSS per variant                                */
/* ------------------------------------------------------------------ */

const LINK_RULES = (scope: string) => `
.${scope} .fv-link { color: var(--ge-link); text-decoration: none; transition: color 0.15s ease; }
.${scope} .fv-link:hover, .${scope} .fv-link:focus-visible { color: var(--ge-link-hover); }
.${scope} .fv-brandmark { text-decoration: none; border-radius: 6px; }
.${scope} .fv-cta { transition: background 0.15s ease; }
.${scope} .fv-cta:hover, .${scope} .fv-cta:focus-visible { background: var(--ge-brand-hover); }
.${scope} .fv-cta svg { transition: transform 0.18s cubic-bezier(0.22,1,0.36,1); }
.${scope} .fv-cta:hover svg, .${scope} .fv-cta:focus-visible svg { transform: translateX(2px); }
.${scope} .fv-chip { transition: border-color 0.15s ease; }
.${scope} .fv-chip:hover, .${scope} .fv-chip:focus-visible { border-color: var(--ge-chip-border-hover); }
.${scope} a:focus-visible { outline: 2px solid var(--ge-brand); outline-offset: 3px; }
.${scope} .fv-cta:focus-visible, .${scope} .fv-chip:focus-visible { outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .${scope} .fv-link, .${scope} .fv-cta, .${scope} .fv-cta svg, .${scope} .fv-chip { transition: none; }
  .${scope} .fv-cta:hover svg, .${scope} .fv-cta:focus-visible svg { transform: none; }
}
`;

const STATEMENT_CSS = LINK_RULES("fv-b");
const DARK_CSS = LINK_RULES("fv-c");
const GALLERY_CSS = "";
