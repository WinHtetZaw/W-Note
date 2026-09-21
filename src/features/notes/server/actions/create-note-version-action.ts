"use server";

import { ErrorCode } from "@/lib/errors";
import { createNoteVersionService } from "../../services/create-note-version-service";
import { redirect } from "next/navigation";

type IncomingData = {
  workspaceId: string;
  noteId: string;
};

export async function createNoteVersionAction(rawData: IncomingData) {
  const [error, note] = await createNoteVersionService(rawData);
  if (error == null) {
    return { data: note.version };
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
