import { fail, ok } from "@/lib/result";
import {
  UpdateWorkspaceInput,
  updateWorkspaceSchema,
} from "../schemas/update-workspace-schema";
import { requirePermission } from "@/lib/authz";
import { updateWorkspace } from "../server/mutations/update-workspace";
import { ErrorReason } from "@/lib/errors";

export async function renameWorkspaceService(rawData: UpdateWorkspaceInput) {
  //========== Validating incoming data ==========//
  const result = updateWorkspaceSchema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(
    rawData.workspaceId,
    "workspace:update",
  );
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const workspace = await updateWorkspace(result.data);
    return ok(workspace);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
