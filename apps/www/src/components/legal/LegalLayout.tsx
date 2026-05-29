import { useEffect, useRef, useState, type ReactNode } from "react";
import { tokens } from "../../routes/_preview/_v3-tokens";

export type TocItem = {
  id: string;
  label: string;
};

type LegalLayoutProps = {
  kicker: string;
  title: string;
  subtitle?: string;
  toc: TocItem[];
  children: ReactNode;
};

/*
  LegalLayout — reusable shell for /privacy, /terms, /cookies.
  Desktop: sticky sidebar TOC on left, scrollable body on right.
  Mobile: TOC stacks above body, collapsible.

  DESIGN:
  - Olive substrate + GridRed accents (tokens.* throughout)
  - Sticky sidebar follows scroll, highlights active section
  - Smooth anchor scroll
  - Draft banner always visible at top (red strip)
*/

export function LegalLayout({ kicker, title, subtitle, toc, children }: LegalLayoutProps) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? "");
  const [tocOpen, setTocOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track which section is in view
  useEffect(() => {
    const options = {
      rootMargin: "-20% 0px -72% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    }, options);

    const headings = document.querySelectorAll(".legal-section-heading");
    headings.forEach((h) => observerRef.current?.observe(h));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
    setTocOpen(false);
  };

  return (
    <div style={{ background: tokens.pageBg, minHeight: "100vh" }}>
      {/* Draft warning banner */}
      <div
        style={{
          background: tokens.brandSoft,
          borderBottom: `1px solid ${tokens.brand}`,
          padding: "10px 24px",
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          <p className="text-[12px] font-semibold" style={{ color: tokens.brand }}>
            DRAFT — placeholder legal text, pending legal review. Not legally binding.
          </p>
        </div>
      </div>

      {/* Page header */}
      <div
        style={{
          background: tokens.pageBgDeep,
          borderBottom: `1px solid ${tokens.hairline}`,
          padding: "48px 24px 40px",
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          <p
            className="text-[11px] uppercase tracking-[0.18em] mb-3"
            style={{ color: tokens.brand, fontWeight: 700 }}
          >
            {kicker}
          </p>
          <h1
            className="text-[36px] md:text-[44px] font-semibold tracking-[-0.025em] leading-[1.1]"
            style={{ color: tokens.ink }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-[15px] leading-[1.6]" style={{ color: tokens.body, maxWidth: "56ch" }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Mobile TOC toggle */}
      <div
        className="lg:hidden mx-auto max-w-[1280px] px-6 pt-6"
      >
        <button
          type="button"
          onClick={() => setTocOpen((o) => !o)}
          className="flex items-center justify-between w-full px-4 py-3 text-[13px] font-semibold"
          style={{
            background: tokens.card,
            border: `1px solid ${tokens.hairline}`,
            borderRadius: 12,
            color: tokens.ink,
            cursor: "pointer",
          }}
          aria-expanded={tocOpen}
        >
          <span>Table of contents</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{
              transform: tocOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            <path d="M2 5L7 10L12 5" stroke={tokens.inkMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {tocOpen && (
          <div
            style={{
              background: tokens.card,
              border: `1px solid ${tokens.hairline}`,
              borderRadius: 12,
              overflow: "hidden",
              marginTop: 4,
            }}
          >
            <TocLinks toc={toc} activeId={activeId} onSelect={scrollTo} />
          </div>
        )}
      </div>

      {/* Main two-column layout */}
      <div className="mx-auto max-w-[1280px] px-6 py-10 lg:py-14">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16">
          {/* Desktop sticky sidebar */}
          <aside className="hidden lg:block">
            <div
              className="sticky"
              style={{ top: 128 }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.16em] mb-3"
                style={{ color: tokens.inkMuted, fontWeight: 700 }}
              >
                Contents
              </p>
              <TocLinks toc={toc} activeId={activeId} onSelect={scrollTo} />
            </div>
          </aside>

          {/* Body */}
          <main>
            <div
              style={{
                maxWidth: "68ch",
                lineHeight: "1.75",
                color: tokens.body,
                fontSize: 15,
              }}
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function TocLinks({
  toc,
  activeId,
  onSelect,
}: {
  toc: TocItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <nav aria-label="Page sections">
      <ul>
        {toc.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item.id)}
                className="w-full text-left py-2 px-3 text-[13px] transition-colors"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 8,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? tokens.ink : tokens.body,
                  position: "relative",
                  paddingLeft: isActive ? 16 : 12,
                  fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                  transition: "color 0.15s ease, padding-left 0.15s ease",
                }}
              >
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      left: 4,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 3,
                      height: 14,
                      background: tokens.brand,
                      borderRadius: 999,
                    }}
                  />
                )}
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Section helpers — reusable in each legal page                     */
/* ------------------------------------------------------------------ */

export function LegalSection({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} style={{ marginBottom: 48 }}>
      <div className="flex items-baseline gap-3 mb-4">
        <span
          className="text-[11px] uppercase tracking-[0.16em]"
          style={{ color: tokens.brand, fontWeight: 700, flexShrink: 0 }}
        >
          {number}
        </span>
        <h2
          id={id}
          className="legal-section-heading text-[20px] font-semibold tracking-[-0.015em]"
          style={{ color: tokens.ink }}
        >
          {title}
        </h2>
      </div>
      <div style={{ paddingLeft: 0 }}>{children}</div>
    </section>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[15px] leading-[1.75]" style={{ color: tokens.body }}>
      {children}
    </p>
  );
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="mb-4 space-y-2" style={{ paddingLeft: 0, listStyle: "none" }}>
      {items.map((item, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static content
        <li key={i} className="flex items-start gap-2.5 text-[14px] leading-[1.65]" style={{ color: tokens.body }}>
          <span
            style={{
              width: 4,
              height: 4,
              borderRadius: 999,
              background: tokens.accentLine,
              flexShrink: 0,
              marginTop: 8,
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PlaceholderTag() {
  return (
    <span
      className="inline-block text-[10px] uppercase tracking-[0.12em] font-semibold px-2 py-0.5"
      style={{
        background: tokens.brandSoft,
        color: tokens.brand,
        borderRadius: 6,
        verticalAlign: "middle",
        marginLeft: 6,
      }}
    >
      placeholder
    </span>
  );
}
