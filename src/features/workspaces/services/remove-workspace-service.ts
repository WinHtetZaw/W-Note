import { fail, ok } from "@/lib/result";
import { requirePermission } from "@/lib/authz";
import z from "zod";
import { deleteWorkspace } from "../server/mutations/delete-workspace";
import { ErrorReason } from "@/lib/errors";

const scehma = z.object({ workspaceId: z.string() });

export async function removeWorkspaceService(workspaceId: string) {
  //========== Validating incoming data ==========//
  const result = scehma.safeParse({ workspaceId });
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(workspaceId, "workspace:delete");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const isDeleted = await deleteWorkspace(result.data.workspaceId);
    return ok(isDeleted);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
