// lib/authz.ts

import { db } from "@/db";
import { Permission } from "./permissions/access-control-list";
import { hasRolePermission } from "./permissions/has-role-permission";

export async function requirePermission(
  userId: string,
  workspaceId: string,
  permission: Permission,
) {
  const member = await db.query.workspaceMembersTable.findFirst({
    where: (table, { and, eq }) =>
      and(eq(table.userId, userId), eq(table.workspaceId, workspaceId)),
  });

  if (!member) {
    throw new Error("Forbidden");
  }

  const allowed = hasRolePermission(member.role, permission);

  if (!allowed) {
    throw new Error("Forbidden");
  }

  return member;
}
