import { requireAuth } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import { getUserWorkspace } from "../server/queries/get-user-workspace";
import { ErrorReason } from "@/lib/errors";

export async function fetchUserWorkspaceService() {
  //========== Auth ==========//
  const [error, user] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB Fetching ==========//
  try {
    const workspace = await getUserWorkspace(user.id);
    if (!workspace) {
      return fail({ reason: ErrorReason.WorkspaceNotFound });
    }
    return ok(workspace);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
