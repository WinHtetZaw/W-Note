import { Suspense } from "react";
import PageHead from "@/components/dashboard/page-head";
import RecentNotes from "@/features/workspaces/components/recent-notes";
import WorkspaceStats, {
  WorkspaceStatsLoading,
} from "@/features/workspaces/components/wokspace-stats";
import CreateNoteButton from "@/features/notes/components/create-note-button";
import MainLoading from "@/components/ui/main-loading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function WorkspaceDetailPage({ params }: Props) {
  return (
    <Suspense fallback={<MainLoading />}>
      <WorkspaceDetailContent params={params} />
    </Suspense>
  );
}

async function WorkspaceDetailContent({ params }: Props) {
  const { workspaceId } = await params;

  return (
    <div className="space-y-6">
      <PageHead
        pageLabel="Workspace Overview"
        title="Startup Team"
        subTitle="Manage your team, notes, and AI workflows."
        className="mb-12"
      >
        <PageHeadLink workspaceId={workspaceId} />
      </PageHead>

      <Suspense fallback={<WorkspaceStatsLoading />}>
        <WorkspaceStats workspaceId={workspaceId} />
      </Suspense>

      <RecentNotes params={params} />

      <div className="grid gap-6 md:grid-cols-3">
        <QuickAction
          label="Manage Members"
          link={`/dashboard/w/${workspaceId}/members`}
        />
        <QuickAction
          label="Workspace Settings"
          link={`/dashboard/w/${workspaceId}/settings`}
        />
        {/* <QuickAction label="AI Usage Analytics" /> */}
        <QuickAction
          label="Billing"
          link={`/dashboard/w/${workspaceId}/billing`}
        />
      </div>
    </div>
  );
}

function PageHeadLink({ workspaceId }: { workspaceId: string }) {
  return (
    <div className="flex gap-3">
      <CreateNoteButton workspaceId={workspaceId} />
      {/* <Suspense fallback={<p>workspace detail actions loading</p>}>
        <WorkspaceDetailActions />
      </Suspense> */}
    </div>
  );
}

function QuickAction({ label, link }: { label: string; link: string }) {
  return (
    <>
      {/* <button className="p-6 glass rounded-3xl cursor-pointer hover:bg-white/10">
        <h3 className="font-semibold">{label}</h3>

        <p className="mt-2 text-sm text-muted">Manage and configure</p>
      </button> */}
      <Button
        variant="outline"
        asChild
        className="p-6 h-auto flex flex-col gap-2 glass rounded-3xl cursor-pointer hover:bg-white/10"
      >
        <Link href={link}>
          <h3 className="font-semibold">{label}</h3>

          <p className="text-sm text-muted">Manage and configure</p>
        </Link>
      </Button>
    </>
  );
}
