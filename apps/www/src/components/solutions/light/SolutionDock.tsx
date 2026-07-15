/*
  SolutionDock — the single, unified floating bottom bar for solution pages.

  Merges the two earlier bars: the light dock (scrollspy, fluid layoutId pill that
  slides between links, category label, hides over the footer) + the dark action
  bar (Catalog + primary CTA on the right). Themeable: light or dark, same shape.

  One component, used everywhere, so every solution page's bottom bar is identical.
*/

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { Lightning } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";
import { FONT, EASE } from "./directions";

export type DockLink = { id: string; label: string };
type Action = { label: string; to: string };
type Theme = "light" | "dark";

type Skin = {
  surface: string; border: string; labelText: string; labelBorder: string;
  linkOff: string; linkOn: string; pill: string; pillBorder: string;
  secBg: string; secText: string; secBorder: string; shadow: string;
};

const SKINS: Record<Theme, Skin> = {
  light: {
    surface: "oklch(98.8% 0.003 106.5 / 0.82)",
    border: tokens.hairlineStrong,
    labelText: tokens.ink,
    labelBorder: tokens.hairline,
    linkOff: tokens.inkMuted,
    linkOn: tokens.ink,
    pill: tokens.card,
    pillBorder: tokens.hairline,
    secBg: tokens.card,
    secText: tokens.ink,
    secBorder: tokens.hairlineStrong,
    shadow: "0 1px 2px oklch(15.3% 0.006 107.1 / 0.05), 0 20px 44px -26px oklch(15.3% 0.006 107.1 / 0.34)",
  },
  dark: {
    surface: "oklch(15.3% 0.006 107.1 / 0.90)",
    border: "rgba(255,255,255,0.12)",
    labelText: "#ffffff",
    labelBorder: "rgba(255,255,255,0.18)",
    linkOff: "rgba(255,255,255,0.66)",
    linkOn: "#ffffff",
    pill: "rgba(255,255,255,0.13)",
    pillBorder: "transparent",
    secBg: "transparent",
    secText: "rgba(255,255,255,0.85)",
    secBorder: "rgba(255,255,255,0.18)",
    shadow: "0 20px 50px -24px rgba(0,0,0,0.55)",
  },
};

export function SolutionDock({
  label,
  links,
  primary,
  secondary,
  theme = "light",
}: {
  label: string;
  links: DockLink[];
  primary: Action;
  secondary?: Action;
  theme?: Theme;
}) {
  const reduce = useReducedMotion() ?? false;
  const s = SKINS[theme];
  const [active, setActive] = useState<string>(links[0]?.id ?? "");
  const [visible, setVisible] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        const docH = document.documentElement.scrollHeight;
        setVisible(y > 420 && y + vh < docH - 260);
        const line = y + 140;
        let current = links[0]?.id ?? "";
        for (const l of links) {
          const el = document.getElementById(l.id);
          if (el && el.offsetTop <= line) current = l.id;
        }
        setActive(current);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [links]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    }
  };

  const pillId = `gx-dock-pill-${theme}`;

  return (
    <>
      <style>{`
        @media (max-width: 900px) { .gx-dock-links { display: none !important; } }
        @media (max-width: 560px) { .gx-dock-label { display: none !important; } .gx-dock-sec { display: none !important; } }
      `}</style>
      <motion.nav
        aria-label="On this page"
        initial={false}
        animate={reduce ? { opacity: visible ? 1 : 0 } : { opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration: 0.32, ease: EASE }}
        style={{
          position: "fixed", bottom: 24, left: 20, right: 20, marginInline: "auto", maxWidth: 1100, zIndex: 40,
          pointerEvents: visible ? "auto" : "none",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          height: 60, paddingLeft: 8, paddingRight: 8, fontFamily: FONT,
          background: s.surface, backdropFilter: "saturate(180%) blur(14px)", WebkitBackdropFilter: "saturate(180%) blur(14px)",
          border: `1px solid ${s.border}`, borderRadius: 18, boxShadow: s.shadow,
        }}
      >
        {/* left: category label, scrolls to top */}
        <button
          type="button"
          className="gx-dock-label"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          style={{
            display: "inline-flex", alignItems: "center", gap: 9, flexShrink: 0, cursor: "pointer",
            height: 40, padding: "0 18px", background: "transparent", border: `1px solid ${s.labelBorder}`,
            borderRadius: 999, fontFamily: FONT, fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", color: s.labelText,
          }}
        >
          <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
          {label}
        </button>

        {/* middle: scrollspy links with fluid shared-element pill */}
        <div className="gx-dock-links" style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center", minWidth: 0 }}>
          {links.map((l) => {
            const on = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                aria-current={on ? "true" : undefined}
                style={{
                  position: "relative", display: "inline-flex", alignItems: "center", textDecoration: "none",
                  padding: "9px 16px", borderRadius: 999, fontFamily: FONT, fontSize: 14, fontWeight: 600,
                  letterSpacing: "-0.012em", whiteSpace: "nowrap", color: on ? s.linkOn : s.linkOff, transition: "color .18s ease",
                }}
                onMouseEnter={(e) => { if (!on) e.currentTarget.style.color = s.linkOn; }}
                onMouseLeave={(e) => { if (!on) e.currentTarget.style.color = s.linkOff; }}
              >
                {on && (
                  <motion.span
                    layoutId={pillId}
                    aria-hidden
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                    style={{ position: "absolute", inset: 0, borderRadius: 999, background: s.pill, border: `1px solid ${s.pillBorder}`, zIndex: 0 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>{l.label}</span>
              </a>
            );
          })}
        </div>

        {/* right: actions — Catalog (secondary) + primary CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          {secondary && (
            <Link
              to={secondary.to}
              className="gx-dock-sec"
              style={{
                display: "inline-flex", alignItems: "center", height: 40, padding: "0 16px", borderRadius: 11,
                textDecoration: "none", fontFamily: FONT, fontSize: 13.5, fontWeight: 600, color: s.secText,
                background: s.secBg, border: `1px solid ${s.secBorder}`,
              }}
            >
              {secondary.label}
            </Link>
          )}
          <Link
            to={primary.to}
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 7, height: 40, padding: "0 18px", borderRadius: 11,
              background: ctaHover ? tokens.brandHover : tokens.brand, color: "#fff", textDecoration: "none",
              fontFamily: FONT, fontSize: 13.5, fontWeight: 700, transition: "background .16s ease",
            }}
          >
            <Lightning size={13} weight="fill" />
            {primary.label}
          </Link>
        </div>
      </motion.nav>
    </>
  );
}
