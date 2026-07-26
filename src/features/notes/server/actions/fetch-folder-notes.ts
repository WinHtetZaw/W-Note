import { requireWorkspaceMember } from "@/lib/permissions";
import { FolderNote, getFolderNotes } from "../queries/get-folder-notes";
import { fail, ok, Result } from "@/lib/types";

export async function fetchFolderNotes(
  workspaceId: string,
  folderId: string,
): Promise<Result<FolderNote[]>> {
  await requireWorkspaceMember(workspaceId);
  console.log(workspaceId, folderId);

  const notes = await getFolderNotes(workspaceId, folderId);
  if (!notes) {
    return fail("Fail to get notes");
  }

  return ok(notes);
}
