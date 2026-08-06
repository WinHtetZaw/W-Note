"use server";

import { requireAuth } from "@/lib/permissions";
import { fail, ok, Result } from "@/lib/types";
import { getUserPendingInvitationsCount } from "../queries/get-user-pending-invitations-count";

export async function fetchUserPendingInvitationsCount(
  email: string,
): Promise<Result<number>> {
  const user = await requireAuth();

  const count = await getUserPendingInvitationsCount(email);

  if (!count) return fail("No invitations found");

  return ok(count);
}
