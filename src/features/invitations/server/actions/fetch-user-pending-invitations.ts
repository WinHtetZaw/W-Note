"use server";

import { requireAuth } from "@/lib/permissions";
import { fail, ok, Result } from "@/lib/types";
import {
  getUserPendingInvitations,
  UserPendingInvitations,
} from "../queries/get-user-pending-invitations";

export async function fetchUserPendingInvitations(): Promise<
  Result<UserPendingInvitations[]>
> {
  const user = await requireAuth();

  const invitations = await getUserPendingInvitations(user.email);

  if (!invitations) {
    return fail("No invitations found");
  }

  return ok(invitations);
}
