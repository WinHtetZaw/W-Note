import Link from "next/link";
import { Plus } from "lucide-react";
// import { listFolders } from "@/features/folders/server/actions";
import PageHead from "@/components/dashboard/page-head";
import { Button } from "@/components/ui/button";
import InputSearch from "@/components/ui/input-search";
import FolderCard from "@/features/folders/components/folder-card";
import { fetchFoldersNotes } from "@/features/folders/server/actions/fetch-folders-notes";

type Props = {
  params: Promise<{ workspaceId: string }>;
  searchParams: Promise<{ q: string }>;
};

const dummyFolders = [
  {
    id: "1",
    name: "Product",
    notes: 24,
    updatedAt: "2 hours ago",
  },
  {
    id: "2",
    name: "Marketing",
    notes: 18,
    updatedAt: "1 day ago",
  },
  {
    id: "3",
    name: "Engineering",
    notes: 32,
    updatedAt: "3 hours ago",
  },
  {
    id: "4",
    name: "Meetings",
    notes: 12,
    updatedAt: "5 hours ago",
  },
];

export default async function FoldersPage({ params, searchParams }: Props) {
  const { workspaceId } = await params;
  const { q } = await searchParams;
  const result = await fetchFoldersNotes({ workspaceId, q });

  if (!result.data) {
    return <>Not found</>;
  }

  const folders = result.data;

  return (
    <>
      <PageHead
        pageLabel="Organize Your Knowledge"
        title="Folders"
        subTitle="Structure and organize your workspace notes."
        link={<FolderCreateLink />}
      />

      <InputSearch />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {folders.map((folder) => (
          <FolderCard key={folder.id} folder={folder} />
        ))}
      </div>
    </>
  );
}

function FolderCreateLink() {
  return (
    <Button asChild>
      <Link href={"folders/new"}>
        <Plus className="size-5" />
        New Folder
      </Link>
    </Button>
  );
}
