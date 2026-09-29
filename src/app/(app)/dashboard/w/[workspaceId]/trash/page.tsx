import { TrashPageContent } from "@/features/trash/components/trash-page-content";
import { Suspense } from "react";

type TrashPageProps = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default function TrashPage({ params }: TrashPageProps) {
  return (
    <Suspense fallback={<p>trashpage fallback</p>}>
      <TrashPageContent params={params} />
    </Suspense>
  );
}
