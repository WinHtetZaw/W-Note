import SectionHeader from "@/components/dashboard/section-header";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchMemberById } from "@/features/members/server/actions/fetch-member-by-id";
import { getSessionSerever } from "@/lib/auth/session-server";
import { formatMonthYear } from "@/utils/formatting/format-month-year";
import { CalendarDays, Mail, Shield } from "lucide-react";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function AccountInfoCard({ params }: Props) {
  const { workspaceId } = await params;
  const session = await getSessionSerever();

  if (!session) {
    return <p>fail to get user data</p>;
  }

  const memberResult = await fetchMemberById({
    workspaceId,
    userId: session.user.id,
  });

  if (memberResult.code) {
    console.error(memberResult);
    return <p>fail to get member</p>;
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
          label="Member Since"
          value={formatMonthYear(memberResult.data.joinedAt)}
        />
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
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
            <span className="text-sm">Member Since</span>
          </div>

          <Skeleton className="h-8 mt-3 w-4/5 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
