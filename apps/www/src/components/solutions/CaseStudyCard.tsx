import type { CSSProperties, ReactNode } from "react";
import { tokens } from "../../routes/_preview/_v3-tokens";

/* ------------------------------------------------------------------ */
/*  Local atom                                                         */
/* ------------------------------------------------------------------ */

function Rect({
  children,
  fill,
  stroke,
  strokeWidth = 1,
  cornerRadius = 16,
  className,
  style,
}: {
  children: ReactNode;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  cornerRadius?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        background: fill,
        border: stroke ? `${strokeWidth}px solid ${stroke}` : undefined,
        borderRadius: cornerRadius,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

export interface CaseStudyMetric {
  label: string;
  value: string;
  sub?: string;
}

export interface CaseStudyAttribution {
  name: string;
  role: string;
  org: string;
}

export interface CaseStudyCardProps {
  image: string;
  imageAlt: string;
  /** e.g. "PUNE-02 · APARTMENT RWA" */
  kicker: string;
  /** Up to 3 metrics */
  metrics: CaseStudyMetric[];
  quote: string;
  attribution: CaseStudyAttribution;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * CaseStudyCard — social-proof card for audience/solution landing pages.
 *
 * Desktop: image left (40%) / content right (60%).
 * Mobile: image top / content below.
 * Quote uses an olive accent line above, not quotation marks.
 * Metrics are tabular-nums, packed dense.
 */
export function CaseStudyCard({
  image,
  imageAlt,
  kicker,
  metrics,
  quote,
  attribution,
}: CaseStudyCardProps) {
  const cappedMetrics = metrics.slice(0, 3);

  return (
    <Rect
      fill={tokens.card}
      stroke={tokens.hairline}
      cornerRadius={24}
      style={{ overflow: "hidden" }}
    >
      {/* Outer flex: stacked on mobile, side-by-side on md+ */}
      <div className="flex flex-col md:flex-row">
        {/* ── Image pane (40% on desktop) ── */}
        <div
          style={{
            background: tokens.pageBgDeep,
            flexShrink: 0,
            position: "relative",
            overflow: "hidden",
          }}
          className="w-full md:w-[40%] aspect-[4/3] md:aspect-auto min-h-[220px] md:min-h-[380px]"
        >
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* ── Content pane (60% on desktop) ── */}
        <div className="flex-1 flex flex-col p-7 md:p-10">
          {/* Kicker */}
          <div className="flex items-center gap-2 mb-5">
            <span
              style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, flexShrink: 0 }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.16em]"
              style={{ color: tokens.brand, fontWeight: 700 }}
            >
              {kicker}
            </span>
          </div>

          {/* Metric strip */}
          <div
            className="grid gap-0 mb-7"
            style={{
              gridTemplateColumns: `repeat(${cappedMetrics.length}, 1fr)`,
              borderTop: `1px solid ${tokens.hairline}`,
              borderBottom: `1px solid ${tokens.hairline}`,
            }}
          >
            {cappedMetrics.map((m, i) => (
              <div
                key={m.label}
                className="py-4 px-0"
                style={{
                  borderLeft: i === 0 ? "none" : `1px solid ${tokens.hairline}`,
                  paddingLeft: i === 0 ? 0 : 20,
                  paddingRight: 20,
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.14em] mb-1"
                  style={{ color: tokens.muted, fontWeight: 600 }}
                >
                  {m.label}
                </p>
                <p
                  className="text-[28px] font-bold tracking-[-0.03em] leading-none tabular-nums"
                  style={{ color: tokens.ink }}
                >
                  {m.value}
                </p>
                {m.sub && (
                  <p className="text-[11px] mt-1" style={{ color: tokens.inkMuted }}>
                    {m.sub}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="flex-1 mb-6">
            {/* Accent line above quote */}
            <div
              style={{
                width: 28,
                height: 3,
                background: tokens.brand,
                borderRadius: 999,
                marginBottom: 16,
              }}
            />
            <p
              className="text-[17px] leading-[1.5] font-semibold tracking-[-0.01em] max-w-[55ch]"
              style={{ color: tokens.ink }}
            >
              {quote}
            </p>
          </div>

          {/* Attribution */}
          <div>
            <p
              className="text-[12px] font-semibold"
              style={{ color: tokens.inkMuted }}
            >
              {attribution.name}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: tokens.muted }}>
              {attribution.role}
              <span style={{ margin: "0 6px", opacity: 0.4 }}>·</span>
              {attribution.org}
            </p>
          </div>
        </div>
      </div>
    </Rect>
  );
}
