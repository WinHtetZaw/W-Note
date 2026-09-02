import { wait } from "@/lib/utils";
import { fetchNotes } from "../server/actions/fetch-notes";
import { Notes } from "../server/queries/get-notes";
import NoteCard from "./note-card";
import { Clock3, FileText, FolderTree } from "lucide-react";
import { NoteCardSkeleton } from "./note-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

// type Props = {
//   notes: Notes;
//   query?: string;
// };

type Props = {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ q: string }>;
};

export default async function NotesList(props: Props) {
  await wait(7000);
  const { params, searchParams } = props;
  // const { notes, query } = props;

  const { workspaceId } = await params;
  const { q } = await searchParams;

  const result = await fetchNotes({ workspaceId, q });

  if (result.code) {
    return <p>Notes not found</p>;
  }

  const notes = result.data;

  if (notes.length === 0) {
    return <EmptyState query={q} />;
  }
  return (
    <>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="group relative overflow-hidden flex flex-col p-6 card">
          <div className="flex items-start justify-between">
            <div className="rounded-xl bg-icon/10 p-3">
              <FileText className="size-6 text-icon" />
            </div>
            <Skeleton className="size-10 rounded-full" />
          </div>

          <div className="mt-6 mb-auto">
            <Skeleton className="h-10 w-[20%] block rounded-lg" />
            {/* <p className="mt-4 line-clamp-3 leading-7 text-muted">{}</p> */}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-sm">
              <FolderTree className="size-4 text-icon" />
              {"folder"}
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-500">
              <Clock3 className="size-4" />
            </div>
          </div>
        </div>
        <NoteCardSkeleton />
        {notes.map((note) => (
          <NoteCard {...note} key={note.id} />
        ))}
      </div>
    </>
  );
}

function EmptyState({ query }: { query?: string }) {
  if (query) {
    return <div>No notes found for "{query}"</div>;
  }

  return <div>No notes yet</div>;
}
