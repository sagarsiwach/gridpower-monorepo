import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Lightning,
  Pulse,
  Plugs,
  ShieldCheck,
} from "@phosphor-icons/react";

import { Logo } from "../../Logo";
import { tokens } from "../../../routes/_preview/_v3-tokens";

/* ============================================================
   HeroA — Variant A · operator confidence
   ------------------------------------------------------------
   A 100vh hero for /solutions/homes/ that manifests as a live
   operator dashboard. Strategy: numbers first, type-led, dense
   inside, generous between groups. No imagery. Inter only.
   Motion is purposeful: the rupee figure tick-counts on mount,
   the sparkline draws + pulses at the cursor, the ticker tape
   advances, status dots cycle. Honors prefers-reduced-motion.
   ============================================================ */

/* ------------------------------------------------------------
   Tiny utilities (no deps)
   ------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function formatInr(n: number) {
  // Indian grouping: 12,34,567
  const s = Math.round(n).toString();
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${grouped},${last3}`;
}

/* ------------------------------------------------------------
   Tick-counter for the main rupee number
   ------------------------------------------------------------ */

function useTickCounter(
  target: number,
  durationMs: number,
  enabled: boolean,
) {
  const [value, setValue] = useState(enabled ? 0 : target);
  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // ease-out-cubic — fast then settle
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (target - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, enabled]);
  return value;
}

/* ------------------------------------------------------------
   Time formatter that updates every minute (IST)
   ------------------------------------------------------------ */

function useIstClock() {
  const [stamp, setStamp] = useState(() => istNow());
  useEffect(() => {
    const id = setInterval(() => setStamp(istNow()), 30_000);
    return () => clearInterval(id);
  }, []);
  return stamp;
}

