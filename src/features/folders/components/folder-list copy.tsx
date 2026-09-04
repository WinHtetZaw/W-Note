"use client";

import Link from "next/link";
import { ArrowRight, FileText, Folder } from "lucide-react";
import { pluralize, timeAgo } from "@/lib/utils";
import { useFolders } from "../hooks/use-folders";

export default function FoldersList({ workspaceId }: { workspaceId: string }) {
  const { data, isPending } = useFolders(workspaceId);
  if (isPending) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((folder) => (
          <Link
            key={folder.id}
            href={`folders/${folder.id}`}
            className="group rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-violet-500/10 p-3">
                <Folder className="h-6 w-6 text-violet-400" />
              </div>

              <ArrowRight className="h-5 w-5 text-zinc-500 transition group-hover:text-white" />
            </div>

            <h2 className="mt-6 text-2xl font-bold">{folder.name}</h2>

            <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-violet-400" />
                {pluralize(folder.notes.length, "note")}
              </div>

              <span>{timeAgo(folder.updatedAt)}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
