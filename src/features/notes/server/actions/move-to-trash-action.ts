"use server";

import { requireAuth, requireNoteEdit } from "@/lib/permissions";
import { moveToTrash } from "../mutations/move-to-trash";
import { requirePermission } from "@/lib/authz";
import { Permissions } from "@/lib/permissions/access-control-list";
import { revalidateTag, updateTag } from "next/cache";

export async function moveToTrashAction(workspaceId: string, noteId: string) {
  // await requireNoteEdit(noteId);

  try {
    await requirePermission(workspaceId, Permissions.NoteDelete);

    const success = await moveToTrash(noteId);
    if (!success) {
      return { success, message: "Fail to move note to trash" };
    }
    updateTag("trash");
    return { success, message: "Successfuly note moved to trash" };
  } catch (error) {
    return { success: false, message: "Something wrong!" };
  }
}
