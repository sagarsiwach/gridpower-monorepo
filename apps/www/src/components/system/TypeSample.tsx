import { cn } from "@/lib/utils";
import { CodeToken } from "./Caption";

/*
  TypeSample.

  Renders a single step of the type scale. Two columns:
    - Left: mono metadata (name, size, line-height, tracking)
    - Right: the sample rendered at that size

  Composition reads like a spec sheet. Designers can scan the left column
  for the value they need and see the corresponding render to the right.
  No decorative gradient over the sample. No filler latin — every sample
  carries real GridPower marketing-voice copy.
*/

export interface TypeSampleData {
  token: string;            // --text-7xl etc
  pxApprox: string;         // "119.6px"
  remValue: string;         // "7.478rem"
  family: "display" | "body" | "mono";
  weight: number;
  leading: string;          // computed line-height token
  tracking: string;         // computed tracking token
  sample: string;           // sample sentence
  usage: string;            // when to use
}

const FAMILY_CLASS: Record<TypeSampleData["family"], string> = {
  display: "font-display",
  body: "font-sans",
  mono: "font-mono",
};

interface TypeSampleProps {
  data: TypeSampleData;
}

export function TypeSample({ data }: TypeSampleProps) {
  return (
    <div className="grid grid-cols-1 gap-6 border-t border-[var(--color-border)] py-8 lg:grid-cols-[200px_minmax(0,1fr)]">
      <dl className="space-y-2">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            token
          </dt>
          <dd>
            <CodeToken>{data.token}</CodeToken>
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            size
          </dt>
          <dd className="font-mono text-xs text-[var(--color-text-body)]">
            {data.pxApprox}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            rem
          </dt>
          <dd className="font-mono text-xs text-[var(--color-text-body)]">
            {data.remValue}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            family
          </dt>
          <dd className="font-mono text-xs text-[var(--color-text-body)]">
            {data.family}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
            weight
          </dt>
          <dd className="font-mono text-xs text-[var(--color-text-body)]">
            {data.weight}
          </dd>
        </div>
        <p className="mt-4 max-w-[28ch] text-xs leading-[1.5] text-[var(--color-text-muted)]">
          {data.usage}
        </p>
      </dl>

      <div className="min-w-0">
        <p
          className={cn(
            FAMILY_CLASS[data.family],
            "text-[var(--color-text-heading)]",
          )}
          style={{
            fontSize: `var(${data.token})`,
            lineHeight: `var(${data.leading})`,
            letterSpacing: `var(${data.tracking})`,
            fontWeight: data.weight,
            maxWidth: "none",
          }}
        >
          {data.sample}
        </p>
      </div>
    </div>
  );
}
