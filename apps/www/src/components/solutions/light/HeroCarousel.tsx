/*
  HeroCarousel — full-screen image slider for the Homes hero.

  A 100vh-available image slider. Scrolling tabs with a progress bar sit at the
  top-left and switch the slide; below them, a small contained card holds the
  title, description, and two CTAs, crossfading per slide. Auto-advances, pauses
  on hover. Tab pill is a framer layoutId shared element. Reduced-motion safe.
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
      style={{ position: "relative", height: "calc(100svh - 108px)", minHeight: 560, overflow: "hidden", background: INK }}
    >
      {/* image slider */}
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

      {/* legibility wash (left + bottom) */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background:
        `linear-gradient(90deg, oklch(15.3% 0.006 107.1 / 0.55) 0%, oklch(15.3% 0.006 107.1 / 0.15) 40%, transparent 64%),` +
        `linear-gradient(0deg, oklch(15.3% 0.006 107.1 / 0.45) 0%, transparent 36%)` }} />

      {/* content: bottom-left column — tabs above a small card */}
      <div style={{ position: "relative", height: "100%", maxWidth: 1280, marginInline: "auto", paddingInline: 32, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ maxWidth: 480, paddingBottom: 52 }}>
          {/* scrolling tabs with progress bar */}
          <div style={{ display: "flex", gap: 4, marginBottom: 18, overflowX: "auto", paddingBottom: 2 }}>
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
                    padding: "9px 15px", borderRadius: 10, fontFamily: FONT, fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em",
                    color: on ? "#fff" : "rgba(255,255,255,0.66)", whiteSpace: "nowrap", flexShrink: 0, transition: "color .2s ease",
                  }}
                  onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = "rgba(255,255,255,0.92)"; }}
                  onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = "rgba(255,255,255,0.66)"; }}
                >
                  {on && (
                    <motion.span layoutId="hero-tab-pill" aria-hidden
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                      style={{ position: "absolute", inset: 0, borderRadius: 10, background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.20)", zIndex: 0 }} />
                  )}
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

          {/* the small card */}
          <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 20, padding: "26px 28px", boxShadow: "0 28px 70px -36px oklch(15.3% 0.006 107.1 / 0.7)" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
              >
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: tokens.inkMuted }}>
                  <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />{s.eyebrow}
                </span>
                <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(26px, 3.2vw, 38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.04, marginTop: 12, textWrap: "balance" }}>{s.title}</h1>
                <p style={{ color: tokens.muted, fontSize: 16, lineHeight: 1.5, marginTop: 12 }}>{s.sub}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
                  <CardBtn to={s.primary.to} primary>{s.primary.label}</CardBtn>
                  {s.secondary && <CardBtn to={s.secondary.to}>{s.secondary.label}</CardBtn>}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardBtn({ to, children, primary }: { to: string; children: React.ReactNode; primary?: boolean }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 13.5, fontWeight: 600,
    borderRadius: 11, padding: "11px 18px", textDecoration: "none", cursor: "pointer", border: "1px solid transparent",
    transition: "all .16s ease", transform: h ? "translateY(-1px)" : "none",
  };
  const style: CSSProperties = primary
    ? { ...base, background: h ? tokens.brandHover : tokens.brand, color: "#fff" }
    : { ...base, background: tokens.card, color: tokens.ink, borderColor: tokens.hairlineStrong };
  return (
    <Link to={to} style={style} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {primary && <Lightning size={13} weight="fill" />}
      {children}
      <ArrowRight size={12} weight="bold" style={{ transform: h ? "translateX(2px)" : "none", transition: "transform .16s ease" }} />
    </Link>
  );
}
