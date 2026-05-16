import { Link } from "react-router-dom";

/*
  Utility bar — Variant B: Pill buttons.
  Higher-emphasis utility row. The right cluster reads as small chips,
  the Sign-in cell switches to a GridRed-tinted pill to flag account access.
  Deliberately different IA from Variant A: the left side carries a
  status-style live indicator instead of a tagline, which positions the
  bar as a "system state" cue rather than just nav decoration.
*/

const STATUS = {
  label: "GridOS",
  hint: "All systems operational",
};

const PILL_LINKS = [
  { label: "About", href: "/about" },
  { label: "Partners", href: "/partners" },
  { label: "Support", href: "/support" },
];

export function UtilityPillButtons() {
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-neutral-50)]">
      <div className="mx-auto flex max-w-[var(--container-2xl)] items-center justify-between gap-4 px-5 py-2.5 sm:px-8">
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-form-success)" }}
            aria-hidden="true"
          />
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-heading)]">
            {STATUS.label}
          </span>
          <span className="font-mono text-xs text-[var(--color-text-muted)]">
            · {STATUS.hint}
          </span>
        </div>

        <nav className="flex items-center gap-1.5">
          {PILL_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-full px-3 py-1 text-xs text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-hover)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-heading)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/sign-in"
            className="ml-1 rounded-full border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-3 py-1 text-xs font-medium text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-hover)] hover:border-[var(--color-gp-red)] hover:text-[var(--color-gp-red)]"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </div>
  );
}
