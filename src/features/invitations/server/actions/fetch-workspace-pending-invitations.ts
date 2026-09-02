"use server";

import { ErrorCode } from "@/lib/errors";
import { redirect } from "next/navigation";
import { workspacePendingInvitationsService } from "../../services/workspace-pending-invitations-service";

export async function fetchWorkspacePendingInvitations(workspaceId: string) {
  const [error, invitations] = await workspacePendingInvitationsService({
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
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
