// @gridpower/ui — public re-exports
// Components are added by Phase 1 design-system sub-issues (DS.1 DS.2 DS.3 DS.4).
// Each component should be re-exported here so consumers can `import { Button } from "@gridpower/ui"`.

export { cn } from "./lib/utils.js";

// DS.1 primitives
export { Button, buttonVariants } from "./components/button";
export type { ButtonProps } from "./components/button";
export { Input } from "./components/input";
export type { InputProps } from "./components/input";
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./components/select";
export { Checkbox } from "./components/checkbox";
export { RadioGroup, RadioGroupItem } from "./components/radio-group";
export { Switch } from "./components/switch";
export { Badge, badgeVariants } from "./components/badge";
export type { BadgeProps } from "./components/badge";
export { Pill, pillVariants } from "./components/pill";
export type { PillProps } from "./components/pill";
export { StatusBadge, statusBadgeVariants } from "./components/status-badge";
export type { StatusBadgeProps } from "./components/status-badge";

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

// DS.3 — Navigation + Feedback
export { Navbar, GridMark } from "./components/navbar.js";
export type { NavbarProps, NavbarItem, NavItem, MegaMenuSection } from "./components/navbar.js";

export { Footer } from "./components/footer.js";
export type { FooterProps, FooterLinkColumn } from "./components/footer.js";

export { Sidebar } from "./components/sidebar.js";
export type { SidebarProps, SidebarSection, SidebarNavItem, SidebarUser } from "./components/sidebar.js";

export { Topbar } from "./components/topbar.js";
export type { TopbarProps } from "./components/topbar.js";

export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/tabs.js";
export type { TabsProps } from "./components/tabs.js";

export { Breadcrumb, BreadcrumbDark } from "./components/breadcrumb.js";
export type { BreadcrumbProps, BreadcrumbItem } from "./components/breadcrumb.js";

export { Pagination } from "./components/pagination.js";
export type { PaginationProps } from "./components/pagination.js";

export { Alert } from "./components/alert.js";
export type { AlertProps } from "./components/alert.js";

export { toast, rawToast } from "./components/toast.js";

export { Toaster } from "./components/toaster.js";
export type { ToasterProps } from "./components/toaster.js";

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./components/dialog.js";

export {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "./components/sheet.js";
export type { SheetContentProps } from "./components/sheet.js";

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./components/dropdown-menu.js";

export { EmptyState } from "./components/empty-state.js";
export type { EmptyStateProps } from "./components/empty-state.js";

export { Skeleton, SkeletonText, SkeletonCard } from "./components/skeleton.js";
export type { SkeletonProps } from "./components/skeleton.js";

// DS.4 — Utility / marketing primitives
export { DotGrid } from "./components/dot-grid.js";
export type { DotGridProps } from "./components/dot-grid.js";

export { SectionLabel, sectionLabelVariants } from "./components/section-label.js";
export type { SectionLabelProps } from "./components/section-label.js";

export { SectionDivider } from "./components/section-divider.js";
export type { SectionDividerProps } from "./components/section-divider.js";

export { SectionHeader, sectionHeaderVariants } from "./components/section-header.js";
export type { SectionHeaderProps } from "./components/section-header.js";

export { ImgPlaceholder, imgPlaceholderVariants } from "./components/img-placeholder.js";
export type { ImgPlaceholderProps, ImgPlaceholderIcon } from "./components/img-placeholder.js";

export { ProcessSteps, processStepsVariants } from "./components/process-steps.js";
export type { ProcessStepsProps, ProcessStep } from "./components/process-steps.js";

export { NumbersBar } from "./components/numbers-bar.js";
export type { NumbersBarProps, Stat } from "./components/numbers-bar.js";

export { CTASection, ctaSectionVariants } from "./components/cta-section.js";
export type { CTASectionProps } from "./components/cta-section.js";

export { LogoCloud } from "./components/logo-cloud.js";
export type { LogoCloudProps, Logo } from "./components/logo-cloud.js";
