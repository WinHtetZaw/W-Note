import { fail, ok } from "@/lib/result";
import { requirePermission } from "@/lib/permissions";
import { insertNote } from "../server/mutations/insert-note";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { createNoteVersion } from "../server/mutations/create-note-version";

const schema = z.object({ workspaceId: z.uuid(), noteId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function createNoteVersionService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { noteId, workspaceId } = result.data;

  //========== Auth and permisssion ==========//
  const [error, authData] = await requirePermission(workspaceId, "note:create");
  if (error) {
    return fail({ reason: error.reason });
  }
  const userId = authData.user.id;

  //========== DB mutation ==========//
  try {
    const note = await createNoteVersion({ noteId, userId });
    return ok(note);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
