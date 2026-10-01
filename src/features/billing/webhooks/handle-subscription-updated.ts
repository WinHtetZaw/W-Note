import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { subscriptionsTable } from "@/db/schema";
import { BillingDb } from "../types/billing.types";

export async function handleSubscriptionUpdated(
  db: BillingDb,
  subscription: Stripe.Subscription,
) {
  console.log("Stripe subscription updated:", {
    id: subscription.id,
    status: subscription.status,
    cancel_at_period_end: subscription.cancel_at_period_end,
    metadata: subscription.metadata,
  });
  const workspaceId = subscription.metadata?.workspaceId;

  if (!workspaceId) {
    throw new Error(`Subscription ${subscription.id} is missing workspaceId`);
  }

  const plan = subscription.metadata?.plan;

  if (plan !== "pro" && plan !== "team") {
    throw new Error(
      `Subscription ${subscription.id} has invalid plan: ${plan}`,
    );
  }

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;

  await db
    .update(subscriptionsTable)
    .set({
      plan,
      status: mapStripeSubscriptionStatus(subscription.status),
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,

      currentPeriodEnd: currentPeriodEnd
        ? new Date(currentPeriodEnd * 1000)
        : null,

      cancelAtPeriodEnd: subscription.cancel_at_period_end,

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
    case "unpaid":
      return "past_due" as const;

    case "canceled":
    case "incomplete":
    case "incomplete_expired":
      return "canceled" as const;

    default:
      return "past_due" as const;
  }
}
