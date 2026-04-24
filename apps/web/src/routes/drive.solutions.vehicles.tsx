import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => [
  { title: "GridPower — drive.solutions.vehicles (placeholder)" },
  { name: "robots", content: "noindex" },
];

export default function drive_solutions_vehiclesPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-32">
      <p className="gp-label-red mb-4">Placeholder route</p>
      <h1 className="font-heading text-h1">drive.solutions.vehicles</h1>
      <p className="gp-body-lg mt-4 text-muted-foreground">
        This route is replaced by a Phase 2 sub-issue agent.
      </p>
    </main>
  );
}
