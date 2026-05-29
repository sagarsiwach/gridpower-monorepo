import { Link } from "react-router-dom";

import { UtilityMinimalMono } from "../../components/menus/utility/UtilityMinimalMono";
import { MegaAudienceGrid } from "../../components/menus/mega/MegaAudienceGrid";

/*
  Composed two-bar nav showcase.

  Top bar: utility (about / partners / support / sign in)
  Main bar: solutions-led primary nav with logo, links, CTA
  Below: mega-menu opened on "Solutions" (audience grid variant)

  Below the nav, a placeholder hero so the menu sits on a real page.
*/

const NAV_ITEMS = [
  { label: "Solutions", hasMenu: true, active: true },
  { label: "Platform", hasMenu: false },
  { label: "App", hasMenu: false },
  { label: "Economics", hasMenu: false },
  { label: "Resources", hasMenu: false },
  { label: "Contact", hasMenu: false },
];

export default function FullNavPreview() {
  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-body)]">
      <PreviewHeader />

      {/* Two-bar nav stack */}
      <div className="relative">
        <UtilityMinimalMono />
        <MainBar />
        <div className="border-b border-[var(--color-border)] bg-[var(--color-card-on-page)] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.08)]">
          <MegaAudienceGrid />
        </div>
      </div>

      {/* Hero placeholder beneath */}
      <main className="mx-auto w-full max-w-[var(--container-2xl)] px-12 py-24">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)] mb-4">
          GRIDENERGY · BATTERY STORAGE
        </p>
        <h1 className="font-display text-6xl font-semibold tracking-[-0.03em] text-[var(--color-text-heading)] leading-[1.05] mb-6 max-w-4xl">
          Storage that pays itself back.
        </h1>
        <p className="text-lg text-[var(--color-text-body)] leading-[1.625] max-w-2xl mb-8">
          18 to 36 months on a typical commercial install. GridOS gives every operator a console
          that does not lie. The mega-menu above is the production routing surface — pick the
          audience you sell into and see solutions, products, and resources for it.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-sm bg-[var(--color-gp-red)] text-[var(--color-neutral-50)] px-6 py-3 text-base font-medium hover:bg-[var(--color-gp-red-hover)] transition-colors"
          >
            Request a quote
          </button>
          <button
            type="button"
            className="rounded-sm border border-[var(--color-border-strong)] text-[var(--color-text-heading)] px-6 py-3 text-base font-medium hover:bg-[var(--color-neutral-100)] transition-colors"
          >
            Talk to sales →
          </button>
        </div>
      </main>
    </div>
  );
}

function PreviewHeader() {
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
          COMPOSED · TWO-BAR + MEGA OPEN
        </span>
        <span className="font-medium text-sm">Full nav system</span>
        <span className="font-mono text-xs text-[var(--color-neutral-500)]">/preview/full-nav</span>
      </div>
      <p className="hidden lg:block text-xs text-[var(--color-neutral-400)] max-w-md text-right">
        Top utility bar + sticky main nav + mega-menu open on Solutions. The locked production
        composition.
      </p>
    </header>
  );
}

function MainBar() {
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-page-bg)]/95 backdrop-blur">
      <div className="mx-auto max-w-[var(--container-2xl)] px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="GridEnergy home">
          <div className="h-7 w-7 rounded-sm bg-[var(--color-gp-red)]" aria-hidden="true" />
          <span className="font-display font-semibold text-base tracking-[-0.02em] text-[var(--color-text-heading)]">
            GridEnergy
          </span>
        </Link>

        <nav>
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <span
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    item.active
                      ? "text-[var(--color-text-heading)]"
                      : "text-[var(--color-text-body)] hover:text-[var(--color-text-heading)]"
                  }`}
                >
                  {item.label}
                  {item.hasMenu && (
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      aria-hidden="true"
                      className={item.active ? "rotate-180 transition-transform" : "transition-transform"}
                    >
                      <path
                        d="M2.5 3.75L5 6.25L7.5 3.75"
                        stroke="currentColor"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="rounded-sm bg-[var(--color-gp-red)] text-[var(--color-neutral-50)] px-4 py-2 text-sm font-medium"
        >
          Get early access
        </button>
      </div>
    </div>
  );
}
