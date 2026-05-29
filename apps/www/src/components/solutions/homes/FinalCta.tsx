import { useState } from "react";
import { useMegamenuTheme } from "../../../routes/_preview/_v3-tokens";

export default function FinalCta() {
  const { tokens } = useMegamenuTheme();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");
  const [bill, setBill] = useState("");

  const inputStyle = {
    border: `1px solid ${tokens.hairline}`,
    borderRadius: 10,
    padding: "13px 16px",
    background: "transparent",
    color: tokens.ink,
    fontSize: 15,
    fontWeight: 500,
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s ease",
  };

  return (
    <section
      style={{
        background: tokens.pageBgDeep,
        borderTop: `1px solid ${tokens.hairline}`,
      }}
    >
      <div
        className="mx-auto max-w-[1280px]"
        style={{ padding: "128px 32px" }}
      >
        {/* Centered content */}
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* Kicker */}
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
              ONE SITE VISIT · ZERO OBLIGATION
            </span>
          </div>

          {/* Headline */}
          <h2
            style={{
              color: tokens.ink,
              fontSize: "clamp(32px, 4vw, 52px)",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Book a survey. We'll be there in 48 hours.
          </h2>

          {/* Supporting line */}
          <p
            style={{
              color: tokens.body,
              fontSize: 16,
              lineHeight: 1.65,
              maxWidth: "54ch",
              marginBottom: 48,
            }}
          >
            We send one of our 14 trained surveyors to your home, measure your
            load profile, and quote you a real number. Not a brochure number.
          </p>

          {/* Form */}
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 12,
              marginBottom: 12,
            }}
            className="cta-form-grid"
          >
            {/* Name */}
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  tokens.hairlineStrong)
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  tokens.hairline)
              }
            />

            {/* Phone with +91 prefix */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${tokens.hairline}`,
                borderRadius: 10,
                overflow: "hidden",
                transition: "border-color 0.2s ease",
              }}
              className="phone-input-wrapper"
            >
              <span
                style={{
                  padding: "13px 14px",
                  color: tokens.muted,
                  fontSize: 14,
                  fontWeight: 600,
                  borderRight: `1px solid ${tokens.hairline}`,
                  flexShrink: 0,
                  background: tokens.pageBg,
                }}
              >
                +91
              </span>
              <input
                type="tel"
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  padding: "13px 14px",
                  color: tokens.ink,
                  fontSize: 15,
                  fontWeight: 500,
                  width: "100%",
                }}
              />
            </div>

            {/* Pincode */}
            <input
              type="number"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              style={inputStyle}
              onFocus={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  tokens.hairlineStrong)
              }
              onBlur={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  tokens.hairline)
              }
            />

            {/* Monthly bill */}
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
                  padding: "13px 14px",
                  color: tokens.muted,
                  fontSize: 14,
                  fontWeight: 600,
                  borderRight: `1px solid ${tokens.hairline}`,
                  flexShrink: 0,
                  background: tokens.pageBg,
                }}
              >
                ₹
              </span>
              <input
                type="number"
                placeholder="Monthly bill"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  padding: "13px 14px",
                  color: tokens.ink,
                  fontSize: 15,
                  fontWeight: 500,
                  width: "100%",
                  fontVariantNumeric: "tabular-nums",
                }}
              />
            </div>
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            style={{
              background: tokens.brand,
              color: "white",
              border: "none",
              borderRadius: 12,
              padding: "16px 36px",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.2s ease",
              marginBottom: 20,
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                tokens.brandHover)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = tokens.brand)
            }
          >
            Book my survey →
          </button>

          {/* Microcopy */}
          <p
            style={{
              color: tokens.muted,
              fontSize: 12,
              lineHeight: 1.6,
              maxWidth: "48ch",
              marginBottom: 40,
            }}
          >
            We'll call you within 24 hours. If we don't, your survey is on us —
            refunded if you book. (We don't.)
          </p>

          {/* Hairline divider */}
          <div
            style={{
              width: "100%",
              borderTop: `1px solid ${tokens.hairline}`,
              marginBottom: 24,
            }}
          />

          {/* Contact row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {[
              { label: "+91 98765 43210", href: "tel:+919876543210" },
              { label: "hello@gridpower.co.in", href: "mailto:hello@gridpower.co.in" },
              { label: "Book on calendar", href: "#calendar" },
            ].map((contact) => (
              <a
                key={contact.href}
                href={contact.href}
                style={{
                  color: tokens.ink,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = tokens.brand)
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = tokens.ink)
                }
              >
                {contact.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cta-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
