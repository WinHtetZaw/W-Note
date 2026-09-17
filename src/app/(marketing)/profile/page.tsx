import PageHead from "@/components/dashboard/page-head";
import AccountInfoCard, {
  AccountInfoCardLoading,
} from "@/features/profile/components/account-info-card";
import DeleteAccountCard from "@/features/profile/components/delete-account-card";
import PersonalInfoCard, {
  PersonalInfoCardLoading,
} from "@/features/profile/components/personal-info-card";
import ReferencesCard from "@/features/profile/components/preferences-card";
import { Suspense } from "react";

export default async function ProfilePage() {
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
        <AccountInfoCard />
      </Suspense>

      <ReferencesCard />

      <DeleteAccountCard />
    </div>
  );
}
