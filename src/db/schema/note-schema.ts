import {
  pgTable,
  uuid,
  text,
  varchar,
  integer,
  index,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user as usersTable } from "./auth-schema";
import { foldersTable, workspacesTable } from "./workspace-schema";
import { createdAt, updatedAt } from "./db-schema-helper";

/* =========================================================
   NOTES
========================================================= */
export const notesTable = pgTable(
  "notes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspacesTable.id, {
        onDelete: "cascade",
      }),
    folderId: uuid("folder_id").references(() => foldersTable.id, {
      onDelete: "set null",
    }),
    authorId: text("author_id")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    lastEditedBy: text("last_edited_by").references(() => usersTable.id),
    title: varchar("title", {
      length: 255,
    }).notNull(),
    content: text("content"),
    // content: jsonb("content").$type<Record<string, unknown>>().notNull(),
    status: varchar("status", {
      length: 50,
    })
      .$type<"active" | "archived">()
      .default("active")
      .notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    createdAt,
    updatedAt,
  },
  (table) => [
    index("notes_workspace_idx").on(table.workspaceId),
    index("notes_folder_idx").on(table.folderId),
    index("notes_author_idx").on(table.authorId),
  ],
);

/* =========================================================
   NOTE VERSIONS
========================================================= */
export const noteVersionsTable = pgTable(
  "note_versions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    noteId: uuid("note_id")
      .notNull()
      .references(() => notesTable.id, {
        onDelete: "cascade",
      }),
    editedBy: text("edited_by")
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    title: varchar("title", {
      length: 255,
    }).notNull(),
    content: text("content"),
    version: integer("version").notNull(),
    createdAt,
  },
  (table) => [
    index("note_versions_note_id_idx").on(table.noteId),
    index("note_versions_created_at_idx").on(table.createdAt),
    index("note_versions_edited_by_idx").on(table.editedBy),
  ],
);

/* ---------------- NOTES ---------------- */
export const notesRelations = relations(notesTable, ({ one, many }) => ({
  workspace: one(workspacesTable, {
    fields: [notesTable.workspaceId],
    references: [workspacesTable.id],
  }),
  folder: one(foldersTable, {
    fields: [notesTable.folderId],
    references: [foldersTable.id],
  }),
  author: one(usersTable, {
    fields: [notesTable.authorId],
    references: [usersTable.id],
  }),
  versions: many(noteVersionsTable),
}));

/* ---------------- NOTE VERSIONS ---------------- */
export const noteVersionsRelations = relations(
  noteVersionsTable,
  ({ one }) => ({
    note: one(notesTable, {
      fields: [noteVersionsTable.noteId],
      references: [notesTable.id],
    }),

    editor: one(usersTable, {
      fields: [noteVersionsTable.editedBy],
      references: [usersTable.id],
    }),
  }),
);
