import { Plus } from "@phosphor-icons/react";
import { useMegamenuTheme } from "../../../routes/_preview/_v3-tokens";

const FAQS = [
  {
    q: "What's the warranty on the battery?",
    a: "10-year warranty on cells, 5-year on the inverter, and lifetime software updates. Hardware defects are covered door-to-door — we pick up, repair, return.",
  },
  {
    q: "How long does install take?",
    a: "Standard install: 1 day for an apartment, 2 days for a small or large home, 3 days for a solar combo. Site survey happens first and we confirm the timeline then.",
  },
  {
    q: "What happens if I move?",
    a: "The battery cabinet is wall-mounted and serviceable. We de-install and re-install at your new address for ₹35,000 + transport. Most customers find the payback math still works at the new property.",
  },
  {
    q: "Can I add solar later?",
    a: "Yes. Every install is solar-ready. Adding solar later means panels plus a charge controller — we handle both. No re-doing the battery side.",
  },
  {
    q: "What if the grid permanently goes off?",
    a: "The battery isolates from the grid and runs home essentials — lights, fans, fridge, Wi-Fi — for 8–24 hours depending on capacity. A solar combo extends this indefinitely on sunny days.",
  },
  {
    q: "Do I need permission from BESCOM or MSEDCL?",
    a: "Not for storage-only installs. For solar combos: yes, net-metering paperwork is required — but we handle that end-to-end. You sign, we file.",
  },
  {
    q: "What's the monthly upkeep?",
    a: "Zero, beyond a quarterly remote software check we push over the air. Hardware is sealed and maintenance-free. No annual service contracts.",
  },
  {
    q: "What if you go out of business?",
    a: "GridOS runs on open standards — Modbus, OCPP, MQTT. Any competent installer can service the hardware without our software. Your data exports in standard formats. We've built deliberately against lock-in.",
  },
  {
    q: "How does the monitoring app work?",
    a: "Free for life. iOS, Android, and web. Shows real-time state-of-charge, grid status, solar output, historical trends, and alerts if anything's off. No subscription fee ever.",
  },
  {
    q: "What's the noise like?",
    a: "The inverter fan runs at ~35dB at peak load — quieter than a fridge. The battery itself is completely silent. Most customers forget it's there.",
  },
  {
    q: "Why is payback faster than the 'industry average' shows?",
    a: "Most installer quotes assume flat tariffs. We model your actual peak-hour usage profile — which is when your bill really hits. Real ROI is consistently faster than the flat-rate spreadsheet number people quote online.",
  },
];

export default function Faq() {
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
        {/* 2-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: 64,
            alignItems: "start",
          }}
          className="faq-grid"
        >
          {/* Left: kicker + headline + subtext */}
          <div style={{ position: "sticky", top: 32 }}>
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
                BEFORE YOU ASK
              </span>
            </div>
            <h2
              style={{
                color: tokens.ink,
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                maxWidth: "16ch",
                marginBottom: 20,
              }}
            >
              Eleven questions we get every survey.
            </h2>
            <p
              style={{
                color: tokens.muted,
                fontSize: 14,
                lineHeight: 1.65,
              }}
            >
              If your question isn't here, the site survey is free and we'd
              rather answer it then.
            </p>
          </div>

          {/* Right: accordion */}
          <div>
            {FAQS.map((faq, i) => (
              <details
                key={faq.q}
                style={{
                  borderTop: `1px solid ${tokens.hairline}`,
                }}
                className="faq-details"
              >
                <summary
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "20px 0",
                    cursor: "pointer",
                    listStyle: "none",
                    color: tokens.ink,
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: 1.4,
                  }}
                >
                  <span>{faq.q}</span>
                  <span
                    className="faq-icon"
                    aria-hidden
                    style={{
                      flexShrink: 0,
                      color: tokens.muted,
                      display: "inline-flex",
                      transition: "transform 0.2s ease",
                    }}
                  >
                    <Plus size={16} weight="bold" />
                  </span>
                </summary>
                <p
                  style={{
                    color: tokens.muted,
                    fontSize: 14,
                    lineHeight: 1.7,
                    paddingBottom: 24,
                    paddingRight: 32,
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
            {/* Final hairline border at bottom */}
            <div style={{ borderTop: `1px solid ${tokens.hairline}` }} />
          </div>
        </div>
      </div>

      <style>{`
        .faq-details summary::-webkit-details-marker { display: none; }
        .faq-details summary::marker { display: none; }
        .faq-details[open] .faq-icon {
          transform: rotate(45deg);
        }
        @media (max-width: 768px) {
          .faq-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .faq-grid > div:first-child {
            position: static !important;
          }
        }
      `}</style>
    </section>
  );
}
