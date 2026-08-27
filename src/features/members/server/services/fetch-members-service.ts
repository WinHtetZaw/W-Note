import { fail, ok } from "@/lib/result";
import z from "zod";
import { ErrorReason } from "@/lib/errors";
import { getMembers } from "../queries/get-members";
import { requireWorkspaceMember } from "@/lib/permissions";

const schema = z.object({ workspaceId: z.string() });

export async function fetchMembersService(workspaceId: string) {
  //========= Validating incoming data ========//
  const result = schema.safeParse({ workspaceId });
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }

  //========== Auth and permisssion ==========//
  const [error] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB fetching ==========//
  try {
    const movedNote = await getMembers(workspaceId);
    return ok(movedNote);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
