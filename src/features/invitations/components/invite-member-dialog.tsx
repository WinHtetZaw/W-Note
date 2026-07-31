"use client";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { FormInput } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSelect from "@/components/form/form-select";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import { wait } from "@/lib/utils";
import {
  InvitationFormValues,
  sendInvitationSchema,
} from "../schemas/send-invitation-schema";
import { createWorkspaceInvite } from "../server/actions/create-workspace-invite";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function InviteMemberDialog({ open, onOpenChange }: Props) {
  const form = useForm<InvitationFormValues>({
    resolver: zodResolver(sendInvitationSchema),
    defaultValues: { email: "", role: "member" },
  });

  const [pending, startTransition] = useTransition();
  const { workspaceId }: { workspaceId: string } = useParams();

  function onSubmit(values: InvitationFormValues) {
    // reset();

    startTransition(async () => {
      // await wait(5000);
      console.log(values);
      const result = await createWorkspaceInvite({ workspaceId, ...values });
      onOpenChange(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-[32px] text-primary-foreground border border-white/10 bg-zinc-900/95 p-8 backdrop-blur-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black">
            Invite Member
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="you@example.com"
          />

          <FormSelect
            control={form.control}
            name="role"
            selectValues={[
              { name: "Member", value: "member" },
              { name: "Admin", value: "admin" },
            ]}
          />

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              disabled={pending}
              type="submit"
              className=" disabled:bg-amber-400"
            >
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
