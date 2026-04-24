import * as React from "react";
import { cn } from "../lib/utils.js";

export interface DotGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Override dot color via an inline CSS variable. Accepts any CSS color value.
   *  Defaults to the token default (--sand-6 via --grid-bg). */
  color?: string;
  /** Additional className forwarded to the root element. */
  className?: string;
}

/**
 * DotGrid — absolute-positioned radial-dot background layer.
 *
 * Drop inside any `position: relative` container. Pointer events are
 * disabled so it never blocks clicks on content layers above it.
 *
 * Uses `bg-grid-dots` (mapped to `--grid-bg` radial-gradient) and
 * `bg-[length:var(--grid-bg-size)]` from `@gridpower/tokens`.
 *
 * When `color` is provided, it overrides `--grid-bg` inline so the dot
 * colour matches the surrounding surface without needing a new Tailwind class.
 */
const DotGrid = React.forwardRef<HTMLDivElement, DotGridProps>(
  ({ color, className, style, ...props }, ref) => {
    const inlineStyle: React.CSSProperties = {
      ...(style ?? {}),
      ...(color
        ? ({ "--grid-bg": `radial-gradient(circle, ${color} 1px, transparent 1px)` } as React.CSSProperties)
        : {}),
    };

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "absolute inset-0 pointer-events-none bg-grid-dots bg-[length:var(--grid-bg-size)]",
          className,
        )}
        style={inlineStyle}
        {...props}
      />
    );
  },
);
DotGrid.displayName = "DotGrid";

export { DotGrid };
