import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import { getFoldersWithNotes } from "../server/queries/get-folders-with-notes";
import z from "zod";
import { ErrorReason } from "@/lib/errors";

const incomingDataSchema = z.object({
  workspaceId: z.string(),
  q: z.string().optional(),
});

type IncomingData = z.infer<typeof incomingDataSchema>;

export async function foldersNotesService(rawData: IncomingData) {
  //========== Validating incoming data ==========//
  const result = incomingDataSchema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, q } = result.data;

  //========== Auth ==========//
  const [error] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB Fetching ==========//
  try {
    const folders = await getFoldersWithNotes({ workspaceId, q });
    return ok(folders);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
