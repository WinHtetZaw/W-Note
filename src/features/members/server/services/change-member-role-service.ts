import { requirePermission } from "@/lib/authz";
import { fail, ok } from "@/lib/result";
import { ErrorReason } from "@/lib/errors";
import z from "zod";
import { changeMemberRole } from "../mutations/change-member-role";

const schema = z.object({
  workspaceId: z.uuid(),
  memberId: z.string(),
  role: z.enum(["member", "admin"]),
});

type IncomingData = z.infer<typeof schema>;

export async function changeMemberRoleService(rawData: IncomingData) {
  //========== Validating incoming data ==========//
  const result = schema.safeParse(rawData);
  if (!result.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: result.error });
  }
  const { workspaceId, memberId, role } = result.data;

  //========== Auth and permisssion ==========//
  const [error] = await requirePermission(workspaceId, "member:roleUpdate");
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB mutation ==========//
  try {
    const isChanged = await changeMemberRole({ workspaceId, memberId, role });
    return ok({ success: isChanged });
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
