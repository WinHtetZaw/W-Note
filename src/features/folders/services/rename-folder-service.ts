import { fail, ok } from "@/lib/result";
import { UpdateFolderInput, updateFolderSchema } from "../schemas";
import { requirePermission } from "@/lib/authz";
import { updateFolder } from "../server/mutations/update-folder";
import { ErrorReason } from "@/lib/errors";

export async function renameFolderService(rawData: UpdateFolderInput) {
  //========== Validating incoming data ==========//
  const result = updateFolderSchema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId } = result.data;

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(workspaceId, "folder:update");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const folder = await updateFolder(result.data);
    return ok(folder);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
