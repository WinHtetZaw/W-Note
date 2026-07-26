import { Clock3, FileText, FolderTree, MoreHorizontal } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";
import { Notes } from "../server/queries/get-notes";
import NoteActions from "./note-actions";

export default function NoteCard(props: Notes[0]) {
  const { id, title, content, updatedAt, workspaceId } = props;
  return (
    <div className="group relative overflow-hidden flex flex-col p-6 card">
      <Link href={`notes/${id}`} className="absolute inset-0" />
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-icon/10 p-3">
          <FileText className="size-6 text-icon" />
        </div>
        <NoteActions workspaceId={workspaceId} noteId={id} />
      </div>

      <div className="mt-6 mb-auto">
        <h2 className="text-2xl font-bold line-clamp-1 capitalize">{title}</h2>
        {/* <p className="mt-4 line-clamp-3 leading-7 text-muted">{}</p> */}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm">
          <FolderTree className="size-4 text-icon" />
          {"folder"}
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Clock3 className="size-4" />
          {timeAgo(updatedAt)}
        </div>
      </div>
    </div>
  );
}
