import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-btn font-body font-medium leading-none",
    "transition-colors duration-fast",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground border border-primary",
          "hover:bg-grid-red-hover hover:border-grid-red-hover",
          "active:bg-grid-red-active active:border-grid-red-active",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground border border-border",
          "hover:bg-accent",
          "active:bg-accent",
        ],
        ghost: [
          "bg-transparent text-foreground border border-border",
          "hover:bg-accent",
          "active:bg-accent",
        ],
        destructive: [
          "bg-destructive text-destructive-foreground border border-destructive",
          "hover:bg-destructive/90",
          "active:bg-destructive/80",
        ],
        link: [
          "bg-transparent text-grid-red underline-offset-4 hover:underline border-0",
          "p-0 h-auto",
        ],
      },
      size: {
        sm: "h-8 px-4 text-body-sm",
        md: "h-10 px-6 text-body",
        lg: "h-12 px-8 text-body-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
