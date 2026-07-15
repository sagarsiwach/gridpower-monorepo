import type { PropsWithChildren } from "react";
import { Link } from "react-router";

import type { Placement } from "./manifest";

type PreviewShellProps = PropsWithChildren<{
  title: string;
  category: string;
  description: string;
  slug: string;
  placement: Placement;
}>;

export function PreviewShell({
  title,
  category,
  description,
  slug,
  placement,
  children,
}: PreviewShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-page-bg)] text-[var(--color-text-body)]">
      <PreviewHeader title={title} category={category} description={description} slug={slug} />

      <div className="flex-1 flex flex-col">
        {placement === "top" && (
          <>
            <div className="border-b border-[var(--color-border)]">{children}</div>
            <FillerBody />
          </>
        )}

        {placement === "below-nav" && (
          <>
            <NavScaffold />
            <div className="relative">{children}</div>
            <FillerBody />
          </>
        )}

        {placement === "stretch" && <div className="flex-1 relative">{children}</div>}

        {placement === "center" && (
          <div className="mx-auto w-full max-w-[var(--container-2xl)] px-12 py-24">
            <div className="mx-auto max-w-[var(--container-xl)]">{children}</div>
            <FillerBody compact />
          </div>
        )}

        {placement === "bottom" && (
          <>
            <FillerBody />
            {children}
          </>
        )}
      </div>
    </div>
  );
}

function PreviewHeader({
  title,
  category,
  description,
  slug,
}: {
  title: string;
  category: string;
  description: string;
  slug: string;
}) {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-neutral-900)] text-[var(--color-neutral-50)] px-12 py-4 flex items-center gap-8">
      <Link
        to="/preview"
        className="font-mono text-xs tracking-[0.08em] uppercase text-[var(--color-neutral-400)] hover:text-[var(--color-neutral-50)] transition-colors"
      >
        ← all variants
      </Link>
      <div className="h-5 w-px bg-[var(--color-neutral-700)]" aria-hidden="true" />
      <div className="flex items-center gap-6 flex-1">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red-muted)]">
          {category}
        </span>
        <span className="font-medium text-sm">{title}</span>
        <span className="font-mono text-xs text-[var(--color-neutral-500)]">/preview/{slug}</span>
      </div>
      <p className="hidden lg:block text-xs text-[var(--color-neutral-400)] max-w-md text-right">
        {description}
      </p>
    </header>
  );
}

function NavScaffold() {
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-page-bg)]">
      <div className="mx-auto max-w-[var(--container-2xl)] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-sm bg-[var(--color-gp-red)]" aria-hidden="true" />
          <span className="font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
            GridEnergy
          </span>
        </div>
        <div className="flex items-center gap-8 text-sm text-[var(--color-text-body)]">
          <span className="flex items-center gap-1">
            Solutions
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>Platform</span>
          <span>App</span>
          <span>Economics</span>
          <span>Resources</span>
          <span>Contact</span>
        </div>
        <div className="rounded-sm bg-[var(--color-gp-red)] text-[var(--color-neutral-50)] px-4 py-2 text-sm font-medium">
          Get early access
        </div>
      </div>
    </div>
  );
}

function FillerBody({ compact = false }: { compact?: boolean }) {
  return (
    <main className={`mx-auto w-full max-w-[var(--container-2xl)] px-12 ${compact ? "py-12" : "py-24"}`}>
      <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)] mb-4">
        Hero placeholder
      </p>
      <h1 className="font-display text-5xl font-semibold tracking-[-0.03em] text-[var(--color-text-heading)] leading-[1.05] mb-6">
        Storage that pays itself back.
      </h1>
      <p className="max-w-2xl text-[var(--color-text-body)] leading-[1.625]">
        This is a placeholder hero so the menu above feels like it lives on a real page. Ignore the
        copy. Focus on how the menu sits, scrolls, opens, and aligns with the brand.
      </p>
    </main>
  );
}
