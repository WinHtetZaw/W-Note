"use server";

import { requireWorkspaceOwner } from "@/lib/permissions";
import { deleteWorkspace } from "../mutations/delete-workspace";
import { removeWorkspaceService } from "../../services/remove-workspace-service";
import { updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";
import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";

export async function removeWorkspace(workspaceId: string) {
  const [error, isDeleted] = await removeWorkspaceService(workspaceId);

  if (error == null) {
    updateTag(cacheTags.workspace(workspaceId));
    return { success: isDeleted };
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
