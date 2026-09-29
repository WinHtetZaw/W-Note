"use server";

import { cacheTags } from "@/lib/cache/tags";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";
import { restoreNoteService } from "../../services/restore-note-service";

type IncomingData = {
  workspaceId: string;
  noteId: string;
};

export async function restoreNoteAction(rawData: IncomingData) {
  const [error, deletedNote] = await restoreNoteService(rawData);

  if (error == null) {
    if (deletedNote.folderId) {
      updateTag(cacheTags.folderNotes(deletedNote.folderId));
    }
    updateTag(cacheTags.workspaceNotes(deletedNote.workspaceId));

    return { success: !!deletedNote.id };
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
      return { code: ErrorCode.Internal, reason, details: error.details };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
