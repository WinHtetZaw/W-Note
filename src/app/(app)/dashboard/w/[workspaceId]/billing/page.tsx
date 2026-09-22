import MainLoading from "@/components/ui/main-loaing";
import BillingPageContent from "@/features/billing/components/billing-page-content";
import { Suspense } from "react";

type BillingPageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function Page({ params }: BillingPageProps) {
  return (
    <Suspense fallback={<MainLoading />}>
      <BillingPageContent params={params} />
    </Suspense>
  );
}
