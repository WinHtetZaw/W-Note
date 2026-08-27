import { requirePermission } from "@/lib/authz";
import { fail, ok } from "@/lib/result";
import { deleteFolder } from "../server/mutations/delete-folder";
import { RemoveFolder, removefolderSchema } from "../schemas";
import { ErrorReason } from "@/lib/errors";

export async function removeFolderService(rawData: RemoveFolder) {
  //========== Validating incoming data ==========//
  const result = removefolderSchema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId } = result.data;

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(workspaceId, "folder:delete");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const isDeleted = await deleteFolder(result.data);
    return ok({ success: isDeleted });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
