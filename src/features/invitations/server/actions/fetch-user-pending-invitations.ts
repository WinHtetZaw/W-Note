"use server";

import { userPendingInvitationsService } from "../../services/user-pending-invitations-service";
import { ErrorCode } from "@/lib/errors";
import { redirect } from "next/navigation";

export async function fetchUserPendingInvitations() {
  const [error, invitations] = await userPendingInvitationsService();

  if (error == null) {
    // updateTag(cacheTags.workspaceFolders(folder.workspaceId));
    return { data: invitations };
  }

  const reason = error.reason;
  switch (reason) {
    case "NOT_AUTHENTICATED":
      redirect("/sign-in");
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
