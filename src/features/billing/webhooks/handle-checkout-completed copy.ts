import Stripe from "stripe";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { subscriptionsTable } from "@/db/schema";

export async function handleCheckoutCompleted(
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

// import Stripe from "stripe";
// import { db } from "@/db";
// import { subscriptionsTable } from "@/db/schema";
// import { eq } from "drizzle-orm";

// type Session = Stripe.Checkout.Session;

// export async function handleCheckoutCompleted(session: Session) {
//   const workspaceId = session.metadata?.workspaceId;
//   const plan = session.metadata?.plan;

//   if (!workspaceId || !plan) {
//     throw new Error(`Checkout session ${session.id} is missing metadata.`);
//   }

//   if (plan !== "pro" && plan !== "team") {
//     throw new Error(`Invalid Stripe plan: ${plan}`);
//   }

//   const subscriptionId =
//     typeof session.subscription === "string"
//       ? session.subscription
//       : session.subscription?.id;

//   if (!subscriptionId) {
//     throw new Error(`Checkout session ${session.id} has no subscription.`);
//   }

//   const customerId =
//     typeof session.customer === "string"
//       ? session.customer
//       : (session.customer?.id ?? null);

//   await db
//     .insert(subscriptionsTable)
//     .values({
//       workspaceId,
//       plan,
//       status: "active",
//       stripeCustomerId: customerId,
//       stripeSubscriptionId: subscriptionId,
//       cancelAtPeriodEnd: false,
//     })
//     .onConflictDoUpdate({
//       target: subscriptionsTable.workspaceId,

//       set: {
//         plan,
//         status: "active",
//         stripeCustomerId: customerId,
//         stripeSubscriptionId: subscriptionId,
//         cancelAtPeriodEnd: false,
//         updatedAt: new Date(),
//       },
//     });
// }
