import { fail, ok } from "@/lib/result";
import { requirePermission } from "@/lib/permissions";
import z from "zod";
import { ErrorReason } from "@/lib/errors";
import { emptyTrash } from "../server/mutations/empty-trash";

const schema = z.object({
  workspaceId: z.uuid(),
});

type IncomingData = z.infer<typeof schema>;

export async function emptyTrashService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId } = result.data;

  //========== Auth and permisssion ==========//
  const [authError] = await requirePermission(workspaceId, "note:update");
  if (authError) {
    return fail({ reason: authError.reason });
  }

  //========== DB mutation ==========//
  try {
    const deletedNoteCount = await emptyTrash(workspaceId);
    return ok(deletedNoteCount);
  } catch (err) {
    return fail({ reason: ErrorReason.UnexpectedError, details: err });
  }
}
