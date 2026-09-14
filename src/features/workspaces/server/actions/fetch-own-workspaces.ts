"use server";

import { redirect } from "next/navigation";
import { ErrorCode } from "@/lib/errors";
import { fetchOwnWorkspacesService } from "../../services/fetch-own-workspaces-service";

export async function fetchOwnWorkspaces() {
  const [error, data] = await fetchOwnWorkspacesService();

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
