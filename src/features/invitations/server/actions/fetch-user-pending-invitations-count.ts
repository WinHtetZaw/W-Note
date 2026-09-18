"use server";

import { ErrorCode } from "@/lib/errors";
import { userPendingInvitationsCountService } from "../../services/user-pending-invitations-count-service";
import { redirect } from "next/navigation";

export async function fetchUserPendingInvitationsCount() {
  const [error, count] = await userPendingInvitationsCountService();

  if (error == null) {
    return { count };
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
