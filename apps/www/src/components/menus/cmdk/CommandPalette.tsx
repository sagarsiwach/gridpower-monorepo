import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { AnimatePresence, motion } from "motion/react";

import { COMMAND_GROUPS } from "../_shared/content";
import { durations, easings } from "@/lib/motion";

/*
  Command palette — Cmd+K (single variant).
  Defining attributes:
  - Triggered by Cmd+K (or Ctrl+K). Also via the "Press / to search" button.
  - Centered modal, ~640px wide, hairline-bordered, no drop shadow.
  - Input row + grouped results. Keyboard chord hints on the right.
  - Filter is a plain substring match on label + group.
  - Arrow keys navigate, Enter activates, Esc closes. (Hooked to keydown
    on the dialog; not a full a11y treatment yet.)
  - No glassmorphism. Solid neutral-50 over a neutral-900/30 backdrop.
*/

const ALL = COMMAND_GROUPS.flatMap((g) =>
  g.commands.map((c) => ({ ...c, group: g.label })),
);

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Cmd+K / Ctrl+K toggle
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Focus the input when the palette opens (a11y-correct alternative to autoFocus)
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ALL;
    return ALL.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q),
    );
  }, [query]);

  // Group filtered results
  const grouped = useMemo(() => {
    const map = new Map<string, typeof results>();
    for (const r of results) {
      const existing = map.get(r.group);
      if (existing) {
        existing.push(r);
      } else {
        map.set(r.group, [r]);
      }
    }
    return Array.from(map.entries());
  }, [results]);

  // Keep cursor in bounds
  useEffect(() => {
    if (cursor >= results.length) setCursor(Math.max(0, results.length - 1));
  }, [cursor, results.length]);

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      const target = results[cursor];
      if (target) {
        window.location.href = target.href;
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="px-6 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Anywhere on the site
          </p>
          <p className="mt-1 max-w-[40ch] text-sm text-[var(--color-text-body)]">
            Press the key combo or the button to open. Type to filter,
            arrow keys to move, enter to jump.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-3 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors duration-[var(--duration-hover)] hover:border-[var(--color-text-heading)] hover:text-[var(--color-text-heading)]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="3.25" stroke="currentColor" strokeWidth="1.3" />
            <path d="M7.5 7.5L10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Search site
          <kbd className="ml-2 rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-neutral-100)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-body)]">
            Cmd K
          </kbd>
        </button>
      </div>

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-[var(--color-neutral-900)]/30 data-ending-style:opacity-0 data-starting-style:opacity-0 transition-opacity duration-150" />
          <DialogPrimitive.Popup className="fixed left-1/2 top-[20vh] z-50 w-[min(640px,92vw)] -translate-x-1/2 outline-none data-ending-style:opacity-0 data-ending-style:translate-y-[8px] data-starting-style:opacity-0 data-starting-style:-translate-y-[8px]">
            <AnimatePresence>
              {open ? (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: durations.nav, ease: easings.outQuart }}
                  className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-neutral-50)]"
                >
                  <DialogPrimitive.Title className="sr-only">
                    Search the site
                  </DialogPrimitive.Title>

                  <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M9 9L12.5 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setCursor(0);
                      }}
                      onKeyDown={onInputKeyDown}
                      placeholder="Search solutions, pages, actions..."
                      className="w-full bg-transparent text-base text-[var(--color-text-heading)] placeholder:text-[var(--color-text-muted)] outline-none"
                    />
                    <kbd className="rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-neutral-100)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                      Esc
                    </kbd>
                  </div>

                  <div className="max-h-[60vh] overflow-y-auto py-2">
                    {grouped.length === 0 ? (
                      <p className="px-4 py-6 text-sm text-[var(--color-text-muted)]">
                        Nothing matches that. Try "homes" or "platform".
                      </p>
                    ) : (
                      grouped.map(([groupLabel, items]) => (
                        <div key={groupLabel} className="py-1">
                          <p className="px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                            {groupLabel}
                          </p>
                          <ul>
                            {items.map((item) => {
                              const idx = results.indexOf(item);
                              const isActive = idx === cursor;
                              return (
                                <li key={item.href}>
                                  <Link
                                    to={item.href}
                                    onMouseEnter={() => setCursor(idx)}
                                    onClick={() => setOpen(false)}
                                    className={`flex items-center justify-between px-4 py-2 text-sm transition-colors duration-[var(--duration-hover)] ${
                                      isActive
                                        ? "bg-[var(--color-section-alt)] text-[var(--color-text-heading)]"
                                        : "text-[var(--color-text-body)]"
                                    }`}
                                  >
                                    <span className="flex items-center gap-3">
                                      <span
                                        aria-hidden="true"
                                        className={`h-1 w-1 rounded-full ${
                                          isActive
                                            ? "bg-[var(--color-gp-red)]"
                                            : "bg-[var(--color-border-strong)]"
                                        }`}
                                      />
                                      {item.label}
                                    </span>
                                    {item.kbd ? (
                                      <kbd className="font-mono text-[10px] tracking-[0.06em] text-[var(--color-text-muted)]">
                                        {item.kbd}
                                      </kbd>
                                    ) : null}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-neutral-100)] px-4 py-2 text-[10px] text-[var(--color-text-muted)]">
                    <div className="flex items-center gap-3 font-mono uppercase tracking-[0.08em]">
                      <span className="flex items-center gap-1">
                        <kbd className="rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-1 py-0.5">↑</kbd>
                        <kbd className="rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-1 py-0.5">↓</kbd>
                        Move
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="rounded-[var(--radius-xs)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-1 py-0.5">Enter</kbd>
                        Jump
                      </span>
                    </div>
                    <span className="font-mono uppercase tracking-[0.08em]">
                      {results.length} results
                    </span>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </DialogPrimitive.Popup>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
}
