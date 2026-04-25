import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import {
  BarChart3,
  Car,
  LayoutGrid,
  Moon,
  Settings as SettingsIcon,
  Sun,
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
      className="inline-flex h-8 items-center gap-1.5 rounded-btn border border-border bg-transparent px-3 font-body text-body-sm text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {isDark ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

function ConsoleBreadcrumb({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3">
      <h1 className="font-body text-[15px] font-semibold text-foreground">{title}</h1>
      <span
        className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary"
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
      }
    },
    [navigate],
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar
        appName="GridCharge"
        appLabel="Console"
        sections={sections}
        activeKey={activeKey}
        onActiveChange={handleActiveChange}
        user={
          user
            ? {
                name: user.name,
                role: user.role,
                initials: user.initials,
              }
            : undefined
        }
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          breadcrumb={<ConsoleBreadcrumb title={activeNav.title} />}
          center={null}
          actions={<ThemeToggle />}
          userInitials={user?.initials}
          userName={user?.name}
        />

        <main className="relative flex-1 overflow-y-auto bg-background">
          <DotGrid />
          <div className="relative p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
