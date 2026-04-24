import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

/**
 * Pill — uppercase mono section-label style.
 * Matches `.gp-label-red` and `.gp-label` from tokens.css.
 * Used as section labels, category tags, and UI markers.
 */
export const pillVariants = cva(
  [
    "inline-flex items-center rounded-pill px-3 py-1",
    "font-mono text-label uppercase tracking-widest font-medium",
  ],
  {
    variants: {
      variant: {
        red: "text-grid-red bg-grid-red-bg",
        neutral: "text-sand-9 bg-sand-3",
      },
    },
    defaultVariants: {
      variant: "red",
    },
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {}

export function Pill({ className, variant, ...props }: PillProps) {
  return (
    <span className={cn(pillVariants({ variant }), className)} {...props} />
  );
}
