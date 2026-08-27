import Link from "next/link";
import {
  Folder,
  FileText,
  Plus,
  Clock3,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import FolderActionsMenu from "@/features/folders/components/folder-actions-menu";
import PageHead from "@/components/dashboard/page-head";
import NoteCreateButton from "@/components/ui/note-create-button";
import { Suspense } from "react";
import CreateNoteButton from "@/features/notes/components/create-note-button";
import FolderNotesList from "@/features/folders/components/folder-notes-list";
import { fetchFolderNotes } from "@/features/folders/server/actions/fetch-folder-notes";

const notes = [
  {
    id: "1",
    title: "Product Roadmap Q1",
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    title: "AI Feature Ideas",
    updatedAt: "5 hours ago",
  },
  {
    id: "3",
    title: "User Feedback Summary",
    updatedAt: "1 day ago",
  },
  {
    id: "4",
    title: "Launch Checklist",
    updatedAt: "2 days ago",
  },
];

// type Props = {
//   params: Promise<{ workspaceId: string; folderId: string }>;
// };

type Props = {
  params: Promise<{ workspaceId: string; folderId: string }>;
  // searchParams: Promise<{ q: string }>;
};

export default async function FolderPage({ params }: Props) {
  return (
    <Suspense fallback={<p>folder detail page loading...</p>}>
      <FolderDetailContent params={params} />
    </Suspense>
  );
}

async function FolderDetailContent({ params }: Props) {
  const { workspaceId, folderId } = await params;
  // const { q } = await searchParams;

  // const result = await fetchFolderNotes(workspaceId, folderId);
  const result = await fetchFolderNotes({ workspaceId, folderId });

  // const result = q
  //   ? await searchNotesAction(workspaceId, q)
  //   : await fetchNotes(workspaceId);

  if (!result.data) {
    return <p>Notes not found</p>;
  }

  return (
    <>
      <PageHead
        pageLabel="Folder View"
        labelIcon={<Folder className="size-4 text-icon" />}
        title="Product Folder"
        subTitle=" All notes inside this folder."
        link={
          <div className="flex gap-3">
            <CreateNoteButton workspaceId={workspaceId} folderId={folderId} />
            <Suspense fallback={<p>loading</p>}>
              <FolderActionsMenu />
            </Suspense>
          </div>
        }
      />

      {result.data.notes.length === 0 ? (
        <div className="mt-10 text-center text-muted">
          No notes found in this folder.
        </div>
      ) : (
        <FolderNotesList notes={result.data.notes} />
      )}
    </>
  );
}

// function NoteCard({
//   id,
//   title,
//   updatedAt,
// }: {
//   id: string;
//   title: string;
//   updatedAt: string;
// }) {
//   return (
//     <Link
//       href={`/workspace/1/note/${id}`}
//       className="group relative overflow-hidden p-6 card"
//     >
//       <div className="flex items-center justify-between">
//         <div className="rounded-2xl bg-violet-500/10 p-3">
//           <FileText className="h-6 w-6 text-violet-400" />
//         </div>

//         <MoreHorizontal className="h-5 w-5 text-zinc-500" />
//       </div>

//       <h2 className="mt-6 text-2xl font-bold">{title}</h2>

//       <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">
//         <div className="flex items-center gap-2">
//           <Clock3 className="h-4 w-4 text-violet-400" />
//           {updatedAt}
//         </div>

//         <ArrowRight className="h-4 w-4 text-zinc-500 transition group-hover:text-white" />
//       </div>
//     </Link>
//   );
// }
