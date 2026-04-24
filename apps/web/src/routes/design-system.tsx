import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  return [
    { title: "Design system — GridPower" },
    { name: "robots", content: "noindex" },
  ];
};

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-32">
        <p className="gp-label-red mb-4">GridPower / Design system</p>
        <h1 className="font-heading text-h1 tracking-tight">Component showcase</h1>
        <p className="gp-body-lg mt-6 max-w-2xl text-muted-foreground">
          DS.5 populates this route with the full 20-section showcase (primitives, cards,
          nav, feedback, utility, iconography, dark-mode parity, anti-patterns) once
          DS.1–4 land.
        </p>
        <section className="mt-16 grid grid-cols-4 gap-4">
          {[100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000, 1050].map((w, i) => (
            <div
              key={i}
              className="h-16 rounded-md border border-border"
              style={{
                background: `var(--sand-${i + 1})`,
              }}
              title={`sand-${i + 1}`}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
