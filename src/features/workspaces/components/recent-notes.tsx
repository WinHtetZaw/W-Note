import { Button } from "@/components/ui/button";
import { fetchNotes } from "@/features/notes/server/actions/fetch-notes";
import { cn } from "@/lib/utils";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ workspaceId: string }>;
  className: string;
};

export default async function RecentNotes({ params, className }: Props) {
  const { workspaceId } = await params;
  const result = await fetchNotes({ workspaceId, limit: 3 });

  if (!result.data) {
    // todo implement not found UI
    return <p>notes not found</p>;
  }

  return (
    <div className={cn("p-8 glass rounded-4xl", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Recent Notes</h2>

        <Link
          href={`/dashboard/w/${workspaceId}/notes`}
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          View all <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 space-y-4">
        {result.data.map((note) => (
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
    </div>
  );
}
