import { requirePermission } from "@/lib/authz";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { updateWorkspaceOwnership } from "../server/mutations/update-workspace-ownership";
import { ErrorReason } from "@/lib/errors";

const schema = z.object({
  workspaceId: z.string(),
  newOwnerId: z.string(),
});

type incomingData = z.infer<typeof schema>;

export async function transferWorkspaceOwnershipService(rawData: incomingData) {
  //========== Validating incoming data ==========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }

  //========== Auth and permisssion ==========//
  const [error, authData] = await requirePermission(
    result.data.workspaceId,
    "workspace:transfer",
  );
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const isTransfered = await updateWorkspaceOwnership({
      ...result.data,
      userId: authData.user.id,
    });
    return ok(isTransfered);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
