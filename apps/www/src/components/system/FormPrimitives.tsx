import { useId } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/*
  Form atomic primitives — Label, HelperText, ErrorText, SuccessText.

  DESIGN.md rule: labels above inputs, never inside. No float labels.
  Helper text below the input, muted. Error text replaces helper text on
  validation failure, in --form-error.

  Field is a small layout component that groups Label + input + helper.
  It also generates an id so labels can target without manual prop drilling.
*/

interface LabelProps extends React.ComponentProps<"label"> {
  required?: boolean;
}

export function Label({
  className,
  required,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-[var(--color-text-heading)]",
        className,
      )}
      {...props}
    >
      {children}
      {required ? (
        <span
          aria-hidden="true"
          className="ml-1 font-mono text-xs text-[var(--color-gp-red)]"
        >
          *
        </span>
      ) : null}
    </label>
  );
}

interface HelperTextProps extends React.ComponentProps<"p"> {
  tone?: "muted" | "error" | "success";
}

export function HelperText({
  className,
  tone = "muted",
  ...props
}: HelperTextProps) {
  return (
    <p
      className={cn(
        "mt-2 text-xs",
        tone === "muted" && "text-[var(--color-text-muted)]",
        tone === "error" && "text-[var(--color-form-error)]",
        tone === "success" && "text-[var(--color-form-success)]",
        className,
      )}
      {...props}
    />
  );
}

/*
  Field.

  Groups Label + input + HelperText with consistent spacing and id wiring.
*/

interface FieldProps {
  label: string;
  helper?: string;
  error?: string;
  success?: string;
  required?: boolean;
  children: (id: string) => React.ReactNode;
  className?: string;
}

export function Field({
  label,
  helper,
  error,
  success,
  required,
  children,
  className,
}: FieldProps) {
  const id = useId();
  return (
    <div className={cn("flex flex-col", className)}>
      <Label htmlFor={id} required={required} className="mb-2">
        {label}
      </Label>
      {children(id)}
      {error ? (
        <HelperText tone="error">{error}</HelperText>
      ) : success ? (
        <HelperText tone="success">{success}</HelperText>
      ) : helper ? (
        <HelperText>{helper}</HelperText>
      ) : null}
    </div>
  );
}

/*
  Textarea — same visual rules as Input. Multi-line. Per DESIGN.md:
  radius-xs, 1px neutral-300 border, focus ring GridRed at 50% opacity.
*/

interface TextareaProps extends React.ComponentProps<"textarea"> {
  invalid?: boolean;
}

export function Textarea({ className, invalid, ...props }: TextareaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(
        "block w-full min-w-0 resize-y",
        "rounded-[var(--radius-xs)]",
        "border border-[var(--color-border)]",
        "bg-transparent",
        "px-3 py-2.5",
        "text-sm text-[var(--color-text-body)]",
        "placeholder:text-[var(--color-text-muted)]",
        "transition-[border-color,outline] duration-200",
        "outline-none",
        "focus-visible:border-[var(--color-gp-red)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1",
        "focus-visible:outline-[oklch(0.58_0.245_27_/_0.5)]",
        "disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed",
        "aria-invalid:border-[var(--color-form-error)]",
        "aria-invalid:focus-visible:outline-[oklch(0.52_0.15_25_/_0.4)]",
        className,
      )}
      {...props}
    />
  );
}

/*
  StateInput.

  Like StateButton — simulates :focus and aria-invalid visuals at rest
  so all input states can render in a single grid for documentation.
*/

import type { ComponentState } from "./StateGrid";

interface StateInputProps extends Omit<React.ComponentProps<"input">, "size"> {
  state: ComponentState | "Error" | "Success";
  placeholder?: string;
}

export function StateInput({
  state,
  placeholder,
  ...props
}: StateInputProps) {
  const isDisabled = state === "Disabled";

  let className = "";
  let invalidAttr: boolean | undefined;

  if (state === "Focus") {
    className =
      "border-[var(--color-gp-red)] outline outline-2 outline-offset-1 outline-[oklch(0.58_0.245_27_/_0.5)]";
  } else if (state === "Error") {
    className = "border-[var(--color-form-error)]";
    invalidAttr = true;
  } else if (state === "Success") {
    className = "border-[var(--color-form-success)]";
  }

  return (
    <Input
      placeholder={placeholder ?? "215 kWh ATLAS"}
      disabled={isDisabled}
      aria-invalid={invalidAttr || undefined}
      className={className}
      {...props}
    />
  );
}
