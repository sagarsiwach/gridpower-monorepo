import * as React from "react";
import { cn } from "../lib/utils.js";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Site/project image src */
  imageSrc?: string;
  imageAlt?: string;
  /** Location label, e.g. "GIDC VERNA · GOA" */
  location: string;
  /** Project title */
  title: string;
  /** Short description */
  description?: string;
  /** Capacity/type badge text, e.g. "GridCharge" */
  badge?: string;
  /** Status chip text, e.g. "Deployment Q2 2026" */
  status?: string;
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      className,
      imageSrc,
      imageAlt,
      location,
      title,
      description,
      badge,
      status,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      className={cn(
        "group flex flex-col overflow-hidden rounded-card border border-border bg-card transition-colors duration-fast hover:bg-sand-2",
        className
      )}
      {...props}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-sand-3">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover transition-transform duration-slow group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {badge && (
              <span className="font-mono text-label text-sand-8 uppercase tracking-widest">
                {badge} · Site Image
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="font-mono text-label text-sand-9 uppercase tracking-widest">
          {location}
        </span>
        <h3 className="font-display text-h4 font-semibold text-foreground leading-snug">
          {title}
        </h3>
        {description && (
          <p className="text-body-sm text-sand-11 leading-relaxed">{description}</p>
        )}
        {status && (
          <div className="mt-auto pt-2">
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-sand-5 bg-sand-3 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-grid-red" />
              <span className="font-mono text-label text-sand-9 tracking-wide">
                {status}
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  )
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };
