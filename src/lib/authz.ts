import { Permission } from "./permissions/access-control-list";
import { hasRolePermission } from "./permissions/has-role-permission";
import { requireWorkspaceMember } from "./permissions";
import { fail, ok } from "./result";
import { ErrorReason } from "./errors/error-reason";

export async function requirePermission(
  workspaceId: string,
  permission: Permission,
) {
  const [error, member] = await requireWorkspaceMember(workspaceId);
  if (error) return fail({ reason: error.reason });

  const allowed = hasRolePermission(member.role, permission);
  if (!allowed) return fail({ reason: ErrorReason.InsufficientPermission });

  return ok(member);
}
