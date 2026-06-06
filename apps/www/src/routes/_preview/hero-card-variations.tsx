/*
  /preview/hero-card-variations — a stacked gallery of four distinct hero
  treatments for the Homes page, for the owner to pick from. Each is rendered
  full-width at realistic hero height over a real home image, in the locked
  GridEnergy language (light olive + GridRed, Inter, inline tokens). All four
  keep the "tagged card" DNA but vary the card composition.

  Numbers are never fabricated: every figure routes through <Gated> or shows a
  clearly-placeholder label. No "GridPower". Products: Nano only. GridOS = the
  platform. Internal route: noindex.
*/

import type { MetaFunction } from "react-router";
import { useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import { useReducedMotion } from "motion/react";
import { ArrowRight, Lightning, Check, BatteryChargingVertical, DeviceMobile, ShieldCheck } from "@phosphor-icons/react";
import { tokens } from "./_v3-tokens";
import { Gated } from "../../components/solutions/light/Modules";

export const meta: MetaFunction = () => [
  { title: "Hero card variations — GridEnergy (internal)" },
  { name: "robots", content: "noindex" },
];

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';
const INK = "oklch(15.3% 0.006 107.1)";

/* Real slide copy + image, reused from /solutions/homes (homes.tsx). */
type Slide = {
  image: string;
  eyebrow: string;
  kicker: string;
  title: string;
  sub: string;
  points: string[];
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
};

const SMALL_HOME: Slide = {
  image: "/images/solutions/homes-small.png",
  eyebrow: "Small homes",
  kicker: "Whole-home energy storage",
  title: "Whole-home essentials, ACs included.",
  sub: "Backup and bill savings for a small home, silent and seamless the moment the grid drops.",
  points: [
    "Backs up essentials, ACs included",
    "Seamless switchover the moment grid drops",
    "Tariff-smart charging via GridOS",
  ],
  primary: { label: "Book a site survey", to: "/contact" },
  secondary: { label: "Explore small homes", to: "/solutions/homes/small-home" },
};

const LARGE_HOME: Slide = {
  image: "/images/solutions/homes-large.png",
  eyebrow: "Large homes & villas",
  kicker: "Three-phase home storage",
  title: "Whole-villa power, on autopilot.",
  sub: "Three-phase backup and tariff-smart savings for a large home, run entirely from your phone.",
  points: [
    "Whole-villa, three-phase backup",
    "Tariff-smart savings on autopilot",
    "Run entirely from the GridOS app",
  ],
  primary: { label: "Book a site survey", to: "/contact" },
  secondary: { label: "Explore villas", to: "/solutions/homes/large-home" },
};

const SOLAR_HOME: Slide = {
  image: "/images/solutions/homes-solar.png",
  eyebrow: "Solar + storage",
  kicker: "Solar plus storage",
  title: "Bank your solar. Run on it after dark.",
  sub: "Stop exporting cheap by day and buying back dear at night. Store your solar and live on it through the peak.",
  points: [
    "Store your solar, use it after dark",
    "Stop exporting cheap, buying back dear",
    "Backup and self-use, managed by GridOS",
  ],
  primary: { label: "Book a site survey", to: "/contact" },
  secondary: { label: "Explore solar storage", to: "/solutions/homes/solar-storage" },
};

const APARTMENT: Slide = {
  image: "/images/solutions/homes-apartment.png",
  eyebrow: "Apartments & flats",
  kicker: "Apartment energy storage",
  title: "Silent backup for your flat.",
  sub: "Compact, wall-mounted storage that keeps your essentials, and a room cool, running through every cut.",
  points: [
    "Wall-mounted, fits a utility nook",
    "Silent LFP, no genset or fumes",
    "Backup and bill savings, run from your phone",
  ],
  primary: { label: "Book a site survey", to: "/contact" },
  secondary: { label: "Explore apartments", to: "/solutions/homes/apartment" },
};

/* ------------------------------------------------------------------ */
/*  Shared building blocks                                             */
/* ------------------------------------------------------------------ */

const HERO_HEIGHT = 620;
const RADIUS = 22;

function HeroFrame({ image, children }: { image: string; children: ReactNode }) {
  return (
    <section
      style={{
        position: "relative",
        height: HERO_HEIGHT,
        minHeight: 560,
        overflow: "hidden",
        background: INK,
      }}
    >
      <img src={image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      {/* legibility wash, left + bottom */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, oklch(15.3% 0.006 107.1 / 0.6) 0%, oklch(15.3% 0.006 107.1 / 0.18) 42%, transparent 66%)," +
            "linear-gradient(0deg, oklch(15.3% 0.006 107.1 / 0.5) 0%, transparent 38%)",
        }}
      />
      <div
        style={{
          position: "relative",
          height: "100%",
          maxWidth: 1280,
          marginInline: "auto",
          paddingInline: 32,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        {children}
      </div>
    </section>
  );
}

function PointRow({ children }: { children: ReactNode }) {
  return (
    <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <span
        aria-hidden
        style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 18, height: 18, borderRadius: 999, background: tokens.brandSoft, marginTop: 1 }}
      >
        <Check size={11} weight="bold" color={tokens.brand} />
      </span>
      <span style={{ fontFamily: FONT, fontSize: 13.5, lineHeight: 1.4, color: tokens.body }}>{children}</span>
    </li>
  );
}

