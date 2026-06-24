/*
  SamplePage — one full solution-page layout rendered in any of the three light
  directions (Aurora / Blueprint / Atlas). Same content, three design languages.

  Heroes are bespoke per direction. Body blocks are shared and adapt to the
  Direction knobs (surface, density, type, accent, texture). Everything stays in
  the olive + GridRed tokens; unsourced numbers route through <Gated>.

  This is a sample for picking a direction, not shippable copy. Media areas are
  honest placeholders, not faked screenshots.
*/

import { type ReactNode, type CSSProperties, useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Minus, type Icon } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";
import { Gated } from "../../marketing/Primitives";
import { type Direction, FONT, DISPLAY, MONO, EASE } from "./directions";

const MAXW = 1200;

/* Responsive grid without breakpoint classes (Tailwind's grid-cols variants
   don't apply here — inline styles win, and the named utilities aren't
   generated). auto-fit + minmax(min(100%, …)) collapses cleanly on narrow. */
const autoGrid = (min: number, gap: number): CSSProperties => ({
  display: "grid",
  gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}px), 1fr))`,
  gap,
});

/* ================================================================== */
/*  Content shape                                                      */
/* ================================================================== */

export type SampleContent = {
  audience: string;
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    chips: string[];
    primary: { label: string; to: string };
    secondary: { label: string; to: string };
    /** faux app/product visual caption */
    visual: string;
  };
  trust: { lead: string; items: string[] };
  range: { label: string; title: string; intro: string; items: { icon: Icon; name: string; sub: string }[] };
  what: { label: string; title: string; intro: string; features: { kicker: string; title: string; body: string; bullets: string[]; visual: string }[] };
  outcomes: { label: string; title: string; intro: string; items: { icon: Icon; title: string; body: string }[] };
  comparison: { title: string; intro: string; usLabel: string; themLabel: string; rows: { label: string; us: string; them: string }[] };
  money: { label: string; title: string; intro: string; items: { label: string; note: string }[] };
  steps: { label: string; title: string; items: { t: string; b: string }[] };
  faqs: { label: string; title: string; items: { q: string; a: ReactNode }[] };
  cta: { title: string; sub: string };
};

/* ================================================================== */
/*  Primitives                                                         */
/* ================================================================== */

function Wrap({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ maxWidth: MAXW, marginInline: "auto", paddingInline: 28, ...style }}>{children}</div>;
}

function Rise({ children, delay = 0, y = 16, style }: { children: ReactNode; delay?: number; y?: number; style?: CSSProperties }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function Band({ d, children, id, tone = "base", py }: { d: Direction; children: ReactNode; id?: string; tone?: "base" | "deep"; py?: number }) {
  const deep = tone === "deep";
  return (
    <section
      id={id}
      style={{
        background: deep ? tokens.pageBgDeep : tokens.pageBg,
        paddingBlock: py ?? d.sectionPy,
        borderTop: deep ? `1px solid ${tokens.hairline}` : undefined,
        borderBottom: deep ? `1px solid ${tokens.hairline}` : undefined,
      }}
    >
      <Wrap>{children}</Wrap>
    </section>
  );
}

/** Optional small section label — used sparingly so it never becomes the
    eyebrow-on-every-section tell. Mono in Blueprint, dotted brand chip elsewhere. */
function Label({ d, children }: { d: Direction; children: ReactNode }) {
  if (d.monoLabels) {
    return (
      <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: tokens.inkMuted }}>
        {children}
      </span>
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: tokens.inkMuted }}>
      <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
      {children}
    </span>
  );
}

function Heading({ d, title, intro, label, align }: { d: Direction; title: ReactNode; intro?: ReactNode; label?: string; align?: "left" | "center" }) {
  const a = align ?? d.headingAlign;
  return (
    <div style={{ textAlign: a, maxWidth: a === "center" ? 760 : 720, marginInline: a === "center" ? "auto" : undefined, marginBottom: d.key === "atlas" ? 64 : 48 }}>
      {label && (
        <Rise>
          <div style={{ marginBottom: 16, display: "flex", justifyContent: a === "center" ? "center" : "flex-start" }}>
            <Label d={d}>{label}</Label>
          </div>
        </Rise>
      )}
      <Rise delay={0.04}>
        <h2 style={{ fontFamily: d.headingFont, color: tokens.ink, fontSize: d.h2, fontWeight: d.h2Weight, letterSpacing: d.h2Tracking, lineHeight: 1.05, textWrap: "balance" }}>
          {title}
        </h2>
      </Rise>
      {intro && (
        <Rise delay={0.08}>
          <p style={{ color: tokens.muted, fontSize: d.introSize, lineHeight: 1.6, marginTop: 18, maxWidth: 620, marginInline: a === "center" ? "auto" : undefined }}>
            {intro}
          </p>
        </Rise>
      )}
    </div>
  );
}

function Btn({ to, children, kind = "primary", onDark = false }: { to: string; children: ReactNode; kind?: "primary" | "secondary" | "ghost"; onDark?: boolean }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 14, fontWeight: 600,
    borderRadius: 12, padding: "13px 22px", textDecoration: "none", cursor: "pointer", border: "1px solid transparent",
    transition: "background .16s ease, border-color .16s ease, transform .16s ease", transform: h ? "translateY(-1px)" : "none",
  };
  const variants: Record<string, CSSProperties> = {
    primary: { background: h ? tokens.brandHover : tokens.brand, color: "#fff" },
    secondary: { background: onDark ? "transparent" : tokens.card, color: onDark ? "#fff" : tokens.ink, borderColor: onDark ? "rgba(255,255,255,.28)" : tokens.hairlineStrong },
    ghost: { background: "transparent", color: onDark ? "#fff" : tokens.ink },
  };
  return (
    <Link to={to} style={{ ...base, ...variants[kind] }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {children}
      {kind !== "ghost" && <ArrowRight size={13} weight="bold" style={{ transform: h ? "translateX(2px)" : "none", transition: "transform .16s ease" }} />}
    </Link>
  );
}

function Chip({ d, children }: { d: Direction; children: ReactNode }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: d.chipRadius,
      background: tokens.card, border: `1px solid ${tokens.hairline}`, fontFamily: FONT, fontSize: 13, fontWeight: 500, color: tokens.body,
    }}>
      <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
      {children}
    </span>
  );
}

/** honest media placeholder — never a faked screenshot */
function Media({ caption, ratio = "4 / 3", radius = 18, depth = true }: { caption: string; ratio?: string; radius?: number; depth?: boolean }) {
  return (
    <div style={{
      aspectRatio: ratio, background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: radius,
      display: "grid", placeItems: "center", overflow: "hidden",
      boxShadow: depth ? "0 28px 64px -38px oklch(15.3% 0.006 107.1 / 0.42)" : "none",
    }}>
      <div style={{ textAlign: "center", padding: 20 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.muted }}>{caption}</span>
        <p style={{ fontFamily: MONO, fontSize: 9, color: tokens.brand, marginTop: 6, letterSpacing: "0.1em" }}>ASSET TBD</p>
      </div>
    </div>
  );
}

/* texture fragments for hero backdrops */
function texture(d: Direction): CSSProperties {
  if (d.texture === "dots") {
    return {
      backgroundImage: `radial-gradient(${tokens.hairlineStrong} 1px, transparent 1px)`,
      backgroundSize: "26px 26px",
      maskImage: "radial-gradient(120% 80% at 50% 0%, #000 40%, transparent 78%)",
      WebkitMaskImage: "radial-gradient(120% 80% at 50% 0%, #000 40%, transparent 78%)",
    };
  }
  if (d.texture === "wash") {
    return {
      backgroundImage:
        "radial-gradient(60% 50% at 82% 8%, oklch(0.58 0.245 27 / 0.10), transparent 70%)," +
        "radial-gradient(55% 45% at 10% 0%, oklch(73.7% 0.021 106.9 / 0.22), transparent 72%)",
    };
  }
  return {};
}

/* ================================================================== */
/*  Heroes — one per direction                                         */
/* ================================================================== */

function HeroAurora({ c }: { c: SampleContent }) {
  const h = c.hero;
  return (
    <section style={{ position: "relative", background: tokens.pageBg, overflow: "hidden", paddingTop: 84, paddingBottom: 96 }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, ...texture({ texture: "wash" } as Direction) }} />
      <Wrap style={{ position: "relative" }}>
        <div style={{ ...autoGrid(380, 56), alignItems: "center" }}>
          <div>
            <Rise>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: tokens.card, border: `1px solid ${tokens.hairline}`, fontSize: 13, fontWeight: 600, color: tokens.body }}>
                <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
                {h.eyebrow}
              </span>
            </Rise>
            <Rise delay={0.05}>
              <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(38px, 5.2vw, 60px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, marginTop: 22, textWrap: "balance" }}>
                {h.title}
              </h1>
            </Rise>
            <Rise delay={0.1}>
              <p style={{ color: tokens.muted, fontSize: 19, lineHeight: 1.55, marginTop: 22, maxWidth: 500 }}>{h.sub}</p>
            </Rise>
            <Rise delay={0.15}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
                <Btn to={h.primary.to}>{h.primary.label}</Btn>
                <Btn to={h.secondary.to} kind="secondary">{h.secondary.label}</Btn>
              </div>
            </Rise>
            <Rise delay={0.2}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 28 }}>
                {h.chips.map((ch) => <Chip key={ch} d={{ chipRadius: 999 } as Direction}>{ch}</Chip>)}
              </div>
            </Rise>
          </div>
          <Rise delay={0.12} style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "8% -4% -8% 12%", background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, borderRadius: 24, transform: "rotate(3deg)" }} aria-hidden />
            <div style={{ position: "relative" }}>
              <Media caption={h.visual} ratio="4 / 3.4" radius={24} />
            </div>
          </Rise>
        </div>
      </Wrap>
    </section>
  );
}

function HeroBlueprint({ c }: { c: SampleContent }) {
  const h = c.hero;
  return (
    <section style={{ position: "relative", background: tokens.pageBg, overflow: "hidden", paddingTop: 80, paddingBottom: 72, borderBottom: `1px solid ${tokens.hairline}` }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, ...texture({ texture: "dots" } as Direction) }} />
      <Wrap style={{ position: "relative", textAlign: "center" }}>
        <Rise>
          <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 500, letterSpacing: "0.16em", textTransform: "uppercase", color: tokens.inkMuted }}>{h.eyebrow}</span>
        </Rise>
        <Rise delay={0.05}>
          <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(34px, 4.6vw, 54px)", fontWeight: 600, letterSpacing: "-0.038em", lineHeight: 1.02, marginTop: 20, marginInline: "auto", maxWidth: "16ch", textWrap: "balance" }}>
            {h.title}
          </h1>
        </Rise>
        <Rise delay={0.1}>
          <p style={{ color: tokens.muted, fontSize: 17, lineHeight: 1.6, marginTop: 20, maxWidth: 560, marginInline: "auto" }}>{h.sub}</p>
        </Rise>
        <Rise delay={0.15}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28, justifyContent: "center" }}>
            <Btn to={h.primary.to}>{h.primary.label}</Btn>
            <Btn to={h.secondary.to} kind="secondary">{h.secondary.label}</Btn>
          </div>
        </Rise>
        <Rise delay={0.22}>
          <div style={{ marginTop: 56, maxWidth: 960, marginInline: "auto" }}>
            <Media caption={h.visual} ratio="16 / 8.4" radius={14} depth={false} />
          </div>
        </Rise>
      </Wrap>
    </section>
  );
}

function HeroAtlas({ c }: { c: SampleContent }) {
  const h = c.hero;
  return (
    <section style={{ background: tokens.pageBg, paddingTop: 116, paddingBottom: 0 }}>
      <Wrap style={{ textAlign: "center" }}>
        <Rise>
          <span style={{ fontFamily: FONT, fontSize: 15, fontWeight: 500, color: tokens.inkMuted }}>{h.eyebrow}</span>
        </Rise>
        <Rise delay={0.06}>
          <h1 style={{ fontFamily: DISPLAY, color: tokens.ink, fontSize: "clamp(44px, 6.4vw, 76px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.98, marginTop: 18, marginInline: "auto", maxWidth: "14ch", textWrap: "balance" }}>
            {h.title}
          </h1>
        </Rise>
        <Rise delay={0.12}>
          <p style={{ color: tokens.muted, fontSize: 21, lineHeight: 1.5, marginTop: 26, maxWidth: 600, marginInline: "auto" }}>{h.sub}</p>
        </Rise>
        <Rise delay={0.18}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34, justifyContent: "center", alignItems: "center" }}>
            <Btn to={h.primary.to}>{h.primary.label}</Btn>
            <Link to={h.secondary.to} style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: tokens.ink, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              {h.secondary.label} <ArrowRight size={13} weight="bold" />
            </Link>
          </div>
        </Rise>
        <Rise delay={0.24}>
          <div style={{ marginTop: 72 }}>
            <Media caption={h.visual} ratio="16 / 8" radius={22} />
          </div>
        </Rise>
      </Wrap>
    </section>
  );
}

function Hero({ d, c }: { d: Direction; c: SampleContent }) {
  if (d.key === "aurora") return <HeroAurora c={c} />;
  if (d.key === "blueprint") return <HeroBlueprint c={c} />;
  return <HeroAtlas c={c} />;
}

/* ================================================================== */
/*  Body sections (shared, adapt to direction)                         */
/* ================================================================== */

function TrustStrip({ d, c }: { d: Direction; c: SampleContent }) {
  return (
    <Band d={d} tone="deep" py={Math.round(d.sectionPy * 0.5)}>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 24, alignItems: "center" }}>
        <p style={{ fontFamily: d.monoLabels ? MONO : FONT, fontSize: 13, fontWeight: d.monoLabels ? 500 : 600, letterSpacing: d.monoLabels ? "0.08em" : "0", color: tokens.inkMuted, flexShrink: 0, maxWidth: 220 }}>
          {c.trust.lead}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, flex: 1 }}>
          {c.trust.items.map((t) => (
            <span key={t} style={{ padding: "9px 15px", borderRadius: d.chipRadius, background: tokens.card, border: `1px solid ${tokens.hairline}`, fontFamily: FONT, fontSize: 13.5, fontWeight: 500, color: tokens.body }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </Band>
  );
}

function RangeGrid({ d, c }: { d: Direction; c: SampleContent }) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Band d={d} id="range">
      <Heading d={d} label={d.monoLabels ? "01 / Range" : undefined} title={c.range.title} intro={c.range.intro} />
      <div style={autoGrid(220, d.gridGap)}>
        {c.range.items.map((it, i) => {
          const on = hover === it.name;
          const Ico = it.icon;
          return (
            <Rise key={it.name} delay={i * 0.04}>
              <Link
                to="/contact"
                onMouseEnter={() => setHover(it.name)}
                onMouseLeave={() => setHover(null)}
                style={{
                  textDecoration: "none", display: "block", height: "100%",
                  background: d.cardBg, border: d.cardBorder ?? "1px solid transparent",
                  borderRadius: d.cardRadius, overflow: "hidden",
                  boxShadow: on ? d.cardShadowHover : d.cardShadow,
                  transform: on && d.key !== "blueprint" ? "translateY(-2px)" : "none",
                  transition: "transform .2s ease, box-shadow .25s ease, border-color .2s ease",
                }}
              >
                <div style={{ aspectRatio: "4 / 3", background: tokens.pageBgDeep, display: "grid", placeItems: "center", borderBottom: d.cardBorder ? `1px solid ${tokens.hairline}` : undefined }}>
                  <Ico size={34} weight="duotone" color={tokens.inkMuted} />
                </div>
                <div style={{ padding: d.key === "atlas" ? "20px 4px" : 20 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em" }}>{it.name}</h3>
                    <ArrowRight size={14} weight="bold" color={tokens.brand} style={{ opacity: on ? 1 : 0.4, transform: on ? "translateX(2px)" : "none", transition: "all .2s ease" }} />
                  </div>
                  <p style={{ color: tokens.muted, fontSize: 13.5, lineHeight: 1.5, marginTop: 6 }}>{it.sub}</p>
                </div>
              </Link>
            </Rise>
          );
        })}
      </div>
    </Band>
  );
}

function FeatureRows({ d, c }: { d: Direction; c: SampleContent }) {
  return (
    <Band d={d} tone="deep" id="what">
      <Heading d={d} title={c.what.title} intro={c.what.intro} />
      <div style={{ display: "flex", flexDirection: "column", gap: d.groupGap }}>
        {c.what.features.map((f, i) => {
          const reverse = i % 2 === 1;
          return (
            <div key={f.title} style={{ ...autoGrid(400, 48), alignItems: "center" }}>
              <Rise style={{ order: reverse ? 2 : 1 }}>
                <div>
                  <Label d={d}>{f.kicker}</Label>
                  <h3 style={{ fontFamily: d.key === "atlas" ? DISPLAY : FONT, color: tokens.ink, fontSize: d.key === "atlas" ? "clamp(26px,3.4vw,38px)" : "clamp(23px,2.8vw,32px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, marginTop: 14 }}>
                    {f.title}
                  </h3>
                  <p style={{ color: tokens.muted, fontSize: 16.5, lineHeight: 1.6, marginTop: 16, maxWidth: 480 }}>{f.body}</p>
                  <ul style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 11 }}>
                    {f.bullets.map((b) => (
                      <li key={b} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
                        <Check size={16} weight="bold" color={tokens.brand} style={{ flexShrink: 0, marginTop: 3 }} />
                        <span style={{ color: tokens.body, fontSize: 15, lineHeight: 1.5 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Rise>
              <Rise delay={0.08} style={{ order: reverse ? 1 : 2 }}>
                <Media caption={f.visual} ratio="4 / 3" radius={d.cardRadius} depth={d.key === "aurora"} />
              </Rise>
            </div>
          );
        })}
      </div>
    </Band>
  );
}

function OutcomeGrid({ d, c }: { d: Direction; c: SampleContent }) {
  const [hover, setHover] = useState<string | null>(null);
  return (
    <Band d={d} id="outcomes">
      <Heading d={d} title={c.outcomes.title} intro={c.outcomes.intro} />
      <div style={autoGrid(330, d.gridGap)}>
        {c.outcomes.items.map((o, i) => {
          const Ico = o.icon;
          const on = hover === o.title;
          return (
            <Rise key={o.title} delay={i * 0.03}>
              <div
                onMouseEnter={() => setHover(o.title)}
                onMouseLeave={() => setHover(null)}
                style={{
                  height: "100%", padding: d.key === "atlas" ? "30px 26px" : 24,
                  background: d.key === "atlas" ? "transparent" : d.cardBg,
                  border: d.key === "atlas" ? "none" : (d.cardBorder ?? "1px solid transparent"),
                  borderTop: d.key === "atlas" ? `1px solid ${tokens.hairlineStrong}` : undefined,
                  borderRadius: d.key === "atlas" ? 0 : d.cardRadius,
                  boxShadow: d.key === "atlas" ? "none" : (on ? d.cardShadowHover : d.cardShadow),
                  transition: "box-shadow .25s ease",
                }}
              >
                <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: d.key === "blueprint" ? 9 : 12, background: d.key === "atlas" ? "transparent" : tokens.pageBgDeep, border: d.key === "atlas" ? "none" : `1px solid ${tokens.hairline}` }}>
                  <Ico size={d.key === "atlas" ? 26 : 22} weight="duotone" color={d.accent === "mono" ? tokens.ink : tokens.ink} />
                </span>
                <h3 style={{ fontFamily: FONT, color: tokens.ink, fontSize: 17, fontWeight: 600, marginTop: 16, letterSpacing: "-0.01em" }}>{o.title}</h3>
                <p style={{ color: tokens.muted, fontSize: 14, lineHeight: 1.55, marginTop: 7 }}>{o.body}</p>
              </div>
            </Rise>
          );
        })}
      </div>
    </Band>
  );
}

function Comparison({ d, c }: { d: Direction; c: SampleContent }) {
  return (
    <Band d={d} tone="deep" id="compare">
      <Heading d={d} title={c.comparison.title} intro={c.comparison.intro} />
      <Rise>
        <div style={{ background: d.cardBg, border: `1px solid ${tokens.hairline}`, borderRadius: d.cardRadius, overflow: "hidden", maxWidth: 880, marginInline: d.headingAlign === "center" ? "auto" : undefined, boxShadow: d.key === "aurora" ? d.cardShadow : "none" }}>
          {/* header row */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr" }}>
            <div style={{ padding: "16px 20px" }} />
            <div style={{ padding: "16px 20px", textAlign: "center", borderLeft: `1px solid ${tokens.hairline}`, background: tokens.brandSoft }}>
              <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 700, color: tokens.ink }}>{c.comparison.usLabel}</span>
            </div>
            <div style={{ padding: "16px 20px", textAlign: "center", borderLeft: `1px solid ${tokens.hairline}` }}>
              <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: tokens.muted }}>{c.comparison.themLabel}</span>
            </div>
          </div>
          {c.comparison.rows.map((r, i) => (
            <div key={r.label} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", borderTop: `1px solid ${tokens.hairline}`, background: i % 2 && d.key !== "atlas" ? tokens.pageBg : "transparent" }}>
              <div style={{ padding: "15px 20px", fontFamily: FONT, fontSize: 14, fontWeight: 500, color: tokens.body }}>{r.label}</div>
              <div style={{ padding: "15px 20px", textAlign: "center", borderLeft: `1px solid ${tokens.hairline}`, background: tokens.brandSoft, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <Check size={15} weight="bold" color={tokens.brand} style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: FONT, fontSize: 13.5, color: tokens.ink, fontWeight: 500 }}>{r.us}</span>
              </div>
              <div style={{ padding: "15px 20px", textAlign: "center", borderLeft: `1px solid ${tokens.hairline}`, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <Minus size={14} weight="bold" color={tokens.muted} style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: FONT, fontSize: 13.5, color: tokens.muted }}>{r.them}</span>
              </div>
            </div>
          ))}
        </div>
      </Rise>
    </Band>
  );
}

function MoneyStrip({ d, c }: { d: Direction; c: SampleContent }) {
  return (
    <Band d={d} id="money">
      <Heading d={d} title={c.money.title} intro={c.money.intro} />
      <div style={autoGrid(240, d.gridGap)}>
        {c.money.items.map((m, i) => (
          <Rise key={m.label} delay={i * 0.04}>
            <div style={{ padding: d.key === "atlas" ? "8px 4px" : 26, background: d.key === "atlas" ? "transparent" : d.cardBg, border: d.key === "atlas" ? "none" : (d.cardBorder ?? "none"), borderRadius: d.cardRadius, boxShadow: d.key === "aurora" ? d.cardShadow : "none", textAlign: d.key === "atlas" ? "center" : "left" }}>
              <div style={{ fontSize: d.key === "atlas" ? 30 : 26, fontWeight: 700, color: tokens.ink, display: "flex", justifyContent: d.key === "atlas" ? "center" : "flex-start" }}>
                <Gated note={m.note}>—</Gated>
              </div>
              <p style={{ color: tokens.muted, fontSize: 14, marginTop: 14, fontWeight: 500 }}>{m.label}</p>
            </div>
          </Rise>
        ))}
      </div>
    </Band>
  );
}

function StepFlow({ d, c }: { d: Direction; c: SampleContent }) {
  return (
    <Band d={d} tone="deep" id="steps">
      <Heading d={d} title={c.steps.title} />
      <div style={autoGrid(180, d.gridGap)}>
        {c.steps.items.map((s, i) => (
          <Rise key={s.t} delay={i * 0.04}>
            <div style={{ height: "100%", padding: d.key === "atlas" ? "4px" : 20, background: d.key === "atlas" ? "transparent" : d.cardBg, border: d.key === "atlas" ? "none" : (d.cardBorder ?? "none"), borderRadius: d.cardRadius }}>
              <span style={{ display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: 999, background: tokens.ink, color: "#fff", fontFamily: d.monoLabels ? MONO : FONT, fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
              <p style={{ fontFamily: FONT, color: tokens.ink, fontSize: 15, fontWeight: 600, marginTop: 14 }}>{s.t}</p>
              <p style={{ color: tokens.muted, fontSize: 13, lineHeight: 1.5, marginTop: 5 }}>{s.b}</p>
            </div>
          </Rise>
        ))}
      </div>
    </Band>
  );
}

function Faq({ d, c }: { d: Direction; c: SampleContent }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <Band d={d} id="faq">
      <Heading d={d} title={c.faqs.title} align={d.headingAlign} />
      <div style={{ maxWidth: 820, marginInline: d.headingAlign === "center" ? "auto" : undefined }}>
        {c.faqs.items.map((f, i) => (
          <Rise key={i}>
            <details style={{ borderBottom: `1px solid ${tokens.hairline}` }}>
              <summary
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer", listStyle: "none", padding: "20px 12px", borderRadius: 8, fontFamily: FONT, fontSize: 16.5, fontWeight: 600, color: tokens.ink, display: "flex", justifyContent: "space-between", gap: 16, background: hover === i ? tokens.pageBgDeep : "transparent", transition: "background .15s ease" }}
              >
                {f.q}
                <span style={{ color: tokens.brand, flexShrink: 0 }}>+</span>
              </summary>
              <p style={{ color: tokens.muted, fontSize: 15, lineHeight: 1.65, padding: "0 12px 20px", maxWidth: "64ch" }}>{f.a}</p>
            </details>
          </Rise>
        ))}
      </div>
    </Band>
  );
}

function CTA({ d, c }: { d: Direction; c: SampleContent }) {
  return (
    <section style={{ background: tokens.ink, paddingBlock: d.key === "atlas" ? 128 : 104 }}>
      <Wrap>
        <div style={d.key === "blueprint"
          ? { display: "flex", flexDirection: "row", flexWrap: "wrap", gap: 30, alignItems: "flex-end", justifyContent: "space-between", textAlign: "left" }
          : { display: "flex", flexDirection: "column", gap: 30, alignItems: "center", textAlign: "center" }}>
          <Rise>
            <h2 style={{ fontFamily: DISPLAY, color: "#fff", fontSize: d.key === "atlas" ? "clamp(32px,4.6vw,52px)" : "clamp(28px,4vw,44px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.06, maxWidth: "16ch", textWrap: "balance" }}>
              {c.cta.title}
            </h2>
            <p style={{ color: "rgba(255,255,255,.65)", fontSize: 16, lineHeight: 1.55, marginTop: 16, maxWidth: 460, marginInline: d.headingAlign === "center" && d.key !== "blueprint" ? "auto" : undefined }}>{c.cta.sub}</p>
          </Rise>
          <Rise delay={0.08}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <Btn to="/contact">Book a free site survey</Btn>
              <Btn to="/products" kind="secondary" onDark>Explore the range</Btn>
            </div>
          </Rise>
        </div>
      </Wrap>
    </section>
  );
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export function SamplePage({ d, content }: { d: Direction; content: SampleContent }) {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg, color: tokens.body }}>
      <Hero d={d} c={content} />
      <TrustStrip d={d} c={content} />
      <RangeGrid d={d} c={content} />
      <FeatureRows d={d} c={content} />
      <OutcomeGrid d={d} c={content} />
      <Comparison d={d} c={content} />
      <MoneyStrip d={d} c={content} />
      <StepFlow d={d} c={content} />
      <Faq d={d} c={content} />
      <CTA d={d} c={content} />
    </div>
  );
}
