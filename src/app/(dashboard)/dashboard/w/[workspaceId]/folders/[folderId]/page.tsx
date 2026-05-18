import Link from "next/link";
import {
  Folder,
  FileText,
  Plus,
  Sparkles,
  Clock3,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";

const notes = [
  {
    id: "1",
    title: "Product Roadmap Q1",
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "AI Feature Ideas",
    updatedAt: "5 hours ago",
  },
  {
    id: "3",
    title: "User Feedback Summary",
    updatedAt: "1 day ago",
  },
  {
    id: "4",
    title: "Launch Checklist",
    updatedAt: "2 days ago",
  },
];

export default function FolderPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[140px]" />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
              <Folder className="h-4 w-4 text-violet-400" />
              Folder View
            </div>

            <h1 className="text-4xl font-black md:text-5xl">Product Folder</h1>

            <p className="mt-4 text-lg text-zinc-400">
              All notes inside this folder.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500">
            <Plus className="h-5 w-5" />
            New Note
          </button>
        </div>

        {/* Notes */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note) => (
            <NoteCard key={note.id} {...note} />
          ))}
        </div>
      </div>
    </main>
  );
}

function NoteCard({
  id,
  title,
  updatedAt,
}: {
  id: string;
  title: string;
  updatedAt: string;
}) {
  return (
    <Link
      href={`/workspace/1/note/${id}`}
      className="group rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:bg-white/10"
    >
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-violet-500/10 p-3">
          <FileText className="h-6 w-6 text-violet-400" />
        </div>

        <MoreHorizontal className="h-5 w-5 text-zinc-500" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">{title}</h2>

      <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <Clock3 className="h-4 w-4 text-violet-400" />
          {updatedAt}
        </div>

        <ArrowRight className="h-4 w-4 text-zinc-500 transition group-hover:text-white" />
      </div>
    </Link>
  );
}
