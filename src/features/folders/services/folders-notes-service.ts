import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import { getFoldersWithNotes } from "../server/queries/get-folders-with-notes";
import { idSchema } from "../schemas";

export async function foldersNotesService(incomingId: string) {
  //========== Validating incoming data ==========//
  const result = idSchema.safeParse({ id: incomingId });
  if (!result.success) {
    return fail({ reason: "Invalid data", details: result.error });
  }
  const workspaceId = result.data.id;
  console.log("fetching in try catsh");

  //========== Auth ==========//
  const [error] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB Fetching ==========//
  try {
    const res = await getFoldersWithNotes(workspaceId);
    return ok(res);
  } catch {
    return fail({ reason: "Unexpected" });
  }
}
