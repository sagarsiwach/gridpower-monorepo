import { type ReactNode, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { tokens } from "../../routes/_preview/_v3-tokens";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface AudienceTabItem {
  key: string;
  label: string;
  content: ReactNode;
}

export interface InPageAudienceTabsProps {
  items: AudienceTabItem[];
  defaultKey?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * InPageAudienceTabs — SPAN-style segmented control.
 *
 * Tab strip with a `layoutId`-driven indicator pill that slides between
 * tabs (spring, no overshoot). Content panel cross-fades on switch via
 * AnimatePresence mode="wait". Reduced-motion: instant swap, no slide.
 *
 * Does NOT change the URL — all switching is local state.
 */
export function InPageAudienceTabs({ items, defaultKey }: InPageAudienceTabsProps) {
  const [activeKey, setActiveKey] = useState(defaultKey ?? items[0]?.key ?? "");
  const shouldReduceMotion = useReducedMotion();

  const activeItem = items.find((i) => i.key === activeKey) ?? items[0];

  return (
    <div style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      {/* Tab strip */}
      <div
        className="flex items-center gap-1 p-1"
        style={{
          background: tokens.pageBgDeep,
          border: `1px solid ${tokens.hairline}`,
          borderRadius: 14,
          display: "inline-flex",
          position: "relative",
        }}
        role="tablist"
        aria-label="Audience sub-solutions"
      >
        {items.map((item) => {
          const isActive = item.key === activeKey;
          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${item.key}`}
              id={`tab-${item.key}`}
              onClick={() => setActiveKey(item.key)}
              style={{
                position: "relative",
                padding: "7px 16px",
                cursor: "pointer",
                border: "none",
                background: "transparent",
                borderRadius: 11,
                zIndex: 1,
                color: isActive ? tokens.ink : tokens.inkMuted,
                fontWeight: isActive ? 600 : 500,
                fontSize: 13,
                letterSpacing: "-0.01em",
                transition: "color 120ms ease",
                outline: "none",
                whiteSpace: "nowrap",
              }}
              onFocus={(e) => {
                // Visible focus ring for keyboard users, not mouse
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 2px ${tokens.brand}`;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Sliding indicator pill — behind label via z-index */}
              {isActive && (
                <motion.span
                  layoutId="tab-indicator"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 32 }
                  }
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 11,
                    background: tokens.card,
                    border: `1px solid ${tokens.hairline}`,
                    zIndex: -1,
                  }}
                  aria-hidden
                />
              )}
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div
        id={`tab-panel-${activeItem?.key ?? ""}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeItem?.key ?? ""}`}
        className="mt-4"
        style={{ position: "relative" }}
      >
        {shouldReduceMotion ? (
          /* Reduced-motion: no animation, instant swap */
          <div key={activeKey}>{activeItem?.content}</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeKey}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            >
              {activeItem?.content}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
