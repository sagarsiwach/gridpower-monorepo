import * as React from "react";

import { cn } from "@/lib/utils";

/*
  GridPower Card system.

  Rules from DESIGN.md:
  - No drop shadows. Use hairline border (--neutral-300) instead.
  - Radius: --radius-md (6px) — subtle, not pillowy
  - Card on neutral-50 page: neutral-100 background
  - Card on neutral-100 section: neutral-50 background
  - No nested cards. Ever.
  - Bento with size variance — never identical card grids.

  Surface prop selects the card-on-page or card-on-section variant.
*/

interface CardProps extends React.ComponentProps<"div"> {
  surface?: "on-page" | "on-section";
}

function Card({ className, surface = "on-page", ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-surface={surface}
      className={cn(
        "flex flex-col overflow-hidden",
        "rounded-[var(--radius-md)]",
        "border border-[var(--color-border)]",
        // No drop shadows — per DESIGN.md absolute bans
        surface === "on-page"
          ? "bg-[var(--color-neutral-100)]"
          : "bg-[var(--color-neutral-50)]",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "font-[var(--font-body)] font-medium text-[var(--color-neutral-900)]",
        "text-[var(--text-xl)] leading-[var(--leading-section)]",
        "tracking-[var(--tracking-heading)]",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "text-[var(--text-sm)] text-[var(--color-text-muted)]",
        "leading-[var(--leading-body)] max-w-none",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center p-6 pt-0",
        className
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
