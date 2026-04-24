"use client";

import * as React from "react";
import { cn } from "../lib/utils";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Render as a circle (for avatars) */
  circle?: boolean;
}

export function Skeleton({ circle = false, className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-sand-4",
        circle ? "rounded-full" : "rounded-btn",
        className
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

// ─── Convenience preset shapes ────────────────────────────────────────────────

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  const widths = ["w-full", "w-5/6", "w-4/6", "w-3/4", "w-11/12"];
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3.5", widths[i % widths.length])}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-card border border-sand-6 bg-sand-2 p-4 space-y-3",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Skeleton circle className="w-10 h-10 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}
