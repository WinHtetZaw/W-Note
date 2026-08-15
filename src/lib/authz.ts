import { Permission } from "./permissions/access-control-list";
import { hasRolePermission } from "./permissions/has-role-permission";
import { requireWorkspaceMember } from "./permissions";
import { fail, ok } from "./result";

export async function requirePermission(
  workspaceId: string,
  permission: Permission,
) {
  const [error, member] = await requireWorkspaceMember(workspaceId);
  // if (!member) throw new Error("Forbidden");
  if (error) return fail({ reason: "Unauthenticated" });

  const allowed = hasRolePermission(member.role, permission);
  // if (!allowed) throw new Error("Forbidden");
  if (!allowed) return fail({ reason: "Forbidden" });

  return ok(member);
}
