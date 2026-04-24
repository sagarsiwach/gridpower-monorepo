import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

const featureCardVariants = cva(
  "relative flex flex-col gap-4 overflow-hidden rounded-card border border-border p-8 transition-colors duration-fast",
  {
    variants: {
      variant: {
        light: "bg-sand-1 hover:bg-sand-2",
        subtle: "bg-sand-2 hover:bg-sand-3",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

export interface FeatureCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featureCardVariants> {
  /** Lucide icon element */
  icon?: React.ReactNode;
  /** Label above title, e.g. "OPEN STANDARDS" */
  label?: string;
  /** Feature title */
  title: string;
  /** Description paragraph */
  description: string;
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, variant, icon, label, title, description, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(featureCardVariants({ variant }), className)}
      {...props}
    >
      {icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-btn bg-grid-red-bg text-grid-red">
          {icon}
        </div>
      )}
      {label && (
        <span className="font-mono text-label text-grid-red uppercase tracking-widest">
          {label}
        </span>
      )}
      <h3 className="font-display text-h4 font-semibold text-foreground leading-snug">
        {title}
      </h3>
      <p className="text-body-sm text-sand-11 leading-relaxed">{description}</p>
    </div>
  )
);
FeatureCard.displayName = "FeatureCard";

export { FeatureCard };
