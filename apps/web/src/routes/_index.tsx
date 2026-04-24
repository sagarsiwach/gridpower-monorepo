import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "GridPower — India generates. GridPower stores, charges, and powers." },
    {
      name: "description",
      content:
        "GridPower is building India's open energy storage, EV charging, and drive platform. Launching Q2 2026.",
    },
  ];
};

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-6 py-32">
        <p className="gp-label-red mb-4">GridPower / Homepage scaffold</p>
        <h1 className="font-heading text-display tracking-tight">
          India generates. GridPower stores, charges, and powers.
        </h1>
        <p className="gp-body-lg mt-6 max-w-2xl text-muted-foreground">
          This placeholder renders to prove the Phase 0 foundation works. WEB.2 remaps
          the full 12-section homepage from <code>_prototype/website/HomePage.jsx</code>.
        </p>
        <div className="mt-10 flex gap-4">
          <a
            href="/design-system"
            className="inline-flex items-center rounded-btn bg-primary px-6 py-3 text-white transition-colors hover:bg-grid-red-hover"
          >
            View design system
          </a>
        </div>
      </div>
    </div>
  );
}
