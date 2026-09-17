"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth/auth-client";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  emailConfirmationOpen: boolean;
  setEmailConfirmationOpen: (value: boolean) => void;
  setDeleteDialogOpen: (value: boolean) => void;
};

export default function DeleteAccountWithEmailConfirmationDilog(props: Props) {
  const { emailConfirmationOpen, setEmailConfirmationOpen } = props;
  const [isPending, startTransition] = useTransition();

  const handleSent = () => {
    startTransition(async () => {
      const { data, error } = await authClient.deleteUser();

      if (error) {
        toast.error("Fail to ");
        return;
      }

      toast.success("Successfully sent.");
    });
  };

  return (
    <Dialog
      open={emailConfirmationOpen}
      onOpenChange={setEmailConfirmationOpen}
    >
      <DialogContent className="sm:max-w-sm glass text-primary-foreground">
        <DialogHeader>
          <p>email delete</p>
          <DialogTitle className="text-xl">Confirm Email</DialogTitle>
          <DialogDescription className="text-muted mb-4">
            Please check your email for a confirmation link to proceed with
            deleting your account. If you haven't received the email, please
            check your spam folder or request a new confirmation link.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSent} disabled={isPending} type="submit">
            Sent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
