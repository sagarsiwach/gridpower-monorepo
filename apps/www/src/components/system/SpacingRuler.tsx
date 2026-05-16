import { CodeToken } from "./Caption";

/*
  SpacingRuler.

  Renders one row of the spacing scale. The visual bar uses the token
  as its width so the eye can compare step-to-step at a glance. Mono
  metadata on the left holds token + px + rem; the bar fills the rest.

  Bars use GridRed at low chroma so the spacing scale reads as one
  cohesive family. No drop shadow, no gradient, no decorative tick marks.
*/

export interface SpacingData {
  token: string;       // --space-4
  px: string;          // "16px"
  rem: string;         // "1rem"
  usage: string;       // when this step fits
}

interface SpacingRulerProps {
  data: SpacingData;
  maxRem: number;      // largest step in current display set, for ratio
}

export function SpacingRuler({ data, maxRem }: SpacingRulerProps) {
  const remNumber = Number(data.rem.replace("rem", ""));
  const widthPct = maxRem > 0 ? Math.max(0.5, (remNumber / maxRem) * 100) : 0;

  return (
    <div className="grid grid-cols-1 items-center gap-3 border-t border-[var(--color-border)] py-4 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-8">
      <dl className="flex items-baseline justify-between gap-3">
        <dt>
          <CodeToken>{data.token}</CodeToken>
        </dt>
        <dd className="font-mono text-xs text-[var(--color-text-muted)]">
          {data.px} <span className="opacity-60">/</span> {data.rem}
        </dd>
      </dl>

      <div className="flex items-center gap-4">
        <div
          className="h-4 rounded-[var(--radius-xs)] bg-[var(--color-gp-red-tinted)]"
          style={{
            width: `${widthPct}%`,
            borderRight: "2px solid var(--color-gp-red)",
          }}
          aria-hidden="true"
        />
        <p className="text-xs text-[var(--color-text-muted)]">{data.usage}</p>
      </div>
    </div>
  );
}
