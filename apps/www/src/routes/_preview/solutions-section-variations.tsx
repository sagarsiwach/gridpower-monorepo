/*
  /preview/solutions-section-variations — four layout directions for the
  Solutions overview section that presents GridEnergy's five audiences and
  routes people into the right page.

  All four carry the same tagged-card identity from the Homes page: a gray
  category tag header over a dense body, olive substrate + GridRed spark,
  Inter only. No fabricated numbers or specs — value lines are qualitative
  and true; any figure would route through <Gated>. Internal: noindex.

  Variations:
    1. Tagged-card grid — one featured Homes card + four supporting, each a
       full tag-header card.
    2. Interactive switcher — left rail of the five audiences, a large detail
       panel that swaps on hover/click, reduced-motion-safe crossfade.
    3. Editorial list rows — full-width typographic rows, no card boxes, big
       audience name + value line + thumbnail + arrow.
    4. Asymmetric bento — mixed-size tag-header tiles, Homes largest.
*/

import type { MetaFunction } from "react-router";
import { useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  HouseLine, Buildings, Bed, Factory, GraduationCap, ArrowRight, ArrowUpRight,
} from "@phosphor-icons/react";
import { tokens } from "./_v3-tokens";
import { FONT, MONO } from "../../components/solutions/light/atoms";

export const meta: MetaFunction = () => [
  { title: "Solutions section variations · GridEnergy (internal)" },
  { name: "robots", content: "noindex" },
];

/* ================================================================== */
/*  Shared audience data — true, qualitative value lines, real routes  */
/* ================================================================== */

type Audience = {
  id: string;
  tag: string;        // gray tag-header label (category)
  name: string;       // display name
  value: string;      // one short, true value line
  detail: string;     // longer line for the switcher panel
  to: string;         // correct route
  icon: typeof HouseLine;
  image?: string;     // only Homes has real imagery in the vault
};

const AUDIENCES: Audience[] = [
  {
    id: "homes",
    tag: "For homes",
    name: "Homes",
    value: "Silent backup that runs your home, including ACs, and makes your solar worth keeping after dark.",
    detail: "From a flat to a villa to a solar home: one sealed LFP system replaces the inverter, battery, and genset, switches over seamlessly when the grid drops, and is run from your phone through GridOS.",
    to: "/solutions/homes",
    icon: HouseLine,
    image: "/images/solutions/homes-small.png",
  },
  {
    id: "offices",
    tag: "For offices & industry",
    name: "Offices & Industrial",
    value: "Keep operations running through cuts and shave the peaks that drive up a commercial bill.",
    detail: "Three-phase backup that holds production and workplaces through outages, with tariff-aware peak shaving managed by GridOS to take the sting out of demand charges.",
    to: "/solutions/offices-industrial",
    icon: Buildings,
  },
  {
    id: "hospitality",
    tag: "For hospitality",
    name: "Hospitality",
    value: "Guests never feel a cut, and the genset stops running the soundtrack.",
    detail: "Seamless, silent backup for rooms, kitchens, and common areas, so a power cut never reaches a guest, with running costs cut by storing cheaper and solar power.",
    to: "/solutions/hospitality",
    icon: Bed,
  },
  {
    id: "enterprises",
    tag: "For enterprises",
    name: "Enterprises",
    value: "Storage across sites, managed from one place, with the software layer built in.",
    detail: "A fleet of systems across locations, monitored and dispatched from a single GridOS view, built on open standards so there is no vendor lock-in.",
    to: "/solutions/enterprises",
    icon: Factory,
  },
  {
    id: "institutes",
    tag: "For education",
    name: "Educational Institutes",
    value: "Uninterrupted campuses and a lower energy bill that frees budget for everything else.",
    detail: "Reliable backup for classrooms, labs, and hostels with tariff-smart savings, so a campus stays running and spends less on power.",
    to: "/solutions/institutes",
    icon: GraduationCap,
  },
];

const RADIUS = 16;

/* ================================================================== */
/*  Small shared pieces                                                */
/* ================================================================== */

/** The gray tag header — the shared identity element across all four. */
function TagHeader({ children, round = true }: { children: ReactNode; round?: boolean }) {
  return (
    <div
      style={{
        background: tokens.pageBgDeep,
        borderBottom: `1px solid ${tokens.hairline}`,
        borderRadius: round ? `${RADIUS}px ${RADIUS}px 0 0` : 0,
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, flexShrink: 0 }} />
      <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: tokens.inkMuted }}>
        {children}
      </span>
    </div>
  );
}

