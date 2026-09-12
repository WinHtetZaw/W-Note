import { requirePermission } from "@/lib/authz";
import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { getWorkspaceSubscription } from "../server/queries/get-workspace-subscription";
import { portalSession } from "./portal-session";

const schema = z.object({ workspaceId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function createPortalSessionService(rawData: IncomingData) {
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { workspaceId } = validated.data;

  const [permissionError] = await requirePermission(
    workspaceId,
    "billing:manage",
  );

  if (permissionError) {
    return fail({ reason: permissionError.reason });
  }

  const subscription = await getWorkspaceSubscription(workspaceId);

  if (!subscription?.stripeCustomerId) {
    return fail({ reason: ErrorReason.StripeCustomerNotFound });
  }

  const [error, data] = await portalSession({
    stripeCustomerId: subscription.stripeCustomerId,
  });

  if (error) {
    return fail({ reason: error.reason });
  }

  return ok(data);
}
