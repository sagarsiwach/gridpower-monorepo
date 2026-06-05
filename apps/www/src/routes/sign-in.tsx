import { useState, type CSSProperties } from "react";
import type { MetaFunction } from "react-router";
import { Link } from "react-router";
import { Lightning } from "@phosphor-icons/react";
import { tokens } from "../routes/_preview/_v3-tokens";
import { Logo } from "../components/Logo";
import { Gated } from "../components/marketing/Primitives";

export const meta: MetaFunction = () => [
  { title: "Sign in — GridEnergy" },
  { name: "description", content: "Sign in to your GridOS console." },
];

const FONT = "Inter, ui-sans-serif, system-ui, sans-serif";

const inputStyle: CSSProperties = {
  width: "100%",
  fontFamily: FONT,
  fontSize: 14,
  color: tokens.ink,
  background: tokens.pageBg,
  border: `1px solid ${tokens.hairlineStrong}`,
  borderRadius: 11,
  padding: "12px 14px",
  outline: "none",
};

export default function SignInPage() {
  const [notice, setNotice] = useState(false);

  return (
    <main style={{ fontFamily: FONT, background: tokens.pageBgDeep, minHeight: "calc(100vh - 64px)", display: "grid", placeItems: "center", padding: "64px 24px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <Logo variant="gridenergy" size={30} />
            <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.02em", color: tokens.ink }}>GridEnergy</span>
          </Link>
        </div>

        <div style={{ background: tokens.card, border: `1px solid ${tokens.hairline}`, borderRadius: 20, padding: "30px 30px 34px", boxShadow: "0 24px 60px -40px oklch(15.3% 0.006 107.1 / 0.4)" }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: tokens.ink, textAlign: "center" }}>
            Sign in to GridOS
          </h1>
          <p style={{ fontSize: 13.5, color: tokens.muted, textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
            Monitor your system, schedules, and savings.
          </p>

          <form
            style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 14 }}
            onSubmit={(e) => {
              e.preventDefault();
              setNotice(true);
            }}
          >
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" placeholder="you@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <input type="password" placeholder="••••••••" style={inputStyle} />
            </div>
            <button
              type="submit"
              style={{ marginTop: 6, background: tokens.brand, color: "#fff", fontFamily: FONT, fontSize: 15, fontWeight: 600, padding: "13px 24px", borderRadius: 13, border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brand)}
            >
              <Lightning size={15} weight="fill" color="#fff" />
              Sign in
            </button>
          </form>

          {notice && (
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <Gated note="GridOS auth not yet live — wire to backend before launch">
                <span style={{ fontSize: 12.5, color: tokens.body }}>Account access is coming soon — GridOS sign-in isn't live yet.</span>
              </Gated>
            </div>
          )}

          <p style={{ fontSize: 12.5, color: tokens.muted, textAlign: "center", marginTop: 18 }}>
            No account yet?{" "}
            <Link to="/contact" style={{ color: tokens.brand, fontWeight: 600, textDecoration: "none" }}>
              Book a site survey
            </Link>
          </p>
        </div>

        <p style={{ fontSize: 11.5, color: tokens.muted, textAlign: "center", marginTop: 18 }}>
          GridOS console access opens after your system is installed.
        </p>
      </div>
    </main>
  );
}

const labelStyle: CSSProperties = { display: "block", fontSize: 12.5, fontWeight: 600, color: tokens.ink, marginBottom: 7 };
