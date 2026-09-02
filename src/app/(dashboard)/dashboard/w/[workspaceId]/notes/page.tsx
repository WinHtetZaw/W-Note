import PageHead from "@/components/dashboard/page-head";
import InputSearch from "@/components/ui/input-search";
import MainLoaing from "@/components/ui/main-loaing";
import NoteCreateButton from "@/components/ui/note-create-button";
import CreateNoteButton from "@/features/notes/components/create-note-button";
import NotesList from "@/features/notes/components/notes-list";
import { fetchNotes } from "@/features/notes/server/actions/fetch-notes";
import { Suspense } from "react";

type Props = {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ q: string }>;
};

export default async function NotesPage(props: Props) {
  return (
    <Suspense fallback={<MainLoaing />}>
      <NotesContent {...props} />
    </Suspense>
  );
}

async function NotesContent(props: Props) {
  const { workspaceId } = await props.params;
  // const { q } = await searchParams;

  // const result = await fetchNotes({ workspaceId });

  // if (result.code) {
  //   return <p>Notes not found</p>;
  // }

  return (
    <>
      <PageHead
        pageLabel="AI Powered Notes"
        title="Notes Workspace"
        subTitle="Manage and organize your AI-enhanced notes."
        link={<CreateNoteButton workspaceId={workspaceId} />}
      />
      {/* <NotesSearchBar /> */}
      <InputSearch />
      <Suspense fallback={<p>notes loaing</p>}>
        <NotesList {...props} />
      </Suspense>
    </>
  );
}
