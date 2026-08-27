import NoteActions from "@/features/notes/components/note-actions";
import { FolderNote } from "@/features/notes/server/queries/get-folder-notes";
import { NoteView } from "@/lib/types";
import { timeAgo } from "@/lib/utils";
import { ArrowRight, Clock3, FileText } from "lucide-react";
import Link from "next/link";

export default function FolderNotesList({ notes }: { notes: NoteView[] }) {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} {...note} />
      ))}
    </div>
  );
}

function NoteCard(note: NoteView) {
  const { id, title, updatedAt, workspaceId } = note;

  return (
    <div className="group relative overflow-hidden p-6 card">
      <Link
        className="absolute inset-0 bg-transparent"
        href={`/dashboard/w/${workspaceId}/notes/${id}`}
      />
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-violet-500/10 p-3">
          <FileText className="size-6 text-icon" />
        </div>

        <NoteActions noteId={id} workspaceId={workspaceId} />
      </div>

      <h2 className="mt-6 text-2xl font-bold">{title}</h2>

      <div className="mt-6 flex items-center justify-between text-sm text-muted">
        <div className="flex items-center gap-2">
          <Clock3 className="size-4 text-icon" />
          {timeAgo(updatedAt)}
        </div>

        <ArrowRight className="size-4 text-muted transition group-hover:text-zinc-200" />
      </div>
    </div>
  );
}
