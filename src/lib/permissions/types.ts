// export type WorkspaceRole = "owner" | "admin" | "member";

import { workspaceMembersTable } from "@/db/schema";

const workspaceRoles = workspaceMembersTable.role._.data;
export type WorkspaceRole = typeof workspaceRoles;

// export type { WorkspaceRole };
