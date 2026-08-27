import {
  getUserWorkspaceRole,
  requireWorkspaceMember,
} from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { ErrorReason } from "@/lib/errors";

const schema = z.object({ workspaceId: z.string() });

export async function fetchUserWorkspaceRoleService(workspaceId: string) {
  //========== Validating incoming data ==========//
  const result = schema.safeParse({ workspaceId });
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }

  //========== Auth ==========//
  const [error, authData] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: error.reason });
  }
  const userId = authData.user.id;

  //========== DB Fetching ==========//
  try {
    const role = await getUserWorkspaceRole({ workspaceId, userId });
    if (!role) {
      return fail({ reason: ErrorReason.UserNotFound });
    }
    return ok(role);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
