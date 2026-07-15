export type Actor = { principalId: string; orgId: string; roles: string[] };
export function requireTenant(actor: Actor, resourceOrgId: string) {
  if (actor.orgId !== resourceOrgId) throw new Error("tenant_scope_violation");
}
export function requireRole(actor: Actor, allowed: string[]) {
  if (!actor.roles.some((role) => allowed.includes(role))) throw new Error("role_not_authorized");
}
