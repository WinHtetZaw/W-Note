import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchNotes } from "@/features/notes/server/actions/fetch-notes";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  workspaceId: string;
};

export default async function RecentNotesList({ workspaceId }: Props) {
  const { code: errorCode, data: notes } = await fetchNotes({
    workspaceId,
    limit: 3,
  });

  if (errorCode) {
    return notFound();
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
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
      {notes.length > 0 && (
        <Link
          href={`/dashboard/w/${workspaceId}/notes`}
          className="flex ml-auto items-center min-w-fit gap-2 text-sm text-muted hover:text-foreground"
        >
          View all <ArrowRight className="size-4" />
        </Link>
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
