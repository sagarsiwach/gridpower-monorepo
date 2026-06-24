import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, Lightning } from "@phosphor-icons/react";
import { tokens } from "../../routes/_preview/_v3-tokens";

/* ------------------------------------------------------------------ */
/*  Shared atoms                                                       */
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

export interface MicroStat {
  label: string;
  value: string;
  delta: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface AudienceHeroProps {
  /** e.g. "01 · HOMES" */
  kicker: string;
  headline: string;
  lead: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  microcopy?: string;
  /** Up to 3 inline stats below the CTAs */
  microStats?: MicroStat[];
  /** Slot for hero-right imagery; consumer owns the content */
  visual?: ReactNode;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * AudienceHero — top-of-page entry for a GridEnergy audience landing.
 *
 * 12-col grid, 7/5 split (content / visual) on lg+, stacked on mobile.
 * Marquee h1 uses className="" (Clash Grotesk via CSS var).
 * microStats renders an HeroMicroStat row matching v3-website language.
 * visual prop is a pass-through slot — no opinion on imagery.
 */
export function AudienceHero({
  kicker,
  headline,
  lead,
  primaryCta,
  secondaryCta,
  microcopy,
  microStats,
  visual,
}: AudienceHeroProps) {
  return (
    <section
      className="mx-auto max-w-[1280px] px-8 pt-20 pb-16"
      style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      <div className="grid grid-cols-12 gap-8">
        {/* ── Content column ── */}
        <div className="col-span-12 lg:col-span-7">
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

          {/* Marquee headline — Clash Grotesk via .*/}
          <h1
            className="text-[64px] lg:text-[72px] leading-[0.98] tracking-[-0.035em] font-semibold mb-6"
            style={{ color: tokens.ink }}
          >
            {headline}
          </h1>

          {/* Lead */}
          <p
            className="text-[17px] leading-[1.55] max-w-[54ch] mb-8"
            style={{ color: tokens.body }}
          >
            {lead}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {/* Primary — GridRed fill */}
            <a
              href={primaryCta.href}
              className="inline-flex items-center gap-1.5 px-5 py-3 text-[13px] uppercase tracking-[0.08em] font-semibold transition-colors"
              style={{
                background: tokens.brand,
                color: "#ffffff",
                borderRadius: 14,
                textDecoration: "none",
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

            {/* Secondary — ghost */}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="inline-flex items-center gap-1 text-[13px] uppercase tracking-[0.08em] font-semibold"
                style={{ color: tokens.ink, textDecoration: "none" }}
              >
                {secondaryCta.label}
                <ArrowRight size={12} weight="bold" />
              </a>
            )}

            {/* Microcopy */}
            {(microcopy || secondaryCta) && (
              <>
                <span
                  style={{ width: 1, height: 24, background: tokens.hairlineStrong, flexShrink: 0 }}
                />
                {microcopy && (
                  <span className="text-[12px]" style={{ color: tokens.muted }}>
                    {microcopy}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Micro-stat row */}
          {microStats && microStats.length > 0 && (
            <div className="flex items-stretch gap-0">
              {microStats.map((s, i) => (
                <div key={s.label} className="flex items-stretch">
                  {i > 0 && (
                    <span style={{ width: 1, background: tokens.hairline }} />
                  )}
                  <HeroMicroStat {...s} first={i === 0} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Visual column ── */}
        {visual && (
          <div className="col-span-12 lg:col-span-5 flex items-start">{visual}</div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Private atoms                                                      */
/* ------------------------------------------------------------------ */

function HeroMicroStat({
  label,
  value,
  delta,
  first,
}: MicroStat & { first: boolean }) {
  return (
    <div className={`flex-1 px-4 ${first ? "pl-0" : ""}`}>
      <p
        className="text-[10px] uppercase tracking-[0.14em] mb-1"
        style={{ color: tokens.muted, fontWeight: 600 }}
      >
        {label}
      </p>
      <p
        className="text-[24px] font-semibold tracking-[-0.02em] leading-none"
        style={{ color: tokens.ink }}
      >
        {value}
      </p>
      <p className="text-[11px] mt-1" style={{ color: tokens.inkMuted }}>
        {delta}
      </p>
    </div>
  );
}
