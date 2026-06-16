import { Plus } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

type Props = {
  workspaceId: string;
  className?: string;
};

export default function NoteCreateButton(props: Props) {
  const { workspaceId, className } = props;
  return (
    <Button asChild className={className}>
      <Link href={`/dashboard/w/${workspaceId}/notes/new`}>
        <Plus className="size-4" />
        New Note
      </Link>
    </Button>
  );
}
