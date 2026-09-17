import SectionHeader from "@/components/dashboard/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { getSessionSerever } from "@/lib/auth/session-server";
import { formatMonthYear } from "@/utils/formatting/format-month-year";
import { CalendarDays, Mail, Shield } from "lucide-react";

export default async function AccountInfoCard() {
  const session = await getSessionSerever();

  if (!session) {
    return <p>fail to get user data</p>;
  }

  return (
    <section className="rounded-[32px] p-8 glass">
      <SectionHeader
        icon={<Shield className="size-5" />}
        title="Account"
        description="Information about your account."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <InfoCard
          icon={<Mail className="size-5" />}
          label="Email"
          value={session.user.email}
        />

        <InfoCard
          icon={<CalendarDays className="size-5" />}
          label="Account Since"
          value={formatMonthYear(session.user.createdAt)}
        />
      </div>
    </section>
  );
}

type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
      <div className="flex items-center gap-3 text-zinc-500">
        {icon}

        <span className="text-sm">{label}</span>
      </div>

      <p className="mt-3 font-medium text-white">{value}</p>
    </div>
  );
}

export function AccountInfoCardLoading() {
  return (
    <section className="mt-8 rounded-[32px] p-8 glass">
      <SectionHeader
        icon={<Shield className="size-5" />}
        title="Account"
        description="Information about your account."
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
          <div className="flex items-center gap-3 text-zinc-500">
            <Mail className="size-5" />
            <span className="text-sm">Email</span>
          </div>

          <Skeleton className="h-8 mt-3 w-4/5 rounded-2xl" />
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
          <div className="flex items-center gap-3 text-zinc-500">
            <Mail className="size-5" />
            <span className="text-sm">Account Since</span>
          </div>

          <Skeleton className="h-8 mt-3 w-4/5 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
