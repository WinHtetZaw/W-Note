import BillingPageContent from "@/features/billing/components/billing-page-content";

type BillingPageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function Page({ params }: BillingPageProps) {
  const { workspaceId } = await params;

  return <BillingPageContent workspaceId={workspaceId} />;
}
