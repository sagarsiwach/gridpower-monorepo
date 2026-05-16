import { Button } from "@/components/ui/button";
import { Spinner } from "./Spinner";
import { cn } from "@/lib/utils";
import type { ComponentState } from "./StateGrid";

/*
  StateButton.

  Wraps the production Button primitive and simulates :hover and
  :focus-visible visuals at rest. The production primitive already
  handles real interactions. This wrapper exists ONLY for the docs
  page so users can see all five states in a single grid without
  hovering each one.

  How we simulate:
  - Hover: append the same classes the :hover variant uses.
  - Focus: append a ring matching the focus-visible outline.
  - Disabled: pass disabled prop (uses primitive's :disabled styles).
  - Loading: render a spinner inline + disable.

  Important: never use this in production code paths. State props
  override real interaction behavior.
*/

type Variant = "primary" | "secondary" | "ghost" | "destructive";
type Size = "sm" | "default" | "lg";

interface StateButtonProps {
  variant: Variant;
  size?: Size;
  state: ComponentState;
  children: React.ReactNode;
}

export function StateButton({
  variant,
  size = "default",
  state,
  children,
}: StateButtonProps) {
  // Map state to forced classes. These mirror the Tailwind classes inside
  // the production buttonVariants cva but applied at rest.
  const stateClasses = (() => {
    if (state === "Hover") {
      if (variant === "primary") {
        return "bg-[var(--color-gp-red-hover)] scale-[1.02]";
      }
      if (variant === "secondary") {
        return "bg-[var(--color-neutral-100)] border-[var(--color-neutral-900)]";
      }
      if (variant === "ghost") {
        return "bg-[var(--color-neutral-100)] text-[var(--color-neutral-900)]";
      }
      if (variant === "destructive") {
        return "bg-[oklch(0.52_0.15_25_/_0.15)]";
      }
    }
    if (state === "Focus") {
      return "outline outline-2 outline-offset-2 outline-[oklch(0.58_0.245_27_/_0.5)] rounded-[var(--radius-sm)]";
    }
    return "";
  })();

  const isDisabled = state === "Disabled" || state === "Loading";

  return (
    <Button
      variant={variant}
      size={size}
      disabled={isDisabled}
      className={cn(stateClasses)}
    >
      {state === "Loading" ? (
        <>
          <Spinner
            tone={variant === "primary" ? "inverse" : "neutral"}
            size={14}
          />
          {children}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
