/*
  Shared atoms for the flexible module library. One clean V3 look (olive + GridRed,
  Inter, hairline cards) — not direction-parameterized; these are the building
  blocks pages get assembled from. Honest by default (numbers via <Gated>).
*/

import { type ReactNode, type CSSProperties, useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CaretDown } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";

export const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
export const DISPLAY = '"Clash Grotesk", Inter, ui-sans-serif, system-ui, sans-serif';
export const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';
export const EASE = [0.22, 1, 0.36, 1] as const;
const MAXW = 1180;

export function Wrap({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div style={{ maxWidth: MAXW, marginInline: "auto", paddingInline: 28, ...style }}>{children}</div>;
}

export function Band({ children, tone = "base", py = 100, id }: { children: ReactNode; tone?: "base" | "deep"; py?: number; id?: string }) {
  const deep = tone === "deep";
  return (
    <section id={id} style={{ background: deep ? tokens.pageBgDeep : tokens.pageBg, paddingBlock: py, borderTop: deep ? `1px solid ${tokens.hairline}` : undefined, borderBottom: deep ? `1px solid ${tokens.hairline}` : undefined }}>
      <Wrap>{children}</Wrap>
    </section>
  );
}

export function Rise({ children, delay = 0, y = 16, style }: { children: ReactNode; delay?: number; y?: number; style?: CSSProperties }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div style={style} initial={reduce ? false : { opacity: 0, y }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.6, ease: EASE, delay }}>
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, align = "left" }: { children: ReactNode; align?: "left" | "center" }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 8, justifyContent: align === "center" ? "center" : undefined, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: tokens.inkMuted }}>
      <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
      {children}
    </span>
  );
}

export function H2({ children, align = "left", display = false, max }: { children: ReactNode; align?: "left" | "center"; display?: boolean; max?: number }) {
  return (
    <h2 style={{ fontFamily: display ? DISPLAY : FONT, color: tokens.ink, fontSize: display ? "clamp(32px,4.4vw,50px)" : "clamp(28px,3.6vw,42px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, textWrap: "balance", textAlign: align, maxWidth: max, marginInline: align === "center" ? "auto" : undefined }}>
      {children}
    </h2>
  );
}

export function Lead({ children, align = "left" }: { children: ReactNode; align?: "left" | "center" }) {
  return <p style={{ color: tokens.muted, fontSize: 17, lineHeight: 1.6, maxWidth: 620, textAlign: align, marginInline: align === "center" ? "auto" : undefined }}>{children}</p>;
}

export function Btn({ to, children, kind = "primary", onDark = false, small = false }: { to: string; children: ReactNode; kind?: "primary" | "secondary" | "ghost"; onDark?: boolean; small?: boolean }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: small ? 13 : 14, fontWeight: 600,
    borderRadius: 12, padding: small ? "10px 16px" : "13px 22px", textDecoration: "none", cursor: "pointer", border: "1px solid transparent",
    transition: "background .16s ease, border-color .16s ease, transform .16s ease", transform: h ? "translateY(-1px)" : "none",
  };
  const variants: Record<string, CSSProperties> = {
    primary: { background: h ? tokens.brandHover : tokens.brand, color: "#fff" },
    secondary: { background: onDark ? "transparent" : tokens.card, color: onDark ? "#fff" : tokens.ink, borderColor: onDark ? "rgba(255,255,255,.28)" : tokens.hairlineStrong },
    ghost: { background: "transparent", color: tokens.ink },
  };
  return (
    <Link to={to} style={{ ...base, ...variants[kind] }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {children}
      {kind !== "ghost" && <ArrowRight size={13} weight="bold" style={{ transform: h ? "translateX(2px)" : "none", transition: "transform .16s ease" }} />}
    </Link>
  );
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  const [h, setH] = useState(false);
  return (
    <Link to={to} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: FONT, fontSize: 14, fontWeight: 600, color: tokens.brand, textDecoration: "none" }}>
      {children}
      <ArrowRight size={12} weight="bold" style={{ transform: h ? "translateX(3px)" : "none", transition: "transform .16s ease" }} />
    </Link>
  );
}

export function Media({ caption, ratio = "4 / 3", radius = 16, depth = false }: { caption: string; ratio?: string; radius?: number; depth?: boolean }) {
  return (
    <div style={{ aspectRatio: ratio, background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: radius, display: "grid", placeItems: "center", overflow: "hidden", boxShadow: depth ? "0 28px 64px -38px oklch(15.3% 0.006 107.1 / 0.4)" : "none" }}>
      <div style={{ textAlign: "center", padding: 20 }}>
        <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.muted }}>{caption}</span>
        <p style={{ fontFamily: MONO, fontSize: 9, color: tokens.brand, marginTop: 6, letterSpacing: "0.1em" }}>ASSET TBD</p>
      </div>
    </div>
  );
}

/** Accordion row — chevron rotates, content reveals. Reduced-motion safe. */
export function Accordion({ q, a, open, onToggle, circle = false }: { q: string; a: ReactNode; open: boolean; onToggle: () => void; circle?: boolean }) {
  const reduce = useReducedMotion() ?? false;
  return (
    <div style={{ borderBottom: `1px solid ${tokens.hairline}` }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "20px 4px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", fontFamily: FONT, fontSize: 16.5, fontWeight: 600, color: tokens.ink }}
      >
        {q}
        {circle ? (
          <span style={{ display: "grid", placeItems: "center", width: 26, height: 26, borderRadius: 999, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, flexShrink: 0 }}>
            <CaretDown size={13} weight="bold" color={tokens.brand} style={{ transform: open ? "rotate(180deg)" : "none", transition: reduce ? undefined : "transform .2s ease" }} />
          </span>
        ) : (
          <CaretDown size={16} weight="bold" color={tokens.brand} style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: reduce ? undefined : "transform .2s ease" }} />
        )}
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.26, ease: EASE }} style={{ overflow: "hidden" }}>
        <p style={{ color: tokens.muted, fontSize: 15, lineHeight: 1.65, padding: "0 4px 22px", maxWidth: "64ch" }}>{a}</p>
      </motion.div>
    </div>
  );
}

export { tokens };
