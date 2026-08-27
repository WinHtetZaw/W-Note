import { fail, ok } from "@/lib/result";
import { requirePermission } from "@/lib/authz";
import z from "zod";
import { deleteWorkspaceMember } from "../server/mutations/delete-workspace-member";
import { stringEquals } from "@/lib/utils";
import { ErrorReason } from "@/lib/errors";

const scehma = z.object({ workspaceId: z.string() });

export async function deleteWorkspaceMemberService(workspaceId: string) {
  //========== Validating incoming data ==========//
  const result = scehma.safeParse({ workspaceId });
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }

  //========== Auth and permisssion ==========//
  const [error, authData] = await requirePermission(
    workspaceId,
    "workspace:update",
  );
  if (error) {
    return fail({ reason: error.reason });
  }

  if (stringEquals(authData.role, "owner")) {
    return fail({ reason: ErrorReason.OwnerCannotLeaveWorkspace });
  }

  //========== DB mutation ==========//
  try {
    const isDeleted = await deleteWorkspaceMember({
      workspaceId,
      userId: authData.user.id,
    });
    return ok(isDeleted);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
