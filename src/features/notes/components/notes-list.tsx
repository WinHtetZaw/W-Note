import { errorMessages } from "@/lib/errors";
import { fetchNotes } from "../server/actions/fetch-notes";
import NoteCard from "./note-card";

type Props = {
  params: Promise<{ workspaceId: string }>;

  searchParams: Promise<{ q: string }>;
};

export default async function NotesList(props: Props) {
  const { params, searchParams } = props;

  const { workspaceId } = await params;

  const { q } = await searchParams;

  const result = await fetchNotes({ workspaceId, q });

  if (result.code) throw new Error(errorMessages[result.code]);

  const notes = result.data;

  if (notes.length === 0) return <EmptyNotes query={q} />;

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard {...note} key={note.id} />
      ))}
    </div>
  );
}

function EmptyNotes({ query }: { query?: string }) {
  if (query) {
    return (
      <div className="mt-8 text-muted text-center">
        No notes found for "{query}". Try others
      </div>
    );
  }

  return <div className="mt-8 text-muted text-center">No notes yet.</div>;
}
