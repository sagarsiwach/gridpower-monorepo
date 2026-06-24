import { useState } from "react";
import { useMegamenuTheme } from "../../../routes/_preview/_v3-tokens";

type Archetype = "apartment" | "small" | "large" | "solar";

const ARCHETYPES: { key: Archetype; label: string }[] = [
  { key: "apartment", label: "Apartment" },
  { key: "small", label: "Small" },
  { key: "large", label: "Large" },
  { key: "solar", label: "Solar combo" },
];

const STATES = [
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "Tamil Nadu",
  "Gujarat",
  "Other",
];

function formatINR(n: number): string {
  return n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

export default function RoiCalculator() {
  const { tokens } = useMegamenuTheme();

  const [bill, setBill] = useState("6000");
  const [archetype, setArchetype] = useState<Archetype>("apartment");
  const [state, setState] = useState("Karnataka");
  const [solarKw, setSolarKw] = useState("5");
  const [computed, setComputed] = useState(false);

  const monthlyBill = parseInt(bill) || 6000;
  const monthlySaved = Math.round(monthlyBill * 0.42);
  const stackCost =
    archetype === "apartment"
      ? 640000
      : archetype === "small"
        ? 1280000
        : archetype === "large"
          ? 2650000
          : 1820000;
  const paybackMonths = Math.round((stackCost / (monthlySaved * 12)) * 12);
  const tenYearSavings = monthlySaved * 12 * 10 - stackCost;

  return (
    <section
      style={{
        background: tokens.pageBg,
        borderTop: `1px solid ${tokens.hairline}`,
        borderBottom: `1px solid ${tokens.hairline}`,
      }}
    >
      <div className="mx-auto max-w-[1280px]" style={{ padding: "128px 32px" }}>
        {/* Kicker + headline */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-4">
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: 999,
                background: tokens.brand,
                display: "inline-block",
              }}
            />
            <span
              className="text-[11px] uppercase tracking-[0.18em]"
              style={{ color: tokens.brand, fontWeight: 700 }}
            >
              RUN YOUR NUMBERS
            </span>
          </div>
          <h2
            style={{
              color: tokens.ink,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: "28ch",
            }}
          >
            Math is the headline. Punch in your bill, see what you save.
          </h2>
        </div>

        {/* 2-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: 24,
            alignItems: "start",
          }}
          className="flex-col-mobile"
        >
          {/* Left: inputs */}
          <div
            style={{
              background: tokens.card,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 20,
              padding: "36px 36px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 28,
            }}
          >
            {/* Monthly bill */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                className="text-[11px] uppercase tracking-[0.14em]"
                style={{ color: tokens.muted, fontWeight: 700 }}
              >
                Monthly electricity bill
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  border: `1px solid ${tokens.hairline}`,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    padding: "12px 14px",
                    background: tokens.pageBgDeep,
                    borderRight: `1px solid ${tokens.hairline}`,
                    color: tokens.muted,
                    fontSize: 14,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  ₹
                </span>
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  placeholder="6000"
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    padding: "12px 14px",
                    color: tokens.ink,
                    fontSize: 15,
                    fontWeight: 500,
                    width: "100%",
                    fontVariantNumeric: "tabular-nums",
                  }}
                />
              </div>
              <span
                className="text-[12px]"
                style={{ color: tokens.muted }}
              >
                Typical: ₹2,000 – ₹40,000/mo
              </span>
            </div>

            {/* Home archetype */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                className="text-[11px] uppercase tracking-[0.14em]"
                style={{ color: tokens.muted, fontWeight: 700 }}
              >
                Home archetype
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  border: `1px solid ${tokens.hairline}`,
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                {ARCHETYPES.map((a, i) => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => setArchetype(a.key)}
                    style={{
                      padding: "10px 8px",
                      background:
                        archetype === a.key ? tokens.ink : "transparent",
                      color:
                        archetype === a.key ? tokens.pageBg : tokens.body,
                      border: "none",
                      borderLeft:
                        i > 0 ? `1px solid ${tokens.hairline}` : undefined,
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: archetype === a.key ? 700 : 500,
                      transition: "background 0.2s ease, color 0.2s ease",
                    }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            {/* State */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label
                className="text-[11px] uppercase tracking-[0.14em]"
                style={{ color: tokens.muted, fontWeight: 700 }}
              >
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                style={{
                  border: `1px solid ${tokens.hairline}`,
                  borderRadius: 10,
                  padding: "12px 14px",
                  background: "transparent",
                  color: tokens.ink,
                  fontSize: 14,
                  fontWeight: 500,
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Solar kW — only if solar combo */}
            {archetype === "solar" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label
                  className="text-[11px] uppercase tracking-[0.14em]"
                  style={{ color: tokens.muted, fontWeight: 700 }}
                >
                  Solar capacity (kW)
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: `1px solid ${tokens.hairline}`,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <input
                    type="number"
                    value={solarKw}
                    onChange={(e) => setSolarKw(e.target.value)}
                    placeholder="5"
                    min="1"
                    max="20"
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      padding: "12px 14px",
                      color: tokens.ink,
                      fontSize: 15,
                      fontWeight: 500,
                      width: "100%",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  />
                  <span
                    style={{
                      padding: "12px 14px",
                      background: tokens.pageBgDeep,
                      borderLeft: `1px solid ${tokens.hairline}`,
                      color: tokens.muted,
                      fontSize: 14,
                      fontWeight: 600,
                      flexShrink: 0,
                    }}
                  >
                    kW
                  </span>
                </div>
              </div>
            )}

            {/* CTA button */}
            <button
              type="button"
              onClick={() => setComputed(true)}
              style={{
                background: tokens.brand,
                color: "white",
                border: "none",
                borderRadius: 12,
                padding: "14px 20px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "background 0.2s ease",
                marginTop: 4,
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  tokens.brandHover)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  tokens.brand)
              }
            >
              Estimate my payback
            </button>
          </div>

          {/* Right: output panel */}
          <div
            style={{
              background: tokens.card,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 20,
              padding: "36px 32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {/* Big payback number */}
            <p
              className="text-[11px] uppercase tracking-[0.14em]"
              style={{ color: tokens.brand, fontWeight: 700, marginBottom: 12 }}
            >
              Est. payback period
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  color: tokens.ink,
                  fontSize: "clamp(52px, 6vw, 72px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {computed ? paybackMonths : "—"}
              </span>
              <span
                style={{
                  color: tokens.muted,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                {computed ? "mo" : ""}
              </span>
            </div>

            {/* Stat rows */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                {
                  label: "Monthly savings",
                  value: computed ? `₹${formatINR(monthlySaved)}` : "—",
                },
                {
                  label: "10-year net savings",
                  value: computed
                    ? tenYearSavings > 0
                      ? `₹${formatINR(tenYearSavings)}`
                      : `–₹${formatINR(Math.abs(tenYearSavings))}`
                    : "—",
                },
                {
                  label: "Indicative stack cost",
                  value: `₹${formatINR(stackCost)}`,
                },
              ].map((row, i) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    borderTop: i === 0 ? "none" : `1px solid ${tokens.hairline}`,
                  }}
                >
                  <span
                    style={{ color: tokens.muted, fontSize: 13, fontWeight: 500 }}
                  >
                    {row.label}
                  </span>
                  <span
                    style={{
                      color: tokens.ink,
                      fontSize: 14,
                      fontWeight: 600,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Hairline divider */}
            <div
              style={{
                borderTop: `1px solid ${tokens.hairline}`,
                marginTop: 16,
                paddingTop: 16,
              }}
            >
              <p
                style={{
                  color: tokens.muted,
                  fontSize: 12,
                  lineHeight: 1.55,
                  marginBottom: 16,
                }}
              >
                Numbers indicative. Real survey gives exact ROI based on your
                usage pattern.
              </p>
              <button
                type="button"
                style={{
                  background: "transparent",
                  color: tokens.ink,
                  border: `1px solid ${tokens.hairline}`,
                  borderRadius: 10,
                  padding: "10px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  cursor: "pointer",
                  transition: "border-color 0.2s ease",
                  width: "100%",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    tokens.hairlineStrong)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.borderColor =
                    tokens.hairline)
                }
              >
                Talk to an expert
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .flex-col-mobile {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
