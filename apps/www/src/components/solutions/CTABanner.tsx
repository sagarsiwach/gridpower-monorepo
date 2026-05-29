import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Lightning } from "@phosphor-icons/react";
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

export interface CTALink {
  label: string;
  href: string;
}

export interface CTABannerProps {
  /**
   * "ink" — dark ink fill with white text (default).
   * "olive" — olive-100 bg with ink text.
   */
  variant?: "ink" | "olive";
  /** e.g. "EARLY ACCESS · 2,140 ON WAITLIST" */
  kicker: string;
  /** Uses .(Clash Grotesk). */
  headline: string;
  lead: string;
  primaryCta: CTALink;
  secondaryLink?: CTALink;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * CTABanner — final conversion banner. Reusable, extracted from v3-website.
 *
 * Two variants:
 *   "ink" (default): dark ink surface, white text, GridRed pill CTA.
 *   "olive": olive-100 bg, ink text, GridRed pill CTA.
 *
 * Desktop: 8/4 split (content / CTAs). Mobile: stacked.
 * Headline applies .(Clash Grotesk 600).
 */
export function CTABanner({
  variant = "ink",
  kicker,
  headline,
  lead,
  primaryCta,
  secondaryLink,
}: CTABannerProps) {
  const isInk = variant === "ink";

  const bgColor = isInk ? tokens.ink : tokens.pageBgDeep;
  const headlineColor = isInk ? "#ffffff" : tokens.ink;
  const leadColor = isInk ? "rgba(255,255,255,0.70)" : tokens.body;
  const secondaryColor = isInk ? "rgba(255,255,255,0.85)" : tokens.inkMuted;

  return (
    <Rect fill={bgColor} cornerRadius={28}>
      <div
        className="p-10 md:p-16 grid grid-cols-12 gap-8 items-end"
        style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
      >
        {/* ── Content: 8 cols ── */}
        <div className="col-span-12 md:col-span-8">
          {/* Kicker */}
          <div className="flex items-center gap-2 mb-5">
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: tokens.brand,
                flexShrink: 0,
              }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.16em]"
              style={{ color: tokens.brand, fontWeight: 700 }}
            >
              {kicker}
            </span>
          </div>

          {/* Headline — Clash Grotesk via .*/}
          <h2
            className="text-[40px] md:text-[44px] font-semibold tracking-[-0.025em] leading-[1.05] mb-3"
            style={{ color: headlineColor }}
          >
            {headline}
          </h2>

          {/* Lead */}
          <p
            className="text-[15px] leading-[1.6] max-w-[52ch]"
            style={{ color: leadColor }}
          >
            {lead}
          </p>
        </div>

        {/* ── CTAs: 4 cols ── */}
        <div className="col-span-12 md:col-span-4 flex flex-wrap md:flex-col md:items-end items-center gap-3">
          {/* Primary — GridRed pill */}
          <a
            href={primaryCta.href}
            className="inline-flex items-center gap-1.5 px-6 py-3 text-[13px] uppercase tracking-[0.08em] font-semibold transition-colors"
            style={{
              background: tokens.brand,
              color: "#ffffff",
              borderRadius: 14,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = tokens.brandHover)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = tokens.brand)
            }
          >
            <Lightning size={13} weight="fill" color="#ffffff" />
            {primaryCta.label}
          </a>

          {/* Secondary — ghost link */}
          {secondaryLink && (
            <a
              href={secondaryLink.href}
              className="inline-flex items-center gap-1 text-[12px] uppercase tracking-[0.1em] font-semibold"
              style={{ color: secondaryColor, textDecoration: "none" }}
            >
              {secondaryLink.label}
              <ArrowRight size={11} weight="bold" />
            </a>
          )}
        </div>
      </div>
    </Rect>
  );
}
