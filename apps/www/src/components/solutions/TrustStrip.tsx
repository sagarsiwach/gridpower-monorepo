import type { CSSProperties } from "react";
import { tokens } from "../../routes/_preview/_v3-tokens";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface TrustStat {
  label: string;
  value: string;
  /** e.g. "11 states · 5 sectors" */
  sub: string;
}

export interface TrustPartner {
  name: string;
  /** If absent, renders the partner name as muted Inter caps text */
  logoSrc?: string;
}

export interface TrustStripProps {
  stats: TrustStat[];
  partners?: TrustPartner[];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

/**
 * TrustStrip — counter row + partner logo strip.
 *
 * Stat row mirrors the v3-website StatStrip MicroFact pattern:
 * 4-cell card with hairline dividers, dense Fold-style layout.
 * Partner row below: logo img when logoSrc provided, name in muted
 * Inter caps otherwise. Responsive: stat grid collapses to 2-col on
 * mobile; partner row wraps naturally.
 */
export function TrustStrip({ stats, partners }: TrustStripProps) {
  return (
    <div
      style={{
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      {/* Stat card */}
      <div
        style={{
          background: tokens.card,
          border: `1px solid ${tokens.hairline}`,
          borderRadius: 24,
          overflow: "hidden",
        }}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`,
          }}
        >
          {stats.map((s, i) => (
            <StatCell key={s.label} stat={s} first={i === 0} />
          ))}
        </div>
      </div>

      {/* Partner strip */}
      {partners && partners.length > 0 && (
        <div
          className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-6"
          aria-label="Partners and certifications"
        >
          <span
            className="text-[10px] uppercase tracking-[0.14em]"
            style={{ color: tokens.muted, fontWeight: 600, flexShrink: 0 }}
          >
            Trusted by
          </span>
          <span
            style={{
              width: 1,
              height: 16,
              background: tokens.hairlineStrong,
              flexShrink: 0,
            }}
          />
          {partners.map((p) => (
            <PartnerMark key={p.name} partner={p} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Private atoms                                                      */
/* ------------------------------------------------------------------ */

function StatCell({ stat, first }: { stat: TrustStat; first: boolean }) {
  const dividerStyle: CSSProperties = first
    ? {}
    : { borderLeft: `1px solid ${tokens.hairline}` };

  return (
    <div className="p-6" style={dividerStyle}>
      <p
        className="text-[10px] uppercase tracking-[0.14em] mb-2"
        style={{ color: tokens.muted, fontWeight: 700 }}
      >
        {stat.label}
      </p>
      <p
        className="text-[32px] font-bold tracking-[-0.03em] leading-none"
        style={{ color: tokens.ink }}
      >
        {stat.value}
      </p>
      <p className="text-[11px] mt-2" style={{ color: tokens.inkMuted }}>
        {stat.sub}
      </p>
    </div>
  );
}

function PartnerMark({ partner }: { partner: TrustPartner }) {
  if (partner.logoSrc) {
    return (
      <img
        src={partner.logoSrc}
        alt={partner.name}
        loading="lazy"
        style={{
          height: 24,
          width: "auto",
          objectFit: "contain",
          opacity: 0.65,
          filter: "grayscale(100%)",
        }}
      />
    );
  }

  // Fallback: render name as muted Inter caps
  return (
    <span
      className="text-[11px] uppercase tracking-[0.14em]"
      style={{ color: tokens.muted, fontWeight: 600 }}
    >
      {partner.name}
    </span>
  );
}
