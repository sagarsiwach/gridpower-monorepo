import { useMegamenuTheme } from "../../../routes/_preview/_v3-tokens";

export default function CaseStudy() {
  const { tokens } = useMegamenuTheme();

  return (
    <section
      style={{
        background: tokens.pageBgDeep,
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
              REAL INSTALL · BANGALORE
            </span>
          </div>
          <h2
            style={{
              color: tokens.ink,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: "30ch",
            }}
          >
            Mr. Iyer cut his BESCOM bill by 64% in month two.
          </h2>
        </div>

        {/* 2-column asymmetric grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: 32,
            alignItems: "start",
          }}
          className="case-study-grid"
        >
          {/* Left: image placeholder */}
          <div
            style={{
              background: tokens.card,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 20,
              aspectRatio: "16/10",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className="text-[11px] uppercase tracking-[0.16em]"
              style={{ color: tokens.muted, fontWeight: 700 }}
            >
              Photo coming
            </span>
          </div>

          {/* Right: story content */}
          <div
            style={{
              background: tokens.card,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 20,
              padding: "36px 36px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 0,
            }}
          >
            {/* Blockquote with 1px hairline left border */}
            <blockquote
              style={{
                borderLeft: `1px solid ${tokens.hairlineStrong}`,
                paddingLeft: 20,
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  color: tokens.ink,
                  fontSize: 17,
                  fontWeight: 500,
                  lineHeight: 1.6,
                  fontStyle: "italic",
                  marginBottom: 12,
                }}
              >
                "We stopped flinching every time BESCOM raised tariffs. The
                battery just absorbs the peak. I haven't thought about the bill
                in 4 months."
              </p>
              <p
                style={{
                  color: tokens.muted,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                — Suresh Iyer · Whitefield, Bangalore · 3 BHK · Installed Feb
                2026
              </p>
            </blockquote>

            {/* Hairline divider */}
            <div
              style={{
                borderTop: `1px solid ${tokens.hairline}`,
                marginBottom: 0,
              }}
            />

            {/* 3-stat row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
              className="case-stat-grid"
            >
              {[
                { label: "Before bill", value: "₹11,200", sub: "per month" },
                { label: "After bill", value: "₹4,050", sub: "per month" },
                {
                  label: "Payback achieved",
                  value: "22 mo",
                  sub: "revised from 28",
                },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    padding: "24px 20px",
                    borderLeft:
                      i > 0 ? `1px solid ${tokens.hairline}` : undefined,
                  }}
                >
                  <p
                    className="text-[11px] uppercase tracking-[0.14em]"
                    style={{
                      color: tokens.muted,
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      color: tokens.ink,
                      fontSize: 28,
                      fontWeight: 700,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                      fontVariantNumeric: "tabular-nums",
                      marginBottom: 4,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      color: tokens.muted,
                      fontSize: 12,
                    }}
                  >
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>

            {/* Hairline divider */}
            <div style={{ borderTop: `1px solid ${tokens.hairline}` }} />

            {/* CTA link */}
            <div style={{ padding: "20px 20px 4px" }}>
              <a
                href="#"
                style={{
                  color: tokens.ink,
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = tokens.brand)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = tokens.ink)
                }
              >
                Read full case study →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .case-study-grid {
            grid-template-columns: 1fr !important;
          }
          .case-stat-grid {
            grid-template-columns: 1fr !important;
          }
          .case-stat-grid > div + div {
            border-left: none !important;
            border-top: 1px solid;
          }
        }
      `}</style>
    </section>
  );
}
