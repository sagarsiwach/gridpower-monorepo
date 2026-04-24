import * as React from "react";
import { cn } from "../../lib/utils.js";

export type HeatmapValue = 0 | 1 | 2 | 3 | 4 | 5;

export interface HeatmapChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 2D array of intensity values (0–5).
   * Rows = categories (e.g. days of the week), cols = time slots.
   */
  data: HeatmapValue[][];
  /** Labels for rows (Y axis) */
  rowLabels?: string[];
  /** Labels for columns (X axis) */
  colLabels?: string[];
  /** Chart title */
  title?: string;
  /** Subtitle / metric description */
  subtitle?: string;
  /** Theme */
  theme?: "light" | "dark";
  /** Cell size in px — defaults to 16 */
  cellSize?: number;
  /** Gap between cells in px — defaults to 3 */
  cellGap?: number;
}

/** Resolve a sand→GridRed heat color for a given intensity */
function heatColor(value: HeatmapValue, isDark: boolean): string {
  switch (value) {
    case 0:
      return isDark ? "var(--dark-3)" : "var(--sand-3)";
    case 1:
      return isDark ? "#2a1a1a" : "#ffe8e8";
    case 2:
      return isDark ? "#3a1a1a" : "#ffcece";
    case 3:
      return "#ff8080";
    case 4:
      return "rgba(250, 0, 22, 0.67)";
    case 5:
      return "var(--grid-red)";
  }
}

const INTENSITY_LEVELS: HeatmapValue[] = [0, 1, 2, 3, 4, 5];

const HeatmapChart = React.forwardRef<HTMLDivElement, HeatmapChartProps>(
  (
    {
      className,
      data,
      rowLabels,
      colLabels,
      title,
      subtitle,
      theme = "light",
      cellSize = 16,
      cellGap = 3,
      ...props
    },
    ref
  ) => {
    const isDark = theme === "dark";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-card border p-5",
          isDark ? "border-dark-6 bg-dark-2" : "border-border bg-card",
          className
        )}
        {...props}
      >
        {(title || subtitle) && (
          <div className="mb-4 flex flex-col gap-0.5">
            {title && (
              <span
                className={cn(
                  "font-body text-body-sm font-semibold",
                  isDark ? "text-dark-12" : "text-foreground"
                )}
              >
                {title}
              </span>
            )}
            {subtitle && (
              <span
                className={cn(
                  "font-mono text-label",
                  isDark ? "text-dark-9" : "text-sand-9"
                )}
              >
                {subtitle}
              </span>
            )}
          </div>
        )}

        <div className="overflow-x-auto">
          {/* Column labels */}
          {colLabels && colLabels.length > 0 && (
            <div
              className="mb-1 flex"
              style={{
                paddingLeft: rowLabels ? 40 : 0,
                gap: cellGap,
              }}
            >
              {colLabels.map((label, ci) => (
                <div
                  key={ci}
                  style={{ width: cellSize, flexShrink: 0 }}
                  className={cn(
                    "text-center font-mono truncate",
                    "text-[9px] leading-none",
                    isDark ? "text-dark-9" : "text-sand-9"
                  )}
                >
                  {label}
                </div>
              ))}
            </div>
          )}

          {/* Grid rows */}
          <div className="flex flex-col" style={{ gap: cellGap }}>
            {data.map((row, ri) => (
              <div key={ri} className="flex items-center" style={{ gap: cellGap }}>
                {/* Row label */}
                {rowLabels && (
                  <div
                    style={{ width: 36, flexShrink: 0 }}
                    className={cn(
                      "font-mono text-right pr-1 truncate",
                      "text-[9px] leading-none",
                      isDark ? "text-dark-9" : "text-sand-9"
                    )}
                  >
                    {rowLabels[ri] ?? ""}
                  </div>
                )}
                {row.map((value, ci) => (
                  <div
                    key={ci}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      flexShrink: 0,
                      borderRadius: 2,
                      backgroundColor: heatColor(value, isDark),
                    }}
                    title={`${rowLabels?.[ri] ?? `Row ${ri}`} / ${colLabels?.[ci] ?? `Col ${ci}`}: ${value}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div
          className={cn(
            "mt-3 flex items-center gap-2 font-mono text-[9px]",
            isDark ? "text-dark-9" : "text-sand-9"
          )}
        >
          <span>Low</span>
          {INTENSITY_LEVELS.map((v) => (
            <div
              key={v}
              style={{
                width: 12,
                height: 8,
                borderRadius: 2,
                backgroundColor: heatColor(v, isDark),
                flexShrink: 0,
              }}
            />
          ))}
          <span>High</span>
        </div>
      </div>
    );
  }
);
HeatmapChart.displayName = "HeatmapChart";

export { HeatmapChart };
