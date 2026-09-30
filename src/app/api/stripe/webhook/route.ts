// src/app/api/stripe/webhook/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe/client";
import { env } from "@/data/env/server";
import { db } from "@/db";
import { stripeEventsTable } from "@/db/schema";

import { handleCheckoutCompleted } from "@/features/billing/webhooks/handle-checkout-completed";
import { handleSubscriptionDeleted } from "@/features/billing/webhooks/handle-subscription-deleted";
import { handleSubscriptionUpdated } from "@/features/billing/webhooks/handle-subscription-updated";

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
    const processed = await db.transaction(async (tx) => {
      const inserted = await tx
        .insert(stripeEventsTable)
        .values({
          stripeEventId: event.id,
          type: event.type,
        })
        .onConflictDoNothing({
          target: stripeEventsTable.stripeEventId,
        })
        .returning({
          id: stripeEventsTable.id,
        });

      // Another request already processed this event.
      if (inserted.length === 0) {
        return false;
      }

      switch (event.type) {
        case "checkout.session.completed": {
          await handleCheckoutCompleted(tx, event.data.object);
          break;
        }

        case "customer.subscription.updated": {
          await handleSubscriptionUpdated(tx, event.data.object);
          break;
        }

        case "customer.subscription.deleted": {
          await handleSubscriptionDeleted(tx, event.data.object);
          break;
        }

        default:
          // We still record unknown events so that
          // Stripe doesn't repeatedly send them.
          break;
      }

      return true;
    });

    return NextResponse.json({
      received: true,
      processed,
    });
  } catch (error) {
    console.error(`Failed to process Stripe event ${event.id}:`, error);

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
