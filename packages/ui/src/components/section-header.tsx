import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";
import { SectionLabel, type SectionLabelProps } from "./section-label.js";

const sectionHeaderVariants = cva("", {
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export interface SectionHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sectionHeaderVariants> {
  /** Text for the SectionLabel eyebrow above the heading. */
  label?: React.ReactNode;
  /** Optional number prefix passed through to SectionLabel. */
  labelNumber?: string;
  /** Variant for SectionLabel: "red" | "neutral". Defaults to "red". */
  labelVariant?: SectionLabelProps["variant"];
  /** The H2 heading text. */
  heading: React.ReactNode;
  /** Optional lead paragraph below the heading. */
  lead?: React.ReactNode;
}

/**
 * SectionHeader — canonical section opening composition.
 *
 * Renders: `SectionLabel` (optional) → `<h2>` → optional lead `<p>`.
 * Variants: `left` (default) / `center`.
 *
 * @example
 * <SectionHeader
 *   label="THREE VERTICALS · ONE PLATFORM"
 *   heading="Every layer of the energy stack."
 *   lead="Storage, charging, and powertrain — one open platform."
 * />
 *
 * <SectionHeader
 *   align="center"
 *   label="THE PLATFORM"
 *   heading="Built on open standards."
 * />
 */
const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      label,
      labelNumber,
      labelVariant = "red",
      heading,
      lead,
      align,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(sectionHeaderVariants({ align }), className)}
        {...props}
      >
        {label != null && (
          <SectionLabel variant={labelVariant} number={labelNumber}>
            {label}
          </SectionLabel>
        )}

        <h2 className="font-heading text-h2 text-heading tracking-[-0.01em] leading-tight mb-4">
          {heading}
        </h2>

        {lead != null && (
          <p className="font-body text-body-lg text-body leading-relaxed mt-2">
            {lead}
          </p>
        )}
      </div>
    );
  },
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader, sectionHeaderVariants };
