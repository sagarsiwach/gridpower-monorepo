/**
 * Stub page used by the 5 nav destinations until CON.2-5 fill in real content.
 * Renders inside ConsoleShell's <Outlet/>, so the shell + DotGrid bg are already
 * present from the parent layout.
 */
export function StubPage({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="space-y-3">
      <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary">
        {title.toUpperCase()}
      </p>
      <h1 className="font-heading text-h2 text-foreground">{title}</h1>
      {subtitle && <p className="font-body text-body text-muted-foreground">{subtitle}</p>}
    </section>
  );
}
