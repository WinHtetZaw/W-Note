import { WorkspaceRole } from "@/features/members/types";
import { Permission, RolePermissions } from "./access-control-list";

export function hasRolePermission(role: WorkspaceRole, permission: Permission) {
  return RolePermissions[role].includes(permission);
}
