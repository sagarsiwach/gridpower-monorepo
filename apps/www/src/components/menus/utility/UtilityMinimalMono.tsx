import { Link } from "react-router-dom";
import { UTILITY_LINKS } from "../_shared/content";

/*
  Utility bar — Variant A: Minimal mono.
  Whisper-warm neutral-100 strip, Geist Mono left tagline,
  Inter text-xs links right. Same family as production v1.
  Anti-reference: no pill chips, no border bottom emphasis.
*/
export function UtilityMinimalMono() {
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-neutral-100)]">
      <div className="mx-auto flex max-w-[var(--container-2xl)] items-center justify-between gap-6 px-5 py-2 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
          The open energy platform
        </p>
        <nav>
          <ul className="flex items-center gap-5 sm:gap-6">
            {UTILITY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-xs text-[var(--color-text-muted)] transition-colors duration-[var(--duration-hover)] ease-[var(--ease-hover)] hover:text-[var(--color-text-heading)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
