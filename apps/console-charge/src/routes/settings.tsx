/**
 * CON.10: Settings layout
 * Route: /settings (parent layout)
 *
 * Renders a horizontal sub-nav above an <Outlet /> that hosts the
 * active subsection: Organisation / Members / Billing / API keys /
 * Notifications / Audit log.
 *
 * The page-level <h1> is owned by the topbar in ConsoleShell; this
 * layout only provides the tab strip. Each child route renders its
 * own <section aria-labelledby> + <h2>.
 */

import { NavLink, Outlet } from "react-router";
import {
  Building2,
  Users,
  CreditCard,
  Key,
  Bell,
  ClipboardList,
} from "lucide-react";
import { cn } from "@gridpower/ui";

const TABS = [
  { to: "/settings/organisation", label: "Organisation", icon: Building2 },
  { to: "/settings/members", label: "Members", icon: Users },
  { to: "/settings/billing", label: "Billing", icon: CreditCard },
  { to: "/settings/api", label: "API keys", icon: Key },
  { to: "/settings/notifications", label: "Notifications", icon: Bell },
  { to: "/settings/audit", label: "Audit log", icon: ClipboardList },
] as const;

export default function SettingsLayout() {
  return (
    <div className="flex flex-col gap-5">
      {/* Sub-nav: horizontal scrollable strip */}
      <nav
        aria-label="Settings sections"
        className="border-b border-border -mx-3 sm:mx-0"
      >
        <div className="overflow-x-auto px-3 sm:px-0">
          <ul className="flex items-center gap-1 min-w-max" role="list">
            {TABS.map(({ to, label, icon: Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center gap-1.5 px-3 py-2 rounded-btn font-body text-[12px] transition-colors duration-150 ease-out cursor-pointer whitespace-nowrap",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                    )
                  }
                >
                  <Icon size={13} aria-hidden="true" />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Active subsection */}
      <Outlet />
    </div>
  );
}
