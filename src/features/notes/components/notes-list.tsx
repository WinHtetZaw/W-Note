import { Notes } from "../server/queries/get-notes";
import NoteCard from "./note-card";

type Props = {
  notes: Notes;
  query?: string;
};

export default function NotesList(props: Props) {
  const { notes, query } = props;

  if (notes.length === 0) {
    return <EmptyState query={query} />;
  }
  return (
    <>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3 ">
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
