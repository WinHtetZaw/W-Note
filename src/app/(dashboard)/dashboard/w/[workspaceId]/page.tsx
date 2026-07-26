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
        link={
          <div className="flex gap-3">
            <CreateNoteButton workspaceId={workspaceId} />
            <Suspense fallback={<p>workspace detail actions loading</p>}>
              <WorkspaceDetailActions />
            </Suspense>
          </div>
        }
      />

      <Suspense fallback={<p>workspace stats loading</p>}>
        <WorkspaceStats params={params} />
      </Suspense>

      <Suspense fallback={<>recent notes loading</>}>
        <RecentNotes params={params} className="mb-10" />
      </Suspense>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <QuickAction label="Manage Members" />
        <QuickAction label="Workspace Settings" />
        <QuickAction label="AI Usage Analytics" />
      </div>
    </>
  );
}

// function StatCard({ label, value, icon: Icon }: any) {
//   return (
//     <GlassCard className="p-6 rounded-[28px]">
//       <div className="flex items-center justify-between">
//         <Icon className="h-6 w-6 text-violet-400" />
//       </div>

//       <h3 className="mt-6 text-4xl font-black">{value}</h3>

//       <p className="mt-2 text-zinc-400">{label}</p>
//     </GlassCard>
//   );
// }

// function NoteRow({ title }: { title: string }) {
//   return (
//     <button className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10">
//       <span className="font-medium">{title}</span>

//       <FileText className="h-4 w-4 text-violet-400" />
//     </button>
//   );
// }

// function ActivityItem({ text }: { text: string }) {
//   return (
//     <div className="flex gap-3">
//       <div className="mt-2 h-2 w-2 rounded-full bg-violet-500" />

//       <p className="text-sm text-zinc-300">{text}</p>
//     </div>
//   );
// }

function QuickAction({ label }: { label: string }) {
  return (
    <button className="p-6 glass rounded-3xl cursor-pointer hover:bg-white/10">
      <h3 className="font-semibold">{label}</h3>

      <p className="mt-2 text-sm text-muted">Manage and configure</p>
    </button>
  );
}
