// @gridpower/ui — public re-exports
// Components are added by Phase 1 design-system sub-issues (DS.1 DS.2 DS.3 DS.4).
// Each component should be re-exported here so consumers can `import { Button } from "@gridpower/ui"`.

export { cn } from "./lib/utils.js";

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
