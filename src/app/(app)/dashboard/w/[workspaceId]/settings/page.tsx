import PageHead from "@/components/dashboard/page-head";
import SectionHeader from "@/components/dashboard/section-header";
import MainLoading from "@/components/ui/main-loaing";
import GeneralCard from "@/features/settings/components/general-card";
import NotificationsCard from "@/features/settings/components/notifications-card";
import DeleteWorkspaceCard from "@/features/workspaces/components/delete-workspace-card";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";
import { fetchWorkspace } from "@/features/workspaces/server/actions/fetch-workspace";
import { Settings, Save, Trash2, Shield, Bell, Brain } from "lucide-react";
import { Suspense } from "react";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default function SettingsPage({ params }: Props) {
  return (
    <>
      <Suspense fallback={<MainLoading />}>
        <SettingPageContent params={params} />
      </Suspense>
    </>
  );
}

async function SettingPageContent({ params }: Props) {
  return (
    <>
      <PageHead
        pageLabel="Workspace Configuration"
        title="Workspace Settings"
        subTitle="Manage workspace preferences and permissions."
      />

      {/* Grid */}
      <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Left */}
        <div className="space-y-6">
          <GeneralCard params={params} />
          <NotificationsCard />
        </div>

        {/* Right */}
        <aside className="space-y-6">
          {/* Security */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-violet-400" />

              <h2 className="text-xl font-bold">Security</h2>
            </div>

            <div className="mt-6 space-y-4">
              <SecurityCard title="Workspace Visibility" value="Private" />

              <SecurityCard title="Two-factor Authentication" value="Enabled" />

              <SecurityCard title="Member Permissions" value="Restricted" />
            </div>
          </div>

          {/* AI Settings */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Brain className="h-6 w-6 text-violet-400" />

              <h2 className="text-xl font-bold">AI Settings</h2>
            </div>

            <div className="mt-6 space-y-5">
              <ToggleRow
                title="AI Suggestions"
                description="Enable smart note suggestions."
              />

              <ToggleRow
                title="Auto Summaries"
                description="Automatically summarize notes."
              />
            </div>
          </div>

          <DeleteWorkspaceCard />
        </aside>
      </div>
    </>
  );
}

function ToggleRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="mt-1 text-sm text-zinc-400">{description}</p>
      </div>

      <button className="relative h-7 w-14 rounded-full bg-violet-600">
        <div className="absolute right-1 top-1 h-5 w-5 rounded-full bg-white" />
      </button>
    </div>
  );
}

function SecurityCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-zinc-400">{title}</p>

      <p className="mt-2 font-semibold">{value}</p>
    </div>
  );
}
