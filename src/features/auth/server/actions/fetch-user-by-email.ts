"use server";

import { requireAuth } from "@/lib/permissions";
import { fail, ok, Result } from "@/lib/types";
import { getUserByEmail, User } from "../queries/get-user-by-email";

// export async function fetchUserPendingInvitations(): Promise<
//   Result<User>
// > {
//   const user = await requireAuth();

// //   const invitations = await getUserByEmail(user.email);

//   if (!invitations) {
//     return fail("No invitations found");
//   }

//   return ok(invitations);
// }
