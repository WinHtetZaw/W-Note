import { fetchFoldersNotes } from "../server/actions/fetch-folders-notes";
import FolderCard from "./folder-card";

type Props = {
  params: Promise<{ workspaceId: string }>;

  searchParams: Promise<{ q: string }>;
};

export default async function FolderList(props: Props) {
  const { params, searchParams } = props;

  const { workspaceId } = await params;

  const { q } = await searchParams;

  const result = await fetchFoldersNotes({ workspaceId, q });

  if (result.code)
    return (
      <p className="mt-8 text-muted text-center">Something wrong. Try again.</p>
    );

  const folders = result.data;

  if (folders.length === 0) return <EmptyFolders query={q} />;

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {folders.map((folder) => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
    </div>
  );
}

function EmptyFolders({ query }: { query?: string }) {
  if (query) {
    return (
      <div className="mt-8 text-muted text-center">
        No folders found for "{query}". Try others
      </div>
    );
  }

  return <div className="mt-8 text-muted text-center">No folder yet.</div>;
}
