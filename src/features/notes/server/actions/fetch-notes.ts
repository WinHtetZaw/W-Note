"use server";

import { fetchNotesService } from "@/features/folders/services/fetch-notes-service";
import { ErrorCode } from "@/lib/errors";
import { redirect } from "next/navigation";

type IncomingData = {
  workspaceId: string;
  q?: string;
  limit?: number;
};

export async function fetchNotes(rawData: IncomingData) {
  const [error, data] = await fetchNotesService(rawData);

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
