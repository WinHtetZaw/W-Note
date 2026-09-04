import PageHead from "@/components/dashboard/page-head";
import CardSkeletonList from "@/components/ui/card-skeleton-list";
import InputSearch from "@/components/ui/input-search";
import MainLoaing from "@/components/ui/main-loaing";
import CreateNoteButton from "@/features/notes/components/create-note-button";
import NotesList from "@/features/notes/components/notes-list";
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

  return (
    <>
      <PageHead
        pageLabel="AI Powered Notes"
        title="Notes Workspace"
        subTitle="Manage and organize your AI-enhanced notes."
        link={<CreateNoteButton workspaceId={workspaceId} />}
      />
      <InputSearch />
      <Suspense fallback={<CardSkeletonList />}>
        <NotesList {...props} />
      </Suspense>
    </>
  );
}
