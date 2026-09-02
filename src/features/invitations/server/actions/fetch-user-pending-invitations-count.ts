"use server";

import { ErrorCode } from "@/lib/errors";
import { userPendingInvitationsCountService } from "../../services/user-pending-invitations-count-service";
import { redirect } from "next/navigation";

export async function fetchUserPendingInvitationsCount(workspaceId: string) {
  const [error, invitations] = await userPendingInvitationsCountService({
    workspaceId,
  });

  if (error == null) {
    return { data: invitations };
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
