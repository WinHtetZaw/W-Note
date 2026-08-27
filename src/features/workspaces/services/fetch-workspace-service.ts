import { requireAuth } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import z from "zod";
import { getWorkspace } from "../server/queries/get-workspace";
import { ErrorReason } from "@/lib/errors";

const schema = z.object({ workspaceId: z.string() });

export async function fetchWorkspaceService(workspaceId: string) {
  //========== Validating incoming data ==========//
  const result = schema.safeParse({ workspaceId });
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }

  //========== Auth ==========//
  const [error] = await requireAuth();
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB Fetching ==========//
  try {
    const res = await getWorkspace(workspaceId);
    return ok(res);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
