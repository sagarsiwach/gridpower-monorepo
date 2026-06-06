/*
  /sign-in — GridOS account sign-in.

  Customers monitor their system; installers manage fleets.
  Presentational only — client-side validation, no backend wired.
  Accounts are created at install; no self-sign-up path.
*/

import { useState, type CSSProperties, type FormEvent } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Lightning, EnvelopeSimple, Lock, Eye, EyeSlash, Warning } from "@phosphor-icons/react";
import { tokens } from "./_preview/_v3-tokens";
import { Logo } from "../components/Logo";
import { Rise } from "../components/solutions/light/atoms";

export const meta: MetaFunction = () => [
  { title: "Sign in — GridOS" },
  { name: "description", content: "Sign in to GridOS. Monitor your energy system, manage schedules, and track savings from anywhere." },
];

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";
const MONO = '"Geist Mono", ui-monospace, SFMono-Regular, monospace';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [forgotHover, setForgotHover] = useState(false);
  const [contactHover, setContactHover] = useState(false);

  function validate(): boolean {
    let ok = true;
    if (!email.trim()) {
      setEmailErr("Email is required.");
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailErr("Enter a valid email address.");
      ok = false;
    } else {
      setEmailErr("");
    }
    if (!password) {
      setPasswordErr("Password is required.");
      ok = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters.");
      ok = false;
    } else {
      setPasswordErr("");
    }
    return ok;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  return (
    <main
      style={{
        fontFamily: FONT,
        background: tokens.pageBgDeep,
        minHeight: "calc(100vh - 64px)",
        display: "grid",
        placeItems: "center",
        padding: "56px 20px",
      }}
    >
      <Rise>
        <div style={{ width: "100%", maxWidth: 400 }}>

          {/* wordmark */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <Link
              to="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
              }}
            >
              <Logo variant="gridenergy" size={28} />
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 16,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: tokens.ink,
                }}
              >
                GridEnergy
              </span>
            </Link>
          </div>

          {/* card */}
          <div
            style={{
              background: tokens.card,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 20,
              padding: "32px 30px 36px",
              boxShadow:
                "0 1px 2px oklch(15.3% 0.006 107.1 / 0.03), 0 28px 64px -40px oklch(15.3% 0.006 107.1 / 0.36)",
            }}
          >
            <div style={{ marginBottom: 26 }}>
              <h1
                style={{
                  fontFamily: FONT,
                  fontSize: 21,
                  fontWeight: 600,
                  letterSpacing: "-0.025em",
                  color: tokens.ink,
                  marginBottom: 6,
                }}
              >
                Sign in to GridOS
              </h1>
              <p style={{ fontSize: 13.5, color: tokens.muted, lineHeight: 1.5 }}>
                Monitor your system and track savings in real time.
              </p>
            </div>

            {submitted ? (
              /* success notice — auth not yet wired */
              <SubmittedNotice />
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {/* email */}
                <FieldGroup>
                  <label htmlFor="ge-email" style={labelStyle}>
                    <EnvelopeSimple
                      size={13}
                      weight="bold"
                      color={tokens.inkMuted}
                      aria-hidden
                    />
                    Email
                  </label>
                  <InputWrap hasError={!!emailErr}>
                    <input
                      id="ge-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailErr) setEmailErr("");
                      }}
                      placeholder="you@example.com"
                      aria-describedby={emailErr ? "ge-email-err" : undefined}
                      aria-invalid={!!emailErr}
                      style={inputStyle}
                    />
                  </InputWrap>
                  {emailErr && (
                    <ErrorMsg id="ge-email-err">{emailErr}</ErrorMsg>
                  )}
                </FieldGroup>

                {/* password */}
                <FieldGroup>
                  <label htmlFor="ge-password" style={labelStyle}>
                    <Lock
                      size={13}
                      weight="bold"
                      color={tokens.inkMuted}
                      aria-hidden
                    />
                    Password
                  </label>
                  <InputWrap hasError={!!passwordErr}>
                    <input
                      id="ge-password"
                      type={showPw ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordErr) setPasswordErr("");
                      }}
                      placeholder="Your password"
                      aria-describedby={passwordErr ? "ge-pw-err" : undefined}
                      aria-invalid={!!passwordErr}
                      style={{ ...inputStyle, paddingRight: 40 }}
                    />
                    <button
                      type="button"
                      aria-label={showPw ? "Hide password" : "Show password"}
                      onClick={() => setShowPw((v) => !v)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 2,
                        color: tokens.muted,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {showPw ? (
                        <EyeSlash size={16} weight="regular" />
                      ) : (
                        <Eye size={16} weight="regular" />
                      )}
                    </button>
                  </InputWrap>
                  {passwordErr && (
                    <ErrorMsg id="ge-pw-err">{passwordErr}</ErrorMsg>
                  )}
                </FieldGroup>

                {/* forgot */}
                <div style={{ textAlign: "right", marginTop: -8 }}>
                  <Link
                    to="/contact"
                    onMouseEnter={() => setForgotHover(true)}
                    onMouseLeave={() => setForgotHover(false)}
                    style={{
                      fontFamily: FONT,
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: forgotHover ? tokens.brandHover : tokens.brand,
                      textDecoration: "none",
                      transition: "color .15s ease",
                    }}
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* submit */}
                <button
                  type="submit"
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontFamily: FONT,
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: "#fff",
                    background: btnHover ? tokens.brandHover : tokens.brand,
                    border: "none",
                    borderRadius: 13,
                    padding: "14px 24px",
                    cursor: "pointer",
                    transition: "background .16s ease, transform .16s ease",
                    transform: btnHover ? "translateY(-1px)" : "none",
                    marginTop: 4,
                    width: "100%",
                  }}
                >
                  <Lightning size={15} weight="fill" aria-hidden />
                  Sign in
                </button>
              </form>
            )}
          </div>

          {/* footnote */}
          <div
            style={{
              marginTop: 20,
              padding: "14px 16px",
              background: tokens.pageBg,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 12,
            }}
          >
            <p
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: tokens.inkMuted,
                marginBottom: 5,
              }}
            >
              Account access
            </p>
            <p style={{ fontSize: 12.5, color: tokens.muted, lineHeight: 1.55 }}>
              GridOS accounts are created when your system is installed and commissioned. No
              self-sign-up yet.{" "}
              <Link
                to="/contact"
                onMouseEnter={() => setContactHover(true)}
                onMouseLeave={() => setContactHover(false)}
                style={{
                  color: contactHover ? tokens.brandHover : tokens.brand,
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "color .15s ease",
                }}
              >
                Contact us
              </Link>{" "}
              if you need help accessing your account.
            </p>
          </div>
        </div>
      </Rise>
    </main>
  );
}

