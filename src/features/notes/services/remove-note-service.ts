import { fail, ok } from "@/lib/result";
import { requirePermission } from "@/lib/authz";
import { deleteNote } from "../server/mutations/delete-note";
import z from "zod";
import { ErrorReason } from "@/lib/errors";

const schema = z.object({
  workspaceId: z.string(),
  noteId: z.string(),
});

type IncomingData = z.infer<typeof schema>;

export async function removeNoteService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, noteId } = result.data;

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(workspaceId, "note:delete");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const note = await deleteNote({ workspaceId, noteId });
    return ok(note);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
