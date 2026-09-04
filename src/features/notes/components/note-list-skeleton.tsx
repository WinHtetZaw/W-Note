import { NoteCardSkeleton } from "./note-card-skeleton";

export default function NoteListSkeleton() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <NoteCardSkeleton />
      <NoteCardSkeleton />
      <NoteCardSkeleton />
    </div>
  );
}
