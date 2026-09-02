import { db } from "@/db";
import { workspaceInvitationsTable } from "@/db/schema";

import { and, eq, gt } from "drizzle-orm";

export async function getUserPendingInvitations(email: string) {
  return db.query.workspaceInvitationsTable.findMany({
    where: and(
      // eq(workspaceInvitationsTable.workspaceId, workspaceId),
      eq(workspaceInvitationsTable.email, email),
      //   isNull(workspaceInvitationsTable.acceptedAt),
      //   isNull(workspaceInvitationsTable.revokedAt),
      gt(workspaceInvitationsTable.expiresAt, new Date()),
      eq(workspaceInvitationsTable.status, "pending"),
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

export type PendingInvitations = NonNullable<
  Awaited<ReturnType<typeof getUserPendingInvitations>>
>[number];
