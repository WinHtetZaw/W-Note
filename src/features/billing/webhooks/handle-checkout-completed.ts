import Stripe from "stripe";

import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";

import { eq } from "drizzle-orm";

type Session = Stripe.Checkout.Session;

export async function handleCheckoutCompleted(session: Session) {
  const workspaceId = session.metadata?.workspaceId;

  const plan = session.metadata?.plan;

  if (!workspaceId || !plan) {
    console.error("Stripe Checkout session missing metadata", session.id);

    return;
  }

  if (plan !== "pro" && plan !== "team") {
    console.error("Invalid Stripe plan:", plan);

    return;
  }

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  if (!subscriptionId) {
    return;
  }

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  await db
    .update(subscriptionsTable)
    .set({
      plan,
      status: "active",
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      //   updatedAt: new Date(),
    })
    .where(eq(subscriptionsTable.workspaceId, workspaceId));
}
