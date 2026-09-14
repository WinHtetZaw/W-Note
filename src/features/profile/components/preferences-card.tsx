import SectionHeader from "@/components/dashboard/section-header";
import { Bell, Globe2, Moon } from "lucide-react";

export default function ReferencesCard() {
  return (
    <section className="mt-8 rounded-[32px] p-8 glass">
      <SectionHeader
        icon={<Moon className="h-5 w-5" />}
        title="Preferences"
        description="Customize your AI Notes experience."
      />

      <div className="mt-8 space-y-5">
        {/* Theme */}

        <PreferenceRow
          icon={<Moon className="h-5 w-5" />}
          title="Appearance"
          description="Choose how AI Notes looks for you."
        >
          <button className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <Moon className="h-4 w-4" />
            Dark
          </button>
        </PreferenceRow>

        {/* Notifications */}

        <PreferenceRow
          icon={<Bell className="h-5 w-5" />}
          title="Email Notifications"
          description="Receive notifications about workspace activity."
        >
          <button className="relative h-6 w-11 rounded-full bg-violet-600">
            <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
          </button>
        </PreferenceRow>

        {/* Language */}

        <PreferenceRow
          icon={<Globe2 className="h-5 w-5" />}
          title="Language"
          description="Choose your preferred language."
        >
          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10">
            English
          </button>
        </PreferenceRow>
      </div>
    </section>
  );
}

function PreferenceRow({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/3 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-400">
          {icon}
        </div>

        <div>
          <h3 className="font-medium">{title}</h3>

          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>
      </div>

      {children}
    </div>
  );
}
