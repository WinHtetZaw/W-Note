import {
  Settings,
  Sparkles,
  Save,
  Trash2,
  Shield,
  Bell,
  Brain,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <>
      {/* Head */}
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-violet-400" />
          Workspace Configuration
        </div>

        <h1 className="text-4xl font-black md:text-5xl">Workspace Settings</h1>

        <p className="mt-4 text-lg text-zinc-400">
          Manage workspace preferences and permissions.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-10 grid gap-6 xl:grid-cols-[1fr_350px]">
        {/* Left */}
        <div className="space-y-6">
          {/* General */}
          <div className="rounded-4xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Settings className="h-6 w-6 text-violet-400" />

              <h2 className="text-2xl font-bold">General</h2>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-3 block text-sm text-zinc-400">
                  Workspace Name
                </label>

                <input
                  defaultValue="Startup Team"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-violet-500"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm text-zinc-400">
                  Description
                </label>

                <textarea
                  defaultValue="AI workspace for product development and collaboration."
                  className="min-h-[140px] w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 outline-none transition focus:border-violet-500"
                />
              </div>

              <button className="flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 font-semibold transition hover:bg-violet-500">
                <Save className="h-5 w-5" />
                Save Changes
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Bell className="h-6 w-6 text-violet-400" />

              <h2 className="text-2xl font-bold">Notifications</h2>
            </div>

            <div className="mt-8 space-y-5">
              <ToggleRow
                title="Email Notifications"
                description="Receive updates about workspace activity."
              />

              <ToggleRow
                title="AI Reports"
                description="Weekly AI productivity reports."
              />

              <ToggleRow
                title="Member Activity"
                description="Get notified when members update notes."
              />
            </div>
          </div>
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

          {/* Danger Zone */}
          <div className="rounded-[32px] border border-red-500/20 bg-red-500/5 p-6 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <Trash2 className="h-6 w-6 text-red-400" />

              <h2 className="text-xl font-bold text-red-400">Danger Zone</h2>
            </div>

            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Permanently delete this workspace and all notes.
            </p>

            <button className="mt-6 w-full rounded-2xl bg-red-500 px-5 py-4 font-semibold transition hover:bg-red-400">
              Delete Workspace
            </button>
          </div>
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
