/*
  Kit · Heroes — three swappable solution-page openers.

  Pick one per page; they share a prop shape (eyebrow / title / subtitle / chips /
  primary / secondary) so swapping is a one-line change.

    HeroCinematic — full-viewport image stage, centered statement, rotating
      imagery. Highest drama. Ref: Rivian R1S, Tesla Powerwall. Use when you
      have real install/product photography and want the image to sell.

    HeroSplit — copy left, media right (or reversed). The workhorse. Ref: Stripe.
      Use when the message needs words AND a product visual side by side. Renders
      on light, on the blueprint grid, or on a dark stage.

    HeroCentered — centered statement over the engineering grid, optional
      centerpiece graphic below. Ref: Vercel, Linear /features. Use for platform
      / brand / category openers where one line carries it.

  Hard rules respected: no numbers in hero copy (chips are qualitative only),
  reduced-motion gives an instant, legible first paint, GridRed is the sole accent.
*/

import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown, type Icon } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";
import { MediaSlot } from "../../marketing/Primitives";
import { BlueprintGrid, GradientWash } from "./Backdrops";

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
const DISPLAY = '"Clash Grotesk", Inter, ui-sans-serif, system-ui, sans-serif';
const EASE = [0.22, 1, 0.36, 1] as const;

export type HeroLink = { label: string; to: string; icon?: Icon };

/* shared CTA cluster -------------------------------------------------- */

function HeroCTAs({
  primary,
  secondary,
  onDark,
  align = "center",
}: {
  primary?: HeroLink;
  secondary?: HeroLink;
  onDark?: boolean;
  align?: "center" | "flex-start";
}) {
  if (!primary && !secondary) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: align }}>
      {primary && (
        <Link
          to={primary.to}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: tokens.brand,
            color: "#fff",
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: 600,
            padding: "15px 28px",
            borderRadius: 14,
            textDecoration: "none",
            transition: "background 0.16s ease",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brand)}
        >
          {primary.icon && <primary.icon size={16} weight="fill" />}
          {primary.label}
        </Link>
      )}
      {secondary && (
        <Link
          to={secondary.to}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: onDark ? "rgba(255,255,255,0.1)" : tokens.card,
            color: onDark ? "#fff" : tokens.ink,
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: 600,
            padding: "15px 24px",
            borderRadius: 14,
            textDecoration: "none",
            border: `1px solid ${onDark ? "rgba(255,255,255,0.28)" : tokens.hairlineStrong}`,
          }}
        >
          {secondary.label}
          <ArrowRight size={14} weight="bold" />
        </Link>
      )}
    </div>
  );
}

