/**
 * Payments layout
 * Route: /payments (parent)
 *
 * Renders a horizontal sub-nav with NavLinks to:
 *   Overview · Transactions · Payouts · Refunds · Invoices
 *
 * The subsection is rendered by the nested route via <Outlet />.
 * h1 lives in the topbar (ConsoleShell); each subsection owns its own h2.
 */

import { NavLink, Outlet } from "react-router";
import { cn } from "@gridpower/ui";

interface SubNavItem {
  to: string;
  label: string;
  /** When true, NavLink only matches the exact /payments index. */
  end?: boolean;
}

const SUBNAV: SubNavItem[] = [
  { to: "/payments", label: "Overview", end: true },
  { to: "/payments/transactions", label: "Transactions" },
  { to: "/payments/payouts", label: "Payouts" },
  { to: "/payments/refunds", label: "Refunds" },
  { to: "/payments/invoices", label: "Invoices" },
];

export default function PaymentsLayout() {
  return (
    <div className="flex flex-col gap-4">
      <nav
        aria-label="Payments sections"
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
            aria-current={undefined /* NavLink injects aria-current="page" automatically */}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  );
}
