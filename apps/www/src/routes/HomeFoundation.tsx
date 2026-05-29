import { TopUtilityBar } from "@/components/nav/TopUtilityBar";
import { MainNav } from "@/components/nav/MainNav";
import { Footer } from "@/components/footer/Footer";
import { Link } from "react-router";

/*
  Foundation smoke test (kept).

  This was the original App.tsx body. Preserved verbatim so token
  decisions can still be inspected at `/`. Will be replaced by the
  real homepage in SAG-2985.

  Includes a link to /system at the top so anyone landing on the
  prototype can jump straight to the design playground.
*/
export default function HomeFoundation() {
  return (
    <div className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-body)]">
      <TopUtilityBar />
      <MainNav />

      <main className="mx-auto max-w-[var(--container-2xl)] px-6 py-24">
        {/* Promo banner pointing at /system */}
        <Link
          to="/system"
          className="mb-12 inline-flex items-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-neutral-50)] px-4 py-1.5 text-xs text-[var(--color-text-body)] transition-colors duration-[var(--duration-hover)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-heading)]"
        >
          <span className="font-mono uppercase tracking-[0.08em] text-[var(--color-gp-red)]">
            New
          </span>
          <span>Design system playground</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5h5m0 0L4.5 2.5M7 5L4.5 7.5"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Hero — typography test */}
        <section className="mb-32">
          <p className="mb-6 font-mono text-sm uppercase tracking-[0.08em] text-[var(--color-gp-red)]">
            Foundation · Smoke test
          </p>
          <h1 className="font-display text-7xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--color-text-heading)]">
            The energy platform <br />
            that actually works.
          </h1>
          <p className="mt-8 max-w-[68ch] text-lg text-[var(--color-text-body)]">
            This canvas exists to lock token decisions visually. The smoke test
            renders every typeface, every neutral step, every brand surface, and
            the locked motion language. Once approved, page work begins.
          </p>
          <div className="mt-12 flex gap-4">
            <button
              type="button"
              className="rounded-sm bg-[var(--color-gp-red)] px-6 py-3 font-medium text-[var(--color-neutral-50)] transition-all duration-[var(--duration-hover)] hover:bg-[var(--color-gp-red-hover)]"
            >
              Primary CTA
            </button>
            <button
              type="button"
              className="rounded-sm border border-[var(--color-border-strong)] px-6 py-3 font-medium text-[var(--color-text-heading)] transition-all duration-[var(--duration-hover)] hover:bg-[var(--color-neutral-100)]"
            >
              Secondary CTA
            </button>
          </div>
        </section>

        {/* Neutral scale */}
        <section className="mb-32">
          <h2 className="mb-2 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
            Whisper warm neutrals
          </h2>
          <p className="mb-8 max-w-[68ch] text-[var(--color-text-muted)]">
            Hue 27°. Chroma curves through mid-grays to avoid garish extremes.
            If you notice the tint, it went too far.
          </p>
          <div className="grid grid-cols-11 gap-1">
            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
              (step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className="h-24 w-full rounded-sm"
                    style={{ backgroundColor: `var(--color-neutral-${step})` }}
                  />
                  <p className="mt-2 font-mono text-xs text-[var(--color-text-muted)]">
                    {step}
                  </p>
                </div>
              ),
            )}
          </div>
        </section>

        {/* Brand color */}
        <section className="mb-32">
          <h2 className="mb-2 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
            GridRed
          </h2>
          <p className="mb-8 max-w-[68ch] text-[var(--color-text-muted)]">
            <code className="font-mono">oklch(0.58 0.245 27)</code> — true red,
            slightly cooler than the original <code className="font-mono">#FA0016</code>.
            Industrial-confident, not consumer-cheerful.
          </p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Brand", token: "--color-gp-red" },
              { label: "Hover", token: "--color-gp-red-hover" },
              { label: "Muted", token: "--color-gp-red-muted" },
              { label: "Tinted", token: "--color-gp-red-tinted" },
            ].map(({ label, token }) => (
              <div key={token}>
                <div
                  className="h-32 rounded-md"
                  style={{ backgroundColor: `var(${token})` }}
                />
                <p className="mt-3 font-medium text-sm">{label}</p>
                <code className="font-mono text-xs text-[var(--color-text-muted)]">
                  var({token})
                </code>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-32">
          <h2 className="mb-8 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--color-text-heading)]">
            Typography
          </h2>

          <div className="space-y-12">
            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Display · Clash Grotesk Semibold
              </p>
              <p className="font-display text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--color-text-heading)]">
                Storage turns solar into a profit centre.
              </p>
            </div>

            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Body · Inter
              </p>
              <p className="max-w-[68ch] text-base text-[var(--color-text-body)] leading-[1.625]">
                A rooftop solar array without storage is a capex item that pays
                back in 4 to 6 years through net-metering credits. The same
                array paired with a GridEnergy ATLAS unit becomes a revenue
                engine. It shifts solar to peak hours, shaves demand charges,
                displaces diesel during outages, and earns DR payouts during
                stress events.
              </p>
            </div>

            <div>
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-text-muted)]">
                Mono · Geist Mono
              </p>
              <table className="w-full max-w-2xl">
                <tbody className="font-mono text-sm">
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="py-3 text-[var(--color-text-muted)]">Capacity</td>
                    <td className="py-3 text-right">215 kWh</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="py-3 text-[var(--color-text-muted)]">Cooling</td>
                    <td className="py-3 text-right">Liquid</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="py-3 text-[var(--color-text-muted)]">Payback</td>
                    <td className="py-3 text-right">18 to 36 months</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="py-3 text-[var(--color-text-muted)]">IRR</td>
                    <td className="py-3 text-right">18 to 24%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Committed hero — single full-GridRed section per page rule */}
        <section className="-mx-6 bg-[var(--color-gp-red)] px-6 py-20 text-[var(--color-neutral-50)]">
          <div className="mx-auto max-w-[var(--container-2xl)]">
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.08em] opacity-80">
              Committed CTA test
            </p>
            <h2 className="font-display text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
              Talk to an engineer who will install your battery.
            </h2>
            <button
              type="button"
              className="mt-8 rounded-sm bg-[var(--color-neutral-50)] px-6 py-3 font-medium text-[var(--color-gp-red)] transition-all duration-[var(--duration-hover)] hover:bg-[var(--color-neutral-100)]"
            >
              Request a quote
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
