import WorkspaceDetailActions from "@/features/workspaces/components/workspace-detail-actions";
import { Suspense } from "react";
import PageHead from "@/components/dashboard/page-head";
import RecentNotes from "@/features/workspaces/components/recent-notes";
import WorkspaceStats from "@/features/workspaces/components/wokspace-stats";
import CreateNoteButton from "@/features/notes/components/create-note-button";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function WorkspaceDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<p>workspace detail content loading</p>}>
      <WorkspaceDetailContent params={params} />
    </Suspense>
  );
}

async function WorkspaceDetailContent({ params }: Props) {
  const { workspaceId } = await params;

  return (
    <>
      <PageHead
        pageLabel="Workspace Overview"
        title="Startup Team"
        subTitle="Manage your team, notes, and AI workflows."
        link={<PageHeadLink workspaceId={workspaceId} />}
      />

      <Suspense fallback={<p>workspace stats loading</p>}>
        <WorkspaceStats params={params} />
      </Suspense>

      <Suspense fallback={<>recent notes loading</>}>
        <RecentNotes params={params} className="mb-10" />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-3">
        <QuickAction label="Manage Members" />
        <QuickAction label="Workspace Settings" />
        <QuickAction label="AI Usage Analytics" />
      </div>
    </>
  );
}

function PageHeadLink({ workspaceId }: { workspaceId: string }) {
  return (
    <div className="flex gap-3">
      <CreateNoteButton workspaceId={workspaceId} />
      <Suspense fallback={<p>workspace detail actions loading</p>}>
        <WorkspaceDetailActions />
      </Suspense>
    </div>
  );
}

function QuickAction({ label }: { label: string }) {
  return (
    <button className="p-6 glass rounded-3xl cursor-pointer hover:bg-white/10">
      <h3 className="font-semibold">{label}</h3>

      <p className="mt-2 text-sm text-muted">Manage and configure</p>
    </button>
  );
}
