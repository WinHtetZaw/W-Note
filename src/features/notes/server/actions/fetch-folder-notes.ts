import { requireWorkspaceMember } from "@/lib/permissions";
import { getFolderNotes } from "../queries/get-folder-notes";

export async function fetchFolderNotes(workspaceId: string, folderId: string) {
  await requireWorkspaceMember(workspaceId);
  const notes = await getFolderNotes(workspaceId, folderId);
  if (notes.length === 0) {
    return { success: false, message: "Fail to get notes" };
  }
  return { success: true, data: notes };
}
