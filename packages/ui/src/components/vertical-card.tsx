import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

const verticalCardVariants = cva(
  "group relative flex flex-col gap-6 overflow-hidden rounded-card border border-border p-8 cursor-pointer transition-colors duration-fast",
  {
    variants: {
      variant: {
        light: "bg-sand-1 hover:bg-sand-2",
        dark: "bg-sand-12 hover:bg-sand-12/90 border-dark-6",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

export interface VerticalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof verticalCardVariants> {
  /** Sub-brand logo — any element (img, svg, or text mark) */
  logo?: React.ReactNode;
  /** Sub-brand identifier, e.g. "GRIDENERGY" */
  brand: string;
  /** Card title */
  title: string;
  /** Short tagline */
  tagline?: string;
  /** Stat label, e.g. "5 kWh – 1 MWh" */
  stat?: string;
  onCardClick?: () => void;
}

const VerticalCard = React.forwardRef<HTMLDivElement, VerticalCardProps>(
  (
    {
      className,
      variant,
      logo,
      brand,
      title,
      tagline,
      stat,
      onCardClick,
      ...props
    },
    ref
  ) => {
    const isDark = variant === "dark";
    return (
      <div
        ref={ref}
        className={cn(verticalCardVariants({ variant }), className)}
        onClick={onCardClick}
        {...props}
      >
        {/* Logo / placeholder */}
        <div className="flex items-center justify-between">
          {logo ? (
            <div className="h-8">{logo}</div>
          ) : (
            <span
              className={cn(
                "font-mono text-label uppercase tracking-widest",
                isDark ? "text-grid-red" : "text-grid-red"
              )}
            >
              {brand}
            </span>
          )}
          <ArrowUpRight
            className={cn(
              "h-5 w-5 opacity-0 transition-opacity duration-fast group-hover:opacity-100",
              isDark ? "text-dark-11" : "text-sand-11"
            )}
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-2">
          <h3
            className={cn(
              "font-display text-h3 font-semibold leading-snug",
              isDark ? "text-dark-12" : "text-foreground"
            )}
          >
            {title}
          </h3>
          {tagline && (
            <p
              className={cn(
                "text-body-sm leading-relaxed",
                isDark ? "text-dark-11" : "text-sand-11"
              )}
            >
              {tagline}
            </p>
          )}
        </div>

        {stat && (
          <div
            className={cn(
              "font-mono text-label",
              isDark ? "text-dark-9" : "text-sand-9"
            )}
          >
            {stat}
          </div>
        )}
      </div>
    );
  }
);
VerticalCard.displayName = "VerticalCard";

export { VerticalCard };