function CardBtn({ to, children, primary, full }: { to: string; children: ReactNode; primary?: boolean; full?: boolean }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: FONT,
    fontSize: 13.5,
    fontWeight: 600,
    letterSpacing: "-0.005em",
    borderRadius: 12,
    padding: "11px 18px",
    textDecoration: "none",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "background .16s ease, border-color .16s ease, box-shadow .16s ease, transform .16s ease",
    transform: h ? "translateY(-1px)" : "none",
    flex: full ? "1 1 0" : undefined,
  };
  const style: CSSProperties = primary
    ? {
        ...base,
        background: h ? tokens.brandHover : tokens.brand,
        color: "#fff",
        boxShadow: h
          ? "0 10px 24px -12px oklch(0.58 0.245 27 / 0.6)"
          : "0 6px 16px -12px oklch(0.58 0.245 27 / 0.5)",
      }
    : { ...base, background: tokens.card, color: tokens.ink, borderColor: tokens.hairlineStrong };
  return (
    <Link to={to} style={style} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {primary && <Lightning size={13} weight="fill" />}
      {children}
      <ArrowRight size={12} weight="bold" style={{ transform: h ? "translateX(2px)" : "none", transition: "transform .16s ease" }} />
    </Link>
  );
}

/* Small product chip — Nano. Not a number, just a label. */
function ProductChip({ name }: { name: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.02em",
        color: tokens.ink,
        background: tokens.chip,
        border: `1px solid ${tokens.hairlineStrong}`,
        borderRadius: 999,
        padding: "3px 10px",
      }}
    >
      <span aria-hidden style={{ width: 5, height: 5, borderRadius: 999, background: tokens.brand }} />
      {name}
    </span>
  );
}

const cardShadow =
  "0 2px 4px oklch(15.3% 0.006 107.1 / 0.06), 0 34px 80px -38px oklch(15.3% 0.006 107.1 / 0.72)";

/* ------------------------------------------------------------------ */
/*  V0 — current baseline (single seamless card)                       */
/* ------------------------------------------------------------------ */

