"use server";

import { summarizeNoteService } from "../../services/summerize-note-service";
import { ErrorCode } from "@/lib/errors";

export async function summarizeNote(input: string) {
  const [error, data] = await summarizeNoteService(input);

  if (error == null) {
    return { data };
  }

  // const reason = error.reason;
  // switch (reason) {
  //   case "NOTE_NOT_FOUND":
  //     return { code: ErrorCode.NotFound, reason };
  //   default:
  //     const _exhaustiveCheck: never = reason;
  //     console.error("Unknown server error reason:", _exhaustiveCheck);
  //     return { code: ErrorCode.Internal };
  // }
}
