import { requirePermission } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import {
  CreateFolderInput,
  createFolderSchema,
} from "@/features/folders/schemas";
import { insertFolder } from "@/features/folders/server/mutations/insert-folder";

export async function createWorkspaceInviteService(rawData: CreateFolderInput) {
  //========== Validating incoming data ==========//
  const result = createFolderSchema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const workspaceId = result.data.workspaceId;

  //========== Auth and permisssion ==========//
  const [error, data] = await requirePermission(workspaceId, "folder:create");
  if (error) {
    return fail({ reason: error.reason });
  }
  const createdBy = data.user.id;

  //========== DB mutation ==========//
  try {
    const res = await insertFolder({ ...result.data, createdBy });
    return ok(res);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
