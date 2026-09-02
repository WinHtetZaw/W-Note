import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { requireAuth, requireWorkspaceMember } from "@/lib/permissions";
import { getUserPendingInvitationsCount } from "../server/queries/get-user-pending-invitations-count";

const schema = z.object({ workspaceId: z.uuid() });

type IncomingData = z.infer<typeof schema>;

export async function userPendingInvitationsCountService(
  rawData: IncomingData,
) {
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const workspaceId = result.data.workspaceId;

  //========== Authentication ==========//
  const [error] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB Process ==========//
  try {
    const res = await getUserPendingInvitationsCount(workspaceId);
    return ok(res);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
