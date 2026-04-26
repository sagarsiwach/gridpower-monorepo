/**
 * Demand Response layout — /demand-response (parent)
 */
import { NavLink, Outlet } from "react-router";
import { cn } from "@gridpower/ui";

const SUBNAV = [
  { to: "/demand-response",          label: "Overview",  end: true },
  { to: "/demand-response/programs", label: "Programs"             },
  { to: "/demand-response/events",   label: "Events"               },
];

export default function DemandResponseLayout() {
  return (
    <div className="flex flex-col gap-4">
      <nav aria-label="Demand response sections" className="flex flex-wrap items-center gap-1.5 border-b border-border pb-3">
        {SUBNAV.map(item => (
          <NavLink key={item.to} to={item.to} end={item.end}
            className={({ isActive }) => cn(
              "inline-flex items-center rounded-btn px-3 py-1.5 font-body text-[12px] cursor-pointer transition-colors duration-150 ease-out border",
              isActive ? "bg-muted border-border text-foreground" : "bg-transparent border-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
            )}>
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
}
