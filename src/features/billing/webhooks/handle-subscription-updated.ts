import Stripe from "stripe";

import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";

import { eq } from "drizzle-orm";

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
) {
  const workspaceId = subscription.metadata?.workspaceId;

  if (!workspaceId) {
    console.error("Subscription missing workspaceId:", subscription.id);

    return;
  }

  const plan = subscription.metadata?.plan;

  if (plan !== "pro" && plan !== "team") {
    console.error("Invalid subscription plan:", plan);

    return;
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const status = mapStripeSubscriptionStatus(subscription.status);

  await db
    .update(subscriptionsTable)
    .set({
      plan,
      status,

      stripeCustomerId: customerId,

      stripeSubscriptionId: subscription.id,

      currentPeriodEnd: new Date(
        subscription.items.data[0].current_period_end * 1000,
      ),

      updatedAt: new Date(),
    })
    .where(eq(subscriptionsTable.workspaceId, workspaceId));
}

function mapStripeSubscriptionStatus(status: Stripe.Subscription.Status) {
  switch (status) {
    case "active":
    case "trialing":
      return "active" as const;

    case "past_due":
      return "past_due" as const;

    case "canceled":
    case "unpaid":
    case "incomplete":
    case "incomplete_expired":
      return "canceled" as const;

    default:
      return "canceled" as const;
  }
}
