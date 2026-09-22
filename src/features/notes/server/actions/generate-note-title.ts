"use server";

import { ErrorCode } from "@/lib/errors";
import { redirect } from "next/navigation";
import { generateNoteTitleService } from "../../services/generate-note-title-service";

type IncomingData = {
  workspaceId: string;
  noteId: string;
};

export async function generateNoteTitle(rawData: IncomingData) {
  const [error, data] = await generateNoteTitleService(rawData);

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
    case "INSUFFICIENT_PERMISSION":
      return { code: ErrorCode.Forbidden, reason };
    case "NOTE_NOT_FOUND":
      return { code: ErrorCode.NotFound, reason };
    case "AI_GENERATION_FAILED":
      return { code: ErrorCode.Internal, reason };
    case "PLAN_LIMIT_REACHED":
      return { code: ErrorCode.PlanLimitReached, reason };
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
