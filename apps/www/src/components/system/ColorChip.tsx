import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

/*
  ColorChip.

  Renders a swatch plus its identity. Click to copy the var() reference.
  Each chip shows three pieces of information:
    - The CSS variable name (var(--color-...))
    - The OKLCH value
    - The approximate sRGB hex (for designers used to hex)

  The hex is an approximation. OKLCH is the source of truth — DESIGN.md
  is explicit: never #000, never #fff, always tinted neutrals. Hex shows
  up here purely as a familiarity bridge for designers.
*/

export interface ColorChipData {
  token: string;          // CSS var name (without var() wrapper)
  oklch: string;          // OKLCH string e.g. "oklch(0.58 0.245 27)"
  hex?: string;           // approximate sRGB hex
  label: string;          // human label e.g. "neutral-50 — Snow"
  role?: string;          // e.g. "Page background"
  contrast?: "light" | "dark"; // text color to use ON this surface
}

interface ColorChipProps {
  data: ColorChipData;
  size?: "default" | "lg";
}

type CopyKind = "token" | "oklch" | "hex";

export function ColorChip({ data, size = "default" }: ColorChipProps) {
  const [copied, setCopied] = useState<CopyKind | null>(null);

  const handleCopy = useCallback(async (value: string, kind: CopyKind) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1400);
    } catch {
      /* clipboard unsupported — silent fail */
    }
  }, []);

  const swatchHeight = size === "lg" ? "h-32" : "h-24";

  return (
    <div className="group flex flex-col">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--radius-sm)] border border-[var(--color-border)]",
          swatchHeight,
        )}
        style={{ backgroundColor: `var(${data.token})` }}
      >
        {data.role ? (
          <span
            className={cn(
              "absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-[0.08em]",
              data.contrast === "dark"
                ? "text-[var(--color-neutral-50)]"
                : "text-[var(--color-neutral-900)]",
            )}
          >
            {data.role}
          </span>
        ) : null}
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium text-[var(--color-text-heading)]">
          {data.label}
        </p>
      </div>

      <dl className="mt-2 space-y-1.5">
        <CopyRow
          term="var"
          kind="token"
          value={`var(${data.token})`}
          active={copied === "token"}
          onCopy={handleCopy}
        />
        <CopyRow
          term="oklch"
          kind="oklch"
          value={data.oklch}
          active={copied === "oklch"}
          onCopy={handleCopy}
        />
        {data.hex ? (
          <CopyRow
            term="hex"
            kind="hex"
            value={data.hex}
            active={copied === "hex"}
            onCopy={handleCopy}
          />
        ) : null}
      </dl>
    </div>
  );
}

function CopyRow({
  term,
  kind,
  value,
  active,
  onCopy,
}: {
  term: string;
  kind: CopyKind;
  value: string;
  active: boolean;
  onCopy: (value: string, kind: CopyKind) => void;
}) {
  const handleClick = useCallback(() => onCopy(value, kind), [onCopy, value, kind]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group/row flex w-full items-center justify-between gap-3 text-left transition-colors duration-[var(--duration-hover)] hover:opacity-100"
      aria-label={`Copy ${term} value`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
        {term}
      </span>
      <span className="truncate font-mono text-xs text-[var(--color-text-body)] group-hover/row:text-[var(--color-text-heading)]">
        {active ? "Copied" : value}
      </span>
    </button>
  );
}
