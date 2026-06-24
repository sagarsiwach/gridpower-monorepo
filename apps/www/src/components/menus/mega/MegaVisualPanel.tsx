import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";

import { AUDIENCES, FIRST_AUDIENCE } from "../_shared/content";
import { transitions } from "@/lib/motion";

/*
  Mega-menu — Variant C: Full-bleed visual panel.
  IA: imagery committed-hero on the left (1/3 width), solutions on
  the right (2/3 width).
  Strength: identity-driving. The mega panel itself becomes a brand
  moment instead of pure navigation. Useful when the homepage and
  mega-menu need to feel cohesive at a glance.
  Weakness: solutions per audience capped lower than Variant B.

  Imagery slot uses a deliberate red+monogram composition until
  paired day/night photography lands (Phase 2 of PRODUCT.md).
*/

export function MegaVisualPanel() {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(FIRST_AUDIENCE.key);
  const active = AUDIENCES.find((a) => a.key === activeKey) ?? FIRST_AUDIENCE;

  return (
    <div className="relative">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-page-bg)] px-6 py-4">
        <div className="flex items-center gap-6">
          <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
            GridPower
          </span>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            onMouseEnter={() => setOpen(true)}
            aria-expanded={open}
            className={`flex items-center gap-1.5 rounded-[var(--radius-sm)] px-3 py-1.5 text-sm font-medium transition-colors duration-[var(--duration-hover)] ${
              open
                ? "bg-[var(--color-section-alt)] text-[var(--color-text-heading)]"
                : "text-[var(--color-text-body)] hover:text-[var(--color-text-heading)]"
            }`}
          >
            Solutions
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
              className={`transition-transform duration-[var(--duration-hover)] ${
                open ? "rotate-180" : "rotate-0"
              }`}
            >
              <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          Imagery slot (placeholder until hero photography ships)
        </span>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            {...transitions.navOpen}
            onMouseLeave={() => setOpen(false)}
            className="absolute inset-x-0 top-full z-30 border-b border-[var(--color-border)] bg-[var(--color-neutral-50)]"
          >
            <div className="mx-auto grid max-w-[var(--container-2xl)] grid-cols-1 md:grid-cols-[minmax(0,22rem)_1fr]">
              {/* Visual slot — placeholder composition */}
              <div
                className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden p-8 md:aspect-auto"
                style={{ backgroundColor: "var(--color-gp-red)" }}
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-neutral-50)]/80">
                    Flagship
                  </p>
                  <p className="mt-3 max-w-[20ch] font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-neutral-50)]">
                    {active.label}
                  </p>
                  <p className="mt-3 max-w-[22ch] text-sm text-[var(--color-neutral-50)]/80">
                    {active.tagline}
                  </p>
                </div>

                {/* Decorative monogram block — uses neutral-50 alpha
                    instead of glassmorphism. Documented purposeful use. */}
                <div className="flex items-end justify-end">
                  <span
                    aria-hidden="true"
                    className="font-display text-[clamp(5rem,18vw,12rem)] font-bold leading-[0.85] text-[var(--color-neutral-50)]/15"
                  >
                    {active.label[0]}
                  </span>
                </div>

                <Link
                  to={`/solutions/${active.key}`}
                  className="absolute bottom-6 left-8 right-8 inline-flex items-center justify-between gap-2 rounded-[var(--radius-sm)] bg-[var(--color-neutral-50)] px-4 py-2 text-sm font-medium text-[var(--color-gp-red)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-neutral-100)]"
                >
                  Explore {active.label.toLowerCase()}
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M3 2.5L6.5 5L3 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </Link>
              </div>

              {/* Right: audience selector + solutions */}
              <div className="px-8 py-8">
                <div className="flex flex-wrap gap-1.5">
                  {AUDIENCES.map((a) => {
                    const isActive = a.key === activeKey;
                    return (
                      <button
                        key={a.key}
                        type="button"
                        onMouseEnter={() => setActiveKey(a.key)}
                        onFocus={() => setActiveKey(a.key)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-[var(--duration-hover)] ${
                          isActive
                            ? "border-[var(--color-text-heading)] bg-[var(--color-text-heading)] text-[var(--color-neutral-50)]"
                            : "border-[var(--color-border)] bg-[var(--color-neutral-50)] text-[var(--color-text-body)] hover:border-[var(--color-text-heading)]"
                        }`}
                      >
                        {a.label}
                      </button>
                    );
                  })}
                </div>

                <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {active.solutions.map((s) => (
                    <li key={s.href}>
                      <Link to={s.href} className="group block">
                        <span className="block text-sm font-medium text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] group-hover:text-[var(--color-gp-red)]">
                          {s.label}
                        </span>
                        {s.blurb ? (
                          <span className="mt-0.5 block text-xs text-[var(--color-text-muted)]">
                            {s.blurb}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
                  <p className="text-xs text-[var(--color-text-muted)]">
                    Software-first, hardware-grounded. India-built.
                  </p>
                  <Link
                    to="/solutions"
                    className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-gp-red-hover)]"
                  >
                    See every solution →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
