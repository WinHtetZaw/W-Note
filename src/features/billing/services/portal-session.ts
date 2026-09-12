import { env } from "@/data/env/client";
import { fail, ok } from "@/lib/result";
import { stripe } from "@/lib/stripe/client";

export async function portalSession(input: { stripeCustomerId: string }) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: input.stripeCustomerId,

      return_url: `${env.NEXT_PUBLIC_APP_URL}` + `/dashboard`,
    });

    return ok({ url: session.url });
  } catch (err) {
    console.error("Failed to create Stripe portal session:", err);

    return fail({
      reason: "UNEXPECTED",
    });
  }
}
