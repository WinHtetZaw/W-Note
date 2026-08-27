"use server";

import { redirect } from "next/navigation";
import { fetchWorkspaceService } from "../../services/fetch-workspace-service";
import { ErrorCode } from "@/lib/errors";

export async function fetchWorkspace(workspaceId: string) {
  const [error, data] = await fetchWorkspaceService(workspaceId);

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
