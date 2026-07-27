import { requireAuth } from "./require-auth";
import { getUserWorkspaceRole } from "./get-user-workspace-role";

export async function requireWorkspaceMember(workspaceId: string) {
  const user = await requireAuth();
  const role = await getUserWorkspaceRole(workspaceId, user.id);
  if (!role) throw new Error("You do not have access to this workspace");
  return { user, role, workspaceId };
}