function istNow() {
  // Force IST regardless of viewer's timezone
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

/* ------------------------------------------------------------
   Demo data (baked in — component takes no props)
   ------------------------------------------------------------ */

const HEADLINE = "Storage that pays itself back.";
const KICKER = "01 · HOMES";
const LEAD =
  "18 to 36 month payback on a typical Indian apartment install. GridOS — the operator console that ships with every battery — shows you meter-true daily numbers, not vendor brochures. The hardware is the foothold. The software is the moat.";

// Sparkline points — 28 days of cumulative payback (INR, simplified)
const PAYBACK_SERIES = [
  18.2, 19.0, 19.4, 20.1, 21.0, 21.6, 22.0, 22.4, 23.0, 23.4, 23.8, 24.2, 24.7,
  25.3, 25.8, 26.0, 26.4, 26.9, 27.4, 27.8, 28.1, 28.4, 28.9, 29.3, 29.8, 30.4,
  30.9, 31.6,
];

const ASSETS: ReadonlyArray<{
  id: string;
  site: string;
  state: "live" | "charging" | "fault" | "idle";
  kwh: string;
}> = [
  { id: "ATLAS · 03", site: "PUNE-02", state: "live", kwh: "82.4%" },
  { id: "Rosa · T2", site: "GOA-04", state: "live", kwh: "94.1%" },
  { id: "FlexCube 500", site: "BLR-01", state: "charging", kwh: "61.0%" },
  { id: "Atlas · 04", site: "DEL-09", state: "live", kwh: "78.2%" },
];

const TICKER_LINES: ReadonlyArray<string> = [
  "PUNE-02 · grid export +14.2 kWh · ₹98.40 banked",
  "GOA-04 · solar peak 4.1 kW · self-consumption 92%",
  "BLR-01 · charging to 80% · ETA 41 min",
  "DEL-09 · fault flag CLEARED · inverter T2 nominal",
  "Tariff window OFF-PEAK · ₹4.20/kWh · 5 sites discharging",
  "Fleet · 0 open faults · 187 sites green · uptime 99.97%",
];

/* ------------------------------------------------------------
   Component
   ------------------------------------------------------------ */

export default function HeroA() {
  const reduced = useReducedMotion();
  const animate = !reduced;

  // Main rupee number — ticks up on mount
  const target = 842310;
  const inr = useTickCounter(target, 1400, animate);

  // Asset status cycling — one row at a time changes "pulse" focus
  const [pulseIdx, bumpPulse] = useReducer((i: number) => (i + 1) % ASSETS.length, 0);
  useEffect(() => {
    if (!animate) return;
    const id = setInterval(bumpPulse, 1800);
    return () => clearInterval(id);
  }, [animate]);

  // Ticker — vertical advance
  const [tickerIdx, bumpTicker] = useReducer(
    (i: number) => (i + 1) % TICKER_LINES.length,
    0,
  );
  useEffect(() => {
    if (!animate) return;
    const id = setInterval(bumpTicker, 2600);
    return () => clearInterval(id);
  }, [animate]);

  const istStamp = useIstClock();

  return (
    <section
      aria-labelledby="hero-a-heading"
      style={{
        minHeight: "100vh",
        background: tokens.pageBg,
        color: tokens.body,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{`
        @property --gp-pulse { syntax: "<number>"; inherits: false; initial-value: 0; }
        .gp-hero ::selection { background: ${tokens.brand}; color: #fff; }
        .gp-hero ::-moz-selection { background: ${tokens.brand}; color: #fff; }

        .gp-hero .gp-spark-path {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: gp-spark-draw 1600ms ${`cubic-bezier(${EASE.join(",")})`} forwards;
        }
        @keyframes gp-spark-draw { to { stroke-dashoffset: 0; } }

        .gp-hero .gp-cursor-pulse {
          animation: gp-cursor 1800ms ease-in-out infinite;
        }
        @keyframes gp-cursor {
          0%, 100% { opacity: 0.55; r: 4; }
          50% { opacity: 1; r: 6; }
        }

        .gp-hero .gp-dot-live {
          animation: gp-dot 2200ms ease-in-out infinite;
        }
        @keyframes gp-dot {
          0%, 100% { box-shadow: 0 0 0 0 ${tokens.accentLine}33; }
          50% { box-shadow: 0 0 0 6px ${tokens.accentLine}00; }
        }

        .gp-hero .gp-brand-dot {
          animation: gp-brand-dot 2800ms ease-in-out infinite;
        }
        @keyframes gp-brand-dot {
          0%, 100% { box-shadow: 0 0 0 0 ${tokens.brand}55; transform: scale(1); }
          50% { box-shadow: 0 0 0 7px ${tokens.brand}00; transform: scale(1.06); }
        }

        .gp-hero .gp-rule {
          position: absolute;
          background-image: linear-gradient(
            to right,
            ${tokens.hairline} 0,
            ${tokens.hairline} 6px,
            transparent 6px,
            transparent 12px
          );
          background-size: 12px 1px;
          background-repeat: repeat-x;
          height: 1px;
        }

        .gp-hero .gp-cta-primary {
          transition: background-color 150ms ease, transform 150ms ease,
            box-shadow 200ms ease;
        }
        .gp-hero .gp-cta-primary:hover {
          background: ${tokens.brandHover};
          transform: translateY(-1px);
          box-shadow: 0 6px 18px -8px ${tokens.brand}aa;
        }
        .gp-hero .gp-cta-primary:active { transform: translateY(0); }

        .gp-hero .gp-cta-ghost {
          transition: gap 150ms ease, color 150ms ease;
          gap: 6px;
        }
        .gp-hero .gp-cta-ghost:hover { gap: 10px; color: ${tokens.brand}; }

        @media (prefers-reduced-motion: reduce) {
          .gp-hero .gp-spark-path,
          .gp-hero .gp-cursor-pulse,
          .gp-hero .gp-dot-live,
          .gp-hero .gp-brand-dot {
            animation: none !important;
          }
        }
      `}</style>

      <BackdropGrid />

      <div
        className="gp-hero"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          zIndex: 1,
        }}
      >
        <HeroNav istStamp={istStamp} animate={animate} />

        <div
          className="mx-auto max-w-[1280px] px-8 w-full"
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
            columnGap: 32,
            rowGap: 28,
            paddingTop: 36,
            paddingBottom: 28,
            alignItems: "start",
          }}
        >
          {/* ── Left: typographic monolith ── */}
          <div
            style={{
              gridColumn: "span 7",
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            <Kicker />

            <h1
              id="hero-a-heading"
              style={{
                margin: 0,
                color: tokens.ink,
                fontWeight: 700,
                fontSize: "clamp(48px, 7.2vw, 92px)",
                lineHeight: 0.92,
                letterSpacing: "-0.04em",
                fontVariationSettings: "'opsz' 32",
              }}
            >
              Storage that{" "}
              <span
                style={{
                  fontWeight: 400,
                  fontStyle: "italic",
                  color: tokens.inkMuted,
                  letterSpacing: "-0.045em",
                }}
              >
                pays itself
              </span>{" "}
              back.
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: 17,
                lineHeight: 1.55,
                color: tokens.body,
                maxWidth: "54ch",
                fontWeight: 400,
              }}
            >
              {LEAD}
            </p>

            <CtaRow />

            <ProofRow />
          </div>

          {/* ── Right: live operator console ── */}
          <div style={{ gridColumn: "span 5" }}>
            <ConsoleCard
              inr={inr}
              istStamp={istStamp}
              pulseIdx={pulseIdx}
              tickerIdx={tickerIdx}
              animate={animate}
            />
          </div>
        </div>

        {/* ── Bottom ticker tape — runs the full width ── */}
        <TickerStrip tickerIdx={tickerIdx} animate={animate} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------
   Backdrop — subtle dot grid in olive-200, helps the dashboard
   feel like it's overlaid on graph paper. Pure CSS, lightweight.
   ------------------------------------------------------------ */

function BackdropGrid() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(${tokens.hairlineStrong} 1px, transparent 1px)`,
        backgroundSize: "28px 28px",
        backgroundPosition: "-14px -14px",
        opacity: 0.32,
        maskImage:
          "radial-gradient(ellipse 80% 60% at 70% 30%, #000 50%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 70% 30%, #000 50%, transparent 85%)",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ------------------------------------------------------------
   Hero-local nav strip — minimal, in-component (no global nav).
   Logo + audience crumb + live IST clock + early-access CTA.
   ------------------------------------------------------------ */

function HeroNav({ istStamp, animate }: { istStamp: string; animate: boolean }) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 2,
        borderBottom: `1px solid ${tokens.hairline}`,
        background: `color-mix(in oklch, ${tokens.pageBg} 92%, transparent)`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="mx-auto max-w-[1280px] px-8"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo variant="gridenergy" size={28} />
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: tokens.ink,
            }}
          >
            GridEnergy
          </span>
          <span
            aria-hidden
            style={{
              width: 1,
              height: 14,
              background: tokens.hairlineStrong,
              marginInline: 4,
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: tokens.inkMuted,
            }}
          >
            Solutions / Homes
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: tokens.inkMuted,
            }}
            aria-label="Fleet status"
          >
            <span
              className={animate ? "gp-dot-live" : undefined}
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: tokens.accentLine,
                display: "inline-block",
              }}
            />
            187 sites live · {istStamp} IST
          </div>

          <a
            href="#waitlist"
            className="gp-cta-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: tokens.brand,
              color: "#fff",
              borderRadius: 999,
              padding: "8px 14px 8px 12px",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <Lightning size={12} weight="fill" />
            Get early access
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------
   Kicker — section label with pulsing GridRed dot
   ------------------------------------------------------------ */

function Kicker() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span
        className="gp-brand-dot"
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: tokens.brand,
          display: "inline-block",
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: tokens.brand,
        }}
      >
        {KICKER}
      </span>
      <span
        aria-hidden
        style={{ width: 1, height: 10, background: tokens.hairlineStrong }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: tokens.inkMuted,
        }}
      >
        Apartments · large homes · solar+storage
      </span>
    </div>
  );
}

/* ------------------------------------------------------------
   CTA row — primary GridRed pill + ghost arrow link + microcopy
   ------------------------------------------------------------ */

function CtaRow() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
        marginTop: 4,
      }}
    >
      <a
        href="#waitlist"
        className="gp-cta-primary"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: tokens.brand,
          color: "#fff",
          borderRadius: 14,
          padding: "14px 22px",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          textDecoration: "none",
        }}
      >
        <Lightning size={14} weight="fill" />
        Get early access
        <ArrowRight size={14} weight="bold" />
      </a>

      <a
        href="#payback"
        className="gp-cta-ghost"
        style={{
          display: "inline-flex",
          alignItems: "center",
          color: tokens.ink,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.04em",
          textDecoration: "underline",
          textUnderlineOffset: 6,
          textDecorationColor: tokens.hairlineStrong,
          textDecorationThickness: 1,
        }}
      >
        See your payback math
        <ArrowRight size={13} weight="bold" />
      </a>

      <span
        aria-hidden
        style={{ width: 1, height: 22, background: tokens.hairlineStrong }}
      />
      <span style={{ fontSize: 12, color: tokens.muted, fontWeight: 500 }}>
        No card. 12 quarterly readings. Self-host GridOS.
      </span>
    </div>
  );
}

/* ------------------------------------------------------------
   Proof row — 4 micro-stats on a hairline-divided rail
   ------------------------------------------------------------ */

function ProofRow() {
  const stats: ReadonlyArray<{
    label: string;
    value: string;
    suffix?: string;
    delta: string;
    icon: React.ReactNode;
  }> = [
    {
      label: "Avg payback",
      value: "26",
      suffix: "mo",
      delta: "vs 48mo industry",
      icon: <Pulse size={11} weight="bold" />,
    },
    {
      label: "On waitlist",
      value: "2,140",
      delta: "+184 this week",
      icon: <ShieldCheck size={11} weight="bold" />,
    },
    {
      label: "Open standards",
      value: "OCPP",
      suffix: "2.0.1",
      delta: "+ Modbus · MQTT v5",
      icon: <Plugs size={11} weight="bold" />,
    },
    {
      label: "GridOS",
      value: "self-host",
      delta: "or run on our infra",
      icon: <Lightning size={11} weight="bold" />,
    },
  ];

  return (
    <div
      role="list"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        borderTop: `1px solid ${tokens.hairline}`,
        paddingTop: 18,
        marginTop: 4,
      }}
    >
      {stats.map((s, i) => (
        <div
          role="listitem"
          key={s.label}
          style={{
            paddingInline: i === 0 ? 0 : 16,
            paddingRight: 16,
            borderLeft: i === 0 ? "none" : `1px solid ${tokens.hairline}`,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: tokens.muted,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <span style={{ color: tokens.brand, display: "inline-flex" }}>
              {s.icon}
            </span>
            {s.label}
          </p>
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: tokens.ink,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {s.value}
            {s.suffix && (
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: tokens.inkMuted,
                  marginLeft: 4,
                  letterSpacing: 0,
                }}
              >
                {s.suffix}
              </span>
            )}
          </p>
          <p
            style={{
              margin: "6px 0 0 0",
              fontSize: 11,
              color: tokens.inkMuted,
              lineHeight: 1.4,
            }}
          >
            {s.delta}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------
   Console card — the live operator dashboard on the right
   ------------------------------------------------------------ */

function ConsoleCard({
  inr,
  istStamp,
  pulseIdx,
  tickerIdx,
  animate,
}: {
  inr: number;
  istStamp: string;
  pulseIdx: number;
  tickerIdx: number;
  animate: boolean;
}) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
      style={{
        background: tokens.card,
        border: `1px solid ${tokens.hairline}`,
        borderRadius: 26,
        padding: 20,
        boxShadow: `0 1px 0 ${tokens.hairline}, 0 30px 60px -40px ${tokens.ink}22`,
      }}
    >
      {/* ── Card toolbar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 12,
          borderBottom: `1px solid ${tokens.hairline}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: 6,
              background: tokens.ink,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
            aria-hidden
          >
            GE
          </span>
          <span style={{ fontSize: 12, fontWeight: 600, color: tokens.ink }}>
            GridOS · ATLAS-03 · Pune-02
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: tokens.muted,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {istStamp} IST
          </span>
          <span
            aria-hidden
            style={{ width: 1, height: 10, background: tokens.hairlineStrong }}
          />
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: tokens.accentLine,
            }}
          >
            <span
              className={animate ? "gp-dot-live" : undefined}
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: tokens.accentLine,
                display: "inline-block",
              }}
            />
            Live
          </span>
        </div>
      </div>

      {/* ── Big number block ── */}
      <div style={{ paddingTop: 16 }}>
        <p
          style={{
            margin: 0,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: tokens.muted,
          }}
        >
          Payback accrued · YTD
        </p>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginTop: 6 }}>
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: tokens.inkMuted,
              letterSpacing: "-0.01em",
            }}
            aria-hidden
          >
            ₹
          </span>
          <span
            aria-label={`${Math.round(inr)} rupees`}
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: tokens.ink,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatInr(inr)}
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 500,
              color: tokens.inkMuted,
              letterSpacing: "-0.01em",
              marginLeft: 2,
            }}
            aria-hidden
          >
            .80
          </span>
        </div>
        <p
          style={{
            margin: "6px 0 0 0",
            fontSize: 12,
            color: tokens.inkMuted,
          }}
        >
          22.6% of ₹37,20,000 cost · on track for{" "}
          <span style={{ color: tokens.ink, fontWeight: 600 }}>month 26</span>
          <span style={{ color: tokens.muted }}> (industry: 48)</span>
        </p>
      </div>

      {/* ── Sparkline ── */}
      <Sparkline animate={animate} />

      {/* ── Asset list ── */}
      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: `1px solid ${tokens.hairline}`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: tokens.muted,
            }}
          >
            Linked assets · 4
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: tokens.inkMuted,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            0 faults · 90d
          </span>
        </div>
        {ASSETS.map((a, i) => (
          <AssetRow
            key={a.id}
            asset={a}
            highlighted={i === pulseIdx && animate}
            first={i === 0}
          />
        ))}
      </div>

      {/* ── Mini ticker inside the card ── */}
      <div
        style={{
          marginTop: 14,
          paddingTop: 10,
          borderTop: `1px solid ${tokens.hairline}`,
          display: "flex",
          alignItems: "center",
          gap: 10,
          overflow: "hidden",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        <span
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: tokens.brand,
            flexShrink: 0,
          }}
        >
          ◉ LIVE FEED
        </span>
        <motion.span
          key={tickerIdx}
          initial={animate ? { y: 6, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.22, ease: EASE }}
          style={{
            fontSize: 11,
            color: tokens.body,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {TICKER_LINES[tickerIdx]}
        </motion.span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------
   Sparkline — SVG path that draws itself, with a pulsing
   "now" cursor at the latest data point.
   ------------------------------------------------------------ */

function Sparkline({ animate }: { animate: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const W = 380;
  const H = 76;
  const PAD_X = 4;
  const PAD_Y = 10;

  const { d, cx, cy } = useMemo(() => {
    const xs = PAYBACK_SERIES.length - 1;
    const min = Math.min(...PAYBACK_SERIES);
    const max = Math.max(...PAYBACK_SERIES);
    const range = max - min || 1;
    const pts: Array<readonly [number, number]> = PAYBACK_SERIES.map((v, i) => {
      const x = PAD_X + (i / xs) * (W - PAD_X * 2);
      const y = H - PAD_Y - ((v - min) / range) * (H - PAD_Y * 2);
      return [x, y] as const;
    });
    const first = pts[0] ?? ([PAD_X, H - PAD_Y] as const);
    // Smooth Catmull-Rom-ish using simple quadratics
    let pathD = `M ${first[0]} ${first[1]}`;
    for (let i = 1; i < pts.length; i++) {
      const cur = pts[i];
      const prev = pts[i - 1];
      if (!cur || !prev) continue;
      const [x, y] = cur;
      const [px, py] = prev;
      const mx = (px + x) / 2;
      pathD += ` Q ${mx} ${py}, ${mx} ${(py + y) / 2} T ${x} ${y}`;
    }
    const last = pts[pts.length - 1] ?? first;
    return { d: pathD, cx: last[0], cy: last[1] };
  }, []);

  return (
    <div style={{ marginTop: 14 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: tokens.muted,
          }}
        >
          ₹ accrued · last 28d
        </span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: tokens.accentLine,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          +₹73,420
          <span style={{ color: tokens.inkMuted, fontWeight: 500 }}> · +9.5%</span>
        </span>
      </div>
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={H}
        role="img"
        aria-label="28-day payback accrual curve, trending up"
        style={{ display: "block" }}
      >
        {/* baseline dashed rule */}
        <line
          x1={0}
          y1={H - PAD_Y}
          x2={W}
          y2={H - PAD_Y}
          stroke={tokens.hairline}
          strokeDasharray="2 4"
        />
        {/* area fill (subtle) */}
        <path
          d={`${d} L ${W - PAD_X} ${H - PAD_Y} L ${PAD_X} ${H - PAD_Y} Z`}
          fill={tokens.brand}
          opacity={0.06}
        />
        {/* main stroke */}
        <path
          className={animate ? "gp-spark-path" : undefined}
          d={d}
          fill="none"
          stroke={tokens.ink}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* now cursor */}
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill={tokens.brand}
          className={animate ? "gp-cursor-pulse" : undefined}
        />
        <line
          x1={cx}
          y1={cy - 2}
          x2={cx}
          y2={H - PAD_Y}
          stroke={tokens.brand}
          strokeWidth={1}
          strokeDasharray="1 3"
          opacity={0.5}
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------
   Single asset row
   ------------------------------------------------------------ */

function AssetRow({
  asset,
  highlighted,
  first,
}: {
  asset: (typeof ASSETS)[number];
  highlighted: boolean;
  first: boolean;
}) {
  const dotColor =
    asset.state === "live"
      ? tokens.accentLine
      : asset.state === "fault"
      ? tokens.brand
      : asset.state === "charging"
      ? tokens.brand
      : tokens.hairlineStrong;

  const valueColor =
    asset.state === "fault"
      ? tokens.brand
      : asset.state === "charging"
      ? tokens.ink
      : tokens.accentLine;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        paddingBlock: 7,
        borderTop: first ? "none" : `1px solid ${tokens.hairline}`,
        transition: "background 200ms ease",
        background: highlighted
          ? `color-mix(in oklch, ${tokens.brand} 4%, transparent)`
          : "transparent",
        borderRadius: 8,
        marginInline: -6,
        paddingInline: 6,
      }}
    >
      <span
        className={asset.state === "live" && highlighted ? "gp-dot-live" : undefined}
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: dotColor,
          flexShrink: 0,
          display: "inline-block",
        }}
      />
      <span
        style={{
          fontSize: 12,
          fontWeight: 600,
          color: tokens.ink,
          flex: 1,
          letterSpacing: "-0.005em",
        }}
      >
        {asset.id}
      </span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: tokens.muted,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {asset.site}
      </span>
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: valueColor,
          fontVariantNumeric: "tabular-nums",
          width: 56,
          textAlign: "right",
          letterSpacing: "-0.01em",
        }}
      >
        {asset.kwh}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------
   Bottom ticker strip — full-width, marquee-style
   ------------------------------------------------------------ */

