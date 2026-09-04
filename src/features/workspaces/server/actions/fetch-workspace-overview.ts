"use server";

import { redirect } from "next/navigation";
import { fetchWorkspaceOverviewService } from "../../services/fetch-workdpace-overview-service";
import { ErrorCode } from "@/lib/errors";

export const fetchWorkspaceOverview = async (workspaceId: string) => {
  const [error, data] = await fetchWorkspaceOverviewService(workspaceId);

  if (error == null) {
    return { data };
  }

  const reason = error.reason;
  switch (reason) {
    case "INVALID_INPUT":
      return { code: ErrorCode.Validation, reason, details: error.details };
    case "NOT_AUTHENTICATED":
      redirect("/sign-in");
    case "WORKSPACE_NOT_FOUND":
      return { code: ErrorCode.Internal, reason };
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
};
