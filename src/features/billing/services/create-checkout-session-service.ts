import z from "zod";
import { SUBSCRIPTION_PLANS } from "../constants/billing.constants";
import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";
import { requireWorkspaceMember } from "@/lib/permissions";
import { checkoutSession } from "./checkout-session";

const schema = z.object({
  workspaceId: z.uuid(),
  plan: z.enum([...SUBSCRIPTION_PLANS].filter((plan) => plan !== "free")),
});

type IncomingData = z.infer<typeof schema>;

export async function createCheckoutSessionService(rawData: IncomingData) {
  const validated = schema.safeParse(rawData);

  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { workspaceId, plan } = validated.data;

  const [permissionError, authData] = await requireWorkspaceMember(workspaceId);
  if (permissionError) {
    return fail({ reason: permissionError.reason });
  }
  const { email } = authData.user;

  try {
    const [error, session] = await checkoutSession({
      workspaceId,
      plan,
      email,
    });

    if (error) {
      return fail({ reason: error.reason });
    }

    return ok(session);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
