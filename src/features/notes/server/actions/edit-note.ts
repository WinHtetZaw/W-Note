"use server";

import { UpdateNoteInput } from "../../schemas/update-note-schema";
import { editNoteService } from "../../services/edit-note-service";
import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";
import { ErrorCode } from "@/lib/errors";

export async function editNote(rawData: UpdateNoteInput) {
  const [error, note] = await editNoteService(rawData);
  if (error == null) {
    updateTag(
      note.folderId
        ? cacheTags.folderNotes(note.folderId)
        : cacheTags.workspaceNotes(note.workspaceId),
    );
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