function TickerStrip({
  tickerIdx,
  animate,
}: {
  tickerIdx: number;
  animate: boolean;
}) {
  // Use 4 visible lines — current + next 3, wrapping
  const visible = Array.from(
    { length: 4 },
    (_, i) => TICKER_LINES[(tickerIdx + i) % TICKER_LINES.length],
  );
  return (
    <div
      style={{
        borderTop: `1px solid ${tokens.hairline}`,
        background: tokens.pageBgDeep,
        position: "relative",
      }}
    >
      <div
        className="mx-auto max-w-[1280px] px-8"
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          alignItems: "center",
          gap: 24,
          height: 44,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: tokens.brand,
          }}
        >
          <span
            className={animate ? "gp-brand-dot" : undefined}
            style={{
              width: 6,
              height: 6,
              borderRadius: 999,
              background: tokens.brand,
              display: "inline-block",
            }}
          />
          GridOS · fleet feed
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontSize: 11,
            color: tokens.inkMuted,
            fontVariantNumeric: "tabular-nums",
            maskImage:
              "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)",
          }}
          aria-live="off"
        >
          {visible.map((line, i) => (
            <motion.span
              key={`${line}-${i}-${tickerIdx}`}
              initial={animate ? { opacity: 0, y: 4 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.24, ease: EASE, delay: i * 0.05 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              <span
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: 999,
                  background: tokens.hairlineStrong,
                }}
              />
              {line}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
