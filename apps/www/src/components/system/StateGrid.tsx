import { cn } from "@/lib/utils";

/*
  StateGrid.

  Renders a labeled grid of component states. Each cell labels itself
  (Default / Hover / Focus / Disabled / Loading) and renders the same
  component with that state forced. Hover and focus pseudo-classes can't
  be triggered at rest — we render them as if a real user were hovering
  using inline class composition. The component implementations expose
  a `data-state` hook (when needed) or use known utility classes the
  state simulator can target.

  Renders sized cells so the live samples sit at the same visual height
  per row regardless of variant.
*/

export type ComponentState =
  | "Default"
  | "Hover"
  | "Focus"
  | "Disabled"
  | "Loading";

export const ALL_STATES: ComponentState[] = [
  "Default",
  "Hover",
  "Focus",
  "Disabled",
  "Loading",
];

interface StateGridProps {
  states?: ComponentState[];
  rows: {
    label: string;
    caption?: string;
    cells: Partial<Record<ComponentState, React.ReactNode>>;
  }[];
  className?: string;
}

export function StateGrid({
  states = ALL_STATES,
  rows,
  className,
}: StateGridProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-neutral-50)]",
        className,
      )}
    >
      {/* Header */}
      <div
        className="grid border-b border-[var(--color-border)] bg-[var(--color-section-alt)]"
        style={{
          gridTemplateColumns: `220px repeat(${states.length}, minmax(0, 1fr))`,
        }}
      >
        <div className="px-5 py-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            Variant
          </p>
        </div>
        {states.map((state) => (
          <div
            key={state}
            className="border-l border-[var(--color-border)] px-5 py-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
              {state}
            </p>
          </div>
        ))}
      </div>

      {/* Rows */}
      <div>
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={cn(
              "grid items-stretch",
              idx > 0 && "border-t border-[var(--color-border)]",
            )}
            style={{
              gridTemplateColumns: `220px repeat(${states.length}, minmax(0, 1fr))`,
            }}
          >
            <div className="flex flex-col justify-center px-5 py-6">
              <p className="text-sm font-medium text-[var(--color-text-heading)]">
                {row.label}
              </p>
              {row.caption ? (
                <p className="mt-1 max-w-[28ch] text-xs leading-[1.5] text-[var(--color-text-muted)]">
                  {row.caption}
                </p>
              ) : null}
            </div>
            {states.map((state) => (
              <div
                key={state}
                className="flex items-center border-l border-[var(--color-border)] px-5 py-6"
              >
                {row.cells[state] ?? (
                  <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                    —
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
