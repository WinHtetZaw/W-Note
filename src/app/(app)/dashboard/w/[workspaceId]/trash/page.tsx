import BackButton from "@/components/ui/back-button";
import MainLoading from "@/components/ui/main-loading";
import { TrashPageContent } from "@/features/trash/components/trash-page-content";
import { Suspense } from "react";

type TrashPageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default function TrashPage({ params }: TrashPageProps) {
  return (
    <>
      <BackButton />
      <Suspense fallback={<MainLoading />}>
        <TrashPageContent params={params} />
      </Suspense>
    </>
  );
}
