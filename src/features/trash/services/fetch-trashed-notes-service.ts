import { ErrorReason } from "@/lib/errors";
import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { getTrashedNotes } from "../server/queries/get-trash-notes";

const schema = z.object({
  workspaceId: z.string(),
  q: z.string().optional(),
  limit: z.number().optional(),
});

type IncomingData = z.infer<typeof schema>;

export async function fetchTrashedNotesService(rawData: IncomingData) {
  //========== Validating incoming data ==========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const workspaceId = result.data.workspaceId;

  //========== Auth ==========//
  const [authError] = await requireWorkspaceMember(workspaceId);
  if (authError) {
    return fail({ reason: authError.reason });
  }

  //========== DB Fetching ==========//
  try {
    const res = await getTrashedNotes(result.data);
    return ok(res);
  } catch (err) {
    return fail({ reason: ErrorReason.UnexpectedError, details: err });
  }
}
