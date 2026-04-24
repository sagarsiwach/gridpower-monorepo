"use client";

import * as React from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const alertVariants = cva(
  [
    "relative flex gap-3",
    "rounded-card p-4",
    "border",
    "font-body",
  ],
  {
    variants: {
      variant: {
        info:    "bg-info-bg    border-info/30    text-info",
        success: "bg-success-bg border-success/30 text-success",
        warning: "bg-warning-bg border-warning/30 text-warning",
        error:   "bg-error-bg   border-error/30   text-error",
      },
    },
    defaultVariants: { variant: "info" },
  }
);

const ICONS = {
  info:    Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error:   XCircle,
} as const;

// ─── Alert props ──────────────────────────────────────────────────────────────

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

// ─── Alert ────────────────────────────────────────────────────────────────────

export function Alert({
  variant = "info",
  title,
  description,
  icon,
  dismissible = false,
  onDismiss,
  className,
  children,
  ...props
}: AlertProps) {
  const IconComp = ICONS[variant ?? "info"];
  const resolvedIcon = icon ?? <IconComp size={16} className="flex-shrink-0 mt-0.5" />;

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {/* Icon */}
      {resolvedIcon}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <p className="text-[14px] font-semibold mb-0.5">{title}</p>
        )}
        {description && (
          <p className="text-[13px] opacity-90 leading-[1.5]">{description}</p>
        )}
        {children}
      </div>

      {/* Dismiss */}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss alert"
          className="flex-shrink-0 p-0.5 rounded opacity-60 hover:opacity-100 transition-opacity outline-none focus-visible:ring-1 focus-visible:ring-current"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