/** Image or honest placeholder thumbnail — no fabricated imagery. */
function Thumb({ a, ratio = "4 / 3", radius = 12 }: { a: Audience; ratio?: string; radius?: number }) {
  const Icon = a.icon;
  if (a.image) {
    return (
      <div style={{ aspectRatio: ratio, borderRadius: radius, overflow: "hidden", background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}` }}>
        <img src={a.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    );
  }
  return (
    <div style={{ aspectRatio: ratio, borderRadius: radius, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, display: "grid", placeItems: "center" }}>
      <div style={{ display: "grid", placeItems: "center", gap: 8 }}>
        <Icon size={28} weight="duotone" color={tokens.accentLine} />
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.muted }}>Photo TBD</span>
      </div>
    </div>
  );
}

/** Explore link with arrow nudge on hover. */
function Explore({ to, children = "Explore", up = false }: { to: string; children?: ReactNode; up?: boolean }) {
  const [h, setH] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: FONT, fontSize: 13.5, fontWeight: 600, color: tokens.brand, textDecoration: "none" }}
    >
      {children}
      {up ? (
        <ArrowUpRight size={13} weight="bold" style={{ transform: h ? "translate(2px,-2px)" : "none", transition: "transform .16s ease" }} />
      ) : (
        <ArrowRight size={13} weight="bold" style={{ transform: h ? "translateX(3px)" : "none", transition: "transform .16s ease" }} />
      )}
    </Link>
  );
}

/* ================================================================== */
/*  Variation 1 — Tagged-card grid (featured Homes + 4 supporting)     */
/* ================================================================== */

function TaggedCard({ a, featured = false }: { a: Audience; featured?: boolean }) {
  const [h, setH] = useState(false);
  const card: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    background: tokens.card,
    border: `1px solid ${h ? tokens.hairlineStrong : tokens.hairline}`,
    borderRadius: RADIUS,
    overflow: "hidden",
    textDecoration: "none",
    transition: "border-color .16s ease, box-shadow .16s ease, transform .16s ease",
    transform: h ? "translateY(-2px)" : "none",
    boxShadow: h
      ? "0 1px 2px oklch(15.3% 0.006 107.1 / 0.05), 0 22px 48px -30px oklch(15.3% 0.006 107.1 / 0.34)"
      : "0 1px 2px oklch(15.3% 0.006 107.1 / 0.03)",
    height: "100%",
  };
  return (
    <Link to={a.to} style={card} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <TagHeader>{a.tag}</TagHeader>
      {featured && <Thumb a={a} ratio="16 / 7" radius={0} />}
      <div style={{ padding: featured ? "20px 22px 22px" : "16px 18px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: featured ? 24 : 18, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, margin: 0 }}>{a.name}</h3>
        <p style={{ color: tokens.body, fontSize: featured ? 15 : 13.5, lineHeight: 1.5, marginTop: 8, maxWidth: "44ch" }}>{a.value}</p>
        <div style={{ marginTop: "auto", paddingTop: 16 }}>
          <Explore to={a.to} />
        </div>
      </div>
    </Link>
  );
}

function V1Grid() {
  const [homes, ...rest] = AUDIENCES;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 18, alignItems: "stretch" }}>
      <div style={{ display: "grid" }}>
        {homes && <TaggedCard a={homes} featured />}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {rest.map((a) => (
          <TaggedCard key={a.id} a={a} />
        ))}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Variation 2 — Interactive switcher (left rail + detail panel)      */
/* ================================================================== */

function V2Switcher() {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const a = AUDIENCES[active]!;
  const Icon = a.icon;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 18, alignItems: "stretch" }}>
      {/* left rail */}
      <div role="tablist" aria-label="Audiences" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {AUDIENCES.map((row, i) => {
          const on = i === active;
          const RowIcon = row.icon;
          return (
            <button
              key={row.id}
              type="button"
              role="tab"
              aria-selected={on}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
                cursor: "pointer",
                background: on ? tokens.card : "transparent",
                border: `1px solid ${on ? tokens.hairlineStrong : "transparent"}`,
                borderRadius: 12,
                padding: "13px 15px",
                transition: "background .16s ease, border-color .16s ease",
              }}
            >
              <span aria-hidden style={{ display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: 9, background: on ? tokens.brandSoft : tokens.pageBgDeep, flexShrink: 0 }}>
                <RowIcon size={17} weight="duotone" color={on ? tokens.brand : tokens.inkMuted} />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <span style={{ fontFamily: FONT, fontSize: 14.5, fontWeight: 600, color: on ? tokens.ink : tokens.body }}>{row.name}</span>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.04em", textTransform: "uppercase", color: tokens.muted }}>{row.tag}</span>
              </span>
              {on && <span aria-hidden style={{ position: "absolute", right: 14, width: 5, height: 5, borderRadius: 999, background: tokens.brand }} />}
            </button>
          );
        })}
      </div>

      {/* detail panel */}
      <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: RADIUS, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        <TagHeader>{a.tag}</TagHeader>
        <div style={{ position: "relative", flex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={a.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: reduce ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 24, padding: 24, alignItems: "center" }}
            >
              <div>
                <span aria-hidden style={{ display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 11, background: tokens.brandSoft, marginBottom: 16 }}>
                  <Icon size={22} weight="duotone" color={tokens.brand} />
                </span>
                <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08, margin: 0 }}>{a.name}</h3>
                <p style={{ color: tokens.body, fontSize: 15, lineHeight: 1.55, marginTop: 12, maxWidth: "46ch" }}>{a.detail}</p>
                <div style={{ marginTop: 20 }}>
                  <Explore to={a.to}>{`Explore ${a.name}`}</Explore>
                </div>
              </div>
              <Thumb a={a} ratio="4 / 3" radius={12} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  Variation 3 — Editorial list rows (typographic, no card boxes)     */
/* ================================================================== */

function V3Rows() {
  const reduce = useReducedMotion() ?? false;
  return (
    <div style={{ borderTop: `1px solid ${tokens.hairline}` }}>
      {AUDIENCES.map((a, i) => (
        <RowItem key={a.id} a={a} index={i} reduce={reduce} />
      ))}
    </div>
  );
}

function RowItem({ a, index, reduce }: { a: Audience; index: number; reduce: boolean }) {
  const [h, setH] = useState(false);
  return (
    <Link
      to={a.to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(120px, 0.45fr) 1.4fr 132px 40px",
        gap: 28,
        alignItems: "center",
        padding: "22px 8px",
        borderBottom: `1px solid ${tokens.hairline}`,
        textDecoration: "none",
        background: h ? tokens.card : "transparent",
        transition: "background .16s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, color: tokens.muted, letterSpacing: "0.06em" }}>{String(index + 1).padStart(2, "0")}</span>
        <span style={{ fontFamily: FONT, fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, color: tokens.ink }}>{a.name}</span>
      </div>
      <p style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5, margin: 0, maxWidth: "52ch" }}>{a.value}</p>
      <div style={{ width: 132 }}>
        <Thumb a={a} ratio="16 / 10" radius={10} />
      </div>
      <span
        aria-hidden
        style={{
          display: "grid",
          placeItems: "center",
          width: 38,
          height: 38,
          borderRadius: 999,
          background: h ? tokens.brand : tokens.pageBgDeep,
          border: `1px solid ${h ? tokens.brand : tokens.hairline}`,
          transition: reduce ? "background .16s ease" : "background .16s ease, transform .16s ease",
          transform: h && !reduce ? "translateX(3px)" : "none",
        }}
      >
        <ArrowRight size={16} weight="bold" color={h ? "#fff" : tokens.inkMuted} />
      </span>
    </Link>
  );
}

/* ================================================================== */
/*  Variation 4 — Asymmetric bento (Homes largest)                     */
/* ================================================================== */

function BentoTile({ a, big = false, wide = false }: { a: Audience; big?: boolean; wide?: boolean }) {
  const [h, setH] = useState(false);
  const Icon = a.icon;
  return (
    <Link
      to={a.to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        gridColumn: big ? "span 2" : "span 1",
        gridRow: big ? "span 2" : "span 1",
        display: "flex",
        flexDirection: "column",
        background: tokens.card,
        border: `1px solid ${h ? tokens.hairlineStrong : tokens.hairline}`,
        borderRadius: RADIUS,
        overflow: "hidden",
        textDecoration: "none",
        transition: "border-color .16s ease, box-shadow .16s ease",
        boxShadow: h ? "0 1px 2px oklch(15.3% 0.006 107.1 / 0.05), 0 20px 44px -30px oklch(15.3% 0.006 107.1 / 0.34)" : "none",
      }}
    >
      <TagHeader>{a.tag}</TagHeader>
      {big && <Thumb a={a} ratio="16 / 8" radius={0} />}
      <div style={{ padding: big ? "20px 22px 22px" : "15px 17px 17px", display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {!big && (
            <span aria-hidden style={{ display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: 8, background: tokens.brandSoft, flexShrink: 0 }}>
              <Icon size={15} weight="duotone" color={tokens.brand} />
            </span>
          )}
          <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: big ? 24 : 16.5, fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, margin: 0 }}>{a.name}</h3>
        </div>
        <p style={{ color: tokens.body, fontSize: big ? 15 : 13, lineHeight: 1.5, marginTop: big ? 10 : 8, maxWidth: big ? "44ch" : "38ch" }}>{wide || big ? a.value : a.value}</p>
        <div style={{ marginTop: "auto", paddingTop: 14 }}>
          <Explore to={a.to} up />
        </div>
      </div>
    </Link>
  );
}

function V4Bento() {
  const [homes, offices, hospitality, enterprises, institutes] = AUDIENCES;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "minmax(150px, auto)", gap: 16 }}>
      {homes && <BentoTile a={homes} big />}
      {offices && <BentoTile a={offices} wide />}
      {hospitality && <BentoTile a={hospitality} />}
      {enterprises && <BentoTile a={enterprises} />}
      {institutes && <BentoTile a={institutes} wide />}
    </div>
  );
}

/* ================================================================== */
/*  Section header for the section itself (shown inside each variant)  */
/* ================================================================== */

function SectionIntro() {
  return (
    <div style={{ maxWidth: 720, marginBottom: 36 }}>
      <h2 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(26px, 3.4vw, 40px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0, textWrap: "balance" }}>
        Find the system built for your place.
      </h2>
      <p style={{ color: tokens.muted, fontSize: 17, lineHeight: 1.6, marginTop: 14, maxWidth: 600 }}>
        Five kinds of place, one platform. Pick yours and see exactly what GridEnergy does for it.
      </p>
    </div>
  );
}

/* ================================================================== */
/*  Page — stacks the four labeled variations                          */
/* ================================================================== */

type Variant = { name: string; rationale: string; node: ReactNode };

const VARIANTS: Variant[] = [
  {
    name: "1 · Tagged-card grid",
    rationale: "One large featured Homes card plus four supporting cards, each a full gray-tag-header card. Closest to the page identity; Homes leads by size.",
    node: <V1Grid />,
  },
  {
    name: "2 · Interactive switcher",
    rationale: "A left rail of the five audiences and a large detail panel that swaps on hover or click, with a reduced-motion-safe crossfade. Densest, most exploratory.",
    node: <V2Switcher />,
  },
  {
    name: "3 · Editorial list rows",
    rationale: "Full-width typographic rows: number, big audience name, value line, thumbnail, arrow. No card boxes; reads like a contents page, dense and quiet.",
    node: <V3Rows />,
  },
  {
    name: "4 · Asymmetric bento",
    rationale: "Mixed-size tag-header tiles with Homes largest. Same identity as the grid but with a deliberate rhythm rather than an even grid.",
    node: <V4Bento />,
  },
];

export default function SolutionsSectionVariations() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg, minHeight: "100vh", color: tokens.body }}>
      {/* preview header bar */}
      <header style={{ background: tokens.ink, color: tokens.pageBg, padding: "14px 32px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <Link to="/preview" style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.accentFill, textDecoration: "none" }}>
          ← all variants
        </Link>
        <span aria-hidden style={{ width: 1, height: 18, background: "oklch(39.4% 0.023 107.4)" }} />
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.brand }}>Solutions section</span>
        <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: tokens.pageBg }}>Overview block · 4 layout directions</span>
        <span style={{ fontFamily: MONO, fontSize: 11, color: tokens.muted }}>/preview/solutions-section-variations</span>
      </header>

      <main style={{ maxWidth: 1180, marginInline: "auto", paddingInline: 28, paddingBlock: 24 }}>
        {VARIANTS.map((v, i) => (
          <section key={v.name} style={{ paddingBlock: 56, borderBottom: i < VARIANTS.length - 1 ? `1px solid ${tokens.hairline}` : undefined }}>
            {/* variation label + rationale */}
            <div style={{ marginBottom: 32 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.06em", textTransform: "uppercase", color: tokens.brand, background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 6, padding: "4px 10px" }}>
                {v.name}
              </span>
              <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 12, maxWidth: 720 }}>{v.rationale}</p>
            </div>

            {/* the section itself, on substrate */}
            <div style={{ background: tokens.pageBg, border: `1px solid ${tokens.hairline}`, borderRadius: 20, padding: "44px 40px" }}>
              <SectionIntro />
              {v.node}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
