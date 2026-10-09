"use server";

import { ErrorCode } from "@/lib/errors";
import { redirect } from "next/navigation";
import { declineWorkspaceInviteService } from "../../services/decline-workspace-invite-service";

export async function declineWorkspaceInvite(invitationId: string) {
  const [error, data] = await declineWorkspaceInviteService({
    invitationId,
  });

  if (error == null) {
    return { data };
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
