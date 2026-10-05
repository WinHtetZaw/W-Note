import z from "zod";
import { ErrorReason } from "@/lib/errors";
import { fail, ok } from "@/lib/result";
import { getWorkspaceUsage } from "../server/queries/get-workspace-usage";
import { requireWorkspaceMember } from "@/lib/permissions";

const schema = z.object({ workspaceId: z.uuid() });
type IncomingData = z.infer<typeof schema>;

export async function fetchWorkspaceUsageService(rawData: IncomingData) {
  //========== Validating incoming data ==========//
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const workspaceId = validated.data.workspaceId;

  //========== Auth and permisssion ==========//
  const [authError] = await requireWorkspaceMember(workspaceId);
  if (authError) {
    return fail({ reason: authError.reason });
  }

  //========== DB process ==========//
  try {
    const workspaceUsage = await getWorkspaceUsage(workspaceId);
    return ok(workspaceUsage);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
