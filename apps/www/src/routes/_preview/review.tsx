/*
  /preview/review — single consolidated review hub.

  One place to walk every route during the design-lock phase: the live template,
  the superseded audience drafts, the layout/variant galleries, the block
  reference, and the first-draft secondary pages. Each link opens in a new tab so
  the index stays put while you screenshot favorites. Internal only — never in
  public nav. Soft-archive: nothing is deleted, this just stops the scatter.
*/

import type { MetaFunction } from "react-router";
import { tokens } from "./_v3-tokens";

export const meta: MetaFunction = () => [{ title: "Design review hub — GridEnergy (internal)" }];

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';

type Item = { path: string; title: string; note: string };
type Group = { label: string; tone: "live" | "draft" | "variant" | "ref"; intro: string; items: Item[] };

const GROUPS: Group[] = [
  {
    label: "Template — production, in progress",
    tone: "live",
    intro: "The locked direction. These are what the rest of the site gets built against.",
    items: [
      { path: "/solutions", title: "Solutions index", note: "Audience carousel + 5-card grid (lean 4-section)" },
      { path: "/solutions/homes", title: "Homes hub", note: "Hero carousel + router section + outcomes + comparison" },
      { path: "/solutions/homes/apartment", title: "Apartment spoke", note: "Old draft — being redone with you next" },
      { path: "/", title: "Homepage", note: "Header-only foundation" },
    ],
  },
  {
    label: "Audience drafts — superseded, rebuild as hubs + spokes",
    tone: "draft",
    intro: "Full pages built before the hub/spoke model was locked. Kept for reference; will be rebuilt from the template.",
    items: [
      { path: "/solutions/offices-industrial", title: "Offices & Industrial", note: "Draft full page (Nano/Micro)" },
      { path: "/solutions/enterprises", title: "Enterprises", note: "Draft full page (Mega/Giga)" },
      { path: "/solutions/hospitality", title: "Hospitality", note: "Draft full page" },
      { path: "/solutions/institutes", title: "Educational Institutes", note: "Draft full page" },
    ],
  },
  {
    label: "Layout & card variants — pick favorites",
    tone: "variant",
    intro: "Stacked-card hero treatments and solutions-overview layouts. Screenshot the ones you want to standardize on.",
    items: [
      { path: "/preview/hero-card-variations", title: "Hero / stacked-card variations", note: "V0 current · two-column · split-header tabs · frosted stat-rail" },
      { path: "/preview/solutions-section-variations", title: "Solutions-section layouts", note: "Tagged-card grid · switcher · editorial rows · bento" },
    ],
  },
  {
    label: "Block & section reference",
    tone: "ref",
    intro: "The component and section libraries the pages are assembled from.",
    items: [
      { path: "/preview/section-kit", title: "Section kit", note: "Section catalogue" },
      { path: "/preview/all-blocks", title: "All blocks", note: "Every block in the library" },
      { path: "/preview/solution-samples", title: "Solution samples", note: "Sample assemblies" },
      { path: "/preview/solution-homes", title: "Solution homes (full assembly)", note: "The full multi-section homes layout" },
      { path: "/preview/modules", title: "Modules", note: "Stripe-distilled modules" },
    ],
  },
  {
    label: "Secondary pages — first drafts, awaiting direction",
    tone: "ref",
    intro: "Track-1 batch. Real first drafts; expect design direction before they lock.",
    items: [
      { path: "/configure", title: "Configurator", note: "Atmospheric guided sizer (showpiece)" },
      { path: "/products", title: "Products range", note: "Nano/Micro/Mega/Giga family" },
      { path: "/products/nano", title: "Nano detail", note: "Residential product page" },
      { path: "/platform", title: "Platform (GridOS)", note: "Software layer" },
      { path: "/about", title: "About", note: "DeltaEV / GridEnergy story" },
      { path: "/partners", title: "Partners", note: "Installer program" },
      { path: "/support", title: "Support", note: "Help centre" },
      { path: "/contact", title: "Contact", note: "Survey booking form (no backend yet)" },
      { path: "/sign-in", title: "Sign in", note: "GridOS account (presentational)" },
      { path: "/app", title: "App", note: "GridOS mobile showcase" },
      { path: "/economics", title: "Economics", note: "ROI model (all figures gated)" },
      { path: "/resources", title: "Resources", note: "Guides & datasheets" },
      { path: "/careers", title: "Careers", note: "Roles via /contact" },
    ],
  },
];

const TONE: Record<Group["tone"], { dot: string; chip: string; label: string }> = {
  live: { dot: tokens.brand, chip: tokens.brandSoft, label: "LIVE" },
  draft: { dot: tokens.muted, chip: tokens.pageBgDeep, label: "DRAFT" },
  variant: { dot: tokens.ink, chip: tokens.pageBgDeep, label: "PICK" },
  ref: { dot: tokens.inkMuted, chip: tokens.pageBgDeep, label: "REF" },
};

export default function ReviewHub() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg, minHeight: "100vh", color: tokens.ink }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 32px 96px" }}>
        <header style={{ marginBottom: 40 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: tokens.muted }}>
            Internal · design-lock phase
          </span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, marginTop: 10, textWrap: "balance" }}>
            Design review hub
          </h1>
          <p style={{ color: tokens.body, fontSize: 15.5, lineHeight: 1.55, marginTop: 12, maxWidth: "62ch" }}>
            Every route in one place while we lock the design. Each opens in a new tab, so this index stays put.
            Screenshot the treatments you want and send them over; I will compile the picks into one reference.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {GROUPS.map((g) => {
            const t = TONE[g.tone];
            return (
              <section key={g.label}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span aria-hidden style={{ width: 8, height: 8, borderRadius: 999, background: t.dot, flexShrink: 0 }} />
                  <h2 style={{ fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>{g.label}</h2>
                  <span style={{ fontFamily: MONO, fontSize: 9.5, fontWeight: 600, letterSpacing: "0.08em", color: tokens.inkMuted, background: t.chip, padding: "3px 7px", borderRadius: 6 }}>
                    {t.label}
                  </span>
                </div>
                <p style={{ color: tokens.muted, fontSize: 12.5, lineHeight: 1.5, margin: "0 0 14px 18px", maxWidth: "64ch" }}>{g.intro}</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(232px, 1fr))", gap: 10 }}>
                  {g.items.map((it) => (
                    <a
                      key={it.path}
                      href={it.path}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "block", textDecoration: "none", color: "inherit",
                        background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 12,
                        padding: "13px 15px", transition: "border-color .15s ease, transform .15s ease",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = tokens.hairlineStrong; e.currentTarget.style.transform = "translateY(-1px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = tokens.hairline; e.currentTarget.style.transform = "none"; }}
                    >
                      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em" }}>{it.title}</span>
                        <span style={{ fontFamily: MONO, fontSize: 10, color: tokens.muted, flexShrink: 0 }}>{it.path}</span>
                      </div>
                      <p style={{ color: tokens.body, fontSize: 12, lineHeight: 1.45, marginTop: 5 }}>{it.note}</p>
                    </a>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
