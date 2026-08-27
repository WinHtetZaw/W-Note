"use server";

import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";
import { fetchUserWorkspaceRoleService } from "../../services/fetch-user-workspace-role-service";

export async function fetchUserWorkspaceRole(workspaceId: string) {
  const [error, data] = await fetchUserWorkspaceRoleService(workspaceId);

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
    case "USER_NOT_FOUND":
      return { code: ErrorCode.NotFound, reason };
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
