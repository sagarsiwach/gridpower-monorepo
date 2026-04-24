import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

const processStepsVariants = cva("", {
  variants: {
    orientation: {
      horizontal:
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-card overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-border",
      vertical: "flex flex-col gap-0 border border-border rounded-card overflow-hidden divide-y divide-border",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface ProcessStep {
  /** Display number string, e.g. "01", "02". Auto-generated if omitted. */
  number?: string;
  title: string;
  description: string;
}

export interface ProcessStepsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof processStepsVariants> {
  steps: ProcessStep[];
}

/**
 * ProcessSteps — numbered steps list.
 *
 * Orientation:
 * - `horizontal` (default): 4-column grid on desktop, stacked on mobile.
 *   Dividers between columns match the prototype's grid layout.
 * - `vertical`: single-column stacked layout with horizontal dividers.
 *
 * @example
 * <ProcessSteps steps={[
 *   { title: "Assess", description: "Site survey and load analysis." },
 *   { title: "Design", description: "Custom system design with full specs." },
 *   { title: "Install", description: "Certified installation in 1-2 days." },
 *   { title: "Monitor", description: "24/7 visibility via GridOS." },
 * ]} />
 */
const ProcessSteps = React.forwardRef<HTMLDivElement, ProcessStepsProps>(
  ({ steps, orientation, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(processStepsVariants({ orientation }), className)}
        {...props}
      >
        {steps.map((step, i) => {
          const num = step.number ?? String(i + 1).padStart(2, "0");
          return (
            <div
              key={i}
              className="bg-sand-1 p-8"
            >
              <div className="font-mono text-label text-grid-red mb-4">
                {num}
              </div>
              <div className="font-heading text-h4 text-heading mb-2">
                {step.title}
              </div>
              <div className="font-body text-body-sm text-body leading-relaxed">
                {step.description}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);
ProcessSteps.displayName = "ProcessSteps";

export { ProcessSteps, processStepsVariants };
