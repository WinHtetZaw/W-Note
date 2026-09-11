"use server";

import { ErrorCode } from "@/lib/errors";
import { notFound, redirect } from "next/navigation";
import { fetchNoteByIdService } from "../../services/fetch-note-by-id-service copy";

type IncomingData = {
  workspaceId: string;
  noteId: string;
};

export async function fetchNoteById(rawData: IncomingData) {
  const [error, data] = await fetchNoteByIdService(rawData);

  if (error == null) {
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
    case "NOTE_NOT_FOUND":
      notFound();
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
