"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";

// ─── Variants ─────────────────────────────────────────────────────────────────

const tabsListVariants = cva(
  "flex items-center",
  {
    variants: {
      variant: {
        underline: "border-b border-sand-6 gap-0",
        pill: "gap-1 bg-sand-3 p-1 rounded-pill",
      },
    },
    defaultVariants: { variant: "underline" },
  }
);

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center",
    "font-body text-[14px] font-medium",
    "transition-colors duration-150",
    "cursor-pointer outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "focus-visible:ring-1 focus-visible:ring-primary",
  ],
  {
    variants: {
      variant: {
        underline: [
          "px-4 pb-3 pt-2",
          "text-sand-9",
          "border-b-2 border-transparent -mb-px",
          "hover:text-sand-12",
          "data-[state=active]:text-sand-12",
          "data-[state=active]:border-primary",
        ],
        pill: [
          "px-4 py-1.5 rounded-pill",
          "text-sand-10",
          "hover:text-sand-12",
          "data-[state=active]:bg-sand-1 data-[state=active]:text-sand-12 data-[state=active]:shadow-sm",
        ],
      },
    },
    defaultVariants: { variant: "underline" },
  }
);

// ─── Context for variant ──────────────────────────────────────────────────────

const TabsVariantContext = React.createContext<"underline" | "pill">("underline");

// ─── Tabs root ────────────────────────────────────────────────────────────────

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: "underline" | "pill";
}

function Tabs({ variant = "underline", className, children, ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        className={cn("flex flex-col", className)}
        {...props}
      >
        {children}
      </TabsPrimitive.Root>
    </TabsVariantContext.Provider>
  );
}

// ─── TabsList ─────────────────────────────────────────────────────────────────

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

// ─── TabsTrigger ──────────────────────────────────────────────────────────────

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// ─── TabsContent ─────────────────────────────────────────────────────────────

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 outline-none",
      "focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
