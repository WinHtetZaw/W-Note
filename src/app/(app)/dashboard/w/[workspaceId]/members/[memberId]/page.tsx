// app/(app)/workspace/[workspaceId]/members/[memberId]/page.tsx

import {
  Crown,
  Shield,
  Mail,
  Clock3,
  Activity,
  FileText,
  FolderTree,
  Settings,
  Trash2,
  Sparkles,
} from "lucide-react";

export default function MemberDetailPage() {
  return (
    <>
      {/* Head */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-600 text-3xl font-black">
            Z
          </div>

          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
              <Sparkles className="h-4 w-4 text-violet-400" />
              Workspace Member
            </div>

            <h1 className="text-4xl font-black">Zeed</h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                zeed@example.com
              </div>

              <div className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-4 py-2 text-sm text-yellow-400">
                <Crown className="h-4 w-4" />
                Owner
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 transition hover:bg-white/10">
            Edit Role
          </button>

          <button className="rounded-2xl bg-red-500 px-5 py-3 font-medium transition hover:bg-red-400">
            Remove Member
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_380px]">
        {/* Left */}
        <div className="space-y-6">
          {/* Activity */}
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Activity className="h-6 w-6 text-violet-400" />

              <div>
                <h2 className="text-2xl font-bold">Recent Activity</h2>

                <p className="text-sm text-zinc-400">
                  Latest actions from this member
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              <ActivityItem text="Created AI SaaS Product Roadmap" />
              <ActivityItem text="Updated workspace settings" />
              <ActivityItem text="Invited new member Sarah Kim" />
              <ActivityItem text="Generated AI note summary" />
            </div>
          </section>

          {/* Contributions */}
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 text-violet-400" />

              <div>
                <h2 className="text-2xl font-bold">Contributions</h2>

                <p className="text-sm text-zinc-400">
                  Notes and folders created
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <StatCard
                label="Notes"
                value="124"
                icon={<FileText className="h-5 w-5 text-violet-400" />}
              />

              <StatCard
                label="Folders"
                value="12"
                icon={<FolderTree className="h-5 w-5 text-violet-400" />}
              />

              <StatCard
                label="AI Actions"
                value="1.2K"
                icon={<Sparkles className="h-5 w-5 text-violet-400" />}
              />
            </div>
          </section>

          {/* Permissions */}
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-violet-400" />

              <div>
                <h2 className="text-2xl font-bold">Permissions</h2>

                <p className="text-sm text-zinc-400">
                  Workspace access controls
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <PermissionItem title="Manage Workspace" enabled />

              <PermissionItem title="Invite Members" enabled />

              <PermissionItem title="Delete Notes" enabled />

              <PermissionItem title="Billing Access" />
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          {/* Member Info */}
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <h2 className="text-xl font-bold">Member Info</h2>

            <div className="mt-6 space-y-5">
              <InfoRow label="Joined" value="Jan 12, 2026" />

              <InfoRow label="Last Active" value="2 minutes ago" />

              <InfoRow label="Status" value="Active" />

              <InfoRow label="Role" value="Owner" />
            </div>
          </section>

          {/* Security */}
          <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-violet-400" />

              <h2 className="text-xl font-bold">Security</h2>
            </div>

            <div className="mt-6 space-y-4">
              <SecurityCard title="Two-factor Authentication" value="Enabled" />

              <SecurityCard title="Trusted Devices" value="3 devices" />

              <SecurityCard title="Session Status" value="Secure" />
            </div>
          </section>

          {/* Danger Zone */}
          <section className="rounded-[32px] border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Trash2 className="h-6 w-6 text-red-400" />

              <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>
            </div>

            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Remove this member from the workspace and revoke all access
              permissions.
            </p>

            <button className="mt-6 w-full rounded-2xl bg-red-500 px-5 py-4 font-semibold transition hover:bg-red-400">
              Remove Member
            </button>
          </section>
        </aside>
      </div>
    </>
  );
}

function ActivityItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-2 h-2 w-2 rounded-full bg-violet-500" />

      <div>
        <p>{text}</p>

        <div className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
          <Clock3 className="h-4 w-4" />2 hours ago
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div>{icon}</div>

      <div className="mt-5 text-3xl font-black">{value}</div>

      <p className="mt-2 text-zinc-400">{label}</p>
    </div>
  );
}

function PermissionItem({
  title,
  enabled = false,
}: {
  title: string;
  enabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
      <span>{title}</span>

      <div
        className={`rounded-full px-4 py-2 text-sm ${
          enabled
            ? "bg-green-500/10 text-green-400"
            : "bg-zinc-500/10 text-zinc-400"
        }`}
      >
        {enabled ? "Enabled" : "Disabled"}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-zinc-400">{label}</p>

      <p className="mt-2 font-semibold">{value}</p>
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
