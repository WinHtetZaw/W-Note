import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import RecentNotesList, { RecentNotesListLoading } from "./recent-notes-lits";

type Props = {
  params: Promise<{ workspaceId: string }>;
  className?: string;
};

export default async function RecentNotes({ params, className }: Props) {
  const { workspaceId } = await params;

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

      <Suspense fallback={<RecentNotesListLoading />}>
        <RecentNotesList workspaceId={workspaceId} />
      </Suspense>
    </div>
  );
}
