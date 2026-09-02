import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { requireAuth } from "@/lib/permissions";
import { getWorkspacePendingInvitations } from "../server/queries/get-workspace-pending-invitations";

const schema = z.object({ workspaceId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function workspacePendingInvitationsService(
  rawData: IncomingData,
) {
  //========= Validating input data ========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const workspaceId = result.data.workspaceId;

  //========== Authentication ==========//
  const [error] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const res = await getWorkspacePendingInvitations(workspaceId);
    return ok(res);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
