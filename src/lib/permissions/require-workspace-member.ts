import { requireAuth } from "./require-auth";
import { getUserWorkspaceRole } from "./get-user-workspace-role";
import { fail, ok } from "../result";
import { ErrorReason } from "../errors/error-reason";

export async function requireWorkspaceMember(workspaceId: string) {
  //========= Authentication ========//
  const [error, user] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }

  //========= Authorization ========//
  const role = await getUserWorkspaceRole({ workspaceId, userId: user.id });
  if (!role) {
    return fail({ reason: ErrorReason.NotWorkspaceMember });
  }

  return ok({ user, role, workspaceId });
}
