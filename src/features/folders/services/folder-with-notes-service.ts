import { requireWorkspaceMember } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { getFolderWithNotes } from "../server/queries/get-Folder-with-notes";
import { ErrorReason } from "@/lib/errors";

const schema = z.object({
  workspaceId: z.string(),
  folderId: z.string(),
  q: z.string().optional(),
});

type IncomingData = z.infer<typeof schema>;

export async function folderWithNotesService(rawData: IncomingData) {
  // ─── Validate Input ────────────────────────────────────────
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }

  // ─── Authentication & Permission ────────────────────────────
  const [authError] = await requireWorkspaceMember(validated.data.workspaceId);
  if (authError) {
    return fail({ reason: authError.reason });
  }

  // ─── DB Operation ────────────────────────────
  try {
    const folderWithNotes = await getFolderWithNotes(validated.data);
    if (!folderWithNotes) return fail({ reason: ErrorReason.FolderNotFound });
    return ok(folderWithNotes);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
