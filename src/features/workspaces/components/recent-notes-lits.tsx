import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchNotes } from "@/features/notes/server/actions/fetch-notes";
import { FileText } from "lucide-react";
import Link from "next/link";

type Props = {
  workspaceId: string;
};

export default async function RecentNotesList({ workspaceId }: Props) {
  const { code: errorCode, data: notes } = await fetchNotes({
    workspaceId,
    limit: 3,
  });

  if (errorCode) {
    return (
      <p className="mt-8 text-center text-sm text-muted">
        Something went wrong. Try again.
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {notes.length === 0 ? (
        <EmptyState
          title=" No Notes yet."
          description=" Create a new note to get started."
          className="mt-8"
        />
      ) : (
        <>
          {notes.map((note) => (
            <Button
              key={note.id}
              asChild
              variant={"outline"}
              className="flex w-full items-center justify-between"
            >
              <Link href={`/dashboard/w/${workspaceId}/notes/${note.id}`}>
                <span className="font-medium truncate flex-1">
                  {note.title}
                </span>

                <FileText className="size-4 icon" />
              </Link>
            </Button>
          ))}
        </>
      )}
    </div>
  );
}

export function RecentNotesListLoading() {
  return (
    <div className="mt-8 space-y-4">
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}
