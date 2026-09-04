import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function FolderCreateLink() {
  return (
    <Button asChild>
      <Link href={"folders/new"}>
        <Plus className="size-5" />
        New Folder
      </Link>
    </Button>
  );
}
