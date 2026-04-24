import * as React from "react";
import { cn } from "../lib/utils.js";

export interface SpecRow {
  label: string;
  value: React.ReactNode;
}

export interface SpecTableProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Table title displayed above rows */
  title?: string;
  /** Spec rows */
  rows: SpecRow[];
  /** Theme */
  theme?: "light" | "dark";
}

const SpecTable = React.forwardRef<HTMLDivElement, SpecTableProps>(
  ({ className, title, rows, theme = "light", ...props }, ref) => {
    const isDark = theme === "dark";
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-card border overflow-hidden",
          isDark ? "border-dark-6 bg-dark-2" : "border-border bg-card",
          className
        )}
        {...props}
      >
        {title && (
          <div
            className={cn(
              "px-5 py-3 border-b font-semibold text-body-sm",
              isDark
                ? "border-dark-6 bg-dark-3 text-dark-12"
                : "border-border bg-sand-2 text-foreground"
            )}
          >
            {title}
          </div>
        )}
        <dl>
          {rows.map(({ label, value }, index) => (
            <div
              key={label}
              className={cn(
                "flex items-center justify-between px-5 py-3",
                index < rows.length - 1
                  ? isDark
                    ? "border-b border-dark-6"
                    : "border-b border-border"
                  : ""
              )}
            >
              <dt
                className={cn(
                  "font-mono text-label uppercase tracking-widest shrink-0",
                  isDark ? "text-dark-9" : "text-sand-9"
                )}
              >
                {label}
              </dt>
              <dd
                className={cn(
                  "font-mono text-label font-medium text-right",
                  isDark ? "text-dark-12" : "text-foreground"
                )}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }
);
SpecTable.displayName = "SpecTable";

export { SpecTable };
