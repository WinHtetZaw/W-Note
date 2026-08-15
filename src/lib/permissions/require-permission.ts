import { ok, fail } from "../result";
import { Permission } from "./access-control-list";
import { hasRolePermission } from "./has-role-permission";
import { requireWorkspaceMember } from "./require-workspace-member";

export async function requirePermission(
  workspaceId: string,
  permission: Permission,
) {
  const [error, member] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: "NotFound" });
  }

  if (!hasRolePermission(member.role, permission)) {
    return fail({ reason: "Forbidden" });
  }

  return ok(member);
}
