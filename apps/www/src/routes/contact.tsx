import { useState, type CSSProperties } from "react";
import type { MetaFunction } from "react-router";
import { CheckCircle, MapPin, EnvelopeSimple, Phone, Clock } from "@phosphor-icons/react";
import { tokens } from "../routes/_preview/_v3-tokens";
import { Container, Kicker, Gated, Reveal } from "../components/marketing/Primitives";

export const meta: MetaFunction = () => [
  { title: "Contact — GridEnergy" },
  { name: "description", content: "Book a free site survey, request a quote, or talk to the GridEnergy team." },
];

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";

const ENQUIRY_TYPES = [
  { key: "survey", label: "Book a site survey" },
  { key: "quote", label: "Get a quote" },
  { key: "partner", label: "Partner enquiry" },
  { key: "support", label: "Support" },
] as const;

const HOME_TYPES = ["Apartment / flat", "Small home", "Large home / villa", "Other / not sure"];

const NEXT_STEPS = [
  { title: "We review your enquiry", body: "A GridEnergy advisor reads your details and reaches out to understand your load and goals." },
  { title: "Free site survey", body: "We assess your connection, load, roof, and backup needs — on site or remotely." },
  { title: "Custom proposal", body: "You get a sized system, the economics, and a clear quote. No obligation." },
  { title: "Install and onboarding", body: "Authorised install, commissioning, and GridOS app setup." },
];

