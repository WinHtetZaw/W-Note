import { redirect } from "next/navigation";
import { folderWithNotesService } from "../../services/folder-with-note-service";
import { ErrorCode } from "@/lib/errors";

type IncomingData = {
  workspaceId: string;
  folderId: string;
  q?: string;
};

export async function fetchFolderNotes(rawData: IncomingData) {
  const [error, data] = await folderWithNotesService(rawData);

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
