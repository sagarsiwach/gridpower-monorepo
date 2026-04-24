import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils.js";

export interface SubsectionNavItem {
  id: string;
  label: string;
}

const chipVariants = cva(
  "inline-flex cursor-pointer select-none items-center rounded-pill border px-3 py-1 font-mono text-label uppercase tracking-widest transition-colors duration-fast",
  {
    variants: {
      active: {
        true: "border-grid-red bg-grid-red-bg text-grid-red",
        false:
          "border-border bg-transparent text-sand-9 hover:border-sand-7 hover:text-sand-11",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export interface SubsectionNavProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section label, e.g. "GRIDCHARGE" */
  sectionLabel?: string;
  /** Nav items */
  items: SubsectionNavItem[];
  /** Currently active item id */
  activeId?: string;
  /** Called when a chip is clicked */
  onItemClick?: (id: string) => void;
}

const SubsectionNav = React.forwardRef<HTMLDivElement, SubsectionNavProps>(
  ({ className, sectionLabel, items, activeId, onItemClick, ...props }, ref) => (
    <nav
      ref={ref}
      aria-label={sectionLabel ?? "Subsection navigation"}
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {sectionLabel && (
        <span className="font-mono text-label text-sand-9 uppercase tracking-widest mr-2">
          {sectionLabel}
        </span>
      )}
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onItemClick?.(item.id)}
          className={chipVariants({ active: item.id === activeId })}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
);
SubsectionNav.displayName = "SubsectionNav";

export { SubsectionNav };
