import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

const statCardVariants = cva(
  "flex flex-col gap-2 rounded-card border p-5",
  {
    variants: {
      theme: {
        light: "bg-card border-border",
        dark: "bg-dark-2 border-dark-6",
      },
    },
    defaultVariants: {
      theme: "light",
    },
  }
);

export type TrendDirection = "up" | "down" | "neutral";

export interface StatCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statCardVariants> {
  /** Metric label */
  label: string;
  /** Big number / primary value */
  value: React.ReactNode;
  /** Trend text, e.g. "↑ 12%" or "stable" */
  trend?: string;
  /** Direction for colour coding */
  trendDir?: TrendDirection;
}

const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, theme, label, value, trend, trendDir = "neutral", ...props }, ref) => {
    const isDark = theme === "dark";

    const trendColor =
      trendDir === "up"
        ? "text-success"
        : trendDir === "down"
          ? "text-error"
          : isDark
            ? "text-dark-9"
            : "text-sand-9";

    const TrendIcon =
      trendDir === "up"
        ? TrendingUp
        : trendDir === "down"
          ? TrendingDown
          : null;

    return (
      <div ref={ref} className={cn(statCardVariants({ theme }), className)} {...props}>
        <span
          className={cn(
            "font-mono text-label uppercase tracking-widest",
            isDark ? "text-dark-9" : "text-sand-9"
          )}
        >
          {label}
        </span>
        <div
          className={cn(
            "font-display text-h2 font-semibold leading-none",
            isDark ? "text-dark-12" : "text-foreground"
          )}
        >
          {value}
        </div>
        {trend && (
          <div className={cn("flex items-center gap-1 font-mono text-label", trendColor)}>
            {TrendIcon && <TrendIcon className="h-3 w-3" />}
            {trend}
          </div>
        )}
      </div>
    );
  }
);
StatCard.displayName = "StatCard";

export { StatCard };
