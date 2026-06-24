/**
 * Settings members — /settings/members
 */
import * as React from "react";
import { Plus } from "lucide-react";
import { TEAM_MEMBERS } from "~/mocks/settings";

const ROLE_COLORS: Record<string, string> = {
  admin:    "bg-primary/10 text-primary",
  operator: "bg-info/10 text-info",
  analyst:  "bg-muted text-muted-foreground",
  "read-only": "bg-muted text-muted-foreground",
};

export default function SettingsMembers() {
  return (
    <section aria-labelledby="members-heading" className="flex flex-col gap-4 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 id="members-heading" className="font-body text-[14px] font-semibold text-foreground">Team members</h2>
        <button type="button" className="inline-flex items-center gap-1.5 rounded-btn bg-primary px-3 py-1.5 font-body text-[12px] font-medium text-white hover:bg-primary/90 transition-colors cursor-pointer">
          <Plus size={13} aria-hidden="true" />Invite member
        </button>
      </div>
      {/* Loading: skeleton. Empty: "No team members yet." Error: role="alert". */}
      <div className="rounded-card border border-border bg-card overflow-hidden">
        {TEAM_MEMBERS.map(member => (
          <div key={member.id} className="flex items-center gap-4 px-5 py-3.5 border-b border-border last:border-0 hover:bg-muted transition-colors">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-mono text-[11px] font-semibold text-foreground shrink-0">
              {member.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-body text-[13px] font-medium text-foreground">{member.name}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{member.email}</div>
            </div>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] font-medium capitalize ${ROLE_COLORS[member.role] ?? "bg-muted text-muted-foreground"}`}>
              {member.role.replace("-"," ")}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap hidden sm:inline">{member.lastActive}</span>
            {member.status === "invited" && (
              <span className="inline-flex items-center rounded-full px-2 py-0.5 font-mono text-[10px] bg-info/10 text-info">Invited</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
