import Stripe from "stripe";
import { eq } from "drizzle-orm";

import { subscriptionsTable } from "@/db/schema";
import { BillingDb } from "../types/billing.types";

export async function handleCheckoutCompleted(
  db: BillingDb,
  session: Stripe.Checkout.Session,
) {
  const workspaceId = session.metadata?.workspaceId;
  const plan = session.metadata?.plan;

  if (!workspaceId) {
    throw new Error(`Checkout session ${session.id} is missing workspaceId`);
  }

  if (plan !== "pro" && plan !== "team") {
    throw new Error(`Checkout session ${session.id} has invalid plan: ${plan}`);
  }

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  if (!subscriptionId) {
    throw new Error(`Checkout session ${session.id} has no subscription`);
  }

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : (session.customer?.id ?? null);

  await db
    .update(subscriptionsTable)
    .set({
      plan,
      status: "active",
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      cancelAtPeriodEnd: false,
      updatedAt: new Date(),
    })
    .where(eq(subscriptionsTable.workspaceId, workspaceId));
}
