import { Link } from "react-router";

import { VARIANTS } from "./manifest";

export default function PreviewIndex() {
  const grouped = VARIANTS.reduce<Record<string, typeof VARIANTS>>((acc, v) => {
    (acc[v.category] ||= []).push(v);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-body)]">
      <header className="border-b border-[var(--color-border)] px-12 py-12 max-w-[var(--container-2xl)] mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)] mb-4">
          Preview · full-screen variants
        </p>
        <h1 className="font-display text-5xl font-semibold tracking-[-0.03em] text-[var(--color-text-heading)] leading-[1.05] mb-4">
          Walk through every menu at full screen.
        </h1>
        <p className="max-w-2xl text-[var(--color-text-body)] leading-[1.625]">
          Each variant gets its own route with a placeholder body so you can see how it feels in
          context. Click in, scroll, walk back. The composed two-bar nav with mega-menu open is also
          here.
        </p>
        <div className="mt-8 flex gap-3 flex-wrap">
          <Link
            to="/preview/full-nav"
            className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-gp-red)] text-[var(--color-neutral-50)] px-4 py-2 text-sm font-medium hover:bg-[var(--color-gp-red-hover)] transition-colors"
          >
            Full two-bar with mega-menu open →
          </Link>
          <Link
            to="/system/menus"
            className="inline-flex items-center gap-2 rounded-sm border border-[var(--color-border-strong)] px-4 py-2 text-sm font-medium text-[var(--color-text-heading)] hover:bg-[var(--color-neutral-100)] transition-colors"
          >
            Side-by-side comparison (/system/menus)
          </Link>
        </div>
      </header>

      <section className="px-12 py-16 max-w-[var(--container-2xl)] mx-auto space-y-16">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h2 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-6">
              {category}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((v) => (
                <li key={v.slug}>
                  <Link
                    to={`/preview/${v.slug}`}
                    className="block rounded-md border border-[var(--color-border)] bg-[var(--color-card-on-page)] p-6 transition-colors hover:border-[var(--color-border-strong)]"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-[var(--color-text-heading)]">{v.title}</h3>
                      <span className="font-mono text-xs text-[var(--color-text-muted)]">
                        /preview/{v.slug}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-body)] leading-[1.625]">
                      {v.description}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
