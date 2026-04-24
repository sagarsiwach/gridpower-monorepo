"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** How many numbered pages to show around the current page */
  siblings?: number;
}

// ─── Page button ──────────────────────────────────────────────────────────────

function PageBtn({
  children,
  active = false,
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center justify-center",
        "min-w-8 h-8 px-2 rounded-btn",
        "font-body text-[13px]",
        "transition-colors duration-150",
        "outline-none focus-visible:ring-1 focus-visible:ring-primary",
        active
          ? "bg-primary text-white font-medium"
          : "text-sand-11 hover:bg-sand-3 hover:text-sand-12",
        disabled && "opacity-40 pointer-events-none"
      )}
    >
      {children}
    </button>
  );
}

// ─── Generate page range ──────────────────────────────────────────────────────

function getRange(page: number, total: number, siblings: number): (number | "…")[] {
  const delta = siblings + 2;
  const left = page - delta;
  const right = page + delta;

  const range: number[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= left && i <= right)) {
      range.push(i);
    }
  }

  const result: (number | "…")[] = [];
  let prev: number | undefined;
  for (const p of range) {
    if (prev !== undefined && p - prev > 1) {
      result.push("…");
    }
    result.push(p);
    prev = p;
  }
  return result;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export function Pagination({
  page,
  totalPages,
  onPageChange,
  siblings = 1,
  className,
  ...props
}: PaginationProps) {
  const pages = getRange(page, totalPages, siblings);

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {/* First */}
      <PageBtn
        disabled={page <= 1}
        onClick={() => onPageChange(1)}
        aria-label="First page"
      >
        <span className="sr-only">First</span>
        <span aria-hidden className="flex items-center">
          <ChevronRight size={13} className="rotate-180" />
          <ChevronRight size={13} className="rotate-180 -ml-1.5" />
        </span>
      </PageBtn>

      {/* Prev */}
      <PageBtn
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Previous page"
      >
        <span className="sr-only">Previous</span>
        <ChevronRight size={13} className="rotate-180" aria-hidden />
      </PageBtn>

      {/* Numbered pages */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`ellipsis-${i}`}
            className="min-w-8 h-8 inline-flex items-center justify-center text-sand-9 font-body text-[13px]"
            aria-hidden
          >
            …
          </span>
        ) : (
          <PageBtn
            key={p}
            active={p === page}
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
          >
            {p}
          </PageBtn>
        )
      )}

      {/* Next */}
      <PageBtn
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        aria-label="Next page"
      >
        <span className="sr-only">Next</span>
        <ChevronRight size={13} aria-hidden />
      </PageBtn>

      {/* Last */}
      <PageBtn
        disabled={page >= totalPages}
        onClick={() => onPageChange(totalPages)}
        aria-label="Last page"
      >
        <span className="sr-only">Last</span>
        <span aria-hidden className="flex items-center">
          <ChevronRight size={13} />
          <ChevronRight size={13} className="-ml-1.5" />
        </span>
      </PageBtn>
    </nav>
  );
}
