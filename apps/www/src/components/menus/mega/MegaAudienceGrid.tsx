import { useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";

import { AUDIENCES } from "../_shared/content";
import { transitions } from "@/lib/motion";

/*
  Mega-menu — Variant A: 5-column audience grid.
  IA: every audience equal-weight, columns are buyer mental-models.
  Strength: scanning across audiences in one read.
  Weakness: caps at ~4 solutions per audience before it gets crowded.
  Use when audience count ≤ 5 and per-audience solutions ≤ 4.

  This variant opens via the trigger button below. In production it
  attaches to the Solutions item; here we wire a deliberate trigger so
  the showcase frame stays self-contained.
*/

export function MegaAudienceGrid() {
  const [open, setOpen] = useState(false);

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
          Hover or click trigger
        </span>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            {...transitions.navOpen}
            onMouseLeave={() => setOpen(false)}
            className="absolute inset-x-0 top-full z-30 border-b border-[var(--color-border)] bg-[var(--color-neutral-50)]"
          >
            <div className="mx-auto max-w-[var(--container-2xl)] px-6 py-10">
              <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
                {AUDIENCES.map((audience) => (
                  <section key={audience.key}>
                    <Link
                      to={`/solutions/${audience.key}`}
                      className="group block"
                    >
                      <p className="font-display text-lg font-semibold tracking-[-0.02em] text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] group-hover:text-[var(--color-gp-red)]">
                        {audience.label}
                      </p>
                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {audience.tagline}
                      </p>
                    </Link>
                    <ul className="mt-4 space-y-2">
                      {audience.solutions.map((s) => (
                        <li key={s.href}>
                          <Link
                            to={s.href}
                            className="block text-sm text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
                <p className="text-xs text-[var(--color-text-muted)]">
                  Open protocols by default. OCPP, MQTT, MODBUS, OpenAPI.
                </p>
                <Link
                  to="/solutions"
                  className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-gp-red-hover)]"
                >
                  See every solution →
                </Link>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
