"use server";

import { restoreNoteVersion } from "../mutations/restore-note-version";

export async function restoreNoteVersionAction(versionId: string) {
  const result = await restoreNoteVersion(versionId);
  if (!result) {
    return { success: false, message: "Fail to restore note!" };
  }

  return { success: true, message: "Successfully restored note!" };
}
