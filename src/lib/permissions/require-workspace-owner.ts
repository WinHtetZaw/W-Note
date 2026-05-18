import { requireWorkspaceMember } from "./require-workspace-member";

export async function requireWorkspaceOwner(workspaceId: string) {
  const result = await requireWorkspaceMember(workspaceId);

  if (result.role !== "owner") {
    throw new Error("Owner access required");
  }

  return result;
}
