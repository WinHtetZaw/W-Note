import { PlanFeature } from "../constants/billing.constants";
import { getWorkspaceEntitlements } from "./get-workspace-entitlements";

export async function checkFeatureAccess(
  workspaceId: string,
  feature: PlanFeature,
) {
  const entitlements = await getWorkspaceEntitlements(workspaceId);

  return entitlements.limits.features[feature];
}
