import { useState, useRef, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { tokens } from "../../routes/_preview/_v3-tokens";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQAccordionProps {
  items: FAQItem[];
  /** Index of the item to open by default. -1 = all closed. */
  defaultOpen?: number;
}

/* ------------------------------------------------------------------ */
/*  Single accordion row                                               */
/* ------------------------------------------------------------------ */

function FAQRow({
  item,
  isOpen,
  onToggle,
  isLast,
  reducedMotion,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  isLast: boolean;
  reducedMotion: boolean;
}) {
  // For reduced-motion fallback: measure content height for instant swap
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ borderBottom: isLast ? "none" : `1px solid ${tokens.hairline}` }}>
      {/* Question row — full-width button */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-4 text-left"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "16px 0",
        }}
      >
        <span
          className="text-[14px] font-semibold leading-[1.4]"
          style={{ color: tokens.ink, flex: 1 }}
        >
          {item.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            color: tokens.inkMuted,
            display: "flex",
            alignItems: "center",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: reducedMotion ? "none" : "transform 200ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <CaretDown size={16} weight="bold" />
        </span>
      </button>

      {/* Answer — animated height */}
      {reducedMotion ? (
        isOpen ? (
          <div ref={contentRef} className="pb-4">
            <p
              className="text-[14px] leading-[1.65]"
              style={{ color: tokens.body, maxWidth: "70ch" }}
            >
              {item.a}
            </p>
          </div>
        ) : null
      ) : (
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div className="pb-4">
                <p
                  className="text-[14px] leading-[1.65]"
                  style={{ color: tokens.body, maxWidth: "70ch" }}
                >
                  {item.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Accordion                                                          */
/* ------------------------------------------------------------------ */

/**
 * FAQAccordion — collapsible Q&A.
 *
 * Dense, type-led. One item open at a time (closes others on open).
 * `defaultOpen` sets the initially-open index (-1 = all closed).
 * Respects `prefers-reduced-motion: reduce` — instant open/close.
 * Otherwise: smooth height animation via motion AnimatePresence.
 */
export function FAQAccordion({ items, defaultOpen = -1 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);
  const reducedMotion = useReducedMotion() ?? false;

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  }

  return (
    <div
      style={{
        borderTop: `1px solid ${tokens.hairline}`,
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {items.map((item, i) => (
        <FAQRow
          key={item.q}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
          isLast={i === items.length - 1}
          reducedMotion={reducedMotion}
        />
      ))}
    </div>
  );
}
