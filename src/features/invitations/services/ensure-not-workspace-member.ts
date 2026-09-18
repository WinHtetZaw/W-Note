import { getWorkspaceMember } from "@/features/workspaces/server/queries/get-workspace-member";

export async function ensureNotWorkspaceMember(
  workspaceId: string,
  userId: string,
) {
  const member = await getWorkspaceMember(workspaceId, userId);

  return !member;
}
