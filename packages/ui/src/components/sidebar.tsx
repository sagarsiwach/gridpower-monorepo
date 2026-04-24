"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SidebarNavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  children?: SidebarNavItem[];
}

export interface SidebarSection {
  label?: string;
  items: SidebarNavItem[];
}

export interface SidebarUser {
  name: string;
  role?: string;
  initials?: string;
}

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Active item key */
  activeKey?: string;
  onActiveChange?: (key: string) => void;
  sections: SidebarSection[];
  user?: SidebarUser;
  /** App name displayed in sidebar header */
  appName?: string;
  /** App sub-label (e.g. "Console") */
  appLabel?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

// ─── Item variants ────────────────────────────────────────────────────────────

const itemVariants = cva(
  [
    "relative flex items-center gap-[9px] w-full",
    "px-[10px] py-[9px] rounded-[6px]",
    "font-body text-[13px] text-left",
    "border-none cursor-pointer",
    "transition-colors duration-[120ms]",
    "outline-none",
  ],
  {
    variants: {
      active: {
        true: [
          "bg-dark-3 text-dark-12 font-semibold",
          "border-l-4 border-primary",
          "pl-[6px]", // compensate for border to align text
        ],
        false: "bg-transparent text-dark-11 font-normal hover:bg-dark-4",
      },
    },
    defaultVariants: { active: false },
  }
);

// ─── Sidebar nav item ─────────────────────────────────────────────────────────

function NavItemRow({
  item,
  active,
  depth = 0,
  onActivate,
}: {
  item: SidebarNavItem;
  active: boolean;
  depth?: number;
  onActivate: (key: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  function handleClick() {
    if (hasChildren) {
      setOpen((prev) => !prev);
    } else {
      onActivate(item.key);
      item.onClick?.();
    }
  }

  return (
    <div>
      <button
        type="button"
        className={cn(itemVariants({ active }), depth > 0 && "pl-6")}
        onClick={handleClick}
        aria-current={active ? "page" : undefined}
      >
        {item.icon && (
          <span className={cn("flex-shrink-0 w-[15px] h-[15px]", active ? "text-dark-12" : "text-dark-11")}>
            {item.icon}
          </span>
        )}
        <span className="flex-1">{item.label}</span>
        {hasChildren && (
          <ChevronRight
            size={13}
            className={cn(
              "text-dark-9 transition-transform duration-150",
              open && "rotate-90"
            )}
          />
        )}
      </button>

      {/* Nested children */}
      {hasChildren && open && (
        <div className="mt-0.5 space-y-0.5 pl-2">
          {item.children!.map((child) => (
            <NavItemRow
              key={child.key}
              item={child}
              active={false}
              depth={depth + 1}
              onActivate={onActivate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── GridMark small (sidebar, always-dark) ────────────────────────────────────

function GridMarkSidebar() {
  const cells = [
    "#FA0016", "#FA0016", "#FA0016",
    "var(--dark-6)", "#FA0016", "var(--dark-6)",
    "var(--dark-6)", "var(--dark-6)", "var(--dark-6)",
  ];
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,5px)",
        gridTemplateRows: "repeat(3,5px)",
        gap: "2px",
      }}
    >
      {cells.map((bg, i) => (
        <div key={i} style={{ background: bg, borderRadius: 1 }} />
      ))}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export function Sidebar({
  activeKey,
  onActiveChange,
  sections,
  user,
  appName = "GridCharge",
  appLabel = "Console",
  collapsed = false,
  onCollapsedChange: _onCollapsedChange,
  className,
  ...props
}: SidebarProps) {
  function handleActivate(key: string) {
    onActiveChange?.(key);
  }

  return (
    <aside
      className={cn(
        "flex flex-col flex-shrink-0",
        "bg-dark-2 border-r border-dark-6",
        collapsed ? "w-14" : "w-[220px]",
        "transition-[width] duration-200",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-dark-6">
        <GridMarkSidebar />
        {!collapsed && (
          <div>
            <p className="font-heading text-[13px] font-semibold text-dark-12 tracking-[-0.01em]">
              {appName}
            </p>
            <p className="font-mono text-[9px] tracking-[0.06em] uppercase text-dark-9">
              {appLabel}
            </p>
          </div>
        )}
      </div>

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
        {sections.map((section, si) => (
          <div key={si}>
            {si > 0 && (
              <div className="my-2 border-t border-dark-6" />
            )}
            {section.label && !collapsed && (
              <p className="font-mono text-[9px] tracking-[0.08em] uppercase text-dark-9 px-[10px] py-[6px] font-medium">
                {section.label}
              </p>
            )}
            {section.items.map((item) => (
              <NavItemRow
                key={item.key}
                item={item}
                active={activeKey === item.key}
                onActivate={handleActivate}
              />
            ))}
          </div>
        ))}
      </nav>

      {/* User row */}
      {user && (
        <div className="border-t border-dark-6 p-2">
          <div className="flex items-center gap-2 px-[10px] py-2">
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
              {user.initials ?? user.name.slice(0, 2).toUpperCase()}
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-body text-[12px] font-medium text-dark-12 truncate">
                  {user.name}
                </p>
                {user.role && (
                  <p className="font-body text-[10px] text-dark-9">{user.role}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
