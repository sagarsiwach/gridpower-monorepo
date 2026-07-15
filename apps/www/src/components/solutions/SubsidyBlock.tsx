import type { CSSProperties, ReactNode } from "react";
import { Check } from "@phosphor-icons/react";
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

export interface SubsidyBlockProps {
  /** e.g. "PMS (Pradhan Mantri Suryodaya)" */
  scheme: string;
  /** e.g. "Up to 60%" */
  amount: string;
  description: string;
  eligibility: string[];
  documentsHelp?: string;
  ctaLabel: string;
  ctaHref: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * SubsidyBlock — regulatory/subsidy framing for Institute and SMB pages.
 *
 * Split panel: deep-olive left (scheme name + big amount), white right
 * (eligibility checklist + CTA). Tabular-nums on the amount.
 * Phosphor `Check` for eligibility items.
 */
export function SubsidyBlock({
  scheme,
  amount,
  description,
  eligibility,
  documentsHelp,
  ctaLabel,
  ctaHref,
}: SubsidyBlockProps) {
  return (
    <Rect
      fill={tokens.card}
      stroke={tokens.hairline}
      cornerRadius={24}
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-col md:flex-row">
        {/* ── Left panel: dark-olive, scheme + amount ── */}
        <div
          className="flex flex-col justify-between p-8 md:p-10 w-full md:w-[45%]"
          style={{ background: tokens.pageBgDeep, flexShrink: 0 }}
        >
          <div>
            {/* Section kicker */}
            <div className="flex items-center gap-2 mb-6">
              <span
                style={{ width: 6, height: 6, borderRadius: 999, background: tokens.brand, flexShrink: 0 }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.16em]"
                style={{ color: tokens.brand, fontWeight: 700 }}
              >
                GOVERNMENT SUBSIDY
              </span>
            </div>

            {/* Scheme name */}
            <p
              className="text-[12px] uppercase tracking-[0.12em] font-semibold mb-3 max-w-[28ch]"
              style={{ color: tokens.inkMuted }}
            >
              {scheme}
            </p>

            {/* Big amount */}
            <p
              className="text-[56px] md:text-[64px] font-bold leading-[0.96] tracking-[-0.035em] tabular-nums mb-4"
              style={{ color: tokens.ink }}
            >
              {amount}
            </p>

            {/* Description */}
            <p
              className="text-[13px] leading-[1.6] max-w-[32ch]"
              style={{ color: tokens.body }}
            >
              {description}
            </p>
          </div>

          {/* Bottom note */}
          <div
            className="mt-8 pt-5"
            style={{ borderTop: `1px solid ${tokens.hairlineStrong}` }}
          >
            <p className="text-[11px] uppercase tracking-[0.12em] font-semibold" style={{ color: tokens.inkMuted }}>
              Central + state stacking possible
            </p>
          </div>
        </div>

        {/* ── Right panel: white, eligibility + CTA ── */}
        <div className="flex-1 flex flex-col p-8 md:p-10" style={{ background: tokens.card }}>
          {/* Eligibility heading */}
          <p
            className="text-[10px] uppercase tracking-[0.16em] mb-5"
            style={{ color: tokens.inkMuted, fontWeight: 700 }}
          >
            Eligibility
          </p>

          {/* Eligibility checklist */}
          <ul className="flex flex-col gap-3 mb-6 flex-1">
            {eligibility.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    background: tokens.accentSoft,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <Check size={11} weight="bold" color={tokens.accentLine} />
                </span>
                <span
                  className="text-[13px] leading-[1.5]"
                  style={{ color: tokens.body }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Documents help */}
          {documentsHelp && (
            <div
              className="mb-6 p-4"
              style={{
                background: tokens.pageBgDeep,
                borderRadius: 12,
              }}
            >
              <p
                className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-1"
                style={{ color: tokens.inkMuted }}
              >
                Documentation support
              </p>
              <p className="text-[12px] leading-[1.6]" style={{ color: tokens.body }}>
                {documentsHelp}
              </p>
            </div>
          )}

          {/* CTA */}
          <div>
            <a
              href={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 text-[13px] uppercase tracking-[0.08em] font-semibold transition-colors"
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
              {ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </Rect>
  );
}
