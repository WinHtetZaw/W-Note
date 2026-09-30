import MainLoading from "@/components/ui/main-loaing";
import { TrashPageContent } from "@/features/trash/components/trash-page-content";
import { Suspense } from "react";

type TrashPageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default function TrashPage({ params }: TrashPageProps) {
  return (
    <Suspense fallback={<MainLoading />}>
      <TrashPageContent params={params} />
    </Suspense>
  );
}
