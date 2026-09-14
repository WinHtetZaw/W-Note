import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import DeleteAccountButton from "./delete-account-button";

export default function DeleteAccountCard() {
  return (
    <section className="rounded-[32px] p-8 glass-red">
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-red-500/10">
          <Trash2 className="size-5 text-red-400" />
        </div>

        <div className="flex-1">
          <h2 className="text-xl font-bold">Delete Account</h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Permanently delete your account and all personal data. This action
            cannot be undone.
          </p>

          <DeleteAccountButton />
        </div>
      </div>
    </section>
  );
}
