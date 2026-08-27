import { db } from "@/db";

type CheckingFolderExist = {
  workspaceId: string;
  folderId: string;
};

export const checkingFolderExist = (data: CheckingFolderExist) => {
  return db.query.foldersTable.findFirst({
    where: (table, { and, eq }) =>
      and(eq(table.id, data.folderId), eq(table.workspaceId, data.workspaceId)),
    columns: {
      id: true,
    },
  });
};
