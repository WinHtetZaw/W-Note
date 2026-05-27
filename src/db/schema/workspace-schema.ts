import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user as usersTable } from "./auth-schema";
import { notesTable } from "./note-schema";
import {
  aiUsageTable,
  createdAt,
  subscriptionsTable,
  updatedAt,
} from "./user-schema";

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
      .$type<"pending" | "accepted" | "declined">()
      .notNull()
      .default("pending"),

    token: text("token").notNull(),

    expiresAt: timestamp("expires_at", {
      withTimezone: true,
    }).notNull(),

    createdAt,
  },
  (table) => [
    index("workspace_invites_workspace_idx").on(table.workspaceId),

    index("workspace_invites_email_idx").on(table.email),

    index("workspace_invites_token_idx").on(table.token),
  ],
);

/* =========================================================
   FOLDERS
========================================================= */

export const foldersTable = pgTable("folders", {
  id: uuid("id").defaultRandom().primaryKey(),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspacesTable.id, {
      onDelete: "cascade",
    }),
  name: varchar("name", {
    length: 255,
  }).notNull(),
  // createdBy: text("created_by")
  //   .notNull()
  //   .references(() => usersTable.id, {
  //     onDelete: "cascade",
  //   }),
  createdAt,
  updatedAt,
});

export type Folders = typeof foldersTable.$inferSelect;

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
