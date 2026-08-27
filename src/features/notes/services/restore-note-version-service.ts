import { fail, ok } from "@/lib/result";
import { requirePermission } from "@/lib/authz";
import { deleteNote } from "../server/mutations/delete-note";
import z from "zod";
import { restoreNoteVersion } from "../server/mutations/restore-note-version";
import { ErrorReason } from "@/lib/errors";

const schema = z.object({
  versionId: z.string(),
  workspaceId: z.string(),
});

type IncomingData = z.infer<typeof schema>;

export async function restoreNoteVersionService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, versionId } = result.data;

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(workspaceId, "note:update");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const note = await restoreNoteVersion(versionId);
    return ok(note);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
