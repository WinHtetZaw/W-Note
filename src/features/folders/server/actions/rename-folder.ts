"use server";

import { updateTag } from "next/cache";
import { UpdateFolderInput } from "../../schemas";
import { renameFolderService } from "../../services/rename-folder-service";
import { cacheTags } from "@/lib/cache/tags";
import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";

export async function renameFolder(rawData: UpdateFolderInput) {
  const [error, updatedFolder] = await renameFolderService(rawData);

  if (error == null) {
    updateTag(cacheTags.workspaceFolders(updatedFolder.workspaceId));
    return { data: updatedFolder };
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
