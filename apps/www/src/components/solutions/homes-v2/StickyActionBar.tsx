/*
  StickyActionBar — Rivian-style bottom bar for /solutions/homes.

  Always-on quick actions (catalog / quote / contact) + section jump nav. Appears
  after the user scrolls past the hero, hides at the very top. On mobile it is the
  primary nav for the long page; on desktop it complements scrolling.
*/

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Lightning } from "@phosphor-icons/react";
import { tokens } from "../../../routes/_preview/_v3-tokens";

const JUMPS = [
  { id: "range", label: "Range" },
  { id: "how", label: "How it works" },
  { id: "outcomes", label: "Outcomes" },
  { id: "gridos", label: "GridOS" },
  { id: "money", label: "Economics" },
  { id: "configurator", label: "Find your system" },
];

export default function StickyActionBar() {
  const reduce = useReducedMotion() ?? false;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            left: "50%",
            transform: "translateX(-50%)",
            bottom: 20,
            zIndex: 45,
            width: "min(1100px, calc(100% - 24px))",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              background: "color-mix(in oklch, " + tokens.ink + " 92%, transparent)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
              padding: "10px 12px 10px 18px",
              boxShadow: "0 20px 50px -24px rgba(0,0,0,0.6)",
            }}
          >
            {/* Jump nav (desktop) */}
            <nav className="hidden md:flex" style={{ alignItems: "center", gap: 4 }} aria-label="On this page">
              {JUMPS.map((j) => (
                <button
                  key={j.id}
                  type="button"
                  onClick={() => jump(j.id)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.78)", fontSize: 12.5, fontWeight: 500, padding: "7px 11px", borderRadius: 9 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.78)")}
                >
                  {j.label}
                </button>
              ))}
            </nav>

            {/* Mobile label */}
            <button
              type="button"
              onClick={() => jump("configurator")}
              className="md:hidden"
              style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
            >
              Find your system
            </button>

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <a
                href="/products"
                className="hidden sm:inline-flex"
                style={{ alignItems: "center", color: "rgba(255,255,255,0.85)", fontSize: 12.5, fontWeight: 600, padding: "9px 14px", borderRadius: 11, textDecoration: "none", border: "1px solid rgba(255,255,255,0.18)" }}
              >
                Catalog
              </a>
              <a
                href="/contact"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, background: tokens.brand, color: "#fff", fontSize: 12.5, fontWeight: 700, padding: "9px 16px", borderRadius: 11, textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = tokens.brand)}
              >
                <Lightning size={13} weight="fill" />
                Get a quote
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
