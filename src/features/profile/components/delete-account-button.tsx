"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import DeleteAccountDialog from "./delete-account-dialog";

export default function DeleteAccountButton() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  return (
    <>
      <Button
        variant="destructive"
        onClick={() => setDeleteDialogOpen(true)}
        className="mt-5 h-auto border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-semibold text-red-400  hover:bg-red-500/20"
      >
        Delete Account
      </Button>

      <DeleteAccountDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
      />
    </>
  );
}
