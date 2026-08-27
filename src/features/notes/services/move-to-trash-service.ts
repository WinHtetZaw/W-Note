import { fail, ok } from "@/lib/result";
import { requirePermission } from "@/lib/authz";
import {
  UpdateNoteInput,
  updateNoteSchema,
} from "../schemas/update-note-schema";
import { updateNote } from "../server/mutations/update-note";
import z from "zod";
import { moveToTrash } from "../server/mutations/move-to-trash";
import { ErrorReason } from "@/lib/errors";

const schema = z.object({ workspaceId: z.string(), noteId: z.string() });

type IncomingData = z.infer<typeof schema>;

export async function moveToTrashService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, noteId } = result.data;

  //========== Auth and permisssion ==========//
  const [error, data] = await requirePermission(workspaceId, "note:delete");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const movedNote = await moveToTrash(noteId);
    return ok(movedNote);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
