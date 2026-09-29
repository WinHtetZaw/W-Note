import { fail, ok } from "@/lib/result";
import { requirePermission } from "@/lib/permissions";
import { deleteNote } from "../server/mutations/delete-note";
import z from "zod";
import { ErrorReason } from "@/lib/errors";
import { permanentlyDeleteNote } from "../server/mutations/permanently-delete-note";

const schema = z.object({
  workspaceId: z.string(),
  noteId: z.string(),
});

type IncomingData = z.infer<typeof schema>;

export async function permanentlyDeleteNoteService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, noteId } = result.data;

  //========== Auth and permisssion ==========//
  const [authError] = await requirePermission(workspaceId, "note:delete");
  if (authError) {
    return fail({ reason: authError.reason });
  }

  //========== DB mutation ==========//
  try {
    const deletedNote = await permanentlyDeleteNote({ workspaceId, noteId });
    return ok(deletedNote);
  } catch (err) {
    return fail({ reason: ErrorReason.UnexpectedError, details: err });
  }
}
