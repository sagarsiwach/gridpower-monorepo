import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { durations, easings } from "@/lib/motion";

/*
  In-page tabs — Variant A: Underline-active (Apple-style).
  Defining attributes:
  - Tab labels sit on a hairline rule. Active tab gets a 2px GridRed
    underline that animates left/right via transform (not width).
  - No background pills, no shadows. Pure type + rule.
  - Body content fade-swaps via opacity; no layout shift.
  - Use on long landing pages where the chrome should stay quiet.
*/

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "spec", label: "Specifications" },
  { key: "economics", label: "Economics" },
  { key: "install", label: "Installation" },
];

const CONTENT: Record<string, { heading: string; body: string }> = {
  overview: {
    heading: "Charging that pays back.",
    body: "Wallbox at home, fast charger at the mall, depot DC at the trucking corridor. One software platform, three form factors, every payment rail Indian operators actually use.",
  },
  spec: {
    heading: "Specifications you can audit.",
    body: "Geist Mono spec tables, open protocols labelled in plain English, current/voltage/cooling on every product page. Not in a PDF, on the site.",
  },
  economics: {
    heading: "Open math, not a slide deck.",
    body: "Payback periods modelled against real TOU tariffs by state. Subsidy stack updated as FAME III releases land. CFO room links from every solution.",
  },
  install: {
    heading: "Engineers, not gatekeepers.",
    body: "Site survey within 5 working days. Standard install in 2 weeks. Service SLAs published with response times, not promises.",
  },
};

export function TabsUnderline() {
  const [active, setActive] = useState("overview");
  const content = CONTENT[active] ?? CONTENT.overview;

  return (
    <div className="px-6 py-8">
      <div className="border-b border-[var(--color-border)]">
        <ul className="flex items-center gap-6" role="tablist">
          {TABS.map((t) => {
            const isActive = active === t.key;
            return (
              <li key={t.key} className="relative">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(t.key)}
                  className={`pb-3 pt-1 text-sm font-medium transition-colors duration-[var(--duration-hover)] ${
                    isActive
                      ? "text-[var(--color-text-heading)]"
                      : "text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]"
                  }`}
                >
                  {t.label}
                </button>
                {isActive ? (
                  <motion.span
                    layoutId="tab-underline-rule"
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-[2px] bg-[var(--color-gp-red)]"
                    transition={{ duration: durations.hover, ease: easings.outExpo }}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: durations.hover, ease: easings.outExpo }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-gp-red)]">
              {TABS.find((t) => t.key === active)?.label}
            </p>
            <h3 className="mt-2 max-w-[28ch] font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
              {content?.heading}
            </h3>
            <p className="mt-3 max-w-[60ch] text-sm leading-[1.625] text-[var(--color-text-body)]">
              {content?.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
