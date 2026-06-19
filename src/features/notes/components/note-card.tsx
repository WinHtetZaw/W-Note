import { Clock3, FileText, FolderTree, MoreHorizontal } from "lucide-react";
import React from "react";
import { Note } from "../server/queries/get-note";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import { Notes } from "../server/queries/get-notes";

export default function NoteCard(props: Notes[0]) {
  const { id, title, content, updatedAt } = props;
  return (
    <Link
      href={`notes/${id}`}
      className="group flex flex-col rounded-[28px] border border-white/10 bg-white/5 p-6 text-left backdrop-blur-2xl transition hover:bg-white/10"
    >
      <div className="flex items-start justify-between">
        <div className="rounded-2xl bg-violet-500/10 p-3">
          <FileText className="h-6 w-6 text-violet-400" />
        </div>

        <button className="opacity-0 transition group-hover:opacity-100">
          <MoreHorizontal className="h-5 w-5 text-zinc-500" />
        </button>
      </div>

      <div className="mt-6 mb-auto">
        <h2 className="text-2xl font-bold line-clamp-1">{title}</h2>

        <p className="mt-4 line-clamp-3 leading-7 text-zinc-400">{content}</p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
          <FolderTree className="h-4 w-4 text-violet-400" />

          {"category"}
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Clock3 className="h-4 w-4" />

          {timeAgo(updatedAt)}
        </div>
      </div>
    </Link>
  );
}
