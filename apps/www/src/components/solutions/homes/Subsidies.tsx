import { useMegamenuTheme } from "../../../routes/_preview/_v3-tokens";

const SUBSIDY_CARDS = [
  {
    kicker: "PM Surya Ghar Yojana",
    amount: "Up to ₹78,000",
    body: "Solar + battery combo. Eligibility: residential rooftop only.",
    footnote: "Disbursed directly to your account post-install.",
  },
  {
    kicker: "State Subsidies",
    amount: "₹15K – ₹40K",
    body: "Karnataka, Maharashtra, Delhi, TN offer additional top-ups.",
    footnote: "Eligibility varies. We track current rates per state.",
  },
  {
    kicker: "GST Benefit",
    amount: "5% GST",
    body: "Storage hardware at 5% vs 18% on standard appliances.",
    footnote: "Built into our pricing. No surprise on your invoice.",
  },
];

// Approximate EMI calc helper (flat-rate simplified)
function emi(principal: number, annualRate: number, months: number): string {
  const r = annualRate / 100 / 12;
  const m =
    (principal * r * Math.pow(1 + r, months)) /
    (Math.pow(1 + r, months) - 1);
  return m.toLocaleString("en-IN", { maximumFractionDigits: 0 });
}

const BASE_PRINCIPAL = 1280000; // small home as reference

const EMI_OPTIONS = [
  { tenure: "24 months", rate: 8.9, months: 24 },
  { tenure: "36 months", rate: 9.4, months: 36 },
  { tenure: "60 months", rate: 10.2, months: 60 },
];

export default function Subsidies() {
  const { tokens } = useMegamenuTheme();

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
              WHAT THE GOVERNMENT GIVES BACK
            </span>
          </div>
          <h2
            style={{
              color: tokens.ink,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: "32ch",
            }}
          >
            ₹78,000 to ₹1.2L in subsidies. Up to 5-year EMI options. We'll
            handle the paperwork.
          </h2>
        </div>

        {/* Block A — Subsidy cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 24,
          }}
          className="subsidy-card-grid"
        >
          {SUBSIDY_CARDS.map((card, i) => (
            <div
              key={card.kicker}
              style={{
                padding: "32px 28px",
                borderLeft:
                  i > 0 ? `1px solid ${tokens.hairline}` : undefined,
              }}
            >
              <p
                className="text-[11px] uppercase tracking-[0.14em]"
                style={{
                  color: tokens.muted,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                {card.kicker}
              </p>
              <p
                style={{
                  color: tokens.brand,
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                  marginBottom: 10,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {card.amount}
              </p>
              <p
                style={{
                  color: tokens.body,
                  fontSize: 14,
                  lineHeight: 1.55,
                  marginBottom: 10,
                }}
              >
                {card.body}
              </p>
              <p
                style={{
                  color: tokens.muted,
                  fontSize: 12,
                  lineHeight: 1.5,
                }}
              >
                {card.footnote}
              </p>
            </div>
          ))}
        </div>

        {/* Block B — Financing */}
        <div
          style={{
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {/* Header row */}
          <div
            style={{
              padding: "20px 28px",
              borderBottom: `1px solid ${tokens.hairline}`,
            }}
          >
            <p
              className="text-[11px] uppercase tracking-[0.14em]"
              style={{ color: tokens.muted, fontWeight: 700 }}
            >
              Financing options · Based on ₹{(BASE_PRINCIPAL / 100000).toFixed(1)}L
              reference cost
            </p>
          </div>

          {/* EMI grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
            className="emi-grid"
          >
            {EMI_OPTIONS.map((opt, i) => (
              <div
                key={opt.tenure}
                style={{
                  padding: "28px 28px",
                  borderLeft:
                    i > 0 ? `1px solid ${tokens.hairline}` : undefined,
                }}
              >
                <p
                  style={{
                    color: tokens.ink,
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    marginBottom: 4,
                  }}
                >
                  {opt.tenure}
                </p>
                <p
                  style={{
                    color: tokens.muted,
                    fontSize: 12,
                    fontWeight: 500,
                    marginBottom: 14,
                  }}
                >
                  {opt.rate}% interest p.a.
                </p>
                <p
                  style={{
                    color: tokens.ink,
                    fontSize: 24,
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  ₹{emi(BASE_PRINCIPAL, opt.rate, opt.months)}
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: tokens.muted,
                      marginLeft: 4,
                    }}
                  >
                    /mo
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* Partner banks footer */}
          <div
            style={{
              padding: "16px 28px",
              borderTop: `1px solid ${tokens.hairline}`,
            }}
          >
            <p
              style={{
                color: tokens.muted,
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              Partner banks: HDFC · Axis · ICICI · Bajaj Finserv
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .subsidy-card-grid {
            grid-template-columns: 1fr !important;
          }
          .subsidy-card-grid > div + div {
            border-left: none !important;
            border-top: 1px solid;
          }
          .emi-grid {
            grid-template-columns: 1fr !important;
          }
          .emi-grid > div + div {
            border-left: none !important;
            border-top: 1px solid;
          }
        }
      `}</style>
    </section>
  );
}
