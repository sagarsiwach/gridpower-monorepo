import * as React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "../../lib/utils.js";

export interface BarChartDataPoint {
  [key: string]: string | number;
}

export interface BarChartSeries {
  dataKey: string;
  name?: string;
  /** Color override — defaults to var(--grid-red) */
  color?: string;
  /** Opacity for non-last bars — defaults to 0.6 */
  dimOpacity?: number;
  /** Whether to highlight the last bar */
  highlightLast?: boolean;
}

export interface BarChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: BarChartDataPoint[];
  series: BarChartSeries[];
  xAxisKey: string;
  yUnit?: string;
  title?: string;
  subtitle?: string;
  chartHeight?: number;
  theme?: "light" | "dark";
}

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  (
    {
      className,
      data,
      series,
      xAxisKey,
      yUnit,
      title,
      subtitle,
      chartHeight = 200,
      theme = "light",
      ...props
    },
    ref
  ) => {
    const isDark = theme === "dark";
    const gridColor = isDark ? "var(--dark-6)" : "var(--sand-6)";
    const axisColor = isDark ? "var(--dark-9)" : "var(--sand-9)";

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
          <div className="mb-4 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
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
                <span className="font-mono text-label text-grid-red">
                  {subtitle}
                </span>
              )}
            </div>
            {yUnit && (
              <span
                className={cn(
                  "font-mono text-label",
                  isDark ? "text-dark-9" : "text-sand-9"
                )}
              >
                {yUnit}
              </span>
            )}
          </div>
        )}
        <ResponsiveContainer width="100%" height={chartHeight}>
          <RechartsBarChart
            data={data}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
            barCategoryGap="30%"
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke={gridColor}
              vertical={false}
            />
            <XAxis
              dataKey={xAxisKey}
              tick={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fill: axisColor,
                letterSpacing: "0.04em",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fill: axisColor,
              }}
              axisLine={false}
              tickLine={false}
              width={32}
            />
            <Tooltip
              contentStyle={{
                background: isDark ? "var(--dark-3)" : "var(--sand-12)",
                border: "none",
                borderRadius: "var(--radius-tooltip)",
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: isDark ? "var(--dark-12)" : "var(--sand-1)",
              }}
              cursor={{ fill: isDark ? "var(--dark-4)" : "var(--sand-3)" }}
            />
            {series.map((s) => {
              const baseColor = s.color ?? "var(--grid-red)";
              const dimOpacity = s.dimOpacity ?? 0.6;
              return (
                <Bar
                  key={s.dataKey}
                  dataKey={s.dataKey}
                  name={s.name ?? s.dataKey}
                  radius={[2, 2, 0, 0]}
                  style={{ fill: baseColor }}
                >
                  {s.highlightLast
                    ? data.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          style={{
                            fill: baseColor,
                            opacity:
                              index === data.length - 1 ? 1 : dimOpacity,
                          }}
                        />
                      ))
                    : null}
                </Bar>
              );
            })}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    );
  }
);
BarChart.displayName = "BarChart";

export { BarChart };
