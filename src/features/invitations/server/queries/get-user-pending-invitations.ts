import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";
import { cacheTags } from "@/lib/cache/tags";
import { and, eq, gt } from "drizzle-orm";
import { cacheTag } from "next/cache";

type IncomingData = { email: string; userId: string };

export async function getUserPendingInvitations({
  email,
  userId,
}: IncomingData) {
  "use cache";
  cacheTag(cacheTags.userInvitations(userId));

  return db.query.workspaceInvitationsTable.findMany({
    where: and(
      eq(workspaceInvitationsTable.email, email),
      eq(workspaceInvitationsTable.status, "pending"),
      gt(workspaceInvitationsTable.expiresAt, new Date()),
    ),
    columns: {
      id: true,
      email: true,
      expiresAt: true,
      role: true,
      updatedAt: true,
    },

    with: {
      workspace: {
        columns: {
          id: true,
          name: true,
        },
      },

      inviter: {
        columns: {
          id: true,
          name: true,
        },
      },
    },
  });

  // db.select({
  //     id: workspaceInvitationsTable.id,

  //     email: workspaceInvitationsTable.email,

  //     role: workspaceInvitationsTable.role,

  //     status: workspaceInvitationsTable.status,

  //     expiresAt: workspaceInvitationsTable.expiresAt,

  //     createdAt: workspaceInvitationsTable.createdAt,

  //     workspace: {
  //       id: workspacesTable.id,
  //       name: workspacesTable.name,
  //     },

  //     inviter: {
  //       id: usersTable.id,
  //       name: usersTable.name,
  //       image: usersTable.image,
  //       email: usersTable.email,
  //     },
  //   })
  //   .from(workspaceInvitationsTable)
  //   .innerJoin(
  //     workspacesTable,
  //     eq(
  //       workspaceInvitationsTable.workspaceId,
  //       workspacesTable.id,
  //     ),
  //   )
  //   .innerJoin(
  //     usersTable,
  //     eq(
  //       workspaceInvitationsTable.invitedBy,
  //       usersTable.id,
  //     ),
  //   )
  //   .where(
  //     and(
  //       eq(
  //         workspaceInvitationsTable.email,
  //         session.user.email,
  //       ),
  //       eq(workspaceInvitationsTable.status, "pending"),
  //       isNull(workspaceInvitationsTable.revokedAt),
  //       gt(
  //         workspaceInvitationsTable.expiresAt,
  //         new Date(),
  //       ),
  //     ),
  //   )
  //   .orderBy(desc(workspaceInvitationsTable.createdAt));
}

export type PendingInvitation = NonNullable<
  Awaited<ReturnType<typeof getUserPendingInvitations>>
>[number];
