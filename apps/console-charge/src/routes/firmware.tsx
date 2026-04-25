/**
 * Firmware OTA layout
 * Route: /firmware (parent)
 *
 * Renders a horizontal sub-nav with NavLinks to:
 *   Overview · Versions · Rollouts
 *
 * The subsection is rendered by the nested route via <Outlet />.
 * h1 lives in the topbar (ConsoleShell); each subsection owns its own h2.
 */

import { NavLink, Outlet } from "react-router";
import { cn } from "@gridpower/ui";

interface SubNavItem {
  to: string;
  label: string;
  end?: boolean;
}

const SUBNAV: SubNavItem[] = [
  { to: "/firmware", label: "Overview", end: true },
  { to: "/firmware/versions", label: "Versions" },
  { to: "/firmware/rollouts", label: "Rollouts" },
];

export default function FirmwareLayout() {
  return (
    <div className="flex flex-col gap-4">
      <nav
        aria-label="Firmware sections"
        className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3"
      >
        {SUBNAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "inline-flex items-center rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border",
                isActive
                  ? "bg-muted border-border text-foreground"
                  : "bg-transparent border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
              )
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  );
}
