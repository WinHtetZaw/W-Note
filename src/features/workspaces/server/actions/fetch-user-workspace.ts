"use server";

import { redirect } from "next/navigation";
import { fetchUserWorkspaceService } from "../../services/fetch-user-workspace-service";
import { ErrorCode } from "@/lib/errors";

export async function fetchUserWorkspace() {
  const [error, data] = await fetchUserWorkspaceService();

  if (error == null) {
    return { data };
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
