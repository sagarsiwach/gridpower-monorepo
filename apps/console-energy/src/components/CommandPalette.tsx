import * as React from "react";
import { useNavigate } from "react-router";
import { Command } from "cmdk";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Battery,
  Bolt,
  Calendar,
  CircuitBoard,
  HelpCircle,
  Layers,
  LayoutGrid,
  Search,
  Settings as SettingsIcon,
  Tags,
  Users,
  Wrench,
} from "lucide-react";

interface CommandPaletteItem {
  key: string;
  label: string;
  hint?: string;
  href: string;
  icon: React.ReactNode;
  group: "Navigate" | "Sub-pages" | "Quick actions" | "Recent";
  keywords?: string[];
}

const COMMANDS: CommandPaletteItem[] = [
  // Navigate (top-level)
  { key: "nav.dashboard",       label: "Dashboard",       hint: "g d", href: "/dashboard",       icon: <LayoutGrid size={14} aria-hidden="true" />,    group: "Navigate" },
  { key: "nav.sites",           label: "Sites",           hint: "g s", href: "/sites",           icon: <Battery size={14} aria-hidden="true" />,       group: "Navigate", keywords: ["bess", "battery", "fleet"] },
  { key: "nav.stacks",          label: "Stacks",          hint: "g k", href: "/stacks",          icon: <Layers size={14} aria-hidden="true" />,        group: "Navigate", keywords: ["cells", "modules"] },
  { key: "nav.energy-flow",     label: "Energy flow",     hint: "g f", href: "/energy-flow",     icon: <Activity size={14} aria-hidden="true" />,      group: "Navigate", keywords: ["live", "power", "portfolio"] },
  { key: "nav.schedules",       label: "Schedules",       hint: "g c", href: "/schedules",       icon: <Calendar size={14} aria-hidden="true" />,      group: "Navigate", keywords: ["discharge", "dispatch"] },
  { key: "nav.alerts",          label: "Alerts",          hint: "g a", href: "/alerts",          icon: <AlertTriangle size={14} aria-hidden="true" />, group: "Navigate" },
  { key: "nav.maintenance",     label: "Maintenance",     hint: "g m", href: "/maintenance",     icon: <Wrench size={14} aria-hidden="true" />,        group: "Navigate", keywords: ["work orders"] },
  { key: "nav.grid-events",     label: "Grid events",     hint: "g e", href: "/grid-events",     icon: <Bolt size={14} aria-hidden="true" />,          group: "Navigate", keywords: ["frequency", "voltage"] },
  { key: "nav.tariffs",         label: "Tariffs",         hint: "g t", href: "/tariffs",         icon: <Tags size={14} aria-hidden="true" />,          group: "Navigate", keywords: ["tou", "rate plan"] },
  { key: "nav.demand-response", label: "Demand response", hint: "g r", href: "/demand-response", icon: <BarChart3 size={14} aria-hidden="true" />,     group: "Navigate", keywords: ["dr", "openadr"] },
  { key: "nav.customers",       label: "Customers",       hint: "g u", href: "/customers",       icon: <Users size={14} aria-hidden="true" />,         group: "Navigate", keywords: ["c&i", "accounts"] },
  { key: "nav.analytics",       label: "Analytics",       hint: "g n", href: "/analytics",       icon: <BarChart3 size={14} aria-hidden="true" />,     group: "Navigate" },
  { key: "nav.firmware",        label: "Firmware",        hint: "g w", href: "/firmware",        icon: <CircuitBoard size={14} aria-hidden="true" />,  group: "Navigate" },
  { key: "nav.settings",        label: "Settings",        hint: "g ,", href: "/settings",        icon: <SettingsIcon size={14} aria-hidden="true" />,  group: "Navigate" },
  { key: "nav.help",            label: "Help",            hint: "?",   href: "/help",            icon: <HelpCircle size={14} aria-hidden="true" />,    group: "Navigate" },

  // Sub-pages
  { key: "sub.dr.programs",        label: "DR programs",            href: "/demand-response/programs", icon: <BarChart3 size={14} aria-hidden="true" />, group: "Sub-pages", keywords: ["demand response"] },
  { key: "sub.dr.events",          label: "DR events",              href: "/demand-response/events",   icon: <BarChart3 size={14} aria-hidden="true" />, group: "Sub-pages", keywords: ["demand response"] },
  { key: "sub.firmware.versions",  label: "Firmware versions",      href: "/firmware/versions",        icon: <CircuitBoard size={14} aria-hidden="true" />, group: "Sub-pages" },
  { key: "sub.firmware.rollouts",  label: "Firmware rollouts",      href: "/firmware/rollouts",        icon: <CircuitBoard size={14} aria-hidden="true" />, group: "Sub-pages" },
  { key: "sub.analytics.roi",      label: "ROI per site",           href: "/analytics/roi",            icon: <BarChart3 size={14} aria-hidden="true" />, group: "Sub-pages", keywords: ["analytics"] },
  { key: "sub.analytics.energy",   label: "Energy throughput",      href: "/analytics/energy",         icon: <BarChart3 size={14} aria-hidden="true" />, group: "Sub-pages", keywords: ["analytics", "kwh"] },
  { key: "sub.analytics.exports",  label: "Scheduled exports",      href: "/analytics/exports",        icon: <BarChart3 size={14} aria-hidden="true" />, group: "Sub-pages", keywords: ["analytics"] },
  { key: "sub.settings.org",       label: "Organisation settings",  href: "/settings/organisation",    icon: <SettingsIcon size={14} aria-hidden="true" />, group: "Sub-pages" },
  { key: "sub.settings.members",   label: "Team members",           href: "/settings/members",         icon: <Users size={14} aria-hidden="true" />, group: "Sub-pages", keywords: ["settings"] },
  { key: "sub.settings.billing",   label: "Billing",                href: "/settings/billing",         icon: <SettingsIcon size={14} aria-hidden="true" />, group: "Sub-pages" },
  { key: "sub.settings.api",       label: "API keys",               href: "/settings/api",             icon: <SettingsIcon size={14} aria-hidden="true" />, group: "Sub-pages" },
  { key: "sub.settings.integrations", label: "Integrations",        href: "/settings/integrations",    icon: <SettingsIcon size={14} aria-hidden="true" />, group: "Sub-pages", keywords: ["scada", "openadr", "bms", "inverter"] },
  { key: "sub.settings.notifications", label: "Notifications",      href: "/settings/notifications",   icon: <SettingsIcon size={14} aria-hidden="true" />, group: "Sub-pages" },
  { key: "sub.settings.audit",     label: "Audit log",              href: "/settings/audit",           icon: <SettingsIcon size={14} aria-hidden="true" />, group: "Sub-pages" },

  // Quick actions
  { key: "act.schedule.new",     label: "Create schedule",     href: "/schedules/new",   icon: <Calendar size={14} aria-hidden="true" />, group: "Quick actions" },
  { key: "act.maintenance.new",  label: "Create work order",   href: "/maintenance/new", icon: <Wrench size={14} aria-hidden="true" />,   group: "Quick actions" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const navigate = useNavigate();

  const handleSelect = React.useCallback(
    (href: string) => {
      onClose();
      navigate(href);
    },
    [navigate, onClose],
  );

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh]"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close command palette"
        className="absolute inset-0 z-0 bg-black/50"
      />
      <div className="relative z-10 w-full max-w-[640px] overflow-hidden rounded-modal border border-border bg-card shadow-xl">
        <Command label="Command palette" loop>
          <div className="flex items-center gap-2 border-b border-border px-3.5">
            <Search size={16} aria-hidden="true" className="text-muted-foreground" />
            <Command.Input
              autoFocus
              placeholder="Search routes, actions, or type a command…"
              className="h-12 flex-1 bg-transparent text-body text-foreground placeholder:text-muted-foreground outline-none"
            />
            <kbd className="hidden sm:inline-flex h-6 items-center rounded-[4px] border border-border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
              esc
            </kbd>
          </div>

          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-body-sm text-muted-foreground">
              No results.
            </Command.Empty>

            {(["Navigate", "Sub-pages", "Quick actions"] as const).map((group) => {
              const items = COMMANDS.filter((c) => c.group === group);
              return (
                <Command.Group
                  key={group}
                  heading={group}
                  className="mb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.08em] [&_[cmdk-group-heading]]:text-muted-foreground"
                >
                  {items.map((item) => (
                    <Command.Item
                      key={item.key}
                      value={`${item.label} ${item.keywords?.join(" ") ?? ""}`}
                      onSelect={() => handleSelect(item.href)}
                      className="flex h-10 cursor-pointer items-center gap-3 rounded-btn px-2 text-body-sm text-foreground transition-colors duration-100 ease-out data-[selected=true]:bg-muted"
                    >
                      <span className="flex h-7 w-7 items-center justify-center rounded-[6px] bg-muted text-muted-foreground">
                        {item.icon}
                      </span>
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.hint && (
                        <kbd className="font-mono text-[10px] text-muted-foreground">
                          {item.hint}
                        </kbd>
                      )}
                      <ArrowRight size={12} aria-hidden="true" className="text-muted-foreground" />
                    </Command.Item>
                  ))}
                </Command.Group>
              );
            })}
          </Command.List>

          <div className="flex items-center justify-between border-t border-border px-3.5 py-2 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <kbd className="rounded-[4px] border border-border bg-muted px-1 font-mono">↑↓</kbd>
              <span>Navigate</span>
              <kbd className="rounded-[4px] border border-border bg-muted px-1 font-mono">↵</kbd>
              <span>Open</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <kbd className="rounded-[4px] border border-border bg-muted px-1 font-mono">?</kbd>
              <span>Shortcut help</span>
            </div>
          </div>
        </Command>
      </div>
    </div>
  );
}

