import { env } from "@/data/env/server";
import { handleCheckoutCompleted } from "@/features/billing/webhooks/handle-checkout-completed";
import { handleSubscriptionDeleted } from "@/features/billing/webhooks/handle-subscription-deleted";
import { handleSubscriptionUpdated } from "@/features/billing/webhooks/handle-subscription-updated";
import { stripe } from "@/lib/stripe/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const body = await request.text();

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing Stripe signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Stripe webhook signature verification failed:", err);

    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        await handleCheckoutCompleted(session);

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        await handleSubscriptionUpdated(subscription);

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        await handleSubscriptionDeleted(subscription);

        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Stripe webhook processing failed:", err);

    return new NextResponse("Webhook processing failed", { status: 500 });
  }
}
