"use server";

import { redirect } from "next/navigation";
import { foldersNotesService } from "../../services/folders-notes-service";
import { ErrorCode } from "@/lib/errors";

type IncomingData = {
  workspaceId: string;
  q?: string;
};

export async function fetchFoldersNotes(rawData: IncomingData) {
  const [error, data] = await foldersNotesService(rawData);

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
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
