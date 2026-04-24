"use client";

/**
 * toast.tsx — thin wrappers + type re-exports around sonner
 * Usage:
 *   import { toast } from "@gridpower/ui";
 *   toast.success("Saved!") / toast.error("Failed") / etc.
 *
 * For the provider, use <Toaster /> from toaster.tsx.
 */

import { toast as sonnerToast } from "sonner";
import type { ExternalToast } from "sonner";

// Re-export the toast function with GridPower semantic sugar
export const toast = {
  success: (message: string, opts?: ExternalToast) =>
    sonnerToast.success(message, opts),
  error: (message: string, opts?: ExternalToast) =>
    sonnerToast.error(message, opts),
  warning: (message: string, opts?: ExternalToast) =>
    sonnerToast.warning(message, opts),
  info: (message: string, opts?: ExternalToast) =>
    sonnerToast.info(message, opts),
  loading: (message: string, opts?: ExternalToast) =>
    sonnerToast.loading(message, opts),
  dismiss: (id?: string | number) => sonnerToast.dismiss(id),
  promise: sonnerToast.promise,
  custom: sonnerToast.custom,
};

// Also re-export raw sonner toast for full control
export { sonnerToast as rawToast };
