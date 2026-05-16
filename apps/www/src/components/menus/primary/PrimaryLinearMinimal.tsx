import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import { BrandMark } from "../_shared/BrandMark";
import { AUDIENCES, PRIMARY_LINKS } from "../_shared/content";
import { transitions } from "@/lib/motion";

/*
  Primary nav — Variant A: Linear-style minimal.
  Defining attributes:
  - Wordmark + center links + single right CTA, no utility row
  - Letterspacing is the visual signature, not ornament
  - Hover on "Solutions" reveals a tight 2-col dropdown beneath the bar,
    NOT a full mega panel — this is the "Linear" restraint cue
  - Active state: 1px under-rule, no background fills
*/
export function PrimaryLinearMinimal() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="relative bg-[var(--color-page-bg)]"
      onMouseLeave={() => setOpen(false)}
    >
      <div className="mx-auto flex max-w-[var(--container-2xl)] items-center justify-between border-b border-[var(--color-border)] px-6 py-3.5">
        <BrandMark />

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {PRIMARY_LINKS.map((link) => (
              <li
                key={link.href}
                onMouseEnter={() => setOpen(Boolean(link.hasMenu))}
              >
                <Link
                  to={link.href}
                  className="flex items-center gap-1 text-[13px] font-medium text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                >
                  {link.label}
                  {link.hasMenu ? (
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                      className="opacity-60"
                    >
                      <path
                        d="M2.5 3.75L5 6.25L7.5 3.75"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/sign-in"
            className="hidden text-[13px] font-medium text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)] md:inline"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-[var(--radius-sm)] bg-[var(--color-text-heading)] px-3 py-1.5 text-[13px] font-medium text-[var(--color-neutral-50)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-neutral-700)]"
          >
            Get early access
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            {...transitions.navOpen}
            className="absolute inset-x-0 top-full z-40 border-b border-[var(--color-border)] bg-[var(--color-neutral-50)]"
          >
            <div className="mx-auto grid max-w-[var(--container-2xl)] gap-x-12 gap-y-2 px-6 py-6 sm:grid-cols-2 lg:grid-cols-5">
              {AUDIENCES.map((audience) => (
                <div key={audience.key}>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    {audience.label}
                  </p>
                  <ul className="space-y-1.5">
                    {audience.solutions.slice(0, 3).map((s) => (
                      <li key={s.href}>
                        <Link
                          to={s.href}
                          className="text-[13px] text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                        >
                          {s.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
