import { ErrorReason } from "@/lib/errors";
import { requirePermission } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { restoreNote } from "../server/mutations/restore-note";

const schema = z.object({
  noteId: z.uuid(),
  workspaceId: z.uuid(),
});

type IncomingData = z.infer<typeof schema>;

export async function restoreNoteService(rawData: IncomingData) {
  //========== Validating incoming data ==========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const workspaceId = result.data.workspaceId;

  //========== Auth and permisssion ==========//
  const [authError] = await requirePermission(workspaceId, "note:update");
  if (authError) {
    return fail({ reason: authError.reason });
  }

  //========== DB Process ==========//
  try {
    const res = await restoreNote(result.data);
    return ok(res);
  } catch (err) {
    return fail({ reason: ErrorReason.UnexpectedError, details: err });
  }
}
