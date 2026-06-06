/*
  HeroCarousel — full-screen image slider for the Homes hero.

  A 100vh-available image slider. The hero copy sits in an Apple Wallet style
  stacked pair, bottom-left: a recessed tabs card peeks out the top (four tabs,
  each with a story-style progress bar that fills on the active slide), and the
  white content card overlaps it from below holding the eyebrow tag, title,
  description, and two configured CTAs. Auto-advances, pauses on hover. The tab
  pill is a framer layoutId shared element. Reduced-motion safe.
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
const RADIUS = 22;

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
      style={{ position: "relative", height: "calc(100svh - 108px)", minHeight: 580, overflow: "hidden", background: INK }}
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
        `linear-gradient(90deg, oklch(15.3% 0.006 107.1 / 0.6) 0%, oklch(15.3% 0.006 107.1 / 0.18) 42%, transparent 66%),` +
        `linear-gradient(0deg, oklch(15.3% 0.006 107.1 / 0.5) 0%, transparent 38%)` }} />

      {/* content: bottom-left — gray tab card + white content card, one progress bar */}
      <div style={{ position: "relative", height: "100%", maxWidth: 1280, marginInline: "auto", paddingInline: 32, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ width: "100%", maxWidth: 452, paddingBottom: 54 }}>

          {/* gray tab card — current category, straight sides down behind the white card */}
          <div style={{
            position: "relative", zIndex: 1,
            background: tokens.pageBgDeep,
            border: `1px solid ${tokens.hairline}`,
            borderBottom: "none",
            borderRadius: `${RADIUS}px ${RADIUS}px 0 0`,
            padding: "13px 22px 26px",
          }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={i}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduce ? 0 : 0.32, ease: EASE }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT,
                  fontSize: 12.5, fontWeight: 600, letterSpacing: "0.01em", color: tokens.inkMuted,
                }}
              >
                <span aria-hidden style={{ position: "relative", display: "inline-flex", width: 7, height: 7 }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: 999, background: tokens.brand }} />
                  {!reduce && (
                    <motion.span aria-hidden
                      animate={{ scale: [1, 2.2], opacity: [0.55, 0] }}
                      transition={{ duration: 1.8, ease: "easeOut", repeat: Infinity }}
                      style={{ position: "absolute", inset: 0, borderRadius: 999, background: tokens.brand }} />
                  )}
                </span>
                {s.eyebrow}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* white content card — overlaps the gray card seamlessly, one progress bar at its foot */}
          <div style={{
            position: "relative", zIndex: 2, marginTop: -14,
            background: tokens.card,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: RADIUS,
            overflow: "hidden",
            boxShadow: "0 2px 4px oklch(15.3% 0.006 107.1 / 0.06), 0 34px 80px -38px oklch(15.3% 0.006 107.1 / 0.72)",
          }}>
            <div style={{ padding: "22px 26px 24px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                >
                  <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(27px, 3.3vw, 39px)", fontWeight: 600, letterSpacing: "-0.032em", lineHeight: 1.04, textWrap: "balance" }}>{s.title}</h1>
                  <p style={{ color: tokens.body, fontSize: 15.5, lineHeight: 1.52, marginTop: 12, maxWidth: "40ch" }}>{s.sub}</p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
                    <CardBtn to={s.primary.to} primary>{s.primary.label}</CardBtn>
                    {s.secondary && <CardBtn to={s.secondary.to}>{s.secondary.label}</CardBtn>}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* single progress bar — the card advancing to the next slide */}
            <div aria-hidden style={{ height: 3, background: tokens.hairline }}>
              {!reduce && !paused
                ? <motion.div key={`p${i}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: autoMs / 1000, ease: "linear" }}
                    style={{ height: "100%", transformOrigin: "left", background: tokens.brand }} />
                : <div style={{ height: "100%", width: "100%", background: tokens.brand, opacity: 0.85 }} />}
            </div>
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
    letterSpacing: "-0.005em", borderRadius: 12, padding: "11px 18px", textDecoration: "none", cursor: "pointer",
    border: "1px solid transparent", transition: "all .16s ease", transform: h ? "translateY(-1px)" : "none",
  };
  const style: CSSProperties = primary
    ? { ...base, background: h ? tokens.brandHover : tokens.brand, color: "#fff", boxShadow: h ? "0 10px 24px -12px oklch(0.58 0.245 27 / 0.6)" : "0 6px 16px -12px oklch(0.58 0.245 27 / 0.5)" }
    : { ...base, background: tokens.card, color: tokens.ink, borderColor: tokens.hairlineStrong };
  return (
    <Link to={to} style={style} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {primary && <Lightning size={13} weight="fill" />}
      {children}
      <ArrowRight size={12} weight="bold" style={{ transform: h ? "translateX(2px)" : "none", transition: "transform .16s ease" }} />
    </Link>
  );
}
