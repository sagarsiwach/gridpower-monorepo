import * as React from "react";
import { cn } from "../lib/utils.js";

export interface Logo {
  /** Accessible name for the logo image. */
  alt: string;
  /** Logo image URL. */
  src: string;
  /** Optional href — wraps the logo in an anchor tag. */
  href?: string;
}

export interface LogoCloudProps extends React.HTMLAttributes<HTMLDivElement> {
  logos: Logo[];
  /**
   * When true, logos are rendered in `grayscale` with a `hover:grayscale-0`
   * transition for a monochrome-first appearance.
   * Defaults to `true`.
   */
  monochrome?: boolean;
}

/**
 * LogoCloud — partner / investor / client logo grid.
 *
 * Responsive columns: 3 on mobile → 4 on md → 6 on lg.
 * `monochrome` (default true): `grayscale hover:grayscale-0 transition-[filter]`
 * so logos start muted and reveal colour on hover.
 *
 * @example
 * <LogoCloud logos={[
 *   { alt: "Partner A", src: "/logos/partner-a.svg", href: "https://example.com" },
 *   { alt: "Partner B", src: "/logos/partner-b.svg" },
 * ]} />
 */
const LogoCloud = React.forwardRef<HTMLDivElement, LogoCloudProps>(
  ({ logos, monochrome = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center",
          className,
        )}
        {...props}
      >
        {logos.map((logo, i) => {
          const img = (
            <img
              src={logo.src}
              alt={logo.alt}
              className={cn(
                "h-8 w-auto object-contain transition-[filter] duration-200",
                monochrome && "grayscale hover:grayscale-0",
              )}
              loading="lazy"
            />
          );

          if (logo.href != null) {
            return (
              <a
                key={i}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                aria-label={logo.alt}
              >
                {img}
              </a>
            );
          }

          return (
            <div key={i} className="flex items-center justify-center">
              {img}
            </div>
          );
        })}
      </div>
    );
  },
);
LogoCloud.displayName = "LogoCloud";

export { LogoCloud };
