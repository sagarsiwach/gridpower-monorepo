"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Breadcrumb({
  items,
  separator,
  className,
  ...props
}: BreadcrumbProps) {
  const sep = separator ?? (
    <ChevronRight size={13} className="text-sand-8 flex-shrink-0" />
  );

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)} {...props}>
      <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && (
                <span aria-hidden="true">{sep}</span>
              )}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-body text-[13px] text-sand-12 font-medium"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? "#"}
                  className={cn(
                    "font-body text-[13px] text-sand-9",
                    "hover:text-sand-12 transition-colors",
                    "no-underline"
                  )}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Dark variant for console topbar ──────────────────────────────────────────

export function BreadcrumbDark({
  items,
  separator,
  className,
  ...props
}: BreadcrumbProps) {
  const sep = separator ?? (
    <ChevronRight size={13} className="text-dark-8 flex-shrink-0" />
  );

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center", className)} {...props}>
      <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden="true">{sep}</span>}
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-body text-[13px] text-dark-12 font-medium"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href ?? "#"}
                  className={cn(
                    "font-body text-[13px] text-dark-9",
                    "hover:text-dark-12 transition-colors",
                    "no-underline"
                  )}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
