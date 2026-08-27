"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/cache/keys";
import { fetchFoldersWithNotes } from "../server/actions/fetch-folders-notes";

async function getFolders(workspaceId: string) {
  const res = await fetchFoldersWithNotes({ workspaceId });
  if (!res.data) {
    throw new Error("Fail to fetch folders");
  }
  return res.data;
}

export function useFolders(workspaceId: string) {
  return useQuery({
    queryKey: queryKeys.workspaces.folders(workspaceId),
    queryFn: () => getFolders(workspaceId),
  });
}
