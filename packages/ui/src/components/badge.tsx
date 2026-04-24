import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5 rounded-pill",
    "font-mono text-label font-medium transition-colors duration-fast",
    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        solid: "px-2.5 py-0.5",
        outline: "px-2.5 py-0.5 border",
        dot: "px-2.5 py-0.5",
      },
      color: {
        neutral: "",
        red: "",
        success: "",
        warning: "",
        error: "",
      },
    },
    compoundVariants: [
      // solid
      {
        variant: "solid",
        color: "neutral",
        className: "bg-sand-3 text-sand-11",
      },
      {
        variant: "solid",
        color: "red",
        className: "bg-grid-red-bg text-grid-red",
      },
      {
        variant: "solid",
        color: "success",
        className: "bg-success-bg text-success",
      },
      {
        variant: "solid",
        color: "warning",
        className: "bg-warning-bg text-warning",
      },
      {
        variant: "solid",
        color: "error",
        className: "bg-error-bg text-error",
      },
      // outline
      {
        variant: "outline",
        color: "neutral",
        className: "border-sand-6 text-sand-11",
      },
      {
        variant: "outline",
        color: "red",
        className: "border-grid-red text-grid-red",
      },
      {
        variant: "outline",
        color: "success",
        className: "border-success text-success",
      },
      {
        variant: "outline",
        color: "warning",
        className: "border-warning text-warning",
      },
      {
        variant: "outline",
        color: "error",
        className: "border-error text-error",
      },
      // dot (same bg as solid, just adds a colored dot child — handled by consumer)
      {
        variant: "dot",
        color: "neutral",
        className: "bg-sand-3 text-sand-11",
      },
      {
        variant: "dot",
        color: "red",
        className: "bg-grid-red-bg text-grid-red",
      },
      {
        variant: "dot",
        color: "success",
        className: "bg-success-bg text-success",
      },
      {
        variant: "dot",
        color: "warning",
        className: "bg-warning-bg text-warning",
      },
      {
        variant: "dot",
        color: "error",
        className: "bg-error-bg text-error",
      },
    ],
    defaultVariants: {
      variant: "solid",
      color: "neutral",
    },
  }
);

export type BadgeColor = "neutral" | "red" | "success" | "warning" | "error";

export interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color"> {
  variant?: "solid" | "outline" | "dot";
  color?: BadgeColor | null;
}

export function Badge({ className, variant, color, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, color }), className)} {...props}>
      {variant === "dot" && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-pill shrink-0",
            color === "neutral" && "bg-sand-9",
            color === "red" && "bg-grid-red",
            color === "success" && "bg-success",
            color === "warning" && "bg-warning",
            color === "error" && "bg-error"
          )}
        />
      )}
      {children}
    </div>
  );
}
