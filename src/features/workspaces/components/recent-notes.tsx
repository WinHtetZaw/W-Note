import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Suspense } from "react";
import RecentNotesList, { RecentNotesListLoading } from "./recent-notes-lits";

type Props = {
  params: Promise<{ workspaceId: string }>;
  className?: string;
};

export default async function RecentNotes({ params, className }: Props) {
  const { workspaceId } = await params;

  return (
    <div className={cn("p-6 lg:p-8 glass rounded-4xl", className)}>
      <h2 className="text-2xl font-bold">Recent Notes</h2>

      <Suspense fallback={<RecentNotesListLoading />}>
        <RecentNotesList workspaceId={workspaceId} />
      </Suspense>
    </div>
  );
}
