import { fail, ok } from "@/lib/result";
import { requirePermission } from "@/lib/authz";
import {
  UpdateNoteInput,
  updateNoteSchema,
} from "../schemas/update-note-schema";
import { updateNote } from "../server/mutations/update-note";
import { ErrorReason } from "@/lib/errors";

export async function editNoteService(inputData: UpdateNoteInput) {
  //========= Validating incoming data ========//
  const result = updateNoteSchema.safeParse(inputData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, content, noteId, title } = result.data;

  //========== Auth and permisssion ==========//
  const [error, data] = await requirePermission(workspaceId, "note:update");
  if (error) {
    return fail({ reason: error.reason });
  }
  const userId = data.user.id;

  //========== DB mutation ==========//
  try {
    const note = await updateNote({ userId, title, noteId, content });
    return ok(note);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
