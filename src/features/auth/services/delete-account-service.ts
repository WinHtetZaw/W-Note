import { getOwnWorkspaces } from "@/features/workspaces/server/queries/get-own-workspaces";
import { ErrorReason } from "@/lib/errors";
import { requireAuth } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import { deleteUser } from "./delete-user";

export async function deleteAccountService() {
  //========== Auth ==========//
  const [authError, user] = await requireAuth();
  if (authError) {
    return fail({ reason: authError.reason });
  }

  try {
    //========= Checking own workspaces ========//
    const ownWorkspaces = await getOwnWorkspaces(user.id);

    if (ownWorkspaces.length > 0) {
      return fail({
        reason: ErrorReason.UserHasOwnWorkspaces,
        details: {
          count: ownWorkspaces.length,
          ownWorkspaces,
        },
      });
    }

    //========= Delete User  ========//
    const [deleteEror, isDeleted] = await deleteUser();
    if (deleteEror) {
      return fail({ reason: deleteEror.reason, details: deleteEror.details });
    }

    return ok(isDeleted);
  } catch (err) {
    return fail({
      reason: ErrorReason.UnexpectedError,
      details: err,
    });
  }
}
