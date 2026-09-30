import { PlanFeature } from "../constants/billing.constants";
import { getWorkspaceEntitlements } from "./get-workspace-entitlements";

export async function checkFeatureAccess(
  workspaceId: string,
  feature: PlanFeature,
) {
  const entitlements = await getWorkspaceEntitlements(workspaceId);

  const allowed = entitlements.limits.features[feature];

  return {
    allowed,
    plan: entitlements.plan,
    feature,
  };
}
