import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AUDIENCES, PRIMARY_LINKS, FIRST_AUDIENCE } from "../_shared/content";

/*
  Mobile drawer — Variant B: Full-screen with tabs.
  IA: takes the entire viewport. A horizontal tab row switches
  between Solutions / Platform / Company / Sign in. Solutions shows
  audience cards in a one-tap grid, no nested accordions.
  Strength: one tap to leaf node, scannable as a single screen.
  Weakness: ergonomically heavier, drawer pretends to be a page.
*/

type TabKey = "solutions" | "platform" | "company" | "account";
const TABS: { key: TabKey; label: string }[] = [
  { key: "solutions", label: "Solutions" },
  { key: "platform", label: "Platform" },
  { key: "company", label: "Company" },
  { key: "account", label: "Sign in" },
];

export function DrawerFullscreenTabs() {
  const [tab, setTab] = useState<TabKey>("solutions");
  const [audienceKey, setAudienceKey] = useState(FIRST_AUDIENCE.key);
  const audience = AUDIENCES.find((a) => a.key === audienceKey) ?? FIRST_AUDIENCE;

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
          className="w-screen sm:max-w-none bg-[var(--color-neutral-50)] border-l-0"
        >
          <SheetTitle className="sr-only">GridPower menu</SheetTitle>

          {/* Tab strip */}
          <div className="border-b border-[var(--color-border)] px-4 pt-2">
            <ul className="flex items-center gap-1 overflow-x-auto pb-0">
              {TABS.map((t) => {
                const active = t.key === tab;
                return (
                  <li key={t.key}>
                    <button
                      type="button"
                      onClick={() => setTab(t.key)}
                      aria-pressed={active}
                      className={`relative whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors duration-[var(--duration-hover)] ${
                        active
                          ? "text-[var(--color-text-heading)]"
                          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-body)]"
                      }`}
                    >
                      {t.label}
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-3 -bottom-px h-0.5 bg-[var(--color-gp-red)]"
                        />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            {tab === "solutions" ? (
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {AUDIENCES.map((a) => {
                    const active = a.key === audienceKey;
                    return (
                      <button
                        key={a.key}
                        type="button"
                        onClick={() => setAudienceKey(a.key)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-[var(--duration-hover)] ${
                          active
                            ? "border-[var(--color-text-heading)] bg-[var(--color-text-heading)] text-[var(--color-neutral-50)]"
                            : "border-[var(--color-border)] bg-[var(--color-neutral-50)] text-[var(--color-text-body)]"
                        }`}
                      >
                        {a.label}
                      </button>
                    );
                  })}
                </div>

                <p className="mt-5 max-w-[28ch] font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
                  {audience.tagline}
                </p>

                <ul className="mt-5 divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
                  {audience.solutions.map((s) => (
                    <li key={s.href}>
                      <Link
                        to={s.href}
                        className="flex items-center justify-between gap-4 px-1 py-4 transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-gp-red)]"
                      >
                        <span>
                          <span className="block text-base font-medium text-[var(--color-text-heading)]">
                            {s.label}
                          </span>
                          {s.blurb ? (
                            <span className="mt-0.5 block text-xs text-[var(--color-text-muted)]">
                              {s.blurb}
                            </span>
                          ) : null}
                        </span>
                        <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                          <path d="M3 2.5L6.5 5L3 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {tab === "platform" ? (
              <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
                {PRIMARY_LINKS.filter((l) => !l.hasMenu).map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="flex items-center justify-between px-1 py-4 text-base font-medium text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-gp-red)]"
                    >
                      {l.label}
                      <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M3 2.5L6.5 5L3 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            {tab === "company" ? (
              <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
                {[
                  { label: "About", href: "/about" },
                  { label: "Partners", href: "/partners" },
                  { label: "Support", href: "/support" },
                  { label: "Careers", href: "/careers" },
                  { label: "Contact", href: "/contact" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="flex items-center justify-between px-1 py-4 text-base font-medium text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-gp-red)]"
                    >
                      {l.label}
                      <svg width="12" height="12" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M3 2.5L6.5 5L3 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            {tab === "account" ? (
              <div className="space-y-4">
                <p className="text-sm text-[var(--color-text-body)]">
                  Operators sign in to GridOS console. Drivers use the app.
                </p>
                <Link
                  to="/sign-in"
                  className="block w-full rounded-[var(--radius-sm)] border border-[var(--color-border-strong)] bg-[var(--color-neutral-50)] py-3 text-center text-sm font-medium text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] hover:bg-[var(--color-section-alt)]"
                >
                  Sign in to console
                </Link>
                <Link
                  to="/app"
                  className="block w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] py-3 text-center text-sm font-medium text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                >
                  Download the app
                </Link>
              </div>
            ) : null}
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
