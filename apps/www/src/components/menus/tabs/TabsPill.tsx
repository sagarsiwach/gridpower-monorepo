import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { durations, easings } from "@/lib/motion";

/*
  In-page tabs — Variant B: Pill-active (Linear-style).
  Defining attributes:
  - Tabs sit on a tinted neutral-100 container background
  - Active pill = neutral-50 (popped above the container) + GridRed text
  - Pill background slides between tabs via shared-layout, transform only
  - Use where tabs are a control surface (filter, view-switch), not nav
*/

const TABS = [
  { key: "all", label: "All Solutions" },
  { key: "homes", label: "Homes" },
  { key: "hospitality", label: "Hospitality" },
  { key: "offices", label: "Offices" },
];

const COUNTS: Record<string, number> = {
  all: 18,
  homes: 3,
  hospitality: 4,
  offices: 3,
};

export function TabsPill() {
  const [active, setActive] = useState("all");

  return (
    <div className="px-6 py-8">
      <div className="inline-flex rounded-full border border-[var(--color-border)] bg-[var(--color-neutral-100)] p-1">
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              aria-pressed={isActive}
              className={`relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-[var(--duration-hover)] ${
                isActive
                  ? "text-[var(--color-gp-red)]"
                  : "text-[var(--color-text-body)] hover:text-[var(--color-text-heading)]"
              }`}
            >
              {isActive ? (
                <motion.span
                  layoutId="tabs-pill-bg"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[var(--color-neutral-50)] ring-1 ring-[var(--color-border)]"
                  transition={{ duration: durations.hover, ease: easings.outExpo }}
                />
              ) : null}
              <span className="relative">
                {t.label}
                <span
                  className={`ml-1.5 font-mono text-[10px] ${
                    isActive ? "text-[var(--color-gp-red)]/70" : "text-[var(--color-text-muted)]"
                  }`}
                >
                  {COUNTS[t.key] ?? 0}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: durations.hover, ease: easings.outExpo }}
            className="grid gap-3 sm:grid-cols-2"
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] p-4"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                  Solution {i.toString().padStart(2, "0")}
                </p>
                <p className="mt-1 font-display text-base font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
                  Filtered result for {TABS.find((t) => t.key === active)?.label}
                </p>
                <p className="mt-2 text-xs text-[var(--color-text-body)]">
                  Placeholder card so the tab control reads as a real
                  filter, not a stub.
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
