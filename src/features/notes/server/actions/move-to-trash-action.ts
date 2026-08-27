"use server";

import { updateTag } from "next/cache";
import { moveToTrashService } from "../../services/move-to-trash-service";
import { cacheTags } from "@/lib/cache/tags";
import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";

type IncomingData = {
  workspaceId: string;
  noteId: string;
};

export async function moveToTrashAction(rawData: IncomingData) {
  const [error, note] = await moveToTrashService(rawData);
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
