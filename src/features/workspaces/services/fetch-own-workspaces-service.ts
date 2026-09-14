import { requireAuth } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import { getOwnWorkspaces } from "../server/queries/get-own-workspaces";

export async function fetchOwnWorkspacesService() {
  //========== Auth ==========//
  const [error, user] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB Fetching ==========//
  try {
    const workspaces = await getOwnWorkspaces(user.id);
    return ok(workspaces);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
