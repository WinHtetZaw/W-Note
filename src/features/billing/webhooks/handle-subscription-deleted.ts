import Stripe from "stripe";
import { eq } from "drizzle-orm";

import { subscriptionsTable } from "@/db/schema";
import { BillingDb } from "../types/billing.types";

export async function handleSubscriptionDeleted(
  db: BillingDb,
  subscription: Stripe.Subscription,
) {
  const workspaceId = subscription.metadata?.workspaceId;

  if (!workspaceId) {
    throw new Error(
      `Deleted subscription ${subscription.id} is missing workspaceId`,
    );
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : (subscription.customer?.id ?? null);

  await db
    .update(subscriptionsTable)
    .set({
      plan: "free",
      status: "canceled",

      stripeCustomerId: customerId,
      stripeSubscriptionId: null,

      currentPeriodEnd: null,
      cancelAtPeriodEnd: false,

      updatedAt: new Date(),
    })
    .where(eq(subscriptionsTable.workspaceId, workspaceId));
}