function Chips({ chips, onDark }: { chips: string[]; onDark?: boolean }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
      {chips.map((c) => (
        <span
          key={c}
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: onDark ? "#fff" : tokens.body,
            background: onDark ? "rgba(255,255,255,0.12)" : tokens.card,
            border: `1px solid ${onDark ? "rgba(255,255,255,0.22)" : tokens.hairline}`,
            backdropFilter: onDark ? "blur(6px)" : undefined,
            borderRadius: 999,
            padding: "8px 15px",
          }}
        >
          {c}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroCinematic                                                      */
/* ------------------------------------------------------------------ */

export function HeroCinematic({
  eyebrow,
  title,
  subtitle,
  chips,
  primary,
  secondary,
  images = ["/images/solutions/homes-large.png"],
  scrollCueHref,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  chips?: string[];
  primary?: HeroLink;
  secondary?: HeroLink;
  images?: string[];
  scrollCueHref?: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce || images.length < 2) return;
    const id = window.setInterval(() => setIdx((i) => (i + 1) % images.length), 5200);
    return () => window.clearInterval(id);
  }, [reduce, images.length]);

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
      aria-label={typeof title === "string" ? title : "Hero"}
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: tokens.ink }}
    >
      <div aria-hidden style={{ position: "absolute", inset: 0 }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={idx}
            src={images[idx]}
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
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.32) 42%, rgba(0,0,0,0.6) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 100% at 50% 30%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 100%)" }} />
      </div>

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
        {eyebrow && (
          <motion.div {...entrance(0)} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, boxShadow: `0 0 12px ${tokens.brand}` }} />
            <span style={{ color: "rgba(255,255,255,0.92)", fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {eyebrow}
            </span>
          </motion.div>
        )}
        <motion.h1
          {...entrance(1)}
          style={{ fontFamily: DISPLAY, color: "#fff", fontSize: "clamp(40px, 7vw, 82px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 0.98, maxWidth: "16ch", textWrap: "balance" }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p {...entrance(2)} style={{ color: "rgba(255,255,255,0.82)", fontSize: "clamp(17px, 2vw, 21px)", lineHeight: 1.5, marginTop: 24, maxWidth: "46ch" }}>
            {subtitle}
          </motion.p>
        )}
        {chips && chips.length > 0 && (
          <motion.div {...entrance(3)} style={{ marginTop: 30 }}>
            <Chips chips={chips} onDark />
          </motion.div>
        )}
        <motion.div {...entrance(4)} style={{ marginTop: 36 }}>
          <HeroCTAs primary={primary} secondary={secondary} onDark />
        </motion.div>
      </div>

      {scrollCueHref && (
        <a href={scrollCueHref} aria-label="Scroll down" style={{ position: "absolute", bottom: 96, left: "50%", transform: "translateX(-50%)", zIndex: 2, color: "rgba(255,255,255,0.7)" }}>
          <motion.span
            style={{ display: "inline-flex" }}
            animate={reduce ? undefined : { y: [0, 5, 0] }}
            transition={reduce ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={18} weight="bold" />
          </motion.span>
        </a>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroSplit                                                          */
/* ------------------------------------------------------------------ */

export function HeroSplit({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  media,
  bg = "blueprint",
  reverse = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  primary?: HeroLink;
  secondary?: HeroLink;
  media?: ReactNode;
  bg?: "light" | "blueprint" | "dark";
  reverse?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  const dark = bg === "dark";
  const background = dark ? tokens.ink : bg === "blueprint" ? tokens.pageBgDeep : tokens.pageBg;
  const ink = dark ? "#fff" : tokens.ink;
  const sub = dark ? "rgba(255,255,255,0.7)" : tokens.muted;

  const rise = reduce
    ? {}
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE } };

  return (
    <section style={{ position: "relative", overflow: "hidden", background, borderBottom: `1px solid ${dark ? tokens.hairlineStrong : tokens.hairline}` }}>
      {bg === "blueprint" && <BlueprintGrid />}
      {dark && <GradientWash at="78% 18%" strength={0.16} />}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, marginInline: "auto", paddingInline: 32 }}>
        <div
          className="lg:grid-cols-2"
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56, alignItems: "center", paddingBlock: "clamp(72px, 10vw, 120px)" }}
        >
          <motion.div {...rise} style={{ order: reverse ? 2 : 1 }}>
            {eyebrow && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, color: tokens.brand, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 18 }}>
                <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
                {eyebrow}
              </span>
            )}
            <h1 style={{ fontFamily: DISPLAY, color: ink, fontSize: "clamp(36px, 5.2vw, 64px)", fontWeight: 600, letterSpacing: "-0.038em", lineHeight: 1.0, textWrap: "balance" }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ color: sub, fontSize: 19, lineHeight: 1.55, marginTop: 22, maxWidth: 520 }}>{subtitle}</p>
            )}
            <div style={{ marginTop: 32 }}>
              <HeroCTAs primary={primary} secondary={secondary} onDark={dark} align="flex-start" />
            </div>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            style={{ order: reverse ? 1 : 2 }}
          >
            {media ?? <MediaSlot label="Product / UI visual" ratio="4 / 3" />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroCentered                                                       */
/* ------------------------------------------------------------------ */

export function HeroCentered({
  eyebrow,
  title,
  subtitle,
  primary,
  secondary,
  centerpiece,
  backdrop = "grid",
  dark = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  primary?: HeroLink;
  secondary?: HeroLink;
  centerpiece?: ReactNode;
  backdrop?: "grid" | "none";
  dark?: boolean;
}) {
  const reduce = useReducedMotion() ?? false;
  const background = dark ? tokens.ink : tokens.pageBg;
  const ink = dark ? "#fff" : tokens.ink;
  const sub = dark ? "rgba(255,255,255,0.66)" : tokens.muted;

  const entrance = (i: number) =>
    reduce
      ? {}
      : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, ease: EASE, delay: 0.12 + i * 0.08 } };

  return (
    <section style={{ position: "relative", overflow: "hidden", background, borderBottom: `1px solid ${dark ? tokens.hairlineStrong : tokens.hairline}` }}>
      {backdrop === "grid" && <BlueprintGrid dark={dark} />}
      {dark && <GradientWash at="50% 8%" strength={0.18} />}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 920,
          marginInline: "auto",
          paddingInline: 24,
          paddingBlock: "clamp(96px, 13vw, 168px)",
          textAlign: "center",
        }}
      >
        {eyebrow && (
          <motion.div {...entrance(0)} style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, boxShadow: `0 0 10px ${tokens.brand}` }} />
            <span style={{ color: dark ? "rgba(255,255,255,0.9)" : tokens.inkMuted, fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {eyebrow}
            </span>
          </motion.div>
        )}
        <motion.h1
          {...entrance(1)}
          style={{ fontFamily: DISPLAY, color: ink, fontSize: "clamp(40px, 6.4vw, 76px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.0, maxWidth: "15ch", marginInline: "auto", textWrap: "balance" }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p {...entrance(2)} style={{ color: sub, fontSize: "clamp(17px, 2vw, 20px)", lineHeight: 1.55, marginTop: 22, maxWidth: "48ch", marginInline: "auto" }}>
            {subtitle}
          </motion.p>
        )}
        {(primary || secondary) && (
          <motion.div {...entrance(3)} style={{ marginTop: 34 }}>
            <HeroCTAs primary={primary} secondary={secondary} onDark={dark} />
          </motion.div>
        )}
        {centerpiece && (
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
            style={{ marginTop: 56 }}
          >
            {centerpiece}
          </motion.div>
        )}
      </div>
    </section>
  );
}
