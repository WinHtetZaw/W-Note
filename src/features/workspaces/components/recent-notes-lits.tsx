import { Button } from "@/components/ui/button";
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

  if (errorCode)
    return (
      <p className="mt-8 text-muted text-center">Something wrong. Try again.</p>
    );

  return (
    <div className="mt-8 space-y-4">
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
