"use server";

import { deleteWorkspaceMemberService } from "../../services/delete-workspace-member-service";
import { updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";
import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";

export async function leaveWorkspace(workspaceId: string) {
  const [error, isDeleted] = await deleteWorkspaceMemberService(workspaceId);

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
    case "OWNER_CANNOT_LEAVE_WORKSPACE":
      return { code: ErrorCode.Conflict, reason };
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
