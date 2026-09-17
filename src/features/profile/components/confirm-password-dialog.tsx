"use client";

import { FormPasswordInput } from "@/components/form";
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
import {
  passwordFormSchema,
  PasswordFormValues,
} from "@/features/auth/schemas/password-form-schema";
import { DeleteAccount } from "@/features/auth/server/actions/delete-account";
import { authClient } from "@/lib/auth/auth-client";
import { errorMessages } from "@/lib/errors";
import { wait } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  confirmDialogOpen: boolean;
  setDeleteDialogOpen: (value: boolean) => void;
  setConfirmDialogOpen: (value: boolean) => void;
};

export function ConfirmPasswordDialog(props: Props) {
  const { setDeleteDialogOpen, confirmDialogOpen, setConfirmDialogOpen } =
    props;
  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: { password: "" },
  });
  const [isPending, startTransition] = useTransition();

  const handleClose = async () => {
    setConfirmDialogOpen(false);
    await wait(250);
    setDeleteDialogOpen(false);
  };

  const handleConfirm = async (formData: PasswordFormValues) => {
    startTransition(async () => {
      const result = await DeleteAccount(formData.password);
      if (result.code) {
        console.log(result);
        if (result.code === "CONFLICT") {
          //   setWsResolutionDialog(true);
          return;
        }
        toast.error(errorMessages[result.code]);
        return;
      }
      toast.success("Successfully Account deleted.");
      handleClose();
    });
  };

  return (
    <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
      {/* <DialogTrigger asChild>
          <Button onClick={handleClick} variant="outline">
          Open Dialog
          </Button>
          </DialogTrigger> */}
      <DialogContent className="sm:max-w-sm glass text-primary-foreground">
        <form onSubmit={form.handleSubmit(handleConfirm)}>
          <DialogHeader>
            <DialogTitle className="text-xl">Confirm Password</DialogTitle>
            <DialogDescription className="text-muted mb-4">
              Please enter your password to proceed.
            </DialogDescription>
          </DialogHeader>
          <FormPasswordInput control={form.control} name="password" />
          <DialogFooter className="mt-4">
            <DialogClose>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              Confirm
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
