import { type Icon } from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";

export type GridOSFeature = {
  Icon: Icon;
  title: string;
  sub: string;
};

export type GridOSCalloutProps = {
  kicker?: string;
  headline: string;
  lead: string;
  features: GridOSFeature[];
  consoleImage?: string;
};

/*
  GridOSCallout — full-width section for the GridOS platform.
  5/7 text-left / visual-right desktop split.
  Lead side: kicker + headline + 4 feature tiles.
  Visual side: consoleImage or ASCII-style console mockup fallback.
*/
export function GridOSCallout({
  kicker = "PLATFORM · GRIDOS",
  headline,
  lead,
  features,
  consoleImage,
}: GridOSCalloutProps) {
  return (
    <section
      style={{
        background: tokens.ink,
        borderTop: `1px solid oklch(28.6% 0.016 107.4 / 0.4)`,
      }}
    >
      <div
        className="mx-auto max-w-[1280px] px-8 py-20"
        style={{
          display: "grid",
          gridTemplateColumns: "5fr 7fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        {/* — LEFT: text + features — */}
        <div>
          {/* kicker */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 20,
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: tokens.brand,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: tokens.brand,
              }}
            >
              {kicker}
            </span>
          </div>

          {/* headline */}
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
              color: "#ffffff",
              marginBottom: 16,
            }}
          >
            {headline}
          </h2>

          {/* lead */}
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "48ch",
              marginBottom: 32,
            }}
          >
            {lead}
          </p>

          {/* feature items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {features.slice(0, 4).map((feature) => (
              <FeatureRow key={feature.title} feature={feature} />
            ))}
          </div>
        </div>

        {/* — RIGHT: console visual — */}
        <div
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid oklch(46.6% 0.025 107.3 / 0.25)",
            background: "oklch(10% 0.004 107)",
            aspectRatio: "16 / 10",
            display: "flex",
            alignItems: "stretch",
          }}
        >
          {consoleImage ? (
            <img
              src={consoleImage}
              alt="GridOS console"
              style={{ width: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
          ) : (
            <ConsoleMockup />
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gridos-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Feature row — icon tile + title + sub                              */
/* ------------------------------------------------------------------ */

function FeatureRow({ feature }: { feature: GridOSFeature }) {
  const { Icon, title, sub } = feature;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
      {/* icon tile */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: tokens.accentSoft,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={18} weight="duotone" color={tokens.ink} />
      </div>

      {/* text */}
      <div>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            marginBottom: 2,
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: 12,
            fontWeight: 400,
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.5,
          }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ConsoleMockup — ASCII-style placeholder for GridOS screenshot      */
/* ------------------------------------------------------------------ */

const MOCK_LINES = [
  { indent: 0, content: "GridOS · Operator Console v2.1.4", accent: true },
  { indent: 0, content: "─────────────────────────────────────────────", accent: false },
  { indent: 0, content: "SITE     Atlas-07 · Pune-02 Apartment RWA", accent: false },
  { indent: 0, content: "STATUS   NORMAL  ·  7/7 cells online", accent: false },
  { indent: 0, content: "SOC      █████████░  87.4 %", accent: false },
  { indent: 0, content: "LOAD     2.14 kW  ·  grid-tie", accent: false },
  { indent: 0, content: "", accent: false },
  { indent: 0, content: "ECONOMICS ───────────────────────────────────", accent: false },
  { indent: 2, content: "Payback month    26 / 36  target", accent: false },
  { indent: 2, content: "Saved this month ₹ 4,210.80", accent: false },
  { indent: 2, content: "Grid import      142 kWh  ↓ 38 %", accent: false },
  { indent: 0, content: "", accent: false },
  { indent: 0, content: "FAULTS ──────────────────────────────────────", accent: false },
  { indent: 2, content: "Cell-03 temp     39.2 °C  · WARN", fault: true },
  { indent: 2, content: "BMS               OK", accent: false },
  { indent: 0, content: "", accent: false },
  { indent: 0, content: "STANDARDS  OCPP 2.0.1 · Modbus TCP · MQTT v5", accent: false },
  { indent: 0, content: "HOST       self-hosted / atlas-07.local:4010", accent: false },
];

function ConsoleMockup() {
  return (
    <div
      style={{
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        fontSize: 11,
        lineHeight: 1.7,
        color: "oklch(73.7% 0.021 106.9)",
        padding: "20px 24px",
        width: "100%",
        overflowY: "hidden",
      }}
    >
      {/* window chrome */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginBottom: 16,
          alignItems: "center",
        }}
      >
        {["oklch(0.58 0.245 27)", "oklch(0.72 0.18 85)", "oklch(0.65 0.16 145)"].map(
          (color, i) => (
            <span
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: color,
                opacity: i === 0 ? 1 : 0.4,
              }}
            />
          )
        )}
        <span
          style={{
            marginLeft: 8,
            fontSize: 10,
            color: "oklch(46.6% 0.025 107.3)",
            letterSpacing: "0.06em",
          }}
        >
          gridos-console — ssh atlas-07
        </span>
      </div>

      {MOCK_LINES.map((line, i) => (
        <div
          key={i}
          style={{
            paddingLeft: line.indent * 16,
            color:
              (line as { fault?: boolean }).fault
                ? tokens.brand
                : line.accent
                ? "#ffffff"
                : undefined,
            opacity: (line as { fault?: boolean }).fault ? 1 : line.accent ? 0.9 : 0.65,
          }}
        >
          {line.content || " "}
        </div>
      ))}

      {/* blinking cursor */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 2 }}>
        <span style={{ color: tokens.brand, opacity: 0.8 }}>$ </span>
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 14,
            background: tokens.brand,
            marginLeft: 4,
            opacity: 0.9,
            animation: "cursor-blink 1.1s step-end infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes cursor-blink {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cursor-blink { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
