import { requirePermission } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import { updateWorkspace } from "../server/mutations/update-workspace";
import {
  UpdateWorkspaceInput,
  updateWorkspaceSchema,
} from "../schemas/update-workspace-schema";

export async function editWorkspaceService(rawData: UpdateWorkspaceInput) {
  //========== Validating incoming data ==========//
  const validated = updateWorkspaceSchema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { workspaceId } = validated.data;

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(workspaceId, "workspace:update");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const workspace = await updateWorkspace(validated.data);
    return ok(workspace);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
