/*
  /preview/stripe-evolve — restrained vs Stripe-evolved, side by side.

  Same content, two skins. RESTRAINED = current locked system (olive + one
  GridRed, no gradients, soft neutral shadow, 18px radii). EVOLVED = adopts
  Stripe's *techniques* in GridEnergy's own colors: a gradient anchored on
  GridRed but reaching into a cool 2nd hue (Violet / Aurora / Charge options),
  a cool 2nd accent, tinted layered shadows, 10px radii, denser spacing.

  Toggle mode + gradient to compare. Internal route: noindex.
*/

import type { MetaFunction } from "react-router";
import { useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, BatteryChargingVertical, CurrencyInr, SpeakerSimpleX, type Icon } from "@phosphor-icons/react";
import { GlobalHeader } from "../../components/site/GlobalHeader";
import { tokens } from "./_v3-tokens";

export const meta: MetaFunction = () => [
  { title: "Stripe-evolve comparison (internal)" },
  { name: "robots", content: "noindex" },
];

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
const MONO = '"Geist Mono", ui-monospace, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

type Mode = "restrained" | "evolved";
type Grad = "violet" | "aurora" | "charge";

/* Gradient options — all anchored on GridRed (hue 27) but reaching into a COOL
   hue for real range (the thing that makes Stripe's gradient pop). Not red-only. */
const GRADIENTS: Record<Grad, { label: string; arc: string; accent2: string; wash: string; glow: string }> = {
  // GridRed → magenta → violet
  violet: {
    label: "Violet",
    arc: "linear-gradient(115deg, oklch(0.58 0.235 27) 0%, oklch(0.60 0.27 350) 46%, oklch(0.52 0.24 296) 100%)",
    accent2: "oklch(0.52 0.24 296)",
    wash: "radial-gradient(56% 50% at 82% 6%, oklch(0.52 0.24 296 / 0.16), transparent 70%)," +
          "radial-gradient(52% 46% at 10% 0%, oklch(0.58 0.245 27 / 0.13), transparent 72%)",
    glow: "oklch(0.54 0.25 320 / 0.45)",
  },
  // GridRed → violet → electric blue (widest, most Stripe-like spectrum)
  aurora: {
    label: "Aurora",
    arc: "linear-gradient(115deg, oklch(0.58 0.235 27) 0%, oklch(0.55 0.25 322) 42%, oklch(0.60 0.20 254) 100%)",
    accent2: "oklch(0.58 0.20 256)",
    wash: "radial-gradient(56% 50% at 84% 4%, oklch(0.60 0.20 254 / 0.16), transparent 70%)," +
          "radial-gradient(52% 46% at 8% 0%, oklch(0.58 0.245 27 / 0.12), transparent 72%)",
    glow: "oklch(0.56 0.22 300 / 0.45)",
  },
  // GridRed → pink → electric teal (charge energy, highest contrast)
  charge: {
    label: "Charge",
    arc: "linear-gradient(115deg, oklch(0.58 0.235 27) 0%, oklch(0.60 0.19 350) 36%, oklch(0.72 0.15 205) 100%)",
    accent2: "oklch(0.66 0.14 205)",
    wash: "radial-gradient(56% 50% at 84% 4%, oklch(0.72 0.15 205 / 0.18), transparent 70%)," +
          "radial-gradient(52% 46% at 8% 0%, oklch(0.58 0.245 27 / 0.12), transparent 72%)",
    glow: "oklch(0.64 0.16 230 / 0.42)",
  },
};

const EVO = {
  // cool-neutral tinted layered shadow (Stripe tints blue-gray, not warm)
  shadow: "0 13px 27px -6px oklch(0.36 0.06 290 / 0.18), 0 8px 16px -8px oklch(0.18 0.02 280 / 0.30)",
  shadowBig: "0 50px 100px -28px oklch(0.36 0.06 290 / 0.28), 0 24px 48px -24px oklch(0.18 0.02 280 / 0.32)",
  radius: 10,
};

function Wrap({ children, style }: { children: React.ReactNode; style?: CSSProperties }) {
  return <div style={{ maxWidth: 1180, marginInline: "auto", paddingInline: 28, ...style }}>{children}</div>;
}

/* ---- evolved-aware atoms ---- */

function card(mode: Mode): CSSProperties {
  return mode === "evolved"
    ? { background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: EVO.radius, boxShadow: EVO.shadow }
    : { background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 18, boxShadow: "0 1px 2px oklch(15.3% 0.006 107.1 / 0.04)" };
}

