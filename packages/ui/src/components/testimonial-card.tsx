import * as React from "react";
import { cn } from "../lib/utils.js";

export interface TestimonialCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** The testimonial quote text (without surrounding quotes) */
  quote: string;
  /** Avatar image src */
  avatarSrc?: string;
  /** Person's name */
  name: string;
  /** Role / attribution */
  role: string;
}

const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ className, quote, avatarSrc, name, role, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-6 rounded-card border border-border bg-card p-8",
        className
      )}
      {...props}
    >
      {/* Opening quote mark */}
      <div className="font-mono text-[2rem] leading-none text-grid-red select-none">
        &ldquo;
      </div>

      {/* Quote */}
      <blockquote className="font-display text-h4 font-semibold text-foreground leading-snug tracking-tight italic">
        {quote}
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-3 pt-2 border-t border-border">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand-3 font-mono text-label text-sand-9">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col gap-0.5">
          <span className="font-body text-body-sm font-semibold text-foreground">
            {name}
          </span>
          <span className="font-mono text-label text-sand-9 uppercase tracking-widest">
            {role}
          </span>
        </div>
      </div>
    </div>
  )
);
TestimonialCard.displayName = "TestimonialCard";

export { TestimonialCard };
