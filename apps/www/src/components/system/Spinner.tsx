import { cn } from "@/lib/utils";

/*
  Spinner.

  Single-purpose loading indicator. Two ring tones — one neutral, one
  bright — so a primary CTA shows a bright ring against its filled bg
  and a secondary button shows a neutral ring against transparent.

  Size matches Lucide icons in our buttons: 14-16px to sit beside text
  without dominating it. The ring rotates with CSS animation so motion
  preferences are honored by the browser without a JS framework hop.
*/

interface SpinnerProps {
  tone?: "inverse" | "neutral" | "brand";
  size?: number;
  className?: string;
}

export function Spinner({
  tone = "neutral",
  size = 14,
  className,
}: SpinnerProps) {
  const stroke =
    tone === "inverse"
      ? "var(--color-neutral-50)"
      : tone === "brand"
        ? "var(--color-gp-red)"
        : "var(--color-text-body)";

  return (
    <span
      className={cn("inline-block animate-spin", className)}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke={stroke}
          strokeOpacity="0.25"
          strokeWidth="2.5"
        />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke={stroke}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
