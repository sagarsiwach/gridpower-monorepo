/*
  /configure — the GridEnergy Configurator. The site's showpiece conversion page.

  A guided sizer, not an instant-price machine. We have no sourced numbers, so
  this NEVER fabricates price, payback, or kWh. It collects qualitative answers
  (property type, rough backup need, solar status, location + contact), then
  recommends a PRODUCT CLASS — Nano / Micro / Mega / Giga — from simple rules,
  and routes everyone to a free site survey where real sizing and economics get
  confirmed.

  The look borrows the SF Compute technique (atmospheric painterly gradient field
  with a frosted form floating on it) translated to GridEnergy's identity: warm
  olive deepening toward a dim near-dusk olive-charcoal, with GridRed bleeding in
  as the single warm glow — the last warm light before a power cut. CSS-only
  clouds, one slow drift, and a reduced-motion static fallback that still reads.
  The frosted card is the one place glassmorphism is sanctioned here.

  Visuals are inline style={{ tokens.* }}, never Tailwind utilities. Inter only.
*/

import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight, ArrowLeft, Lightning, House, Buildings, ForkKnife,
  GraduationCap, Factory, Lightbulb, HouseLine, ShieldCheck, SunHorizon,
  CalendarBlank, Check, MapPin, Phone, EnvelopeSimple, User, CaretRight,
  type Icon,
} from "@phosphor-icons/react";
import type { MetaFunction } from "react-router";

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';
const EASE = [0.22, 1, 0.36, 1] as const;

/* The field deepens to a near-dusk olive-charcoal. These are the dark-mode olive
   ink values, used as raw colors so the field is self-contained regardless of
   the light tokens the rest of the page uses. */
const DUSK = "oklch(15.3% 0.006 107.1)";       // olive-950
const DUSK_DEEP = "oklch(10% 0.006 107.1)";    // deeper than olive-950
const OLIVE_WARM = "oklch(34% 0.030 106.8)";   // warm mid olive (the lit haze)
const OLIVE_DIM = "oklch(20% 0.014 107.2)";    // dim olive (between warm and dusk)
const BRAND = "oklch(0.58 0.245 27)";          // GridRed
const BRAND_HOVER = "oklch(0.50 0.245 27)";

/* On-field ink — warm near-white, AA on the dusk field and the frosted panel. */
const FIELD_INK = "oklch(98.8% 0.003 106.5)";          // near-white
const FIELD_SUB = "oklch(86% 0.012 106.6)";            // bright olive, AA body
const FIELD_FAINT = "oklch(72% 0.020 106.9)";          // dimmer label, still legible

