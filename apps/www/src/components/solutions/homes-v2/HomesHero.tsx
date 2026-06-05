/*
  HomesHero — centered, Tesla-Powerwall-style hero for /solutions/homes.

  Per the locked Homes spine: bold centered title, qualitative highlight chips,
  two buttons, home imagery doing the heavy lifting. The background slowly
  cross-fades between installed-home photos (~5s); the WORDS never move — that
  protects the "~60% of what-this-is on first screen" goal and conversion.

  No numbers anywhere (hard rule). Chips are qualitative positioning only.
  Reduced-motion: background holds on the first image, entrance is instant.
*/

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Lightning, ArrowRight, ArrowDown } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";

const IMAGES = [
  "/images/solutions/homes-large.png",
  "/images/solutions/homes-small.png",
  "/images/solutions/homes-solar.png",
  "/images/solutions/homes-apartment.png",
];

const CHIPS = ["Silent — no genset", "Runs your ACs", "Works with your solar", "Lifetime LFP", "Controlled from your phone"];
const EASE = [0.22, 1, 0.36, 1] as const;

export default function HomesHero() {
  const reduce = useReducedMotion() ?? false;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % IMAGES.length), 5200);
    return () => window.clearInterval(id);
  }, [reduce]);

  const entrance = (i: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE, delay: 0.15 + i * 0.08 },
        };

  return (
    <section
      aria-label="GridEnergy for homes"
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: tokens.ink }}
    >
      {/* Rotating background imagery */}
      <div aria-hidden style={{ position: "absolute", inset: 0 }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={idx}
            src={IMAGES[idx]}
            alt=""
            initial={reduce ? false : { opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: reduce ? 1.04 : 1.12 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4, ease: EASE }, scale: { duration: 6, ease: "linear" } }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 45%" }}
            draggable={false}
            loading="eager"
          />
        </AnimatePresence>
        {/* Legibility scrim */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.55) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 100% at 50% 30%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 100%)" }} />
      </div>

      {/* Centered content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 140px",
          maxWidth: 980,
          marginInline: "auto",
        }}
      >
        <motion.div {...entrance(0)} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, boxShadow: `0 0 12px ${tokens.brand}` }} />
          <span style={{ color: "rgba(255,255,255,0.92)", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            GridEnergy for Homes
          </span>
        </motion.div>

        <motion.h1
          {...entrance(1)}
          style={{
            color: "#ffffff",
            fontSize: "clamp(40px, 7vw, 82px)",
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 0.98,
            maxWidth: "16ch",
            textWrap: "balance",
          }}
        >
          The last inverter your home will ever need.
        </motion.h1>

        <motion.p
          {...entrance(2)}
          style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(17px, 2vw, 21px)", lineHeight: 1.5, marginTop: 24, maxWidth: "44ch" }}
        >
          Silent, safe home storage that backs up your whole home, cuts your bill, and finally makes your solar worth it — managed from your phone by GridOS.
        </motion.p>

        {/* Qualitative chips */}
        <motion.div {...entrance(3)} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 30 }}>
          {CHIPS.map((c) => (
            <span
              key={c}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.22)",
                backdropFilter: "blur(6px)",
                borderRadius: 999,
                padding: "8px 15px",
              }}
            >
              {c}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div {...entrance(4)} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginTop: 36 }}>
          <a
            href="/contact"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: tokens.brand, color: "#fff", fontSize: 15, fontWeight: 600, padding: "15px 28px", borderRadius: 14, textDecoration: "none" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brand)}
          >
            <Lightning size={16} weight="fill" />
            Book a free site survey
          </a>
          <a
            href="#range"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 15, fontWeight: 600, padding: "15px 24px", borderRadius: 14, textDecoration: "none", border: "1px solid rgba(255,255,255,0.28)" }}
          >
            Explore the range
            <ArrowRight size={14} weight="bold" />
          </a>
        </motion.div>
      </div>

      {/* Scroll affordance */}
      <div aria-hidden style={{ position: "absolute", bottom: 96, left: "50%", transform: "translateX(-50%)", zIndex: 2, color: "rgba(255,255,255,0.7)" }}>
        <motion.span
          style={{ display: "inline-flex" }}
          animate={reduce ? undefined : { y: [0, 5, 0] }}
          transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={18} weight="bold" />
        </motion.span>
      </div>
    </section>
  );
}
