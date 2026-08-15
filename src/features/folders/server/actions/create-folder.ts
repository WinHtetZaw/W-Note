"use server";

import { CreateFolderInput } from "../../schemas/create-folder-schema";
import { createFolderService } from "../../services/create-folder-service";
import { revalidateTag, updateTag } from "next/cache";
import { cacheTags } from "@/lib/cache/tags";
import { redirect } from "next/navigation";

export async function createFolder(input: CreateFolderInput) {
  const [error, folder] = await createFolderService(input);

  if (error == null) {
    // revalidateTag(cacheTags.workspaceFolders(folder.workspaceId), "max");
    updateTag("folders");
    return { success: true, data: folder };
  }

  const reason = error.reason;
  switch (reason) {
    case "Invalid data":
      return { message: "Invalid data", details: error.details };
    case "Unauthenticated":
      redirect("/sign-in");
    case "Forbidden":
      return redirect("/forbidden");
    case "Unexpected":
      return { message: "Unexpected error" };
    default:
      throw new Error(`Unhandled error: ${reason satisfies never}`);
  }
}
