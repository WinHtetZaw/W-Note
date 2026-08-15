"use server";

import { redirect } from "next/navigation";
import { foldersNotesService } from "../../services/folders-notes-service";

export async function listFoldersWithNotes(workspaceId: string) {
  const [error, folders] = await foldersNotesService(workspaceId);

  if (error == null) {
    return { data: folders };
  }

  const reason = error.reason;
  switch (reason) {
    case "Invalid data":
      return { message: "Invalid data", details: error.details };
    case "Unauthenticated":
      redirect("/sign-in");
    case "NotFound":
      return redirect("/unauthorized");
    case "Unexpected":
      return { message: "Unexpected error" };
    default:
      throw new Error(`Unhandled error: ${reason satisfies never}`);
  }
}
