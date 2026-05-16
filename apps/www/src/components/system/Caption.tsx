import { cn } from "@/lib/utils";

/*
  Caption.

  Mono micro-label that sits above or beside a sample. Vercel uses this
  pattern in their docs to anchor a name to a token without claiming
  heading space. Geist Mono, uppercase, 0.08em tracking — per DESIGN.md.

  Variants:
  - eyebrow: above a sample
  - inline: alongside content (no bottom margin)
  - mute: lower-emphasis (text-muted)
*/

interface CaptionProps extends React.ComponentProps<"p"> {
  tone?: "default" | "mute" | "brand";
  as?: "p" | "span" | "div";
}

export function Caption({
  className,
  tone = "default",
  as: As = "p",
  ...props
}: CaptionProps) {
  return (
    <As
      className={cn(
        "font-mono text-xs uppercase tracking-[0.08em]",
        tone === "default" && "text-[var(--color-text-heading)]",
        tone === "mute" && "text-[var(--color-text-muted)]",
        tone === "brand" && "text-[var(--color-gp-red)]",
        className,
      )}
      {...props}
    />
  );
}

/*
  CodeToken — inline code value rendered in Geist Mono.
  Used to show a CSS custom property or value alongside a swatch.
*/

interface CodeTokenProps extends React.ComponentProps<"code"> {
  tone?: "default" | "mute";
}

export function CodeToken({
  className,
  tone = "default",
  ...props
}: CodeTokenProps) {
  return (
    <code
      className={cn(
        "font-mono text-xs",
        tone === "default" && "text-[var(--color-text-heading)]",
        tone === "mute" && "text-[var(--color-text-muted)]",
        className,
      )}
      {...props}
    />
  );
}
