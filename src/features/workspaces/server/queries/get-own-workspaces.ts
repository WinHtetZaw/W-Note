import { db } from "@/db";
import { workspaceMembersTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function getOwnWorkspaces(userId: string) {
  return db.query.workspaceMembersTable.findMany({
    where: and(
      eq(workspaceMembersTable.userId, userId),
      eq(workspaceMembersTable.role, "owner"),
    ),
    with: {
      workspace: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });
}
// export async function getOwnWorkspaces(userId: string) {
//   return db.query.workspacesTable.findMany({
//     columns: {
//       id: true,
//       name: true,
//     },
//     with: {
//       members: {
//         where: and(
//           eq(workspaceMembersTable.userId, userId),
//           eq(workspaceMembersTable.role, "owner"),
//         ),
//       },
//     },
//   });
// }
