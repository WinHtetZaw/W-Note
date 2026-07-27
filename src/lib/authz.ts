import { Permission } from "./permissions/access-control-list";
import { hasRolePermission } from "./permissions/has-role-permission";
import { requireWorkspaceMember } from "./permissions";

export async function requirePermission(
  workspaceId: string,
  permission: Permission,
) {
  const member = await requireWorkspaceMember(workspaceId);
  if (!member) throw new Error("Forbidden");

  const allowed = hasRolePermission(member.role, permission);
  if (!allowed) throw new Error("Forbidden");

  return member;
}
