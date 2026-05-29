import { Link, useLocation } from "react-router";
import { TopUtilityBar } from "../nav/TopUtilityBar";
import { MainNav } from "../nav/MainNav";
import { Footer } from "../footer/Footer";
import { cn } from "@/lib/utils";

/*
  SystemPageShell.

  Persistent chrome for every /system/* route. Production nav + footer
  bookend a documentation-style header with a left rail of pages so
  switching between sections is a single click.

  Why a rail (and not a top tab bar): the catalog will grow. A vertical
  rail accommodates 6-30 sections without wrapping or eating heading space.
  Linear, Vercel, Stripe docs all converge here for the same reason.
*/

export interface SystemSection {
  href: string;
  label: string;
  summary: string;
  status: "Ready" | "Draft" | "Owned by Agent B";
}

export const SYSTEM_SECTIONS: SystemSection[] = [
  {
    href: "/system",
    label: "Index",
    summary: "Catalogue of every system page.",
    status: "Ready",
  },
  {
    href: "/system/tokens",
    label: "Tokens",
    summary: "Color, type, spacing, radii, motion.",
    status: "Ready",
  },
  {
    href: "/system/buttons",
    label: "Buttons",
    summary: "Four variants, five sizes, five states.",
    status: "Ready",
  },
  {
    href: "/system/forms",
    label: "Forms",
    summary: "Inputs, labels, helper text, error states.",
    status: "Ready",
  },
  {
    href: "/system/cards",
    label: "Cards",
    summary: "Bento composition rules. No identical grids.",
    status: "Ready",
  },
  {
    href: "/system/menus",
    label: "Menus",
    summary: "Mega-menu, dropdowns, mobile sheets.",
    status: "Owned by Agent B",
  },
];

interface SystemPageShellProps {
  eyebrow: string;
  title: string;
  lede: string;
  children: React.ReactNode;
}

export function SystemPageShell({
  eyebrow,
  title,
  lede,
  children,
}: SystemPageShellProps) {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-body)]">
      <TopUtilityBar />
      <MainNav />

      <header className="border-b border-[var(--color-border)] bg-[var(--color-section-alt)]">
        <div className="mx-auto max-w-[var(--container-2xl)] px-6 py-16 lg:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-heading)] lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-[68ch] text-lg leading-[1.625] text-[var(--color-text-body)]">
            {lede}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[var(--container-2xl)] px-6 py-16 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              System
            </p>
            <ul className="space-y-1">
              {SYSTEM_SECTIONS.map((section) => {
                const active = section.href === pathname;
                return (
                  <li key={section.href}>
                    <Link
                      to={section.href}
                      className={cn(
                        "group flex items-center justify-between rounded-[var(--radius-xs)] px-3 py-2 text-sm transition-colors duration-[var(--duration-hover)]",
                        active
                          ? "bg-[var(--color-gp-red-tinted)] text-[var(--color-gp-red)]"
                          : "text-[var(--color-text-body)] hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-text-heading)]",
                      )}
                    >
                      <span className="font-medium">{section.label}</span>
                      {section.status !== "Ready" ? (
                        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                          {section.status === "Owned by Agent B"
                            ? "Pending"
                            : section.status}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>

          <main className="min-w-0">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/*
  SystemSection — vertical rhythm between content blocks.
  Title + optional caption + slot. Slot decides its own internal layout.
*/

interface SystemBlockProps {
  id?: string;
  eyebrow?: string;
  title: string;
  caption?: string;
  children: React.ReactNode;
  className?: string;
}

export function SystemBlock({
  id,
  eyebrow,
  title,
  caption,
  children,
  className,
}: SystemBlockProps) {
  return (
    <section
      id={id}
      className={cn("border-t border-[var(--color-border)] py-16 first:border-t-0 first:pt-0", className)}
    >
      <div className="mb-10 max-w-[68ch]">
        {eyebrow ? (
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-3xl font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--color-text-heading)]">
          {title}
        </h2>
        {caption ? (
          <p className="mt-4 text-base leading-[1.625] text-[var(--color-text-body)]">
            {caption}
          </p>
        ) : null}
      </div>
      <div>{children}</div>
    </section>
  );
}
