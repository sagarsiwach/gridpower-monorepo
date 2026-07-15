/*
  /contact — Contact and site survey booking page.

  A real, accessible form (name, phone, email, property type, message) with
  client-side validation. No backend lead-submit path exists yet in this repo;
  the form shows an honest "submission backend pending" state rather than
  faking a network call. Assembled in the locked V3 language (olive + GridRed,
  Inter, inline tokens.*) to match homes.tsx.
*/

import { useState, type CSSProperties, type FormEvent } from "react";
import type { MetaFunction } from "react-router";
import {
  EnvelopeSimple,
  Phone,
  MapPin,
  Clock,
  Check,
  Lightning,
  Warning,
} from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import { FONT, MONO } from "../components/solutions/light/atoms";
import {
  Band,
  Wrap,
  Rise,
  Eyebrow,
  H2,
  Lead,
} from "../components/solutions/light/atoms";
import { Gated } from "../components/solutions/light/Modules";

export const meta: MetaFunction = () => [
  { title: "Contact — GridEnergy" },
  {
    name: "description",
    content:
      "Book a free site survey or request a quote. Tell us about your site and an advisor takes it from there.",
  },
];

/* ---- static data ---- */

const ENQUIRY_TYPES = [
  { key: "survey", label: "Book a site survey" },
  { key: "quote", label: "Request a quote" },
  { key: "partner", label: "Partner enquiry" },
  { key: "support", label: "Support request" },
] as const;

type EnquiryKey = (typeof ENQUIRY_TYPES)[number]["key"];

const PROPERTY_TYPES = [
  "Apartment or flat",
  "Small home",
  "Large home or villa",
  "Office or commercial",
  "Industrial or warehouse",
  "Not sure",
];

const NEXT_STEPS = [
  {
    n: "1",
    t: "We review your enquiry",
    b: "An advisor reads your details and reaches out to understand your load and goals.",
  },
  {
    n: "2",
    t: "Free site survey",
    b: "We assess your connection, load, roof, and backup needs on site. No obligation.",
  },
  {
    n: "3",
    t: "Custom proposal",
    b: "A sized system, the honest economics, and a clear quote built around your tariff.",
  },
  {
    n: "4",
    t: "Install and GridOS",
    b: "Authorised install, commissioning, and GridOS app setup on your phone.",
  },
];

/* ---- shared input style ---- */

const inputStyle: CSSProperties = {
  width: "100%",
  fontFamily: FONT,
  fontSize: 14.5,
  color: tokens.ink,
  background: tokens.pageBg,
  border: `1px solid ${tokens.hairlineStrong}`,
  borderRadius: 11,
  padding: "12px 14px",
  outline: "none",
  boxSizing: "border-box",
};

/* ---- form validation ---- */

type FormErrors = Partial<Record<string, string>>;

function validate(data: FormData, enquiryType: EnquiryKey): FormErrors {
  const errors: FormErrors = {};
  const name = (data.get("name") as string | null)?.trim() ?? "";
  const phone = (data.get("phone") as string | null)?.trim() ?? "";
  const email = (data.get("email") as string | null)?.trim() ?? "";
  if (!name) errors.name = "Name is required.";
  if (!phone && !email) {
    errors.phone = "Provide at least a phone number or email so we can reach you.";
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Check the email address format.";
  }
  if (
    (enquiryType === "survey" || enquiryType === "quote") &&
    !data.get("propertytype")
  ) {
    errors.propertytype = "Select a property type so we can size correctly.";
  }
  return errors;
}

/* ---- page ---- */

