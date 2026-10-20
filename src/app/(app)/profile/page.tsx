import PageHead from "@/components/dashboard/page-head";
import BackButton from "@/components/ui/back-button";
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
    <>
      <BackButton />

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

      {/* <ReferencesCard /> */}

      <DeleteAccountCard />
    </>
  );
}
