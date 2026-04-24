import * as React from "react";
import { cn } from "../lib/utils.js";

export interface Stat {
  /** Large display number, e.g. "180 GW", "< 2%", "3.3–240 kW" */
  value: string;
  /** Descriptive label underneath the number. */
  label: string;
  /** When true, the value renders in GridRed instead of heading colour. */
  accent?: boolean;
}

export interface NumbersBarProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: Stat[];
}

/**
 * NumbersBar — horizontal stat bar with N columns and dividers between.
 *
 * Renders responsively: stacked on mobile, horizontal on sm+.
 * Each stat = big display number + mono label underneath.
 *
 * @example
 * <NumbersBar stats={[
 *   { value: "Launch Q2 2026", label: "First deployments", accent: true },
 *   { value: "5 kWh – 1 MWh", label: "Storage range" },
 *   { value: "3.3 – 240 kW",  label: "Charging range" },
 *   { value: "2W / 3W / 4W",  label: "Powertrain platforms" },
 * ]} />
 */
const NumbersBar = React.forwardRef<HTMLDivElement, NumbersBarProps>(
  ({ stats, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid border-t border-border pt-10",
          className,
        )}
        style={{
          gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        }}
        {...props}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className={cn(
              "pr-6",
              i > 0 && "pl-6 border-l border-border",
            )}
          >
            <div
              className={cn(
                "font-heading text-h2 leading-tight mb-2",
                stat.accent ? "text-grid-red" : "text-foreground",
              )}
            >
              {stat.value}
            </div>
            <div className="font-mono text-label uppercase text-muted-foreground">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    );
  },
);
NumbersBar.displayName = "NumbersBar";

export { NumbersBar };
