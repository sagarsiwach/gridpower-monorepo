/*
  /solutions — the audience selector (live, navbar target).

  Purpose: orient and route. Nobody buys here; visitors self-select an audience
  and move to its hub. Exactly four sections, in the locked restrained language
  (olive + GridRed, Inter, inline token styles). Global header + footer come from
  root.tsx. Numbers route through <Gated>.

  Sections:
    1. AudienceCarousel — a proper auto-advancing hero cycling the 5 audiences,
       full-bleed image with the tagged-card identity (gray category header +
       dense white body + dual CTA), echoing HeroCarousel's DNA. Clickable tab
       row jumps audiences. Reduced-motion gives a static first slide.
    2. AudienceGrid — the real navigation. Homes featured larger, the other four
       equal. Each card routes to its hub.
    3. WhyStrip — the one shared pitch, true for every audience.
    4. ConfigureBand — CTA into /configure.

  AUDIENCES is the single source of truth: name, value line, image, hub href.
  Swap images in one place.
*/

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  ArrowRight, Lightning, Check, House, Buildings, ForkKnife, Briefcase, GraduationCap,
  ShieldCheck, DeviceMobile, SpeakerSimpleX, Lock,
} from "@phosphor-icons/react";
import { tokens } from "../_preview/_v3-tokens";
import { FONT, MONO, EASE } from "../../components/solutions/light/directions";

export const meta: MetaFunction = () => [
  { title: "Solutions by audience | GridEnergy" },
  {
    name: "description",
    content:
      "Find the GridEnergy fit for your world. Silent LFP storage for homes, offices, hospitality, enterprises, and institutes, all run by GridOS.",
  },
];

const INK = "oklch(15.3% 0.006 107.1)";

/* ------------------------------------------------------------------ */
/*  SINGLE SOURCE OF TRUTH — audiences (name, value line, image, hub)  */
/*  Only homes-* images exist on disk; the other four reuse the best   */
/*  homes image as a placeholder until audience photography lands.     */
/* ------------------------------------------------------------------ */
type Audience = {
  id: string;
  name: string;
  Icon: typeof House;
  kicker: string;
  /** one TRUE qualitative value line — no numbers */
  value: string;
  /** longer hero sub, still qualitative */
  sub: string;
  /** three qualitative hero points */
  points: string[];
  image: string;
  href: string;
};

const AUDIENCES: Audience[] = [
  {
    id: "homes",
    name: "Homes",
    Icon: House,
    kicker: "For homes",
    value: "Silent, lifetime backup that runs your whole home and makes your solar worth it.",
    sub: "From a flat to a villa: backup, lower bills, and self-used solar, seamless the moment the grid drops.",
    points: [
      "Backs up essentials or the whole home, ACs included",
      "Silent LFP, no genset and no fumes",
      "Run from your phone through GridOS",
    ],
    image: "/images/solutions/homes-large.png",
    href: "/solutions/homes",
  },
  {
    id: "offices-industrial",
    name: "Offices & Industrial",
    Icon: Buildings,
    kicker: "For offices & industrial",
    value: "Uninterrupted operations and cleaner energy costs, without a yard full of diesel.",
    sub: "Keep the floor running through cuts and shave peak-tariff demand, quietly and on autopilot.",
    points: [
      "Bridges cuts so work never stops",
      "Trims peak-hour and demand charges",
      "Sited indoors, no diesel yard or fumes",
    ],
    // TODO: audience photography — using a homes placeholder
    image: "/images/solutions/homes-small.png",
    href: "/solutions/offices-industrial",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    Icon: ForkKnife,
    kicker: "For hospitality",
    value: "Guests never feel a power cut, and your nights stay silent.",
    sub: "Seamless backup that protects the guest experience, with no genset rumble and no diesel smell.",
    points: [
      "Seamless switchover guests never notice",
      "Silent nights, no genset and no fumes",
      "Lower energy bills on every occupied room",
    ],
    // TODO: audience photography — using a homes placeholder
    image: "/images/solutions/homes-apartment.png",
    href: "/solutions/hospitality",
  },
  {
    id: "enterprises",
    name: "Enterprises",
    Icon: Briefcase,
    kicker: "For enterprises",
    value: "Resilient, software-controlled energy across every site you run.",
    sub: "One platform for backup, savings, and visibility across a portfolio of locations, with no vendor lock-in.",
    points: [
      "Backup and savings across many sites",
      "Fleet-wide visibility through GridOS",
      "Open standards, no vendor lock-in",
    ],
    // TODO: audience photography — using a homes placeholder
    image: "/images/solutions/homes-solar.png",
    href: "/solutions/enterprises",
  },
  {
    id: "institutes",
    name: "Educational Institutes",
    Icon: GraduationCap,
    kicker: "For educational institutes",
    value: "Reliable, quiet power for campuses, and a visible step toward clean energy.",
    sub: "Keep classes, labs, and hostels running through cuts, silently, while cutting what the campus spends on power.",
    points: [
      "Keeps classes, labs, and hostels powered",
      "Silent operation across the campus",
      "Pairs with solar to cut campus costs",
    ],
    // TODO: audience photography — using a homes placeholder
    image: "/images/solutions/homes-solar.png",
    href: "/solutions/institutes",
  },
];

