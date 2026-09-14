import PageHead from "@/components/dashboard/page-head";
import AccountInfoCard, {
  AccountInfoCardLoading,
} from "@/features/profile/components/account-info-card";
import DeleteAccountCard from "@/features/profile/components/delete-account-card";
import PersonalInfoCard, {
  PersonalInfoCardLoading,
} from "@/features/profile/components/personal-info-card";
import ReferencesCard from "@/features/profile/components/preferences-card";
import TestToast from "@/features/profile/components/test-toast";
import { Trash2 } from "lucide-react";
import { Suspense } from "react";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

export default async function ProfilePage({ params }: Props) {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <PageHead
        pageLabel="Account Settings"
        title="Your Profile"
        subTitle="Manage your personal information, preferences, and account settings."
      />

      <Suspense fallback={<PersonalInfoCardLoading />}>
        <PersonalInfoCard />
      </Suspense>

      <Suspense fallback={<AccountInfoCardLoading />}>
        <AccountInfoCard params={params} />
      </Suspense>

      <ReferencesCard />

      {/* Danger Zone */}
      <TestToast />

      <section className="mt-8 rounded-[32px] border border-red-500/20 bg-red-500/[0.03] p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10">
            <Trash2 className="h-5 w-5 text-red-400" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-bold">Delete Account</h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
              Permanently delete your account and all personal data. This action
              cannot be undone.
            </p>

            <button className="mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20">
              Delete Account
            </button>
          </div>
        </div>
      </section>

      <DeleteAccountCard />
    </div>
  );
}