export default function ContactPage() {
  const [type, setType] = useState<string>("survey");
  const [submitted, setSubmitted] = useState(false);

  return (
    <main style={{ fontFamily: FONT, background: tokens.pageBg }}>
      {/* Header */}
      <section style={{ background: tokens.pageBgDeep, borderBottom: `1px solid ${tokens.hairline}`, paddingTop: 80, paddingBottom: 56 }}>
        <Container>
          <div style={{ maxWidth: 720 }}>
            <Kicker>Contact</Kicker>
            <h1 style={{ fontFamily: '"Clash Grotesk", Inter, ui-sans-serif, system-ui, sans-serif', color: tokens.ink, fontSize: "clamp(34px,5vw,56px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.02, marginTop: 18 }}>
              Tell us about your site. We'll size the rest.
            </h1>
            <p style={{ color: tokens.muted, fontSize: 18, lineHeight: 1.55, marginTop: 18, maxWidth: 560 }}>
              Book a free site survey or request a quote. No call required to qualify — share your details and an advisor takes it from there.
            </p>
          </div>
        </Container>
      </section>

      {/* Body: form + sidebar */}
      <section style={{ paddingBlock: 72 }}>
        <Container>
          <div className="lg:grid-cols-[1.3fr_1fr]" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 56, alignItems: "start" }}>
            {/* Form card */}
            <Reveal>
              <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 20, padding: "32px 32px 36px", boxShadow: "0 24px 60px -40px oklch(15.3% 0.006 107.1 / 0.4)" }}>
                {submitted ? (
                  <div style={{ textAlign: "center", paddingBlock: 48 }}>
                    <CheckCircle size={48} weight="fill" color={tokens.brand} />
                    <h2 style={{ color: tokens.ink, fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em", marginTop: 16 }}>
                      Thanks — we've got it.
                    </h2>
                    <p style={{ color: tokens.muted, fontSize: 15, lineHeight: 1.6, marginTop: 10, maxWidth: 380, marginInline: "auto" }}>
                      An advisor will reach out shortly. In the meantime, explore the range or read how GridOS works.
                    </p>
                    <p style={{ marginTop: 16 }}>
                      <Gated note="wire form to Cloudflare Worker + D1 lead store on EC2 backend">
                        <span style={{ fontSize: 12, color: tokens.body }}>Form is not yet connected to the lead backend</span>
                      </Gated>
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                  >
                    {/* Enquiry type */}
                    <FieldLabel>What can we help with?</FieldLabel>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
                      {ENQUIRY_TYPES.map((t) => {
                        const active = type === t.key;
                        return (
                          <button
                            key={t.key}
                            type="button"
                            onClick={() => setType(t.key)}
                            style={{
                              fontFamily: FONT,
                              fontSize: 13,
                              fontWeight: 600,
                              padding: "9px 15px",
                              borderRadius: 999,
                              cursor: "pointer",
                              border: `1px solid ${active ? tokens.brand : tokens.hairlineStrong}`,
                              background: active ? tokens.brand : tokens.card,
                              color: active ? "#fff" : tokens.body,
                              transition: "all 0.15s ease",
                            }}
                          >
                            {t.label}
                          </button>
                        );
                      })}
                    </div>

                    <div className="sm:grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }}>
                      <Field label="Full name" name="name" placeholder="Your name" required />
                      <Field label="Phone / WhatsApp" name="phone" placeholder="+91" required />
                      <Field label="Email" name="email" type="email" placeholder="you@email.com" />
                      <Field label="City" name="city" placeholder="e.g. Goa" />
                    </div>

                    {(type === "survey" || type === "quote") && (
                      <div style={{ marginTop: 16 }}>
                        <FieldLabel>Home / site type</FieldLabel>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                          {HOME_TYPES.map((h) => (
                            <label
                              key={h}
                              style={{
                                fontSize: 13,
                                color: tokens.body,
                                border: `1px solid ${tokens.hairline}`,
                                borderRadius: 10,
                                padding: "8px 12px",
                                cursor: "pointer",
                                background: tokens.pageBg,
                              }}
                            >
                              <input type="radio" name="hometype" value={h} style={{ marginRight: 7, accentColor: tokens.brand }} />
                              {h}
                            </label>
                          ))}
                        </div>
                      </div>
                    )}

                    <div style={{ marginTop: 16 }}>
                      <FieldLabel>Anything else? (optional)</FieldLabel>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Current backup setup, rough monthly bill, solar status, what you want to solve…"
                        style={{ ...inputStyle, resize: "vertical", minHeight: 96 }}
                      />
                    </div>

                    <button
                      type="submit"
                      style={{
                        marginTop: 24,
                        width: "100%",
                        background: tokens.brand,
                        color: "#fff",
                        fontFamily: FONT,
                        fontSize: 15,
                        fontWeight: 600,
                        padding: "15px 24px",
                        borderRadius: 14,
                        border: "none",
                        cursor: "pointer",
                        transition: "background 0.15s ease",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brand)}
                    >
                      {type === "support" ? "Send support request" : type === "partner" ? "Send partner enquiry" : "Book free site survey"}
                    </button>
                    <p style={{ fontSize: 12, color: tokens.muted, marginTop: 12, textAlign: "center" }}>
                      No spam. We use your details only to respond to this enquiry.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>

            {/* Sidebar */}
            <Reveal delay={0.08}>
              <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                {/* What happens next */}
                <div>
                  <Kicker>What happens next</Kicker>
                  <ol style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 18, listStyle: "none", padding: 0 }}>
                    {NEXT_STEPS.map((s, i) => (
                      <li key={s.title} style={{ display: "flex", gap: 14 }}>
                        <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 999, background: tokens.ink, color: "#fff", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700 }}>
                          {i + 1}
                        </span>
                        <div>
                          <p style={{ color: tokens.ink, fontSize: 15, fontWeight: 600 }}>{s.title}</p>
                          <p style={{ color: tokens.muted, fontSize: 13.5, lineHeight: 1.5, marginTop: 3 }}>{s.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Contact details — gated */}
                <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 16, padding: 22 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: tokens.inkMuted, marginBottom: 14 }}>
                    Reach us directly
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <ContactLine icon={Phone} label="Phone / WhatsApp">
                      <Gated note="add real phone number">+91 XXXXX XXXXX</Gated>
                    </ContactLine>
                    <ContactLine icon={EnvelopeSimple} label="Email">
                      <Gated note="confirm support inbox">hello@gridenergy.co.in</Gated>
                    </ContactLine>
                    <ContactLine icon={MapPin} label="Office">
                      <Gated note="add registered address">Verna, Goa — full address TBD</Gated>
                    </ContactLine>
                    <ContactLine icon={Clock} label="Hours">
                      <Gated note="confirm support hours">Mon–Sat, hours TBD</Gated>
                    </ContactLine>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </main>
  );
}

/* ---------- form field helpers ---------- */

const inputStyle: CSSProperties = {
  width: "100%",
  fontFamily: FONT,
  fontSize: 14,
  color: tokens.ink,
  background: tokens.pageBg,
  border: `1px solid ${tokens.hairlineStrong}`,
  borderRadius: 11,
  padding: "11px 13px",
  outline: "none",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: tokens.ink, marginBottom: 8 }}>
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <FieldLabel>
        {label}
        {required && <span style={{ color: tokens.brand, marginLeft: 3 }}>*</span>}
      </FieldLabel>
      <input type={type} name={name} placeholder={placeholder} required={required} style={inputStyle} />
    </div>
  );
}

function ContactLine({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ flexShrink: 0, width: 34, height: 34, borderRadius: 9, background: tokens.pageBgDeep, border: `1px solid ${tokens.hairline}`, display: "grid", placeItems: "center" }}>
        <Icon size={16} weight="duotone" color={tokens.ink} />
      </span>
      <div>
        <p style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: tokens.muted }}>{label}</p>
        <div style={{ fontSize: 13.5, color: tokens.body, marginTop: 2 }}>{children}</div>
      </div>
    </div>
  );
}
