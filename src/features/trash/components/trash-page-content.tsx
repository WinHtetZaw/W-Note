// features/trash/components/trash-page.tsx

import { Trash, Trash2 } from "lucide-react";
import { getTrashedNotes } from "../server/queries/get-trash-notes";
import { EmptyTrashDialog } from "./empty-trash-dialog";
import { TrashNoteCard } from "./trash-note-card";
import { EmptyTrash } from "./empty-trash";
import PageHead from "@/components/dashboard/page-head";

type TrashNote = {
  id: string;
  title: string;
  deletedAt: Date | null;
};

// type TrashPageProps = {
//   workspaceId: string;
//   notes: TrashNote[];
// };

type TrashPageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export async function TrashPageContent({ params }: TrashPageProps) {
  const { workspaceId } = await params;

  const notes = await getTrashedNotes({ workspaceId });
  const hasNotes = notes.length > 0;

  return (
    <div className="space-y-8">
      <PageHead
        pageLabel="Trash"
        labelIcon={Trash}
        title="Recently deleted"
        subTitle="Restore deleted notes or permanently remove them."
      >
        {hasNotes && (
          <EmptyTrashDialog
            workspaceId={workspaceId}
            noteCount={notes.length}
          />
        )}
      </PageHead>

      {/* Content */}
      {hasNotes ? (
        <div className="grid gap-3">
          {notes.map((note) => (
            <TrashNoteCard
              key={note.id}
              workspaceId={workspaceId}
              note={note}
            />
          ))}
        </div>
      ) : (
        <EmptyTrash />
      )}
    </div>
  );
}
