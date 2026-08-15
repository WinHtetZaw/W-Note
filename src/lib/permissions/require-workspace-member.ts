import { requireAuth } from "./require-auth";
import { getUserWorkspaceRole } from "./get-user-workspace-role";
import { fail, ok } from "../result";

export async function requireWorkspaceMember(workspaceId: string) {
  //========= Authentication ========//
  const [error, user] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }

  //========= Authorization ========//
  const role = await getUserWorkspaceRole(workspaceId, user.id);
  // if (!role) throw new Error("You do not have access to this workspace");
  if (!role) {
    return fail({ reason: "NotFound" });
  }

  return ok({ user, role, workspaceId });
}
