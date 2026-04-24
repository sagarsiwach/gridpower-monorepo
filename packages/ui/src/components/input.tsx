import * as React from "react";
import { cn } from "../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  error?: boolean;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, type, leadingIcon, trailingIcon, error, helperText, ...props },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="relative flex items-center">
          {leadingIcon && (
            <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
              {leadingIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-input border border-input bg-secondary px-3 py-2",
              "font-body text-body text-foreground",
              "placeholder:text-muted-foreground",
              "transition-colors duration-fast",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-error focus-visible:ring-error",
              leadingIcon && "pl-9",
              trailingIcon && "pr-9",
              className
            )}
            ref={ref}
            {...props}
          />
          {trailingIcon && (
            <div className="pointer-events-none absolute right-3 flex items-center text-muted-foreground">
              {trailingIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p
            className={cn(
              "text-body-sm",
              error ? "text-error" : "text-muted-foreground"
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
