import { requireAuth } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import {
  CreateWorkspaceInput,
  createWorkspaceSchema,
} from "../schemas/create-workspace-schema";
import { insertWorkspace } from "../server/mutations/insert-workspace";
import { ErrorReason } from "@/lib/errors";

export async function createWorkspaceService(rawData: CreateWorkspaceInput) {
  //========== Validating incoming data ==========//
  const result = createWorkspaceSchema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }

  //========== Auth and permisssion ==========//
  const [error, user] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const workspace = await insertWorkspace({
      ...result.data,
      userId: user.id,
    });
    return ok(workspace);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
