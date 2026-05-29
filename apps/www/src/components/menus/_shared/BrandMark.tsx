import { Link } from "react-router";

/*
  Brand mark used inside primary nav variants.
  Square GridRed glyph + "GridPower" wordmark.
  Same DOM across variants so type/letterspacing decisions are visible
  side-by-side.
*/
export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      aria-label="GridPower home"
      className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gp-red)]/50"
    >
      <span
        className="block h-6 w-6 rounded-[var(--radius-xs)]"
        style={{ backgroundColor: "var(--color-gp-red)" }}
        aria-hidden="true"
      />
      {!compact ? (
        <span className="font-display text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
          GridPower
        </span>
      ) : null}
    </Link>
  );
}
