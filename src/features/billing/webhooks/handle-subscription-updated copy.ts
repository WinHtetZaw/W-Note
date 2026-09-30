import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
) {
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

  const status = mapStripeSubscriptionStatus(subscription.status);

  const currentPeriodEnd = subscription.items.data[0]?.current_period_end;

  await db
    .update(subscriptionsTable)
    .set({
      plan,
      status,
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

// import Stripe from "stripe";
// import { db } from "@/db";
// import { subscriptionsTable } from "@/db/schema";

// export async function handleSubscriptionUpdated(
//   subscription: Stripe.Subscription,
// ) {
//   const workspaceId = subscription.metadata?.workspaceId;

//   if (!workspaceId) {
//     throw new Error(`Subscription ${subscription.id} is missing workspaceId.`);
//   }

//   const plan = subscription.metadata?.plan;

//   if (plan !== "pro" && plan !== "team") {
//     throw new Error(`Invalid subscription plan: ${plan}`);
//   }

//   const customerId =
//     typeof subscription.customer === "string"
//       ? subscription.customer
//       : subscription.customer.id;

//   const status = mapStripeSubscriptionStatus(subscription.status);

//   await db
//     .insert(subscriptionsTable)
//     .values({
//       workspaceId,
//       plan,
//       status,
//       stripeCustomerId: customerId,
//       stripeSubscriptionId: subscription.id,

//       currentPeriodEnd: new Date(
//         subscription.items.data[0].current_period_end * 1000,
//       ),

//       cancelAtPeriodEnd: subscription.cancel_at_period_end,
//     })
//     .onConflictDoUpdate({
//       target: subscriptionsTable.workspaceId,

//       set: {
//         plan,
//         status,
//         stripeCustomerId: customerId,
//         stripeSubscriptionId: subscription.id,

//         currentPeriodEnd: new Date(
//           subscription.items.data[0].current_period_end * 1000,
//         ),

//         cancelAtPeriodEnd: subscription.cancel_at_period_end,

//         updatedAt: new Date(),
//       },
//     });
// }

// function mapStripeSubscriptionStatus(status: Stripe.Subscription.Status) {
//   switch (status) {
//     case "active":
//     case "trialing":
//       return "active" as const;

//     case "past_due":
//     case "unpaid":
//     case "incomplete":
//       return "past_due" as const;

//     case "canceled":
//     case "incomplete_expired":
//       return "canceled" as const;

//     default:
//       return "past_due" as const;
//   }
// }
