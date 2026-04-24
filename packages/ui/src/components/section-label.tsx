import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

const sectionLabelVariants = cva(
  // Base: matches .gp-label / .gp-label-red — font-mono, text-label size (12px),
  // letter-spacing 0.08em (baked into the text-label fontSize token),
  // uppercase, weight 500, mb-4 (16px = --stack-normal).
  "font-mono text-label uppercase mb-4 block",
  {
    variants: {
      variant: {
        /** GridRed — default, used on light sand backgrounds */
        red: "text-grid-red",
        /** Muted — used on dark backgrounds or secondary contexts */
        neutral: "text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "red",
    },
  },
);

export interface SectionLabelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionLabelVariants> {
  /**
   * Optional numeric prefix rendered before the label text.
   * Pass a pre-formatted string like `"01"` — the component inserts
   * a separator: `"01 / LABEL TEXT"`.
   */
  number?: string;
}

/**
 * SectionLabel — uppercase mono eyebrow label.
 *
 * Matches the `.gp-label-red` (default) and `.gp-label` (neutral)
 * patterns from `@gridpower/tokens`.
 *
 * @example
 * // Basic
 * <SectionLabel>GRIDENERGY</SectionLabel>
 *
 * // With number prefix
 * <SectionLabel number="01">THE CHALLENGE</SectionLabel>
 *
 * // Neutral variant (dark bg)
 * <SectionLabel variant="neutral">GET IN TOUCH</SectionLabel>
 */
const SectionLabel = React.forwardRef<HTMLDivElement, SectionLabelProps>(
  ({ variant, number, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(sectionLabelVariants({ variant }), className)}
        {...props}
      >
        {number != null ? `${number} / ${children}` : children}
      </div>
    );
  },
);
SectionLabel.displayName = "SectionLabel";

export { SectionLabel, sectionLabelVariants };
