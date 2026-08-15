"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Folder, Save } from "lucide-react";
import z from "zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { renameFolder } from "../server/actions";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { createFolder } from "../server/actions/create-folder";

const formSchema = z.object({
  name: z.string().trim().min(2, "Folder name must be at least 2 characters"),
});

type FolderFormValues = z.infer<typeof formSchema>;

type Props = {
  isEditForm?: boolean;
  oldFolder?: FolderFormValues;
};

export default function FolderForm({ isEditForm, oldFolder }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: isEditForm ? oldFolder : { name: "" },
  });
  const [isPending, startTransition] = useTransition();
  const { workspaceId, folderId }: { workspaceId: string; folderId: string } =
    useParams();
  // isEditForm && console.log(oldFolder);

  const handleCreate = async (data: z.infer<typeof formSchema>) => {
    const { data: session, error } = await authClient.getSession();
    if (error || !session) return;
    const result = await createFolder({
      ...data,
      workspaceId,
      createdBy: session.user.id,
    });
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Folder created successfully.");
    }
    return result;
  };

  const handleRename = async (data: z.infer<typeof formSchema>) => {
    const { data: session, error } = await authClient.getSession();
    if (error || !session) return;
    const result = await renameFolder({
      ...data,
      workspaceId,
      folderId,
      createdBy: session.user.id,
    });
    if (!result.success) {
      toast.error(result.message);
    } else {
      toast.success("Folder renamed successfully.");
    }
    return result;
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      if (isEditForm) {
        await handleRename(data);
      } else {
        await handleCreate(data);
      }
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel
              htmlFor="name"
              className="mb-3 flex items-center gap-2 text-sm text-zinc-400"
            >
              <Folder className="size-4" />
              Folder Name
            </FieldLabel>
            <Input
              {...field}
              id="name"
              aria-invalid={fieldState.invalid}
              placeholder="Enter folder name"
              autoComplete="off"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button
        disabled={isPending}
        className="ml-auto flex disabled:bg-green-500"
      >
        <Save className="size-5" />

        {isEditForm ? "Save Changes" : "Create Folder"}
      </Button>
    </form>
  );
}
