"use server";

import { ErrorCode } from "@/lib/errors";
import { duplicateNoteService } from "../../services/duplicate-note-service";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";

type IncomingData = {
  workspaceId: string;
  noteId: string;
};

export async function duplicateNoteAction(rawData: IncomingData) {
  const [error, data] = await duplicateNoteService(rawData);

  if (error == null) {
    if (data.folderId) {
      updateTag(cacheTags.folderNotes(data.folderId));
    }
    updateTag(cacheTags.workspaceNotes(data.workspaceId));
    return { data };
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
