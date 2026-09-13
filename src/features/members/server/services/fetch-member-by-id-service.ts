import { fail, ok } from "@/lib/result";
import z from "zod";
import { ErrorReason } from "@/lib/errors";
import { requireWorkspaceMember } from "@/lib/permissions";
import { getMemberById } from "../queries/get-member-by-id";

const schema = z.object({ workspaceId: z.uuid(), userId: z.string() });

type IncomingData = z.infer<typeof schema>;

export async function fetchMemberByIdService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { workspaceId, userId } = validated.data;

  //========== Auth and permisssion ==========//
  const [error] = await requireWorkspaceMember(workspaceId);
  if (error) {
    return fail({ reason: error.reason });
  }

  //========== DB fetching ==========//
  try {
    const member = await getMemberById({ workspaceId, userId });

    if (!member) {
      return fail({ reason: ErrorReason.WorkspaceMemberNotFound });
    }

    return ok(member);
  } catch {
    return fail({ reason: ErrorReason.UnexpectedError });
  }
}
