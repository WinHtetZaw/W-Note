import Link from "next/link";
import { FolderNotesView } from "../server/queries/get-folders-with-notes";
import { ArrowRight, FileText, Folder } from "lucide-react";
import { pluralize, timeAgo } from "@/lib/utils";

export default function FolderCard({ folder }: { folder: FolderNotesView }) {
  return (
    <Link href={`folders/${folder.id}`} className="group p-8 card">
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-violet-500/10 p-3">
          <Folder className="size-6 text-icon" />
        </div>

        <ArrowRight className="size-5 text-zinc-500 transition group-hover:text-foreground" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">{folder.name}</h2>

      <div className="mt-6 flex items-center justify-between text-sm text-muted">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-icon" />
          {pluralize(folder.notes.length, "note")}
        </div>

        <span>{timeAgo(folder.updatedAt)}</span>
      </div>
    </Link>
  );
}
