import { Link } from "react-router-dom";
import { Moon, Sun } from "@phosphor-icons/react";

import { useMegamenuTheme } from "./_v3-tokens";
import SiteHeader from "../../components/site/SiteHeader";

export default function V3Megamenu() {
  const { theme, tokens, toggle } = useMegamenuTheme();

  return (
    <div
      className="v3-page"
      data-theme={theme}
      style={{
        background: tokens.pageBg,
        color: tokens.body,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <style>{`
        .v3-page ::selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-page ::-moz-selection { background: ${tokens.brand}; color: #ffffff; }
        .v3-page :is(h1, h2, h3, h4, h5, h6) {
          font-family: var(--font-body);
          font-weight: 600;
          font-optical-sizing: auto;
        }
        .v3-page .v3-display {
          font-family: var(--font-display);
          font-weight: 600;
        }
      `}</style>

      <PreviewHeader theme={theme} onToggleTheme={toggle} />

      <SiteHeader />

      <Instructions />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Preview chrome — not part of SiteHeader                           */
/* ------------------------------------------------------------------ */

function PreviewHeader({ theme, onToggleTheme }: { theme: "light" | "dark"; onToggleTheme: () => void }) {
  const { tokens } = useMegamenuTheme();
  return (
    <header
      className="px-8 py-3 flex items-center gap-6"
      style={{
        background: theme === "dark" ? "oklch(8% 0.004 107)" : tokens.ink,
        color: "white",
      }}
    >
      <Link
        to="/preview"
        className="text-[11px] tracking-[0.12em] uppercase opacity-70 hover:opacity-100"
      >
        ← all previews
      </Link>
      <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.2)" }} />
      <span className="text-[11px] tracking-[0.12em] uppercase" style={{ color: tokens.brand, fontWeight: 700 }}>
        V3 · MEGA MENU
      </span>
      <span className="text-[13px] font-medium">GridEnergy audience-led mega</span>
      <span className="ml-auto text-[11px] tracking-[0.08em] uppercase opacity-50">
        /preview/v3-megamenu
      </span>
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.12em] font-semibold transition-colors"
        style={{
          background: "rgba(255,255,255,0.08)",
          color: "white",
          padding: "5px 10px 5px 9px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.15)",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.14)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)")}
      >
        {theme === "dark" ? <Sun size={12} weight="fill" /> : <Moon size={12} weight="fill" />}
        {theme === "dark" ? "Light" : "Dark"}
      </button>
    </header>
  );
}

function Instructions() {
  const { tokens } = useMegamenuTheme();
  return (
    <div className="mx-auto max-w-[1280px] px-8 pt-[440px] pb-32">
      <div className="flex items-center gap-2 mb-4">
        <span style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand }} />
        <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: tokens.brand, fontWeight: 700 }}>
          MEGA MENU · v3 PROTOTYPE
        </span>
      </div>
      <h1 className="text-[40px] font-semibold tracking-[-0.025em] leading-[1.05] mb-4" style={{ color: tokens.ink }}>
        Hover an audience to switch the panel.
      </h1>
      <p className="text-[14px] leading-[1.6] max-w-[60ch]" style={{ color: tokens.body }}>
        Five audiences (Homes / Offices &amp; Industrial / Institute / Enterprises / Hospitality).
        Each opens a panel with three columns — solutions, featured items, an ink-filled spotlight tile —
        plus a footer strip with cross-vertical link to GridCharge. Move cursor outside the nav strip to close.
      </p>
    </div>
  );
}
