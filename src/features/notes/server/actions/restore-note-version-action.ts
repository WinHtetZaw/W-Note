"use server";

import { redirect } from "next/navigation";
import { restoreNoteVersionService } from "../../services/restore-note-version-service";
import { updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";
import { ErrorCode } from "@/lib/errors";

type IncomingData = { versionId: string; workspaceId: string };

export async function restoreNoteVersionAction(rawData: IncomingData) {
  const [error, note] = await restoreNoteVersionService(rawData);
  if (error == null) {
    if (note.folderId) updateTag(cacheTags.folderNotes(note.folderId));
    updateTag(cacheTags.workspaceNotes(note.workspaceId));
    return { success: true, data: note };
  }

  const reason = error.reason;
  switch (reason) {
    case "INVALID_INPUT":
      return { code: ErrorCode.Validation, reason, details: error.details };
    case "NOT_AUTHENTICATED":
      redirect("/sign-in");
    case "NOT_WORKSPACE_MEMBER":
      return { code: ErrorCode.Forbidden, reason };
    case "INSUFFICIENT_PERMISSION":
      return { code: ErrorCode.Forbidden, reason };
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
