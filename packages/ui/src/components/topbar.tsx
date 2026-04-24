"use client";

import * as React from "react";
import { Bell, Search, User } from "lucide-react";
import { cn } from "../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TopbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left slot — typically a breadcrumb component */
  breadcrumb?: React.ReactNode;
  /** Center slot — search bar or title */
  center?: React.ReactNode;
  /** Notification count badge */
  notificationCount?: number;
  /** Called when notification bell is clicked */
  onNotificationsClick?: () => void;
  /** Called when user avatar is clicked */
  onUserClick?: () => void;
  /** User display name */
  userName?: string;
  /** User initials for avatar */
  userInitials?: string;
  /** Extra right-side actions */
  actions?: React.ReactNode;
}

// ─── Icon button ──────────────────────────────────────────────────────────────

function IconBtn({
  children,
  onClick,
  className,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "relative flex items-center justify-center",
        "p-1.5 rounded-[6px]",
        "text-dark-11 hover:bg-dark-4",
        "transition-colors cursor-pointer",
        "outline-none focus-visible:ring-1 focus-visible:ring-primary",
        className
      )}
    >
      {children}
    </button>
  );
}

// ─── Default search slot ──────────────────────────────────────────────────────

function DefaultSearch() {
  return (
    <div className="relative w-64">
      <Search
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-9 pointer-events-none"
      />
      <input
        type="search"
        placeholder="Search…"
        className={cn(
          "w-full bg-dark-3 border border-dark-6 rounded-input",
          "pl-8 pr-3 py-1.5 font-body text-[13px] text-dark-12",
          "placeholder:text-dark-8",
          "focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary",
          "transition-colors"
        )}
      />
    </div>
  );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────

export function Topbar({
  breadcrumb,
  center,
  notificationCount,
  onNotificationsClick,
  onUserClick,
  userName,
  userInitials,
  actions,
  className,
  ...props
}: TopbarProps) {
  return (
    <div
      className={cn(
        "h-[52px] flex-shrink-0",
        "flex items-center justify-between",
        "px-6",
        "bg-dark-2 border-b border-dark-6",
        className
      )}
      {...props}
    >
      {/* Left — breadcrumb slot */}
      <div className="flex items-center min-w-0">
        {breadcrumb ?? (
          <span className="font-body text-[15px] font-semibold text-dark-12">
            Console
          </span>
        )}
      </div>

      {/* Center — search slot */}
      <div className="flex items-center">
        {center ?? <DefaultSearch />}
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-1">
        {actions}

        {/* Notification bell */}
        <IconBtn
          aria-label="Notifications"
          onClick={onNotificationsClick}
        >
          <Bell size={16} />
          {notificationCount != null && notificationCount > 0 && (
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-primary" />
          )}
        </IconBtn>

        {/* User avatar / button */}
        {userInitials ? (
          <button
            type="button"
            onClick={onUserClick}
            aria-label={userName ?? "User menu"}
            className={cn(
              "w-7 h-7 rounded-full bg-primary",
              "flex items-center justify-center",
              "text-[11px] font-semibold text-white",
              "cursor-pointer hover:opacity-80 transition-opacity",
              "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark-2"
            )}
          >
            {userInitials}
          </button>
        ) : (
          <IconBtn aria-label="User menu" onClick={onUserClick}>
            <User size={16} />
          </IconBtn>
        )}
      </div>
    </div>
  );
}
