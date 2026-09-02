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
import { useParams, useRouter } from "next/navigation";
import {
  InvitationFormValues,
  sendInvitationSchema,
} from "../schemas/send-invitation-schema";
import { createWorkspaceInvite } from "../server/actions/create-workspace-invite";
import { toast } from "sonner";
import { errorMessages } from "@/lib/errors";

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
  const router = useRouter();
  const { workspaceId }: { workspaceId: string } = useParams();

  function onSubmit(values: InvitationFormValues) {
    startTransition(async () => {
      const result = await createWorkspaceInvite({ workspaceId, ...values });
      if (!result.data) {
        toast.error(errorMessages[result.code]);
        console.log(result);
        return;
      }
      toast.success("Successfully invitation sent.");
      router.refresh();
      form.reset();
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

            <Button disabled={pending} type="submit">
              Send Invitation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
