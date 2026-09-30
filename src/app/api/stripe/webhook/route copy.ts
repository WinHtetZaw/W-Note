import { NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe/client";
import { env } from "@/data/env/server";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Invalid Stripe webhook signature:", error);

    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        // handleCheckoutCompleted(...)
        break;

      case "customer.subscription.updated":
        // handleSubscriptionUpdated(...)
        break;

      case "customer.subscription.deleted":
        // handleSubscriptionDeleted(...)
        break;

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Failed to process Stripe event ${event.id}:`, error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

// import Stripe from "stripe";
// import { stripe } from "@/lib/stripe/client";
// import { env } from "@/data/env/server";
// import { db } from "@/db";
// import { stripeEventsTable } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { handleCheckoutCompleted } from "@/features/billing/webhooks/handle-checkout-completed";
// import { handleSubscriptionDeleted } from "@/features/billing/webhooks/handle-subscription-deleted";
// import { handleSubscriptionUpdated } from "@/features/billing/webhooks/handle-subscription-updated";

// export async function POST(request: Request) {
//   const body = await request.text();

//   const signature = request.headers.get("stripe-signature");

//   if (!signature) {
//     return new Response("Missing Stripe signature.", { status: 400 });
//   }

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       signature,
//       env.STRIPE_WEBHOOK_SECRET,
//     );
//   } catch (error) {
//     console.error("Stripe webhook signature verification failed:", error);

//     return new Response("Invalid webhook signature.", { status: 400 });
//   }

//   try {
//     const [existingEvent] = await db
//       .select({
//         id: stripeEventsTable.id,
//       })
//       .from(stripeEventsTable)
//       .where(eq(stripeEventsTable.stripeEventId, event.id))
//       .limit(1);

//     if (existingEvent) {
//       return Response.json({
//         received: true,
//         duplicate: true,
//       });
//     }

//     await db.transaction(async (tx) => {
//       switch (event.type) {
//         case "checkout.session.completed": {
//           await handleCheckoutCompleted(event.data.object);

//           break;
//         }

//         case "customer.subscription.updated": {
//           await handleSubscriptionUpdated(event.data.object);

//           break;
//         }

//         case "customer.subscription.deleted": {
//           await handleSubscriptionDeleted(event.data.object);

//           break;
//         }

//         default:
//           break;
//       }

//       await tx.insert(stripeEventsTable).values({
//         stripeEventId: event.id,
//         type: event.type,
//       });
//     });

//     return Response.json({
//       received: true,
//     });
//   } catch (error) {
//     console.error("Stripe webhook processing failed:", error);

//     return new Response("Webhook processing failed.", { status: 500 });
//   }
// }