export const meta: MetaFunction = () => [
  { title: "Configure your backup — GridEnergy" },
  {
    name: "description",
    content:
      "Answer four quick questions and we will point you to the right GridEnergy class. Exact sizing, economics, and subsidies are confirmed at a free site survey.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sizing model — qualitative in, product class out. No numbers.     */
/* ------------------------------------------------------------------ */

type PropertyKey = "home" | "office" | "hospitality" | "institute" | "enterprise";
type BackupKey = "essentials" | "whole" | "critical";
type SolarKey = "yes" | "no" | "planned";
type ProductKey = "Nano" | "Micro" | "Mega" | "Giga";

type Choice<K extends string> = { key: K; label: string; sub: string; icon: Icon };

const PROPERTIES: Choice<PropertyKey>[] = [
  { key: "home", label: "Home", sub: "A flat, house, or villa", icon: House },
  { key: "office", label: "Office", sub: "A workplace or commercial floor", icon: Buildings },
  { key: "hospitality", label: "Hospitality", sub: "A hotel, resort, or restaurant", icon: ForkKnife },
  { key: "institute", label: "Institute", sub: "A school, clinic, or campus", icon: GraduationCap },
  { key: "enterprise", label: "Enterprise", sub: "A factory, warehouse, or site", icon: Factory },
];

const BACKUPS: Choice<BackupKey>[] = [
  { key: "essentials", label: "Just the essentials", sub: "Lights, fans, routers, a few key loads", icon: Lightbulb },
  { key: "whole", label: "The whole property", sub: "Everything running, ACs included", icon: HouseLine },
  { key: "critical", label: "A critical load", sub: "Equipment that must never go dark", icon: ShieldCheck },
];

const SOLARS: Choice<SolarKey>[] = [
  { key: "yes", label: "Yes, already installed", sub: "Rooftop or ground-mount solar today", icon: SunHorizon },
  { key: "no", label: "No solar", sub: "Grid and backup only for now", icon: Lightning },
  { key: "planned", label: "Planned", sub: "Considering solar alongside storage", icon: CalendarBlank },
];

/*
  Rules (deliberately simple, fully qualitative):
  Each property type sets a base class. Backup need nudges it up or down a step,
  and a critical load floors at the resilient Mega tier. Result is one of four
  classes, never a number. Owner confirms true sizing at survey.

    home        -> base Nano
    office      -> base Micro
    hospitality -> base Mega
    institute   -> base Mega
    enterprise  -> base Giga

    backup "essentials" -> one step down (min Nano)
    backup "whole"      -> one step up
    backup "critical"   -> floor at Mega (never under-spec a must-stay-on load)
*/
const ORDER: ProductKey[] = ["Nano", "Micro", "Mega", "Giga"];
const BASE: Record<PropertyKey, number> = {
  home: 0, office: 1, hospitality: 2, institute: 2, enterprise: 3,
};

function recommend(property: PropertyKey, backup: BackupKey): ProductKey {
  let idx = BASE[property];
  if (backup === "essentials") idx -= 1;
  if (backup === "whole") idx += 1;
  idx = Math.max(0, Math.min(ORDER.length - 1, idx));
  if (backup === "critical") idx = Math.max(idx, 2); // floor at Mega
  return ORDER[idx]!;
}

const PRODUCT_BLURB: Record<ProductKey, string> = {
  Nano: "Our most compact class. Wall-mounted, silent, sized for a flat or a small home keeping its essentials and a room cool through every cut.",
  Micro: "A step up in capacity for a larger home or a small workplace that wants more loads, longer, with the same silent LFP system.",
  Mega: "Built for properties that need real resilience: hospitality, institutes, and critical loads that simply cannot go dark.",
  Giga: "Our largest class, for enterprise sites and heavy loads where backup, peak savings, and uptime are part of the operation.",
};

const PRODUCT_NOTE: Record<ProductKey, string> = {
  Nano: "Apartments and small homes",
  Micro: "Large homes and small offices",
  Mega: "Hospitality, institutes, critical loads",
  Giga: "Enterprise sites and heavy loads",
};

/* ------------------------------------------------------------------ */
/*  Atmospheric field — CSS-only clouds, one slow drift                */
/* ------------------------------------------------------------------ */

function AtmosphericField({ reduce }: { reduce: boolean }) {
  // Two overlapping cloud layers + a GridRed glow, plus a fine grain. The whole
  // field must look great frozen, so the drift is a gentle, optional sweetener.
  const layerA: CSSProperties = {
    position: "absolute",
    inset: "-20%",
    background: [
      `radial-gradient(60% 55% at 22% 18%, ${OLIVE_WARM} 0%, transparent 60%)`,
      `radial-gradient(50% 50% at 80% 30%, ${OLIVE_DIM} 0%, transparent 62%)`,
      `radial-gradient(70% 60% at 60% 88%, ${OLIVE_DIM} 0%, transparent 58%)`,
    ].join(","),
    filter: "blur(8px)",
  };
  const layerB: CSSProperties = {
    position: "absolute",
    inset: "-25%",
    background: [
      // GridRed glow source, low and to one side: the last warm light.
      `radial-gradient(45% 40% at 88% 78%, oklch(0.58 0.245 27 / 0.34) 0%, transparent 60%)`,
      `radial-gradient(38% 34% at 12% 70%, oklch(0.58 0.245 27 / 0.14) 0%, transparent 64%)`,
      `radial-gradient(55% 50% at 50% 10%, ${OLIVE_WARM} 0%, transparent 70%)`,
    ].join(","),
    filter: "blur(10px)",
    mixBlendMode: "screen",
  };

  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", background: `linear-gradient(160deg, ${DUSK} 0%, ${OLIVE_DIM} 42%, ${DUSK_DEEP} 100%)` }}>
      {reduce ? (
        <>
          <div style={layerA} />
          <div style={layerB} />
        </>
      ) : (
        <>
          <motion.div
            style={layerA}
            animate={{ transform: ["translate3d(0,0,0)", "translate3d(2.5%,-1.5%,0)", "translate3d(0,0,0)"] }}
            transition={{ duration: 34, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div
            style={layerB}
            animate={{ transform: ["translate3d(0,0,0)", "translate3d(-2%,2%,0)", "translate3d(0,0,0)"] }}
            transition={{ duration: 46, ease: "easeInOut", repeat: Infinity }}
          />
        </>
      )}
      {/* fine grain to kill banding and add the painterly texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.05,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* vignette to settle the edges toward dusk */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 120% at 50% 30%, transparent 40%, ${DUSK_DEEP} 100%)` }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Small UI atoms scoped to this page (frosted-surface contrast safe) */
/* ------------------------------------------------------------------ */

const STEPS = ["Property", "Backup", "Solar", "You"] as const;

function StepRail({ step }: { step: number }) {
  return (
    <ol style={{ display: "flex", alignItems: "center", gap: 0, listStyle: "none", margin: 0, padding: 0, flexWrap: "wrap" }}>
      {STEPS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        return (
          <li key={label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span
                aria-hidden
                style={{
                  display: "grid", placeItems: "center", width: 22, height: 22, borderRadius: 999,
                  fontFamily: MONO, fontSize: 11, fontWeight: 600,
                  background: done ? BRAND : active ? "rgba(255,255,255,0.16)" : "transparent",
                  border: `1px solid ${done ? BRAND : active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.22)"}`,
                  color: done ? "#fff" : active ? FIELD_INK : FIELD_FAINT,
                }}
              >
                {done ? <Check size={12} weight="bold" /> : i + 1}
              </span>
              <span style={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 600, color: active ? FIELD_INK : done ? FIELD_SUB : FIELD_FAINT }}>
                {label}
              </span>
            </span>
            {i < STEPS.length - 1 && (
              <span aria-hidden style={{ width: 22, height: 1, marginInline: 12, background: done ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.16)" }} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function StepHead({ kicker, title, sub }: { kicker: string; title: string; sub: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: BRAND }}>
        <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: BRAND }} />
        {kicker}
      </span>
      <h2 style={{ fontFamily: FONT, color: FIELD_INK, fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08, marginTop: 12, textWrap: "balance" }}>
        {title}
      </h2>
      <p style={{ color: FIELD_SUB, fontSize: 15, lineHeight: 1.55, marginTop: 8, maxWidth: "52ch" }}>{sub}</p>
    </div>
  );
}

function OptionCard<K extends string>({ choice, selected, onSelect }: { choice: Choice<K>; selected: boolean; onSelect: () => void }) {
  const [h, setH] = useState(false);
  const Ico = choice.icon;
  const lit = selected || h;
  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      aria-pressed={selected}
      style={{
        display: "flex", alignItems: "flex-start", gap: 14, width: "100%", textAlign: "left", cursor: "pointer",
        padding: "16px 18px", borderRadius: 14,
        background: selected ? "rgba(255,255,255,0.14)" : lit ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${selected ? BRAND : lit ? "rgba(255,255,255,0.42)" : "rgba(255,255,255,0.18)"}`,
        boxShadow: selected ? `0 0 0 1px ${BRAND}, 0 16px 40px -28px oklch(0.58 0.245 27 / 0.7)` : "none",
        transition: "background .15s ease, border-color .15s ease, box-shadow .2s ease, transform .15s ease",
        transform: lit ? "translateY(-1px)" : "none",
      }}
    >
      <span style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 11, background: selected ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)", border: `1px solid ${selected ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.16)"}` }}>
        <Ico size={20} weight={selected ? "fill" : "duotone"} color={selected ? "#fff" : FIELD_INK} />
      </span>
      <span style={{ flex: 1, minWidth: 0 }}>
        <span style={{ display: "block", fontFamily: FONT, fontSize: 16, fontWeight: 600, color: FIELD_INK, letterSpacing: "-0.01em" }}>{choice.label}</span>
        <span style={{ display: "block", fontSize: 13.5, lineHeight: 1.45, color: FIELD_SUB, marginTop: 3 }}>{choice.sub}</span>
      </span>
      <span aria-hidden style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 20, height: 20, borderRadius: 999, marginTop: 2, background: selected ? BRAND : "transparent", border: `1px solid ${selected ? BRAND : "rgba(255,255,255,0.3)"}` }}>
        {selected && <Check size={11} weight="bold" color="#fff" />}
      </span>
    </button>
  );
}

