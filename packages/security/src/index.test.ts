import { expect, it } from "vitest";
import { requireTenant } from "./index";
it("rejects cross-tenant access", () =>
  expect(() => requireTenant({ principalId: "p", orgId: "a", roles: [] }, "b")).toThrow(
    "tenant_scope_violation",
  ));
