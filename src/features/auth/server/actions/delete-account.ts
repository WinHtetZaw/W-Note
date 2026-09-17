"use server";

import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";
import { deleteAccountService } from "../../services/delete-account-service";

export async function DeleteAccount(password: string) {
  const [error, isDeleted] = await deleteAccountService({ password });

  if (error == null) {
    return { success: isDeleted };
  }

  const reason = error.reason;
  switch (reason) {
    case "INVALID_INPUT":
      return { code: ErrorCode.Validation, reason, details: error.details };
    case "USER_HAS_OWN_WORKSPACES":
      return { code: ErrorCode.Conflict, reason };
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
