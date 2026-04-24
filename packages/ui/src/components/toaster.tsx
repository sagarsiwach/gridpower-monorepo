"use client";

import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";
import type { ToasterProps as SonnerToasterProps } from "sonner";
import { cn } from "../lib/utils";

export interface ToasterProps extends SonnerToasterProps {
  className?: string;
}

/**
 * Toaster — drop this once at your app root.
 * Themed for GridPower design system (sand scale + GridRed accents).
 */
export function Toaster({ className, ...props }: ToasterProps) {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast: cn(
            "group",
            "flex items-start gap-3",
            "rounded-card border border-sand-6 bg-sand-1",
            "p-4 shadow-lg",
            "font-body text-[13px] text-sand-12",
            className
          ),
          title: "font-semibold text-[13px] text-sand-12",
          description: "text-[12px] text-sand-9 mt-0.5",
          actionButton:
            "bg-primary text-white rounded-btn px-3 py-1 text-[12px] font-medium hover:bg-grid-red-hover transition-colors",
          cancelButton:
            "bg-sand-3 text-sand-11 rounded-btn px-3 py-1 text-[12px] hover:bg-sand-4 transition-colors",
          closeButton:
            "text-sand-9 hover:text-sand-12 transition-colors",
          success:
            "border-success/30 bg-success-bg [&>[data-icon]]:text-success",
          error:
            "border-error/30 bg-error-bg [&>[data-icon]]:text-error",
          warning:
            "border-warning/30 bg-warning-bg [&>[data-icon]]:text-warning",
          info:
            "border-info/30 bg-info-bg [&>[data-icon]]:text-info",
          loading:
            "border-sand-6",
        },
      }}
      {...props}
    />
  );
}
