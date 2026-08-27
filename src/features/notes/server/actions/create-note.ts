"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { createNoteService } from "../../services/create-note-service";
import { cacheTags } from "@/lib/cache/tags";
import { ErrorCode } from "@/lib/errors";

type CreateNoteInput = {
  workspaceId: string;
  folderId?: string;
};

export async function createNote(rawData: CreateNoteInput) {
  const [error, note] = await createNoteService(rawData);
  if (error == null) {
    if (note.folderId) {
      updateTag(cacheTags.folderNotes(note.folderId));
    }
    updateTag(cacheTags.workspaceNotes(note.workspaceId));
    redirect(`/dashboard/w/${note.workspaceId}/notes/${note.id}`);
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
