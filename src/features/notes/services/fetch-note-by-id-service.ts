import { ErrorReason } from "@/lib/errors";
import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { getNoteById } from "../server/queries/get-note-by-id";

const schema = z.object({
  workspaceId: z.uuid(),
  noteId: z.uuid(),
});

type IncomingData = z.infer<typeof schema>;

export async function fetchNoteByIdService(rawData: IncomingData) {
  //========== Validating incoming data ==========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const workspaceId = result.data.workspaceId;

  //========== Auth ==========//
  const [error] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB Fetching ==========//
  try {
    const res = await getNoteById(result.data);
    if (!res) {
      return fail({ reason: ErrorReason.NoteNotFound });
    }
    return ok(res);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
