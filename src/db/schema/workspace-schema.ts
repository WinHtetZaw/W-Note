import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { user as usersTable } from "./auth-schema";
import { notesTable } from "./note-schema";
import { createdAt, timeAt, updatedAt } from "./db-schema-helper";
import { subscriptionsTable } from "./billing-schema";
import { aiUsageTable } from "./ai-schema";

/* =========================================================
   WORKSPACES
========================================================= */
export const workspacesTable = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    }),
  createdAt,
  updatedAt,
});

/* =========================================================
   WORKSPACE MEMBERS
========================================================= */
export const workspaceMembersTable = pgTable(
  "workspace_members",
  {
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspacesTable.id, {
        onDelete: "cascade",
      }),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    role: varchar("role", {
      length: 50,
    })
      .$type<"owner" | "admin" | "member">()
      .notNull()
      .default("member"),
    joinedAt: timestamp("joined_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.workspaceId, table.userId],
      name: "workspace_members_pk",
    }),
  ],
);

/* =========================================================
   WORKSPACE INVITATIONS
========================================================= */
export const workspaceInvitationsTable = pgTable(
  "workspace_invitations",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspacesTable.id, {
        onDelete: "cascade",
      }),
    invitedBy: text("invited_by")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    email: varchar("email", {
      length: 255,
    }).notNull(),
    role: varchar("role", {
      length: 50,
    })
      .$type<"admin" | "member">()
      .notNull()
      .default("member"),
    status: varchar("status", {
      length: 50,
    })
      .$type<"pending" | "accepted" | "declined" | "revoked">()
      .notNull()
      .default("pending"),
    // token: text("token").notNull(),
    tokenHash: text("token_hash").notNull(),
    expiresAt: timeAt("expires_at").notNull(),
    acceptedAt: timeAt("accepted_at"),
    declinedAt: timeAt("declined_at"),
    revokedAt: timeAt("revoked_at"),
    createdAt,
  },
  (table) => [
    index("workspace_invites_workspace_idx").on(table.workspaceId),
    index("workspace_invites_email_idx").on(table.email),
    // index("workspace_invites_token_unique").on(table.token),
    index("workspace_invites_token_hash_idx").on(table.tokenHash),
    // uniqueIndex("workspace_invite_unique").on(table.workspaceId, table.email),
    uniqueIndex("workspace_invite_pending_unique")
      .on(table.workspaceId, table.email)
      .where(sql`${table.status} = 'pending'`),
    uniqueIndex("workspace_invites_token_hash_unique").on(table.tokenHash),
  ],
);

/* =========================================================
   FOLDERS
========================================================= */
export const foldersTable = pgTable(
  "folders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspacesTable.id, {
        onDelete: "cascade",
      }),
    name: varchar("name", {
      length: 255,
    }).notNull(),
    createdBy: text("created_by")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("folders_workspace_idx").on(table.workspaceId),
    uniqueIndex("folders_workspace_name_unique").on(
      table.workspaceId,
      table.name,
    ),
  ],
);

/* =========================================================
   RELATIONS
========================================================= */

/* ---------------- WORKSPACES ---------------- */
export const workspacesRelations = relations(
  workspacesTable,
  ({ one, many }) => ({
    owner: one(usersTable, {
      fields: [workspacesTable.ownerId],
      references: [usersTable.id],
    }),
    members: many(workspaceMembersTable),
    folders: many(foldersTable),
    notes: many(notesTable),
    subscription: one(subscriptionsTable),
    aiUsage: many(aiUsageTable),
    invitations: many(workspaceInvitationsTable),
  }),
);

/* ---------------- WORKSPACE MEMBERS ---------------- */
export const workspaceMembersRelations = relations(
  workspaceMembersTable,
  ({ one }) => ({
    workspace: one(workspacesTable, {
      fields: [workspaceMembersTable.workspaceId],
      references: [workspacesTable.id],
    }),
    user: one(usersTable, {
      fields: [workspaceMembersTable.userId],
      references: [usersTable.id],
    }),
  }),
);

/* ---------------- WORKSPACE INVITATIONS ---------------- */
export const workspaceInvitationsRelations = relations(
  workspaceInvitationsTable,
  ({ one }) => ({
    workspace: one(workspacesTable, {
      fields: [workspaceInvitationsTable.workspaceId],
      references: [workspacesTable.id],
    }),

    inviter: one(usersTable, {
      fields: [workspaceInvitationsTable.invitedBy],
      references: [usersTable.id],
    }),
  }),
);

/* ---------------- FOLDERS ---------------- */
export const foldersRelations = relations(foldersTable, ({ one, many }) => ({
  workspace: one(workspacesTable, {
    fields: [foldersTable.workspaceId],
    references: [workspacesTable.id],
  }),
  notes: many(notesTable),
}));
