import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

const productCardVariants = cva(
  "group relative flex flex-col overflow-hidden rounded-card border border-border bg-card transition-colors duration-fast hover:bg-sand-3",
  {
    variants: {
      size: {
        default: "w-full",
        sm: "max-w-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface ProductCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof productCardVariants> {
  /** Product image src */
  imageSrc?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Product title */
  title: string;
  /** Spec rows — label + value pairs */
  specs?: Array<{ label: string; value: string }>;
  /** Price display string */
  price?: string;
  /** CTA label */
  ctaLabel?: string;
  /** CTA click handler */
  onCtaClick?: () => void;
}

const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  (
    {
      className,
      size,
      imageSrc,
      imageAlt,
      title,
      specs,
      price,
      ctaLabel = "View specs",
      onCtaClick,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(productCardVariants({ size }), className)}
      {...props}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sand-3">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-label text-sand-8 tracking-widest uppercase">
              Product image
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-h4 font-semibold text-foreground leading-snug">
          {title}
        </h3>

        {specs && specs.length > 0 && (
          <dl className="flex flex-col gap-2">
            {specs.map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-border pb-2 last:border-0 last:pb-0"
              >
                <dt className="font-mono text-label text-sand-9 uppercase tracking-widest">
                  {label}
                </dt>
                <dd className="font-mono text-label text-foreground font-medium">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto flex items-center justify-between pt-2">
          {price && (
            <span className="font-display text-h4 font-semibold text-grid-red">
              {price}
            </span>
          )}
          <button
            type="button"
            onClick={onCtaClick}
            className="ml-auto flex items-center gap-1 font-body text-body-sm font-medium text-grid-red hover:text-grid-red-hover transition-colors duration-fast"
          >
            {ctaLabel}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
);
ProductCard.displayName = "ProductCard";

export { ProductCard };
