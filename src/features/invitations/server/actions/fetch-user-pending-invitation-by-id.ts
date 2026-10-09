"use server";

import { ErrorCode } from "@/lib/errors";
import { redirect } from "next/navigation";
import { userPendingInvitationByIdService } from "../../services/user-pending-invitation-by-id-service";

export async function fetchUserPendingInvitationById(invitationId: string) {
  const [error, data] = await userPendingInvitationByIdService({
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

    case "INVITATION_NOT_FOUND":
      return { code: ErrorCode.NotFound, reason };

    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };

    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