interface ShortcutHelpProps {
  open: boolean;
  onClose: () => void;
}

const SHORTCUTS: Array<{ keys: string; label: string }> = [
  { keys: "⌘ K", label: "Open command palette" },
  { keys: "g d", label: "Go to Dashboard" },
  { keys: "g s", label: "Go to Sites" },
  { keys: "g k", label: "Go to Stacks" },
  { keys: "g f", label: "Go to Energy flow" },
  { keys: "g c", label: "Go to Schedules" },
  { keys: "g a", label: "Go to Alerts" },
  { keys: "g m", label: "Go to Maintenance" },
  { keys: "g e", label: "Go to Grid events" },
  { keys: "g t", label: "Go to Tariffs" },
  { keys: "g r", label: "Go to Demand response" },
  { keys: "g u", label: "Go to Customers" },
  { keys: "g n", label: "Go to Analytics" },
  { keys: "g w", label: "Go to Firmware" },
  { keys: "g ,", label: "Go to Settings" },
  { keys: "?", label: "Open this shortcut help" },
  { keys: "esc", label: "Close panel or clear selection" },
];

export function ShortcutHelp({ open, onClose }: ShortcutHelpProps) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Keyboard shortcuts"
      className="fixed inset-0 z-[60] flex items-center justify-center px-4"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close shortcut help"
        className="absolute inset-0 z-0 bg-black/50"
      />
      <div className="relative z-10 w-full max-w-[480px] overflow-hidden rounded-modal border border-border bg-card shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="font-body text-body font-semibold text-foreground">
            Keyboard shortcuts
          </h2>
          <kbd className="rounded-[4px] border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            esc
          </kbd>
        </div>
        <ul className="divide-y divide-border">
          {SHORTCUTS.map((s) => (
            <li
              key={s.keys}
              className="flex items-center justify-between px-4 py-2.5 text-body-sm text-foreground"
            >
              <span>{s.label}</span>
              <kbd className="rounded-[4px] border border-border bg-muted px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                {s.keys}
              </kbd>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const GO_TO_MAP: Record<string, string> = {
  d: "/dashboard",
  s: "/sites",
  k: "/stacks",
  f: "/energy-flow",
  c: "/schedules",
  a: "/alerts",
  m: "/maintenance",
  e: "/grid-events",
  t: "/tariffs",
  r: "/demand-response",
  u: "/customers",
  n: "/analytics",
  w: "/firmware",
  ",": "/settings",
};

/**
 * Wires global keyboard shortcuts: cmd-k for palette, ? for help,
 * "g <key>" two-press chord for navigation. Returns the open/close
 * state for the palette and the help modal so the shell can render them.
 */
export function useCommandPaletteHotkeys() {
  const navigate = useNavigate();
  const [paletteOpen, setPaletteOpen] = React.useState(false);
  const [helpOpen, setHelpOpen] = React.useState(false);
  const goPendingRef = React.useRef(false);
  const goTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    const isTypingTarget = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
      if (target.isContentEditable) return true;
      return false;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (paletteOpen) {
          setPaletteOpen(false);
          e.preventDefault();
          return;
        }
        if (helpOpen) {
          setHelpOpen(false);
          e.preventDefault();
          return;
        }
      }

      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        return;
      }

      if (paletteOpen || helpOpen) return;
      if (isTypingTarget(e.target)) return;

      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen(true);
        return;
      }

      if (e.key === "g" && !goPendingRef.current) {
        e.preventDefault();
        goPendingRef.current = true;
        if (goTimerRef.current) clearTimeout(goTimerRef.current);
        goTimerRef.current = setTimeout(() => {
          goPendingRef.current = false;
        }, 1200);
        return;
      }

      if (goPendingRef.current) {
        const target = GO_TO_MAP[e.key.toLowerCase()];
        goPendingRef.current = false;
        if (goTimerRef.current) {
          clearTimeout(goTimerRef.current);
          goTimerRef.current = null;
        }
        if (target) {
          e.preventDefault();
          navigate(target);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (goTimerRef.current) clearTimeout(goTimerRef.current);
    };
  }, [navigate, paletteOpen, helpOpen]);

  return {
    paletteOpen,
    closePalette: React.useCallback(() => setPaletteOpen(false), []),
    openPalette: React.useCallback(() => setPaletteOpen(true), []),
    helpOpen,
    closeHelp: React.useCallback(() => setHelpOpen(false), []),
  };
}
