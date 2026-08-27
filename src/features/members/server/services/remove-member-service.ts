import { requirePermission } from "@/lib/authz";
import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { deletemember } from "../mutations/delete-member";

const schema = z.object({
  workspaceId: z.uuid(),
  memberId: z.string(),
});

type IncomingData = z.infer<typeof schema>;

export async function removeMemberService(rawData: IncomingData) {
  //========== Validating incoming data ==========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, memberId } = result.data;

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(workspaceId, "member:remove");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const isDeleted = await deletemember({ workspaceId, memberId });
    return ok({ success: isDeleted });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
