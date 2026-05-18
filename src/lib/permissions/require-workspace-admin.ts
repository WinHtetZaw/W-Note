import { requireWorkspaceMember } from "./require-workspace-member";

export async function requireWorkspaceAdmin(workspaceId: string) {
  const result = await requireWorkspaceMember(workspaceId);

  if (result.role !== "admin" && result.role !== "owner") {
    throw new Error("Admin access required");
  }

  return result;
}
