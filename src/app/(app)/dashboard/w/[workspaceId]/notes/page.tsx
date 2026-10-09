import PageHead from "@/components/dashboard/page-head";
import CardSkeletonList from "@/components/ui/card-skeleton-list";
import InputSearch from "@/components/ui/input-search";
import MainLoading from "@/components/ui/main-loading";
import CreateNoteButton from "@/features/notes/components/create-note-button";
import NotesList from "@/features/notes/components/notes-list";
import { Suspense } from "react";

type Props = {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ q: string }>;
};

export default async function NotesPage(props: Props) {
  return (
    <Suspense fallback={<MainLoading />}>
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
        title="Workspace Notes"
        subTitle="Manage and organize your AI-enhanced notes."
      >
        <CreateNoteButton workspaceId={workspaceId} className="w-fit" />
      </PageHead>
      <InputSearch />
      <Suspense fallback={<CardSkeletonList />}>
        <NotesList {...props} />
      </Suspense>
    </>
  );
}
