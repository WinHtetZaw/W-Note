"use server";

import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";
import { deleteAccountService } from "../../services/delete-account-service";

export async function DeleteAccount() {
  const [error, isDeleted] = await deleteAccountService();

  if (error == null) {
    return { success: isDeleted };
  }

  const reason = error.reason;
  switch (reason) {
    case "USER_HAS_OWN_WORKSPACES":
      return { code: ErrorCode.Conflict, reason, details: error.details };
    case "NOT_AUTHENTICATED":
      redirect("/sign-in");
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason, details: error.details };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
