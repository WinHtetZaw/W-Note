"use server";

import { redirect } from "next/navigation";
import { createCheckoutSessionService } from "../../services/create-checkout-session-service";
import { ErrorCode } from "@/lib/errors";
import { SubscriptionPlans } from "../../types/billing.types";

type IncomingData = {
  workspaceId: string;
  plan: Exclude<SubscriptionPlans, "free">;
};

export async function createCheckoutSession(rawData: IncomingData) {
  const [error, data] = await createCheckoutSessionService(rawData);

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
    case "SUBSCRIBER_ALREADY_EXISTS":
      return { code: ErrorCode.Conflict, reason };
    case "UNEXPECTED":
      return { code: ErrorCode.Internal, reason };
    default:
      const _exhaustiveCheck: never = reason;
      console.error("Unknown server error reason:", _exhaustiveCheck);
      return { code: ErrorCode.Internal };
  }
}
