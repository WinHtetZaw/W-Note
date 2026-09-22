// features/billing/services/check-feature-access.ts

import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";

import { getWorkspaceEntitlements } from "./get-workspace-entitlements";
import { PlanFeature } from "../constants/billing.constants";

type CheckFeatureAccessInput = {
  workspaceId: string;
  feature: PlanFeature;
};

export async function checkFeatureAccess({
  workspaceId,
  feature,
}: CheckFeatureAccessInput) {
  const entitlements = await getWorkspaceEntitlements(workspaceId);

  const enabled = entitlements.features[feature];

  if (!enabled) {
    return fail({
      reason: ErrorReason.FeatureNotAvailable,
      details: {
        feature,
        plan: entitlements.plan,
      },
    });
  }

  return ok({
    plan: entitlements.plan,
    feature,
    enabled: true,
  });
}
