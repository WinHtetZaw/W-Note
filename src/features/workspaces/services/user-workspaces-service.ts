import { requireAuth } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { getUserWorkspaces } from "../server/queries/get-user-workspaces";
import { ErrorReason } from "@/lib/errors";

export async function userWorkspacesService() {
  //========== Auth ==========//
  const [error, user] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB Fetching ==========//
  try {
    const res = await getUserWorkspaces(user.id);
    return ok(res);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
