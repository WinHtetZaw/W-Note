"use server";

import { transferWorkspaceOwnershipService } from "../../services/transfer-workspace-ownership-service";
import { updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";
import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";

type IncomingData = {
  workspaceId: string;
  newOwnerId: string;
};

export async function transferWorkspaceOwnership(rawData: IncomingData) {
  const [error, isTransfered] =
    await transferWorkspaceOwnershipService(rawData);

  if (error == null) {
    updateTag(cacheTags.workspaceMembers(rawData.workspaceId));
    updateTag(cacheTags.workspace(rawData.workspaceId));
    return { success: isTransfered };
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