function V0Baseline({ s }: { s: Slide }) {
  return (
    <HeroFrame image={s.image}>
      <div style={{ width: "100%", maxWidth: 468, marginBottom: 52, borderRadius: RADIUS, boxShadow: cardShadow }}>
        {/* gray header */}
        <div
          style={{
            background: tokens.pageBgDeep,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: `${RADIUS}px ${RADIUS}px 0 0`,
            padding: "12px 24px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: FONT,
              fontSize: 12.5,
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: tokens.inkMuted,
            }}
          >
            <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
            {s.eyebrow}
          </span>
        </div>
        {/* white body */}
        <div
          style={{
            background: tokens.card,
            borderLeft: `1px solid ${tokens.hairline}`,
            borderRight: `1px solid ${tokens.hairline}`,
            borderBottom: `1px solid ${tokens.hairline}`,
            borderRadius: `0 0 ${RADIUS}px ${RADIUS}px`,
            padding: "20px 24px 24px",
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: tokens.muted }}>{s.kicker}</span>
          <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(26px, 3.1vw, 36px)", fontWeight: 600, letterSpacing: "-0.032em", lineHeight: 1.05, marginTop: 9, textWrap: "balance" }}>{s.title}</h1>
          <p style={{ color: tokens.body, fontSize: 15, lineHeight: 1.52, marginTop: 11, maxWidth: "42ch" }}>{s.sub}</p>
          <div style={{ height: 1, background: tokens.hairline, margin: "18px 0" }} />
          <ul style={{ display: "flex", flexDirection: "column", gap: 9, listStyle: "none", margin: 0, padding: 0 }}>
            {s.points.map((p) => (
              <PointRow key={p}>{p}</PointRow>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
            <CardBtn to={s.primary.to} primary>{s.primary.label}</CardBtn>
            <CardBtn to={s.secondary.to}>{s.secondary.label}</CardBtn>
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  V1 — dense two-column card: copy left, spec rail right             */
/*  Right column carries Gated tiles + a Nano product chip.            */
/* ------------------------------------------------------------------ */

function GatedTile({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div
      style={{
        background: tokens.cardSoft,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 12,
        padding: "12px 13px",
        display: "flex",
        flexDirection: "column",
        gap: 7,
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: FONT, fontSize: 11.5, fontWeight: 600, color: tokens.inkMuted }}>
        <span aria-hidden style={{ display: "grid", placeItems: "center", width: 18, height: 18, borderRadius: 6, background: tokens.brandSoft, color: tokens.brand }}>{icon}</span>
        {label}
      </span>
      <span style={{ fontFamily: MONO, fontSize: 13 }}>{children}</span>
    </div>
  );
}

function V1TwoColumn({ s }: { s: Slide }) {
  return (
    <HeroFrame image={s.image}>
      <div style={{ width: "100%", maxWidth: 720, marginBottom: 52, borderRadius: RADIUS, boxShadow: cardShadow }}>
        {/* gray header */}
        <div
          style={{
            background: tokens.pageBgDeep,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: `${RADIUS}px ${RADIUS}px 0 0`,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.01em", color: tokens.inkMuted }}>
            <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
            {s.eyebrow}
          </span>
          <ProductChip name="Nano" />
        </div>
        {/* body: two columns */}
        <div
          style={{
            background: tokens.card,
            borderLeft: `1px solid ${tokens.hairline}`,
            borderRight: `1px solid ${tokens.hairline}`,
            borderBottom: `1px solid ${tokens.hairline}`,
            borderRadius: `0 0 ${RADIUS}px ${RADIUS}px`,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.45fr) minmax(0, 1fr)",
            gap: 0,
          }}
        >
          {/* left: copy */}
          <div style={{ padding: "20px 22px 24px" }}>
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: tokens.muted }}>{s.kicker}</span>
            <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(24px, 2.6vw, 32px)", fontWeight: 600, letterSpacing: "-0.032em", lineHeight: 1.06, marginTop: 9, textWrap: "balance" }}>{s.title}</h1>
            <p style={{ color: tokens.body, fontSize: 14.5, lineHeight: 1.5, marginTop: 11 }}>{s.sub}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20 }}>
              <CardBtn to={s.primary.to} primary>{s.primary.label}</CardBtn>
              <CardBtn to={s.secondary.to}>{s.secondary.label}</CardBtn>
            </div>
          </div>
          {/* right: spec rail */}
          <div
            style={{
              padding: "20px 22px 24px",
              borderLeft: `1px solid ${tokens.hairline}`,
              background: tokens.pageBg,
              borderRadius: `0 0 ${RADIUS}px 0`,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.muted }}>At a glance</span>
            <GatedTile icon={<BatteryChargingVertical size={11} weight="bold" />} label="Backup">
              <Gated note="essential-load backup hours per home profile">—</Gated>
            </GatedTile>
            <GatedTile icon={<DeviceMobile size={11} weight="bold" />} label="Monthly saving">
              <Gated note="bill saving sized to tariff + load at survey">—</Gated>
            </GatedTile>
            <GatedTile icon={<ShieldCheck size={11} weight="bold" />} label="Warranty">
              <Gated note="add real warranty years + cycles">—</Gated>
            </GatedTile>
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  V2 — split header card: header carries category tabs/breadcrumb,   */
/*  body carries title + 3 check points + dual CTA.                    */
/* ------------------------------------------------------------------ */

const HOME_TABS = ["Apartment", "Small home", "Villa", "Solar"];

function V2SplitHeader({ s, activeTab }: { s: Slide; activeTab: string }) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <HeroFrame image={s.image}>
      <div style={{ width: "100%", maxWidth: 512, marginBottom: 52, borderRadius: RADIUS, boxShadow: cardShadow }}>
        {/* gray header — breadcrumb + tabs */}
        <div
          style={{
            background: tokens.pageBgDeep,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: `${RADIUS}px ${RADIUS}px 0 0`,
            padding: "11px 18px 0",
          }}
        >
          {/* breadcrumb */}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.04em", color: tokens.muted, textTransform: "uppercase" }}>
            Solutions
            <span aria-hidden style={{ color: tokens.hairlineStrong }}>/</span>
            <span style={{ color: tokens.inkMuted }}>Homes</span>
          </span>
          {/* tabs */}
          <div style={{ display: "flex", gap: 4, marginTop: 9 }}>
            {HOME_TABS.map((t) => {
              const active = t === activeTab;
              const isHover = hover === t;
              return (
                <button
                  key={t}
                  type="button"
                  onMouseEnter={() => setHover(t)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    fontFamily: FONT,
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: active ? tokens.ink : isHover ? tokens.inkMuted : tokens.muted,
                    background: "transparent",
                    border: "none",
                    borderBottom: `2px solid ${active ? tokens.brand : "transparent"}`,
                    padding: "6px 8px 9px",
                    cursor: "pointer",
                    transition: "color .16s ease",
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
        {/* white body */}
        <div
          style={{
            background: tokens.card,
            borderLeft: `1px solid ${tokens.hairline}`,
            borderRight: `1px solid ${tokens.hairline}`,
            borderBottom: `1px solid ${tokens.hairline}`,
            borderRadius: `0 0 ${RADIUS}px ${RADIUS}px`,
            padding: "20px 24px 24px",
          }}
        >
          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: tokens.muted }}>{s.kicker}</span>
          <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(26px, 3.1vw, 36px)", fontWeight: 600, letterSpacing: "-0.032em", lineHeight: 1.05, marginTop: 9, textWrap: "balance" }}>{s.title}</h1>
          <p style={{ color: tokens.body, fontSize: 15, lineHeight: 1.52, marginTop: 11, maxWidth: "42ch" }}>{s.sub}</p>
          <ul style={{ display: "flex", flexDirection: "column", gap: 9, listStyle: "none", margin: "18px 0 0", padding: 0 }}>
            {s.points.map((p) => (
              <PointRow key={p}>{p}</PointRow>
            ))}
          </ul>
          <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
            <CardBtn to={s.primary.to} primary full>{s.primary.label}</CardBtn>
            <CardBtn to={s.secondary.to} full>{s.secondary.label}</CardBtn>
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  V3 — floating stat-rail: main card + a separate frosted stat strip */
/*  docked to its top edge. Blur is used only on that one strip.       */
/* ------------------------------------------------------------------ */

function StatPill({ label, children, divider }: { label: string; children: ReactNode; divider?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontFamily: MONO, fontSize: 13 }}>{children}</span>
        <span style={{ fontFamily: FONT, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.01em", color: "rgba(255,255,255,0.72)" }}>{label}</span>
      </div>
      {divider && <span aria-hidden style={{ width: 1, height: 26, background: "rgba(255,255,255,0.22)" }} />}
    </div>
  );
}

function V3StatRail({ s }: { s: Slide }) {
  return (
    <HeroFrame image={s.image}>
      <div style={{ width: "100%", maxWidth: 468, marginBottom: 52, position: "relative" }}>
        {/* frosted stat strip, docked to top edge — blur is purposeful here only */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 10,
            padding: "10px 16px",
            borderRadius: 14,
            background: "oklch(15.3% 0.006 107.1 / 0.42)",
            backdropFilter: "blur(14px) saturate(140%)",
            WebkitBackdropFilter: "blur(14px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.16)",
            boxShadow: "0 12px 30px -18px oklch(15.3% 0.006 107.1 / 0.8)",
          }}
        >
          <StatPill label="Essential-load backup" divider>
            <Gated note="backup hours per home profile">—</Gated>
          </StatPill>
          <StatPill label="Monthly bill saving" divider>
            <Gated note="bill saving sized at survey">—</Gated>
          </StatPill>
          <StatPill label="Runs on">
            <span style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, color: "#fff" }}>GridOS</span>
          </StatPill>
        </div>

        {/* main card */}
        <div style={{ borderRadius: RADIUS, boxShadow: cardShadow }}>
          <div
            style={{
              background: tokens.pageBgDeep,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: `${RADIUS}px ${RADIUS}px 0 0`,
              padding: "12px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, letterSpacing: "0.01em", color: tokens.inkMuted }}>
              <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
              {s.eyebrow}
            </span>
            <ProductChip name="Nano" />
          </div>
          <div
            style={{
              background: tokens.card,
              borderLeft: `1px solid ${tokens.hairline}`,
              borderRight: `1px solid ${tokens.hairline}`,
              borderBottom: `1px solid ${tokens.hairline}`,
              borderRadius: `0 0 ${RADIUS}px ${RADIUS}px`,
              padding: "20px 24px 24px",
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: tokens.muted }}>{s.kicker}</span>
            <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(26px, 3.1vw, 36px)", fontWeight: 600, letterSpacing: "-0.032em", lineHeight: 1.05, marginTop: 9, textWrap: "balance" }}>{s.title}</h1>
            <p style={{ color: tokens.body, fontSize: 15, lineHeight: 1.52, marginTop: 11, maxWidth: "42ch" }}>{s.sub}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
              <CardBtn to={s.primary.to} primary>{s.primary.label}</CardBtn>
              <CardBtn to={s.secondary.to}>{s.secondary.label}</CardBtn>
            </div>
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery shell                                                      */
/* ------------------------------------------------------------------ */

function VariationLabel({ tag, name, rationale }: { tag: string; name: string; rationale: string }) {
  return (
    <div style={{ maxWidth: 1280, marginInline: "auto", paddingInline: 32, paddingBlock: "36px 16px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: tokens.brand }}>{tag}</span>
        <h2 style={{ fontFamily: FONT, fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", color: tokens.ink, margin: 0 }}>{name}</h2>
      </div>
      <p style={{ fontFamily: FONT, fontSize: 14, lineHeight: 1.5, color: tokens.muted, marginTop: 6, maxWidth: "72ch" }}>{rationale}</p>
    </div>
  );
}

export default function HeroCardVariations() {
  const reduce = useReducedMotion() ?? false;
  // reduce is read so the page declares its reduced-motion posture: none of the
  // four variations use entrance/auto motion, so honoring the preference is a no-op.
  void reduce;

  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg, minHeight: "100vh" }}>
      {/* gallery header */}
      <header
        style={{
          background: INK,
          paddingBlock: "26px 24px",
        }}
      >
        <div style={{ maxWidth: 1280, marginInline: "auto", paddingInline: 32 }}>
          <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: tokens.brand }}>Internal preview</span>
          <h1 style={{ fontFamily: FONT, color: "#fff", fontSize: "clamp(24px, 3vw, 34px)", fontWeight: 600, letterSpacing: "-0.03em", marginTop: 8 }}>Homes hero — card variations</h1>
          <p style={{ fontFamily: FONT, fontSize: 15, lineHeight: 1.55, color: "rgba(255,255,255,0.72)", marginTop: 10, maxWidth: "68ch" }}>
            Four takes on the tagged-card hero, same identity, different card composition. Real home images and real Homes copy. Every figure is a placeholder routed through a flagged tag until sized at survey. Pick one.
          </p>
        </div>
      </header>

      <VariationLabel
        tag="V0"
        name="Current — single seamless card"
        rationale="The live baseline. Gray tag header over a dense white body, bottom-left. Here for direct comparison against the three alternatives below."
      />
      <V0Baseline s={SMALL_HOME} />

      <VariationLabel
        tag="V1"
        name="Dense two-column card"
        rationale="Copy and CTAs stay left; an inset spec rail on the right carries flagged tiles for backup, saving, and warranty, plus a Nano product chip in the header. Reads like a product card without inventing any numbers."
      />
      <V1TwoColumn s={LARGE_HOME} />

      <VariationLabel
        tag="V2"
        name="Split header card with category tabs"
        rationale="The gray header becomes a breadcrumb and a tab strip across the home types, so the hero doubles as navigation. Body holds the title, three check points, and a balanced dual CTA."
      />
      <V2SplitHeader s={SOLAR_HOME} activeTab="Solar" />

      <VariationLabel
        tag="V3"
        name="Floating stat-rail with frosted strip"
        rationale="The main card stays clean; a separate frosted strip docks to its top edge, lifting flagged stats and the GridOS name onto the image. Blur is used only on that one strip, deliberately, not as a background texture."
      />
      <V3StatRail s={APARTMENT} />

      <div style={{ height: 80 }} />
    </div>
  );
}
