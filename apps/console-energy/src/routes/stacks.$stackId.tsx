/**
 * Stack detail — /stacks/:stackId
 */
import * as React from "react";
import { useParams } from "react-router";
import { ALL_STACKS } from "~/mocks/stacks";

function MetaField({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      <span className="font-body text-[13px] text-foreground">{value}</span>
    </div>
  );
}

function SohGauge({ value }: { value: number }) {
  const color = value >= 95 ? "bg-success" : value >= 90 ? "bg-info" : "bg-warning";
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-[40px] font-semibold leading-none text-foreground">{value}</span>
        <span className="font-mono text-[18px] text-muted-foreground">%</span>
      </div>
      <div className="h-2.5 w-full max-w-xs rounded-full bg-muted overflow-hidden" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`State of health ${value}%`}>
        <div className={`h-full rounded-full ${color} transition-all`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function StackDetail() {
  const { stackId } = useParams<{ stackId: string }>();
  const stk = ALL_STACKS.find(s => s.id === stackId);

  if (!stk) {
    return (
      <div role="alert" className="rounded-card border border-error bg-error/10 px-5 py-4 font-body text-[13px] text-foreground">
        Stack "{stackId}" not found. <a href="/stacks" className="text-primary hover:underline">Back to stacks</a>
      </div>
    );
  }

  const statusColor = stk.status === "online" ? "bg-success/10 text-success" : stk.status === "fault" ? "bg-error/10 text-error" : "bg-warning/10 text-warning";

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="font-body text-[18px] font-semibold text-foreground">{stk.id}</h2>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium capitalize ${statusColor}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />{stk.status}
            </span>
          </div>
          <p className="font-body text-[13px] text-muted-foreground">{stk.manufacturer} {stk.model} · {stk.siteName}</p>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground shrink-0">v{stk.firmwareVersion}</span>
      </div>

      {/* SoH gauge */}
      <div className="rounded-card border border-border bg-card p-5">
        <h3 className="font-body text-[12px] font-semibold text-foreground mb-4">State of health</h3>
        <SohGauge value={stk.soh} />
        <p className="mt-3 font-body text-[12px] text-muted-foreground">
          {stk.cycles} charge-discharge cycles completed. Cell chemistry: {stk.cellChemistry}. Capacity: {stk.capacityKwh} kWh rated.
        </p>
      </div>

      {/* Key metrics */}
      <div className="rounded-card border border-border bg-card p-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <MetaField label="State of charge" value={`${stk.soc}%`}          />
        <MetaField label="Cycle count"     value={stk.cycles}             />
        <MetaField label="Capacity"        value={`${stk.capacityKwh} kWh`} />
        <MetaField label="Max power"       value={`${stk.powerKw} kW`}   />
        <MetaField label="Chemistry"       value={stk.cellChemistry}     />
        <MetaField label="Firmware"        value={`v${stk.firmwareVersion}`} />
        <MetaField label="Installed"       value={stk.installedDate}     />
        <MetaField label="Last maintenance"value={stk.lastMaintenance}   />
        <MetaField label="Site"            value={stk.siteName}          />
      </div>

      {/* Capacity fade note */}
      <div className="rounded-card border border-border bg-card p-5">
        <h3 className="font-body text-[12px] font-semibold text-foreground mb-2">Capacity fade analysis</h3>
        <p className="font-body text-[13px] text-muted-foreground leading-relaxed">
          At {stk.cycles} cycles and {stk.soh}% SoH, this stack is performing within expected parameters for {stk.cellChemistry} chemistry.
          Estimated remaining useful life: {Math.max(0, Math.round((stk.soh - 80) / 0.01))} cycles before reaching 80% SoH threshold.
          Next capacity test scheduled with maintenance window.
        </p>
        {stk.soh < 90 && (
          <div role="alert" className="mt-3 flex items-start gap-2 rounded-card border border-warning bg-warning/10 px-4 py-2.5">
            <span className="font-body text-[12px] text-warning">SoH below 90%: consider scheduling a capacity assessment or replacement planning.</span>
          </div>
        )}
      </div>
    </div>
  );
}
