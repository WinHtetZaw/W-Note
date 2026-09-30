import { env } from "@/data/env/client";
import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";
import { stripe } from "@/lib/stripe/client";

type PortalSessionInput = {
  stripeCustomerId: string;
  workspaceId: string;
};

export async function portalSession(input: PortalSessionInput) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: input.stripeCustomerId,

      return_url:
        `${env.NEXT_PUBLIC_APP_URL}` +
        `/dashboard/w/${input.workspaceId}/billing`,
    });

    return ok({ url: session.url });
  } catch (error) {
    console.error("Failed to create Stripe portal session:", error);

    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
