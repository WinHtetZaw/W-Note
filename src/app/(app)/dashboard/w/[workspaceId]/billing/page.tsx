import BackButton from "@/components/ui/back-button";
import MainLoading from "@/components/ui/main-loading";
import BillingPageContent from "@/features/billing/components/billing-page-content";
import { Suspense } from "react";

type BillingPageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function Page({ params }: BillingPageProps) {
  return (
    <>
      <BackButton />
      <Suspense fallback={<MainLoading />}>
        <BillingPageContent params={params} />
      </Suspense>
    </>
  );
}