const FIELD_STYLE: CSSProperties = {
  width: "100%", fontFamily: FONT, fontSize: 15, color: FIELD_INK,
  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.22)",
  borderRadius: 11, padding: "13px 14px 13px 42px", outline: "none",
};

function Field({ icon: Ico, label, type = "text", value, onChange, placeholder, autoComplete, inputMode }: {
  icon: Icon; label: string; type?: string; value: string; onChange: (v: string) => void;
  placeholder: string; autoComplete?: string; inputMode?: "text" | "tel" | "email";
}) {
  const [f, setF] = useState(false);
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontFamily: FONT, fontSize: 13, fontWeight: 600, color: FIELD_SUB, marginBottom: 7 }}>{label}</span>
      <span style={{ position: "relative", display: "block" }}>
        <span aria-hidden style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", display: "grid", placeItems: "center", pointerEvents: "none" }}>
          <Ico size={16} weight="bold" color={f ? "#fff" : FIELD_FAINT} />
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onFocus={() => setF(true)}
          onBlur={() => setF(false)}
          style={{ ...FIELD_STYLE, borderColor: f ? BRAND : "rgba(255,255,255,0.22)", boxShadow: f ? `0 0 0 1px ${BRAND}` : "none", background: f ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.07)" }}
        />
      </span>
    </label>
  );
}

