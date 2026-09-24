"use server";

import { ErrorCode } from "@/lib/errors";
import { fetchAIUsageStatusService } from "../../services/fetch-ai-usage-status-service";
import { redirect } from "next/navigation";

export async function fetchAIUsageStatus(workspaceId: string) {
  const [error, data] = await fetchAIUsageStatusService({ workspaceId });

  if (error === null) {
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
    case "PLAN_LIMIT_REACHED":
      return { code: ErrorCode.PlanLimitReached, reason };
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
