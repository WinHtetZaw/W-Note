import { Folder } from "lucide-react";
import FolderActionsMenu from "@/features/folders/components/folder-actions-menu";
import PageHead from "@/components/dashboard/page-head";
import { Suspense } from "react";
import CreateNoteButton from "@/features/notes/components/create-note-button";
import FolderNotesList from "@/features/folders/components/folder-notes-list";
import { fetchFolderNotes } from "@/features/folders/server/actions/fetch-folder-notes";
import MainLoading from "@/components/ui/main-loading";

type Props = {
  params: Promise<{ workspaceId: string; folderId: string }>;
  searchParams: Promise<{ q: string }>;
};

export default async function FolderPage({ params, searchParams }: Props) {
  return (
    <Suspense fallback={<MainLoading />}>
      <FolderDetailContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function FolderDetailContent({ params, searchParams }: Props) {
  const { workspaceId, folderId } = await params;
  const { q } = await searchParams;

  const result = await fetchFolderNotes({ workspaceId, folderId, q });

  if (result.code) {
    throw new Error("Fail to fetch folders.");
  }

  return (
    <>
      <PageHead
        pageLabel="Folder View"
        labelIcon={Folder}
        title="Product Folder"
        subTitle=" All notes inside this folder."
      >
        <div className="flex gap-3">
          <CreateNoteButton workspaceId={workspaceId} folderId={folderId} />
          <FolderActionsMenu />
        </div>
      </PageHead>

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
