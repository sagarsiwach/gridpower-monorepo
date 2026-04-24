import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils.js";

export interface SolutionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hero image src */
  imageSrc?: string;
  imageAlt?: string;
  /** Sub-brand label, e.g. "GRIDENERGY" */
  label: string;
  /** Card title */
  title: string;
  /** Short description */
  description?: string;
  /** Link handler */
  onLinkClick?: () => void;
  /** Show dark overlay on image (default true) */
  overlay?: boolean;
}

const SolutionCard = React.forwardRef<HTMLDivElement, SolutionCardProps>(
  (
    {
      className,
      imageSrc,
      imageAlt,
      label,
      title,
      description,
      onLinkClick,
      overlay = true,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-border cursor-pointer",
        className
      )}
      onClick={onLinkClick}
      {...props}
    >
      {/* Hero image area */}
      <div className="relative aspect-[16/9] overflow-hidden bg-sand-3">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-sand-3">
            <span className="font-mono text-label text-sand-8 uppercase tracking-widest">
              {label} · Image
            </span>
          </div>
        )}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-sand-12/70 to-transparent" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 bg-card p-6">
        <span className="font-mono text-label text-grid-red uppercase tracking-widest">
          {label}
        </span>
        <h3 className="font-display text-h4 font-semibold text-foreground leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-body-sm text-sand-11 leading-relaxed">{description}</p>
        )}
        <button
          type="button"
          className="mt-auto flex items-center gap-1 self-start font-body text-body-sm font-medium text-grid-red hover:text-grid-red-hover transition-colors duration-fast"
        >
          Explore
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
);
SolutionCard.displayName = "SolutionCard";

export { SolutionCard };
