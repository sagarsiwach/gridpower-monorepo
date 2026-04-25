import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import {
  BarChart3,
  Car,
  LayoutGrid,
  Menu,
  Moon,
  Settings as SettingsIcon,
  Sun,
  X,
  Zap,
} from "lucide-react";
import { DotGrid, Sidebar, Topbar, type SidebarSection } from "@gridpower/ui";
import { useAuth } from "~/lib/auth";
import { useTheme } from "~/lib/theme";

// Path B nav items (5, no Energy).
// Order: Dashboard, Stations, Analytics, Fleet, Settings.

interface NavDef {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  title: string;
}

const NAV: NavDef[] = [
  { key: "dashboard", label: "Dashboard", href: "/dashboard", icon: <LayoutGrid size={15} />, title: "Dashboard" },
  { key: "stations",  label: "Stations",  href: "/stations",  icon: <Zap size={15} />,        title: "Stations" },
  { key: "analytics", label: "Analytics", href: "/analytics", icon: <BarChart3 size={15} />,  title: "Analytics" },
  { key: "fleet",     label: "Fleet",     href: "/fleet",     icon: <Car size={15} />,        title: "Fleet" },
  { key: "settings",  label: "Settings",  href: "/settings",  icon: <SettingsIcon size={15} />, title: "Settings" },
];

const NAV_BY_KEY: Record<string, NavDef> = NAV.reduce(
  (acc, item) => {
    acc[item.key] = item;
    return acc;
  },
  {} as Record<string, NavDef>,
);

function deriveActiveKey(pathname: string): string {
  const segment = pathname.split("/").filter(Boolean)[0];
  if (segment && NAV_BY_KEY[segment]) return segment;
  return "dashboard";
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex h-8 items-center gap-1.5 rounded-btn border border-border bg-transparent px-2 sm:px-3 font-body text-body-sm text-foreground transition-[color,background-color,box-shadow] duration-150 ease-out hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span className="inline-flex transition-transform duration-200 ease-out" style={{ transform: isDark ? "rotate(0deg)" : "rotate(-30deg)" }}>
        {isDark ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
      </span>
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

function ConsoleBreadcrumb({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
      <h1 className="font-body text-[14px] sm:text-[15px] font-semibold text-foreground truncate">{title}</h1>
      <span
        className="hidden md:inline font-mono text-[10px] uppercase tracking-[0.1em] text-primary"
        aria-label="GridCharge Console"
      >
        GridCharge Console
      </span>
    </div>
  );
}

export function ConsoleShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const activeKey = deriveActiveKey(location.pathname);
  const activeNav = NAV_BY_KEY[activeKey] ?? NAV[0]!;

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  // Close drawer on route change.
  React.useEffect(() => {
    setDrawerOpen(false);
  }, [location.pathname]);

  // Close drawer on Escape key.
  React.useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const sections: SidebarSection[] = React.useMemo(
    () => [
      {
        label: "Navigation",
        items: NAV.map((item) => ({
          key: item.key,
          label: item.label,
          icon: item.icon,
          href: item.href,
        })),
      },
    ],
    [],
  );

  const handleActiveChange = React.useCallback(
    (key: string) => {
      const target = NAV_BY_KEY[key];
      if (target) {
        navigate(target.href);
        setDrawerOpen(false);
      }
    },
    [navigate],
  );

  const sidebarUser = user
    ? { name: user.name, role: user.role, initials: user.initials }
    : undefined;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop sidebar — hidden below lg */}
      <div className="hidden lg:flex">
        <Sidebar
          appName="GridCharge"
          appLabel="Console"
          sections={sections}
          activeKey={activeKey}
          onActiveChange={handleActiveChange}
          user={sidebarUser}
        />
      </div>

      {/* Mobile drawer overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer panel */}
      <div
        className={[
          "fixed inset-y-0 left-0 z-50 flex lg:hidden",
          "transition-transform duration-200 ease-out",
          drawerOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <Sidebar
          appName="GridCharge"
          appLabel="Console"
          sections={sections}
          activeKey={activeKey}
          onActiveChange={handleActiveChange}
          user={sidebarUser}
        />
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          aria-label="Close menu"
          className="absolute top-4 right-[-44px] flex h-9 w-9 items-center justify-center rounded-btn bg-card border border-border text-foreground hover:bg-muted transition-colors"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          breadcrumb={
            <div className="flex items-center gap-2 min-w-0">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className="lg:hidden flex h-8 w-8 items-center justify-center rounded-btn border border-border bg-transparent text-foreground hover:bg-muted transition-colors shrink-0"
              >
                <Menu size={16} aria-hidden="true" />
              </button>
              <ConsoleBreadcrumb title={activeNav.title} />
            </div>
          }
          center={null}
          actions={<ThemeToggle />}
          userInitials={user?.initials}
          userName={user?.name}
        />

        <main className="relative flex-1 overflow-y-auto bg-background">
          <DotGrid />
          <div className="relative p-3 sm:p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