/* ---- sub-components ---- */

function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{children}</div>;
}

function InputWrap({
  children,
  hasError,
}: {
  children: React.ReactNode;
  hasError: boolean;
}) {
  return (
    <div style={{ position: "relative" }}>
      <style>{`
        .ge-input:focus {
          outline: none;
          border-color: ${hasError ? tokens.brand : tokens.hairlineStrong} !important;
          box-shadow: 0 0 0 3px ${hasError ? "oklch(0.95 0.040 27 / 0.35)" : "oklch(93% 0.007 106.5 / 0.6)"};
        }
      `}</style>
      {children}
    </div>
  );
}

const inputStyle: CSSProperties = {
  width: "100%",
  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
  fontSize: 14,
  color: "oklch(15.3% 0.006 107.1)",
  background: "oklch(98.8% 0.003 106.5)",
  border: `1px solid oklch(88% 0.011 106.6)`,
  borderRadius: 11,
  padding: "12px 14px",
  boxSizing: "border-box",
  transition: "border-color .15s ease, box-shadow .15s ease",
};

const labelStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  fontSize: 12.5,
  fontWeight: 600,
  color: "oklch(15.3% 0.006 107.1)",
};

function ErrorMsg({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <span
      id={id}
      role="alert"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 12,
        color: "oklch(0.58 0.245 27)",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <Warning size={12} weight="fill" aria-hidden />
      {children}
    </span>
  );
}

function SubmittedNotice() {
  return (
    <div
      style={{
        padding: "20px 18px",
        background: "oklch(96.6% 0.005 106.5)",
        border: "1px solid oklch(93% 0.007 106.5)",
        borderRadius: 12,
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: "oklch(15.3% 0.006 107.1)",
          marginBottom: 6,
        }}
      >
        GridOS sign-in is coming.
      </p>
      <p style={{ fontSize: 13, color: "oklch(58% 0.031 107.3)", lineHeight: 1.55 }}>
        Account access opens once your system is installed and commissioned. We will send login
        details then.{" "}
        <Link
          to="/contact"
          style={{
            color: "oklch(0.58 0.245 27)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Contact us
        </Link>{" "}
        if you already have a system installed.
      </p>
    </div>
  );
}