function NavBtn({ onClick, kind, disabled, children }: { onClick: () => void; kind: "primary" | "ghost"; disabled?: boolean; children: ReactNode }) {
  const [h, setH] = useState(false);
  const base: CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 14, fontWeight: 600,
    borderRadius: 12, padding: "12px 20px", cursor: disabled ? "not-allowed" : "pointer", border: "1px solid transparent",
    transition: "background .16s ease, border-color .16s ease, transform .16s ease, opacity .16s ease",
    transform: h && !disabled ? "translateY(-1px)" : "none", opacity: disabled ? 0.45 : 1,
  };
  const style: CSSProperties = kind === "primary"
    ? { ...base, background: h && !disabled ? BRAND_HOVER : BRAND, color: "#fff", boxShadow: disabled ? "none" : "0 12px 30px -16px oklch(0.58 0.245 27 / 0.8)" }
    : { ...base, background: "transparent", color: FIELD_SUB, borderColor: "rgba(255,255,255,0.24)" };
  return (
    <button type="button" onClick={disabled ? undefined : onClick} disabled={disabled} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={style}>
      {children}
    </button>
  );
}

function SurveyCTA({ to, children }: { to: string; children: ReactNode }) {
  const [h, setH] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 15, fontWeight: 600,
        borderRadius: 13, padding: "15px 26px", textDecoration: "none", cursor: "pointer",
        background: h ? BRAND_HOVER : BRAND, color: "#fff",
        boxShadow: "0 16px 40px -18px oklch(0.58 0.245 27 / 0.85)",
        transition: "background .16s ease, transform .16s ease", transform: h ? "translateY(-1px)" : "none",
      }}
    >
      <Lightning size={15} weight="fill" />
      {children}
      <ArrowRight size={14} weight="bold" style={{ transform: h ? "translateX(2px)" : "none", transition: "transform .16s ease" }} />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Configure() {
  const reduce = useReducedMotion() ?? false;
  const [step, setStep] = useState(0); // 0..3 questions, 4 = result
  const [property, setProperty] = useState<PropertyKey | null>(null);
  const [backup, setBackup] = useState<BackupKey | null>(null);
  const [solar, setSolar] = useState<SolarKey | null>(null);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const product = useMemo(
    () => (property && backup ? recommend(property, backup) : null),
    [property, backup],
  );

  const canAdvance =
    (step === 0 && !!property) ||
    (step === 1 && !!backup) ||
    (step === 2 && !!solar) ||
    (step === 3 && name.trim().length > 1 && contact.trim().length > 4);

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));
  const restart = () => {
    setStep(0);
    setProperty(null); setBackup(null); setSolar(null);
    setLocation(""); setName(""); setContact("");
  };

  const fade = reduce
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.4, ease: EASE } };

  return (
    <div style={{ fontFamily: FONT, position: "relative", minHeight: "calc(100svh - 108px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "64px 24px 88px", overflow: "hidden" }}>
      <AtmosphericField reduce={reduce} />

      <div style={{ position: "relative", width: "100%", maxWidth: 1040, display: "grid", gap: 40, gridTemplateColumns: "1fr", alignItems: "center" }}>
        {/* intro copy — sits above the field, not on the frosted panel */}
        <div style={{ maxWidth: 640 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: BRAND }}>
            <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: BRAND }} />
            Configurator
          </span>
          <h1 style={{ fontFamily: FONT, color: FIELD_INK, fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1.02, marginTop: 16, textWrap: "balance" }}>
            Find the right backup for your property.
          </h1>
          <p style={{ color: FIELD_SUB, fontSize: 17, lineHeight: 1.6, marginTop: 16, maxWidth: "54ch" }}>
            Four quick questions. We point you to the right GridEnergy class, then confirm the exact sizing, economics, and subsidies at a free site survey.
          </p>
        </div>

        {/* frosted form card — the one sanctioned glass surface */}
        <div
          style={{
            position: "relative",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(28, 26, 22, 0.42)",
            backdropFilter: "blur(22px) saturate(135%)",
            WebkitBackdropFilter: "blur(22px) saturate(135%)",
            boxShadow: "0 1px 0 0 rgba(255,255,255,0.12) inset, 0 40px 100px -40px rgba(0,0,0,0.7)",
            padding: "clamp(24px, 4vw, 40px)",
            overflow: "hidden",
          }}
        >
          {/* subtle top sheen */}
          <div aria-hidden style={{ position: "absolute", inset: 0, borderRadius: 24, background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 22%)", pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            {step < 4 && (
              <div style={{ marginBottom: 28 }}>
                <StepRail step={step} />
              </div>
            )}

            {/* steps */}
            {step === 0 && (
              <motion.div key="s0" {...fade}>
                <StepHead kicker="Step 1 of 4" title="What are we powering?" sub="Pick the closest match. It sets the starting point for your recommended class." />
                <div style={{ display: "grid", gap: 12 }}>
                  {PROPERTIES.map((c) => (
                    <OptionCard key={c.key} choice={c} selected={property === c.key} onSelect={() => { setProperty(c.key); }} />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="s1" {...fade}>
                <StepHead kicker="Step 2 of 4" title="How much should it back up?" sub="A rough sense is enough. We confirm exactly what runs, and for how long, at the survey." />
                <div style={{ display: "grid", gap: 12 }}>
                  {BACKUPS.map((c) => (
                    <OptionCard key={c.key} choice={c} selected={backup === c.key} onSelect={() => { setBackup(c.key); }} />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" {...fade}>
                <StepHead kicker="Step 3 of 4" title="Do you have solar?" sub="Storage works on its own, and makes solar far more valuable when it is there." />
                <div style={{ display: "grid", gap: 12 }}>
                  {SOLARS.map((c) => (
                    <OptionCard key={c.key} choice={c} selected={solar === c.key} onSelect={() => { setSolar(c.key); }} />
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" {...fade}>
                <StepHead kicker="Step 4 of 4" title="Where, and who do we reach?" sub="Your city helps us read your tariff and supply context. We use your contact only to set up the survey." />
                <div style={{ display: "grid", gap: 16 }}>
                  <Field icon={MapPin} label="City or area" value={location} onChange={setLocation} placeholder="e.g. Panaji, Goa" autoComplete="address-level2" />
                  <Field icon={User} label="Your name" value={name} onChange={setName} placeholder="Full name" autoComplete="name" />
                  <Field icon={contact.includes("@") ? EnvelopeSimple : Phone} label="Phone or email" value={contact} onChange={setContact} placeholder="Phone number or email" autoComplete="tel" inputMode="tel" />
                </div>
              </motion.div>
            )}

            {step === 4 && product && (
              <motion.div key="s4" {...fade}>
                <ResultPanel
                  product={product}
                  property={property}
                  backup={backup}
                  solar={solar}
                  name={name}
                  reduce={reduce}
                  onRestart={restart}
                />
              </motion.div>
            )}

            {/* nav */}
            {step < 4 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 28, paddingTop: 22, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
                {step > 0 ? (
                  <NavBtn kind="ghost" onClick={back}>
                    <ArrowLeft size={14} weight="bold" /> Back
                  </NavBtn>
                ) : (
                  <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em", color: FIELD_FAINT }}>NO COMMITMENT</span>
                )}
                <NavBtn kind="primary" onClick={next} disabled={!canAdvance}>
                  {step === 3 ? "See my recommendation" : "Continue"}
                  <ArrowRight size={14} weight="bold" />
                </NavBtn>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Result panel — a recommended class, no numbers, survey CTA         */
/* ------------------------------------------------------------------ */

function ResultPanel({ product, property, backup, solar, name, reduce, onRestart }: {
  product: ProductKey; property: PropertyKey | null; backup: BackupKey | null; solar: SolarKey | null;
  name: string; reduce: boolean; onRestart: () => void;
}) {
  const propLabel = PROPERTIES.find((p) => p.key === property)?.label ?? "property";
  const backupLabel = BACKUPS.find((b) => b.key === backup)?.label ?? "backup";
  const solarLabel = SOLARS.find((s) => s.key === solar)?.label ?? "solar";
  const first = name.trim().split(/\s+/)[0];

  return (
    <div>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 11, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: BRAND }}>
        <span aria-hidden style={{ width: 6, height: 6, borderRadius: 999, background: BRAND }} />
        Your recommendation
      </span>
      <h2 style={{ fontFamily: FONT, color: FIELD_INK, fontSize: "clamp(22px, 2.8vw, 28px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.1, marginTop: 12 }}>
        {first ? `${first}, we would start you on` : "We would start you on"}
      </h2>

      {/* the product class — the single loud moment */}
      <div
        style={{
          position: "relative", marginTop: 18, borderRadius: 18, overflow: "hidden",
          background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 100%)",
          border: `1px solid ${BRAND}`,
          boxShadow: `0 0 0 1px ${BRAND}, 0 24px 60px -32px oklch(0.58 0.245 27 / 0.8)`,
          padding: "24px 26px",
        }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 120% at 100% 0%, oklch(0.58 0.245 27 / 0.32) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 18, flexWrap: "wrap" }}>
          <span style={{ display: "grid", placeItems: "center", width: 56, height: 56, borderRadius: 14, background: BRAND, boxShadow: "0 12px 28px -12px oklch(0.58 0.245 27 / 0.9)", flexShrink: 0 }}>
            <Lightning size={28} weight="fill" color="#fff" />
          </span>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontFamily: FONT, fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, color: FIELD_INK, letterSpacing: "-0.03em" }}>{product}</span>
              <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: FIELD_SUB }}>{PRODUCT_NOTE[product]}</span>
            </div>
            <p style={{ color: FIELD_SUB, fontSize: 15, lineHeight: 1.55, marginTop: 8, maxWidth: "48ch" }}>{PRODUCT_BLURB[product]}</p>
          </div>
        </div>

        {/* the class ladder, so the choice reads in context */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 6, marginTop: 20, flexWrap: "wrap" }}>
          {ORDER.map((p, i) => {
            const on = p === product;
            return (
              <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontFamily: FONT, fontSize: 12.5, fontWeight: 600, padding: "5px 11px", borderRadius: 999, color: on ? "#fff" : FIELD_FAINT, background: on ? BRAND : "rgba(255,255,255,0.06)", border: `1px solid ${on ? BRAND : "rgba(255,255,255,0.16)"}` }}>{p}</span>
                {i < ORDER.length - 1 && <CaretRight size={11} weight="bold" color={FIELD_FAINT} />}
              </span>
            );
          })}
        </div>
      </div>

      {/* what we heard */}
      <div style={{ marginTop: 18, display: "grid", gap: 8, gridTemplateColumns: "1fr", padding: "16px 18px", borderRadius: 14, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.16)" }}>
        <Echo label="Property" value={propLabel} />
        <Echo label="Backup" value={backupLabel} />
        <Echo label="Solar" value={solarLabel} />
      </div>

      {/* the honest line — what stays gated until survey */}
      <p style={{ color: FIELD_SUB, fontSize: 14.5, lineHeight: 1.6, marginTop: 18, maxWidth: "58ch" }}>
        This is a starting point, not a quote. We confirm exact sizing, economics, and any subsidies you qualify for at a free site survey, with no obligation.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, marginTop: 22 }}>
        <SurveyCTA to="/contact">Book my site survey</SurveyCTA>
        <NavBtn kind="ghost" onClick={onRestart}>
          <ArrowLeft size={14} weight="bold" /> Start over
        </NavBtn>
      </div>

      {/* reassurance row */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.12)" }}>
        {["Free, no-obligation survey", "Sized to your real load and tariff", "Managed by GridOS"].map((t) => (
          <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 7, fontFamily: FONT, fontSize: 13, color: FIELD_SUB }}>
            <span aria-hidden style={{ display: "grid", placeItems: "center", width: 17, height: 17, borderRadius: 999, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)" }}>
              <Check size={10} weight="bold" color={BRAND} />
            </span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Echo({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", textTransform: "uppercase", color: FIELD_FAINT }}>{label}</span>
      <span style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: FIELD_INK, textAlign: "right" }}>{value}</span>
    </div>
  );
}
