/**
 * Settings API keys — /settings/api
 */
import * as React from "react";
import { Plus, Copy } from "lucide-react";
import { API_KEYS, WEBHOOKS } from "~/mocks/settings";

function InlineNotice({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  React.useEffect(() => { const t = setTimeout(onDismiss, 3000); return () => clearTimeout(t); }, [onDismiss]);
  return (
    <div role="status" aria-live="polite" className="rounded-card border border-border bg-card text-foreground px-4 py-2.5 font-mono text-[11px]">
      {message}
    </div>
  );
}

export default function SettingsApi() {
  const [notice, setNotice] = React.useState<string | null>(null);

  return (
    <section aria-labelledby="api-heading" className="flex flex-col gap-5 max-w-3xl">
      <h2 id="api-heading" className="sr-only">API keys</h2>

      {notice && <InlineNotice message={notice} onDismiss={() => setNotice(null)} />}

      <div className="flex items-center justify-between">
        <h3 className="font-body text-[14px] font-semibold text-foreground">API keys</h3>
        <button type="button" onClick={() => setNotice("Generate key dialog coming soon.")}
          className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-3 py-1.5 font-body text-[12px] font-medium text-white hover:bg-primary/90 transition-colors cursor-pointer">
          <Plus size={13} aria-hidden="true" />Generate key
        </button>
      </div>

      {/* Loading: skeleton. Empty: "No API keys yet." Error: role="alert". */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        {API_KEYS.map(key => (
          <div key={key.id} className={`px-5 py-4 border-b border-border last:border-0 ${key.status === "revoked" ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="font-body text-[13px] font-medium text-foreground">{key.name}</div>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  {key.scopes.map(s => (
                    <span key={s} className="inline-flex rounded border border-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{s}</span>
                  ))}
                </div>
              </div>
              <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${key.status === "active" ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                {key.status}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <code className="font-mono text-[11px] text-muted-foreground">{key.maskedKey}</code>
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-[10px] text-muted-foreground">Last used: {key.lastUsed ?? "Never"}</span>
                <button type="button" onClick={() => setNotice("Key ID copied (mock).")} className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
                  <Copy size={11} aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-body text-[14px] font-semibold text-foreground mt-2">Webhooks</h3>
      <div className="rounded-card border border-border bg-card overflow-hidden">
        {WEBHOOKS.map(wh => (
          <div key={wh.id} className="px-5 py-4 border-b border-border last:border-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <code className="font-mono text-[11px] text-foreground break-all">{wh.url}</code>
                <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                  {wh.events.map(e => <span key={e} className="inline-flex rounded border border-border px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground">{e}</span>)}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className={`inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${wh.status === "active" ? "bg-success/10 text-success" : wh.status === "error" ? "bg-error/10 text-error" : "bg-muted text-muted-foreground"}`}>
                  {wh.status}
                </span>
                {wh.failureCount > 0 && <span className="font-mono text-[10px] text-error">{wh.failureCount} failures</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
