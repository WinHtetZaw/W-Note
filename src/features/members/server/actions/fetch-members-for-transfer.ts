"use server";

import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";
import { fetchMembersForTransferService } from "../services/fetch-members-for-transfer-service";

export async function fetchMembersForTransfer(workspaceId: string) {
  const [error, data] = await fetchMembersForTransferService(workspaceId);

  if (error == null) {
    return { data };
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
