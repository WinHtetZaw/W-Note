import Link from "next/link";
import {
  Folder,
  Plus,
  Sparkles,
  FileText,
  ArrowRight,
  Search,
} from "lucide-react";

const folders = [
  {
    id: "1",
    name: "Product",
    notes: 24,
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Marketing",
    notes: 18,
    updatedAt: "1 day ago",
  },
  {
    id: "3",
    name: "Engineering",
    notes: 32,
    updatedAt: "3 hours ago",
  },
  {
    id: "4",
    name: "Meetings",
    notes: 12,
    updatedAt: "5 hours ago",
  },
];

export default function FoldersPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Glow */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-violet-400" />
              Organize Your Knowledge
            </div>

            <h1 className="text-4xl font-black md:text-5xl">Folders</h1>

            <p className="mt-4 text-lg text-zinc-400">
              Structure and organize your workspace notes.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500">
            <Plus className="h-5 w-5" />
            New Folder
          </button>
        </div>

        {/* Search */}
        <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
          <Search className="h-5 w-5 text-zinc-500" />

          <input
            placeholder="Search folders..."
            className="w-full bg-transparent outline-none placeholder:text-zinc-500"
          />
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {folders.map((folder) => (
            <FolderCard key={folder.id} {...folder} />
          ))}
        </div>
      </div>
    </main>
  );
}

function FolderCard({
  id,
  name,
  notes,
  updatedAt,
}: {
  id: string;
  name: string;
  notes: number;
  updatedAt: string;
}) {
  return (
    <Link
      href={`/workspace/1/folders/${id}`}
      className="group rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition hover:bg-white/10"
    >
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-violet-500/10 p-3">
          <Folder className="h-6 w-6 text-violet-400" />
        </div>

        <ArrowRight className="h-5 w-5 text-zinc-500 transition group-hover:text-white" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">{name}</h2>

      <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-violet-400" />
          {notes} notes
        </div>

        <span>{updatedAt}</span>
      </div>
    </Link>
  );
}
