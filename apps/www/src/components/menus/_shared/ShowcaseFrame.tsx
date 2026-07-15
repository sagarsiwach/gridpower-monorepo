import type { ReactNode } from "react";

/*
  Showcase frame for /system/menus.
  Wraps each menu variant so the page reads as a catalog, not a finished site.
  - Type-section heading and description live at section level.
  - Each variant lives inside a labelled VariantSlot.
  - Variants render their actual interactive component inside.
*/

export function MenuTypeSection({
  number,
  id,
  title,
  description,
  children,
}: {
  number: string;
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="border-t border-[var(--color-border)] scroll-mt-24"
    >
      <div className="mx-auto max-w-[var(--container-2xl)] px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_1fr]">
          <header className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)]">
              Type {number}
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
              {title}
            </h2>
            <p className="mt-4 max-w-[36ch] text-sm leading-[1.625] text-[var(--color-text-body)]">
              {description}
            </p>
          </header>

          <div className="space-y-10">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function VariantSlot({
  letter,
  label,
  rationale,
  surface = "page",
  children,
}: {
  letter: string;
  label: string;
  rationale: string;
  surface?: "page" | "section" | "inverted" | "edge";
  children: ReactNode;
}) {
  const surfaceClass =
    surface === "section"
      ? "bg-[var(--color-section-alt)]"
      : surface === "inverted"
      ? "bg-[var(--color-neutral-900)]"
      : surface === "edge"
      ? "bg-[var(--color-neutral-50)]"
      : "bg-[var(--color-page-bg)]";

  return (
    <article className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)]">
      <div className="flex items-baseline justify-between gap-6 border-b border-[var(--color-border)] bg-[var(--color-neutral-50)] px-5 py-3">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Variant {letter}
          </span>
          <h3 className="font-display text-base font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
            {label}
          </h3>
        </div>
        <p className="hidden max-w-[52ch] text-xs leading-[1.625] text-[var(--color-text-muted)] md:block">
          {rationale}
        </p>
      </div>
      <p className="border-b border-[var(--color-border)] bg-[var(--color-neutral-50)] px-5 pb-3 text-xs leading-[1.625] text-[var(--color-text-muted)] md:hidden">
        {rationale}
      </p>
      <div className={surfaceClass}>{children}</div>
    </article>
  );
}

/*
  Small visual that mimics a website "below the fold" so primary nav
  and breadcrumb variants have realistic context (not floating in void).
*/
export function PageContext({ children }: { children?: ReactNode }) {
  return (
    <div className="px-6 py-12 sm:px-10">
      <div className="grid gap-6 md:grid-cols-[1fr_auto]">
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Below the fold
          </p>
          <p className="max-w-[58ch] font-display text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
            Storage and charging that pay themselves back. Visible from your phone.
          </p>
          <p className="max-w-[68ch] text-sm leading-[1.625] text-[var(--color-text-body)]">
            This is placeholder body content so the menu sits over a realistic page,
            not floating in void. The point of this slot is the menu above it.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
