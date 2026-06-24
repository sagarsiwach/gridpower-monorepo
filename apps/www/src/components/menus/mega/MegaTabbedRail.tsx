import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";

import { AUDIENCES, FIRST_AUDIENCE } from "../_shared/content";
import { transitions } from "@/lib/motion";

/*
  Mega-menu — Variant B: Tabbed left-rail.
  IA: audience as nav-rail (left), solutions as content (right).
  Strength: handles audiences with many solutions (8-12+) cleanly,
  because the content area is a single column per audience instead
  of a packed grid cell. This is the answer when audience grids run
  out of room.
  Weakness: less scannable across audiences in one read.
*/

export function MegaTabbedRail() {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(FIRST_AUDIENCE.key);

  const active =
    AUDIENCES.find((a) => a.key === activeKey) ?? FIRST_AUDIENCE;

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
          Hover audience to switch
        </span>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            {...transitions.navOpen}
            onMouseLeave={() => setOpen(false)}
            className="absolute inset-x-0 top-full z-30 border-b border-[var(--color-border)] bg-[var(--color-neutral-50)]"
          >
            <div className="mx-auto grid max-w-[var(--container-2xl)] gap-0 px-6 py-8 md:grid-cols-[minmax(0,16rem)_1fr]">
              <nav aria-label="Audience" className="border-r border-[var(--color-border)] pr-4">
                <ul className="space-y-1">
                  {AUDIENCES.map((audience) => {
                    const isActive = audience.key === activeKey;
                    return (
                      <li key={audience.key}>
                        <button
                          type="button"
                          onMouseEnter={() => setActiveKey(audience.key)}
                          onFocus={() => setActiveKey(audience.key)}
                          className={`flex w-full items-center justify-between rounded-[var(--radius-sm)] px-3 py-2 text-left text-sm font-medium transition-colors duration-[var(--duration-hover)] ${
                            isActive
                              ? "bg-[var(--color-gp-red-tinted)] text-[var(--color-gp-red)]"
                              : "text-[var(--color-text-body)] hover:bg-[var(--color-section-alt)] hover:text-[var(--color-text-heading)]"
                          }`}
                        >
                          <span>{audience.label}</span>
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 10 10"
                            fill="none"
                            aria-hidden="true"
                            className="opacity-60"
                          >
                            <path d="M3.5 2.5L6.5 5L3.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                          </svg>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="pl-8">
                <div className="mb-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-gp-red)]">
                    {active.label}
                  </p>
                  <p className="mt-1 font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
                    {active.tagline}
                  </p>
                </div>

                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {active.solutions.map((s) => (
                    <li key={s.href}>
                      <Link to={s.href} className="group block">
                        <span className="block text-sm font-medium text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] group-hover:text-[var(--color-gp-red)]">
                          {s.label}
                        </span>
                        {s.blurb ? (
                          <span className="block text-xs text-[var(--color-text-muted)]">
                            {s.blurb}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
                  <Link
                    to={`/solutions/${active.key}`}
                    className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-gp-red-hover)]"
                  >
                    See {active.label.toLowerCase()} overview →
                  </Link>
                  <Link
                    to="/economics"
                    className="text-xs text-[var(--color-text-muted)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                  >
                    See the complete financial model
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
