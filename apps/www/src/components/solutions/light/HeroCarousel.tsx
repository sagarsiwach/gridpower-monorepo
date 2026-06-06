/*
  HeroCarousel — full-screen (100svh) cinematic hero with a tab-driven image
  slider. Tabs at the top switch the slide and crossfade the left-aligned copy,
  so one hero presents several solutions. Auto-advances with a progress bar on
  the active tab; pauses on hover. Tab pill is a framer layoutId shared element
  (same fluid motion as the mega-menu tab and the dock). Reduced-motion safe.

  Dark stage with a left-weighted gradient so the copy stays legible over imagery.
*/

import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Lightning } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";
import { FONT, EASE } from "./directions";

export type HeroSlide = {
  tab: string;
  image: string;
  eyebrow: string;
  title: string;
  sub: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
};

const INK = "oklch(15.3% 0.006 107.1)";

export function HeroCarousel({ slides, autoMs = 6500 }: { slides: HeroSlide[]; autoMs?: number }) {
  const reduce = useReducedMotion() ?? false;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  useEffect(() => {
    if (paused || n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), autoMs);
    return () => clearInterval(t);
  }, [paused, n, autoMs, i]);

  const s = slides[i];
  if (!s) return null;

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ position: "relative", height: "100svh", minHeight: 600, overflow: "hidden", background: INK, color: "#fff" }}
    >
      {/* image layers */}
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0 }}
          transition={reduce ? { duration: 0 } : { opacity: { duration: 0.9, ease: EASE }, scale: { duration: autoMs / 1000 + 1, ease: "linear" } }}
          style={{ position: "absolute", inset: 0 }}
        >
          <img src={s.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>
      </AnimatePresence>

      {/* legibility gradient — left-weighted + bottom */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background:
        `linear-gradient(90deg, oklch(15.3% 0.006 107.1 / 0.80) 0%, oklch(15.3% 0.006 107.1 / 0.45) 42%, oklch(15.3% 0.006 107.1 / 0) 72%),` +
        `linear-gradient(0deg, oklch(15.3% 0.006 107.1 / 0.55) 0%, transparent 38%)` }} />

      {/* content */}
      <div style={{ position: "relative", height: "100%", maxWidth: 1280, marginInline: "auto", paddingInline: 32, display: "flex", flexDirection: "column" }}>
        {/* tabs at the top (cleared below the sticky header) */}
        <div style={{ paddingTop: 128 }}>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {slides.map((sl, k) => {
              const on = k === i;
              return (
                <button
                  key={sl.tab}
                  type="button"
                  onClick={() => setI(k)}
                  aria-current={on ? "true" : undefined}
                  style={{
                    position: "relative", overflow: "hidden", cursor: "pointer", border: "none", background: "transparent",
                    padding: "11px 18px", borderRadius: 11, fontFamily: FONT, fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em",
                    color: on ? "#fff" : "rgba(255,255,255,0.62)", transition: "color .2s ease",
                  }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = "rgba(255,255,255,0.9)"; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = "rgba(255,255,255,0.62)"; }}
                >
                  {on && (
                    <motion.span layoutId="hero-tab-pill" aria-hidden
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                      style={{ position: "absolute", inset: 0, borderRadius: 11, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.18)", zIndex: 0 }} />
                  )}
                  {/* auto-advance progress on active tab */}
                  {on && !reduce && !paused && (
                    <motion.span key={`p${i}`} aria-hidden
                      initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: autoMs / 1000, ease: "linear" }}
                      style={{ position: "absolute", left: 0, bottom: 0, height: 2, width: "100%", transformOrigin: "left", background: tokens.brand, zIndex: 2 }} />
                  )}
                  <span style={{ position: "relative", zIndex: 1 }}>{sl.tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* left-aligned hero copy, lower third, crossfading per slide */}
        <div style={{ marginTop: "auto", paddingBottom: 72, maxWidth: 620 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: "rgba(255,255,255,0.82)" }}>
                <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />{s.eyebrow}
              </span>
              <h1 style={{ fontFamily: FONT, fontSize: "clamp(38px, 5.6vw, 72px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.0, marginTop: 16, textWrap: "balance" }}>{s.title}</h1>
              <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 19, lineHeight: 1.5, marginTop: 20, maxWidth: 500 }}>{s.sub}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
                <DarkBtn to={s.primary.to} primary>{s.primary.label}</DarkBtn>
                {s.secondary && <DarkBtn to={s.secondary.to}>{s.secondary.label}</DarkBtn>}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function DarkBtn({ to, children, primary }: { to: string; children: React.ReactNode; primary?: boolean }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 14.5, fontWeight: 600,
    borderRadius: 12, padding: "14px 24px", textDecoration: "none", cursor: "pointer", transition: "all .16s ease",
    transform: h ? "translateY(-1px)" : "none",
  };
  const style: CSSProperties = primary
    ? { ...base, background: h ? tokens.brandHover : tokens.brand, color: "#fff" }
    : { ...base, background: h ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.28)" };
  return (
    <Link to={to} style={style} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {primary && <Lightning size={14} weight="fill" />}
      {children}
      <ArrowRight size={13} weight="bold" style={{ transform: h ? "translateX(2px)" : "none", transition: "transform .16s ease" }} />
    </Link>
  );
}
