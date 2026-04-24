// @gridpower/ui — public re-exports
// Components are added by Phase 1 design-system sub-issues (DS.1 DS.2 DS.3 DS.4).
// Each component should be re-exported here so consumers can `import { Button } from "@gridpower/ui"`.

export { cn } from "./lib/utils.js";

// DS.2 — Cards + Data display
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/card.js";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./components/table.js";

export { ProductCard } from "./components/product-card.js";
export type { ProductCardProps } from "./components/product-card.js";

export { SolutionCard } from "./components/solution-card.js";
export type { SolutionCardProps } from "./components/solution-card.js";

export { FeatureCard } from "./components/feature-card.js";
export type { FeatureCardProps } from "./components/feature-card.js";

export { VerticalCard } from "./components/vertical-card.js";
export type { VerticalCardProps } from "./components/vertical-card.js";

export { ProjectCard } from "./components/project-card.js";
export type { ProjectCardProps } from "./components/project-card.js";

export { TestimonialCard } from "./components/testimonial-card.js";
export type { TestimonialCardProps } from "./components/testimonial-card.js";

export { SubsectionNav } from "./components/subsection-nav.js";
export type { SubsectionNavProps, SubsectionNavItem } from "./components/subsection-nav.js";

export { StatCard } from "./components/stat-card.js";
export type { StatCardProps, TrendDirection } from "./components/stat-card.js";

export { DataTable } from "./components/data-table.js";
export type { DataTableProps, DataTableColumn } from "./components/data-table.js";

export { SpecTable } from "./components/spec-table.js";
export type { SpecTableProps, SpecRow } from "./components/spec-table.js";

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "./components/tooltip.js";

export { LineChart } from "./components/charts/line-chart.js";
export type { LineChartProps, LineChartSeries, LineChartDataPoint } from "./components/charts/line-chart.js";

export { BarChart } from "./components/charts/bar-chart.js";
export type { BarChartProps, BarChartSeries, BarChartDataPoint } from "./components/charts/bar-chart.js";

export { HeatmapChart } from "./components/charts/heatmap-chart.js";
export type { HeatmapChartProps, HeatmapValue } from "./components/charts/heatmap-chart.js";
