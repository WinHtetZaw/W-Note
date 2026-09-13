import { ErrorReason } from "../errors";
import { ok, fail } from "../result";
import { Permission } from "./access-control-list";
import { hasRolePermission } from "./has-role-permission";
import { requireWorkspaceMember } from "./require-workspace-member";

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
