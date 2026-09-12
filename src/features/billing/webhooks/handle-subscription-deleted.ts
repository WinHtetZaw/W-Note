import Stripe from "stripe";

import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
) {
  const workspaceId = subscription.metadata?.workspaceId;

  if (!workspaceId) {
    return;
  }

  await db
    .update(subscriptionsTable)
    .set({
      plan: "free",
      status: "canceled",
      stripeSubscriptionId: null,
      currentPeriodEnd: null,
      updatedAt: new Date(),
    })
    .where(eq(subscriptionsTable.workspaceId, workspaceId));
}
