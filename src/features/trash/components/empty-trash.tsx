import { Trash2 } from "lucide-react";

export function EmptyTrash() {
  return (
    <div className="flex min-h-105 flex-col items-center justify-center rounded-2xl border border-dashed bg-card/30 px-6 text-center backdrop-blur-xl">
      <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border bg-muted/40">
        <Trash2 className="size-6 text-muted-foreground" />
      </div>

      <h2 className="text-lg font-semibold">Trash is empty</h2>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Deleted notes will appear here. You can restore them or permanently
        delete them from your workspace.
      </p>
    </div>
  );
}
