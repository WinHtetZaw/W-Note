import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchNotes } from "@/features/notes/server/actions/fetch-notes";
import { FileText, Plus } from "lucide-react";
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
        <RecentNotesEmpty />
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
                <span className="font-medium">{note.title}</span>

                <FileText className="size-4 icon" />
              </Link>
            </Button>
          ))}
        </>
      )}
    </div>
  );
}

function RecentNotesEmpty() {
  return (
    <div className="mt-8 flex flex-col items-center justify-center text-center">
      <div className="flex items-center gap-2 mb-4">
        <div className="flex size-10 items-center justify-center rounded-xl bg-muted/50">
          <FileText className="size-5 text-muted-foreground" />
        </div>
        <h3 className="font-medium">No notes yet</h3>
      </div>
      <p className="mt-1 max-w-xs text-sm text-muted">
        Create your first note and start capturing your ideas.
      </p>
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
