import { useParams, Link } from "react-router-dom";

import { VARIANTS_BY_SLUG } from "./manifest";
import { PreviewShell } from "./PreviewShell";

export default function VariantPreview() {
  const { slug } = useParams<{ slug: string }>();
  const entry = slug ? VARIANTS_BY_SLUG[slug] : undefined;

  if (!entry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-page-bg)] text-center p-12">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-gp-red)] mb-4">
          Variant not found
        </p>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text-heading)] mb-6">
          {slug ? `No variant named "${slug}".` : "No slug provided."}
        </h1>
        <Link
          to="/preview"
          className="inline-flex items-center gap-2 rounded-sm bg-[var(--color-gp-red)] text-[var(--color-neutral-50)] px-4 py-2 text-sm font-medium"
        >
          ← Back to all variants
        </Link>
      </div>
    );
  }

  const Component = entry.Component;
  return (
    <PreviewShell
      title={entry.title}
      category={entry.category}
      description={entry.description}
      slug={entry.slug}
      placement={entry.placement}
    >
      <Component />
    </PreviewShell>
  );
}
