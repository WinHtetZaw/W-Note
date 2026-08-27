import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { getFolderWithNotes } from "../server/queries/get-Folder-with-notes";
import { ErrorReason } from "@/lib/errors";

const incomingDataSchema = z.object({
  workspaceId: z.string(),
  folderId: z.string(),
  q: z.string().optional(),
});

type IncomingData = z.infer<typeof incomingDataSchema>;

export async function folderWithNotesService(rawData: IncomingData) {
  //========== Validating incoming data ==========//
  const result = incomingDataSchema.safeParse(rawData);
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
    const res = await getFolderWithNotes(result.data);
    return ok(res);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
