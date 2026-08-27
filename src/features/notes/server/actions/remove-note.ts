"use server";

import { cacheTags } from "@/lib/cache/tags";
import { removeNoteService } from "../../services/remove-note-service";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";

type IncomingData = {
  workspaceId: string;
  noteId: string;
  folderId?: string;
};

export async function removeNote(rawData: IncomingData) {
  const [error, isDeleted] = await removeNoteService(rawData);
  if (error == null) {
    if (rawData.folderId) {
      updateTag(cacheTags.folderNotes(rawData.folderId));
    }
    updateTag(cacheTags.workspaceNotes(rawData.workspaceId));
    return { success: isDeleted };
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
