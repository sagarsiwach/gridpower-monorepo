import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * StatusBadge — semantic status pill with a colored dot + label.
 * Mirrors the statusStyle pattern from StationsView.jsx and StatusGrid.
 * Variants: online (success), offline (error), maintenance (warning), inactive (muted).
 */
export const statusBadgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-pill px-2.5 py-0.5",
    "font-mono text-label font-medium",
  ],
  {
    variants: {
      status: {
        online: "bg-success-bg text-success",
        offline: "bg-sand-3 text-sand-9",
        maintenance: "bg-warning-bg text-warning",
        inactive: "bg-sand-3 text-sand-8",
      },
    },
    defaultVariants: {
      status: "offline",
    },
  }
);

const dotColorMap: Record<string, string> = {
  online: "bg-success",
  offline: "bg-sand-8",
  maintenance: "bg-warning",
  inactive: "bg-sand-7",
};

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  label?: string;
}

export function StatusBadge({
  className,
  status,
  label,
  children,
  ...props
}: StatusBadgeProps) {
  const resolvedStatus = status ?? "offline";
  const dotClass = dotColorMap[resolvedStatus] ?? "bg-sand-8";
  const displayLabel = label ?? children ?? resolvedStatus;

  return (
    <span
      className={cn(statusBadgeVariants({ status }), className)}
      {...props}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-pill", dotClass)} />
      <span className="capitalize">{displayLabel}</span>
    </span>
  );
}
