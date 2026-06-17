import PageHead from "@/components/dashboard/page-head";
import NoteCreateButton from "@/components/ui/note-create-button";
import { fetchNotes } from "@/features/notes/server/actions/fetch-notes";
import {
  Search,
  FileText,
  Clock3,
  MoreHorizontal,
  FolderTree,
} from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const notes2 = [
  {
    title: "AI SaaS Product Roadmap",
    description: "Planning features, onboarding flow, and pricing strategy.",
    updatedAt: "2 hours ago",
    category: "Product",
  },

  {
    title: "Meeting Summary",
    description: "AI generated summary from weekly team meeting.",
    updatedAt: "5 hours ago",
    category: "Meetings",
  },

  {
    title: "Next.js Architecture",
    description: "Feature-based architecture and reusable UI planning.",
    updatedAt: "1 day ago",
    category: "Development",
  },

  {
    title: "Marketing Strategy",
    description: "Q3 campaign planning and SEO optimization 2.",
    updatedAt: "2 days ago",
    category: "Marketing",
  },
];

type Props = { params: Promise<{ workspaceId: string }> };

export default async function NotesPage({ params }: Props) {
  const { workspaceId } = await params;
  const notes = await fetchNotes(workspaceId);
  return (
    <>
      <PageHead
        pageLabel="AI Powered Notes"
        title="Notes Workspace"
        subTitle="Manage and organize your AI-enhanced notes."
        link={<NoteCreateButton workspaceId={workspaceId} />}
      />

      {/* Search */}
      <div className="mt-10 flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
          <Search className="h-5 w-5 text-zinc-500" />

          <input
            placeholder="Search notes..."
            className="w-full bg-transparent outline-none placeholder:text-zinc-500"
          />
        </div>

        <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10">
          All Notes
        </button>

        <button className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 transition hover:bg-white/10">
          Recent
        </button>
      </div>

      {/* Notes Grid */}
      <Suspense
        fallback={
          <div className="mt-10 text-center text-zinc-500">
            Loading notes...
          </div>
        }
      >
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {notes2.map((note) => (
            <NoteCard key={note.title} {...note} />
          ))}
          {notes.data?.map((note) => (
            <Link href={`notes/${note.id}`} key={note.id}>
              {note.title}
            </Link>
          ))}
        </div>
      </Suspense>
    </>
  );
}

function NoteCard({
  title,
  description,
  updatedAt,
  category,
}: {
  title: string;
  description: string;
  updatedAt: string;
  category: string;
}) {
  return (
    <div className="group rounded-[28px] border border-white/10 bg-white/5 p-6 text-left backdrop-blur-2xl transition hover:bg-white/10">
      <div className="flex items-start justify-between">
        <div className="rounded-2xl bg-violet-500/10 p-3">
          <FileText className="h-6 w-6 text-violet-400" />
        </div>

        <button className="opacity-0 transition group-hover:opacity-100">
          <MoreHorizontal className="h-5 w-5 text-zinc-500" />
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="mt-4 line-clamp-3 leading-7 text-zinc-400">
          {description}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm">
          <FolderTree className="h-4 w-4 text-violet-400" />

          {category}
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Clock3 className="h-4 w-4" />

          {updatedAt}
        </div>
      </div>
    </div>
  );
}
