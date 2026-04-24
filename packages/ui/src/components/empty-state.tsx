"use client";

import * as React from "react";
import { cn } from "../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        "px-8 py-16 gap-4",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="w-12 h-12 rounded-card bg-sand-3 flex items-center justify-center text-sand-9 flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex flex-col gap-1.5 max-w-sm">
        <p className="font-heading text-[16px] font-semibold text-sand-12">
          {title}
        </p>
        {description && (
          <p className="font-body text-[13px] text-sand-9 leading-[1.6]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
