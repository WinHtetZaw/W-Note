import { fail, ok } from "@/lib/result";
import { requirePermission } from "@/lib/authz";
import { insertNote } from "../server/mutations/insert-note";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { duplicateNote } from "../server/mutations/duplicate-note";

const schema = z.object({
  workspaceId: z.uuid(),
  noteId: z.uuid(),
});

type IncomingData = z.infer<typeof schema>;
export async function duplicateNoteService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, noteId } = result.data;

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(workspaceId, "note:create");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const note = await duplicateNote({ workspaceId, noteId });
    return ok(note);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
