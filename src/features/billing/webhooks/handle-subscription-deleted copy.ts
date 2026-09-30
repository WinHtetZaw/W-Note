import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
) {
  const workspaceId = subscription.metadata?.workspaceId;

  if (!workspaceId) {
    throw new Error(
      `Deleted subscription ${subscription.id} is missing workspaceId`,
    );
  }

  await db
    .update(subscriptionsTable)
    .set({
      plan: "free",
      status: "canceled",

      // Keep customer ID.
      stripeCustomerId:
        typeof subscription.customer === "string"
          ? subscription.customer
          : (subscription.customer?.id ?? null),

      stripeSubscriptionId: null,

      currentPeriodEnd: null,

      cancelAtPeriodEnd: false,

      updatedAt: new Date(),
    })
    .where(eq(subscriptionsTable.workspaceId, workspaceId));
}

// import Stripe from "stripe";
// import { db } from "@/db";
// import { subscriptionsTable } from "@/db/schema";
// import { eq } from "drizzle-orm";

// export async function handleSubscriptionDeleted(
//   subscription: Stripe.Subscription,
// ) {
//   const workspaceId = subscription.metadata?.workspaceId;

//   if (!workspaceId) {
//     throw new Error(
//       `Deleted subscription ${subscription.id} is missing workspaceId.`,
//     );
//   }

//   await db
//     .update(subscriptionsTable)
//     .set({
//       plan: "free",
//       status: "canceled",
//       stripeSubscriptionId: null,
//       currentPeriodEnd: null,
//       cancelAtPeriodEnd: false,
//       updatedAt: new Date(),
//     })
//     .where(eq(subscriptionsTable.workspaceId, workspaceId));
// }
