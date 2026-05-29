import { Link } from "react-router";

import { BrandMark } from "../_shared/BrandMark";
import { PRIMARY_LINKS } from "../_shared/content";

/*
  Primary nav — Variant C: Apple-style centered.
  Defining attributes:
  - Brand wordmark centred-left, nav links centred at full width
  - Wider letter spacing, slimmer weight on links — the bar reads as
    horizontal type rather than functional UI
  - Sign in + cart-style CTA on the right
  - No mega panel here — a centred nav with a heavy hover panel
    fights its own typography. This variant is the "narrow product page"
    pattern: nav goes home, hover handled per-page below.
  - Hairline divider only on the bottom edge of a single inner container.
*/
export function PrimaryAppleCentered() {
  return (
    <header className="bg-[var(--color-page-bg)]">
      <div className="mx-auto max-w-[var(--container-2xl)] px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-[var(--color-border)] py-3.5">
          <BrandMark />

          <nav className="hidden justify-self-center lg:block">
            <ul className="flex items-center gap-8">
              {PRIMARY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[13px] tracking-[0.01em] text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5 justify-self-end">
            <Link
              to="/sign-in"
              className="hidden text-[13px] text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-text-heading)] md:inline"
              aria-label="Sign in"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M8 8a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5ZM3 13.25c0-2.21 2.239-3.75 5-3.75s5 1.54 5 3.75"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </Link>
            <Link
              to="/signup"
              className="text-[13px] tracking-[0.01em] text-[var(--color-text-heading)] transition-colors duration-[var(--duration-hover)] hover:text-[var(--color-gp-red)]"
            >
              Get early access
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
