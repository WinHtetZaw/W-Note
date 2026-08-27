"use client";

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/cache/keys";
import { fetchWorkspace } from "../server/actions/fetch-workspace";
import { authClient } from "@/lib/auth-client";

async function getWorkspace(workspaceId: string) {
  const res = await fetchWorkspace(workspaceId);
  if (!res.data) {
    throw new Error("Fail to fetch workspace.");
  }
  return res.data;
}

export function useCurrentWorkdspace(workspaceId: string) {
  const { data: session } = authClient.useSession();

  if (!session) {
    throw new Error("Unauthenticated");
  }

  const userId = session.user.id;

  return useQuery({
    queryKey: ["queryKeys.workspaces"],
    queryFn: () => getWorkspace(workspaceId),
  });
}
