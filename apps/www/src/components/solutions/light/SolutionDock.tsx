/*
  SolutionDock — floating bottom section-nav for solution pages.

  Modelled on Rivian's fixed bottom sub-nav (category label · section links ·
  primary CTA), rebuilt in the V3 language: olive surface, GridRed CTA, our type
  and radii. Adds scrollspy (active link tracks the section in view) and tucks
  away near the footer so it never covers the closing CTA.

  Anchors scroll to section ids that already exist on the page.
*/

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";
import { FONT, EASE } from "./directions";

export type DockLink = { id: string; label: string };

export function SolutionDock({
  label,
  links,
  cta,
}: {
  label: string;
  links: DockLink[];
  cta: { label: string; to: string };
}) {
  const reduce = useReducedMotion() ?? false;
  const [active, setActive] = useState<string>(links[0]?.id ?? "");
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const vh = window.innerHeight;
        const docH = document.documentElement.scrollHeight;

        // show after the hero, hide before the footer/closing CTA
        setVisible(y > 420 && y + vh < docH - 260);

        // scrollspy: last section whose top has passed a line ~140px down
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

  return (
    <>
      <style>{`
        @media (max-width: 880px) {
          .gx-dock-links { display: none !important; }
        }
        @media (max-width: 520px) {
          .gx-dock-label { display: none !important; }
        }
      `}</style>
      <motion.nav
        aria-label="On this page"
        initial={false}
        animate={
          reduce
            ? { opacity: visible ? 1 : 0 }
            : { opacity: visible ? 1 : 0, y: visible ? 0 : 16 }
        }
        transition={{ duration: 0.32, ease: EASE }}
        style={{
          position: "fixed",
          bottom: 24,
          left: 20,
          right: 20,
          marginInline: "auto",
          maxWidth: 1080,
          zIndex: 40,
          pointerEvents: visible ? "auto" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          height: 60,
          paddingLeft: 8,
          paddingRight: 8,
          fontFamily: FONT,
          background: "oklch(98.8% 0.003 106.5 / 0.82)",
          backdropFilter: "saturate(180%) blur(14px)",
          WebkitBackdropFilter: "saturate(180%) blur(14px)",
          border: `1px solid ${tokens.hairlineStrong}`,
          borderRadius: 18,
          boxShadow:
            "0 1px 2px oklch(15.3% 0.006 107.1 / 0.05), 0 20px 44px -26px oklch(15.3% 0.006 107.1 / 0.34)",
        }}
      >
        {/* left: category label, scrolls to top */}
        <button
          type="button"
          className="gx-dock-label"
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            flexShrink: 0,
            cursor: "pointer",
            height: 40,
            padding: "0 18px",
            background: "transparent",
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 999,
            fontFamily: FONT,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            color: tokens.ink,
          }}
        >
          <span aria-hidden style={{ width: 7, height: 7, borderRadius: 999, background: tokens.brand }} />
          {label}
        </button>

        {/* middle: section links with scrollspy highlight */}
        <div
          className="gx-dock-links"
          style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center", minWidth: 0 }}
        >
          {links.map((l) => {
            const on = active === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={go(l.id)}
                aria-current={on ? "true" : undefined}
                style={{
                  position: "relative",
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                  padding: "9px 16px",
                  borderRadius: 999,
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "-0.012em",
                  whiteSpace: "nowrap",
                  color: on ? tokens.ink : tokens.inkMuted,
                  background: on ? tokens.card : "transparent",
                  border: `1px solid ${on ? tokens.hairline : "transparent"}`,
                  boxShadow: on ? "0 1px 2px oklch(15.3% 0.006 107.1 / 0.05)" : "none",
                  transition: "color .15s ease, background .15s ease, border-color .15s ease",
                }}
                onMouseEnter={(e) => {
                  if (!on) e.currentTarget.style.color = tokens.ink;
                }}
                onMouseLeave={(e) => {
                  if (!on) e.currentTarget.style.color = tokens.inkMuted;
                }}
              >
                {l.label}
              </a>
            );
          })}
        </div>

        {/* right: primary CTA */}
        <Link
          to={cta.to}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            flexShrink: 0,
            height: 40,
            padding: "0 18px",
            background: tokens.brand,
            color: "#fff",
            borderRadius: 999,
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "-0.012em",
            textDecoration: "none",
            transition: "background .16s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = tokens.brandHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = tokens.brand)}
        >
          {cta.label}
          <ArrowRight size={13} weight="bold" />
        </Link>
      </motion.nav>
    </>
  );
}
