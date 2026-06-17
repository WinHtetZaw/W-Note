import { Plus } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

type Props = {
  workspaceId: string;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "destructive";
};

export default function NoteCreateButton(props: Props) {
  const { workspaceId, className, variant } = props;
  return (
    <Button asChild className={className} variant={variant ?? "default"}>
      <Link href={`/dashboard/w/${workspaceId}/notes/new`}>
        <Plus className="size-4" />
        New Note
      </Link>
    </Button>
  );
}
