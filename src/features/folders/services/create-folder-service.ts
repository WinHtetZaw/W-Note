import { requirePermission } from "@/lib/authz";
import {
  CreateFolderInput,
  createFolderSchema,
} from "../schemas/create-folder-schema";
import { insertFolder } from "../server/mutations/insert-folder";
import { fail, ok } from "@/lib/result";

export async function createFolderService(input: CreateFolderInput) {
  //========== Validating incoming data ==========//
  const result = createFolderSchema.safeParse(input);
  if (!result.success) {
    return fail({ reason: "Invalid data", details: result.error });
  }

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(input.workspaceId, "folder:create");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const res = await insertFolder(result.data);
    return ok(res);
  } catch {
    return fail({ reason: "Unexpected" });
  }
}
