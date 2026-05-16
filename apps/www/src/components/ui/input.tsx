import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

/*
  GridPower Input.

  Rules from DESIGN.md:
  - Radius: --radius-xs (2px) — inputs are the sharpest element
  - Border: 1px solid --neutral-300
  - Focus ring: --gp-red at 50% opacity
  - Labels above inputs, never inside (no float labels)
  - Error state: --form-error text + border
  - Disabled: 0.4 opacity
*/

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0",
        "rounded-[var(--radius-xs)]",
        "border border-[var(--color-border)]",
        "bg-transparent",
        "px-3 py-0",
        "text-[var(--text-sm)] text-[var(--color-text-body)]",
        "placeholder:text-[var(--color-text-muted)]",
        "transition-[border-color,outline] duration-200",
        "outline-none",
        // Focus: GridRed ring at 50% opacity
        "focus-visible:border-[var(--color-gp-red)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
        "focus-visible:outline-[oklch(0.58_0.245_27_/_0.5)]",
        // Disabled
        "disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed",
        // Error state
        "aria-invalid:border-[var(--color-form-error)]",
        "aria-invalid:focus-visible:outline-[oklch(0.52_0.15_25_/_0.4)]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
