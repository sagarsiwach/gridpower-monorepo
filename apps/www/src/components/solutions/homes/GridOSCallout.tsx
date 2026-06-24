import { useMegamenuTheme } from "../../../routes/_preview/_v3-tokens";

const FEATURES = [
  {
    kicker: "REAL-TIME MONITORING",
    body: "Live state-of-charge, grid status, solar output. No 'is the system working?' moments.",
  },
  {
    kicker: "TARIFF OPTIMIZATION",
    body: "Auto-discharges during peak rates. Charges off-peak. You don't think about it.",
  },
  {
    kicker: "OPEN STANDARDS",
    body: "OCPP for EV charging. Modbus for inverter telemetry. MQTT for IoT integration. Lock-in is a tax we don't charge.",
  },
  {
    kicker: "OTA UPDATES",
    body: "New features ship to your hardware over the air. The system you bought in 2026 gets smarter in 2027.",
  },
];

export default function GridOSCallout() {
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
              THE SOFTWARE THE INSTALLER DOESN'T GIVE YOU
            </span>
          </div>
          <h2
            style={{
              color: tokens.ink,
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              maxWidth: "24ch",
            }}
          >
            Your storage isn't a box. It's a managed system.
          </h2>
        </div>

        {/* 2-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "11fr 9fr",
            gap: 32,
            alignItems: "start",
          }}
          className="gridos-grid"
        >
          {/* Left: body content */}
          <div
            style={{
              background: tokens.card,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 20,
              padding: "36px 36px 32px",
            }}
          >
            <p
              style={{
                color: tokens.body,
                fontSize: 16,
                lineHeight: 1.65,
                marginBottom: 32,
              }}
            >
              GridOS is the platform GridPower ships with every install. It runs
              on your hardware, talks to our cloud, and shows up on your phone.
              Most installers walk away after handover. We don't.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {FEATURES.map((feat, i) => (
                <div
                  key={feat.kicker}
                  style={{
                    padding: "20px 0",
                    borderTop:
                      i > 0 ? `1px solid ${tokens.hairline}` : undefined,
                  }}
                >
                  <p
                    className="text-[11px] uppercase tracking-[0.14em]"
                    style={{
                      color: tokens.brand,
                      fontWeight: 700,
                      marginBottom: 6,
                    }}
                  >
                    {feat.kicker}
                  </p>
                  <p
                    style={{
                      color: tokens.body,
                      fontSize: 14,
                      lineHeight: 1.6,
                    }}
                  >
                    {feat.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: console preview placeholder */}
          <div
            style={{
              background: tokens.card,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 20,
              aspectRatio: "4/5",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Faint hairline grid pattern */}
            <svg
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                opacity: 0.35,
              }}
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id="console-grid"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 32 0 L 0 0 0 32"
                    fill="none"
                    stroke={tokens.hairline}
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#console-grid)" />
            </svg>

            <span
              className="text-[11px] uppercase tracking-[0.16em]"
              style={{
                color: tokens.muted,
                fontWeight: 700,
                position: "relative",
              }}
            >
              GridOS Console Preview
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .gridos-grid {
            grid-template-columns: 1fr !important;
          }
          .gridos-grid > div:last-child {
            aspect-ratio: 16/9 !important;
          }
        }
      `}</style>
    </section>
  );
}