function Btn({ to, children, kind = "primary", mode, g }: { to: string; children: React.ReactNode; kind?: "primary" | "secondary"; mode: Mode; g: typeof GRADIENTS[Grad] }) {
  const [h, setH] = useState(false);
  const evolved = mode === "evolved";
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 14, fontWeight: 600,
    borderRadius: evolved ? 10 : 12, padding: "13px 22px", textDecoration: "none", cursor: "pointer",
    border: "1px solid transparent", transition: "all .16s ease", transform: h ? "translateY(-1px)" : "none",
  };
  const variants: Record<string, CSSProperties> = {
    primary: evolved
      ? { backgroundImage: g.arc, color: "#fff", boxShadow: h ? `0 8px 22px -8px ${g.glow}` : `0 4px 14px -6px ${g.glow}` }
      : { background: h ? tokens.brandHover : tokens.brand, color: "#fff" },
    secondary: { background: tokens.card, color: tokens.ink, borderColor: tokens.hairlineStrong },
  };
  return (
    <Link to={to} style={{ ...base, ...variants[kind] }} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      {children}<ArrowRight size={13} weight="bold" style={{ transform: h ? "translateX(2px)" : "none", transition: "transform .16s ease" }} />
    </Link>
  );
}

/* ---- hero ---- */

function Hero({ mode, g }: { mode: Mode; g: typeof GRADIENTS[Grad] }) {
  const reduce = useReducedMotion() ?? false;
  const evolved = mode === "evolved";
  return (
    <section style={{ position: "relative", overflow: "hidden", background: tokens.pageBg, paddingTop: 76, paddingBottom: evolved ? 84 : 96 }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: evolved ? g.wash : "none" }} />
      <Wrap style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: evolved ? 48 : 56, alignItems: "center" }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 999, background: tokens.card, border: `1px solid ${tokens.hairline}`, fontSize: 13, fontWeight: 600, color: tokens.body }}>
              <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: evolved ? undefined : tokens.brand, backgroundImage: evolved ? g.arc : undefined }} />
              Home energy storage
            </span>
            <h1 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(38px, 5.2vw, 60px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, marginTop: 22, textWrap: "balance" }}>
              Silent, lifetime power for your whole home.
            </h1>
            <p style={{ color: tokens.muted, fontSize: 19, lineHeight: 1.55, marginTop: 22, maxWidth: 500 }}>
              One sealed system replaces your inverter, battery, and genset. Backs up your home, cuts your bill, and finally makes your solar worth it.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
              <Btn to="/contact" mode={mode} g={g}>Book a free site survey</Btn>
              <Btn to="/products" kind="secondary" mode={mode} g={g}>Explore the range</Btn>
            </div>
          </div>
          <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE, delay: 0.1 }} style={{ position: "relative" }}>
            {evolved && <div aria-hidden style={{ position: "absolute", inset: "6% 2% 6% 6%", backgroundImage: g.arc, filter: "blur(36px)", opacity: 0.5, borderRadius: 28 }} />}
            <div style={{ position: "relative", aspectRatio: "4 / 3.3", display: "grid", placeItems: "center", overflow: "hidden", background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: evolved ? 16 : 24, boxShadow: evolved ? EVO.shadowBig : "0 28px 64px -38px oklch(15.3% 0.006 107.1 / 0.4)" }}>
              {evolved && <div aria-hidden style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, backgroundImage: g.arc }} />}
              <div style={{ textAlign: "center" }}>
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: tokens.muted }}>GridOS app + Nano</span>
                <p style={{ fontFamily: MONO, fontSize: 9, color: tokens.brand, marginTop: 6, letterSpacing: "0.1em" }}>ASSET TBD</p>
              </div>
            </div>
          </motion.div>
        </div>
      </Wrap>
    </section>
  );
}

/* ---- feature cards ---- */

const FEATURES: { icon: Icon; tag: string; title: string; body: string }[] = [
  { icon: BatteryChargingVertical, tag: "Backup", title: "Runs your whole home", body: "Whole-home or essentials, including your ACs, with seamless switchover when the grid drops." },
  { icon: CurrencyInr, tag: "Savings", title: "Cuts your bill", body: "Stores cheap, off-peak, or solar power and uses it through the expensive hours." },
  { icon: SpeakerSimpleX, tag: "Silence", title: "No genset, ever", body: "Sealed, silent, and fume-free. The diesel generator and its noise simply go away." },
];

