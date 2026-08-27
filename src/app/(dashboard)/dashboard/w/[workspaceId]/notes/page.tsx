import PageHead from "@/components/dashboard/page-head";
import InputSearch from "@/components/ui/input-search";
import NoteCreateButton from "@/components/ui/note-create-button";
import NotesList from "@/features/notes/components/notes-list";
import { fetchNotes } from "@/features/notes/server/actions/fetch-notes";
import { Suspense } from "react";

type Props = {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ q: string }>;
};

export default async function NotesPage(props: Props) {
  return (
    <Suspense fallback={<p>Loading notes...</p>}>
      <NotesContent {...props} />
    </Suspense>
  );
}

async function NotesContent({ params, searchParams }: Props) {
  const { workspaceId } = await params;
  const { q } = await searchParams;

  const result = await fetchNotes({ workspaceId });

  if (!result.data) {
    return <p>Notes not found</p>;
  }

  return (
    <>
      <PageHead
        pageLabel="AI Powered Notes"
        title="Notes Workspace"
        subTitle="Manage and organize your AI-enhanced notes."
        link={<NoteCreateButton workspaceId={workspaceId} />}
      />
      {/* <NotesSearchBar /> */}
      <InputSearch />
      <NotesList notes={result.data} query={q} />
    </>
  );
}
