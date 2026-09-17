import { Bell } from "lucide-react";

export default function NotificationsCard() {
  return (
    <div className="rounded-[32px] p-8 glass">
      <div className="flex items-center gap-3">
        <Bell className="size-6 text-icon" />

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
