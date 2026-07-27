import { Permission, RolePermissions } from "./access-control-list";
import { WorkspaceRole } from "./types";

export function hasRolePermission(role: WorkspaceRole, permission: Permission) {
  return RolePermissions[role].includes(permission);
}
