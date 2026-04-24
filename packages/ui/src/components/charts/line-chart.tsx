import * as React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "../../lib/utils.js";

export interface LineChartDataPoint {
  [key: string]: string | number;
}

export interface LineChartSeries {
  /** Key in data points */
  dataKey: string;
  /** Display name for tooltip / legend */
  name?: string;
  /** Override stroke color (CSS var string or hex) — defaults to var(--grid-red) */
  color?: string;
  /** Stroke width — defaults to 2 */
  strokeWidth?: number;
}

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Chart data */
  data: LineChartDataPoint[];
  /** Series definitions */
  series: LineChartSeries[];
  /** Key in data used for X axis labels */
  xAxisKey: string;
  /** Y axis unit label, e.g. "kWh" */
  yUnit?: string;
  /** Chart title */
  title?: string;
  /** Secondary label below title */
  subtitle?: string;
  /** Height of chart area in px — defaults to 200 */
  chartHeight?: number;
  /** Theme */
  theme?: "light" | "dark";
}

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
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
    const gridColor = isDark
      ? "var(--dark-6)"
      : "var(--sand-6)";
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
          <RechartsLineChart
            data={data}
            margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
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
              cursor={{ stroke: gridColor, strokeWidth: 1 }}
            />
            {series.map((s) => (
              <Line
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name ?? s.dataKey}
                strokeWidth={s.strokeWidth ?? 2}
                dot={false}
                activeDot={{ r: 4, fill: s.color ?? "var(--grid-red)" }}
                style={{
                  stroke: s.color ?? "var(--grid-red)",
                }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    );
  }
);
LineChart.displayName = "LineChart";

export { LineChart };
