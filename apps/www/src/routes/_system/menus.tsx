/*
  Placeholder owned by Agent B (SAG-2991 family).

  Agent B will overwrite the content of this route with the menus showcase
  (mega-menu, dropdowns, mobile sheet). The route + import wiring in
  App.tsx is owned by Agent A and is already in place.

  Do not delete this file. Replace its body only.
*/
export default function MenusRoute() {
  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] px-6 py-24 text-[var(--color-text-body)]">
      <div className="mx-auto max-w-[var(--container-2xl)]">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          /system/menus
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--color-text-heading)]">
          Menus content from Agent B
        </h1>
        <p className="mt-4 max-w-[60ch] text-[var(--color-text-muted)]">
          This route is reserved. The menus showcase (mega-menu, dropdowns,
          mobile sheet) lands when Agent B completes its track.
        </p>
      </div>
    </div>
  );
}