const PRIMARY = { label: "Configure your system", to: "/configure" };
const SECONDARY = { label: "Talk to us", to: "/contact" };

export default function SolutionsIndex() {
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        <AudienceCarousel />
        <AudienceGrid />
        <WhyStrip />
        <ConfigureBand />
      </main>
    </div>
  );
}

/* ================================================================== */
/*  1. AudienceCarousel                                                */
/* ================================================================== */
function AudienceCarousel({ autoMs = 6500 }: { autoMs?: number }) {
  const reduce = useReducedMotion() ?? false;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = AUDIENCES.length;

  useEffect(() => {
    if (reduce || paused || n <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), autoMs);
    return () => clearInterval(t);
  }, [reduce, paused, n, autoMs, i]);

  const a = AUDIENCES[i];
  if (!a) return null;

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="GridEnergy audiences"
      style={{ position: "relative", height: "calc(100svh - 108px)", minHeight: 600, overflow: "hidden", background: INK }}
    >
      {/* full-bleed image — AnimatePresence crossfade with a subtle scale */}
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 1.06 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { opacity: { duration: 0.9, ease: EASE }, scale: { duration: autoMs / 1000 + 1, ease: "linear" } }
          }
          style={{ position: "absolute", inset: 0 }}
        >
          <img src={a.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </motion.div>
      </AnimatePresence>

      {/* legibility wash — keeps all text on the card AA-legible over any image */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, oklch(15.3% 0.006 107.1 / 0.62) 0%, oklch(15.3% 0.006 107.1 / 0.2) 44%, transparent 68%)," +
            "linear-gradient(0deg, oklch(15.3% 0.006 107.1 / 0.52) 0%, transparent 40%)",
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
        {/* small section label, top-left over the wash */}
        <div style={{ position: "absolute", top: 36, left: 32 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              fontFamily: MONO,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.92)",
            }}
          >
            <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
            Solutions by audience
          </span>
        </div>

        {/* tagged card: gray header + dense white body */}
        <div
          style={{
            width: "100%",
            maxWidth: 480,
            marginBottom: 44,
            borderRadius: 22,
            boxShadow:
              "0 2px 4px oklch(15.3% 0.006 107.1 / 0.06), 0 34px 80px -38px oklch(15.3% 0.006 107.1 / 0.72)",
          }}
        >
          {/* gray header — current audience */}
          <div
            style={{
              background: tokens.pageBgDeep,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: "22px 22px 0 0",
              padding: "12px 24px",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={i}
                initial={reduce ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -5 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
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
                <a.Icon size={15} weight="bold" color={tokens.brand} />
                {a.kicker}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* white body — dense */}
          <div
            style={{
              background: tokens.card,
              borderLeft: `1px solid ${tokens.hairline}`,
              borderRight: `1px solid ${tokens.hairline}`,
              borderBottom: `1px solid ${tokens.hairline}`,
              borderRadius: "0 0 22px 22px",
              padding: "20px 24px 24px",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
              >
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: tokens.muted }}>
                  GridEnergy for
                </span>
                <h1
                  style={{
                    fontFamily: FONT,
                    color: tokens.ink,
                    fontSize: "clamp(26px, 3.1vw, 36px)",
                    fontWeight: 600,
                    letterSpacing: "-0.032em",
                    lineHeight: 1.05,
                    marginTop: 9,
                    textWrap: "balance",
                  }}
                >
                  {a.name}
                </h1>
                <p style={{ color: tokens.body, fontSize: 15, lineHeight: 1.52, marginTop: 11, maxWidth: "42ch" }}>{a.sub}</p>

                <div style={{ height: 1, background: tokens.hairline, margin: "18px 0" }} />

                <ul style={{ display: "flex", flexDirection: "column", gap: 9, listStyle: "none", margin: 0, padding: 0 }}>
                  {a.points.map((p) => (
                    <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span
                        aria-hidden
                        style={{
                          flexShrink: 0,
                          display: "grid",
                          placeItems: "center",
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          background: tokens.brandSoft,
                          marginTop: 1,
                        }}
                      >
                        <Check size={11} weight="bold" color={tokens.brand} />
                      </span>
                      <span style={{ fontFamily: FONT, fontSize: 13.5, lineHeight: 1.4, color: tokens.body }}>{p}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
                  <CardBtn to={`${a.href}`} primary>
                    Explore {a.name.split(" ")[0]}
                  </CardBtn>
                  <CardBtn to={PRIMARY.to}>{PRIMARY.label}</CardBtn>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* clickable tab row — jump to any audience */}
        <div
          role="tablist"
          aria-label="Choose an audience"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 40,
          }}
        >
          {AUDIENCES.map((aud, idx) => {
            const on = idx === i;
            return (
              <button
                key={aud.id}
                type="button"
                role="tab"
                aria-selected={on}
                aria-label={aud.name}
                onClick={() => setI(idx)}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  fontFamily: FONT,
                  fontSize: 12.5,
                  fontWeight: 600,
                  letterSpacing: "-0.005em",
                  padding: "8px 13px",
                  borderRadius: 999,
                  cursor: "pointer",
                  border: on ? "1px solid transparent" : "1px solid rgba(255,255,255,0.22)",
                  background: on ? "#ffffff" : "rgba(255,255,255,0.08)",
                  color: on ? tokens.ink : "rgba(255,255,255,0.92)",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  transition: "background .18s ease, color .18s ease, border-color .18s ease",
                }}
              >
                <aud.Icon size={14} weight={on ? "fill" : "bold"} color={on ? tokens.brand : "currentColor"} />
                {aud.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CardBtn({ to, children, primary }: { to: string; children: ReactNode; primary?: boolean }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
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
    transition: "all .16s ease",
    transform: h ? "translateY(-1px)" : "none",
  };
  const style: CSSProperties = primary
    ? {
        ...base,
        background: h ? tokens.brandHover : tokens.brand,
        color: "#fff",
        boxShadow: h ? "0 10px 24px -12px oklch(0.58 0.245 27 / 0.6)" : "0 6px 16px -12px oklch(0.58 0.245 27 / 0.5)",
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

/* ================================================================== */
/*  2. AudienceGrid — the real navigation                             */
/* ================================================================== */
function AudienceGrid() {
  const reduce = useReducedMotion() ?? false;
  const [homes, ...rest] = AUDIENCES;

  return (
    <section style={{ background: tokens.pageBg, paddingBlock: 100, borderTop: `1px solid ${tokens.hairline}` }}>
      <div style={{ maxWidth: 1180, marginInline: "auto", paddingInline: 28 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: tokens.inkMuted }}>
          <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
          Find your fit
        </span>
        <h2
          style={{
            fontFamily: FONT,
            color: tokens.ink,
            fontSize: "clamp(28px, 3.6vw, 42px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginTop: 14,
            maxWidth: 18 * 16,
            textWrap: "balance",
          }}
        >
          Five worlds, one platform.
        </h2>
        <p style={{ color: tokens.muted, fontSize: 17, lineHeight: 1.6, maxWidth: 560, marginTop: 14 }}>
          Pick the one that sounds like you. Each opens a hub built for how that world actually uses power.
        </p>

        {/* featured Homes (wide) */}
        {homes && (
          <div style={{ marginTop: 36 }}>
            <AudienceCard a={homes} featured reduce={reduce} delay={0} />
          </div>
        )}

        {/* four equal */}
        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 18,
          }}
        >
          {rest.map((a, idx) => (
            <AudienceCard key={a.id} a={a} reduce={reduce} delay={0.04 * (idx + 1)} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceCard({
  a,
  featured = false,
  reduce,
  delay,
}: {
  a: Audience;
  featured?: boolean;
  reduce: boolean;
  delay: number;
}) {
  const [h, setH] = useState(false);
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
      style={{ height: "100%" }}
    >
      <Link
        to={a.href}
        aria-label={`Explore GridEnergy for ${a.name}`}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          display: featured ? "grid" : "block",
          gridTemplateColumns: featured ? "1.05fr 1fr" : undefined,
          height: "100%",
          textDecoration: "none",
          overflow: "hidden",
          borderRadius: 20,
          background: tokens.card,
          border: `1px solid ${h ? tokens.hairlineStrong : tokens.hairline}`,
          boxShadow: h
            ? "0 1px 2px oklch(15.3% 0.006 107.1 / 0.05), 0 28px 56px -28px oklch(15.3% 0.006 107.1 / 0.34)"
            : "0 1px 2px oklch(15.3% 0.006 107.1 / 0.04), 0 18px 40px -30px oklch(15.3% 0.006 107.1 / 0.28)",
          transition: "border-color .18s ease, box-shadow .18s ease, transform .18s ease",
          transform: h ? "translateY(-2px)" : "none",
        }}
      >
        {/* image panel */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            aspectRatio: featured ? "auto" : "16 / 10",
            minHeight: featured ? 280 : undefined,
            background: INK,
          }}
        >
          <img
            src={a.image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: h && !reduce ? "scale(1.04)" : "scale(1)",
              transition: "transform .5s ease",
            }}
          />
          {/* tag chip over image — gray header DNA, miniaturized */}
          <span
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              fontFamily: FONT,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: tokens.ink,
              background: "rgba(255,255,255,0.94)",
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 999,
              padding: "6px 12px",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
          >
            <a.Icon size={14} weight="fill" color={tokens.brand} />
            {a.name}
          </span>
        </div>

        {/* body */}
        <div
          style={{
            padding: featured ? "32px 32px" : "22px 22px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: featured ? "center" : "flex-start",
          }}
        >
          <h3
            style={{
              fontFamily: FONT,
              color: tokens.ink,
              fontSize: featured ? "clamp(24px, 2.6vw, 30px)" : 20,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              textWrap: "balance",
            }}
          >
            {a.name}
          </h3>
          <p
            style={{
              color: tokens.body,
              fontSize: featured ? 16 : 14.5,
              lineHeight: 1.55,
              marginTop: 10,
              maxWidth: featured ? "40ch" : "34ch",
            }}
          >
            {a.value}
          </p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginTop: featured ? 22 : 16,
              fontFamily: FONT,
              fontSize: 14,
              fontWeight: 600,
              color: tokens.brand,
            }}
          >
            Explore
            <ArrowRight
              size={13}
              weight="bold"
              style={{ transform: h ? "translateX(3px)" : "none", transition: "transform .16s ease" }}
            />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

/* ================================================================== */
/*  3. WhyStrip — the one shared pitch                                 */
/* ================================================================== */
const WHY = [
  {
    Icon: ShieldCheck,
    title: "LFP safety",
    body: "Built on LFP cells, the safer, longer-lived battery chemistry. Sealed and effectively maintenance-free.",
  },
  {
    Icon: DeviceMobile,
    title: "GridOS control",
    body: "GridOS is the live platform that decides when to charge, hold, and discharge, with everything visible from your phone.",
  },
  {
    Icon: SpeakerSimpleX,
    title: "Silent, no genset",
    body: "Power that bridges cuts in silence. No diesel rumble, no fumes, no fuel runs.",
  },
  {
    Icon: Lock,
    title: "No lock-in",
    body: "Built on open standards so you stay in control of your own energy, with no vendor lock-in.",
  },
];

function WhyStrip() {
  const reduce = useReducedMotion() ?? false;
  return (
    <section
      style={{
        background: tokens.pageBgDeep,
        paddingBlock: 92,
        borderTop: `1px solid ${tokens.hairline}`,
        borderBottom: `1px solid ${tokens.hairline}`,
      }}
    >
      <div style={{ maxWidth: 1180, marginInline: "auto", paddingInline: 28 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: tokens.inkMuted }}>
          <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
          Why GridEnergy
        </span>
        <h2
          style={{
            fontFamily: FONT,
            color: tokens.ink,
            fontSize: "clamp(28px, 3.6vw, 42px)",
            fontWeight: 600,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            marginTop: 14,
            maxWidth: 20 * 16,
            textWrap: "balance",
          }}
        >
          True for every audience.
        </h2>
        <p style={{ color: tokens.muted, fontSize: 17, lineHeight: 1.6, maxWidth: 560, marginTop: 14 }}>
          Whichever world you live in, the same four things hold.
        </p>

        <div
          style={{
            marginTop: 40,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {WHY.map((w, idx) => (
            <motion.div
              key={w.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.04 * idx }}
              style={{
                background: tokens.card,
                border: `1px solid ${tokens.hairline}`,
                borderRadius: 16,
                padding: "24px 22px 26px",
              }}
            >
              <span
                style={{
                  display: "grid",
                  placeItems: "center",
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background: tokens.brandSoft,
                }}
              >
                <w.Icon size={19} weight="bold" color={tokens.brand} />
              </span>
              <h3
                style={{
                  fontFamily: FONT,
                  color: tokens.ink,
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  marginTop: 16,
                }}
              >
                {w.title}
              </h3>
              <p style={{ color: tokens.body, fontSize: 14.5, lineHeight: 1.55, marginTop: 8 }}>{w.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  4. ConfigureBand — CTA into /configure                            */
/* ================================================================== */
function ConfigureBand() {
  return (
    <section style={{ background: tokens.pageBg, paddingBlock: 100 }}>
      <div style={{ maxWidth: 1180, marginInline: "auto", paddingInline: 28 }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 24,
            background: INK,
            border: `1px solid ${tokens.hairlineStrong}`,
            padding: "clamp(40px, 6vw, 72px) clamp(28px, 5vw, 64px)",
          }}
        >
          {/* faint brand glow, decorative only */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -120,
              right: -80,
              width: 360,
              height: 360,
              borderRadius: 999,
              background: "radial-gradient(circle, oklch(0.58 0.245 27 / 0.28) 0%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
          <div style={{ position: "relative", maxWidth: 640 }}>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.78)",
              }}
            >
              Not sure which fits?
            </span>
            <h2
              style={{
                fontFamily: FONT,
                color: "#fff",
                fontSize: "clamp(28px, 3.8vw, 44px)",
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginTop: 14,
                textWrap: "balance",
              }}
            >
              Size your system in two minutes.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: 17, lineHeight: 1.6, marginTop: 16, maxWidth: "52ch" }}>
              Answer a few questions about your space and load. We will point you to the right audience and a system sized for it.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <BandBtn to={PRIMARY.to} primary>
                {PRIMARY.label}
              </BandBtn>
              <BandBtn to={SECONDARY.to}>{SECONDARY.label}</BandBtn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BandBtn({ to, children, primary }: { to: string; children: ReactNode; primary?: boolean }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: FONT,
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "-0.005em",
    borderRadius: 12,
    padding: "13px 22px",
    textDecoration: "none",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "all .16s ease",
    transform: h ? "translateY(-1px)" : "none",
  };
  const style: CSSProperties = primary
    ? {
        ...base,
        background: h ? tokens.brandHover : tokens.brand,
        color: "#fff",
        boxShadow: h ? "0 12px 28px -12px oklch(0.58 0.245 27 / 0.7)" : "0 8px 20px -12px oklch(0.58 0.245 27 / 0.55)",
      }
    : { ...base, background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.28)" };
  return (
    <Link to={to} style={style} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {primary && <Lightning size={13} weight="fill" />}
      {children}
      <ArrowRight size={13} weight="bold" style={{ transform: h ? "translateX(2px)" : "none", transition: "transform .16s ease" }} />
    </Link>
  );
}
