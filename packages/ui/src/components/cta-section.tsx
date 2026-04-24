import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";
import { DotGrid } from "./dot-grid.js";

const ctaSectionVariants = cva(
  "relative overflow-hidden w-full py-20",
  {
    variants: {
      variant: {
        /** Dark bg (sand-12) — used for hero-style CTAs */
        dark: "bg-sand-12",
        /** Light bg (sand-2) — subtle, inline CTAs */
        light: "bg-sand-2",
        /** Accent — GridRed light bg for high-emphasis CTAs */
        accent: "bg-grid-red-bg",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  },
);

export interface CTASectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof ctaSectionVariants> {
  heading: React.ReactNode;
  description?: React.ReactNode;
  primaryCta?: React.ReactNode;
  secondaryCta?: React.ReactNode;
  /** Alignment of content. Defaults to "center". */
  align?: "left" | "center";
}

/**
 * CTASection — full-width banner with heading, description, and CTA slots.
 *
 * Variants:
 * - `dark`  (default): `bg-sand-12` — main page-end CTA
 * - `light`: `bg-sand-2` — inline / mid-page banner
 * - `accent`: `bg-grid-red-bg` — high-emphasis feature call-out
 *
 * The `primaryCta` and `secondaryCta` slots accept any React node so
 * consumers can pass `<Button>` components from the design system.
 *
 * @example
 * <CTASection
 *   heading="Ready to power your future?"
 *   description="Energy storage, EV charging, and powertrain — one open platform."
 *   primaryCta={<Button>Get early access</Button>}
 *   secondaryCta={<Button variant="ghost">Learn more</Button>}
 * />
 */
const CTASection = React.forwardRef<HTMLElement, CTASectionProps>(
  (
    {
      variant,
      heading,
      description,
      primaryCta,
      secondaryCta,
      align = "center",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const isDark = variant === "dark" || variant == null;

    return (
      <section
        ref={ref}
        className={cn(ctaSectionVariants({ variant }), className)}
        {...props}
      >
        <DotGrid
          color={
            isDark
              ? "rgba(58,57,55,0.6)"
              : variant === "accent"
              ? "rgba(250,0,22,0.08)"
              : "var(--sand-6)"
          }
        />

        <div
          className={cn(
            "relative z-10 max-w-3xl mx-auto px-10",
            align === "center" && "text-center",
          )}
        >
          <h2
            className={cn(
              "font-heading text-h2 leading-tight tracking-[-0.015em] mb-4",
              isDark ? "text-dark-12" : "text-foreground",
            )}
          >
            {heading}
          </h2>

          {description != null && (
            <p
              className={cn(
                "font-body text-body-lg leading-relaxed mb-10",
                isDark ? "text-dark-11" : "text-body",
              )}
            >
              {description}
            </p>
          )}

          {(primaryCta != null || secondaryCta != null) && (
            <div
              className={cn(
                "flex gap-3 flex-wrap",
                align === "center" && "justify-center",
              )}
            >
              {primaryCta}
              {secondaryCta}
            </div>
          )}

          {children}
        </div>
      </section>
    );
  },
);
CTASection.displayName = "CTASection";

export { CTASection, ctaSectionVariants };
