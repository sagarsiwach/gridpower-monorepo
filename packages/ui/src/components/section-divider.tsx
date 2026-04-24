import * as React from "react";
import { cn } from "../lib/utils.js";

export interface SectionDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional label centered on the divider line.
   * When provided the component renders a Radix-separator-style
   * "line — label — line" layout.
   */
  label?: React.ReactNode;
}

/**
 * SectionDivider — a full-width `border-t border-border` horizontal rule.
 *
 * With no `label`, it renders a simple hairline divider that matches the
 * prototype's `height: 1px; background: var(--sand-6)`.
 *
 * With a `label`, it renders a centered label flanked by two lines using
 * flexbox so the label "breaks" the line visually.
 *
 * @example
 * <SectionDivider />
 * <SectionDivider label="OR" />
 * <SectionDivider label={<SectionLabel>SERVICES</SectionLabel>} />
 */
const SectionDivider = React.forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ label, className, ...props }, ref) => {
    if (label == null) {
      return (
        <hr
          ref={ref as React.Ref<HTMLHRElement>}
          className={cn("border-t border-border w-full", className)}
          {...(props as React.HTMLAttributes<HTMLHRElement>)}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-4 w-full", className)}
        {...props}
      >
        <span className="flex-1 border-t border-border" aria-hidden="true" />
        <span className="shrink-0 font-mono text-label uppercase text-muted-foreground tracking-widest">
          {label}
        </span>
        <span className="flex-1 border-t border-border" aria-hidden="true" />
      </div>
    );
  },
);
SectionDivider.displayName = "SectionDivider";

export { SectionDivider };
