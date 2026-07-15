import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
  GridPower button system.
  - Primary (filled GridRed): max 1 per visible section
  - Secondary (outlined neutral-700): standard CTAs
  - Ghost (text + arrow): inline learn-more
  - Radii: --radius-sm (4px) per DESIGN.md — never pillowy
  - No drop shadows. Background-color hover only.
  - 1.02 scale on primary CTA hover (DESIGN.md motion spec)
*/

const buttonVariants = cva(
  [
    "group/button inline-flex shrink-0 items-center justify-center gap-1.5",
    "border text-sm font-medium whitespace-nowrap",
    "transition-all outline-none select-none",
    "letter-spacing-[var(--tracking-button)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:outline-[oklch(0.58_0.245_27_/_0.5)]",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        // Primary: GridRed fill — 1.02 scale on hover, 200ms ease-out
        primary: [
          "rounded-[var(--radius-sm)] border-transparent",
          "bg-[var(--color-gp-red)] text-[var(--color-neutral-50)]",
          "hover:bg-[var(--color-gp-red-hover)]",
          "hover:scale-[1.02]",
          "transition-[background-color,transform]",
          "duration-200",
          "focus-visible:ring-0",
        ].join(" "),
        // Secondary: outlined neutral-700 border
        secondary: [
          "rounded-[var(--radius-sm)]",
          "border-[var(--color-neutral-700)] bg-transparent",
          "text-[var(--color-neutral-700)]",
          "hover:bg-[var(--color-neutral-100)]",
          "hover:border-[var(--color-neutral-900)]",
          "transition-colors duration-200",
        ].join(" "),
        // Ghost: text-only with arrow affordance
        ghost: [
          "rounded-[var(--radius-sm)] border-transparent",
          "text-[var(--color-neutral-700)] bg-transparent",
          "hover:text-[var(--color-neutral-900)]",
          "hover:bg-[var(--color-neutral-100)]",
          "transition-colors duration-200",
        ].join(" "),
        // Destructive: de-saturated red for forms
        destructive: [
          "rounded-[var(--radius-sm)] border-transparent",
          "bg-[oklch(0.52_0.15_25_/_0.1)] text-[var(--color-form-error)]",
          "hover:bg-[oklch(0.52_0.15_25_/_0.15)]",
          "transition-colors duration-200",
        ].join(" "),
      },
      size: {
        default: "h-9 px-4 py-0",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-6 text-base",
        icon: "size-9",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