export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState<EnquiryKey>("survey");
  const [propertyType, setPropertyType] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<"idle" | "pending">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data, enquiryType);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // focus first error field
      const firstKey = Object.keys(errs)[0];
      if (firstKey) {
        const el = form.elements.namedItem(firstKey);
        if (el instanceof HTMLElement) el.focus();
      }
      return;
    }
    setErrors({});
    // No backend lead-submit path exists yet. Show honest pending state.
    setSubmitState("pending");
  }

  return (
    <div style={{ fontFamily: FONT, background: tokens.pageBg }}>
      <main>
        {/* Hero */}
        <section
          style={{
            background: tokens.pageBgDeep,
            borderBottom: `1px solid ${tokens.hairline}`,
            paddingTop: 80,
            paddingBottom: 72,
          }}
        >
          <Wrap>
            <Rise>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 14px",
                  borderRadius: 999,
                  background: tokens.card,
                  border: `1px solid ${tokens.hairline}`,
                  fontSize: 13,
                  fontWeight: 600,
                  color: tokens.body,
                  marginBottom: 20,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: tokens.brand,
                  }}
                />
                Contact
              </div>
            </Rise>
            <Rise delay={0.04}>
              <h1
                style={{
                  fontFamily: FONT,
                  color: tokens.ink,
                  fontSize: "clamp(36px,5vw,58px)",
                  fontWeight: 600,
                  letterSpacing: "-0.035em",
                  lineHeight: 1.02,
                  maxWidth: "22ch",
                  textWrap: "balance",
                }}
              >
                Tell us about your site. We will size the rest.
              </h1>
            </Rise>
            <Rise delay={0.08}>
              <p
                style={{
                  color: tokens.muted,
                  fontSize: 18,
                  lineHeight: 1.55,
                  marginTop: 20,
                  maxWidth: 520,
                }}
              >
                Book a free site survey or request a quote. No call required to qualify — share your details and an advisor takes it from there.
              </p>
            </Rise>
          </Wrap>
        </section>

        {/* Form + sidebar */}
        <Band>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
              gap: 56,
              alignItems: "start",
            }}
          >
            {/* Form card */}
            <Rise>
              <div
                style={{
                  background: tokens.card,
                  border: `1px solid ${tokens.hairline}`,
                  borderRadius: 20,
                  padding: "32px 32px 36px",
                  boxShadow:
                    "0 24px 60px -40px oklch(15.3% 0.006 107.1 / 0.4)",
                }}
              >
                {submitState === "pending" ? (
                  <PendingState />
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    {/* Enquiry type */}
                    <fieldset
                      style={{ border: "none", padding: 0, margin: 0 }}
                    >
                      <legend
                        style={{
                          display: "block",
                          fontSize: 12.5,
                          fontWeight: 600,
                          color: tokens.ink,
                          marginBottom: 10,
                        }}
                      >
                        What can we help with?
                      </legend>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 8,
                          marginBottom: 24,
                        }}
                      >
                        {ENQUIRY_TYPES.map((t) => {
                          const active = enquiryType === t.key;
                          return (
                            <button
                              key={t.key}
                              type="button"
                              aria-pressed={active}
                              onClick={() => {
                                setEnquiryType(t.key);
                                setErrors({});
                              }}
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
                    </fieldset>

                    {/* Name and phone */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                        gap: 16,
                      }}
                    >
                      <FormField
                        id="f-name"
                        label="Full name"
                        name="name"
                        placeholder="Your name"
                        required
                        error={errors.name}
                      />
                      <FormField
                        id="f-phone"
                        label="Phone or WhatsApp"
                        name="phone"
                        type="tel"
                        placeholder="+91"
                        error={errors.phone}
                      />
                    </div>

                    {/* Email */}
                    <div style={{ marginTop: 16 }}>
                      <FormField
                        id="f-email"
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@email.com"
                        error={errors.email}
                      />
                    </div>

                    {/* Property type (survey / quote only) */}
                    {(enquiryType === "survey" ||
                      enquiryType === "quote") && (
                      <fieldset
                        style={{
                          border: "none",
                          padding: 0,
                          margin: "20px 0 0",
                        }}
                      >
                        <legend
                          style={{
                            display: "block",
                            fontSize: 12.5,
                            fontWeight: 600,
                            color: tokens.ink,
                            marginBottom: 10,
                          }}
                        >
                          Property type
                          <span
                            style={{ color: tokens.brand, marginLeft: 3 }}
                            aria-hidden
                          >
                            *
                          </span>
                          <span className="sr-only"> (required)</span>
                        </legend>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 8,
                          }}
                        >
                          {PROPERTY_TYPES.map((pt) => {
                            const active = propertyType === pt;
                            return (
                              <label
                                key={pt}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 7,
                                  fontSize: 13,
                                  color: tokens.body,
                                  border: `1px solid ${active ? tokens.brand : tokens.hairline}`,
                                  borderRadius: 10,
                                  padding: "8px 12px",
                                  cursor: "pointer",
                                  background: active
                                    ? tokens.brandSoft
                                    : tokens.pageBg,
                                  transition: "all 0.15s ease",
                                  fontWeight: active ? 600 : 400,
                                }}
                              >
                                <input
                                  type="radio"
                                  name="propertytype"
                                  value={pt}
                                  checked={active}
                                  onChange={() => {
                                    setPropertyType(pt);
                                    setErrors((prev) => ({
                                      ...prev,
                                      propertytype: undefined,
                                    }));
                                  }}
                                  style={{
                                    accentColor: tokens.brand,
                                    width: 14,
                                    height: 14,
                                  }}
                                />
                                {pt}
                              </label>
                            );
                          })}
                        </div>
                        {errors.propertytype && (
                          <ErrorHint>{errors.propertytype}</ErrorHint>
                        )}
                      </fieldset>
                    )}

                    {/* Message */}
                    <div style={{ marginTop: 20 }}>
                      <label
                        htmlFor="f-message"
                        style={{
                          display: "block",
                          fontSize: 12.5,
                          fontWeight: 600,
                          color: tokens.ink,
                          marginBottom: 8,
                        }}
                      >
                        Anything else?{" "}
                        <span
                          style={{
                            fontWeight: 400,
                            color: tokens.muted,
                          }}
                        >
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="f-message"
                        name="message"
                        rows={4}
                        placeholder="Current backup setup, rough monthly bill, solar status, what you want to solve..."
                        style={{
                          ...inputStyle,
                          resize: "vertical",
                          minHeight: 96,
                        }}
                      />
                    </div>

                    {/* Submit */}
                    <SubmitButton enquiryType={enquiryType} />

                    <p
                      style={{
                        fontSize: 12,
                        color: tokens.muted,
                        marginTop: 12,
                        textAlign: "center",
                      }}
                    >
                      No spam. We use your details only to respond to this
                      enquiry.
                    </p>
                  </form>
                )}
              </div>
            </Rise>

            {/* Sidebar */}
            <Rise delay={0.08}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 32 }}
              >
                {/* What happens next */}
                <div>
                  <Eyebrow>What happens next</Eyebrow>
                  <ol
                    style={{
                      marginTop: 22,
                      display: "flex",
                      flexDirection: "column",
                      gap: 18,
                      listStyle: "none",
                      padding: 0,
                    }}
                  >
                    {NEXT_STEPS.map((s) => (
                      <li
                        key={s.t}
                        style={{ display: "flex", gap: 14 }}
                      >
                        <span
                          style={{
                            flexShrink: 0,
                            width: 28,
                            height: 28,
                            borderRadius: 999,
                            background: tokens.ink,
                            color: "#fff",
                            display: "grid",
                            placeItems: "center",
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          {s.n}
                        </span>
                        <div>
                          <p
                            style={{
                              fontFamily: FONT,
                              color: tokens.ink,
                              fontSize: 15,
                              fontWeight: 600,
                            }}
                          >
                            {s.t}
                          </p>
                          <p
                            style={{
                              color: tokens.muted,
                              fontSize: 13.5,
                              lineHeight: 1.5,
                              marginTop: 3,
                            }}
                          >
                            {s.b}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Direct contact */}
                <div
                  style={{
                    background: tokens.card,
                    border: `1px solid ${tokens.hairline}`,
                    borderRadius: 16,
                    padding: 22,
                  }}
                >
                  <p
                    style={{
                      fontFamily: MONO,
                      fontSize: 10.5,
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: tokens.inkMuted,
                      marginBottom: 16,
                    }}
                  >
                    Reach us directly
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                    }}
                  >
                    <ContactRow icon={Phone} label="Phone / WhatsApp">
                      <Gated note="add real phone number">
                        +91 XXXXX XXXXX
                      </Gated>
                    </ContactRow>
                    <ContactRow icon={EnvelopeSimple} label="Email">
                      <Gated note="confirm support inbox">
                        hello@gridenergy.co.in
                      </Gated>
                    </ContactRow>
                    <ContactRow icon={MapPin} label="Office">
                      <Gated note="add registered address">
                        Goa — full address TBD
                      </Gated>
                    </ContactRow>
                    <ContactRow icon={Clock} label="Hours">
                      <Gated note="confirm support hours">
                        Mon–Sat, hours TBD
                      </Gated>
                    </ContactRow>
                  </div>
                </div>

                {/* Why site survey */}
                <div
                  style={{
                    background: tokens.brandSoft,
                    border: `1px solid oklch(0.90 0.055 27)`,
                    borderRadius: 14,
                    padding: 20,
                  }}
                >
                  <p
                    style={{
                      fontFamily: FONT,
                      fontSize: 14.5,
                      fontWeight: 600,
                      color: tokens.ink,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Why a site survey first?
                  </p>
                  <div
                    style={{
                      marginTop: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 9,
                    }}
                  >
                    {[
                      "Real backup hours depend on your actual load",
                      "Savings depend on your tariff, not averages",
                      "Installation requirements vary by property",
                    ].map((point) => (
                      <div
                        key={point}
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                        }}
                      >
                        <Check
                          size={14}
                          weight="bold"
                          color={tokens.brand}
                          style={{ flexShrink: 0, marginTop: 3 }}
                        />
                        <span
                          style={{
                            color: tokens.body,
                            fontSize: 13.5,
                            lineHeight: 1.45,
                          }}
                        >
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Rise>
          </div>
        </Band>
      </main>
    </div>
  );
}

/* ---- Pending state (honest — no backend yet) ---- */

function PendingState() {
  return (
    <div
      style={{
        textAlign: "center",
        paddingBlock: 48,
        paddingInline: 16,
      }}
    >
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 56,
          height: 56,
          borderRadius: 999,
          background: tokens.brandSoft,
          marginInline: "auto",
        }}
      >
        <Warning size={26} weight="duotone" color={tokens.brand} />
      </span>
      <h2
        style={{
          fontFamily: FONT,
          color: tokens.ink,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          marginTop: 18,
        }}
      >
        Form validated. Backend pending.
      </h2>
      <p
        style={{
          color: tokens.muted,
          fontSize: 15,
          lineHeight: 1.6,
          marginTop: 10,
          maxWidth: 400,
          marginInline: "auto",
        }}
      >
        Your details passed validation. The lead submission backend is not yet connected. Reach us directly in the meantime.
      </p>
      <div
        style={{
          marginTop: 22,
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 20px",
          background: tokens.card,
          border: `1px solid ${tokens.hairline}`,
          borderRadius: 12,
        }}
      >
        <Gated note="wire form to Cloudflare Worker + D1 lead store">
          <span
            style={{
              fontFamily: MONO,
              fontSize: 11,
              color: tokens.brand,
              letterSpacing: "0.05em",
            }}
          >
            Action: wire to /api/leads endpoint
          </span>
        </Gated>
      </div>
      <p
        style={{
          color: tokens.muted,
          fontSize: 13,
          marginTop: 20,
        }}
      >
        In the meantime, reach us at{" "}
        <Gated note="confirm support inbox">hello@gridenergy.co.in</Gated> or{" "}
        <Gated note="add real phone number">+91 XXXXX XXXXX</Gated>.
      </p>
    </div>
  );
}

/* ---- Submit button with hover ---- */

function SubmitButton({ enquiryType }: { enquiryType: EnquiryKey }) {
  const [hover, setHover] = useState(false);
  const labels: Record<EnquiryKey, string> = {
    survey: "Book free site survey",
    quote: "Request a quote",
    partner: "Send partner enquiry",
    support: "Send support request",
  };
  return (
    <button
      type="submit"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        marginTop: 24,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: hover ? tokens.brandHover : tokens.brand,
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
    >
      <Lightning size={15} weight="fill" />
      {labels[enquiryType]}
    </button>
  );
}

/* ---- form field helpers ---- */

function FormField({
  id,
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
}: {
  id: string;
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: 12.5,
          fontWeight: 600,
          color: tokens.ink,
          marginBottom: 8,
        }}
      >
        {label}
        {required && (
          <>
            <span style={{ color: tokens.brand, marginLeft: 3 }} aria-hidden>
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-err` : undefined}
        style={{
          ...inputStyle,
          borderColor: error ? tokens.brand : tokens.hairlineStrong,
        }}
      />
      {error && <ErrorHint id={`${id}-err`}>{error}</ErrorHint>}
    </div>
  );
}

function ErrorHint({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <p
      id={id}
      role="alert"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        marginTop: 6,
        color: tokens.brand,
        fontSize: 12.5,
        fontWeight: 500,
      }}
    >
      <Warning size={12} weight="bold" style={{ flexShrink: 0 }} />
      {children}
    </p>
  );
}

/* ---- contact row ---- */

function ContactRow({
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
      <span
        style={{
          flexShrink: 0,
          width: 36,
          height: 36,
          borderRadius: 10,
          background: tokens.pageBgDeep,
          border: `1px solid ${tokens.hairline}`,
          display: "grid",
          placeItems: "center",
        }}
      >
        <Icon size={16} weight="duotone" color={tokens.ink} />
      </span>
      <div>
        <p
          style={{
            fontFamily: MONO,
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: tokens.muted,
          }}
        >
          {label}
        </p>
        <div
          style={{
            fontSize: 13.5,
            color: tokens.body,
            marginTop: 2,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
