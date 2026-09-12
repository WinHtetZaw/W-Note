import { stripe } from "@/lib/stripe/client";
import { stripePrices } from "@/lib/stripe/constants";
import { getWorkspaceSubscription } from "../server/queries/get-workspace-subscription";
import { SubscriptionPlans } from "../types/billing.types";
import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import { env } from "@/data/env/client";

type IncomingData = {
  workspaceId: string;
  plan: Exclude<SubscriptionPlans, "free">;
  customerId?: string | null;
  email: string;
};

export async function checkoutSession(input: IncomingData) {
  const { workspaceId, plan, email, customerId } = input;
  const priceId = stripePrices[plan];

  const subscription = await getWorkspaceSubscription(workspaceId);

  if (subscription?.stripeSubscriptionId) {
    return fail({ reason: ErrorReason.SubscriberAlreadyExists });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      ...(customerId ? { customer: customerId } : { customer_email: email }),

      line_items: [{ price: priceId, quantity: 1 }],

      success_url:
        `${env.NEXT_PUBLIC_APP_URL}` +
        `/dashboard/w/${workspaceId}/billing?success=true`,

      cancel_url:
        `${env.NEXT_PUBLIC_APP_URL}` +
        `/dashboard/w/${workspaceId}/billing?canceled=true`,

      metadata: { workspaceId, plan },

      subscription_data: { metadata: { workspaceId, plan } },

      // allow_promotion_codes: true,
    });
    return ok(session);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