function Features({ mode, g }: { mode: Mode; g: typeof GRADIENTS[Grad] }) {
  const evolved = mode === "evolved";
  const [hover, setHover] = useState<string | null>(null);
  return (
    <section style={{ background: tokens.pageBgDeep, borderTop: `1px solid ${tokens.hairline}`, borderBottom: `1px solid ${tokens.hairline}`, paddingBlock: evolved ? 84 : 96 }}>
      <Wrap>
        <h2 style={{ fontFamily: FONT, color: tokens.ink, fontSize: "clamp(28px,3.6vw,42px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 520, marginBottom: 40, textWrap: "balance" }}>
          What you actually get.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: evolved ? 16 : 18 }}>
          {FEATURES.map((f) => {
            const Ico = f.icon;
            const on = hover === f.title;
            return (
              <div key={f.title} onMouseEnter={() => setHover(f.title)} onMouseLeave={() => setHover(null)}
                style={{ position: "relative", overflow: "hidden", padding: evolved ? 24 : 26, ...card(mode), transform: on ? "translateY(-3px)" : "none", boxShadow: on ? (evolved ? EVO.shadowBig : "0 22px 48px -30px oklch(15.3% 0.006 107.1 / 0.34)") : card(mode).boxShadow, transition: "transform .2s ease, box-shadow .25s ease" }}>
                {evolved && <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(80% 60% at 100% 0%, oklch(0.78 0.16 70 / 0.10), transparent 70%)", opacity: on ? 1 : 0.6, transition: "opacity .25s ease" }} />}
                <div style={{ position: "relative" }}>
                  <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: evolved ? 10 : 12, background: evolved ? undefined : tokens.pageBgDeep, backgroundImage: evolved ? g.arc : undefined, border: evolved ? "none" : `1px solid ${tokens.hairline}` }}>
                    <Ico size={22} weight={evolved ? "fill" : "duotone"} color={evolved ? "#fff" : tokens.ink} />
                  </span>
                  <span style={{ display: "block", marginTop: 16, fontFamily: MONO, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: evolved ? g.accent2 : tokens.brand }}>{f.tag}</span>
                  <h3 style={{ fontFamily: FONT, fontSize: 19, fontWeight: 600, color: tokens.ink, marginTop: 6, letterSpacing: "-0.02em" }}>{f.title}</h3>
                  <p style={{ color: tokens.muted, fontSize: 14.5, lineHeight: 1.55, marginTop: 8 }}>{f.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Wrap>
    </section>
  );
}

export default function StripeEvolve() {
  const [mode, setMode] = useState<Mode>("evolved");
  const [grad, setGrad] = useState<Grad>("violet");
  const g = GRADIENTS[grad];
  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <div style={{ position: "sticky", top: 0, zIndex: 60, background: "oklch(98.8% 0.003 106.5 / 0.85)", backdropFilter: "saturate(180%) blur(12px)", borderBottom: `1px solid ${tokens.hairline}` }}>
        <Wrap style={{ paddingBlock: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ display: "inline-flex", padding: 3, gap: 3, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, borderRadius: 10 }}>
              {(["restrained", "evolved"] as Mode[]).map((m) => {
                const on = m === mode;
                return (
                  <button key={m} type="button" onClick={() => setMode(m)} style={{ fontFamily: FONT, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "6px 14px", borderRadius: 7, border: `1px solid ${on ? tokens.hairlineStrong : "transparent"}`, background: on ? tokens.card : "transparent", color: on ? tokens.ink : tokens.muted, textTransform: "capitalize" }}>{m}</button>
                );
              })}
            </div>
            {mode === "evolved" && (
              <div style={{ display: "inline-flex", padding: 3, gap: 3, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, borderRadius: 10 }}>
                {(Object.keys(GRADIENTS) as Grad[]).map((k) => {
                  const on = k === grad;
                  return (
                    <button key={k} type="button" onClick={() => setGrad(k)} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: FONT, fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "6px 13px", borderRadius: 7, border: `1px solid ${on ? tokens.hairlineStrong : "transparent"}`, background: on ? tokens.card : "transparent", color: on ? tokens.ink : tokens.muted }}>
                      <span aria-hidden style={{ width: 12, height: 12, borderRadius: 999, backgroundImage: GRADIENTS[k].arc }} />
                      {GRADIENTS[k].label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <span style={{ fontFamily: MONO, fontSize: 11, color: tokens.muted }}>
            {mode === "evolved" ? `${g.label} gradient · cool 2nd accent · tinted shadows · 10px radii` : "olive + one GridRed · no gradients · 18px radii"}
          </span>
        </Wrap>
      </div>

      <div className="hidden lg:contents"><GlobalHeader /></div>
      <Hero mode={mode} g={g} />
      <Features mode={mode} g={g} />
    </div>
  );
}
