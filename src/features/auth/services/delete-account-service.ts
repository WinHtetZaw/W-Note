import { getOwnWorkspaces } from "@/features/workspaces/server/queries/get-own-workspaces";
import { ErrorReason } from "@/lib/errors";
import { requireAuth } from "@/lib/permissions";
import { fail, ok } from "@/lib/result";
import { deleteUser } from "./delete-user";
import z from "zod";

const schema = z.object({
  password: z.string().min(1),
});

type IncomingData = z.infer<typeof schema>;

export async function deleteAccountService(rawData: IncomingData) {
  //========= Validating incoming data ========//
  const validated = schema.safeParse(rawData);
  if (!validated.success) {
    return fail({ reason: ErrorReason.InvalidInput, details: validated.error });
  }
  const { password } = validated.data;

  //========== Auth ==========//
  const [authError, user] = await requireAuth();
  if (authError) {
    return fail({ reason: authError.reason });
  }

  try {
    //========= Checking own workspaces ========//
    const ownWorkspaces = await getOwnWorkspaces(user.id);

    if (ownWorkspaces.length > 0) {
      return fail({
        reason: ErrorReason.UserHasOwnWorkspaces,
        details: {
          count: ownWorkspaces.length,
          ownWorkspaces,
        },
      });
    }

    //========= Delete User  ========//
    const [deleteEror, isDeleted] = await deleteUser(password);
    if (deleteEror) {
      return fail({ reason: deleteEror.reason, details: deleteEror.details });
    }

    return ok(isDeleted);
  } catch (err) {
    return fail({
      reason: ErrorReason.UnexpectedError,
      details: err,
    });
  }
}
