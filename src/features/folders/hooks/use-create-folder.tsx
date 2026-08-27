"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/cache/keys";
import { createFolder } from "../server/actions/create-folder";
import { CreateFolderInput } from "../schemas";

// async function create(data: CreateFolderInput) {
//   const res = await createFolder(data);
//   if (!res.success) {
//     throw new Error("Fail to create folder");
//   }

//   return res.data;
// }

export function useCreateFolder(workspaceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFolder,

    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({
        queryKey: queryKeys.workspaces.folders(workspaceId),
      });
    },
  });
}
