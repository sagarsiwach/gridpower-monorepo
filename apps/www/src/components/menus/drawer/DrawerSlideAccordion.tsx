import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AUDIENCES, PRIMARY_LINKS, UTILITY_LINKS } from "../_shared/content";

/*
  Mobile drawer — Variant A: Slide-right with accordions.
  IA: classic vertical stack of nav sections. Solutions opens to
  a nested accordion per audience. Utility links live at the
  bottom of the sheet. CTA pinned at the very bottom.
  Strength: deepest IA depth without becoming a new screen.
  Weakness: many taps to reach a leaf node.
*/

export function DrawerSlideAccordion() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [expandedAudience, setExpandedAudience] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-between bg-[var(--color-page-bg)] px-6 py-4">
      <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
        GridPower
      </span>
      <Sheet>
        <SheetTrigger
          render={
            <button
              type="button"
              aria-label="Open menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-section-alt)]"
            />
          }
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-full sm:max-w-md bg-[var(--color-neutral-50)] border-l border-[var(--color-border)]"
        >
          <SheetHeader className="border-b border-[var(--color-border)] px-6 py-4">
            <div className="flex items-center gap-2">
              <span
                className="h-5 w-5 rounded-[var(--radius-xs)]"
                style={{ backgroundColor: "var(--color-gp-red)" }}
                aria-hidden="true"
              />
              <SheetTitle className="font-display text-base font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
                GridPower
              </SheetTitle>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-2 py-4">
            <nav>
              <ul>
                {/* Solutions — expandable */}
                <li>
                  <button
                    type="button"
                    onClick={() => setSolutionsOpen((o) => !o)}
                    aria-expanded={solutionsOpen}
                    className="flex w-full items-center justify-between rounded-[var(--radius-sm)] px-4 py-3 text-left text-base font-medium text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-section-alt)]"
                  >
                    Solutions
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                      className={`transition-transform duration-[var(--duration-hover)] ${
                        solutionsOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </button>

                  {solutionsOpen ? (
                    <div className="border-l border-[var(--color-border)] ml-4 mt-1 mb-3">
                      <ul>
                        {AUDIENCES.map((audience) => {
                          const expanded = expandedAudience === audience.key;
                          return (
                            <li key={audience.key}>
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedAudience(expanded ? null : audience.key)
                                }
                                className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-medium text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                              >
                                {audience.label}
                                <svg
                                  width="10"
                                  height="10"
                                  viewBox="0 0 10 10"
                                  fill="none"
                                  aria-hidden="true"
                                  className={`transition-transform duration-[var(--duration-hover)] ${
                                    expanded ? "rotate-90" : "rotate-0"
                                  }`}
                                >
                                  <path d="M3.5 2.5L6.5 5L3.5 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                                </svg>
                              </button>
                              {expanded ? (
                                <ul className="pb-2 pl-4">
                                  {audience.solutions.map((s) => (
                                    <li key={s.href}>
                                      <Link
                                        to={s.href}
                                        className="block py-1.5 text-sm text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-gp-red)]"
                                      >
                                        {s.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </li>

                {/* Remaining primary links */}
                {PRIMARY_LINKS.filter((l) => !l.hasMenu).map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="flex items-center justify-between rounded-[var(--radius-sm)] px-4 py-3 text-base font-medium text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-section-alt)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 border-t border-[var(--color-border)] pt-4">
              <p className="px-4 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Account
              </p>
              <ul className="mt-2">
                {UTILITY_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="flex items-center justify-between rounded-[var(--radius-sm)] px-4 py-2 text-sm text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-section-alt)] hover:text-[var(--color-text-heading)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] p-4">
            <Link
              to="/signup"
              className="block w-full rounded-[var(--radius-sm)] bg-[var(--color-gp-red)] py-3 text-center text-sm font-medium text-[var(--color-neutral-50)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-gp-red-hover)]"
            >
              Get early access
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
